import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../../src/theme';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';
import { useOnboarding } from '../../src/context/OnboardingContext';
import { saveOnboardingProfile } from '../../src/hooks/useUserProfile';

const FEATURES: { icon: DGIconName; label: string; sub: string }[] = [
  { icon: 'sparkles', label: 'Conteúdo semanal premium', sub: 'Vídeos, podcasts e e-books exclusivos' },
  { icon: 'mail', label: 'Chat com obstetriz 24/7', sub: 'Tire dúvidas a qualquer hora' },
  { icon: 'star', label: 'Álbum ilimitado', sub: 'Salve quantas fotos e cartas quiser' },
  { icon: 'heart', label: 'Personalização total', sub: 'Temas, lembretes e relatórios' },
];

export default function PlansScreen() {
  const router = useRouter();
  const { draft } = useOnboarding();

  async function persist(plan: 'free' | 'premium') {
    await saveOnboardingProfile({
      name: draft.name || null,
      relationship: draft.relationship,
      dueDate: draft.estimatedDueDate,
      plan,
    });
    router.replace('/(tabs)/dashboard');
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.text, '#2E2247', colors.primaryDeep]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => persist('free')}
            accessibilityRole="button"
            accessibilityLabel="Continuar no plano gratuito"
            testID="btn-close-paywall"
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>✨ DOCEGESTAR PLUS</Text>
          </View>

          <Text style={styles.title}>
            Sua jornada{'\n'}
            <Text style={styles.titleAccent}>completa e sem limites</Text>
          </Text>

          <Text style={styles.subtitle}>
            Conteúdo exclusivo da semana, suporte 24/7 com obstetrizes e seu álbum gestacional sem limite.
          </Text>

          <View style={styles.features}>
            {FEATURES.map((f) => (
              <View key={f.icon} style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <DGIcon name={f.icon} size="md" color={colors.pink200} />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureLabel}>{f.label}</Text>
                  <Text style={styles.featureSub}>{f.sub}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.planCard}>
            <View style={styles.planRow}>
              <View style={{ flex: 1 }}>
                <View style={styles.planTitleRow}>
                  <Text style={styles.planTitle}>Anual</Text>
                  <View style={styles.discountChip}>
                    <Text style={styles.discountText}>−40%</Text>
                  </View>
                </View>
                <Text style={styles.planSub}>R$ 9,90/mês · cobrado anualmente</Text>
              </View>
              <Text style={styles.planPrice}>R$ 119</Text>
            </View>

            <View style={styles.planDivider} />

            <View style={[styles.planRow, styles.planDim]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.planTitleAlt}>Mensal</Text>
                <Text style={styles.planSub}>R$ 16,90/mês</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.cta}
            onPress={() => persist('premium')}
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityLabel="Começar 7 dias grátis no plano premium"
            testID="btn-premium"
          >
            <Text style={styles.ctaText}>Começar 7 dias grátis</Text>
          </TouchableOpacity>

          <Text style={styles.legal}>
            Cancele quando quiser · Termos · Privacidade
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.text },
  safe: { flex: 1 },
  topRow: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[2],
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { fontSize: 22, color: '#FFFFFF', lineHeight: 26 },
  scroll: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[10],
    gap: spacing[4],
  },
  heroBadge: {
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginTop: spacing[3],
    marginBottom: spacing[1],
  },
  heroBadgeText: {
    ...typography.eyebrow,
    color: '#FFFFFF',
  },
  title: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -1.4,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  titleAccent: { color: colors.pink200 },
  subtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: -spacing[2],
  },
  features: { gap: spacing[3], marginTop: spacing[3] },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  featureIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: { flex: 1, gap: 2 },
  featureLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13.5,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  featureSub: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11.5,
    lineHeight: 16,
    color: 'rgba(255,255,255,0.7)',
  },
  planCard: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    marginTop: spacing[4],
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planDim: { opacity: 0.65 },
  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  planTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13.5,
    color: '#FFFFFF',
  },
  planTitleAlt: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  discountChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: 'rgba(236,55,121,0.4)',
  },
  discountText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 10,
    color: colors.pink200,
  },
  planSub: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  planPrice: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  planDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: 12,
    marginHorizontal: -18,
  },
  cta: {
    height: 56,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[1],
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 10,
  },
  ctaText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 15,
    color: colors.primaryDeep,
  },
  legal: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
});
