import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, shadows } from '../src/theme';
import { useCurrentWeek } from '../src/hooks/useCurrentWeek';
import { getDatabase } from '../src/db';
import { getWeek } from '../src/data';
import { useSymptomChecks } from '../src/hooks/useSymptomChecks';
import { DGIcon } from '../src/components/DGIcon';
import { useBottomSpacing } from '../src/hooks/useBottomSpacing';

interface WeekSymptomCount {
  week: number;
  count: number;
}

const BAR_MAX_HEIGHT = 80;

export default function SymptomsScreen() {
  const router = useRouter();
  const week = useCurrentWeek();
  const bottom = useBottomSpacing(false);
  const { checks, toggleSymptom } = useSymptomChecks(week ?? 1);
  const [weekHistory, setWeekHistory] = useState<WeekSymptomCount[]>([]);
  const [topSymptom, setTopSymptom] = useState<string | null>(null);

  const weekData = week ? getWeek(week) : null;

  useEffect(() => {
    if (week !== null) loadHistory();
  }, [week]);

  async function loadHistory() {
    if (week === null) return;
    const db = await getDatabase();
    const fromWeek = Math.max(1, week - 3);

    const rows = await db.getAllAsync<{ week: number; count: number }>(
      'SELECT week, COUNT(*) as count FROM symptom_checks WHERE week >= ? AND week <= ? AND checked = 1 GROUP BY week',
      [fromWeek, week]
    );

    const history: WeekSymptomCount[] = [];
    for (let w = fromWeek; w <= week; w++) {
      const found = rows.find((r) => r.week === w);
      history.push({ week: w, count: found ? found.count : 0 });
    }
    setWeekHistory(history);

    const top = await db.getFirstAsync<{ symptom_key: string }>(
      'SELECT symptom_key, COUNT(*) as freq FROM symptom_checks WHERE week >= ? AND week <= ? AND checked = 1 GROUP BY symptom_key ORDER BY freq DESC LIMIT 1',
      [fromWeek, week]
    );
    setTopSymptom(top ? top.symptom_key : null);
  }

  if (week === null || !weekData) return null;

  const maxCount = Math.max(...weekHistory.map((h) => h.count), 1);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <DGIcon name="chevronLeft" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sintomas</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Como você está se sentindo?</Text>
          <Text style={styles.heroSub}>Semana {week}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sintomas comuns da semana</Text>
          {weekData.symptoms.map((symptom) => {
            const checked = checks[symptom] ?? false;
            return (
              <Pressable
                key={symptom}
                style={[styles.symptomRow, checked && styles.symptomRowActive]}
                onPress={() => toggleSymptom(symptom, !checked)}
              >
                <View style={[styles.checkbox, checked && styles.checkboxActive]}>
                  {checked && <DGIcon name="check" size={14} color="#ffffff" />}
                </View>
                <Text style={[styles.symptomLabel, checked && styles.symptomLabelActive]}>
                  {symptom}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {weekHistory.length > 0 && (
          <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>Tendência das últimas semanas</Text>
            <View style={styles.chartCard}>
              <View style={styles.chartContainer}>
                {weekHistory.map((h) => {
                  const barHeight = maxCount > 0 ? (h.count / maxCount) * BAR_MAX_HEIGHT : 4;
                  return (
                    <View key={h.week} style={styles.chartBarCol}>
                      <Text style={styles.barCount}>{h.count}</Text>
                      <View style={styles.barTrack}>
                        <View style={[styles.barFill, { height: Math.max(barHeight, 4) }]} />
                      </View>
                      <Text style={styles.barLabel}>Sem {h.week}</Text>
                    </View>
                  );
                })}
              </View>
              
              {topSymptom && (
                <View style={styles.insight}>
                  <DGIcon name="activity" size={18} color={colors.primary} />
                  <Text style={styles.insightText}>
                    Sintoma mais frequente: <Text style={{ fontWeight: '700' }}>{topSymptom}</Text>
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  headerTitle: { ...typography.h3, color: colors.text },
  content: { padding: 20 },
  hero: { marginBottom: 24 },
  heroTitle: { ...typography.h1, color: colors.text },
  heroSub: { ...typography.body, color: colors.textSecondary, marginTop: 4 },
  
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    ...shadows.soft,
  },
  cardTitle: { ...typography.label, color: colors.text, marginBottom: 16 },
  symptomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: colors.surfaceContainerLow,
    gap: 12,
  },
  symptomRowActive: { backgroundColor: colors.primaryLight },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: colors.primary },
  symptomLabel: { ...typography.body, color: colors.text },
  symptomLabelActive: { color: colors.primary, fontWeight: '600' },
  
  chartSection: { marginTop: 32 },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: 16 },
  chartCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    ...shadows.soft,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 20,
  },
  chartBarCol: { alignItems: 'center', width: 60 },
  barCount: { ...typography.caption, color: colors.textSecondary, marginBottom: 4 },
  barTrack: {
    width: 12,
    height: BAR_MAX_HEIGHT,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 6,
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  barLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 8, fontSize: 10 },
  
  insight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    backgroundColor: colors.lav50,
    borderRadius: 12,
  },
  insightText: { ...typography.bodySmall, color: colors.textSecondary },
});
