import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DGIcon } from '../../src/components/DGIcon';
import { colors } from '../../src/theme';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { getWeek, getFruitImage } from '../../src/data';
import { getProfile } from '../../src/hooks/useUserProfile';
import { useBottomSpacing } from '../../src/hooks/useBottomSpacing';

const TRIMESTER_LABELS: Record<1 | 2 | 3, string> = {
  1: '1º TRIMESTRE',
  2: '2º TRIMESTRE',
  3: '3º TRIMESTRE',
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function HojeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottom = useBottomSpacing(true);
  const currentWeek = useCurrentWeek();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    getProfile().then((p) => {
      if (p) setUserName(p.name ?? null);
    });
  }, []);

  if (currentWeek === null) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const weekData = getWeek(currentWeek);
  const daysUntilBirth = (40 - currentWeek) * 7;
  const trimester: 1 | 2 | 3 = weekData?.trimester ?? 1;
  const trimesterLabel = TRIMESTER_LABELS[trimester];
  const progressPct = Math.min(100, Math.round((currentWeek / 40) * 100));
  const greeting = getGreeting();
  const firstName = userName ? userName.split(' ')[0] : 'Olá';
  const comparison = weekData?.baby.comparison ?? 'seu bebê';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Topbar mínima */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greetingLabel}>{greeting},</Text>
            <Text style={styles.greetingName} numberOfLines={1}>
              {firstName}
            </Text>
          </View>
          <TouchableOpacity style={styles.bell} activeOpacity={0.8}>
            <DGIcon name="bell" size={18} color={colors.text} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        {/* Mega card herói */}
        <View style={styles.heroWrap}>
          <TouchableOpacity
            activeOpacity={0.92}
            onPress={() => router.push('/(tabs)/bebe')}
          >
            <LinearGradient
              colors={[colors.pink400, colors.primary, colors.primaryDeep]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.hero}
            >
              <Text style={styles.heroWatermark}>{currentWeek}</Text>

              <Text style={styles.heroEyebrow}>
                {trimesterLabel} · SEMANA {currentWeek}
              </Text>

              <View style={styles.heroImageWrap}>
                <View style={styles.heroHalo} />
                <Image
                  source={getFruitImage(currentWeek)}
                  style={styles.heroImage}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.heroComparison}>Do tamanho de {comparison}</Text>

              <View style={styles.heroPills}>
                <View style={styles.pill}>
                  <Text style={styles.pillLabel}>Tamanho</Text>
                  <Text style={styles.pillValue}>{weekData?.baby.sizeCm ?? '—'}</Text>
                </View>
                <View style={styles.pill}>
                  <Text style={styles.pillLabel}>Peso</Text>
                  <Text style={styles.pillValue}>{weekData?.baby.weightG ?? '—'}</Text>
                </View>
              </View>

              <View style={styles.heroProgress}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
                </View>
                <Text style={styles.progressText}>
                  {currentWeek} de 40 semanas · faltam {daysUntilBirth} dias
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Marco da semana */}
        {weekData?.baby.clinicalMilestone ? (
          <View style={styles.sectionWrap}>
            <View style={styles.milestoneCard}>
              <View style={styles.milestoneIcon}>
                <DGIcon name="star" size={20} color={colors.primary} />
              </View>
              <View style={styles.milestoneText}>
                <Text style={styles.milestoneKicker}>MARCO DA SEMANA</Text>
                <Text style={styles.milestoneBody}>{weekData.baby.clinicalMilestone}</Text>
              </View>
            </View>
          </View>
        ) : null}

        {/* Carrossel "Esta semana" */}
        <Text style={styles.carouselTitle}>Esta semana</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        >
          {weekData?.weeklyTip ? (
            <View style={styles.weekCard}>
              <View style={styles.weekCardIcon}>
                <DGIcon name="sparkles" size={18} color={colors.primary} />
              </View>
              <Text style={styles.weekCardKicker}>DICA DA SEMANA</Text>
              <Text style={styles.weekCardText}>{weekData.weeklyTip}</Text>
            </View>
          ) : null}
          {weekData?.curiosities?.[0] ? (
            <View style={styles.weekCard}>
              <View style={styles.weekCardIcon}>
                <DGIcon name="compass" size={18} color={colors.primary} />
              </View>
              <Text style={styles.weekCardKicker}>CURIOSIDADE</Text>
              <Text style={styles.weekCardText}>{weekData.curiosities[0]}</Text>
            </View>
          ) : null}
          {weekData?.symptoms?.[0] ? (
            <View style={styles.weekCard}>
              <View style={styles.weekCardIcon}>
                <DGIcon name="activity" size={18} color={colors.primary} />
              </View>
              <Text style={styles.weekCardKicker}>SINTOMA COMUM</Text>
              <Text style={styles.weekCardText}>{weekData.symptoms[0]}</Text>
            </View>
          ) : null}
        </ScrollView>

        {/* Ações rápidas */}
        <View style={styles.sectionWrap}>
          <View style={styles.quickRow}>
            <TouchableOpacity
              style={styles.quickItem}
              activeOpacity={0.7}
              onPress={() => router.push('/(tabs)/ferramentas')}
            >
              <View style={styles.quickIcon}>
                <DGIcon name="foot" size={20} color={colors.primary} />
              </View>
              <Text style={styles.quickLabel}>Chute</Text>
            </TouchableOpacity>
            <View style={styles.quickDivider} />
            <TouchableOpacity
              style={styles.quickItem}
              activeOpacity={0.7}
              onPress={() => router.push('/(tabs)/ferramentas')}
            >
              <View style={styles.quickIcon}>
                <DGIcon name="activity" size={20} color={colors.primary} />
              </View>
              <Text style={styles.quickLabel}>Contração</Text>
            </TouchableOpacity>
            <View style={styles.quickDivider} />
            <TouchableOpacity
              style={styles.quickItem}
              activeOpacity={0.7}
              onPress={() => router.push('/diario')}
            >
              <View style={styles.quickIcon}>
                <DGIcon name="edit" size={20} color={colors.primary} />
              </View>
              <Text style={styles.quickLabel}>Diário</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Conteúdo da semana → Explorar */}
        <View style={styles.sectionWrap}>
          <TouchableOpacity
            style={styles.ctaCard}
            activeOpacity={0.85}
            onPress={() => router.push('/(tabs)/explorar')}
          >
            <View style={[styles.ctaIcon, { backgroundColor: colors.primaryLight }]}>
              <DGIcon name="book" size={20} color={colors.primary} />
            </View>
            <View style={styles.ctaText}>
              <Text style={styles.ctaTitle}>Conteúdo da semana</Text>
              <Text style={styles.ctaSub}>Vídeos, dicas e nutrição</Text>
            </View>
            <Text style={styles.ctaArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Ferramentas pré-natais → Ferramentas */}
        <View style={styles.sectionWrap}>
          <TouchableOpacity
            style={styles.ctaCard}
            activeOpacity={0.85}
            onPress={() => router.push('/(tabs)/ferramentas')}
          >
            <LinearGradient
              colors={[colors.pink400, colors.primaryDeep]}
              style={styles.ctaIcon}
            >
              <DGIcon name="stethoscope" size={20} color={colors.onPrimary} />
            </LinearGradient>
            <View style={styles.ctaText}>
              <Text style={styles.ctaTitle}>Ferramentas pré-natais</Text>
              <Text style={styles.ctaSub}>Chutes, contrações, consultas, sintomas</Text>
            </View>
            <Text style={styles.ctaArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  scrollContent: { paddingTop: 8 },

  // Topbar
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 22,
    paddingTop: 8,
  },
  headerText: { flex: 1 },
  greetingLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  greetingName: {
    fontSize: 20,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
    lineHeight: 24,
  },
  bell: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.surface,
  },

  // Mega hero
  heroWrap: { paddingHorizontal: 18, paddingTop: 16 },
  hero: {
    borderRadius: 36,
    paddingVertical: 26,
    paddingHorizontal: 22,
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.28,
    shadowRadius: 44,
    elevation: 9,
  },
  heroWatermark: {
    position: 'absolute',
    top: -34,
    right: 6,
    fontSize: 200,
    lineHeight: 220,
    color: 'rgba(255,255,255,0.10)',
    fontFamily: 'PlusJakartaSans_800ExtraBold',
  },
  heroEyebrow: {
    fontSize: 11,
    color: colors.onPrimary,
    opacity: 0.9,
    letterSpacing: 1.4,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  heroImageWrap: {
    width: 208,
    height: 208,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroHalo: {
    position: 'absolute',
    width: 188,
    height: 188,
    borderRadius: 94,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  heroImage: { width: 168, height: 168 },
  heroComparison: {
    fontSize: 15,
    color: colors.onPrimary,
    marginTop: 14,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  heroPills: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 9,
    alignItems: 'center',
    minWidth: 104,
  },
  pillLabel: {
    fontSize: 10,
    color: colors.onPrimary,
    opacity: 0.8,
    letterSpacing: 0.5,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  pillValue: {
    fontSize: 15,
    color: colors.onPrimary,
    marginTop: 2,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  heroProgress: { marginTop: 20, alignSelf: 'stretch' },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.onPrimary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 11.5,
    color: colors.onPrimary,
    opacity: 0.9,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans_500Medium',
  },

  // Section
  sectionWrap: { paddingHorizontal: 18, paddingTop: 14 },

  // Marco da semana
  milestoneCard: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 2,
  },
  milestoneIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneText: { flex: 1 },
  milestoneKicker: {
    fontSize: 10.5,
    color: colors.primary,
    letterSpacing: 0.8,
    marginBottom: 4,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  milestoneBody: {
    fontSize: 13.5,
    color: colors.text,
    lineHeight: 19,
    fontFamily: 'PlusJakartaSans_500Medium',
  },

  // Carrossel
  carouselTitle: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 2,
  },
  carousel: {
    paddingHorizontal: 18,
    paddingTop: 12,
    gap: 12,
  },
  weekCard: {
    width: 248,
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  weekCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  weekCardKicker: {
    fontSize: 10.5,
    color: colors.primary,
    letterSpacing: 0.8,
    marginBottom: 5,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  weekCardText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
    fontFamily: 'PlusJakartaSans_500Medium',
  },

  // Ações rápidas
  quickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 22,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  quickItem: {
    flex: 1,
    alignItems: 'center',
    gap: 7,
  },
  quickIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: {
    fontSize: 11.5,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  quickDivider: {
    width: 1,
    height: 38,
    backgroundColor: colors.border,
  },

  // CTA cards
  ctaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 2,
  },
  ctaIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: { flex: 1 },
  ctaTitle: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  ctaSub: {
    fontSize: 11.5,
    color: colors.textSecondary,
    marginTop: 2,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  ctaArrow: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});
