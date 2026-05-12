import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, borderRadius, shadows } from '../../src/theme';
import { ProgressDots, PrimaryButton, GradientButton } from '../../src/components/ui';
import { useOnboarding } from '../../src/context/OnboardingContext';
import { saveOnboardingProfile } from '../../src/hooks/useUserProfile';
import { FEATURE_SLIDES } from '../../src/data/planFeatures';

export default function PlansScreen() {
  const router = useRouter();
  const { draft } = useOnboarding();
  const { width } = useWindowDimensions();
  const isWide = width >= 360;

  async function handleFree() {
    await saveOnboardingProfile({
      name: draft.name || null,
      relationship: draft.relationship,
      dueDate: draft.estimatedDueDate,
      plan: 'free',
    });
    router.replace('/(tabs)/dashboard');
  }

  function handlePremium() {
    Alert.alert('Em breve! 🌸', 'O plano Premium está chegando em breve.');
  }

  function handleSkip() {
    router.replace('/(tabs)/dashboard');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeBtn} onPress={handleSkip} accessibilityRole="button" accessibilityLabel="Fechar">
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ProgressDots total={3} current={3} testID="progress-dots-plans" />

        <Text style={styles.title}>Escolha seu plano 🌸</Text>
        <Text style={styles.subtitle}>Comece gratuitamente a qualquer momento.</Text>

        <View style={[styles.cards, isWide ? styles.cardsRow : styles.cardsColumn]}>
          <View style={[styles.card, styles.cardFree, isWide && styles.cardFlex]}>
            <Text style={styles.planBadge}>GRATUITO</Text>
            <Text style={styles.planTitle}>Explorar</Text>
            <Text style={styles.planDesc}>
              Acompanhamento semana a semana, ferramentas e conteúdo editorial.
            </Text>
            <View style={styles.cardFooter}>
              <PrimaryButton
                variant="outline"
                label="Continuar no gratuito"
                onPress={handleFree}
                testID="btn-free"
              />
            </View>
          </View>

          <View style={[styles.card, styles.cardPremium, isWide && styles.cardFlex]}>
            <Text style={[styles.planBadge, styles.planBadgePremium]}>PREMIUM</Text>
            <Text style={[styles.planTitle, styles.planTitlePremium]}>Completo</Text>
            <Text style={[styles.planDesc, styles.planDescPremium]}>
              Tudo do gratuito + recursos exclusivos para toda a sua jornada.
            </Text>
            <View style={styles.cardFooter}>
              <GradientButton
                label="Assinar Premium"
                onPress={handlePremium}
                testID="btn-premium"
              />
            </View>
          </View>
        </View>

        {FEATURE_SLIDES.length > 0 && (
          <View style={styles.slides}>
            {FEATURE_SLIDES.map((slide, i) => (
              <View key={i} style={styles.slide}>
                <Text style={styles.slideIcon}>{slide.icon}</Text>
                <View style={styles.slideText}>
                  <Text style={styles.slideTitle}>{slide.title}</Text>
                  <Text style={styles.slideDesc}>{slide.description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  closeBtn: {
    position: 'absolute',
    top: spacing[4],
    right: spacing[4],
    zIndex: 10,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 28,
    color: colors.textSecondary,
    lineHeight: 32,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
    paddingBottom: spacing[8],
    gap: spacing[4],
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  cards: {
    gap: spacing[4],
    marginTop: spacing[2],
  },
  cardsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  cardsColumn: {
    flexDirection: 'column',
  },
  cardFlex: {
    flex: 1,
  },
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing[6],
    gap: spacing[3],
    ...shadows.soft,
  },
  cardFree: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border ?? '#E5E7EB',
  },
  cardPremium: {
    backgroundColor: colors.primary,
  },
  cardFooter: {
    marginTop: 'auto',
    paddingTop: spacing[2],
  },
  planBadge: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 1,
  },
  planBadgePremium: {
    color: colors.onPrimary,
    opacity: 0.85,
  },
  planTitle: {
    ...typography.h2,
    color: colors.text,
  },
  planTitlePremium: {
    color: colors.onPrimary,
  },
  planDesc: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  planDescPremium: {
    color: colors.onPrimary,
    opacity: 0.9,
  },
  slides: {
    gap: spacing[3],
    marginTop: spacing[2],
  },
  slide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  slideIcon: {
    fontSize: 28,
  },
  slideText: {
    flex: 1,
    gap: spacing[1],
  },
  slideTitle: {
    ...typography.label,
    color: colors.text,
  },
  slideDesc: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
