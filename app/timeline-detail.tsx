import { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, Animated, Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, borderRadius } from '../src/theme';
import { useCurrentWeek } from '../src/hooks/useCurrentWeek';
import { useAllCompletions } from '../src/hooks/useAllCompletions';

const TRIMESTER_SECTIONS = [
  {
    label: '1º Trimestre',
    range: 'Semanas 1–13',
    weeks: Array.from({ length: 13 }, (_, i) => i + 1),
    color: colors.primary,
    bg: colors.trimester1,
    icon: '🌱',
  },
  {
    label: '2º Trimestre',
    range: 'Semanas 14–27',
    weeks: Array.from({ length: 14 }, (_, i) => i + 14),
    color: colors.secondary,
    bg: colors.trimester2,
    icon: '🌸',
  },
  {
    label: '3º Trimestre',
    range: 'Semanas 28–40',
    weeks: Array.from({ length: 13 }, (_, i) => i + 28),
    color: colors.accent,
    bg: colors.trimester3,
    icon: '✨',
  },
] as const;

function PulseCell({ onPress, children }: {
  onPress: () => void;
  children: React.ReactNode;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.08, duration: 700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity style={styles.cellCurrent} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function TimelineDetailScreen() {
  const router = useRouter();
  const currentWeek = useCurrentWeek();
  const completions = useAllCompletions();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (currentWeek === null) return;
    const trimesterIdx = currentWeek <= 13 ? 0 : currentWeek <= 27 ? 1 : 2;
    const sectionHeaderH = 72;
    const gridRowH = CELL_SIZE + 8;
    const rowsPerTrimester = [3, 4, 3];
    let offset = 220;
    for (let i = 0; i < trimesterIdx; i++) {
      offset += sectionHeaderH + rowsPerTrimester[i] * gridRowH + 24;
    }
    const weekInTrimester = currentWeek <= 13 ? currentWeek - 1
      : currentWeek <= 27 ? currentWeek - 14
      : currentWeek - 28;
    const rowIdx = Math.floor(weekInTrimester / 5);
    offset += sectionHeaderH + rowIdx * gridRowH;
    setTimeout(() => scrollRef.current?.scrollTo({ y: Math.max(0, offset - 80), animated: true }), 300);
  }, [currentWeek]);

  if (currentWeek === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const totalCompleted = Object.values(completions).filter(Boolean).length;

  function handleWeekPress(week: number) {
    router.push(`/semana/${week}`);
  }

  return (
    <ScrollView ref={scrollRef} style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Jornada da Gestação</Text>

      <View style={styles.progressBadge}>
        <Text style={styles.progressText}>{totalCompleted} de 40 semanas concluídas</Text>
      </View>

      <View style={styles.legend}>
        <LegendItem color={colors.primary} label="Atual" />
        <LegendItem color={colors.secondaryContainer} label="Concluída ✓" />
        <LegendItem color={colors.surfaceContainerHighest} label="Futura 🔒" />
      </View>

      {TRIMESTER_SECTIONS.map(({ label, range, weeks, color, bg, icon }) => {
        const completed = weeks.filter(w => completions[w]).length;
        const pct = Math.round((completed / weeks.length) * 100);
        const isCurrent = weeks.includes(currentWeek as (typeof weeks)[number]);

        return (
          <View key={label} style={styles.section}>
            <View style={[styles.sectionHeader, { backgroundColor: bg, borderLeftColor: color }]}>
              <View style={styles.sectionHeaderTop}>
                <Text style={styles.sectionIcon}>{icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.sectionTitle, { color }]}>{label}</Text>
                  <Text style={styles.sectionRange}>{range}</Text>
                </View>
                {isCurrent && (
                  <View style={[styles.currentBadge, { backgroundColor: color }]}>
                    <Text style={styles.currentBadgeText}>Você está aqui</Text>
                  </View>
                )}
              </View>
              <View style={styles.sectionProgressTrack}>
                <View style={[styles.sectionProgressFill, { width: `${pct}%` as any, backgroundColor: color }]} />
              </View>
              <Text style={[styles.sectionProgressLabel, { color }]}>{pct}% concluído</Text>
            </View>

            <View style={styles.grid}>
              {weeks.map(week => {
                const isCur = week === currentWeek;
                const isDone = !!completions[week] && !isCur;
                const isPast = currentWeek !== null && week < currentWeek && !completions[week];
                const isFuture = currentWeek !== null && week > currentWeek;

                if (isCur) {
                  return (
                    <PulseCell key={week} onPress={() => handleWeekPress(week)}>
                      <Text style={styles.cellCurrentText}>{week}</Text>
                      <Text style={styles.currentDot}>●</Text>
                    </PulseCell>
                  );
                }

                return (
                  <TouchableOpacity
                    key={week}
                    style={[
                      styles.cell,
                      isDone && { backgroundColor: colors.secondaryContainer },
                      isPast && { backgroundColor: bg, opacity: 0.5 },
                      isFuture && styles.cellFuture,
                    ]}
                    onPress={() => handleWeekPress(week)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.cellText,
                      isDone && { color: colors.text },
                      isFuture && { color: colors.textLight },
                    ]}>
                      {week}
                    </Text>
                    {isDone && <Text style={styles.checkmark}>✓</Text>}
                    {isFuture && <Text style={styles.lockIcon}>🔒</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const CELL_SIZE = 52;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 40 },

  title: { ...typography.h2, color: colors.text, marginBottom: 8 },

  progressBadge: {
    backgroundColor: colors.secondaryContainer,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  progressText: { ...typography.label, color: colors.secondary },

  legend: { flexDirection: 'row', gap: 16, marginBottom: 20, flexWrap: 'wrap' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { ...typography.caption, color: colors.textSecondary },

  section: { marginBottom: 24 },
  sectionHeader: {
    borderLeftWidth: 5,
    borderRadius: borderRadius.xl,
    padding: 14,
    marginBottom: 12,
  },
  sectionHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  sectionIcon: { fontSize: 24 },
  sectionTitle: { ...typography.h3, marginBottom: 2 },
  sectionRange: { ...typography.caption, color: colors.textSecondary },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  currentBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  sectionProgressTrack: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  sectionProgressFill: { height: '100%', borderRadius: 2 },
  sectionProgressLabel: { fontSize: 11, fontWeight: '600' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainerHighest,
  },
  cellFuture: {
    backgroundColor: colors.surfaceContainerHighest,
    opacity: 0.45,
  },
  cellText: { ...typography.label, color: colors.textSecondary },

  cellCurrent: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.onPrimary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  cellCurrentText: { ...typography.label, color: colors.onPrimary, fontWeight: '700' },

  checkmark: { fontSize: 10, color: colors.secondary, position: 'absolute', top: 4, right: 6 },
  currentDot: { fontSize: 7, color: colors.onPrimary, position: 'absolute', bottom: 4 },
  lockIcon: { fontSize: 9, position: 'absolute', bottom: 3 },
});
