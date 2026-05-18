import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import type { RevistaCard } from '../../types';
import { CardBody } from './CardBody';
import { CardActionBar } from './CardActionBar';

interface CardShellProps {
  card: RevistaCard;
  cardH: number;
  isSaved: boolean;
  hasNote: boolean;
  onToggleSave: () => void;
  onOpenNote: () => void;
  onScrollNext: () => void;
}

/**
 * Involucro de altura fixa para cada card do feed snap.
 * Estrutura: cabecalho (chip eyebrow) + corpo (CardBody flex:1) + barra de acoes.
 * Altura fixada em cardH para garantir snap preciso.
 */
export const CardShell = React.memo(function CardShell({
  card,
  cardH,
  isSaved,
  hasNote,
  onToggleSave,
  onOpenNote,
  onScrollNext,
}: CardShellProps) {
  const label = `${card.chapter}, Semana ${card.weekNumber ?? ''}. ${card.title}`;

  return (
    <View
      style={[styles.shell, { height: cardH }]}
      accessibilityRole="none"
      accessibilityLabel={label}
    >
      {/* Cabecalho: chip eyebrow */}
      <View style={styles.header}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>
            {card.chapter.toUpperCase()}
            {card.weekNumber ? ` · SEMANA ${card.weekNumber}` : ''}
          </Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{card.title}</Text>
      </View>

      {/* Corpo flexivel */}
      <CardBody card={card} />

      {/* Barra de acoes */}
      <CardActionBar
        card={card}
        isSaved={isSaved}
        hasNote={hasNote}
        onToggleSave={onToggleSave}
        onOpenNote={onOpenNote}
        onScrollNext={onScrollNext}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  shell: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.card,
    overflow: 'hidden',
    marginBottom: 0,
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[2],
    backgroundColor: colors.surface,
  },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.pill,
    marginBottom: spacing[2],
  },
  chipText: {
    ...typography.eyebrow,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
  },
});
