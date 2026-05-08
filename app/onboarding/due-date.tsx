import React, { useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '../../src/theme';
import { MethodCard, ProgressDots, PrimaryButton } from '../../src/components/ui';
import { useOnboarding } from '../../src/context/OnboardingContext';
import { saveOnboardingProfile } from '../../src/hooks/useUserProfile';
import { calcDPPFromLMP, calcDPPFromConception } from '../../src/utils/dateUtils';
import { CongratulationsSheet } from '../../src/components/CongratulationsSheet';

type DueDateMethod = 'due_date' | 'lmp' | 'conception';

const METHODS = [
  {
    method: 'due_date' as DueDateMethod,
    icon: 'today-outline' as const,
    title: 'Data prevista pelo médico',
    description: 'Informe a DPP (Data Provável do Parto) calculada na consulta.',
  },
  {
    method: 'lmp' as DueDateMethod,
    icon: 'calendar-outline' as const,
    title: 'Última menstruação',
    description: 'Informe o primeiro dia da sua última menstruação.',
  },
  {
    method: 'conception' as DueDateMethod,
    icon: 'heart-outline' as const,
    title: 'Data de concepção',
    description: 'Informe a data aproximada da concepção.',
  },
] as const;

function parseDDMMYYYY(input: string): string | null {
  const clean = input.replace(/\D/g, '');
  if (clean.length !== 8) return null;
  const day = parseInt(clean.slice(0, 2), 10);
  const month = parseInt(clean.slice(2, 4), 10);
  const year = parseInt(clean.slice(4, 8), 10);
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > 2100) return null;
  const iso = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const d = new Date(`${iso}T00:00:00`);
  if (isNaN(d.getTime()) || d.getDate() !== day) return null;
  return iso;
}

const MAX_PAST_MS = 280 * 86_400_000;

function validateAndComputeDPP(
  method: DueDateMethod,
  iso: string
): { dpp: string | null; error: string | null } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (method === 'due_date') {
    const dppDate = new Date(`${iso}T00:00:00`);
    if (dppDate.getTime() < today.getTime() - MAX_PAST_MS) {
      return { dpp: null, error: 'A data prevista está muito no passado.' };
    }
    return { dpp: iso, error: null };
  }

  if (method === 'lmp') {
    const lmpDate = new Date(`${iso}T00:00:00`);
    if (lmpDate > today) {
      return { dpp: null, error: 'A data da última menstruação não pode ser futura.' };
    }
    const dpp = calcDPPFromLMP(iso);
    const dppDate = new Date(`${dpp}T00:00:00`);
    if (dppDate.getTime() < today.getTime() - MAX_PAST_MS) {
      return { dpp: null, error: 'Data indica mais de 40 semanas de gestação.' };
    }
    return { dpp, error: null };
  }

  // conception
  const concDate = new Date(`${iso}T00:00:00`);
  if (concDate > today) {
    return { dpp: null, error: 'A data de concepção não pode ser futura.' };
  }
  const dpp = calcDPPFromConception(iso);
  const dppDate = new Date(`${dpp}T00:00:00`);
  if (dppDate.getTime() < today.getTime() - MAX_PAST_MS) {
    return { dpp: null, error: 'Data indica mais de 40 semanas de gestação.' };
  }
  return { dpp, error: null };
}

export default function DueDateScreen() {
  const router = useRouter();
  const { draft, setDueDateMethod, setInputDate, setEstimatedDueDate } = useOnboarding();

  const [selectedMethod, setSelectedMethod] = useState<DueDateMethod | null>(
    draft.dueDateMethod as DueDateMethod | null
  );
  const [dateInput, setDateInputValue] = useState(draft.inputDate ?? '');
  const [dateError, setDateError] = useState<string | null>(null);
  const [computedDPP, setComputedDPP] = useState<string | null>(draft.estimatedDueDate);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const revealOpacity = useRef(
    new Animated.Value(draft.dueDateMethod ? 1 : 0)
  ).current;
  const revealTranslateY = useRef(
    new Animated.Value(draft.dueDateMethod ? 0 : 16)
  ).current;

  function handleMethodSelect(method: DueDateMethod) {
    if (method === selectedMethod) return;
    setSelectedMethod(method);
    setDueDateMethod(method);
    setDateInputValue('');
    setInputDate(null);
    setEstimatedDueDate(null);
    setComputedDPP(null);
    setDateError(null);

    Animated.parallel([
      Animated.timing(revealOpacity, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(revealTranslateY, { toValue: 0, duration: 150, useNativeDriver: true }),
    ]).start();
  }

  function handleDateChange(masked: string) {
    setDateInputValue(masked);
    setInputDate(masked);
    setDateError(null);
    setComputedDPP(null);
    setEstimatedDueDate(null);

    if (!selectedMethod) return;
    const iso = parseDDMMYYYY(masked);
    if (!iso) return;

    const { dpp, error } = validateAndComputeDPP(selectedMethod, iso);
    if (error) {
      setDateError(error);
    } else if (dpp) {
      setComputedDPP(dpp);
      setEstimatedDueDate(dpp);
    }
  }

  async function handleSkip() {
    setSaving(true);
    try {
      await saveOnboardingProfile({
        name: draft.name || null,
        relationship: draft.relationship,
        dueDate: null,
        plan: 'free',
      });
      router.push('/onboarding/plans');
    } finally {
      setSaving(false);
    }
  }

  function handleConfirm() {
    if (!computedDPP) return;
    setShowModal(true);
  }

  const canConfirm = computedDPP !== null && dateError === null;
  const dateLabel =
    selectedMethod === 'due_date'
      ? 'Data Prevista do Parto (DPP)'
      : selectedMethod === 'lmp'
      ? 'Primeiro dia da última menstruação'
      : 'Data de concepção';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <ProgressDots total={3} current={2} testID="progress-dots-duedate" />

          <Text style={styles.title}>Quando é o grande dia? 🌸</Text>
          <Text style={styles.subtitle}>
            Escolha como prefere calcular sua data prevista.
          </Text>

          <View style={styles.methods}>
            {METHODS.map(({ method, icon, title, description }) => (
              <MethodCard
                key={method}
                icon={icon}
                title={title}
                description={description}
                selected={selectedMethod === method}
                onPress={() => handleMethodSelect(method)}
                testID={`method-card-${method}`}
              />
            ))}
          </View>

          {selectedMethod !== null && (
            <Animated.View
              style={[
                styles.dateContainer,
                { opacity: revealOpacity, transform: [{ translateY: revealTranslateY }] },
              ]}
            >
              <Text style={styles.dateLabel}>{dateLabel}</Text>
              <MaskInput
                style={[styles.dateInput, dateError ? styles.dateInputError : null]}
                value={dateInput}
                onChangeText={handleDateChange}
                mask={Masks.DATE_DDMMYYYY}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                testID="input-date"
              />
              {dateError ? (
                <Text style={styles.errorText} testID="date-error">
                  {dateError}
                </Text>
              ) : null}
            </Animated.View>
          )}

          <View style={styles.footer}>
            <PrimaryButton
              label="Confirmar data"
              onPress={handleConfirm}
              disabled={!canConfirm}
              testID="btn-confirm"
            />
            <TouchableOpacity
              style={styles.skipBtn}
              onPress={handleSkip}
              disabled={saving}
              testID="btn-skip"
            >
              <Text style={styles.skipText}>Definir depois</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {showModal && computedDPP && (
        <CongratulationsSheet
          visible={showModal}
          estimatedDueDate={computedDPP}
          name={draft.name}
          relationship={draft.relationship}
          onClose={() => setShowModal(false)}
          testID="congrats-sheet"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing[6],
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
    lineHeight: 22,
  },
  methods: {
    gap: 0,
  },
  dateContainer: {
    gap: spacing[2],
  },
  dateLabel: {
    ...typography.label,
    color: colors.textSecondary,
  },
  dateInput: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing[4],
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
    fontFamily: 'Manrope_400Regular',
  },
  dateInputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spacing[6],
    gap: spacing[3],
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: spacing[3],
  },
  skipText: {
    ...typography.body,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
});
