import { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, typography, shadows } from '../../theme';

interface Props {
  visible: boolean;
  initialNote: string | null;
  dateLabel: string;
  onSave: (note: string) => void;
  onClose: () => void;
}

export function DayNoteSheet({ visible, initialNote, dateLabel, onSave, onClose }: Props) {
  const [text, setText] = useState(initialNote ?? '');

  useEffect(() => {
    if (visible) setText(initialNote ?? '');
  }, [visible, initialNote]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.wrap}
      >
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title} maxFontSizeMultiplier={1.3}>
            Anotação · {dateLabel}
          </Text>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Como foi o dia? (opcional)"
            placeholderTextColor={colors.inkSubtle}
            multiline
            maxFontSizeMultiplier={1.3}
          />
          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.ghost]} onPress={onClose}>
              <Text style={styles.ghostTxt} maxFontSizeMultiplier={1.2}>
                Cancelar
              </Text>
            </Pressable>
            <Pressable
              style={[styles.btn, styles.primary]}
              onPress={() => {
                onSave(text);
                onClose();
              }}
            >
              <Text style={styles.primaryTxt} maxFontSizeMultiplier={1.2}>
                Salvar
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.overlay },
  wrap: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
    ...shadows.soft,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceContainerHigh,
    marginBottom: 16,
  },
  title: { ...typography.h3, color: colors.text, marginBottom: 16 },
  input: {
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    minHeight: 96,
    textAlignVertical: 'top',
  },
  actions: { flexDirection: 'row', gap: 12, marginTop: 20 },
  btn: { flex: 1, paddingVertical: 14, borderRadius: 16, alignItems: 'center' },
  ghost: { backgroundColor: colors.surfaceContainerLow },
  ghostTxt: { ...typography.label, color: colors.textSecondary },
  primary: { backgroundColor: colors.primary },
  primaryTxt: { ...typography.label, color: colors.onPrimary },
});
