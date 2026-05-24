import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, shadows } from '../../src/theme';
import { DGIcon } from '../../src/components/DGIcon';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import {
  usePrenatalExams,
  trimesterForWeek,
  formatExamPeriod,
  type Trimester,
} from '../../src/hooks/usePrenatalExams';

const TRIMS: { id: Trimester; label: string }[] = [
  { id: 1, label: '1º trim' },
  { id: 2, label: '2º trim' },
  { id: 3, label: '3º trim' },
];

export default function ExamesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const currentWeek = useCurrentWeek();
  const { exams, loading } = usePrenatalExams();

  const week = currentWeek ?? 1;
  const [activeTrim, setActiveTrim] = useState<Trimester>(trimesterForWeek(week));

  const trimExams = useMemo(
    () => exams.filter((e) => e.trimester === activeTrim),
    [exams, activeTrim],
  );

  const pendingCount = useMemo(
    () => exams.filter((e) => e.status === 'pendente').length,
    [exams],
  );

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
            {exams.length} recomendados · {pendingCount} pendentes
          </Text>
          <Text style={styles.headerTitle}>Exames</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        {TRIMS.map((t) => {
          const active = t.id === activeTrim;
          return (
            <TouchableOpacity
              key={t.id}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => setActiveTrim(t.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100, paddingTop: spacing[3] }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>
          Calendário de exames recomendados no pré‑natal. Agendar, marcar como realizado e anexar
          resultados chega em breve.
        </Text>

        {loading ? (
          <Text style={styles.loading}>Carregando exames…</Text>
        ) : trimExams.length === 0 ? (
          <View style={styles.empty}>
            <DGIcon name="fileText" size="lg" color={colors.primary} />
            <Text style={styles.emptyText}>Sem exames recomendados neste trimestre.</Text>
          </View>
        ) : (
          trimExams.map((e) => {
            const overdue = e.weekEnd != null && e.weekEnd < week && e.status === 'pendente';
            return (
              <View key={e.id} style={styles.card}>
                <View style={styles.cardIcon}>
                  <DGIcon name="fileText" size="sm" color={colors.primary} />
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardName} numberOfLines={2}>{e.name}</Text>
                  {e.notes ? (
                    <Text style={styles.cardNotes} numberOfLines={2}>{e.notes}</Text>
                  ) : null}
                  <Text style={styles.cardPeriod}>
                    {formatExamPeriod(e.weekStart, e.weekEnd)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.badge,
                    overdue && { backgroundColor: colors.errorContainer },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      { color: overdue ? colors.error : colors.warning },
                    ]}
                  >
                    {overdue ? 'Atrasado' : 'Pendente'}
                  </Text>
                </View>
              </View>
            );
          })
        )}
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
  tabs: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: spacing[5],
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: { backgroundColor: colors.text, borderColor: colors.text },
  tabText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: colors.textSecondary,
  },
  tabTextActive: { color: '#FFFFFF' },
  intro: {
    ...typography.body,
    color: colors.textSecondary,
    paddingHorizontal: spacing[5],
    marginBottom: spacing[3],
  },
  loading: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing[6],
  },
  empty: {
    marginHorizontal: spacing[5],
    paddingVertical: spacing[8],
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
    alignItems: 'center',
    gap: spacing[2],
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: spacing[5],
    marginBottom: spacing[2],
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: { flex: 1, minWidth: 0 },
  cardName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13.5,
    color: colors.text,
  },
  cardNotes: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cardPeriod: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    color: colors.primary,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.surfaceContainer,
  },
  badgeText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
  },
});
