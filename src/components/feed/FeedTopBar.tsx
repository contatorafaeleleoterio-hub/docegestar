import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../theme';

const TRIMESTER_LABEL: Record<1 | 2 | 3, string> = {
  1: '1 Trimestre',
  2: '2 Trimestre',
  3: '3 Trimestre',
};

interface FeedTopBarProps {
  trimester: 1 | 2 | 3;
}

/**
 * Barra de topo fixa da tela Explorar.
 * height: 68 — deve casar exatamente com HEADER_H em useFeedDimensions.
 */
export function FeedTopBar({ trimester }: FeedTopBarProps) {
  return (
    <View style={styles.bar}>
      <Text style={styles.title}>Sua Semana</Text>
      <Text style={styles.subtitle}>{TRIMESTER_LABEL[trimester]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 68,
    paddingHorizontal: spacing[5],
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
