import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { useWeekData } from '../../src/hooks/useWeekData';
import { buildRevistaFeed } from '../../src/utils/revistaAdapter';
import { getTrimester, getTrimesterProgress } from '../../src/data';
import { RevistaCard } from '../../src/components/RevistaCard';
import type { RevistaCard as RevistaCardType } from '../../src/types';
import { colors, typography, spacing, borderRadius } from '../../src/theme';

const TRIMESTER_LABEL: Record<1 | 2 | 3, string> = {
  1: '1º Trimestre',
  2: '2º Trimestre',
  3: '3º Trimestre',
};

function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${progress}%` as any }]} />
    </View>
  );
}

function RevistaHeader({
  weekNumber,
  trimester,
  trimesterProgress,
}: {
  weekNumber: number;
  trimester: 1 | 2 | 3;
  trimesterProgress: number;
}) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Sua Semana</Text>
      <Text style={styles.headerSubtitle}>
        Semana {weekNumber} {'·'} {TRIMESTER_LABEL[trimester]}
      </Text>
    </View>
  );
}

function EmptyState() {
  const router = useRouter();
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>{'🌸'}</Text>
      <Text style={styles.emptyTitle}>Configure sua gestação</Text>
      <Text style={styles.emptySubtitle}>
        Para ver a Revista da Semana, informe sua data prevista do parto.
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => router.push('/(tabs)/perfil')}
        activeOpacity={0.8}
      >
        <Text style={styles.emptyButtonText}>Ir para Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ExplorarScreen() {
  const weekNumber = useCurrentWeek();
  const weekData = useWeekData(weekNumber ?? 0);

  const feed = useMemo<RevistaCardType[]>(() => {
    if (!weekData) return [];
    return buildRevistaFeed(weekData);
  }, [weekData]);

  const trimester = weekNumber ? getTrimester(weekNumber) : null;
  const trimesterProgress = weekNumber ? getTrimesterProgress(weekNumber) : 0;

  if (weekNumber === null) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <EmptyState />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <FlatList<RevistaCardType>
        data={feed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RevistaCard card={item} weekNumber={weekNumber} />
        )}
        ListHeaderComponent={
          trimester ? (
            <RevistaHeader
              weekNumber={weekNumber}
              trimester={trimester}
              trimesterProgress={trimesterProgress}
            />
          ) : null
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={7}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[6],
    paddingBottom: spacing[4],
    backgroundColor: colors.background,
  },
  headerTitle: {
    ...(typography.h2 as object),
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...(typography.caption as object),
    color: colors.textSecondary,
    marginBottom: spacing[3],
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  progressLabel: {
    ...(typography.caption as object),
    color: colors.textSecondary,
    fontSize: 11,
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: spacing[4],
  },
  emptyTitle: {
    ...(typography.h3 as object),
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  emptySubtitle: {
    ...(typography.body as object),
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing[6],
    lineHeight: 22,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    borderRadius: borderRadius.xl,
  },
  emptyButtonText: {
    ...(typography.body as object),
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
