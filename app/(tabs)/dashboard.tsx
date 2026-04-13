import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, typography, shadows, borderRadius, spacing } from '../../src/theme';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { getWeek } from '../../src/data';
import { getProfile } from '../../src/hooks/useUserProfile';

const TRIMESTER_LABELS: Record<1 | 2 | 3, string> = {
  1: '1º Trimestre',
  2: '2º Trimestre',
  3: '3º Trimestre',
};

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
  const trimesterLabel = weekData ? TRIMESTER_LABELS[weekData.trimester] : '';

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

      {/* Hero card com gradiente */}
      <LinearGradient
        colors={[colors.primary, '#7a2d5a']}
        style={styles.heroCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.heroTouchable}
          onPress={() => router.push('/(tabs)/semana')}
          activeOpacity={0.85}
        >
          <Text style={styles.greeting}>
            {userName ? `Olá, ${userName}! Você está na semana` : 'Você está na semana'}
          </Text>
          <Text style={styles.weekNumber}>{currentWeek}</Text>
          <Text style={styles.trimesterLabel}>{trimesterLabel}</Text>
          <Text style={styles.tapHint}>Toque para ver o card completo →</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Cards de métricas */}
      {weekData && (
        <View style={styles.metricsRow}>
          {weekData.baby.milestones[0] && (
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Bebê</Text>
              <Text style={styles.metricValue}>{weekData.baby.comparison}</Text>
              <Text style={styles.metricSub}>{weekData.baby.milestones[0]}</Text>
            </View>
          )}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Faltam</Text>
            <Text style={styles.metricValue}>
              {daysUntilBirth !== null ? `~${daysUntilBirth}` : '—'}
            </Text>
            <Text style={styles.metricSub}>dias para o parto</Text>
          </View>
        </View>
      )}

      {weekData?.motivationalPhrase && (
        <View style={styles.motivationalCard}>
          <Text style={styles.motivational}>{weekData.motivationalPhrase}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.shareButton} onPress={handleShare} activeOpacity={0.8}>
        <Ionicons name="share-social-outline" size={18} color="#ffffff" />
        <Text style={styles.shareButtonText}>Compartilhar</Text>
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
  heroCard: {
    borderRadius: 24,
    width: '100%',
    marginBottom: spacing[4],
  },
  heroTouchable: {
    borderRadius: 24,
    padding: spacing[6],
    alignItems: 'center',
  },
  greeting: {
    ...typography.label,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: spacing[1],
  },
  weekNumber: {
    fontSize: 56,
    fontFamily: 'NotoSerif_700Bold',
    fontWeight: '700',
    color: '#ffffff',
    marginVertical: spacing[1],
  },
  trimesterLabel: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: spacing[3],
  },
  tapHint: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing[3],
    width: '100%',
    marginBottom: spacing[3],
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing[4],
    alignItems: 'center',
    ...shadows.editorial,
  },
  metricLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing[1],
  },
  metricValue: {
    ...typography.h2,
    color: colors.primary,
    textAlign: 'center',
  },
  metricSub: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing[1],
  },
  motivationalCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing[4],
    width: '100%',
    marginBottom: spacing[4],
    ...shadows.editorial,
  },
  motivational: {
    ...typography.bodySmall,
    color: colors.primary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[8],
  },
  shareButtonText: {
    ...typography.label,
    color: '#ffffff',
  },
});
