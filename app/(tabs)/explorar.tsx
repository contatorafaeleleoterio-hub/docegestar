import React, { useMemo, useRef, useState, useCallback } from 'react';
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
import { buildWeeklyFeed } from '../../src/utils/revistaAdapter';
import { getTrimester } from '../../src/data';
import type { RevistaCard as RevistaCardType } from '../../src/types';
import { colors, typography, spacing, borderRadius } from '../../src/theme';
import { useFeedDimensions } from '../../src/components/feed/useFeedDimensions';
import { CardShell } from '../../src/components/feed/CardShell';
import { FeedTopBar } from '../../src/components/feed/FeedTopBar';
import { NoteSheet } from '../../src/components/feed/NoteSheet';
import { useCardMeta } from '../../src/hooks/useCardMeta';

function EmptyState() {
  const router = useRouter();
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>{'🌸'}</Text>
      <Text style={styles.emptyTitle}>Configure sua gestacao</Text>
      <Text style={styles.emptySubtitle}>
        Para ver o conteudo da semana, informe sua data prevista do parto.
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
  const { cardH, itemH, gap, peekH } = useFeedDimensions();
  const { isSaved, hasNote, toggleSave, refreshNotes } = useCardMeta();

  const listRef = useRef<FlatList<RevistaCardType>>(null);
  const [noteCard, setNoteCard] = useState<RevistaCardType | null>(null);

  const feed = useMemo<RevistaCardType[]>(() => {
    if (!weekData) return [];
    return buildWeeklyFeed(weekData);
  }, [weekData]);

  const trimester = weekNumber ? getTrimester(weekNumber) : null;

  const handleScrollNext = useCallback(
    (index: number) => {
      if (index + 1 < feed.length) {
        listRef.current?.scrollToIndex({ index: index + 1, animated: true });
      }
    },
    [feed.length],
  );

  const handleOpenNote = useCallback((card: RevistaCardType) => {
    setNoteCard(card);
  }, []);

  const handleDismissNote = useCallback(() => {
    setNoteCard(null);
    refreshNotes();
  }, [refreshNotes]);

  const renderItem = useCallback(
    ({ item, index }: { item: RevistaCardType; index: number }) => (
      <CardShell
        card={item}
        cardH={cardH}
        isSaved={isSaved(item.id)}
        hasNote={hasNote(item.id)}
        onToggleSave={() => toggleSave(item.id)}
        onOpenNote={() => handleOpenNote(item)}
        onScrollNext={() => handleScrollNext(index)}
      />
    ),
    [cardH, isSaved, hasNote, toggleSave, handleOpenNote, handleScrollNext],
  );

  const keyExtractor = useCallback((item: RevistaCardType) => item.id, []);

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({ length: itemH, offset: itemH * index, index }),
    [itemH],
  );

  const separator = useCallback(
    () => <View style={{ height: gap }} />,
    [gap],
  );

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

      {trimester && <FeedTopBar trimester={trimester} />}

      <FlatList<RevistaCardType>
        ref={listRef}
        data={feed}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        snapToInterval={itemH}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={separator}
        contentContainerStyle={{
          paddingHorizontal: spacing[4],
          paddingTop: spacing[4],
          paddingBottom: peekH,
        }}
        removeClippedSubviews
        windowSize={5}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        onScrollToIndexFailed={() => {}}
        showsVerticalScrollIndicator={false}
      />

      {noteCard && (
        <NoteSheet
          cardId={noteCard.id}
          visible={!!noteCard}
          onDismiss={handleDismissNote}
          onNoteSaved={refreshNotes}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
