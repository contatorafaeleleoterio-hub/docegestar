import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography } from '../src/theme';
import { saveProfile } from '../src/hooks/useUserProfile';
import { calculateWeekFromDueDate } from '../src/hooks/useCurrentWeek';
import {
  parseDateBR,
  formatDateInput,
  toISO,
  isDateOutOfRange,
} from '../src/utils/date';

type GestationType = 'única' | 'gêmeos' | 'trigêmeos';

const TOTAL_STEPS = 5;

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Step 0 — nome
  const [name, setName] = useState('');
  // Step 1 — DPP
  const [dateInput, setDateInput] = useState('');
  const [dateError, setDateError] = useState('');
  const [dateWarning, setDateWarning] = useState('');
  // Step 2 — tipo de gestação
  const [gestationType, setGestationType] = useState<GestationType>('única');
  // Step 3 — primeiro filho
  const [firstChild, setFirstChild] = useState<boolean | null>(null);
  // Step 4 — nome do bebê
  const [babyName, setBabyName] = useState('');
  const [loading, setLoading] = useState(false);

  const previewWeek = useMemo(() => {
    if (currentStep !== 4) return null;
    const parsed = parseDateBR(dateInput);
    if (!parsed) return null;
    return calculateWeekFromDueDate(toISO(parsed));
  }, [currentStep, dateInput]);

  function handleDateChange(text: string) {
    const formatted = formatDateInput(text);
    setDateInput(formatted);
    setDateError('');
    setDateWarning('');
    if (formatted.length === 10) {
      const parsed = parseDateBR(formatted);
      if (!parsed) {
        setDateError('Data inválida. Use o formato DD/MM/AAAA.');
      } else if (isDateOutOfRange(parsed)) {
        setDateWarning('Verifique se a data está correta.');
      }
    }
  }

  function handleNext() {
    if (currentStep === 1) {
      if (!dateInput || dateInput.length < 10) {
        setDateError('Por favor, informe sua data prevista do parto.');
        return;
      }
      const parsed = parseDateBR(dateInput);
      if (!parsed) {
        setDateError('Data inválida. Use o formato DD/MM/AAAA.');
        return;
      }
    }
    setCurrentStep(s => s + 1);
  }

  function handleBack() {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const parsed = parseDateBR(dateInput)!;
      await saveProfile(
        name.trim() || null,
        toISO(parsed),
        gestationType,
        firstChild === null ? null : (firstChild ? 1 : 0),
        babyName.trim() || null,
      );
      router.replace('/(tabs)/dashboard');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Bem-vinda ao{'\n'}DoceGestar</Text>

      {/* Indicador de progresso */}
      <View style={styles.stepIndicator}>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.stepDot,
              i === currentStep && styles.stepDotActive,
              i < currentStep && styles.stepDotDone,
            ]}
          />
        ))}
      </View>
      <Text style={styles.stepLabel}>{currentStep + 1}/{TOTAL_STEPS}</Text>

      <View style={styles.form}>
        {/* Step 0 — Nome */}
        {currentStep === 0 && (
          <View>
            <Text style={styles.stepTitle}>Como posso te chamar?</Text>
            <Text style={styles.stepSubtitle}>Opcional — você pode pular</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor={colors.textLight}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={handleNext}
            />
          </View>
        )}

        {/* Step 1 — DPP */}
        {currentStep === 1 && (
          <View>
            <Text style={styles.stepTitle}>Quando é seu parto?</Text>
            <Text style={styles.stepSubtitle}>
              Data Provável do Parto (DPP) <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, dateError ? styles.inputError : null]}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={colors.textLight}
              value={dateInput}
              onChangeText={handleDateChange}
              keyboardType="numeric"
              maxLength={10}
              returnKeyType="next"
              onSubmitEditing={handleNext}
            />
            {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
            {dateWarning && !dateError ? (
              <Text style={styles.warningText}>{dateWarning}</Text>
            ) : null}
          </View>
        )}

        {/* Step 2 — Tipo de gestação */}
        {currentStep === 2 && (
          <View>
            <Text style={styles.stepTitle}>Que tipo de gestação?</Text>
            <Text style={styles.stepSubtitle}>Selecione uma opção</Text>
            {(['única', 'gêmeos', 'trigêmeos'] as GestationType[]).map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionBtn,
                  gestationType === option && styles.optionBtnActive,
                ]}
                onPress={() => setGestationType(option)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.optionBtnText,
                  gestationType === option && styles.optionBtnTextActive,
                ]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Step 3 — Primeiro filho */}
        {currentStep === 3 && (
          <View>
            <Text style={styles.stepTitle}>É o primeiro filho?</Text>
            <Text style={styles.stepSubtitle}>Selecione uma opção</Text>
            <TouchableOpacity
              style={[styles.optionBtn, firstChild === true && styles.optionBtnActive]}
              onPress={() => setFirstChild(true)}
              activeOpacity={0.8}
            >
              <Text style={[styles.optionBtnText, firstChild === true && styles.optionBtnTextActive]}>
                Sim, é o primeiro
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionBtn, firstChild === false && styles.optionBtnActive]}
              onPress={() => setFirstChild(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.optionBtnText, firstChild === false && styles.optionBtnTextActive]}>
                Não, já tenho filho(s)
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 4 — Nome do bebê + Confirmação */}
        {currentStep === 4 && (
          <View>
            <Text style={styles.stepTitle}>Tem um nome em mente?</Text>
            <Text style={styles.stepSubtitle}>Opcional — pode deixar em branco</Text>
            <TextInput
              style={styles.input}
              placeholder="Ainda escolhendo..."
              placeholderTextColor={colors.textLight}
              value={babyName}
              onChangeText={setBabyName}
              autoCapitalize="words"
            />

            {previewWeek !== null && (
              <View style={styles.confirmCard}>
                <Text style={styles.confirmTitle}>Sua jornada foi criada!</Text>
                <Text style={styles.confirmWeek}>Semana {previewWeek} da gestação</Text>
                {babyName.trim() ? (
                  <Text style={styles.confirmBaby}>
                    Olá, {babyName.trim()}! Vamos cuidar de você juntas.
                  </Text>
                ) : (
                  <Text style={styles.confirmBaby}>
                    Vamos acompanhar cada semana dessa jornada especial.
                  </Text>
                )}
                <Text style={styles.confirmType}>
                  Gestação {gestationType}
                  {firstChild === true ? ' · Primeiro filho' : firstChild === false ? ' · Já tem filhos' : ''}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Navegação */}
        <View style={styles.navRow}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.8}>
              <Text style={styles.backBtnText}>Voltar</Text>
            </TouchableOpacity>
          )}

          {currentStep < TOTAL_STEPS - 1 ? (
            <TouchableOpacity
              style={[styles.nextBtn, currentStep === 0 && styles.nextBtnFull]}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={styles.nextBtnText}>Próximo</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.nextBtn, loading && styles.btnDisabled]}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={colors.onPrimary} />
              ) : (
                <Text style={styles.nextBtnText}>Começar</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 24,
  },
  stepIndicator: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
  },
  stepDotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
  stepDotDone: {
    backgroundColor: colors.primaryContainer,
  },
  stepLabel: {
    ...typography.caption,
    color: colors.textLight,
    marginBottom: 24,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  stepTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: 4,
  },
  stepSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  required: {
    color: colors.error,
  },
  input: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...typography.body,
    color: colors.text,
  },
  inputError: {
    backgroundColor: colors.errorContainer,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: 4,
  },
  warningText: {
    ...typography.bodySmall,
    color: colors.warning,
    marginTop: 4,
  },
  optionBtn: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionBtnActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  optionBtnText: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
  },
  optionBtnTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  confirmCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  confirmTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: 8,
  },
  confirmWeek: {
    ...typography.body,
    color: colors.text,
    marginBottom: 4,
  },
  confirmBaby: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  confirmType: {
    ...typography.caption,
    color: colors.textLight,
    marginTop: 4,
  },
  navRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  backBtn: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backBtnText: {
    ...typography.h3,
    color: colors.textSecondary,
  },
  nextBtn: {
    flex: 2,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextBtnFull: {
    flex: 1,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  nextBtnText: {
    ...typography.h3,
    color: colors.onPrimary,
  },
});
