import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography } from '../../src/theme';
import { getProfile, saveProfile } from '../../src/hooks/useUserProfile';
import { calculateWeekFromDueDate } from '../../src/hooks/useCurrentWeek';

function parseDateBR(value: string): Date | null {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, day, month, year] = match;
  const d = new Date(`${year}-${month}-${day}T00:00:00`);
  if (isNaN(d.getTime()) || d.getDate() !== parseInt(day, 10)) return null;
  return d;
}

function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function toISO(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function isoToBR(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export default function ConfigScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [dateError, setDateError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const profile = await getProfile();
      if (profile) {
        setName(profile.name ?? '');
        setDateInput(isoToBR(profile.dueDate ?? ''));
        if (profile.dueDate) setCurrentWeek(calculateWeekFromDueDate(profile.dueDate));
      }
    }
    load();
  }, []);

  function handleDateChange(text: string) {
    const formatted = formatDateInput(text);
    setDateInput(formatted);
    setDateError('');
    if (formatted.length === 10 && !parseDateBR(formatted)) {
      setDateError('Data inválida. Use DD/MM/AAAA.');
    }
  }

  async function handleSave() {
    if (dateInput.length < 10) { setDateError('Informe a data prevista do parto.'); return; }
    const parsed = parseDateBR(dateInput);
    if (!parsed) { setDateError('Data inválida. Use DD/MM/AAAA.'); return; }
    setLoading(true);
    try {
      await saveProfile(name.trim() || null, toISO(parsed));
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
      'Isso vai te levar de volta ao onboarding para reconfigura a DPP. Continuar?',
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
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Como posso te chamar?"
        placeholderTextColor={colors.textLight}
        autoCapitalize="words"
      />

      <Text style={styles.label}>
        Data Prevista do Parto <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, dateError ? styles.inputError : null]}
        value={dateInput}
        onChangeText={handleDateChange}
        placeholder="DD/MM/AAAA"
        placeholderTextColor={colors.textLight}
        keyboardType="numeric"
        maxLength={10}
      />
      {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

      <TouchableOpacity
        style={[styles.saveBtn, loading && styles.btnDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color={colors.onPrimary} />
          : <Text style={styles.saveBtnText}>Salvar Alterações</Text>
        }
      </TouchableOpacity>

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
  },
  inputError: { backgroundColor: colors.errorContainer },
  errorText: { ...typography.bodySmall, color: colors.error, marginTop: 4 },
  saveBtn: {
    backgroundColor: colors.primary, borderRadius: 12,
    paddingVertical: 15, alignItems: 'center', marginTop: 24,
  },
  btnDisabled: { opacity: 0.6 },
  saveBtnText: { ...typography.h3, color: colors.onPrimary },
  divider: { height: 24 },
  resetBtn: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 12, paddingVertical: 13, alignItems: 'center',
  },
  resetBtnText: { ...typography.label, color: colors.textSecondary },
  disclaimer: { marginTop: 32 },
  disclaimerText: { ...typography.caption, color: colors.textLight, textAlign: 'center', lineHeight: 18 },
});
