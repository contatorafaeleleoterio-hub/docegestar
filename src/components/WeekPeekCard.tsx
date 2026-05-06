// DoceGestar — WeekPeekCard
// Preview dos destaques da semana no dashboard, com CTA para a tab Explorar.

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { WeekContent } from '../types';
import { colors, typography, borderRadius, shadows } from '../theme';

interface WeekPeekCardProps {
  weekData: WeekContent;
}

export function WeekPeekCard({ weekData }: WeekPeekCardProps) {
  const router = useRouter();

  const milestone = weekData.baby.milestones[1] ?? weekData.baby.milestones[0] ?? '';
  const phrase = weekData.motivationalPhrase;
  const nutrient = weekData.nutrients[0]?.name ?? null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push('/(tabs)/explorar')}
      activeOpacity={0.85}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>DESTAQUES DA SEMANA</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.primary} />
      </View>

      {/* Frase motivacional */}
      <Text style={styles.phrase} numberOfLines={2}>{phrase}</Text>

      {/* Destaques */}
      <View style={styles.highlights}>
        {milestone ? (
          <View style={styles.highlightRow}>
            <Text style={styles.highlightIcon}>👶</Text>
            <Text style={styles.highlightText} numberOfLines={1}>{milestone}</Text>
          </View>
        ) : null}
        {nutrient ? (
          <View style={styles.highlightRow}>
            <Text style={styles.highlightIcon}>🥗</Text>
            <Text style={styles.highlightText} numberOfLines={1}>
              Foco em {nutrient}
            </Text>
          </View>
        ) : null}
      </View>

      {/* CTA */}
      <View style={styles.cta}>
        <Text style={styles.ctaText}>Ver conteúdo completo</Text>
        <Ionicons name="arrow-forward-circle" size={18} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.xl,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    ...(shadows.editorial as object),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  phrase: {
    ...(typography.body as object),
    color: colors.text,
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 22,
  },
  highlights: {
    gap: 6,
    marginBottom: 14,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  highlightIcon: {
    fontSize: 16,
  },
  highlightText: {
    ...(typography.caption as object),
    color: colors.textSecondary,
    flex: 1,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  ctaText: {
    ...(typography.caption as object),
    color: colors.primary,
    fontWeight: '600',
  },
});
