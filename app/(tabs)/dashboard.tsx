import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
  Share, ScrollView, Animated, Easing, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, typography, shadows, borderRadius, spacing } from '../../src/theme';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import {
  getWeek, DAILY_TIPS, SYMPTOMS_T1, SYMPTOMS_T2, SYMPTOMS_T3,
  getTrimesterProgress,
} from '../../src/data';
import { getProfile } from '../../src/hooks/useUserProfile';
import { useStreak } from '../../src/hooks/useStreak';
import { usePrenatalAppointments } from '../../src/hooks/usePrenatalAppointments';
import { getFruitEmoji } from '../../src/utils/fruitEmoji';

const TRIMESTER_LABELS: Record<1 | 2 | 3, string> = {
  1: '1º Trimestre',
  2: '2º Trimestre',
  3: '3º Trimestre',
};

const TIP_CATEGORY_LABELS: Record<string, string> = {
  sono: '😴 Sono',
  alimentação: '🥗 Alimentação',
  movimento: '🏃 Movimento',
  emocional: '💆 Bem-estar',
};

const SHORTCUT_ITEMS = [
  { icon: 'fitness-outline' as const, label: 'Sintomas', tab: '/(tabs)/ferramentas' },
  { icon: 'calendar-outline' as const, label: 'Consultas', tab: '/(tabs)/ferramentas' },
  { icon: 'radio-button-on-outline' as const, label: 'Contador', tab: '/(tabs)/ferramentas' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const currentWeek = useCurrentWeek();
  const { streak, isMilestone } = useStreak();
  const { appointments } = usePrenatalAppointments();
  const [userName, setUserName] = useState<string | null>(null);
  const [babyName, setBabyName] = useState<string | null>(null);

  const fruitAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    getProfile().then((p) => {
      if (p) {
        setUserName(p.name ?? null);
        setBabyName(p.babyName ?? null);
      }
    });
  }, []);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(fruitAnim, {
          toValue: 1.18,
          duration: 950,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        Animated.timing(fruitAnim, {
          toValue: 1,
          duration: 950,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [fruitAnim]);

  if (currentWeek === null) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const weekData = getWeek(currentWeek);
  const daysUntilBirth = weekData ? (40 - currentWeek) * 7 : null;
  const trimesterLabel = weekData ? TRIMESTER_LABELS[weekData.trimester] : '';
  const trimesterProgress = getTrimesterProgress(currentWeek);

  // Dica do dia — rotação diária
  const todayIndex = new Date().getDay();
  const dailyTip = DAILY_TIPS[todayIndex % DAILY_TIPS.length];

  // Sintomas esperados — usa maternalChanges enriquecidos ou fallback por trimestre
  const enrichedSymptoms = weekData?.maternalChanges?.slice(0, 3) ?? null;
  const trimesterSymptoms = weekData
    ? (weekData.trimester === 1 ? SYMPTOMS_T1 : weekData.trimester === 2 ? SYMPTOMS_T2 : SYMPTOMS_T3).slice(0, 3)
    : [];
  const expectedSymptoms = enrichedSymptoms ?? trimesterSymptoms;

  // Próxima consulta
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextAppointment = appointments.find(
    (a) => new Date(a.appointmentDate) >= today
  ) ?? null;

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  const handleShare = () => {
    const phrase = weekData?.motivationalPhrase ?? '';
    const base = `Estou na semana ${currentWeek} da gravidez! ${phrase} 🌸 #DoceGestar`;
    const message = babyName ? `${base}\n${babyName} está se desenvolvendo!` : base;
    Share.share({ message }).catch(() => {});
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.appTitle}>DoceGestar</Text>
      <Text style={styles.appSubtitle}>Seu acompanhamento semanal</Text>

      {/* Card 1 — Hero */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDeep]}
        style={styles.heroCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.heroInner}
          onPress={() => router.push('/(tabs)/semana')}
          activeOpacity={0.85}
        >
          <Text style={styles.heroGreeting}>
            {userName ? `Olá, ${userName}! Você está na semana` : 'Você está na semana'}
          </Text>
          <Text style={styles.heroWeek}>{currentWeek}</Text>
          <Text style={styles.heroTrimester}>{trimesterLabel}</Text>
          <Text style={styles.heroHint}>Toque para ver o card completo →</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareRow} onPress={handleShare} activeOpacity={0.8}>
          <Ionicons name="share-social-outline" size={16} color="rgba(255,255,255,0.9)" />
          <Text style={styles.shareText}>Compartilhar</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Card 2 — Bebê esta semana */}
      {weekData && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bebê esta semana</Text>
          <View style={styles.babyRow}>
            <View style={styles.babyMetric}>
              <Animated.Text style={[styles.fruitEmoji, { transform: [{ scale: fruitAnim }] }]}>
                {getFruitEmoji(weekData.baby.comparison)}
              </Animated.Text>
              <Text style={styles.babyComparison}>{weekData.baby.comparison}</Text>
            </View>
            {weekData.baby.sizeCm != null && (
              <View style={styles.babyMetric}>
                <Text style={styles.babyValue}>{weekData.baby.sizeCm} cm</Text>
                <Text style={styles.babyLabel}>comprimento</Text>
              </View>
            )}
            {weekData.baby.weightG != null && (
              <View style={styles.babyMetric}>
                <Text style={styles.babyValue}>{weekData.baby.weightG} g</Text>
                <Text style={styles.babyLabel}>peso aprox.</Text>
              </View>
            )}
          </View>
          {weekData.baby.milestones[0] && (
            <Text style={styles.milestoneBullet}>• {weekData.baby.milestones[0]}</Text>
          )}
        </View>
      )}

      {/* Card 3 — Sintomas esperados */}
      {expectedSymptoms.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sintomas esperados</Text>
          <Text style={styles.cardCaption}>Comuns na semana {currentWeek}</Text>
          {expectedSymptoms.map((s, i) => (
            <View key={i} style={styles.symptomRow}>
              <View style={styles.symptomDot} />
              <Text style={styles.symptomText}>{s}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Card 4 — Dica do dia */}
      <View style={styles.card}>
        <View style={styles.tipHeader}>
          <Text style={styles.cardTitle}>Dica do dia</Text>
          <View style={styles.tipBadge}>
            <Text style={styles.tipBadgeText}>
              {TIP_CATEGORY_LABELS[dailyTip.category] ?? dailyTip.category}
            </Text>
          </View>
        </View>
        <Text style={styles.tipText}>{dailyTip.text}</Text>
      </View>

      {/* Card 5 — Registro rápido */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Registro rápido</Text>
        <Text style={styles.cardCaption}>Acesse suas ferramentas</Text>
        <View style={styles.shortcutRow}>
          {SHORTCUT_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.shortcutBtn}
              onPress={() => router.push(item.tab as Parameters<typeof router.push>[0])}
              activeOpacity={0.75}
            >
              <Ionicons name={item.icon} size={22} color={colors.primary} />
              <Text style={styles.shortcutLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Card 6 — Curiosidade */}
      {weekData && (
        <View style={[styles.card, styles.cardCuriosity]}>
          <Text style={[styles.cardTitle, { color: colors.primary }]}>Curiosidade da semana</Text>
          <Text style={styles.curiosityText}>
            {weekData.curiosities?.[0] ?? weekData.motivationalPhrase ?? ''}
          </Text>
        </View>
      )}

      {/* Card 7 — Próxima consulta */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próxima consulta</Text>
        {nextAppointment ? (
          <View style={styles.appointmentContent}>
            <Ionicons name="calendar" size={20} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.appointmentType}>{nextAppointment.type}</Text>
              <Text style={styles.appointmentDate}>
                {formatDate(nextAppointment.appointmentDate)} às {nextAppointment.appointmentTime}
              </Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.appointmentCta}
            onPress={() => router.push('/(tabs)/ferramentas')}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
            <Text style={styles.appointmentCtaText}>Agendar consulta</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Card 8 — Progresso */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Progresso</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${trimesterProgress}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          {trimesterLabel} — {trimesterProgress}% concluído
        </Text>
        <View style={styles.progressStats}>
          <View style={styles.progressStat}>
            <Text style={[styles.progressStatValue, isMilestone && styles.milestoneValue]}>
              {isMilestone ? '🎉' : '🔥'} {streak}
            </Text>
            <Text style={styles.progressStatLabel}>dias seguidos</Text>
          </View>
          {daysUntilBirth !== null && (
            <View style={styles.progressStat}>
              <Text style={styles.progressStatValue}>~{daysUntilBirth}</Text>
              <Text style={styles.progressStatLabel}>dias para o parto</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingTop: spacing[8],
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
  },
  appTitle: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing[1],
  },
  appSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing[6],
  },

  // Hero
  heroCard: {
    borderRadius: 24,
    marginBottom: spacing[4],
    overflow: 'hidden',
  },
  heroInner: {
    padding: spacing[6],
    alignItems: 'center',
  },
  heroGreeting: {
    ...typography.label,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: spacing[1],
  },
  heroWeek: {
    fontSize: 56,
    fontFamily: 'NotoSerif_700Bold',
    fontWeight: '700',
    color: '#ffffff',
    marginVertical: spacing[1],
  },
  heroTrimester: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: spacing[2],
  },
  heroHint: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
  },
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingVertical: spacing[3],
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  shareText: {
    ...typography.label,
    color: 'rgba(255,255,255,0.9)',
  },

  // Card base
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing[4],
    marginBottom: spacing[3],
    ...shadows.editorial,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing[2],
  },
  cardCaption: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: -spacing[1],
    marginBottom: spacing[3],
  },

  // Bebê
  babyRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing[3],
  },
  babyMetric: {
    alignItems: 'center',
    gap: spacing[1],
  },
  fruitEmoji: {
    fontSize: 36,
    lineHeight: 42,
  },
  babyComparison: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  babyValue: {
    ...typography.h3,
    color: colors.primary,
  },
  babyLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  milestoneBullet: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },

  // Sintomas
  symptomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  symptomDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  symptomText: {
    ...typography.bodySmall,
    color: colors.text,
    flex: 1,
  },

  // Dica
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  tipBadge: {
    backgroundColor: colors.primaryTint ?? '#FCE7F3',
    borderRadius: 12,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
  },
  tipBadgeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  tipText: {
    ...typography.body,
    color: colors.text,
  },

  // Registro rápido
  shortcutRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing[2],
  },
  shortcutBtn: {
    alignItems: 'center',
    gap: spacing[2],
    backgroundColor: colors.surfaceContainerLow ?? '#FFF0F7',
    borderRadius: 16,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    minWidth: 80,
  },
  shortcutLabel: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },

  // Curiosidade
  cardCuriosity: {
    backgroundColor: colors.primaryTint ?? '#FCE7F3',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  curiosityText: {
    ...typography.bodySmall,
    color: colors.text,
    fontStyle: 'italic',
    lineHeight: 22,
  },

  // Consulta
  appointmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  appointmentType: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  appointmentDate: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  appointmentCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  appointmentCtaText: {
    ...typography.bodySmall,
    color: colors.primary,
  },

  // Progresso
  progressBarBg: {
    height: 8,
    backgroundColor: colors.surfaceContainerHighest ?? '#F3E8FF',
    borderRadius: 4,
    marginBottom: spacing[2],
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing[3],
  },
  progressStats: {
    flexDirection: 'row',
    gap: spacing[6],
  },
  progressStat: {
    alignItems: 'flex-start',
  },
  progressStatValue: {
    ...typography.h3,
    color: colors.primary,
  },
  milestoneValue: {
    color: '#f5a623',
  },
  progressStatLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  bottomSpacer: {
    height: spacing[4],
  },
});
