import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '../../src/theme';
import {
  FloatingLabelInput,
  FloatingLabelSelect,
  ProgressDots,
  PrimaryButton,
} from '../../src/components/ui';
import { useOnboarding } from '../../src/context/OnboardingContext';

const RELATIONSHIP_OPTIONS = [
  { label: 'Mãe', value: 'mae' },
  { label: 'Parceiro(a)', value: 'parceiro' },
  { label: 'Outro', value: 'outro' },
] as const satisfies ReadonlyArray<{ label: string; value: 'mae' | 'parceiro' | 'outro' }>;

export default function ProfileScreen() {
  const router = useRouter();
  const { draft, setName, setRelationship } = useOnboarding();
  const canContinue = draft.relationship !== null;

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
          <ProgressDots total={3} current={1} testID="progress-dots-profile" />

          <Text style={styles.title}>Seu perfil 🌸</Text>
          <Text style={styles.subtitle}>
            Algumas informações para personalizar sua experiência.
          </Text>

          <View style={styles.form}>
            <FloatingLabelInput
              label="Seu nome"
              value={draft.name}
              onChangeText={setName}
              autoCapitalize="words"
              maxLength={60}
              testID="input-name"
            />
            <FloatingLabelSelect
              label="Você é"
              value={draft.relationship}
              options={RELATIONSHIP_OPTIONS}
              onChange={setRelationship}
              testID="select-relationship"
            />
          </View>

          <View style={styles.footer}>
            <PrimaryButton
              label="Continuar"
              onPress={() => router.push('/onboarding/due-date')}
              disabled={!canContinue}
              testID="btn-continue"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  form: {
    gap: spacing[2],
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spacing[6],
  },
});
