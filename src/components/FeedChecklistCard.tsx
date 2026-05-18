import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCareChecks } from '../hooks/useCareChecks';
import { colors, typography, spacing, shadows } from '../theme';
import type { RevistaCard } from '../types';

interface FeedChecklistCardProps {
  card: RevistaCard;
}

/**
 * Miolo do checklist com estado interativo (useCareChecks).
 * Sem invólucro externo — usado pelo CardBody dentro do CardShell.
 */
export function FeedChecklistMiolo({ card }: FeedChecklistCardProps) {
  const weekNumber = card.weekNumber ?? 0;
  const { checks, toggleCare } = useCareChecks(weekNumber);

  return (
    <View style={miolo.content}>
      {card.emoji ? <Text style={miolo.emoji}>{card.emoji}</Text> : null}
      <Text style={miolo.title}>{card.title}</Text>
      {card.items && card.items.length > 0 && (
        <View style={miolo.list}>
          {card.items.map((item, idx) => {
            const key = `feed_s${weekNumber}_item${idx}`;
            const checked = checks[key] ?? false;
            return (
              <TouchableOpacity
                key={key}
                style={miolo.row}
                onPress={() => toggleCare(key, !checked)}
                activeOpacity={0.7}
                accessibilityRole="checkbox"
                accessibilityState={{ checked }}
                accessibilityLabel={item}
              >
                <View style={[miolo.checkbox, checked && miolo.checkboxChecked]}>
                  {checked && <Text style={miolo.checkmark}>{'✓'}</Text>}
                </View>
                <Text style={[miolo.label, checked && miolo.labelChecked]} numberOfLines={2}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

/**
 * Componente legado com invólucro (mantido para compatibilidade com usos fora do feed snap).
 */
export function FeedChecklistCard({ card }: FeedChecklistCardProps) {
  const weekNumber = card.weekNumber ?? 0;
  const { checks, toggleCare } = useCareChecks(weekNumber);

  return (
    <View style={styles.container}>
      {card.emoji ? <Text style={styles.emoji}>{card.emoji}</Text> : null}
      <Text style={styles.title}>{card.title}</Text>
      {card.items && card.items.length > 0 && (
        <View style={styles.list}>
          {card.items.map((item, idx) => {
            const key = `feed_s${weekNumber}_item${idx}`;
            const checked = checks[key] ?? false;
            return (
              <TouchableOpacity
                key={key}
                style={styles.row}
                onPress={() => toggleCare(key, !checked)}
                activeOpacity={0.7}
                accessibilityRole="checkbox"
                accessibilityState={{ checked }}
                accessibilityLabel={item}
              >
                <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                  {checked && <Text style={styles.checkmark}>{'✓'}</Text>}
                </View>
                <Text style={[styles.label, checked && styles.labelChecked]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const miolo = StyleSheet.create({
  content: {
    flex: 1,
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  title: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing[3],
  },
  list: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
  },
  label: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  labelChecked: {
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    ...shadows.soft,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  title: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing[3],
  },
  list: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
  },
  label: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  labelChecked: {
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
});
