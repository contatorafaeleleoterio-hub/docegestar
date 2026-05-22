import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../src/theme';
import { DGIcon, DGIconName } from '../src/components/DGIcon';
import { useBottomSpacing } from '../src/hooks/useBottomSpacing';
import {
  createEnxovalInitialState,
  EnxovalCategoryId,
  EnxovalItem,
  EnxovalPriority,
} from '../src/data/enxovalTemplate';

type Category = {
  id: EnxovalCategoryId;
  label: string;
  icon: DGIconName;
  tint: string;
};

type Priority = EnxovalPriority;
type Item = EnxovalItem;

const CATEGORIES: Category[] = [
  { id: 'roupas', label: 'Roupas', icon: 'heart', tint: colors.pink400 },
  { id: 'higiene', label: 'Higiene', icon: 'droplet', tint: '#5C9BC2' },
  { id: 'quarto', label: 'Quarto', icon: 'home', tint: colors.lav200 },
  { id: 'saida', label: 'Saída', icon: 'baby', tint: '#5BB76E' },
];

export default function NurseryScreen() {
  const router = useRouter();
  const bottom = useBottomSpacing(false);
  const [activeCat, setActiveCat] = useState<EnxovalCategoryId>('roupas');
  const [items, setItems] = useState<Record<EnxovalCategoryId, Item[]>>(
    () => createEnxovalInitialState(),
  );

  const totals = useMemo(() => {
    const cats = CATEGORIES.map((c) => {
      const list = items[c.id] || [];
      const done = list.filter((i) => i.done).length;
      return { id: c.id, done, total: list.length };
    });
    const overallDone = cats.reduce((a, c) => a + c.done, 0);
    const overallTotal = cats.reduce((a, c) => a + c.total, 0);
    const pct = overallTotal === 0 ? 0 : Math.round((overallDone / overallTotal) * 100);
    return { cats, overallDone, overallTotal, pct };
  }, [items]);

  function toggleItem(catId: EnxovalCategoryId, itemId: string) {
    setItems((prev) => {
      const list = prev[catId] || [];
      return {
        ...prev,
        [catId]: list.map((it) =>
          it.id === itemId ? { ...it, done: !it.done } : it,
        ),
      };
    });
  }

  function addItem() {
    Alert.alert(
      'Em breve!',
      'Adicionar e personalizar itens chega em uma próxima atualização.',
    );
  }

  const activeItems = items[activeCat] || [];
  const activeCatLabel = CATEGORIES.find((c) => c.id === activeCat)?.label ?? '';
  const activeStats = totals.cats.find((c) => c.id === activeCat);

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dashLen = (totals.pct / 100) * circumference;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <DGIcon name="chevronLeft" size="sm" color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerEyebrow}>Para o bebê</Text>
            <Text style={styles.headerTitle}>Enxoval</Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={addItem}
            accessibilityRole="button"
            accessibilityLabel="Adicionar item"
          >
            <DGIcon name="plus" size="md" color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={[colors.pink400, colors.primaryDeep]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.progressHero}
        >
          <View style={styles.progressCircle}>
            <Svg width={80} height={80} viewBox="0 0 80 80">
              <Circle
                cx={40}
                cy={40}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={6}
              />
              <Circle
                cx={40}
                cy={40}
                r={radius}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={6}
                strokeLinecap="round"
                strokeDasharray={`${dashLen} 9999`}
                transform="rotate(-90 40 40)"
              />
            </Svg>
            <View style={styles.progressCircleText}>
              <Text style={styles.progressPct}>{totals.pct}%</Text>
              <Text style={styles.progressFraction}>
                {totals.overallDone}/{totals.overallTotal}
              </Text>
            </View>
          </View>
          <View style={styles.progressInfo}>
            <Text style={styles.progressTitle}>
              {totals.overallTotal === 0
                ? 'Comece quando quiser'
                : totals.pct === 100
                  ? 'Tudo pronto!'
                  : 'Bom progresso!'}
            </Text>
            <Text style={styles.progressSub}>
              {totals.overallTotal === 0
                ? 'Toque + para adicionar seus itens'
                : `Faltam ${totals.overallTotal - totals.overallDone} itens`}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.catGrid}>
          {CATEGORIES.map((cat) => {
            const stat = totals.cats.find((c) => c.id === cat.id);
            const active = cat.id === activeCat;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catCard, active && styles.catCardActive]}
                onPress={() => setActiveCat(cat.id)}
                accessibilityRole="button"
                accessibilityLabel={`Categoria ${cat.label}`}
              >
                <View style={[styles.catIcon, { backgroundColor: `${cat.tint}20` }]}>
                  <DGIcon name={cat.icon} size="sm" color={cat.tint} />
                </View>
                <Text style={styles.catLabel}>{cat.label}</Text>
                <Text style={styles.catCount}>
                  {stat ? `${stat.done}/${stat.total}` : '0/0'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>
            {activeCatLabel} · {activeStats?.done ?? 0} de {activeStats?.total ?? 0}
          </Text>
        </View>

        {activeItems.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              Nenhum item nesta categoria ainda.{'\n'}
              Toque em + acima para começar.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {activeItems.map((it, idx) => (
              <TouchableOpacity
                key={it.id}
                style={[
                  styles.itemRow,
                  idx < activeItems.length - 1 && styles.itemRowBorder,
                ]}
                onPress={() => toggleItem(activeCat, it.id)}
                activeOpacity={0.7}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: it.done }}
                accessibilityLabel={it.label}
              >
                <View
                  style={[
                    styles.checkbox,
                    it.done ? styles.checkboxDone : styles.checkboxEmpty,
                  ]}
                >
                  {it.done ? <DGIcon name="check" size="xs" color="#FFFFFF" /> : null}
                </View>
                <View style={styles.itemText}>
                  <Text
                    style={[
                      styles.itemLabel,
                      it.done && styles.itemLabelDone,
                    ]}
                    numberOfLines={2}
                  >
                    {it.label}
                  </Text>
                  {it.priority ? (
                    <View
                      style={[
                        styles.priorityChip,
                        it.priority === 'essencial'
                          ? styles.priorityEssential
                          : styles.prioritySpecial,
                      ]}
                    >
                      <Text
                        style={[
                          styles.priorityText,
                          it.priority === 'essencial'
                            ? styles.priorityTextEssential
                            : styles.priorityTextSpecial,
                        ]}
                      >
                        {it.priority.toUpperCase()}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  headerText: { flex: 1 },
  headerEyebrow: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    color: colors.textSecondary,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    letterSpacing: -0.6,
    color: colors.text,
  },
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 6,
  },
  progressHero: {
    marginHorizontal: spacing[5],
    borderRadius: 26,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: spacing[4],
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 10,
  },
  progressCircle: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPct: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  progressFraction: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.4,
  },
  progressInfo: { flex: 1 },
  progressTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  progressSub: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  catGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing[5],
    gap: 8,
    marginBottom: spacing[4],
  },
  catCard: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  catCardActive: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  catIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  catLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    color: colors.text,
  },
  catCount: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[5],
    marginBottom: spacing[2],
  },
  listTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    color: colors.text,
  },
  empty: {
    marginHorizontal: spacing[5],
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[4],
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: spacing[5],
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  itemRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: colors.success },
  checkboxEmpty: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.border,
  },
  itemText: { flex: 1, gap: 4 },
  itemLabel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13,
    color: colors.text,
  },
  itemLabelDone: {
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  priorityChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: 999,
  },
  priorityEssential: { backgroundColor: colors.primaryLight },
  prioritySpecial: { backgroundColor: colors.lav50 },
  priorityText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 9,
    letterSpacing: 0.3,
  },
  priorityTextEssential: { color: colors.primary },
  priorityTextSpecial: { color: colors.lav200 },
});
