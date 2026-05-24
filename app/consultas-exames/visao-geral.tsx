import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, shadows } from '../../src/theme';
import { DGIcon } from '../../src/components/DGIcon';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { usePrenatalAppointments } from '../../src/hooks/usePrenatalAppointments';
import {
  usePrenatalExams,
  trimesterForWeek,
  formatExamPeriod,
} from '../../src/hooks/usePrenatalExams';

const WEEKDAYS_SHORT = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

function parseDateTime(date: string, time: string): Date {
  return new Date(`${date}T${time}:00`);
}

function formatRelative(target: Date): string {
  const ms = target.getTime() - Date.now();
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  if (days < 0) return 'já passou';
  if (days === 0) return 'hoje';
  if (days === 1) return 'amanhã';
  return `em ${days} dias`;
}

export default function VisaoGeralScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const currentWeek = useCurrentWeek();
  const { appointments, setStatus, reload: reloadAppts } = usePrenatalAppointments();
  const { exams, reload: reloadExams } = usePrenatalExams();

  useFocusEffect(
    useCallback(() => {
      reloadAppts();
      reloadExams();
    }, [reloadAppts, reloadExams]),
  );

  const week = currentWeek ?? 1;
  const trimester = trimesterForWeek(week);
  const progress = Math.max(0, Math.min(1, week / 40));

  const nextAppt = useMemo(() => {
    const now = Date.now();
    return appointments
      .filter((a) => a.status === 'agendada')
      .map((a) => ({ a, when: parseDateTime(a.appointmentDate, a.appointmentTime) }))
      .filter((x) => x.when.getTime() > now)
      .sort((x, y) => x.when.getTime() - y.when.getTime())[0];
  }, [appointments]);

  const doneCount = useMemo(
    () => appointments.filter((a) => a.status === 'concluida').length,
    [appointments],
  );

  const pendingExams = useMemo(
    () => exams.filter((e) => e.status === 'pendente'),
    [exams],
  );

  const nextExam = useMemo(() => {
    const upcoming = pendingExams
      .filter((e) => e.weekEnd != null && e.weekEnd >= week)
      .sort((a, b) => (a.weekStart ?? 0) - (b.weekStart ?? 0));
    return upcoming[0] ?? pendingExams[0];
  }, [pendingExams, week]);

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
          <Text style={styles.headerTitle}>Consultas e Exames</Text>
          <Text style={styles.headerSub}>Acompanhe seu pré‑natal</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Barra de progresso da gestação */}
        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <Text style={styles.progressWeek}>Semana {week}</Text>
            <View style={styles.trimPill}>
              <Text style={styles.trimPillText}>{trimester}º trimestre</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressHint}>{40 - week} semanas até a data provável</Text>
        </View>

        {/* Próxima consulta */}
        <Text style={styles.sectionEyebrow}>PRÓXIMA CONSULTA</Text>
        {nextAppt ? (
          <View style={styles.section}>
            <LinearGradient
              colors={[colors.lav100, colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.hero}
            >
              <View style={styles.heroRow}>
                <View style={styles.heroDate}>
                  <Text style={styles.heroWeekday}>
                    {WEEKDAYS_SHORT[nextAppt.when.getDay()]}
                  </Text>
                  <Text style={styles.heroDay}>{nextAppt.when.getDate()}</Text>
                </View>
                <View style={styles.heroInfo}>
                  <Text style={styles.heroTime}>
                    {nextAppt.a.appointmentTime} · {formatRelative(nextAppt.when)}
                  </Text>
                  <Text style={styles.heroTitle} numberOfLines={1}>
                    {nextAppt.a.specialty || nextAppt.a.type}
                  </Text>
                  {nextAppt.a.professional ? (
                    <Text style={styles.heroMeta} numberOfLines={1}>
                      {nextAppt.a.professional}
                    </Text>
                  ) : null}
                  {nextAppt.a.location ? (
                    <Text style={styles.heroMeta} numberOfLines={1}>
                      📍 {nextAppt.a.location}
                    </Text>
                  ) : null}
                </View>
              </View>
              <View style={styles.heroActions}>
                <TouchableOpacity
                  style={styles.heroBtnPrimary}
                  onPress={() => setStatus(nextAppt.a.id, 'concluida')}
                  accessibilityRole="button"
                >
                  <DGIcon name="check" size={15} color="#FFFFFF" />
                  <Text style={styles.heroBtnPrimaryText}>Concluir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.heroBtnGhost}
                  onPress={() => router.navigate('/consultas-exames/consultas')}
                  accessibilityRole="button"
                >
                  <Text style={styles.heroBtnGhostText}>Reagendar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.heroBtnGhost}
                  onPress={() => router.navigate('/consultas-exames/consultas')}
                  accessibilityRole="button"
                >
                  <Text style={styles.heroBtnGhostText}>Ver detalhes</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.emptyCard}
            onPress={() => router.navigate('/consultas-exames/consultas')}
            accessibilityRole="button"
          >
            <DGIcon name="calendar" size="lg" color={colors.primary} />
            <Text style={styles.emptyTitle}>Nenhuma consulta marcada</Text>
            <Text style={styles.emptyText}>Toque para agendar sua próxima consulta.</Text>
          </TouchableOpacity>
        )}

        {/* Próximo exame */}
        <Text style={styles.sectionEyebrow}>PRÓXIMO EXAME</Text>
        <TouchableOpacity
          style={styles.examCard}
          onPress={() => router.navigate('/consultas-exames/exames')}
          accessibilityRole="button"
        >
          {nextExam ? (
            <>
              <View style={styles.examIcon}>
                <DGIcon name="fileText" size="md" color={colors.primary} />
              </View>
              <View style={styles.examBody}>
                <Text style={styles.examName} numberOfLines={2}>{nextExam.name}</Text>
                <Text style={styles.examPeriod}>
                  {formatExamPeriod(nextExam.weekStart, nextExam.weekEnd)}
                  {nextExam.weekEnd != null && nextExam.weekEnd < week ? ' · atrasado' : ''}
                </Text>
              </View>
              <DGIcon name="chevronRight" size="sm" color={colors.inkSubtle} />
            </>
          ) : (
            <View style={styles.examBody}>
              <Text style={styles.examName}>Todos os exames em dia 🎉</Text>
              <Text style={styles.examPeriod}>Sem exames pendentes recomendados</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Indicadores */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.success }]}>{doneCount}</Text>
            <Text style={styles.statLabel}>Consultas{'\n'}realizadas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.warning }]}>
              {pendingExams.length}
            </Text>
            <Text style={styles.statLabel}>Exames{'\n'}pendentes</Text>
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
    ...shadows.soft,
  },
  headerText: { flex: 1 },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    letterSpacing: -0.6,
    color: colors.text,
  },
  headerSub: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  progressCard: {
    marginHorizontal: spacing[5],
    marginBottom: spacing[4],
    padding: spacing[4],
    borderRadius: 22,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  progressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },
  progressWeek: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 18,
    color: colors.text,
  },
  trimPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.primaryLight,
  },
  trimPillText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    color: colors.primary,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.surfaceContainer,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  progressHint: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11.5,
    color: colors.textSecondary,
    marginTop: spacing[2],
  },
  sectionEyebrow: {
    ...typography.eyebrow,
    color: colors.textSecondary,
    paddingHorizontal: spacing[5],
    marginBottom: spacing[2],
  },
  section: { paddingHorizontal: spacing[5] },
  hero: { borderRadius: 26, padding: 18, marginBottom: spacing[5] },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  heroDate: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  heroWeekday: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  heroDay: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    color: colors.text,
    lineHeight: 24,
  },
  heroInfo: { flex: 1, minWidth: 0 },
  heroTime: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    color: colors.textSecondary,
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 16,
    color: colors.text,
    marginTop: 2,
  },
  heroMeta: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11.5,
    color: colors.textSecondary,
    marginTop: 1,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  heroBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  heroBtnPrimaryText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12.5,
    color: '#FFFFFF',
  },
  heroBtnGhost: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  heroBtnGhostText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12.5,
    color: colors.text,
  },
  emptyCard: {
    marginHorizontal: spacing[5],
    marginBottom: spacing[5],
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
  examCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: spacing[5],
    marginBottom: spacing[5],
    padding: 14,
    borderRadius: 18,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  examIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  examBody: { flex: 1, minWidth: 0 },
  examName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: colors.text,
  },
  examPeriod: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: spacing[5],
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[3],
    alignItems: 'center',
    ...shadows.card,
  },
  statValue: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 28,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11.5,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
});
