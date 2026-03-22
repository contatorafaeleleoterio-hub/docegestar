import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../src/theme';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vinda ao DoceGestar</Text>
      <Text style={styles.subtitle}>
        Vamos configurar seu acompanhamento gestacional.
      </Text>
      <Text style={styles.placeholder}>
        Formulario de onboarding (nome, DPP) sera implementado aqui.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  title: { ...typography.h1, color: colors.primary, marginBottom: 8, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.text, textAlign: 'center', marginBottom: 24 },
  placeholder: { ...typography.bodySmall, color: colors.textSecondary, textAlign: 'center' },
});
