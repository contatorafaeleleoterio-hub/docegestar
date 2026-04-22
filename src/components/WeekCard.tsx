import { useState, useEffect, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Image, Pressable, Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, typography, shadows, borderRadius, spacing } from '../theme';
import { getWeek, getTrimesterProgress, AVOID_FOODS, DAILY_TIPS } from '../data';
import type { TipCategory } from '../data/shared/care';
import { getDatabase } from '../db';
import { useWeekCompletion } from '../hooks/useWeekCompletion';
import { useSymptomChecks } from '../hooks/useSymptomChecks';
import { useCareChecks } from '../hooks/useCareChecks';
import { useWeekTracking } from '../hooks/useWeekTracking';
import { useSpecialMoment } from '../hooks/useSpecialMoment';
import type { NauseaLevel, HumorLevel, AppetiteLevel } from '../types';

interface WeekCardProps {
  weekNumber: number;
}

const TIP_CATEGORY_COLORS: Record<TipCategory, string> = {
  sono: '#abcbdb',
  alimentação: '#c8e6c9',
  movimento: '#ffdcc4',
  emocional: '#ffdbd2',
};

const TIP_CATEGORY_ICONS: Record<TipCategory, string> = {
  sono: '😴',
  alimentação: '🥗',
  movimento: '🤸',
  emocional: '💆',
};

const TRIMESTER_COLORS = {
  1: colors.trimester1,
  2: colors.trimester2,
  3: colors.trimester3,
} as const;

const TRIMESTER_LABELS = {
  1: '1º Trimestre',
  2: '2º Trimestre',
  3: '3º Trimestre',
} as const;

const NAUSEA_OPTIONS: { value: NauseaLevel; label: string }[] = [
  { value: 'sem', label: 'Sem' },
  { value: 'leve', label: 'Leve' },
  { value: 'media', label: 'Média' },
  { value: 'forte', label: 'Forte' },
];

const HUMOR_OPTIONS: { value: HumorLevel; label: string }[] = [
  { value: 'bem', label: 'Bem' },
  { value: 'oscilando', label: 'Oscilando' },
  { value: 'dificil', label: 'Difícil' },
];

const APPETITE_OPTIONS: { value: AppetiteLevel; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'pouco', label: 'Pouco' },
  { value: 'muito', label: 'Muito' },
];

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function CheckItem({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <Pressable style={styles.checkRow} onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.checkLabel, checked && styles.checkLabelChecked]}>{label}</Text>
    </Pressable>
  );
}

function OptionPicker<T extends string>({
  label, value, options, onSelect,
}: { label: string; value?: T; options: { value: T; label: string }[]; onSelect: (v: T) => void }) {
  return (
    <View style={styles.pickerRow}>
      <Text style={styles.pickerLabel}>{label}</Text>
      <View style={styles.pickerOptions}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.optionBtn, value === opt.value && styles.optionBtnActive]}
            onPress={() => onSelect(opt.value)}
          >
            <Text style={[styles.optionText, value === opt.value && styles.optionTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export function WeekCard({ weekNumber }: WeekCardProps) {
  const weekData = getWeek(weekNumber);
  const { completed, dateLabel, toggleCompletion } = useWeekCompletion(weekNumber);
  const { checks: symptomChecks, toggleSymptom } = useSymptomChecks(weekNumber);
  const { checks: careChecks, toggleCare } = useCareChecks(weekNumber);
  const { tracking, saveTracking } = useWeekTracking(weekNumber);
  const { moment, saveMoment } = useSpecialMoment(weekNumber);

  const [babyPage, setBabyPage] = useState(0);
  const babyScrollRef = useRef<ScrollView>(null);
  const [tipSaved, setTipSaved] = useState(false);

  const dailyTip = DAILY_TIPS[new Date().getDate() % DAILY_TIPS.length];

  async function handleSaveTip() {
    const db = await getDatabase();
    await db.runAsync(
      'INSERT INTO saved_tips (week, tip_text, category, saved_at) VALUES (?, ?, ?, ?)',
      [weekNumber, dailyTip.text, dailyTip.category, new Date().toISOString()]
    );
    setTipSaved(true);
  }

  const [dateLabelInput, setDateLabelInput] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [sleepInput, setSleepInput] = useState('');
  const [nausea, setNausea] = useState<NauseaLevel | undefined>();
  const [humor, setHumor] = useState<HumorLevel | undefined>();
  const [appetite, setAppetite] = useState<AppetiteLevel | undefined>();
  const [noteText, setNoteText] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>();

  useEffect(() => {
    if (dateLabel !== undefined) setDateLabelInput(dateLabel);
  }, [dateLabel]);

  useEffect(() => {
    if (tracking) {
      setWeightInput(tracking.weightKg?.toString() ?? '');
      setSleepInput(tracking.sleepHours?.toString() ?? '');
      setNausea(tracking.nausea);
      setHumor(tracking.humor);
      setAppetite(tracking.appetite);
    }
  }, [tracking]);

  useEffect(() => {
    if (moment) {
      setNoteText(moment.textContent ?? '');
      setPhotoUri(moment.photoUri);
    }
  }, [moment]);

  if (!weekData) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Semana {weekNumber} não encontrada.</Text>
      </View>
    );
  }

  const progress = getTrimesterProgress(weekNumber);
  const trimColor = TRIMESTER_COLORS[weekData.trimester];

  async function handlePickPhoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      await saveMoment(noteText, uri);
    }
  }

  async function handleSaveMoment() {
    await saveMoment(noteText, photoUri);
  }

  async function handleSaveTracking() {
    await saveTracking({
      weightKg: weightInput ? parseFloat(weightInput) : undefined,
      sleepHours: sleepInput ? parseFloat(sleepInput) : undefined,
      nausea,
      humor,
      appetite,
    });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* MÓDULO 1 — Cabeçalho */}
      <View style={[styles.card, styles.headerCard, { borderTopWidth: 4, borderTopColor: trimColor }]}>
        <Text style={styles.weekTitle}>Semana {weekNumber} da Gestação</Text>
        <View style={[styles.trimesterBadge, { backgroundColor: trimColor }]}>
          <Text style={styles.trimesterBadgeText}>{TRIMESTER_LABELS[weekData.trimester]}</Text>
        </View>
        <View style={styles.dateRow}>
          <Text style={styles.inputLabel}>Data da semana</Text>
          <TextInput
            style={styles.dateInput}
            value={dateLabelInput}
            onChangeText={setDateLabelInput}
            placeholder="Ex: 10/04/2026"
            placeholderTextColor={colors.textLight}
            onBlur={() => toggleCompletion(completed, dateLabelInput || undefined)}
          />
        </View>
        <Pressable
          style={[styles.completionBtn, completed && styles.completionBtnActive]}
          onPress={() => toggleCompletion(!completed, dateLabelInput || undefined)}
        >
          <Text style={[styles.completionText, completed && styles.completionTextActive]}>
            {completed ? '✓ Semana Concluída' : 'Marcar Semana como Concluída'}
          </Text>
        </Pressable>
      </View>

      {/* MÓDULO 2 — Indicador de Trimestre */}
      <View style={styles.card}>
        <SectionTitle title="Progresso do Trimestre" />
        <View style={styles.trimesterBarContainer}>
          {[1, 2, 3].map(t => (
            <View
              key={t}
              style={[
                styles.trimesterSegment,
                { backgroundColor: TRIMESTER_COLORS[t as 1 | 2 | 3] },
                weekData.trimester === t && styles.trimesterSegmentActive,
              ]}
            >
              <Text style={styles.trimesterSegmentText}>{t}°T</Text>
            </View>
          ))}
        </View>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: trimColor }]} />
        </View>
        <Text style={styles.progressText}>{TRIMESTER_LABELS[weekData.trimester]} — Semana {weekNumber} · {progress}% do trimestre</Text>
      </View>

      {/* MÓDULO 3 — Desenvolvimento do Bebê (3 cards swipeáveis) */}
      <View style={styles.card}>
        <SectionTitle title="Desenvolvimento do Bebê" />
        <ScrollView
          ref={babyScrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={e => {
            const cardWidth = Dimensions.get('window').width - 64;
            setBabyPage(Math.round(e.nativeEvent.contentOffset.x / cardWidth));
          }}
          scrollEventThrottle={16}
          style={styles.babySwipeScroll}
        >
          {/* Card 1 — Tamanho */}
          <View style={styles.babySwipeCard}>
            <View style={styles.babyBadge}>
              <Text style={styles.babyBadgeText}>{weekData.baby.stage === 'embrião' ? 'Embrião' : 'Feto'}</Text>
            </View>
            <View style={styles.metricsRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{weekData.baby.sizeCm}</Text>
                <Text style={styles.metricLabel}>Tamanho</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{weekData.baby.weightG}</Text>
                <Text style={styles.metricLabel}>Peso</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{weekData.baby.comparison}</Text>
                <Text style={styles.metricLabel}>Parece um(a)</Text>
              </View>
            </View>
            {weekData.baby.heartbeatBpm !== '—' && (
              <Text style={styles.heartbeat}>❤️ Batimentos: {weekData.baby.heartbeatBpm}</Text>
            )}
          </View>

          {/* Card 2 — Desenvolvimento */}
          <View style={styles.babySwipeCard}>
            <Text style={styles.babyCardLabel}>Marcos desta semana</Text>
            <View style={styles.milestoneList}>
              {weekData.baby.milestones.map((m, i) => (
                <View key={i} style={styles.milestoneBulletRow}>
                  <View style={styles.milestoneDot} />
                  <Text style={styles.milestoneItem}>{m}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Card 3 — Novidade */}
          <View style={styles.babySwipeCard}>
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>Novo esta semana</Text>
            </View>
            <Text style={styles.curiosityText}>{weekData.curiosities[0]}</Text>
          </View>
        </ScrollView>

        {/* Dots de paginação */}
        <View style={styles.dotsRow}>
          {[0, 1, 2].map(i => (
            <View key={i} style={[styles.dot, { opacity: babyPage === i ? 1 : 0.25 }]} />
          ))}
        </View>
      </View>

      {/* MÓDULO 4 — Sintomas */}
      <View style={styles.card}>
        <SectionTitle title="Sintomas da Mamãe" />
        {weekData.symptoms.map((symptom) => (
          <CheckItem
            key={symptom}
            label={symptom}
            checked={symptomChecks[symptom] ?? false}
            onToggle={() => toggleSymptom(symptom, !(symptomChecks[symptom] ?? false))}
          />
        ))}
      </View>

      {/* MÓDULO 5 — Dica do Dia + Cuidados */}
      <View style={styles.card}>
        <SectionTitle title="Cuidados da Semana" />

        {/* Dica do Dia */}
        <View style={[styles.dailyTipCard, { backgroundColor: TIP_CATEGORY_COLORS[dailyTip.category] }]}>
          <View style={styles.dailyTipHeader}>
            <Text style={styles.dailyTipIcon}>{TIP_CATEGORY_ICONS[dailyTip.category]}</Text>
            <View style={styles.dailyTipMeta}>
              <Text style={styles.dailyTipLabel}>Dica do Dia</Text>
              <Text style={styles.dailyTipCategory}>{dailyTip.category}</Text>
            </View>
          </View>
          <Text style={styles.dailyTipText}>{dailyTip.text}</Text>
          <TouchableOpacity
            style={[styles.saveTipBtn, tipSaved && styles.saveTipBtnSaved]}
            onPress={handleSaveTip}
            disabled={tipSaved}
          >
            <Text style={styles.saveTipBtnText}>{tipSaved ? '✓ Dica Salva' : 'Salvar dica'}</Text>
          </TouchableOpacity>
        </View>

        {weekData.care.map((care) => (
          <CheckItem
            key={care}
            label={care}
            checked={careChecks[care] ?? false}
            onToggle={() => toggleCare(care, !(careChecks[care] ?? false))}
          />
        ))}
      </View>

      {/* MÓDULO 6 — Nutrientes */}
      <View style={styles.card}>
        <SectionTitle title="Nutrientes Prioritários" />
        <View style={styles.nutrientGrid}>
          {weekData.nutrients.map((n) => (
            <View key={n.name} style={styles.nutrientItem}>
              <Text style={styles.nutrientName}>{n.name}</Text>
              {n.dose && <Text style={styles.nutrientDose}>{n.dose}</Text>}
              <Text style={styles.nutrientFoods}>{n.foods.join(' · ')}</Text>
            </View>
          ))}
        </View>
        <View style={styles.avoidSection}>
          <Text style={styles.avoidTitle}>Evitar durante a gestação:</Text>
          {AVOID_FOODS.map((f) => (
            <Text key={f} style={styles.avoidItem}>⚠ {f}</Text>
          ))}
        </View>
      </View>

      {/* MÓDULO 7 — Exames */}
      <View style={styles.card}>
        <SectionTitle title="Exames e Marcos" />
        {weekData.exams.length > 0 ? (
          weekData.exams.map((e) => (
            <View key={e.name} style={styles.examItem}>
              <Text style={styles.examName}>• {e.name}</Text>
              {e.notes && <Text style={styles.examNotes}>{e.notes}</Text>}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Consulte seu obstetra regularmente.</Text>
        )}
      </View>

      {/* MÓDULO 8 — Acompanhamento Pessoal */}
      <View style={styles.card}>
        <SectionTitle title="Acompanhamento Pessoal" />
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={styles.inputLabel}>Peso (kg)</Text>
            <TextInput
              style={styles.textInput}
              value={weightInput}
              onChangeText={setWeightInput}
              keyboardType="numeric"
              placeholder="Ex: 65.5"
              placeholderTextColor={colors.textLight}
            />
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.inputLabel}>Horas de sono</Text>
            <TextInput
              style={styles.textInput}
              value={sleepInput}
              onChangeText={setSleepInput}
              keyboardType="numeric"
              placeholder="Ex: 8"
              placeholderTextColor={colors.textLight}
            />
          </View>
        </View>
        <OptionPicker label="Náusea" value={nausea} options={NAUSEA_OPTIONS} onSelect={setNausea} />
        <OptionPicker label="Humor" value={humor} options={HUMOR_OPTIONS} onSelect={setHumor} />
        <OptionPicker label="Apetite" value={appetite} options={APPETITE_OPTIONS} onSelect={setAppetite} />
        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveTracking}>
          <Text style={styles.saveBtnText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      {/* MÓDULO 9 — Momento Especial */}
      <View style={styles.card}>
        <SectionTitle title="Momento Especial" />
        <TextInput
          style={styles.noteInput}
          value={noteText}
          onChangeText={setNoteText}
          placeholder="Escreva algo especial desta semana..."
          placeholderTextColor={colors.textLight}
          multiline
          numberOfLines={4}
        />
        {photoUri && (
          <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />
        )}
        <View style={styles.momentButtons}>
          <TouchableOpacity style={styles.photoBtn} onPress={handlePickPhoto}>
            <Text style={styles.photoBtnText}>{photoUri ? 'Trocar Foto' : 'Adicionar Foto'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.saveBtn, { flex: 1 }]} onPress={handleSaveMoment}>
            <Text style={styles.saveBtnText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MÓDULO 10 — Curiosidades */}
      <View style={styles.card}>
        <SectionTitle title="Curiosidades da Semana" />
        {weekData.curiosities.map((c, i) => (
          <View key={i} style={styles.curiosityItem}>
            <Text style={styles.curiosityIcon}>💡</Text>
            <Text style={styles.curiosityText}>{c}</Text>
          </View>
        ))}
        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>Dica da semana</Text>
          <Text style={styles.tipText}>{weekData.weeklyTip}</Text>
        </View>
        <Text style={styles.motivational}>{weekData.motivationalPhrase}</Text>
      </View>

      {/* Disclaimer obrigatório */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          As informações contidas neste material são educativas e complementares. Não substituem o acompanhamento médico profissional. Sempre consulte seu obstetra.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing[4], paddingBottom: spacing[12] },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing[6] },
  errorText: { ...typography.body, color: colors.textSecondary },

  // Cartão base — sombra editorial, sem bordas sólidas
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius['3xl'],
    padding: spacing[4],
    marginBottom: spacing[3],
    ...shadows.editorial,
  },

  // Cabeçalho com lavagem de cor primary_fixed
  headerCard: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
  },

  weekTitle: { ...typography.h2, color: colors.primary, textAlign: 'center' },
  trimesterBadge: {
    alignSelf: 'center',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    marginTop: spacing[1],
    marginBottom: spacing[2],
  },
  trimesterBadgeText: { ...typography.label, color: '#ffffff' },

  dateRow: { width: '100%', marginTop: spacing[3] },

  // Input sem borda — usa deslocamento tonal (surface_container_high)
  dateInput: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    marginTop: spacing[1],
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
  },

  // Botão de conclusão — ghost com outline_variant suave
  completionBtn: {
    marginTop: spacing[3],
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: borderRadius.pill,
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[2],
  },
  completionBtnActive: { backgroundColor: colors.primary },
  completionText: { ...typography.label, color: colors.textSecondary },
  completionTextActive: { color: colors.onPrimary },

  sectionTitle: { ...typography.h3, color: colors.primary, marginBottom: spacing[3] },

  trimesterBarContainer: { flexDirection: 'row', gap: spacing[1], marginBottom: spacing[2] },
  trimesterSegment: {
    flex: 1,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing[2],
    alignItems: 'center',
    opacity: 0.5,
  },
  trimesterSegmentActive: { opacity: 1 },
  trimesterSegmentText: { ...typography.caption, color: colors.text, fontWeight: '600' },

  progressBarTrack: {
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing[1],
  },
  progressBarFill: { height: '100%', borderRadius: borderRadius.full },
  progressText: { ...typography.caption, color: colors.textSecondary, textAlign: 'right' },

  // Swipe container para os 3 cards do bebê
  babySwipeScroll: { marginHorizontal: -spacing[4] },
  babySwipeCard: {
    width: Dimensions.get('window').width - 64,
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[2],
  },
  babyCardLabel: { ...typography.label, color: colors.textSecondary, marginBottom: spacing[3] },

  // Badge "Novo esta semana"
  newBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    marginBottom: spacing[3],
  },
  newBadgeText: { ...typography.label, color: colors.primary },

  // Dots de paginação
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[2],
    marginTop: spacing[3],
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },

  // Bullet visual para milestones
  milestoneBulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing[2], marginBottom: spacing[1] },
  milestoneDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 5,
    flexShrink: 0,
  },

  babyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.secondaryContainer,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    marginBottom: spacing[3],
  },
  babyBadgeText: { ...typography.label, color: colors.secondary },

  metricsRow: { flexDirection: 'row', marginBottom: spacing[3] },
  metricItem: { flex: 1, alignItems: 'center' },
  metricValue: { ...typography.body, color: colors.text, fontWeight: '600' },
  metricLabel: { ...typography.caption, color: colors.textSecondary },
  metricDivider: { width: 1, backgroundColor: colors.surfaceContainerHighest },

  heartbeat: { ...typography.bodySmall, color: colors.error, marginBottom: spacing[2] },

  milestoneList: { gap: spacing[1] },
  milestoneItem: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },

  dailyTipCard: {
    borderRadius: borderRadius.xl,
    padding: spacing[3],
    marginBottom: spacing[3],
  },
  dailyTipHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], marginBottom: spacing[2] },
  dailyTipIcon: { fontSize: 24 },
  dailyTipMeta: { flex: 1 },
  dailyTipLabel: { ...typography.label, color: colors.text, fontWeight: '700' },
  dailyTipCategory: { ...typography.caption, color: colors.textSecondary, textTransform: 'capitalize' },
  dailyTipText: { ...typography.body, color: colors.text, marginBottom: spacing[3] },
  saveTipBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.pill,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  saveTipBtnSaved: { backgroundColor: colors.primary },
  saveTipBtnText: { ...typography.label, color: colors.onPrimary },

  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    gap: spacing[3],
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.primary },
  checkmark: { color: colors.onPrimary, fontSize: 13, fontWeight: '700' },
  checkLabel: { ...typography.body, color: colors.text, flex: 1 },
  checkLabelChecked: { color: colors.textLight, textDecorationLine: 'line-through' },

  nutrientGrid: { gap: spacing[3], marginBottom: spacing[4] },
  nutrientItem: {
    backgroundColor: colors.accentLight,
    borderRadius: borderRadius.xl,
    padding: spacing[3],
  },
  nutrientName: { ...typography.label, color: colors.text, fontWeight: '700' },
  nutrientDose: { ...typography.caption, color: colors.textSecondary, marginVertical: spacing[1] },
  nutrientFoods: { ...typography.caption, color: colors.textSecondary },

  avoidSection: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.xl,
    padding: spacing[3],
    marginTop: spacing[2],
  },
  avoidTitle: { ...typography.label, color: colors.error, marginBottom: spacing[2] },
  avoidItem: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing[1] },

  examItem: { marginBottom: spacing[2] },
  examName: { ...typography.body, color: colors.text },
  examNotes: { ...typography.caption, color: colors.textSecondary, marginLeft: spacing[3] },
  emptyText: { ...typography.body, color: colors.textSecondary },

  inputRow: { flexDirection: 'row', gap: spacing[3], marginBottom: spacing[3] },
  inputHalf: { flex: 1 },
  inputLabel: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing[1] },

  // Inputs sem borda — deslocamento tonal
  textInput: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    ...typography.body,
    color: colors.text,
  },

  pickerRow: { marginBottom: spacing[3] },
  pickerLabel: { ...typography.label, color: colors.text, marginBottom: spacing[2] },
  pickerOptions: { flexDirection: 'row', gap: spacing[2] },
  optionBtn: {
    flex: 1,
    paddingVertical: spacing[2],
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
  },
  optionBtnActive: { backgroundColor: colors.primary },
  optionText: { ...typography.caption, color: colors.textSecondary },
  optionTextActive: { color: colors.onPrimary, fontWeight: '600' },

  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing[3],
    alignItems: 'center',
    marginTop: spacing[2],
  },
  saveBtnText: { ...typography.label, color: colors.onPrimary },

  // Textarea sem borda — deslocamento tonal
  noteInput: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: borderRadius.xl,
    padding: spacing[3],
    ...typography.body,
    color: colors.text,
    minHeight: 90,
    textAlignVertical: 'top',
    marginBottom: spacing[3],
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius['2xl'],
    marginBottom: spacing[3],
  },
  momentButtons: { flexDirection: 'row', gap: spacing[2] },
  photoBtn: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing[3],
    alignItems: 'center',
    marginTop: spacing[2],
  },
  photoBtnText: { ...typography.label, color: colors.primary },

  curiosityItem: {
    flexDirection: 'row',
    gap: spacing[2],
    marginBottom: spacing[2],
    alignItems: 'flex-start',
  },
  curiosityIcon: { fontSize: 16 },
  curiosityText: { ...typography.body, color: colors.text, flex: 1 },

  tipBox: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.xl,
    padding: spacing[3],
    marginTop: spacing[2],
    marginBottom: spacing[3],
  },
  tipLabel: { ...typography.label, color: colors.primary, marginBottom: spacing[1] },
  tipText: { ...typography.body, color: colors.text },
  motivational: {
    ...typography.body,
    color: colors.primary,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  disclaimer: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    marginTop: spacing[2],
  },
  disclaimerText: {
    ...typography.caption,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
});
