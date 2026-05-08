import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { borderRadius, colors, typography } from '../../theme';

export interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'solid' | 'outline';
  testID?: string;
}

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  variant = 'solid',
  testID,
}: PrimaryButtonProps) {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      style={[
        styles.button,
        isOutline ? styles.outline : styles.solid,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.label, isOutline ? styles.labelOutline : styles.labelSolid]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  solid: {
    backgroundColor: colors.primary,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.label,
  },
  labelSolid: {
    color: colors.onPrimary,
  },
  labelOutline: {
    color: colors.primary,
  },
});
