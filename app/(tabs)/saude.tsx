import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';
import { colors } from '../../src/theme';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';

const TIMELINE_MARKS = [6, 10, 14, 18, 20, 24, 28] as const;

type Metric = {
  key: string;
  icon: DGIconName;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  sub: string;
};

const METRICS: Metric[] = [
  { key: 'back',  icon: 'activity', iconBg: colors.primaryLight, iconColor: colors.primary, label: 'Dor lombar', value: 'Leve',   sub: 'ontem' },
  { key: 'urine', icon: 'droplet',  iconBg: '#E0F1FA',           iconColor: '#5C9BC2',      label: 'Urina (pH)', value: '5.0',    sub: 'normal' },
  { key: 'press', icon: 'heart',    iconBg: '#FFE3E3',           iconColor: '#E15858',      label: 'Pressão',    value: '118/76', sub: 'mmHg' },
  { key: 'sleep', icon: 'moon',     iconBg: colors.lav50,        iconColor: colors.lav200,  label: 'Sono',       value: '7h 20m', sub: 'suave' },
];

type Symptom = { key: string; label: string; active: boolean };

const SYMPTOMS: Symptom[] = [
  { key: 'nausea',   label: 'Náusea',     active: true  },
  { key: 'fatigue',  label: 'Cansaço',    active: true  },
  { key: 'backpain', label: 'Dor lombar', active: true  },
  { key: 'swelling', label: 'Inchaço',    active: false },
  { key: 'cramps',   label: 'Cólicas',    active: false },
];

function getCurrentMark(week: number): number {
  // Nearest mark to highlight
  return TIMELINE_MARKS.reduce((prev, curr) =>
    Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
  , TIMELINE_MARKS[0]);
}

function todayLabel(): string {
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const d = new Date();
  return `${days[d.getDay()]} · ${d.getDate()} ${months[d.getMonth()]}`;
}

export default function SaudeScreen() {
  const insets = useSafeAreaInsets();
  const currentWeek = useCurrentWeek();
  const week = currentWeek ?? 20;
  const markWeek = getCurrentMark(week);
  // Timeline progress 6w-28w window
  const TIMELINE_START = 6;
  const TIMELINE_END = 28;
  const progress = Math.max(0, Math.min(1, (week - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)));

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerSide} />
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerEyebrow}>{todayLabel()}</Text>
            <Text style={styles.headerTitle}>Sua saúde</Text>
          </View>
          <TouchableOpacity style={styles.headerAction}>
            <DGIcon name="plus" size={20} color={colors.onPrimary} />
          </TouchableOpacity>
        </View>

        {/* Condition card */}
        <View style={styles.sectionWrap}>
          <View style={styles.conditionCard}>
            <View style={styles.conditionTopRow}>
              <View style={styles.conditionIcon}>
                <DGIcon name="calendar" size={16} color={colors.primary} />
              </View>
              <Text style={styles.conditionTitle}>Condição da mãe</Text>
              <LinearGradient
                colors={[colors.pink400, colors.primaryDeep]}
                style={styles.aiBadge}
              >
                <Text style={styles.aiBadgeText}>AI</Text>
              </LinearGradient>
            </View>
            {/* Week timeline */}
            <View style={styles.timelineBlock}>
              <View style={styles.timelineLabels}>
                {TIMELINE_MARKS.map((w) => (
                  <Text
                    key={w}
                    style={[
                      styles.timelineLabel,
                      w === markWeek && styles.timelineLabelActive,
                    ]}
                  >
                    {w}w
                  </Text>
                ))}
              </View>
              <View style={styles.timelineBar}>
                <LinearGradient
                  colors={[colors.pink300, colors.primary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.timelineFill, { width: `${progress * 100}%` }]}
                />
                <View style={[styles.timelineMarker, { left: `${Math.max(0, progress * 100 - 3)}%` }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Metric grid */}
        <View style={styles.metricsWrap}>
          {METRICS.map((m) => (
            <View key={m.key} style={styles.metricCard}>
              <View style={styles.metricTop}>
                <View style={[styles.metricIcon, { backgroundColor: m.iconBg }]}>
                  <DGIcon name={m.icon} size={14} color={m.iconColor} />
                </View>
                <Text style={styles.metricLabel}>{m.label}</Text>
              </View>
              <Text style={styles.metricValue}>{m.value}</Text>
              <Text style={styles.metricSub}>{m.sub}</Text>
            </View>
          ))}
        </View>

        {/* Weight gain card */}
        <View style={styles.sectionWrap}>
          <View style={styles.weightCard}>
            <View style={styles.weightHeader}>
              <View>
                <Text style={styles.weightLabel}>Ganho de peso</Text>
                <View style={styles.weightValueRow}>
                  <Text style={styles.weightValue}>+5,8</Text>
                  <Text style={styles.weightUnit}>kg</Text>
                </View>
              </View>
              <View style={styles.healthyChip}>
                <Text style={styles.healthyChipText}>saudável</Text>
              </View>
            </View>
            <Svg viewBox="0 0 280 70" width="100%" height={70} style={styles.weightChart}>
              <Defs>
                <SvgGradient id="weight-g" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor={colors.primary} stopOpacity="0.35" />
                  <Stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
                </SvgGradient>
              </Defs>
              <Path
                d="M 0 60 Q 35 56 70 50 T 140 36 T 210 22 L 280 14 L 280 70 L 0 70 Z"
                fill="url(#weight-g)"
              />
              <Path
                d="M 0 60 Q 35 56 70 50 T 140 36 T 210 22 L 280 14"
                stroke={colors.primary}
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </View>

        {/* Symptoms */}
        <View style={styles.symptomsWrap}>
          <View style={styles.symptomsHeader}>
            <Text style={styles.symptomsTitle}>Sintomas hoje</Text>
            <TouchableOpacity>
              <Text style={styles.symptomsAdd}>+ Adicionar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.symptomsRow}>
            {SYMPTOMS.map((s) => (
              <TouchableOpacity
                key={s.key}
                style={[styles.chip, s.active ? styles.chipActive : styles.chipInactive]}
                activeOpacity={0.85}
              >
                <Text style={[styles.chipText, s.active && styles.chipTextActive]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingTop: 8, paddingBottom: 120 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 14,
    gap: 12,
  },
  headerSide: { width: 42 },
  headerTextBlock: { flex: 1 },
  headerEyebrow: {
    fontSize: 11,
    color: colors.textSecondary,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  headerTitle: {
    fontSize: 22,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    letterSpacing: -0.6,
  },
  headerAction: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 6,
  },

  sectionWrap: { paddingHorizontal: 18 },

  // Condition
  conditionCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 2,
  },
  conditionTopRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  conditionIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.lav50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionTitle: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  aiBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBadgeText: {
    color: colors.onPrimary,
    fontSize: 9,
    letterSpacing: 0.4,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
  },
  timelineBlock: { marginTop: 14 },
  timelineLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  timelineLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  timelineLabelActive: {
    color: colors.primary,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
  },
  timelineBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lav50,
    marginTop: 8,
    position: 'relative',
    overflow: 'visible',
  },
  timelineFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 4,
  },
  timelineMarker: {
    position: 'absolute',
    top: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },

  // Metrics
  metricsWrap: {
    paddingHorizontal: 18,
    paddingTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  metricTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metricIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: {
    fontSize: 11.5,
    color: colors.textSecondary,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  metricValue: {
    fontSize: 19,
    color: colors.text,
    marginTop: 6,
    letterSpacing: -0.4,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
  },
  metricSub: {
    fontSize: 10,
    color: colors.inkSubtle,
    marginTop: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
  },

  // Weight
  weightCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 2,
  },
  weightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weightLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  weightValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 2 },
  weightValue: {
    fontSize: 26,
    color: colors.text,
    letterSpacing: -0.6,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
  },
  weightUnit: {
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  healthyChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: 'rgba(61,181,126,0.18)',
  },
  healthyChipText: {
    color: colors.success,
    fontSize: 10.5,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  weightChart: { marginTop: 10 },

  // Symptoms
  symptomsWrap: { paddingHorizontal: 22, paddingTop: 12 },
  symptomsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  symptomsTitle: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  symptomsAdd: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  symptomsRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 100,
  },
  chipActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 4,
  },
  chipInactive: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  chipText: {
    fontSize: 11.5,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  chipTextActive: { color: colors.onPrimary },
});
