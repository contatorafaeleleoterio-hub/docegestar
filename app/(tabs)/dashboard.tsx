import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../src/theme';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DoceGestar</Text>
      <Text style={styles.subtitle}>Seu acompanhamento semanal</Text>
      <View style={styles.card}>
        <Text style={styles.weekLabel}>Semana Atual</Text>
        <Text style={styles.weekNumber}>--</Text>
        <Text style={styles.countdown}>Configure sua data prevista</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: 32,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  weekLabel: {
    ...typography.label,
    color: colors.textSecondary,
  },
  weekNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
    marginVertical: 8,
  },
  countdown: {
    ...typography.bodySmall,
    color: colors.textLight,
  },
});
