import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../src/theme';
import { DGIcon, DGIconName } from '../src/components/DGIcon';

type Medication = {
  id: string;
  time: string;
  name: string;
  detail: string;
  tint: string;
  icon: DGIconName;
  done: boolean;
};

const INITIAL_MEDS: Medication[] = [];

export default function MedsScreen() {
  const router = useRouter();
  const [meds, setMeds] = useState<Medication[]>(INITIAL_MEDS);

  const { done, total, pct } = useMemo(() => {
    const t = meds.length;
    const d = meds.filter((m) => m.done).length;
    const p = t === 0 ? 0 : Math.round((d / t) * 100);
    return { done: d, total: t, pct: p };
  }, [meds]);

  function toggle(id: string) {
    setMeds((prev) =>
      prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m)),
    );
  }

  function comingSoon() {
    Alert.alert(
      'Em breve! 🌸',
      'Adicionar medicamentos e suplementos chega em uma próxima atualização.',
    );
  }

  const today = new Date();
  const weekday = today.toLocaleDateString('pt-BR', { weekday: 'long' });
  const dateLabel = `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} · ${today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}`;

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dashLen = (pct / 100) * circumference;

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <DGIcon name="chevronLeft" size="sm" color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerEyebrow}>{dateLabel}</Text>
          <Text style={styles.headerTitle}>Lembretes</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={comingSoon}
          accessibilityRole="button"
          accessibilityLabel="Adicionar medicamento"
        >
          <DGIcon name="plus" size="md" color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[colors.pink400, colors.primaryDeep]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroRing}>
            <Svg width={80} height={80} viewBox="0 0 80 80">
              <Circle
                cx={40}
                cy={40}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={6}
              />
              <Circle
                cx={40}
                cy={40}
                r={radius}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={6}
                strokeLinecap="round"
                strokeDasharray={`${dashLen} 9999`}
                transform="rotate(-90 40 40)"
              />
            </Svg>
            <View style={styles.heroRingText}>
              <Text style={styles.heroFraction}>
                {done}/{total}
              </Text>
              <Text style={styles.heroLabel}>HOJE</Text>
            </View>
          </View>
          <View style={styles.heroInfo}>
            <Text style={styles.heroTitle}>
              {total === 0
                ? 'Comece quando quiser'
                : pct === 100
                  ? 'Tudo em dia!'
                  : 'Quase lá!'}
            </Text>
            <Text style={styles.heroSub}>
              {total === 0
                ? 'Toque + para adicionar seu primeiro lembrete'
                : `Faltam ${total - done} doses hoje`}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Hoje</Text>
            <Text style={styles.listCount}>
              {total} {total === 1 ? 'dose' : 'doses'}
            </Text>
          </View>

          {meds.length === 0 ? (
            <View style={styles.empty}>
              <DGIcon name="pill" size="lg" color={colors.primary} />
              <Text style={styles.emptyTitle}>Nenhum lembrete ainda</Text>
              <Text style={styles.emptyText}>
                Cadastre vitaminas, suplementos ou remédios e receba alertas no horário certo.
              </Text>
            </View>
          ) : (
            meds.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.medCard,
                  m.done && styles.medCardDone,
                ]}
                onPress={() => toggle(m.id)}
                activeOpacity={0.85}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: m.done }}
                accessibilityLabel={`${m.name} às ${m.time}`}
              >
                <View
                  style={[styles.medIcon, { backgroundColor: m.tint + '18' }]}
                >
                  <DGIcon name={m.icon} size="md" color={m.tint} />
                </View>
                <View style={styles.medBody}>
                  <View style={styles.medTopRow}>
                    <Text style={styles.medTime}>{m.time}</Text>
                    {m.done ? (
                      <View style={styles.doneChip}>
                        <Text style={styles.doneChipText}>✓ TOMADO</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text
                    style={[
                      styles.medName,
                      m.done && styles.medNameDone,
                    ]}
                  >
                    {m.name}
                  </Text>
                  <Text style={styles.medDetail} numberOfLines={1}>
                    {m.detail}
                  </Text>
                </View>
                <View
                  style={[
                    styles.medCheck,
                    m.done ? styles.medCheckDone : styles.medCheckEmpty,
                  ]}
                >
                  {m.done ? (
                    <DGIcon name="check" size="xs" color="#FFFFFF" />
                  ) : null}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={styles.tomorrowSection}>
          <Text style={styles.tomorrowEyebrow}>Amanhã</Text>
          <View style={styles.tomorrowCard}>
            <DGIcon name="calendar" size="sm" color={colors.textSecondary} />
            <Text style={styles.tomorrowText}>
              {total === 0
                ? 'Sem lembretes programados'
                : `${total} lembretes programados`}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  headerText: { flex: 1 },
  headerEyebrow: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    color: colors.textSecondary,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    letterSpacing: -0.6,
    color: colors.text,
  },
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 6,
  },
  scroll: { paddingBottom: spacing[10] },
  hero: {
    marginHorizontal: spacing[5],
    borderRadius: 26,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 10,
  },
  heroRing: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroRingText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroFraction: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  heroLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.4,
  },
  heroInfo: { flex: 1 },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  heroSub: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  listSection: {
    paddingHorizontal: spacing[5],
    marginTop: spacing[5],
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  listTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: colors.text,
  },
  listCount: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11.5,
    color: colors.textSecondary,
  },
  empty: {
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[4],
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
    alignItems: 'center',
    gap: spacing[2],
  },
  emptyTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: colors.text,
    marginTop: spacing[2],
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  medCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: colors.surface,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  medCardDone: { opacity: 0.7 },
  medIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medBody: { flex: 1, gap: 1 },
  medTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  medTime: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11.5,
    color: colors.textSecondary,
    letterSpacing: 0.3,
  },
  medName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: colors.text,
  },
  medNameDone: {
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  medDetail: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: colors.textSecondary,
  },
  medCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medCheckDone: { backgroundColor: colors.success },
  medCheckEmpty: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.border,
  },
  doneChip: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: colors.successContainer,
  },
  doneChipText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9,
    color: colors.success,
  },
  tomorrowSection: {
    paddingHorizontal: spacing[5],
    marginTop: spacing[4],
  },
  tomorrowEyebrow: {
    ...typography.eyebrow,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing[2],
  },
  tomorrowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
  },
  tomorrowText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
