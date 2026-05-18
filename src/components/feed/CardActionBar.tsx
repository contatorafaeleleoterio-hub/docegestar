import React, { useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Share,
} from 'react-native';
import { DGIcon } from '../DGIcon';
import { colors, spacing } from '../../theme';
import type { RevistaCard } from '../../types';

interface CardActionBarProps {
  card: RevistaCard;
  isSaved: boolean;
  hasNote: boolean;
  onToggleSave: () => void;
  onOpenNote: () => void;
  onScrollNext: () => void;
}

/**
 * Barra de acoes inferior do card: Salvar / Anotar / Compartilhar + chevron proximo.
 * Alvos de toque: 44x44 conforme a11y (§10 do spec).
 */
export const CardActionBar = React.memo(function CardActionBar({
  card,
  isSaved,
  hasNote,
  onToggleSave,
  onOpenNote,
  onScrollNext,
}: CardActionBarProps) {
  const handleShare = useCallback(() => {
    Share.share({
      title: card.title,
      message: `${card.title}\n\ndocegestar://card/${card.id}`,
    }).catch(() => {
      // Cancelamento silencioso — nao e erro
    });
  }, [card.id, card.title]);

  return (
    <View style={styles.bar}>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.action}
          onPress={onToggleSave}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={isSaved ? 'Remover dos salvos' : 'Salvar este card'}
          accessibilityState={{ selected: isSaved }}
        >
          <DGIcon
            name="bookmark"
            size={24}
            color={isSaved ? colors.primary : colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.action}
          onPress={onOpenNote}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Adicionar uma anotacao"
          accessibilityState={{ selected: hasNote }}
        >
          <DGIcon
            name="edit"
            size={24}
            color={hasNote ? colors.primary : colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.action}
          onPress={handleShare}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Compartilhar este card"
        >
          <DGIcon
            name="share"
            size={24}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.chevronAction}
        onPress={onScrollNext}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Proximo card"
      >
        <DGIcon name="chevronDown" size={24} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 52,
    backgroundColor: colors.surface,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  action: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronAction: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
