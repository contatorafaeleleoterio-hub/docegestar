import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '../src/theme';
import { DGIcon, DGIconName } from '../src/components/DGIcon';
import { useBottomSpacing } from '../src/hooks/useBottomSpacing';

type Status = 'done' | 'pending' | 'attention';
type Trimester = 1 | 2 | 3;

type Exam = {
  id: string;
  trimester: Trimester;
  name: string;
  detail: string;
  status: Status;
  date: string | null;
  icon: DGIconName;
  iconTint: string;
};

const INITIAL_EXAMS: Exam[] = [];

const TRIMESTERS: { id: Trimester; label: string }[] = [
  { id: 1, label: '1º trim' },
  { id: 2, label: '2º trim' },
  { id: 3, label: '3º trim' },
];

export default function ExamsScreen() {
  const router = useRouter();
  const bottom = useBottomSpacing(false);
  const [exams] = useState<Exam[]>(INITIAL_EXAMS);
  const [activeTrim, setActiveTrim] = useState<Trimester>(2);

  const stats = useMemo(() => {
    return {
      done: exams.filter((e) => e.status === 'done').length,
      pending: exams.filter((e) => e.status === 'pending').length,
      attention: exams.filter((e) => e.status === 'attention').length,
    };
  }, [exams]);

  const trimExams = useMemo(
    () => exams.filter((e) => e.trimester === activeTrim),
    [exams, activeTrim],
  );

  const pendingHighlight = useMemo(
    () => exams.find((e) => e.status === 'pending'),
    [exams],
  );

  function comingSoon() {
    Alert.alert(
      'Em breve! 🌸',
      'Cadastrar exames e anexar resultados chega em uma próxima atualização.',
    );
  }

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
          <Text style={styles.headerEyebrow}>
            {exams.length} exames · {stats.pending} pendentes
          </Text>
          <Text style={styles.headerTitle}>Exames</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={comingSoon}
          accessibilityRole="button"
          accessibilityLabel="Adicionar exame"
        >
          <DGIcon name="plus" size="md" color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsRow}>
          <StatCard value={stats.done} label="Concluídos" tint={colors.success} />
          <StatCard value={stats.pending} label="Pendentes" tint={colors.warning} />
          <StatCard value={stats.attention} label="Atenção" tint={colors.error} />
        </View>

        <View style={styles.tabs}>
          {TRIMESTERS.map((t) => {
            const active = t.id === activeTrim;
            return (
              <TouchableOpacity
                key={t.id}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setActiveTrim(t.id)}
                accessibilityRole="button"
                accessibilityLabel={t.label}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {pendingHighlight ? (
          <View style={styles.pendingCard}>
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingBadgeText}>⏰ AGENDAR</Text>
            </View>
            <View style={styles.pendingRow}>
              <View
                style={[
                  styles.pendingIcon,
                  { backgroundColor: colors.warning + '18' },
                ]}
              >
                <DGIcon
                  name={pendingHighlight.icon}
                  size="md"
                  color={colors.warning}
                />
              </View>
              <View style={styles.pendingBody}>
                <Text style={styles.pendingTitle}>{pendingHighlight.name}</Text>
                <Text style={styles.pendingDetail}>{pendingHighlight.detail}</Text>
              </View>
              <DGIcon name="chevronRight" size="sm" color={colors.inkSubtle} />
            </View>
          </View>
        ) : null}

        <View style={styles.listSection}>
          <Text style={styles.listTitle}>
            {trimExams.length === 0
              ? `${TRIMESTERS.find((t) => t.id === activeTrim)?.label} sem exames`
              : 'Exames do trimestre'}
          </Text>

          {trimExams.length === 0 ? (
            <View style={styles.empty}>
              <DGIcon name="stethoscope" size="lg" color={colors.primary} />
              <Text style={styles.emptyTitle}>Nenhum exame cadastrado</Text>
              <Text style={styles.emptyText}>
                Adicione seus exames e laudos para acompanhar sua jornada clínica em um só lugar.
              </Text>
            </View>
          ) : (
            trimExams.map((e) => (
              <View key={e.id} style={styles.examCard}>
                <View
                  style={[
                    styles.examIcon,
                    { backgroundColor: e.iconTint + '18' },
                  ]}
                >
                  <DGIcon name={e.icon} size="sm" color={e.iconTint} />
                </View>
                <View style={styles.examBody}>
                  <Text style={styles.examName} numberOfLines={1}>
                    {e.name}
                  </Text>
                  <Text style={styles.examDetail} numberOfLines={1}>
                    {e.detail}
                  </Text>
                </View>
                <View style={styles.examRight}>
                  {e.date ? (
                    <Text style={styles.examDate}>{e.date}</Text>
                  ) : null}
                  <Text
                    style={[
                      styles.examStatus,
                      e.status === 'done' && { color: colors.success },
                      e.status === 'pending' && { color: colors.warning },
                      e.status === 'attention' && { color: colors.error },
                    ]}
                  >
                    {e.status === 'done'
                      ? 'Normal'
                      : e.status === 'pending'
                        ? 'Pendente'
                        : 'Atenção'}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({
  value,
  label,
  tint,
}: {
  value: number;
  label: string;
  tint: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={[styles.statValue, { color: tint }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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
  scroll: {},
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: spacing[5],
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 10.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tabs: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: spacing[5],
    marginTop: spacing[4],
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  tabText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11.5,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  pendingCard: {
    marginHorizontal: spacing[5],
    marginTop: spacing[4],
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.warning + '40',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  pendingBadge: {
    position: 'absolute',
    top: -10,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: colors.warning,
  },
  pendingBadgeText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 9,
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  pendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  pendingIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingBody: { flex: 1, minWidth: 0 },
  pendingTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: colors.text,
  },
  pendingDetail: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  listSection: {
    paddingHorizontal: spacing[5],
    marginTop: spacing[5],
  },
  listTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    color: colors.text,
    marginBottom: spacing[2],
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
  examCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: colors.surface,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  examIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  examBody: { flex: 1, minWidth: 0 },
  examName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    color: colors.text,
  },
  examDetail: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 10.5,
    color: colors.textSecondary,
    marginTop: 1,
  },
  examRight: { alignItems: 'flex-end' },
  examDate: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 10.5,
    color: colors.textSecondary,
  },
  examStatus: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9.5,
    marginTop: 2,
  },
});
