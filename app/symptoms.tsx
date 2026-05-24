import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, shadows } from '../src/theme';
import { useCurrentWeek } from '../src/hooks/useCurrentWeek';
import { getWeek } from '../src/data';
import { WEEKLY_SYMPTOM_INSIGHTS } from '../src/data/shared/symptomInsights';
import {
  useSymptomLogs,
  INTENSITY_COLOR_KEY,
  weekdayShort,
  dayOfMonth,
  Intensity,
} from '../src/hooks/useSymptomLogs';
import { WeekStrip } from '../src/components/symptoms/WeekStrip';
import { SymptomRow } from '../src/components/symptoms/SymptomRow';
import { DayNoteSheet } from '../src/components/symptoms/DayNoteSheet';
import { DGIcon } from '../src/components/DGIcon';
import { useBottomSpacing } from '../src/hooks/useBottomSpacing';

const BAR_MAX = 56;
const LEGEND: { level: Intensity; label: string }[] = [
  { level: 'leve', label: 'Leve' },
  { level: 'media', label: 'Moderado' },
  { level: 'forte', label: 'Forte' },
];

export default function SymptomsScreen() {
  const router = useRouter();
  const currentWeek = useCurrentWeek();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  useEffect(() => {
    if (currentWeek !== null && selectedWeek === null) {
      setSelectedWeek(currentWeek);
    }
  }, [currentWeek, selectedWeek]);

  const activeWeek = selectedWeek ?? currentWeek ?? 1;

  const {
    days, todayISO, logsByDay, notesByDay, weeklyTotals, strongestDay,
    setIntensity, markNoSymptoms, setDayNote,
  } = useSymptomLogs(activeWeek);

  const [selectedDate, setSelectedDate] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);

  useEffect(() => {
    if (days.length > 0) {
      if (days.includes(todayISO)) {
        setSelectedDate(todayISO);
      } else {
        setSelectedDate(days[0]);
      }
    }
  }, [days, todayISO]);

  const bottom = useBottomSpacing(false);
  const weekData = getWeek(activeWeek);

  if (currentWeek === null || !weekData) return null;

  const dayMap = logsByDay[selectedDate] ?? {};
  const dayNote = notesByDay[selectedDate];
  const isFutureSel = selectedDate > todayISO;
  const maxTotal = Math.max(...weeklyTotals.map((d) => d.total), 1);
  const hasAnyLog = weeklyTotals.some(d => d.total > 0) || Object.values(notesByDay).some(n => n.noSymptoms || n.note?.length);

  const dayTitle = !selectedDate
    ? ''
    : selectedDate === todayISO
      ? 'Hoje'
      : `${weekdayShort(selectedDate)}, ${dayOfMonth(selectedDate)}`;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          hitSlop={8}
        >
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
          <View style={styles.weekSelector}>
            <TouchableOpacity
              disabled={activeWeek <= 1}
              onPress={() => setSelectedWeek(w => Math.max(1, (w ?? 1) - 1))}
              style={[styles.weekNavBtn, activeWeek <= 1 && styles.weekNavBtnDisabled]}
              accessibilityRole="button"
              accessibilityLabel="Semana anterior"
              hitSlop={10}
            >
              <DGIcon name="chevronLeft" size={16} color={activeWeek <= 1 ? colors.inkSubtle : colors.primary} />
            </TouchableOpacity>

            <Text style={styles.heroSub}>Semana {activeWeek}</Text>

            <TouchableOpacity
              disabled={activeWeek >= currentWeek}
              onPress={() => setSelectedWeek(w => Math.min(currentWeek, (w ?? 1) + 1))}
              style={[styles.weekNavBtn, activeWeek >= currentWeek && styles.weekNavBtnDisabled]}
              accessibilityRole="button"
              accessibilityLabel="Próxima semana"
              hitSlop={10}
            >
              <DGIcon name="chevronRight" size={16} color={activeWeek >= currentWeek ? colors.inkSubtle : colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Faixa dos 7 dias da semana */}
        <View style={styles.card}>
          <WeekStrip
            days={days}
            todayISO={todayISO}
            selected={selectedDate}
            totals={weeklyTotals}
            onSelect={setSelectedDate}
          />
          <View style={styles.legend}>
            {LEGEND.map((l) => (
              <View key={l.level} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors[INTENSITY_COLOR_KEY[l.level]] }]} />
                <Text style={styles.legendTxt}>{l.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Painel do dia selecionado */}
        <View style={styles.card}>
          <View style={styles.dayHead}>
            <Text style={styles.cardTitle}>{dayTitle}</Text>
            <Text style={styles.hint}>Toque no nível que você sentiu · toque de novo para tirar</Text>
          </View>

          <View style={styles.symptomList}>
            {weekData.symptoms.map((symptom) => (
              <SymptomRow
                key={symptom}
                label={symptom}
                level={(dayMap[symptom] as Intensity) ?? null}
                disabled={isFutureSel}
                onSelect={(lv) => setIntensity(selectedDate, symptom, lv)}
              />
            ))}
          </View>

          <View style={styles.dayActions}>
            <Pressable
              style={({ pressed }) => [
                styles.actionBtn,
                dayNote?.noSymptoms && styles.actionBtnActive,
                pressed && !isFutureSel && styles.pressed,
              ]}
              disabled={isFutureSel}
              onPress={() => markNoSymptoms(selectedDate)}
              accessibilityRole="button"
              accessibilityState={{ selected: !!dayNote?.noSymptoms, disabled: isFutureSel }}
              accessibilityLabel="Marcar dia sem sintomas"
            >
              <DGIcon name="flower" size={18} color={dayNote?.noSymptoms ? colors.success : colors.textSecondary} />
              <Text style={[styles.actionTxt, dayNote?.noSymptoms && { color: colors.success }]}>
                Sem sintomas
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.actionBtn, pressed && !isFutureSel && styles.pressed]}
              disabled={isFutureSel}
              onPress={() => setNoteOpen(true)}
              accessibilityRole="button"
              accessibilityLabel={dayNote?.note ? 'Editar nota do dia' : 'Anotar algo sobre o dia'}
            >
              <DGIcon name="edit" size={18} color={colors.textSecondary} />
              <Text style={styles.actionTxt}>{dayNote?.note ? 'Editar nota' : 'Anotar algo'}</Text>
            </Pressable>
          </View>

          {dayNote?.note ? <Text style={styles.notePreview}>“{dayNote.note}”</Text> : null}
        </View>

        {/* Insight + intensidade da semana */}
        {hasAnyLog ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Intensidade na semana</Text>
            <View style={styles.chart}>
              {weeklyTotals.map((d) => {
                const h = d.total > 0 ? Math.max((d.total / maxTotal) * BAR_MAX, 6) : (d.noSymptoms ? 6 : 4);
                const c = d.maxLevel
                  ? colors[INTENSITY_COLOR_KEY[d.maxLevel]]
                  : d.noSymptoms
                    ? colors.successContainer
                    : colors.surfaceContainerHigh;
                return (
                  <View key={d.date} style={styles.barCol}>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { height: h, backgroundColor: c }]} />
                    </View>
                    <Text style={[styles.barLabel, d.date === todayISO && styles.barLabelToday]}>
                      {weekdayShort(d.date)}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.insight}>
              {strongestDay ? (
                <>
                  <DGIcon name="activity" size={18} color={colors.primary} />
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.insightTxt}>
                      Seus sintomas foram mais fortes{' '}
                      <Text style={styles.insightStrong}>
                        {strongestDay.date === todayISO
                          ? 'hoje'
                          : `${weekdayShort(strongestDay.date)}, ${dayOfMonth(strongestDay.date)}`}
                      </Text>
                      .
                    </Text>
                    {WEEKLY_SYMPTOM_INSIGHTS[activeWeek] && (
                      <Text style={styles.clinicalInsightTxt}>
                        {WEEKLY_SYMPTOM_INSIGHTS[activeWeek]}
                      </Text>
                    )}
                  </View>
                </>
              ) : (
                <>
                  <DGIcon name="check2" size={18} color={colors.success} />
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.insightTxt}>
                      Esta semana tem sido tranquila e sem sintomas relatados. Que excelente!
                    </Text>
                    {WEEKLY_SYMPTOM_INSIGHTS[activeWeek] && (
                      <Text style={styles.clinicalInsightTxt}>
                        {WEEKLY_SYMPTOM_INSIGHTS[activeWeek]}
                      </Text>
                    )}
                  </View>
                </>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTxt}>
              Registre como você se sente nos próximos dias para ver em qual período da
              semana os sintomas ficam mais fortes.
            </Text>
          </View>
        )}

        {/* Relatório para o médico */}
        <TouchableOpacity style={styles.reportBtn} onPress={() => router.push('/symptom-report')}>
          <DGIcon name="fileText" size={20} color={colors.onPrimary} />
          <Text style={styles.reportTxt}>Relatório para a consulta</Text>
        </TouchableOpacity>
      </ScrollView>

      <DayNoteSheet
        visible={noteOpen}
        initialNote={dayNote?.note ?? null}
        dateLabel={dayTitle}
        onSave={(note) => setDayNote(selectedDate, note)}
        onClose={() => setNoteOpen(false)}
      />
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
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center',
    ...shadows.soft,
  },
  headerTitle: { ...typography.h3, color: colors.text },
  content: { padding: 20, gap: 16 },
  hero: { marginBottom: 4, gap: 8 },
  heroTitle: { ...typography.h1, color: colors.text },
  heroSub: { ...typography.body, color: colors.textSecondary, fontWeight: '700' },
  weekSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  weekNavBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  weekNavBtnDisabled: {
    opacity: 0.5,
    backgroundColor: colors.disabled,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    ...shadows.soft,
  },
  cardTitle: { ...typography.label, color: colors.text },

  legend: { flexDirection: 'row', justifyContent: 'center', gap: 18, marginTop: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendTxt: { ...typography.caption, color: colors.textSecondary },

  dayHead: { marginBottom: 14 },
  hint: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  symptomList: { marginTop: 4 },
  pressed: { opacity: 0.7 },

  dayActions: { flexDirection: 'row', gap: 12, marginTop: 12 },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 12, borderRadius: 16,
    backgroundColor: colors.surfaceContainerLow,
  },
  actionBtnActive: { backgroundColor: colors.successContainer },
  actionTxt: { ...typography.bodySmall, color: colors.textSecondary, fontWeight: '600' },
  notePreview: { ...typography.bodySmall, color: colors.textSecondary, fontStyle: 'italic', marginTop: 12 },

  sectionTitle: { ...typography.label, color: colors.text, marginBottom: 16 },
  chart: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
    height: BAR_MAX + 24,
  },
  barCol: { flex: 1, alignItems: 'center', gap: 8 },
  barTrack: { height: BAR_MAX, justifyContent: 'flex-end' },
  barFill: { width: 14, borderRadius: 7 },
  barLabel: { ...typography.caption, color: colors.textSecondary, fontSize: 10 },
  barLabelToday: { color: colors.primaryDeep, fontWeight: '800' },

  insight: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    padding: 12, marginTop: 16,
    backgroundColor: colors.lav50, borderRadius: 12,
  },
  insightTxt: { ...typography.bodySmall, color: colors.textSecondary, flex: 1 },
  insightStrong: { fontWeight: '800', color: colors.text },
  clinicalInsightTxt: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },

  emptyCard: {
    backgroundColor: colors.lav50, borderRadius: 24, padding: 20,
  },
  emptyTxt: { ...typography.bodySmall, color: colors.textSecondary },

  reportBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: colors.primary,
    paddingVertical: 16, borderRadius: 18,
    ...shadows.soft,
  },
  reportTxt: { ...typography.label, color: colors.onPrimary },
});
