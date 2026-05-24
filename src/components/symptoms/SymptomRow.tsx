import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';
import { Intensity, INTENSITY_COLOR_KEY, INTENSITY_LABEL } from '../../hooks/useSymptomLogs';

const LEVELS: Intensity[] = ['leve', 'media', 'forte'];

interface Props {
  label: string;
  level: Intensity | null;
  disabled?: boolean;
  onSelect: (level: Intensity | null) => void;
}

export function SymptomRow({ label, level, disabled, onSelect }: Props) {
  return (
    <View style={[styles.row, disabled && styles.disabled]}>
      <Text style={styles.name} maxFontSizeMultiplier={1.3}>
        {label}
      </Text>
      <View style={styles.levels}>
        {LEVELS.map((lv) => {
          const active = level === lv;
          const activeBg = colors[INTENSITY_COLOR_KEY[lv]];
          const fg = active ? (lv === 'leve' ? colors.text : '#FFFFFF') : colors.textSecondary;
          return (
            <Pressable
              key={lv}
              disabled={disabled}
              onPress={() => onSelect(active ? null : lv)}
              accessibilityRole="button"
              accessibilityState={{ selected: active, disabled: !!disabled }}
              accessibilityLabel={`${label}, ${INTENSITY_LABEL[lv]}${active ? ', selecionado' : ''}`}
              style={({ pressed }) => [
                styles.levelBtn,
                active ? { backgroundColor: activeBg, borderColor: activeBg } : styles.levelInactive,
                pressed && !disabled && styles.pressed,
              ]}
            >
              <Text style={[styles.levelTxt, { color: fg }]} numberOfLines={1} maxFontSizeMultiplier={1.2}>
                {INTENSITY_LABEL[lv]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    gap: 10,
  },
  disabled: { opacity: 0.45 },
  name: { ...typography.body, color: colors.text, fontWeight: '600' },
  levels: { flexDirection: 'row', gap: 8 },
  levelBtn: {
    flex: 1,
    minHeight: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 4,
  },
  levelInactive: { backgroundColor: colors.surfaceContainerLow, borderColor: colors.border },
  pressed: { opacity: 0.7 },
  levelTxt: { ...typography.bodySmall, fontWeight: '700' },
});
