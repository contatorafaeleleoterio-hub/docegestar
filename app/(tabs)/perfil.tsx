import { useState, useEffect, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, ActivityIndicator, Alert, Switch, Platform,
} from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography } from '../../src/theme';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';
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

const MONTHS_PT = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

function formatDueDateLong(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return `${d.getDate()} de ${MONTHS_PT[d.getMonth()]} · ${d.getFullYear()}`;
}

type MenuKey = 'dpp' | 'notif' | 'diario' | 'reset';

interface MenuItem {
  key: MenuKey;
  icon: DGIconName;
  label: string;
  sub: string;
}

const MENU: MenuItem[] = [
  { key: 'dpp',    icon: 'calendar', label: 'Data prevista do parto', sub: 'Editar DPP e semana atual' },
  { key: 'notif',  icon: 'bell',     label: 'Notificações',            sub: 'Lembretes e alertas' },
  { key: 'diario', icon: 'edit',     label: 'Meu diário',              sub: 'Humor, marcos e fotos' },
  { key: 'reset',  icon: 'logout',   label: 'Reiniciar app',           sub: 'Ir para o onboarding' },
];

export default function PerfilScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [dateError, setDateError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [dueDateISO, setDueDateISO] = useState<string | null>(null);
  const [gestationType, setGestationType] = useState<string | null>(null);
  const [firstChild, setFirstChild] = useState<number | null>(null);
  const [babyName, setBabyName] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<'name' | 'date' | null>(null);
  const { settings, loading: notifLoading, updateSetting } = useNotificationSettings();
  const [defaultTime, setDefaultTime] = useState('08:00');
  const [expanded, setExpanded] = useState<MenuKey | null>(null);

  useEffect(() => {
    async function load() {
      const profile = await getProfile();
      if (profile) {
        setName(profile.name ?? '');
        setDateInput(isoToBR(profile.dueDate ?? ''));
        setDueDateISO(profile.dueDate ?? null);
        setGestationType(profile.gestationType ?? null);
        setFirstChild(profile.firstChild ?? null);
        setBabyName(profile.babyName ?? null);
        if (profile.dueDate) setCurrentWeek(calculateWeekFromDueDate(profile.dueDate));
      }
    }
    load();
  }, []);

  const daysUntilDue = useMemo(() => {
    if (!dueDateISO) return null;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const due = new Date(dueDateISO); due.setHours(0, 0, 0, 0);
    return Math.max(0, Math.floor((due.getTime() - today.getTime()) / 86400000));
  }, [dueDateISO]);

  const progressPct = currentWeek ? Math.min(100, Math.round((currentWeek / 40) * 100)) : 0;
  const initial = (name || babyName || 'A').trim().charAt(0).toUpperCase();
  const subtitle = useMemo(() => {
    const parts: string[] = [];
    if (firstChild === 1) parts.push('primeira gestação');
    else if (firstChild === 0) parts.push('gestação não-primeira');
    if (gestationType) parts.push(gestationType);
    return parts.join(' · ');
  }, [firstChild, gestationType]);

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
      const iso = toISO(parsed);
      await saveProfile(name.trim() || null, iso, gestationType, firstChild, babyName);
      setDueDateISO(iso);
      setCurrentWeek(calculateWeekFromDueDate(iso));
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

  function handleMenuPress(key: MenuKey) {
    if (key === 'diario') { router.push('/diario'); return; }
    if (key === 'reset')  { handleResetApp(); return; }
    setExpanded(prev => prev === key ? null : key);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Hero gradient */}
      <LinearGradient
        colors={[colors.lav100, colors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + 14 }]}
      >
        <View style={styles.heroRow}>
          <LinearGradient
            colors={[colors.pink300, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{initial}</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroName}>{name || 'Olá, mamãe'}</Text>
            {!!subtitle && <Text style={styles.heroSub}>{subtitle}</Text>}
            {!!babyName && (
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>💕 bebê {babyName}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentWeek ?? '—'}</Text>
            <Text style={styles.statLabel}>semanas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{daysUntilDue ?? '—'}</Text>
            <Text style={styles.statLabel}>dias restantes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{progressPct}%</Text>
            <Text style={styles.statLabel}>concluído</Text>
          </View>
        </View>
      </LinearGradient>

      {/* DPP card */}
      <TouchableOpacity
        style={styles.dppCard}
        onPress={() => handleMenuPress('dpp')}
        activeOpacity={0.85}
      >
        <View style={styles.dppIcon}>
          <DGIcon name="heart" size={22} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.dppEyebrow}>DATA PROVÁVEL DO PARTO</Text>
          <Text style={styles.dppValue}>{formatDueDateLong(dueDateISO)}</Text>
        </View>
        <DGIcon
          name={expanded === 'dpp' ? 'chevronDown' : 'chevronRight'}
          size={18}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      {/* DPP edit (expanded) */}
      {expanded === 'dpp' && (
        <View style={styles.expandPanel}>
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
            activeOpacity={0.85}
          >
            <LinearGradient colors={[colors.primary, colors.primaryDeep]} style={styles.saveBtn}>
              {loading
                ? <ActivityIndicator color="#ffffff" />
                : <Text style={styles.saveBtnText}>Salvar Alterações</Text>
              }
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Menu list */}
      <View style={styles.menuList}>
        {MENU.filter(m => m.key !== 'dpp').map((m, i, arr) => {
          const isOpen = expanded === m.key;
          const isLast = i === arr.length - 1;
          return (
            <View key={m.key}>
              <TouchableOpacity
                style={[styles.menuRow, !isLast && styles.menuRowBorder]}
                onPress={() => handleMenuPress(m.key)}
                activeOpacity={0.85}
              >
                <View style={styles.menuIcon}>
                  <DGIcon name={m.icon} size={16} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuLabel}>{m.label}</Text>
                  <Text style={styles.menuSub}>{m.sub}</Text>
                </View>
                <DGIcon
                  name={m.key === 'notif' && isOpen ? 'chevronDown' : 'chevronRight'}
                  size={16}
                  color={colors.inkSubtle}
                />
              </TouchableOpacity>

              {/* Notif expanded */}
              {m.key === 'notif' && isOpen && (
                <View style={styles.notifPanel}>
                  {Platform.OS === 'web' ? (
                    <View style={styles.notifWebBanner}>
                      <Text style={styles.notifWebText}>
                        Notificações disponíveis apenas no app mobile.
                      </Text>
                    </View>
                  ) : notifLoading ? (
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
                      <Text style={styles.label}>Horário padrão de lembretes</Text>
                      <TextInput
                        style={[styles.input, styles.notifTimeInput]}
                        value={defaultTime}
                        onChangeText={text => {
                          setDefaultTime(text);
                          const [h, mm] = text.split(':');
                          if (text.length === 5 && !isNaN(Number(h)) && !isNaN(Number(mm))) {
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
            </View>
          );
        })}
      </View>

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

  hero: {
    paddingHorizontal: 22,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 6 },
  avatar: {
    width: 76, height: 76, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 4, borderColor: '#fff',
    shadowColor: '#281438', shadowOpacity: 0.18, shadowOffset: { width: 0, height: 12 }, shadowRadius: 24, elevation: 6,
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 30, color: '#fff',
  },
  heroName: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 19, letterSpacing: -0.4, color: colors.text,
  },
  heroSub: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 3, marginTop: 6,
    borderRadius: 100, backgroundColor: '#fff',
  },
  heroBadgeText: { ...typography.caption, color: colors.primary, fontSize: 10, letterSpacing: 0.4 },

  statsCard: {
    backgroundColor: '#fff', borderRadius: 18, marginTop: 16, paddingVertical: 14, paddingHorizontal: 12,
    flexDirection: 'row', alignItems: 'center',
    shadowColor: '#281438', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 8 }, shadowRadius: 20, elevation: 3,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22, letterSpacing: -0.6, color: colors.text,
  },
  statLabel: { ...typography.caption, color: colors.textSecondary, fontSize: 10, marginTop: 1 },
  statDivider: { width: 1, alignSelf: 'stretch', backgroundColor: colors.border, marginVertical: 4 },

  dppCard: {
    marginHorizontal: 18, marginTop: 14, padding: 14, borderRadius: 18,
    backgroundColor: colors.surface,
    flexDirection: 'row', alignItems: 'center', gap: 14,
    shadowColor: '#281438', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 6 }, shadowRadius: 16, elevation: 2,
  },
  dppIcon: {
    width: 48, height: 48, borderRadius: 14, backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  dppEyebrow: { ...typography.eyebrow, color: colors.textSecondary, fontSize: 10 },
  dppValue: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 17, color: colors.text, marginTop: 2,
  },

  expandPanel: {
    marginHorizontal: 18, marginTop: 8, padding: 16, borderRadius: 18,
    backgroundColor: colors.surface,
    shadowColor: '#281438', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 1,
  },
  label: { ...typography.label, color: colors.text, marginBottom: 6, marginTop: 8 },
  required: { color: colors.error },
  input: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    ...typography.body, color: colors.text,
    borderWidth: 1, borderColor: colors.border,
  },
  inputFocused: { borderColor: colors.primary, backgroundColor: '#fff' },
  inputError: { backgroundColor: colors.errorContainer, borderColor: colors.error },
  errorText: { ...typography.bodySmall, color: colors.error, marginTop: 4 },
  saveBtnWrapper: { marginTop: 16, borderRadius: 12, overflow: 'hidden' },
  saveBtn: { borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  btnDisabled: { opacity: 0.6 },
  saveBtnText: { ...typography.h3, color: '#ffffff', fontSize: 14 },

  menuList: {
    marginHorizontal: 18, marginTop: 14, padding: 4, borderRadius: 18,
    backgroundColor: colors.surface,
    shadowColor: '#281438', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 1,
  },
  menuRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingVertical: 12, paddingHorizontal: 12,
  },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  menuIcon: {
    width: 36, height: 36, borderRadius: 12, backgroundColor: colors.lav50,
    alignItems: 'center', justifyContent: 'center',
  },
  menuLabel: { ...typography.label, color: colors.text, fontSize: 13.5 },
  menuSub: { ...typography.caption, color: colors.textSecondary, fontSize: 11, marginTop: 1 },

  notifPanel: {
    paddingHorizontal: 12, paddingBottom: 12,
  },
  notifWebBanner: {
    backgroundColor: colors.surfaceContainer, borderRadius: 12,
    padding: 14, marginTop: 8,
  },
  notifWebText: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  notifRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 8,
  },
  notifLabel: { ...typography.body, color: colors.text, flex: 1 },
  notifTimeDivider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  notifTimeInput: { marginTop: 0 },

  disclaimer: { marginTop: 24, paddingHorizontal: 22 },
  disclaimerText: { ...typography.caption, color: colors.textLight, textAlign: 'center', lineHeight: 18 },
});
