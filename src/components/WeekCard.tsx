import { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Image, Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, typography } from '../theme';
import { getWeek, getTrimesterProgress, AVOID_FOODS } from '../data';
import { useWeekCompletion } from '../hooks/useWeekCompletion';
import { useSymptomChecks } from '../hooks/useSymptomChecks';
import { useCareChecks } from '../hooks/useCareChecks';
import { useWeekTracking } from '../hooks/useWeekTracking';
import { useSpecialMoment } from '../hooks/useSpecialMoment';
import type { NauseaLevel, HumorLevel, AppetiteLevel } from '../types';

interface WeekCardProps {
  weekNumber: number;
}

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
      <View style={[styles.card, styles.headerCard]}>
        <Text style={styles.weekTitle}>Semana {weekNumber} da Gestação</Text>
        <Text style={styles.trimesterLabel}>{TRIMESTER_LABELS[weekData.trimester]}</Text>
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
        <Text style={styles.progressText}>{progress}% do trimestre atual</Text>
      </View>

      {/* MÓDULO 3 — Desenvolvimento do Bebê */}
      <View style={styles.card}>
        <SectionTitle title="Desenvolvimento do Bebê" />
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
            <Text style={styles.metricLabel}>Tamanho de um(a)</Text>
          </View>
        </View>
        {weekData.baby.heartbeatBpm !== '—' && (
          <Text style={styles.heartbeat}>❤️ Batimentos: {weekData.baby.heartbeatBpm}</Text>
        )}
        <View style={styles.milestoneList}>
          {weekData.baby.milestones.map((m, i) => (
            <Text key={i} style={styles.milestoneItem}>• {m}</Text>
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

      {/* MÓDULO 5 — Cuidados */}
      <View style={styles.card}>
        <SectionTitle title="Cuidados da Semana" />
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
          <TouchableOpacity style={styles.saveBtn} onPress={handleSaveMoment}>
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
  content: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  errorText: { ...typography.body, color: colors.textSecondary },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  headerCard: { alignItems: 'center', backgroundColor: colors.primaryLight },

  weekTitle: { ...typography.h2, color: colors.primary, textAlign: 'center' },
  trimesterLabel: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 4 },

  dateRow: { width: '100%', marginTop: 10 },
  dateInput: {
    borderWidth: 1, borderColor: colors.primary, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8, marginTop: 4,
    ...typography.body, color: colors.text, backgroundColor: colors.surface,
    textAlign: 'center',
  },

  completionBtn: {
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  completionBtnActive: { backgroundColor: colors.primary },
  completionText: { ...typography.label, color: colors.primary },
  completionTextActive: { color: colors.surface },

  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: 12 },

  trimesterBarContainer: { flexDirection: 'row', gap: 4, marginBottom: 8 },
  trimesterSegment: {
    flex: 1, borderRadius: 6, paddingVertical: 6, alignItems: 'center', opacity: 0.5,
  },
  trimesterSegmentActive: { opacity: 1 },
  trimesterSegmentText: { ...typography.caption, color: colors.text, fontWeight: '600' },

  progressBarTrack: {
    height: 6, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden', marginBottom: 4,
  },
  progressBarFill: { height: '100%', borderRadius: 3 },
  progressText: { ...typography.caption, color: colors.textSecondary, textAlign: 'right' },

  babyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 12,
  },
  babyBadgeText: { ...typography.label, color: colors.primary },

  metricsRow: { flexDirection: 'row', marginBottom: 12 },
  metricItem: { flex: 1, alignItems: 'center' },
  metricValue: { ...typography.body, color: colors.text, fontWeight: '600' },
  metricLabel: { ...typography.caption, color: colors.textSecondary },
  metricDivider: { width: 1, backgroundColor: colors.divider },

  heartbeat: { ...typography.bodySmall, color: colors.error, marginBottom: 8 },

  milestoneList: { gap: 4 },
  milestoneItem: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },

  checkRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, gap: 10 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 1.5, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.primary },
  checkmark: { color: colors.surface, fontSize: 13, fontWeight: '700' },
  checkLabel: { ...typography.body, color: colors.text, flex: 1 },
  checkLabelChecked: { color: colors.textSecondary, textDecorationLine: 'line-through' },

  nutrientGrid: { gap: 10, marginBottom: 16 },
  nutrientItem: {
    backgroundColor: colors.accentLight, borderRadius: 10, padding: 10,
  },
  nutrientName: { ...typography.label, color: colors.text, fontWeight: '700' },
  nutrientDose: { ...typography.caption, color: colors.textSecondary, marginVertical: 2 },
  nutrientFoods: { ...typography.caption, color: colors.textSecondary },

  avoidSection: { borderTopWidth: 1, borderTopColor: colors.divider, paddingTop: 12 },
  avoidTitle: { ...typography.label, color: colors.error, marginBottom: 6 },
  avoidItem: { ...typography.caption, color: colors.textSecondary, marginBottom: 3 },

  examItem: { marginBottom: 8 },
  examName: { ...typography.body, color: colors.text },
  examNotes: { ...typography.caption, color: colors.textSecondary, marginLeft: 12 },
  emptyText: { ...typography.body, color: colors.textSecondary },

  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  inputHalf: { flex: 1 },
  inputLabel: { ...typography.caption, color: colors.textSecondary, marginBottom: 4 },
  textInput: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8,
    ...typography.body, color: colors.text, backgroundColor: colors.background,
  },

  pickerRow: { marginBottom: 10 },
  pickerLabel: { ...typography.label, color: colors.text, marginBottom: 6 },
  pickerOptions: { flexDirection: 'row', gap: 6 },
  optionBtn: {
    flex: 1, paddingVertical: 7, borderRadius: 8,
    borderWidth: 1, borderColor: colors.border, alignItems: 'center',
  },
  optionBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  optionText: { ...typography.caption, color: colors.textSecondary },
  optionTextActive: { color: colors.surface, fontWeight: '600' },

  saveBtn: {
    backgroundColor: colors.primary, borderRadius: 10,
    paddingVertical: 10, alignItems: 'center', marginTop: 8,
  },
  saveBtnText: { ...typography.label, color: colors.surface },

  noteInput: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 10,
    padding: 12, ...typography.body, color: colors.text,
    minHeight: 90, textAlignVertical: 'top', marginBottom: 10,
  },
  photo: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },
  momentButtons: { flexDirection: 'row', gap: 8 },
  photoBtn: {
    flex: 1, borderWidth: 1.5, borderColor: colors.primary, borderRadius: 10,
    paddingVertical: 10, alignItems: 'center', marginTop: 8,
  },
  photoBtnText: { ...typography.label, color: colors.primary },

  curiosityItem: { flexDirection: 'row', gap: 8, marginBottom: 8, alignItems: 'flex-start' },
  curiosityIcon: { fontSize: 16 },
  curiosityText: { ...typography.body, color: colors.text, flex: 1 },

  tipBox: {
    backgroundColor: colors.primaryLight, borderRadius: 10,
    padding: 12, marginTop: 8, marginBottom: 12,
  },
  tipLabel: { ...typography.label, color: colors.primary, marginBottom: 4 },
  tipText: { ...typography.body, color: colors.text },
  motivational: { ...typography.body, color: colors.primary, textAlign: 'center', fontStyle: 'italic' },

  disclaimer: {
    borderTopWidth: 1, borderTopColor: colors.divider,
    paddingTop: 16, marginTop: 8,
  },
  disclaimerText: { ...typography.caption, color: colors.textLight, textAlign: 'center', lineHeight: 18 },
});
