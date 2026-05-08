import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { calcGestationMetrics } from '../../utils/dateUtils';
import { colors } from '../../theme/colors';

export interface GestationCounterProps {
  estimatedDueDate: string;
  compact?: boolean;
  testID?: string;
}

export function GestationCounter({ estimatedDueDate, compact = false, testID }: GestationCounterProps) {
  const metrics = calcGestationMetrics(estimatedDueDate);
  const daysIntoWeek = metrics.daysElapsed % 7;
  const daysRemainingInWeek = metrics.daysRemaining % 7;

  if (compact) {
    return (
      <View style={styles.compact} testID={testID}>
        <Text style={styles.compactWeek} testID={`${testID}-week`}>
          Sem {metrics.weeksElapsed}
        </Text>
        <Text style={styles.compactSub} testID={`${testID}-remaining`}>
          {metrics.weeksRemaining}sem restantes
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.full} testID={testID}>
      <View style={styles.row}>
        <Text style={styles.label}>Já se passaram</Text>
        <Text style={styles.value} testID={`${testID}-elapsed`}>
          {metrics.weeksElapsed} semanas{daysIntoWeek > 0 ? ` e ${daysIntoWeek} dias` : ''}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.label}>Faltam</Text>
        <Text style={styles.value} testID={`${testID}-remaining`}>
          {metrics.weeksRemaining} semanas{daysRemainingInWeek > 0 ? ` e ${daysRemainingInWeek} dias` : ''}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.label}>Data prevista</Text>
        <Text style={[styles.value, styles.dpp]} testID={`${testID}-dpp`}>
          {metrics.dppFormatted}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  full: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  dpp: {
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  compact: {
    alignItems: 'center',
  },
  compactWeek: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  compactSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
