import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';
import { colors } from '../../src/theme';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { getWeek, getCurrentDayInWeek } from '../../src/data';
import { getProfile } from '../../src/hooks/useUserProfile';

const TRIMESTER_LABELS: Record<1 | 2 | 3, string> = {
  1: '1º TRIMESTRE',
  2: '2º TRIMESTRE',
  3: '3º TRIMESTRE',
};

type CareKey = 'vitamina' | 'agua' | 'chutes';

type CareItem = {
  key: CareKey;
  icon: DGIconName;
  label: string;
  sub: string;
  iconBg: string;
  iconColor: string;
};

const CARE_ITEMS: CareItem[] = [
  {
    key: 'vitamina',
    icon: 'pill',
    label: 'Vitamina',
    sub: 'Ácido fólico · 08:00',
    iconBg: colors.lav50,
    iconColor: colors.lav200,
  },
  {
    key: 'agua',
    icon: 'droplet',
    label: 'Água',
    sub: '2 / 8 copos',
    iconBg: '#E0F1FA',
    iconColor: '#7BB6D6',
  },
  {
    key: 'chutes',
    icon: 'foot',
    label: 'Chutes',
    sub: '3 hoje',
    iconBg: colors.primaryLight,
    iconColor: colors.pink400,
  },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function HojeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const currentWeek = useCurrentWeek();
  const [userName, setUserName] = useState<string | null>(null);
  const [dueDateISO, setDueDateISO] = useState<string | null>(null);
  const [care, setCare] = useState<Record<CareKey, boolean>>({
    vitamina: true,
    agua: false,
    chutes: false,
  });

  useEffect(() => {
    getProfile().then((p) => {
      if (p) {
        setUserName(p.name ?? null);
        setDueDateISO(p.dueDate ?? null);
      }
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
  const trimester: 1 | 2 | 3 = weekData?.trimester ?? 1;
  const trimesterLabel = TRIMESTER_LABELS[trimester];
  const progressPct = Math.min(100, Math.round((currentWeek / 40) * 100));
  const dayInWeek = dueDateISO ? getCurrentDayInWeek(dueDateISO) : 0;
  const initial = userName ? userName.trim().charAt(0).toUpperCase() : null;
  const greeting = getGreeting();
  const firstName = userName ? userName.split(' ')[0] : 'Olá';
  const kicksCount = 3;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={[colors.pink200, colors.pink400]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            {initial ? (
              <Text style={styles.avatarText}>{initial}</Text>
            ) : (
              <DGIcon name="user" size={22} color={colors.onPrimary} />
            )}
          </LinearGradient>
          <View style={styles.headerText}>
            <Text style={styles.greetingLabel}>{greeting},</Text>
            <Text style={styles.greetingName} numberOfLines={1}>
              {firstName}
            </Text>
          </View>
          <TouchableOpacity style={styles.bell} activeOpacity={0.8}>
            <DGIcon name="bell" size={18} color={colors.text} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        {/* Hero gradient card */}
        <View style={styles.heroWrap}>
          <LinearGradient
            colors={[colors.pink400, colors.primary, colors.primaryDeep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroTop}>
              <View style={styles.heroLeft}>
                <Text style={styles.eyebrow}>{trimesterLabel}</Text>
                <View style={styles.weeksRow}>
                  <Text style={styles.weeksNum}>{currentWeek}</Text>
                  <Text style={styles.weeksLbl}>semanas</Text>
                </View>
                <Text style={styles.weeksSub}>e {dayInWeek} dias</Text>
              </View>
              <View style={styles.fetusBox}>
                <DGIcon name="pregnant" size={56} color={colors.onPrimary} />
              </View>
            </View>
            <View style={styles.progressBlock}>
              <View style={styles.progressLabels}>
                <Text style={styles.progressText}>{progressPct}% concluído</Text>
                <Text style={styles.progressText}>{daysUntilBirth} dias</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Seu bebê hoje */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Seu bebê hoje</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/bebe')}>
              <Text style={styles.sectionLink}>Ver tudo →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.babyCard}>
            <LinearGradient
              colors={[colors.lav50, colors.primaryLight]}
              style={styles.babyIcon}
            >
              <DGIcon name="flower" size={36} color={colors.primary} />
            </LinearGradient>
            <View style={styles.babyText}>
              <Text style={styles.babyName} numberOfLines={1}>
                {weekData?.baby.comparison ?? 'Bebê em desenvolvimento'}
              </Text>
              <Text style={styles.babyMeta}>
                {weekData?.baby.sizeCm ?? '—'}
                {weekData?.baby.weightG ? ` · ${weekData.baby.weightG}` : ''}
              </Text>
              {weekData?.motivationalPhrase ? (
                <Text style={styles.babyHighlight} numberOfLines={1}>
                  {weekData.motivationalPhrase}
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        {/* Cuidados de hoje */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cuidados de hoje</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>+ Add</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.careRow}>
            {CARE_ITEMS.map((item) => (
              <Pressable
                key={item.key}
                style={styles.careCard}
                onPress={() => setCare((p) => ({ ...p, [item.key]: !p[item.key] }))}
              >
                <View style={[styles.careIconBox, { backgroundColor: item.iconBg }]}>
                  <DGIcon name={item.icon} size={18} color={item.iconColor} />
                </View>
                <Text style={styles.careLabel}>{item.label}</Text>
                <Text style={styles.careSub} numberOfLines={2}>
                  {item.sub}
                </Text>
                {care[item.key] ? (
                  <View style={styles.careDone}>
                    <Text style={styles.careDoneText}>✓ feito</Text>
                  </View>
                ) : null}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Contador de chutes */}
        <View style={styles.sectionWrap}>
          <TouchableOpacity style={styles.kickCard} activeOpacity={0.85}>
            <LinearGradient
              colors={[colors.pink400, colors.primaryDeep]}
              style={styles.kickIcon}
            >
              <DGIcon name="activity" size={20} color={colors.onPrimary} />
            </LinearGradient>
            <View style={styles.kickText}>
              <Text style={styles.kickTitle}>Contador de chutes</Text>
              <Text style={styles.kickSub}>Toque para registrar quando sentir</Text>
            </View>
            <Text style={styles.kickCount}>{kicksCount}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
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
    gap: 12,
    paddingHorizontal: 22,
    paddingTop: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.onPrimary,
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  headerText: { flex: 1 },
  greetingLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  greetingName: {
    fontSize: 18,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
    lineHeight: 22,
  },
  bell: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.surface,
  },

  // Hero
  heroWrap: { paddingHorizontal: 18, paddingTop: 16 },
  hero: {
    borderRadius: 32,
    padding: 22,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 8,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  heroLeft: { flex: 1 },
  eyebrow: {
    fontSize: 11,
    color: colors.onPrimary,
    opacity: 0.85,
    letterSpacing: 1.2,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  weeksRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 6,
  },
  weeksNum: {
    fontSize: 56,
    color: colors.onPrimary,
    lineHeight: 56,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    letterSpacing: -2,
  },
  weeksLbl: {
    fontSize: 16,
    color: colors.onPrimary,
    opacity: 0.9,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  weeksSub: {
    fontSize: 13,
    color: colors.onPrimary,
    opacity: 0.85,
    marginTop: 2,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  fetusBox: {
    width: 90,
    height: 90,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBlock: { marginTop: 16 },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 11,
    color: colors.onPrimary,
    opacity: 0.85,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.onPrimary,
    borderRadius: 4,
  },

  // Section
  sectionWrap: { paddingHorizontal: 18, paddingTop: 14 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  sectionLink: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: 'PlusJakartaSans_700Bold',
  },

  // Baby card
  babyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 2,
  },
  babyIcon: {
    width: 70,
    height: 70,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  babyText: { flex: 1 },
  babyName: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  babyMeta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  babyHighlight: {
    fontSize: 11,
    color: colors.primaryDeep,
    marginTop: 6,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },

  // Care
  careRow: { flexDirection: 'row', gap: 10 },
  careCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 2,
  },
  careIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  careLabel: {
    fontSize: 12.5,
    color: colors.text,
    marginTop: 8,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  careSub: {
    fontSize: 10.5,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 14,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  careDone: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 100,
    backgroundColor: 'rgba(61,181,126,0.18)',
  },
  careDoneText: {
    fontSize: 9.5,
    color: colors.success,
    fontFamily: 'PlusJakartaSans_700Bold',
  },

  // Kick
  kickCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  kickIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kickText: { flex: 1 },
  kickTitle: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  kickSub: {
    fontSize: 11.5,
    color: colors.textSecondary,
    marginTop: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  kickCount: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
  },
});
