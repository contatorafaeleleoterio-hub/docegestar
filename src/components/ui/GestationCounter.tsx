import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { calcGestationMetrics } from '../../utils/dateUtils';
import { colors, typography } from '../../theme';

export interface GestationCounterProps {
  estimatedDueDate: string;
  compact?: boolean;
  testID?: string;
}

export function GestationCounter({
  estimatedDueDate,
  compact = false,
  testID,
}: GestationCounterProps) {
  const metrics = calcGestationMetrics(estimatedDueDate);

  if (compact) {
    // Versão resumida para Dashboard Card 8
    return (
      <View style={styles.compactContainer} testID={testID}>
        <View style={styles.compactMetric}>
          <Text style={styles.compactValue}>{metrics.weeksElapsed}</Text>
          <Text style={styles.compactLabel}>semanas</Text>
        </View>
        <Text style={styles.compactSeparator}>+</Text>
        <View style={styles.compactMetric}>
          <Text style={styles.compactValue}>{metrics.daysElapsed % 7}</Text>
          <Text style={styles.compactLabel}>dias</Text>
        </View>
      </View>
    );
  }

  // Versão expandida
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Data estimada de parto</Text>
        <Text style={styles.dppFormatted}>{metrics.dppFormatted}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.metricsRow}>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>
            {metrics.weeksElapsed}
            <Text style={styles.metricUnit}>w</Text>
          </Text>
          <Text style={styles.metricValue}>
            {metrics.daysElapsed % 7}
            <Text style={styles.metricUnit}>d</Text>
          </Text>
          <Text style={styles.metricLabel}>Grávida</Text>
        </View>

        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>
            {metrics.weeksRemaining}
            <Text style={styles.metricUnit}>w</Text>
          </Text>
          <Text style={styles.metricValue}>
            {metrics.daysRemaining % 7}
            <Text style={styles.metricUnit}>d</Text>
          </Text>
          <Text style={styles.metricLabel}>Restando</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Versão expandida
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  section: {
    alignItems: 'center',
  },
  sectionLabel: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  dppFormatted: {
    ...typography.headlineMedium,
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metricBox: {
    alignItems: 'center',
  },
  metricValue: {
    ...typography.headlineMedium,
    color: colors.onSurface,
  },
  metricUnit: {
    ...typography.bodySmall,
    fontSize: 12,
    marginLeft: 2,
  },
  metricLabel: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },

  // Versão compacta
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  compactMetric: {
    alignItems: 'center',
  },
  compactValue: {
    ...typography.headlineSmall,
    color: colors.primary,
  },
  compactLabel: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    fontSize: 11,
  },
  compactSeparator: {
    ...typography.bodyLarge,
    color: colors.outlineVariant,
  },
});
