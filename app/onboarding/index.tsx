import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { borderRadius, colors, spacing, typography } from '../../src/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoArea}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🌸</Text>
          </View>
          <Text style={styles.appName}>DoceGestar</Text>
          <Text style={styles.tagline}>Sua jornada gestacional</Text>
        </View>

        <View style={styles.illustrationArea}>
          <Text style={styles.illustrationEmoji}>🤰</Text>
        </View>

        <View style={styles.textArea}>
          <Text style={styles.title}>Bem-vinda à sua{'\n'}jornada gestacional</Text>
          <Text style={styles.subtitle}>
            Acompanhe semana a semana, offline, sem cadastro obrigatório.
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push('/onboarding/profile')}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Explorar o app gratuitamente, sem cadastro"
          >
            <Text style={styles.primaryBtnText}>🌸 Explorar gratuitamente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => router.push('/onboarding/coming-soon')}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Criar conta ou entrar — em breve"
          >
            <Text style={styles.secondaryBtnText}>👤 Criar conta / Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.legalText}>
            Ao continuar, você concorda com nossa{' '}
            <Text style={styles.legalLink}>política de privacidade</Text>
            {' '}e{' '}
            <Text style={styles.legalLink}>termos de uso</Text>.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
    justifyContent: 'space-between',
  },
  logoArea: {
    alignItems: 'center',
    paddingTop: spacing[4],
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  logoEmoji: {
    fontSize: 32,
  },
  appName: {
    ...typography.h2,
    color: colors.primary,
  },
  tagline: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  illustrationArea: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDF0F6',
    borderRadius: 24,
    paddingVertical: spacing[8],
    marginVertical: spacing[4],
  },
  illustrationEmoji: {
    fontSize: 96,
  },
  textArea: {
    alignItems: 'center',
    gap: spacing[2],
  },
  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  actions: {
    gap: spacing[3],
  },
  primaryBtn: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    ...typography.label,
    fontSize: 16,
    color: colors.onPrimary,
  },
  secondaryBtn: {
    height: 56,
    backgroundColor: '#FAFAFA',
    borderRadius: borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryBtnText: {
    ...typography.label,
    fontSize: 16,
    color: colors.text,
  },
  legalText: {
    ...typography.caption,
    color: '#9E9E9E',
    textAlign: 'center',
    fontSize: 11,
  },
  legalLink: {
    color: colors.primary,
  },
});
