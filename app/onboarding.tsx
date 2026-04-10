import { useState } from 'react';
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

function parseDateBR(value: string): Date | null {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, day, month, year] = match;
  const d = new Date(`${year}-${month}-${day}T00:00:00`);
  if (isNaN(d.getTime())) return null;
  if (d.getDate() !== parseInt(day, 10)) return null;
  return d;
}

function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isDateOutOfRange(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const fortyWeeksAhead = new Date(today);
  fortyWeeksAhead.setDate(fortyWeeksAhead.getDate() + 40 * 7);
  return date < sevenDaysAgo || date > fortyWeeksAhead;
}

export default function OnboardingScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [dateError, setDateError] = useState('');
  const [dateWarning, setDateWarning] = useState('');
  const [loading, setLoading] = useState(false);

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

  async function handleSubmit() {
    if (!dateInput) {
      setDateError('Por favor, informe sua data prevista do parto.');
      return;
    }
    if (dateInput.length < 10) {
      setDateError('Por favor, informe sua data prevista do parto.');
      return;
    }
    const parsed = parseDateBR(dateInput);
    if (!parsed) {
      setDateError('Data inválida. Use o formato DD/MM/AAAA.');
      return;
    }

    setLoading(true);
    try {
      await saveProfile(name.trim() || null, toISO(parsed));
      router.replace('/(tabs)/dashboard');
    } catch (e) {
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
      <Text style={styles.title}>Bem-vinda ao{'\n'}DoceGestar 🌸</Text>
      <Text style={styles.subtitle}>
        Vamos configurar seu acompanhamento gestacional.
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Seu nome (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Como posso te chamar?"
          placeholderTextColor={colors.textLight}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          returnKeyType="next"
        />

        <Text style={styles.label}>
          Data Prevista do Parto (DPP) <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, dateError ? styles.inputError : null]}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={colors.textLight}
          value={dateInput}
          onChangeText={handleDateChange}
          keyboardType="numeric"
          maxLength={10}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />

        {dateError ? (
          <Text style={styles.errorText}>{dateError}</Text>
        ) : null}

        {dateWarning && !dateError ? (
          <Text style={styles.warningText}>{dateWarning}</Text>
        ) : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={colors.onPrimary} />
          ) : (
            <Text style={styles.buttonText}>Começar</Text>
          )}
        </TouchableOpacity>
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
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  label: {
    ...typography.label,
    color: colors.text,
    marginBottom: 6,
    marginTop: 16,
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
  button: {
    marginTop: 32,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    ...typography.h3,
    color: colors.onPrimary,
  },
});
