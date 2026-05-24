import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';
import {
  DayTotal,
  INTENSITY_COLOR_KEY,
  weekdayShort,
  dayOfMonth,
} from '../../hooks/useSymptomLogs';

interface Props {
  days: string[];
  todayISO: string;
  selected: string;
  totals: DayTotal[];
  onSelect: (date: string) => void;
}

export function WeekStrip({ days, todayISO, selected, totals, onSelect }: Props) {
  const byDate: Record<string, DayTotal> = {};
  for (const t of totals) byDate[t.date] = t;

  return (
    <View style={styles.row}>
      {days.map((date) => {
        const isFuture = date > todayISO;
        const isSelected = date === selected;
        const isToday = date === todayISO;
        const t = byDate[date];
        const dotColor = t?.maxLevel
          ? colors[INTENSITY_COLOR_KEY[t.maxLevel]]
          : t?.noSymptoms
            ? colors.successContainer
            : colors.surfaceContainerHigh;

        return (
          <Pressable
            key={date}
            disabled={isFuture}
            onPress={() => onSelect(date)}
            style={[
              styles.col,
              isSelected && styles.colSelected,
              isFuture && styles.colFuture,
            ]}
          >
            <Text style={[styles.wd, isSelected && styles.wdSelected]} maxFontSizeMultiplier={1.2}>
              {weekdayShort(date)}
            </Text>
            <Text style={[styles.num, isSelected && styles.numSelected]} maxFontSizeMultiplier={1.2}>
              {dayOfMonth(date)}
            </Text>
            <View style={[styles.dot, { backgroundColor: dotColor }]} />
            {isToday && <View style={styles.todayBar} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 2,
    borderRadius: 16,
    gap: 6,
  },
  colSelected: { backgroundColor: colors.primaryLight },
  colFuture: { opacity: 0.35 },
  wd: { ...typography.caption, color: colors.textSecondary },
  wdSelected: { color: colors.primaryDeep, fontWeight: '700' },
  num: { ...typography.label, color: colors.text },
  numSelected: { color: colors.primaryDeep, fontWeight: '800' },
  dot: { width: 12, height: 12, borderRadius: 6 },
  todayBar: {
    position: 'absolute',
    bottom: 2,
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
