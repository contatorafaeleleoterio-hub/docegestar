import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../../src/theme';
import { DGIcon } from '../../src/components/DGIcon';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.lav50, colors.primaryLight, colors.primaryContainer]}
        locations={[0, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <View style={styles.heroWrap}>
            <LinearGradient
              colors={[colors.primaryContainer, colors.lav100]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.hero}
            >
              <View style={styles.logoChip}>
                <View style={styles.logoDot} />
                <Text style={styles.logoChipText}>DoceGestar</Text>
              </View>

              <View style={styles.heroIllustration}>
                <Image
                  source={require('../../assets/welcome-hero.png')}
                  style={styles.heroImage}
                  resizeMode="contain"
                  accessibilityRole="image"
                  accessibilityLabel="Ilustração de uma gestante"
                />
              </View>

              <View style={styles.dots}>
                <View style={[styles.dot, styles.dotActive]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </LinearGradient>
          </View>

          <View style={styles.textArea}>
            <Text style={styles.title}>
              Acompanhe{'\n'}cada momento{' '}
              <Text style={styles.titleAccent}>com cuidado</Text>
            </Text>
            <Text style={styles.subtitle}>
              Tudo o que você precisa para viver sua gestação com tranquilidade — em um só lugar.
            </Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push('/onboarding/profile')}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Começar agora"
            >
              <Text style={styles.primaryBtnText}>Começar agora</Text>
              <View style={styles.primaryBtnIcon}>
                <DGIcon name="arrowRight" size="sm" color={colors.primary} />
              </View>
            </TouchableOpacity>

            <Pressable
              style={styles.loginRow}
              onPress={() => router.push('/onboarding/coming-soon')}
              accessibilityRole="button"
              accessibilityLabel="Já tem conta — entrar"
            >
              <Text style={styles.loginText}>Já tem conta? </Text>
              <Text style={styles.loginLink}>Entrar</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.lav50 },
  safe: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
    justifyContent: 'space-between',
  },
  heroWrap: { alignItems: 'center', marginTop: spacing[2] },
  hero: {
    width: 300,
    height: 360,
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: colors.primary,
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 12,
  },
  logoChip: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingVertical: 6,
    paddingLeft: 8,
    paddingRight: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  logoChipText: {
    ...typography.caption,
    color: colors.primaryDeep,
  },
  heroIllustration: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: { width: '100%', height: '100%' },
  dots: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: { width: 22, backgroundColor: '#FFFFFF' },
  textArea: { gap: spacing[3], paddingHorizontal: spacing[1] },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  titleAccent: { color: colors.primary },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    maxWidth: 280,
  },
  actions: { gap: spacing[3] },
  primaryBtn: {
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 28,
    paddingRight: 8,
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 8,
  },
  primaryBtnText: {
    ...typography.label,
    fontSize: 15,
    color: colors.onPrimary,
  },
  primaryBtnIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing[2],
  },
  loginText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  loginLink: {
    ...typography.bodySmall,
    color: colors.primary,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});
