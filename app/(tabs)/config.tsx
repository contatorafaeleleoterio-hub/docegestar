import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, ActivityIndicator, Alert, Switch, Platform,
} from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors, typography } from '../../src/theme';
import { getProfile, saveProfile } from '../../src/hooks/useUserProfile';
import { calculateWeekFromDueDate } from '../../src/hooks/useCurrentWeek';
import { parseDateBR, toISO, isoToBR } from '../../src/utils/date';
import { useNotificationSettings, type NotificationType } from '../../src/hooks/useNotificationSettings';

const NOTIFICATION_LABELS: Record<NotificationType, string> = {
  prenatal_appointments: 'Consultas pré-natais',
  weekly_milestones: 'Marcos semanais',
  kick_counter: 'Contador de chutes',
  contractions: 'Contrações',
};

export default function ConfigScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [dateError, setDateError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [gestationType, setGestationType] = useState<string | null>(null);
  const [firstChild, setFirstChild] = useState<number | null>(null);
  const [babyName, setBabyName] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<'name' | 'date' | null>(null);
  const { settings, loading: notifLoading, updateSetting } = useNotificationSettings();
  const [defaultTime, setDefaultTime] = useState('08:00');

  useEffect(() => {
    async function load() {
      const profile = await getProfile();
      if (profile) {
        setName(profile.name ?? '');
        setDateInput(isoToBR(profile.dueDate ?? ''));
        setGestationType(profile.gestationType ?? null);
        setFirstChild(profile.firstChild ?? null);
        setBabyName(profile.babyName ?? null);
        if (profile.dueDate) setCurrentWeek(calculateWeekFromDueDate(profile.dueDate));
      }
    }
    load();
  }, []);

  function handleDateChange(masked: string) {
    setDateInput(masked);
    setDateError('');
    if (masked.length === 10 && !parseDateBR(masked)) {
      setDateError('Data inválida. Use DD/MM/AAAA.');
    }
  }

  async function handleSave() {
    if (dateInput.length < 10) { setDateError('Informe a data prevista do parto.'); return; }
    const parsed = parseDateBR(dateInput);
    if (!parsed) { setDateError('Data inválida. Use DD/MM/AAAA.'); return; }
    setLoading(true);
    try {
      await saveProfile(name.trim() || null, toISO(parsed), gestationType, firstChild, babyName);
      setCurrentWeek(calculateWeekFromDueDate(toISO(parsed)));
      Alert.alert('Salvo!', 'Perfil atualizado com sucesso.');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleResetApp() {
    Alert.alert(
      'Reiniciar App',
      'Isso vai te levar de volta ao onboarding para reconfigurar a DPP. Continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', style: 'destructive', onPress: () => router.replace('/onboarding') },
      ]
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Configurações</Text>

      {currentWeek !== null && (
        <View style={styles.weekBadge}>
          <Text style={styles.weekBadgeText}>Semana atual calculada: {currentWeek}</Text>
        </View>
      )}

      <Text style={styles.label}>Seu nome (opcional)</Text>
      <TextInput
        style={[styles.input, focusedField === 'name' && styles.inputFocused]}
        value={name}
        onChangeText={setName}
        placeholder="Como posso te chamar?"
        placeholderTextColor={colors.textLight}
        autoCapitalize="words"
        onFocus={() => setFocusedField('name')}
        onBlur={() => setFocusedField(null)}
      />

      <Text style={styles.label}>
        Data Prevista do Parto <Text style={styles.required}>*</Text>
      </Text>
      <MaskInput
        style={[styles.input, focusedField === 'date' && styles.inputFocused, dateError ? styles.inputError : null]}
        value={dateInput}
        onChangeText={(masked) => handleDateChange(masked)}
        mask={Masks.DATE_DDMMYYYY}
        placeholder="DD/MM/AAAA"
        placeholderTextColor={colors.textLight}
        keyboardType="numeric"
        onFocus={() => setFocusedField('date')}
        onBlur={() => setFocusedField(null)}
      />
      {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

      <TouchableOpacity
        style={[styles.saveBtnWrapper, loading && styles.btnDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        <LinearGradient colors={[colors.primary, '#7a2d5a']} style={styles.saveBtn}>
          {loading
            ? <ActivityIndicator color="#ffffff" />
            : <Text style={styles.saveBtnText}>Salvar Alterações</Text>
          }
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Seção de Notificações */}
      <Text style={styles.sectionTitle}>Notificações</Text>
      {Platform.OS === 'web' ? (
        <View style={styles.notifWebBanner}>
          <Text style={styles.notifWebText}>
            Notificações disponíveis apenas no app mobile.
          </Text>
        </View>
      ) : (
        <View style={styles.notifCard}>
          {notifLoading ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <>
              {(Object.keys(NOTIFICATION_LABELS) as NotificationType[]).map(type => {
                const setting = settings.find(s => s.type === type);
                return (
                  <View key={type} style={styles.notifRow}>
                    <Text style={styles.notifLabel}>{NOTIFICATION_LABELS[type]}</Text>
                    <Switch
                      value={setting?.enabled ?? false}
                      onValueChange={val => updateSetting(type, val)}
                      trackColor={{ false: colors.border, true: colors.primaryLight }}
                      thumbColor={setting?.enabled ? colors.primary : colors.textLight}
                    />
                  </View>
                );
              })}
              <View style={styles.notifTimeDivider} />
              <Text style={styles.notifTimeLabel}>Horário padrão de lembretes</Text>
              <TextInput
                style={[styles.input, styles.notifTimeInput]}
                value={defaultTime}
                onChangeText={text => {
                  setDefaultTime(text);
                  const [h, m] = text.split(':');
                  if (text.length === 5 && !isNaN(Number(h)) && !isNaN(Number(m))) {
                    settings.forEach(s => {
                      if (s.enabled) updateSetting(s.type, true, text);
                    });
                  }
                }}
                placeholder="HH:MM"
                placeholderTextColor={colors.textLight}
                keyboardType="numbers-and-punctuation"
                maxLength={5}
              />
            </>
          )}
        </View>
      )}

      <View style={styles.divider} />

      <TouchableOpacity style={styles.resetBtn} onPress={handleResetApp}>
        <Text style={styles.resetBtnText}>Ir para o Onboarding</Text>
      </TouchableOpacity>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          As informações contidas neste app são educativas e complementares. Não substituem o acompanhamento médico profissional.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 40 },
  title: { ...typography.h2, color: colors.text, marginBottom: 16 },
  weekBadge: {
    backgroundColor: colors.primaryLight, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 8, marginBottom: 20, alignSelf: 'flex-start',
  },
  weekBadgeText: { ...typography.label, color: colors.primary },
  label: { ...typography.label, color: colors.text, marginBottom: 6, marginTop: 16 },
  required: { color: colors.error },
  input: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14,
    ...typography.body, color: colors.text,
    borderWidth: 1, borderColor: colors.border,
  },
  inputFocused: { borderColor: colors.primary },
  inputError: { backgroundColor: colors.errorContainer, borderColor: colors.error },
  errorText: { ...typography.bodySmall, color: colors.error, marginTop: 4 },
  saveBtnWrapper: { marginTop: 24, borderRadius: 12, overflow: 'hidden' },
  saveBtn: {
    borderRadius: 12,
    paddingVertical: 15, alignItems: 'center',
  },
  btnDisabled: { opacity: 0.6 },
  saveBtnText: { ...typography.h3, color: '#ffffff' },
  divider: { height: 24 },
  resetBtn: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 12, paddingVertical: 13, alignItems: 'center',
  },
  resetBtnText: { ...typography.label, color: colors.textSecondary },
  disclaimer: { marginTop: 32 },
  disclaimerText: { ...typography.caption, color: colors.textLight, textAlign: 'center', lineHeight: 18 },
  sectionTitle: { ...typography.h3, color: colors.text, marginTop: 8, marginBottom: 12 },
  notifWebBanner: {
    backgroundColor: colors.surfaceContainerHigh, borderRadius: 12,
    padding: 16, marginBottom: 8,
  },
  notifWebText: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  notifCard: {
    backgroundColor: colors.surfaceContainerHigh, borderRadius: 12, padding: 16,
  },
  notifRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 10,
  },
  notifLabel: { ...typography.body, color: colors.text, flex: 1 },
  notifTimeDivider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
  notifTimeLabel: { ...typography.label, color: colors.text, marginBottom: 8 },
  notifTimeInput: { marginTop: 0 },
});
