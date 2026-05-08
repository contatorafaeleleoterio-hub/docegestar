import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export interface ProgressDotsProps {
  total: number;
  current: number;
  testID?: string;
}

export function ProgressDots({ total, current, testID }: ProgressDotsProps) {
  return (
    <View
      style={styles.row}
      accessibilityLabel={`Etapa ${current} de ${total}`}
      testID={testID}
    >
      {Array.from({ length: total }).map((_, idx) => (
        <View
          key={idx}
          style={[styles.dot, idx < current ? styles.active : styles.inactive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  active: {
    backgroundColor: colors.primary,
  },
  inactive: {
    backgroundColor: colors.border,
  },
});
