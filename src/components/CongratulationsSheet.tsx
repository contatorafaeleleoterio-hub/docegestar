import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BottomSheet, GestationCounter } from './ui';
import { saveOnboardingProfile } from '../hooks/useUserProfile';
import { colors, spacing, typography } from '../theme';

export interface CongratulationsSheetProps {
  visible: boolean;
  estimatedDueDate: string;
  name: string;
  relationship: 'mae' | 'parceiro' | 'outro' | null;
  onClose: () => void;
  testID?: string;
}

export function CongratulationsSheet({
  visible,
  estimatedDueDate,
  name,
  relationship,
  onClose,
  testID,
}: CongratulationsSheetProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleContinue() {
    if (saving) return;
    setSaving(true);
    try {
      await saveOnboardingProfile({
        name: name || null,
        relationship,
        dueDate: estimatedDueDate,
        plan: 'free',
      });
      router.push('/onboarding/plans');
    } finally {
      setSaving(false);
    }
  }

  const greeting = name ? `Parabéns, ${name}! 🌸` : 'Parabéns! 🌸';

  return (
    <BottomSheet visible={visible} onDismiss={onClose} testID={testID}>
      <View
        style={styles.container}
        accessibilityViewIsModal
      >
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={handleContinue}
          disabled={saving}
          testID={`${testID}-close`}
        >
          <Text style={styles.closeBtnText}>×</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{greeting}</Text>
        <Text style={styles.subtitle}>
          Aqui está um resumo da sua gestação:
        </Text>

        <View style={styles.counterCard}>
          <GestationCounter
            estimatedDueDate={estimatedDueDate}
            testID={`${testID}-counter`}
          />
        </View>

        <TouchableOpacity
          style={[styles.continueBtn, saving && styles.btnDisabled]}
          onPress={handleContinue}
          disabled={saving}
          testID={`${testID}-continue`}
        >
          <Text style={styles.continueBtnText}>Ir para minha jornada →</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[2],
    paddingBottom: spacing[4],
    gap: spacing[4],
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: spacing[2],
  },
  closeBtnText: {
    fontSize: 24,
    color: colors.textSecondary,
    lineHeight: 28,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  counterCard: {
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    padding: spacing[4],
  },
  continueBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing[4],
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  continueBtnText: {
    ...typography.body,
    color: colors.onPrimary,
    fontWeight: '700',
  },
});
