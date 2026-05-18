import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography } from '../../src/theme';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { useBottomSpacing } from '../../src/hooks/useBottomSpacing';

type MoodKey = 'baixa' | 'so-so' | 'bem' | 'feliz' | 'amor';

const MOODS: { key: MoodKey; emoji: string; label: string }[] = [
  { key: 'baixa', emoji: '☁️', label: 'baixa' },
  { key: 'so-so', emoji: '🌥', label: 'so-so' },
  { key: 'bem',   emoji: '🌤', label: 'bem' },
  { key: 'feliz', emoji: '☀️', label: 'feliz' },
  { key: 'amor',  emoji: '🌸', label: 'amor' },
];

const QUICK_CHIPS: { icon: DGIconName; label: string; color: string }[] = [
  { icon: 'foot',   label: 'Chute', color: colors.primary },
  { icon: 'edit',   label: 'Carta', color: '#7BB6D6' },
  { icon: 'camera', label: 'Foto',  color: '#E8854A' },
  { icon: 'heart',  label: 'Marco', color: '#5BB76E' },
];

const WEEKDAYS_PT = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const MONTHS_PT = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

function formatToday() {
  const d = new Date();
  return {
    weekday: WEEKDAYS_PT[d.getDay()],
    title: `${d.getDate()} de ${MONTHS_PT[d.getMonth()]}`,
  };
}

export default function DiarioScreen() {
  const insets = useSafeAreaInsets();
  const bottom = useBottomSpacing(true);
  const currentWeek = useCurrentWeek();
  const [mood, setMood] = useState<MoodKey | null>(null);
  const { weekday, title } = formatToday();

  const handleSoon = () => {
    Alert.alert('Em breve', 'Registro completo de entradas chega na próxima atualização.');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: bottom }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header editorial */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>MEU DIÁRIO 💕</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {weekday}{currentWeek ? ` · semana ${currentWeek}` : ''}
          </Text>
        </View>
        <TouchableOpacity style={styles.headerBtn} onPress={handleSoon} accessibilityLabel="Buscar entradas">
          <DGIcon name="search" size={18} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Mood picker */}
      <View style={styles.moodCardWrapper}>
        <LinearGradient
          colors={[colors.lav50, colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.moodCard}
        >
          <Text style={styles.moodTitle}>Como você se sente?</Text>
          <View style={styles.moodRow}>
            {MOODS.map((m) => {
              const selected = mood === m.key;
              return (
                <TouchableOpacity
                  key={m.key}
                  activeOpacity={0.85}
                  onPress={() => setMood(selected ? null : m.key)}
                  style={[styles.moodItem, selected && styles.moodItemSelected]}
                  accessibilityLabel={`Humor ${m.label}`}
                  accessibilityState={{ selected }}
                >
                  <Text style={styles.moodEmoji}>{m.emoji}</Text>
                  <Text style={[styles.moodLabel, selected && styles.moodLabelSelected]}>
                    {m.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </LinearGradient>
      </View>

      {/* Quick chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {QUICK_CHIPS.map((c) => (
          <TouchableOpacity
            key={c.label}
            style={styles.chip}
            onPress={handleSoon}
            activeOpacity={0.85}
          >
            <View style={[styles.chipIcon, { backgroundColor: c.color + '20' }]}>
              <DGIcon name={c.icon} size={12} color={c.color} />
            </View>
            <Text style={styles.chipLabel}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Hero milestone (real week) */}
      {currentWeek && (
        <View style={styles.milestoneWrapper}>
          <LinearGradient
            colors={[colors.pink400, colors.primaryDeep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.milestone}
          >
            <View style={styles.milestoneRow}>
              <View style={styles.milestoneIcon}>
                <DGIcon name="sparkles" size={14} color="#fff" />
              </View>
              <Text style={styles.milestoneEyebrow}>
                MARCO · SEMANA {currentWeek}
              </Text>
            </View>
            <Text style={styles.milestoneTitle}>
              Você chegou às {currentWeek} semanas 🎉
            </Text>
            <Text style={styles.milestoneBody}>
              Cada semana é uma vitória. Use o diário para registrar como se sente e os marcos da sua jornada.
            </Text>
          </LinearGradient>
        </View>
      )}

      {/* Empty state honest */}
      <View style={styles.emptyCard}>
        <View style={styles.emptyIcon}>
          <DGIcon name="edit" size={20} color={colors.primary} />
        </View>
        <Text style={styles.emptyTitle}>Suas entradas aparecerão aqui</Text>
        <Text style={styles.emptyBody}>
          Toque no botão rosa abaixo para começar a registrar chutes, fotos da barriga e marcos especiais.
        </Text>
      </View>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 96 }]}
        onPress={handleSoon}
        activeOpacity={0.85}
        accessibilityLabel="Adicionar entrada"
      >
        <DGIcon name="plus" size={26} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 0 },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingBottom: 4,
  },
  eyebrow: { ...typography.eyebrow, color: colors.primary },
  title: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.8,
    color: colors.text,
    marginTop: 2,
  },
  subtitle: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  headerBtn: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 2,
  },

  moodCardWrapper: { paddingHorizontal: 18, marginTop: 18 },
  moodCard: { borderRadius: 24, padding: 16 },
  moodTitle: { ...typography.h3, color: colors.text, fontSize: 14 },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  moodItem: {
    width: 54, height: 64, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', gap: 2,
  },
  moodItemSelected: {
    backgroundColor: '#fff',
    shadowColor: '#281438', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 6 }, shadowRadius: 14, elevation: 3,
  },
  moodEmoji: { fontSize: 24 },
  moodLabel: { ...typography.caption, color: colors.textSecondary, fontSize: 10 },
  moodLabelSelected: { color: colors.primary },

  chipsRow: { paddingHorizontal: 22, paddingTop: 14, gap: 8 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 7, paddingLeft: 8, paddingRight: 12,
    borderRadius: 100, backgroundColor: colors.surface,
    shadowColor: '#281438', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 2,
  },
  chipIcon: {
    width: 22, height: 22, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center',
  },
  chipLabel: { ...typography.caption, color: colors.text },

  milestoneWrapper: { paddingHorizontal: 18, marginTop: 14 },
  milestone: { borderRadius: 22, padding: 16 },
  milestoneRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  milestoneIcon: {
    width: 28, height: 28, borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
  },
  milestoneEyebrow: {
    ...typography.eyebrow,
    color: '#fff', opacity: 0.9,
  },
  milestoneTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 18, lineHeight: 22, letterSpacing: -0.3,
    color: '#fff', marginTop: 8,
  },
  milestoneBody: {
    ...typography.bodySmall,
    color: '#fff', opacity: 0.92, marginTop: 4,
  },

  emptyCard: {
    marginHorizontal: 18, marginTop: 16, padding: 20, borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    shadowColor: '#281438', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 6 }, shadowRadius: 16, elevation: 2,
  },
  emptyIcon: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 10,
  },
  emptyTitle: { ...typography.h3, color: colors.text, textAlign: 'center' },
  emptyBody: { ...typography.bodySmall, color: colors.textSecondary, textAlign: 'center', marginTop: 6 },

  fab: {
    position: 'absolute', right: 22,
    width: 60, height: 60, borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.primary, shadowOpacity: 0.45, shadowOffset: { width: 0, height: 16 }, shadowRadius: 28, elevation: 12,
  },
});
