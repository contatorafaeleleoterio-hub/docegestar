import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../theme';

export interface FloatingLabelSelectOption<T extends string> {
  label: string;
  value: T;
}

export interface FloatingLabelSelectProps<T extends string> {
  label: string;
  value: T | null;
  options: ReadonlyArray<FloatingLabelSelectOption<T>>;
  onChange: (value: T) => void;
  error?: string;
  testID?: string;
}

export function FloatingLabelSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  error,
  testID,
}: FloatingLabelSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animation]);

  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? '';
  const borderColor = error ? colors.error : isOpen ? colors.primary : colors.border;

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
      <TouchableOpacity
        accessibilityRole="combobox"
        accessibilityLabel={label}
        accessibilityState={{ expanded: isOpen }}
        activeOpacity={0.7}
        onPress={() => setIsOpen(true)}
      >
        <View style={[styles.container, { borderColor }]}>
          <Animated.Text style={[styles.floatingLabel, labelStyle]} pointerEvents="none">
            {label}
          </Animated.Text>
          <Text style={styles.value}>{selectedLabel}</Text>
        </View>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
          <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.panelTitle}>{label}</Text>
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected: isSelected }}
                  style={[styles.option, isSelected && styles.optionSelected]}
                  onPress={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{opt.label}</Text>
                  {isSelected ? (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
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
  floatingLabel: {
    position: 'absolute',
    left: spacing[4],
    fontFamily: typography.body.fontFamily,
  },
  value: {
    ...typography.body,
    color: colors.text,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing[1],
    marginLeft: spacing[4],
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    paddingHorizontal: spacing[4],
  },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing[4],
    maxHeight: '70%',
    ...shadows.soft,
  },
  panelTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing[3],
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    borderRadius: borderRadius.xl,
  },
  optionSelected: {
    backgroundColor: colors.primaryLight,
  },
  optionText: {
    ...typography.body,
    color: colors.text,
  },
});
