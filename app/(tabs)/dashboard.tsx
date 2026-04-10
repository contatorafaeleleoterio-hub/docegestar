import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, shadows, borderRadius, spacing } from '../../src/theme';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { getWeek } from '../../src/data';
import { getProfile } from '../../src/hooks/useUserProfile';

export default function DashboardScreen() {
  const router = useRouter();
  const currentWeek = useCurrentWeek();
  const [userName, setUserName] = useState<string | null>(null);
  const [babyName, setBabyName] = useState<string | null>(null);

  useEffect(() => {
    getProfile().then((profile) => {
      if (profile) {
        setUserName(profile.name ?? null);
        setBabyName(profile.babyName ?? null);
      }
    });
  }, []);

  if (currentWeek === null) return <View style={styles.container}><ActivityIndicator color={colors.primary} /></View>;
  const weekData = getWeek(currentWeek);

  const daysUntilBirth = weekData ? (40 - currentWeek) * 7 : null;

  const handleShare = () => {
    const phrase = weekData?.motivationalPhrase ?? '';
    const base = `Estou na semana ${currentWeek} da gravidez! ${phrase} 🌸 #DoceGestar`;
    const message = babyName ? `${base}\n${babyName} está se desenvolvendo!` : base;
    Share.share({ message }).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DoceGestar</Text>
      <Text style={styles.subtitle}>Seu acompanhamento semanal</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/(tabs)/semana')}
        activeOpacity={0.85}
      >
        <Text style={styles.greeting}>
          {userName ? `Olá, ${userName}! Você está na semana` : 'Você está na semana'}
        </Text>
        <Text style={styles.weekNumber}>{currentWeek}</Text>
        {weekData && (
          <>
            {weekData.baby.milestones[0] && (
              <Text style={styles.milestone}>{weekData.baby.milestones[0]}</Text>
            )}
            <Text style={styles.comparison}>Tamanho: {weekData.baby.comparison}</Text>
            <Text style={styles.countdown}>
              {daysUntilBirth !== null ? `~${daysUntilBirth} dias para o parto` : ''}
            </Text>
            <Text style={styles.motivational}>{weekData.motivationalPhrase}</Text>
          </>
        )}
        <Text style={styles.tapHint}>Toque para ver o card completo →</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare} activeOpacity={0.8}>
        <Text style={styles.shareButtonText}>Compartilhar 🌸</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: spacing[8],
    paddingHorizontal: spacing[6],
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing[1],
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing[8],
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius['3xl'],
    padding: spacing[6],
    alignItems: 'center',
    width: '100%',
    ...shadows.editorial,
  },
  greeting: {
    ...typography.label,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing[1],
  },
  milestone: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  shareButton: {
    marginTop: spacing[4],
    backgroundColor: colors.primary,
    borderRadius: borderRadius['2xl'],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[8],
  },
  shareButtonText: {
    ...typography.label,
    color: colors.background,
  },
  weekNumber: {
    fontSize: 64,
    fontFamily: 'NotoSerif_700Bold',
    fontWeight: '700',
    color: colors.primary,
    marginVertical: spacing[1],
  },
  comparison: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing[1],
  },
  countdown: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing[3],
  },
  motivational: {
    ...typography.bodySmall,
    color: colors.primary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: spacing[4],
  },
  tapHint: {
    ...typography.caption,
    color: colors.textLight,
  },
});
