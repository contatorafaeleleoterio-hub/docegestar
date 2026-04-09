import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography } from '../../src/theme';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { getWeek } from '../../src/data';

export default function DashboardScreen() {
  const router = useRouter();
  const currentWeek = useCurrentWeek();
  if (currentWeek === null) return <View style={styles.container}><ActivityIndicator /></View>;
  const weekData = getWeek(currentWeek);

  const daysUntilBirth = weekData ? (40 - currentWeek) * 7 : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DoceGestar</Text>
      <Text style={styles.subtitle}>Seu acompanhamento semanal</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/(tabs)/semana')}
        activeOpacity={0.85}
      >
        <Text style={styles.weekLabel}>Semana Atual</Text>
        <Text style={styles.weekNumber}>{currentWeek}</Text>
        {weekData && (
          <>
            <Text style={styles.comparison}>Tamanho: {weekData.baby.comparison}</Text>
            <Text style={styles.countdown}>
              {daysUntilBirth !== null ? `~${daysUntilBirth} dias para o parto` : ''}
            </Text>
            <Text style={styles.motivational}>{weekData.motivationalPhrase}</Text>
          </>
        )}
        <Text style={styles.tapHint}>Toque para ver o card completo →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.background, alignItems: 'center',
    paddingTop: 40, paddingHorizontal: 20,
  },
  title: { ...typography.h1, color: colors.primary, marginBottom: 4 },
  subtitle: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: 32 },
  card: {
    backgroundColor: colors.surface, borderRadius: 16, padding: 24,
    alignItems: 'center', width: '100%',
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 3,
  },
  weekLabel: { ...typography.label, color: colors.textSecondary },
  weekNumber: { fontSize: 64, fontWeight: '700', color: colors.primary, marginVertical: 4 },
  comparison: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: 4 },
  countdown: { ...typography.body, color: colors.text, fontWeight: '600', marginBottom: 12 },
  motivational: {
    ...typography.bodySmall, color: colors.primary, textAlign: 'center',
    fontStyle: 'italic', marginBottom: 16,
  },
  tapHint: { ...typography.caption, color: colors.textLight },
});
