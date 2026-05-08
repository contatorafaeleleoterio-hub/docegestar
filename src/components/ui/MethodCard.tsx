import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../../theme';

export interface MethodCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
  testID?: string;
}

export function MethodCard({
  icon,
  title,
  description,
  selected,
  onPress,
  testID,
}: MethodCardProps) {
  return (
    <TouchableOpacity
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      activeOpacity={0.8}
      onPress={onPress}
      testID={testID}
      style={[styles.card, selected ? styles.cardSelected : styles.cardDefault]}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={28} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius['2xl'],
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  cardDefault: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  iconWrap: {
    marginRight: spacing[3],
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.h3,
    color: colors.text,
  },
  description: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing[1],
  },
});
