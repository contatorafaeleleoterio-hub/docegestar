import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { borderRadius, colors, spacing, typography } from '../../theme';

export interface FloatingLabelInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  maxLength?: number;
  testID?: string;
}

export function FloatingLabelInput({
  label,
  value,
  onChangeText,
  error,
  keyboardType,
  autoCapitalize,
  maxLength,
  testID,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      // useNativeDriver false: interpolamos top, fontSize e color (props não-transformáveis)
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, animation]);

  const borderColor = error
    ? colors.error
    : isFocused
    ? colors.primary
    : colors.border;

  const labelStyle = {
    top: animation.interpolate({ inputRange: [0, 1], outputRange: [18, 8] }),
    fontSize: animation.interpolate({ inputRange: [0, 1], outputRange: [16, 12] }),
    color: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.textSecondary, error ? colors.error : colors.primary],
    }),
  };

  return (
    <View style={styles.wrapper} testID={testID}>
      <View style={[styles.container, { borderColor }]}>
        <Animated.Text style={[styles.label, labelStyle]} pointerEvents="none">
          {label}
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          accessibilityLabel={label}
          accessibilityState={{ disabled: false }}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing[3],
  },
  container: {
    height: 60,
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing[4],
    paddingTop: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    left: spacing[4],
    fontFamily: typography.body.fontFamily,
  },
  input: {
    ...typography.body,
    color: colors.text,
    padding: 0,
    margin: 0,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing[1],
    marginLeft: spacing[4],
  },
});
