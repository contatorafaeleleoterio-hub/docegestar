import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { borderRadius, colors, typography } from '../../theme';

export interface GradientButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
}

export function GradientButton({
  label,
  onPress,
  disabled = false,
  testID,
}: GradientButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      style={[styles.wrapper, disabled && styles.disabled]}
    >
      <LinearGradient
        colors={[colors.primaryDeep, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 56,
    borderRadius: borderRadius.pill,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  label: {
    ...typography.label,
    color: colors.onPrimary,
  },
});
