import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';
import { colors } from '../../src/theme';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { getWeek } from '../../src/data';
import { getProfile } from '../../src/hooks/useUserProfile';

type ContentCard = {
  key: string;
  icon: DGIconName;
  label: string;
  bg: string;
  iconColor: string;
};

const CONTENT_CARDS: ContentCard[] = [
  { key: 'video',     icon: 'eye',      label: 'Vídeo da semana', bg: '#FFE9D6', iconColor: '#E8854A' },
  { key: 'baby',      icon: 'flower',   label: 'Seu bebê',         bg: colors.primaryLight, iconColor: colors.primary },
  { key: 'health',    icon: 'heart',    label: 'Saúde da mãe',     bg: colors.lav50, iconColor: colors.lav200 },
  { key: 'wellness',  icon: 'sparkles', label: 'Bem-estar',        bg: '#E5F5E5', iconColor: '#5BB76E' },
  { key: 'nutrition', icon: 'droplet',  label: 'Nutrição',         bg: '#E0F1FA', iconColor: '#5C9BC2' },
  { key: 'alerts',    icon: 'bell',     label: 'Alertas',          bg: '#FFE3E3', iconColor: '#E15858' },
];

export default function BebeScreen() {
  const insets = useSafeAreaInsets();
  const currentWeek = useCurrentWeek();
  const [dueDateISO, setDueDateISO] = useState<string | null>(null);

  useEffect(() => {
    getProfile().then((p) => {
      if (p) setDueDateISO(p.dueDate ?? null);
    });
  }, []);

  if (currentWeek === null) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const weekData = getWeek(currentWeek);
  const daysUntilBirth = (40 - currentWeek) * 7;
  const progressFraction = Math.min(1, currentWeek / 40);

  // Circle math
  const SIZE = 220;
  const STROKE = 10;
  const R = (SIZE - STROKE * 2) / 2;
  const C = 2 * Math.PI * R;
  const dashOffset = C * (1 - progressFraction);

  const dateRange = formatWeekRange(dueDateISO, currentWeek);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerSide} />
          <Text style={styles.headerTitle}>Pregnancy Tracker</Text>
          <TouchableOpacity style={styles.headerAction}>
            <DGIcon name="sparkles" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Tracker card */}
        <View style={styles.trackerWrap}>
          <View style={styles.trackerCard}>
            {/* Week nav */}
            <View style={styles.weekNavRow}>
              <TouchableOpacity style={styles.weekNavBtn}>
                <Text style={styles.weekNavArrow}>‹</Text>
              </TouchableOpacity>
              <View style={styles.weekNavCenter}>
                <Text style={styles.weekNavTitle}>Semana {currentWeek}</Text>
                {dateRange ? <Text style={styles.weekNavRange}>{dateRange}</Text> : null}
              </View>
              <TouchableOpacity style={styles.weekNavBtn}>
                <Text style={styles.weekNavArrow}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Circular progress */}
            <View style={styles.circleWrap}>
              <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                <Circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={R}
                  fill="none"
                  stroke={colors.lav50}
                  strokeWidth={STROKE}
                />
                <Circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={R}
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={dashOffset}
                  transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                />
              </Svg>
              <LinearGradient
                colors={[colors.lav50, colors.primaryLight]}
                style={styles.circleInner}
              >
                <DGIcon name="pregnant" size={140} color={colors.primary} />
              </LinearGradient>

              {/* Side badges */}
              <View style={[styles.badge, styles.badgeLeft]}>
                <Text style={styles.badgeLabel}>Comprim.</Text>
                <Text style={styles.badgeValue}>{weekData?.baby.sizeCm ?? '—'}</Text>
              </View>
              <View style={[styles.badge, styles.badgeRight]}>
                <Text style={styles.badgeLabel}>Peso</Text>
                <Text style={styles.badgeValue}>{weekData?.baby.weightG ?? '—'}</Text>
              </View>
            </View>

            <View style={styles.trackerFooter}>
              <Text style={styles.trackerFooterSub}>Faltam apenas</Text>
              <Text style={styles.trackerFooterMain}>{daysUntilBirth} dias</Text>
              <TouchableOpacity style={styles.detailsBtn} activeOpacity={0.85}>
                <Text style={styles.detailsBtnText}>Ver detalhes do bebê</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Weekly content grid */}
        <View style={styles.contentSection}>
          <Text style={styles.contentTitle}>Conteúdo semanal</Text>
          <View style={styles.contentGrid}>
            {CONTENT_CARDS.map((c) => (
              <TouchableOpacity key={c.key} style={styles.contentCard} activeOpacity={0.85}>
                <View style={[styles.contentIconBox, { backgroundColor: c.bg }]}>
                  <DGIcon name={c.icon} size={18} color={c.iconColor} />
                </View>
                <View style={styles.contentArrow}>
                  <Text style={styles.contentArrowText}>→</Text>
                </View>
                <Text style={styles.contentLabel}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function formatWeekRange(dueDateISO: string | null, week: number): string | null {
  if (!dueDateISO) return null;
  const dpp = new Date(`${dueDateISO}T00:00:00`);
  if (isNaN(dpp.getTime())) return null;
  // Estimated start of current gestational week
  const weekStart = new Date(dpp.getTime() - (40 - week) * 7 * 86_400_000);
  const weekEnd = new Date(weekStart.getTime() + 6 * 86_400_000);
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${weekStart.getDate()} — ${weekEnd.getDate()} ${months[weekEnd.getMonth()]}`;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  scrollContent: { paddingTop: 8, paddingBottom: 120 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 8,
    gap: 12,
  },
  headerSide: { width: 42 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  headerAction: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Tracker card
  trackerWrap: { paddingHorizontal: 18, paddingTop: 14 },
  trackerCard: {
    backgroundColor: colors.surface,
    borderRadius: 32,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 2,
  },
  weekNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekNavBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.lav50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekNavArrow: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: 'PlusJakartaSans_700Bold',
    lineHeight: 18,
  },
  weekNavCenter: { alignItems: 'center' },
  weekNavTitle: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  weekNavRange: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
  },

  // Circle
  circleWrap: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    position: 'relative',
  },
  circleInner: {
    position: 'absolute',
    top: 22,
    left: 22,
    right: 22,
    bottom: 22,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  badge: {
    position: 'absolute',
    top: '38%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  badgeLeft: { left: -8 },
  badgeRight: { right: -8 },
  badgeLabel: {
    fontSize: 9.5,
    color: colors.textSecondary,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  badgeValue: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
  },

  // Tracker footer
  trackerFooter: { alignItems: 'center', marginTop: 8 },
  trackerFooterSub: {
    fontSize: 12.5,
    color: colors.textSecondary,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  trackerFooterMain: {
    fontSize: 22,
    color: colors.text,
    marginTop: 2,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    letterSpacing: -0.6,
  },
  detailsBtn: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 4,
  },
  detailsBtnText: {
    color: colors.onPrimary,
    fontSize: 12.5,
    fontFamily: 'PlusJakartaSans_700Bold',
  },

  // Content grid
  contentSection: { paddingHorizontal: 18, paddingTop: 14 },
  contentTitle: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
    marginBottom: 10,
  },
  contentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  contentCard: {
    width: '31.5%',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  contentIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentArrow: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.lav200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentArrowText: {
    fontSize: 9,
    color: colors.lav200,
    fontFamily: 'PlusJakartaSans_700Bold',
    lineHeight: 10,
  },
  contentLabel: {
    fontSize: 10.5,
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans_600SemiBold',
    lineHeight: 14,
  },
});
