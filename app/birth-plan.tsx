import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../src/theme';
import { DGIcon, DGIconName } from '../src/components/DGIcon';
import { useBottomSpacing } from '../src/hooks/useBottomSpacing';

type Section = {
  id: string;
  icon: DGIconName;
  label: string;
  value: string | null;
};

const INITIAL_SECTIONS: Section[] = [
  { id: 'local', icon: 'home', label: 'Local e ambiente', value: null },
  { id: 'team', icon: 'user', label: 'Equipe', value: null },
  { id: 'ambience', icon: 'sparkles', label: 'Ambiente', value: null },
  { id: 'labor', icon: 'heart', label: 'Trabalho de parto', value: null },
  { id: 'analgesia', icon: 'pill', label: 'Analgesia', value: null },
  { id: 'birth', icon: 'flower', label: 'Nascimento', value: null },
  { id: 'postpartum', icon: 'foot', label: 'Pós-parto imediato', value: null },
  { id: 'cesarea', icon: 'mail', label: 'Cesárea (caso necessário)', value: null },
];

export default function BirthPlanScreen() {
  const router = useRouter();
  const bottom = useBottomSpacing(false);
  const [sections] = useState<Section[]>(INITIAL_SECTIONS);

  const { done, total, pct } = useMemo(() => {
    const t = sections.length;
    const d = sections.filter((s) => s.value !== null).length;
    return { done: d, total: t, pct: Math.round((d / t) * 100) };
  }, [sections]);

  function comingSoon() {
    Alert.alert(
      'Em breve! 🌸',
      'Edição de seções e envio para a equipe chegam em uma próxima atualização.',
    );
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.lav100, colors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.6, y: 1 }}
        style={styles.headerBg}
      >
        <SafeAreaView edges={['top']} style={styles.headerSafe}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <DGIcon name="chevronLeft" size="sm" color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={comingSoon}
              accessibilityRole="button"
              accessibilityLabel="Editar plano"
            >
              <DGIcon name="edit" size="sm" color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>Plano de parto · rascunho</Text>
            <Text style={styles.title}>Como eu desejo{'\n'}esse momento ser</Text>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressTop}>
              <Text style={styles.progressLabel}>{pct}% preenchido</Text>
              <Text style={styles.progressSub}>{done} de {total} seções</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${pct}%` }]} />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((sec) => {
          const filled = sec.value !== null;
          return (
            <TouchableOpacity
              key={sec.id}
              style={[styles.sectionCard, !filled && styles.sectionDashed]}
              onPress={comingSoon}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={`${sec.label}${filled ? '' : ' — a definir'}`}
            >
              <View
                style={[
                  styles.sectionIcon,
                  filled ? styles.sectionIconFilled : styles.sectionIconEmpty,
                ]}
              >
                <DGIcon
                  name={sec.icon}
                  size="sm"
                  color={filled ? colors.primary : colors.textSecondary}
                />
              </View>
              <View style={styles.sectionText}>
                <Text style={styles.sectionLabel}>{sec.label}</Text>
                <Text style={styles.sectionValue} numberOfLines={1}>
                  {sec.value ?? 'A definir'}
                </Text>
              </View>
              {filled ? (
                <View style={styles.checkChip}>
                  <DGIcon name="check" size="xs" color="#FFFFFF" />
                </View>
              ) : (
                <DGIcon name="chevronRight" size="sm" color={colors.inkSubtle} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.ctaWrap}>
        <TouchableOpacity
          style={styles.cta}
          onPress={comingSoon}
          activeOpacity={0.9}
          accessibilityRole="button"
          accessibilityLabel="Enviar plano para a equipe médica"
        >
          <DGIcon name="mail" size="sm" color="#FFFFFF" />
          <Text style={styles.ctaText}>Enviar para a equipe</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  headerBg: { paddingBottom: spacing[5] },
  headerSafe: { paddingHorizontal: spacing[5] },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing[2],
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginTop: spacing[4],
    gap: spacing[1],
    flexShrink: 1,
  },
  eyebrow: {
    ...typography.eyebrow,
    color: colors.primaryDeep,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: -0.8,
    color: colors.text,
  },
  progressCard: {
    marginTop: spacing[5],
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: colors.text,
  },
  progressSub: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: colors.textSecondary,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.7)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[4],
    gap: spacing[2],
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  sectionDashed: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
    opacity: 0.85,
    shadowOpacity: 0,
    elevation: 0,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIconFilled: { backgroundColor: colors.primaryLight },
  sectionIconEmpty: { backgroundColor: colors.surfaceContainer },
  sectionText: { flex: 1, minWidth: 0 },
  sectionLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    color: colors.text,
  },
  sectionValue: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkChip: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaWrap: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[3],
    backgroundColor: colors.background,
  },
  cta: {
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 8,
  },
  ctaText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
