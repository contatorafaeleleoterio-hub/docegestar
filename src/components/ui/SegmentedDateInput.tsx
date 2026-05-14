import React, { useRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

interface SegmentedDateInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  onFocus?: () => void;
  testID?: string;
}

function buildMasked(dd: string, mm: string, yyyy: string): string {
  const raw = (dd + mm + yyyy).replace(/\D/g, '').slice(0, 8);
  const d = raw.slice(0, 2);
  const m = raw.slice(2, 4);
  const y = raw.slice(4, 8);
  if (y) return `${d}/${m}/${y}`;
  if (m) return `${d}/${m}`;
  return d;
}

export function SegmentedDateInput({
  value,
  onChangeText,
  error,
  onFocus,
  testID,
}: SegmentedDateInputProps) {
  const ddRef = useRef<TextInput>(null);
  const mmRef = useRef<TextInput>(null);
  const yyyyRef = useRef<TextInput>(null);

  const raw = value.replace(/\D/g, '');
  const dd = raw.slice(0, 2);
  const mm = raw.slice(2, 4);
  const yyyy = raw.slice(4, 8);

  const borderColor = error ? colors.error : colors.border;

  function handleDdChange(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 2);
    onChangeText(buildMasked(digits, mm, yyyy));
    if (digits.length === 2) mmRef.current?.focus();
  }

  function handleMmChange(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 2);
    onChangeText(buildMasked(dd, digits, yyyy));
    if (digits.length === 2) yyyyRef.current?.focus();
  }

  function handleYyyyChange(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    onChangeText(buildMasked(dd, mm, digits));
  }

  function handleMmKey({ nativeEvent: { key } }: { nativeEvent: { key: string } }) {
    if (key === 'Backspace' && mm === '') ddRef.current?.focus();
  }

  function handleYyyyKey({ nativeEvent: { key } }: { nativeEvent: { key: string } }) {
    if (key === 'Backspace' && yyyy === '') mmRef.current?.focus();
  }

  return (
    <View style={[styles.container, { borderColor }]} testID={testID}>
      <TextInput
        ref={ddRef}
        style={styles.segment}
        value={dd}
        onChangeText={handleDdChange}
        keyboardType="numeric"
        maxLength={2}
        placeholder="DD"
        placeholderTextColor={colors.textSecondary}
        onFocus={onFocus}
        returnKeyType="next"
        onSubmitEditing={() => mmRef.current?.focus()}
      />
      <Text style={styles.sep}>/</Text>
      <TextInput
        ref={mmRef}
        style={styles.segment}
        value={mm}
        onChangeText={handleMmChange}
        keyboardType="numeric"
        maxLength={2}
        placeholder="MM"
        placeholderTextColor={colors.textSecondary}
        returnKeyType="next"
        onSubmitEditing={() => yyyyRef.current?.focus()}
        onKeyPress={handleMmKey}
      />
      <Text style={styles.sep}>/</Text>
      <TextInput
        ref={yyyyRef}
        style={[styles.segment, styles.yearSegment]}
        value={yyyy}
        onChangeText={handleYyyyChange}
        keyboardType="numeric"
        maxLength={4}
        placeholder="AAAA"
        placeholderTextColor={colors.textSecondary}
        returnKeyType="done"
        onKeyPress={handleYyyyKey}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing[4],
    backgroundColor: colors.surface,
  },
  segment: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: colors.text,
    textAlign: 'center',
  },
  yearSegment: {
    flex: 2,
  },
  sep: {
    fontSize: 16,
    color: colors.textSecondary,
    paddingHorizontal: 4,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
});
