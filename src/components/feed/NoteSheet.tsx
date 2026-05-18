import React, { useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BottomSheet } from '../ui/BottomSheet';
import { useCardNote } from '../../hooks/useCardNote';
import { colors, typography, spacing } from '../../theme';

interface NoteSheetProps {
  cardId: string;
  visible: boolean;
  onDismiss: () => void;
  onNoteSaved?: () => void;
}

/**
 * Bottom-sheet de anotacao privada por card.
 * Auto-save com debounce 600ms; flush() no dismiss.
 * KeyboardAvoidingView interno para evitar que o teclado cubra o input.
 */
export function NoteSheet({ cardId, visible, onDismiss, onNoteSaved }: NoteSheetProps) {
  const { note, onChangeText, flush } = useCardNote(cardId);

  const handleDismiss = useCallback(async () => {
    await flush();
    onNoteSaved?.();
    onDismiss();
  }, [flush, onDismiss, onNoteSaved]);

  return (
    <BottomSheet visible={visible} onDismiss={handleDismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.kav}
      >
        <View style={styles.container}>
          <View style={styles.handle} />
          <Text style={styles.title}>Minha anotacao</Text>
          <TextInput
            style={styles.input}
            value={note}
            onChangeText={onChangeText}
            multiline
            placeholder="Escreva aqui sua reflexao, pergunta ou lembranca sobre esta semana..."
            placeholderTextColor={colors.inkSubtle}
            autoFocus
            maxLength={2000}
            textAlignVertical="top"
            accessibilityLabel="Campo de anotacao do card"
          />
        </View>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  kav: {
    flex: 1,
  },
  container: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
    minHeight: 260,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: spacing[4],
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing[3],
  },
  input: {
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing[4],
    minHeight: 140,
    lineHeight: 22,
  },
});
