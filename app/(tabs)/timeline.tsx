import { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography } from '../../src/theme';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { useAllCompletions } from '../../src/hooks/useAllCompletions';

const TRIMESTER_SECTIONS = [
  { label: '1º Trimestre', weeks: Array.from({ length: 13 }, (_, i) => i + 1), color: colors.trimester1 },
  { label: '2º Trimestre', weeks: Array.from({ length: 14 }, (_, i) => i + 14), color: colors.trimester2 },
  { label: '3º Trimestre', weeks: Array.from({ length: 13 }, (_, i) => i + 28), color: colors.trimester3 },
] as const;

export default function TimelineScreen() {
  const router = useRouter();
  const currentWeek = useCurrentWeek();
  const completions = useAllCompletions();
  const scrollRef = useRef<ScrollView>(null);
  if (currentWeek === null) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>;

  const totalCompleted = Object.values(completions).filter(Boolean).length;

  function handleWeekPress(week: number) {
    router.push(`/semana/${week}`);
  }

  function getCellStyle(week: number, trimColor: string) {
    if (week === currentWeek) return [styles.cell, { backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.onPrimary }];
    if (completions[week]) return [styles.cell, { backgroundColor: trimColor, opacity: 0.9 }];
    if (currentWeek !== null && week < currentWeek) return [styles.cell, { backgroundColor: trimColor, opacity: 0.4 }];
    return [styles.cell, styles.cellFuture, { opacity: 0.5 }];
  }

  function getCellTextStyle(week: number) {
    if (week === currentWeek) return [styles.cellText, { color: colors.onPrimary, fontWeight: '700' as const }];
    if (completions[week]) return [styles.cellText, { color: colors.text }];
    return [styles.cellText, { color: colors.textLight }];
  }

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Jornada da Gestação</Text>
      <View style={styles.progressBadge}>
        <Text style={styles.progressText}>{totalCompleted} de 40 semanas concluídas</Text>
      </View>

      <View style={styles.legend}>
        <LegendItem color={colors.primary} label="Semana atual" />
        <LegendItem color={colors.trimester1} label="Concluída" />
        <LegendItem color={colors.surfaceContainerHighest} label="Futura 🔒" />
      </View>

      {TRIMESTER_SECTIONS.map(({ label, weeks, color }) => (
        <View key={label} style={styles.section}>
          <View style={[styles.sectionHeader, { borderLeftColor: color }]}>
            <Text style={styles.sectionTitle}>{label}</Text>
            <Text style={styles.sectionRange}>Semanas {weeks[0]}–{weeks[weeks.length - 1]}</Text>
          </View>
          <View style={styles.grid}>
            {weeks.map(week => (
              <TouchableOpacity
                key={week}
                style={getCellStyle(week, color)}
                onPress={() => handleWeekPress(week)}
                activeOpacity={0.7}
              >
                <Text style={getCellTextStyle(week)}>{week}</Text>
                {completions[week] && week !== currentWeek && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
                {week === currentWeek && (
                  <Text style={styles.currentDot}>●</Text>
                )}
                {currentWeek !== null && week > currentWeek && (
                  <Text style={styles.lockIcon}>🔒</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
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
    backgroundColor: colors.primaryLight, borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 6, alignSelf: 'flex-start', marginBottom: 12,
  },
  progressText: { ...typography.label, color: colors.primary },
  legend: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { ...typography.caption, color: colors.textSecondary },

  section: { marginBottom: 20 },
  sectionHeader: {
    borderLeftWidth: 3, paddingLeft: 10, marginBottom: 10,
  },
  sectionTitle: { ...typography.h3, color: colors.text },
  sectionRange: { ...typography.caption, color: colors.textSecondary },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cell: {
    width: CELL_SIZE, height: CELL_SIZE, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.surfaceContainerHighest,
  },
  cellFuture: { backgroundColor: colors.surfaceContainerHighest },
  cellText: { ...typography.label, color: colors.textSecondary },
  checkmark: { fontSize: 10, color: colors.accent, position: 'absolute', top: 4, right: 6 },
  currentDot: { fontSize: 8, color: colors.onPrimary, position: 'absolute', bottom: 4 },
  lockIcon: { fontSize: 9, position: 'absolute', bottom: 3 },
});
