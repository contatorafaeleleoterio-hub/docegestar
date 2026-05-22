import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, shadows } from '../../src/theme';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';
import { useBottomSpacing } from '../../src/hooks/useBottomSpacing';
import { getAllItems, seedIfEmpty } from '../../src/db/enxovalRepo';
import {
  EnxovalItem,
  EnxovalCategoryId,
  ENXOVAL_CATEGORY_LABEL,
} from '../../src/data/enxovalTemplate';

type FilterId = 'todos' | 'pendentes' | 'comprados' | 'essenciais';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'pendentes', label: 'Pendentes' },
  { id: 'comprados', label: 'Comprados' },
  { id: 'essenciais', label: 'Essenciais' },
];

const CATEGORY_META: Record<EnxovalCategoryId, { icon: DGIconName; tint: string }> = {
  roupas: { icon: 'heart', tint: colors.pink400 },
  higiene: { icon: 'droplet', tint: '#5C9BC2' },
  quarto: { icon: 'home', tint: colors.lav200 },
  alimentacao: { icon: 'sun', tint: colors.warning },
  passeio: { icon: 'baby', tint: colors.success },
  farmacinha: { icon: 'pill', tint: colors.error },
  maternidade: { icon: 'star', tint: colors.secondary },
};

function formatBRL(value: number): string {
  const [int, dec] = value.toFixed(2).split('.');
  const intSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${intSep},${dec}`;
}

export default function EnxovalHubScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottom = useBottomSpacing(false);
  const [items, setItems] = useState<EnxovalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterId>('todos');

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        await seedIfEmpty();
        const all = await getAllItems();
        if (!cancelled) {
          setItems(all);
          setLoading(false);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, []),
  );

  // nao_preciso é excluído da lista/contagem do Hub
  const active = items.filter((i) => i.status !== 'nao_preciso');
  const doneCount = active.filter((i) => i.status === 'comprado').length;
  const total = active.length;
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  const visible = active.filter((i) => {
    if (filter === 'pendentes') return i.status !== 'comprado';
    if (filter === 'comprados') return i.status === 'comprado';
    if (filter === 'essenciais') return i.priority === 'essencial';
    return true;
  });

  function renderCard(item: EnxovalItem) {
    const meta = CATEGORY_META[item.category];
    const bought = item.status === 'comprado';
    const subtitle = bought && item.pricePaid != null
      ? `Comprado: ${formatBRL(item.pricePaid)}`
      : item.priceTarget != null
        ? `Alvo: ${formatBRL(item.priceTarget)}`
        : ENXOVAL_CATEGORY_LABEL[item.category];

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => router.push(`/enxoval/item/${item.id}` as never)}
        accessibilityRole="button"
        accessibilityLabel={item.name}
      >
        <View style={[styles.cardIcon, { backgroundColor: bought ? colors.primary : `${meta.tint}22` }]}>
          <DGIcon name={bought ? 'check' : meta.icon} size="sm" color={bought ? '#FFFFFF' : meta.tint} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardTitle, bought && styles.cardTitleDone]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.cardSub} numberOfLines={1}>{subtitle}</Text>
        </View>
        {bought ? (
          <View style={[styles.badge, styles.badgeBought]}>
            <Text style={[styles.badgeText, styles.badgeTextBought]}>Comprado</Text>
          </View>
        ) : item.priority === 'essencial' ? (
          <View style={[styles.badge, styles.badgeEssential]}>
            <DGIcon name="star" size="xs" color={colors.warning} />
            <Text style={[styles.badgeText, styles.badgeTextEssential]}>Essencial</Text>
          </View>
        ) : (
          <View style={[styles.badge, styles.badgePending]}>
            <Text style={[styles.badgeText, styles.badgeTextPending]}>Pendente</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()} accessibilityLabel="Voltar">
          <DGIcon name="chevronLeft" size="sm" color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enxoval</Text>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/enxoval/share' as never)} accessibilityLabel="Compartilhar">
          <DGIcon name="share" size="sm" color={colors.primary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: bottom + 88 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Toggle Bebê | Mãe */}
          <View style={styles.segment}>
            <View style={[styles.segmentBtn, styles.segmentBtnActive]}>
              <Text style={styles.segmentTextActive}>Bebê</Text>
            </View>
            <View style={styles.segmentBtn}>
              <Text style={styles.segmentTextMuted}>Mãe · em breve</Text>
            </View>
          </View>

          {/* Acesso rápido */}
          <View style={styles.quickRow}>
            <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/enxoval/guide' as never)}>
              <DGIcon name="book" size="xs" color={colors.secondary} />
              <Text style={styles.quickText}>Guia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/enxoval/finances' as never)}>
              <DGIcon name="activity" size="xs" color={colors.secondary} />
              <Text style={styles.quickText}>Finanças</Text>
            </TouchableOpacity>
          </View>

          {/* Progresso */}
          <View style={styles.progressCard}>
            <View style={styles.progressTop}>
              <View>
                <Text style={styles.progressEyebrow}>PROGRESSO GERAL</Text>
                <Text style={styles.progressNum}>
                  <Text style={styles.progressNumStrong}>{doneCount}</Text>
                  <Text style={styles.progressNumMuted}> / {total} itens</Text>
                </Text>
              </View>
              <View style={styles.progressCheck}>
                <DGIcon name="check2" size="sm" color={colors.primary} />
              </View>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${pct}%` }]} />
            </View>
            <Text style={styles.progressHint}>
              {total - doneCount === 0
                ? 'Tudo pronto para a chegada do bebê!'
                : `Faltam ${total - doneCount} itens para completar a lista.`}
            </Text>
          </View>

          {/* Filtros */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filters}
          >
            {FILTERS.map((f) => {
              const on = f.id === filter;
              return (
                <TouchableOpacity
                  key={f.id}
                  style={[styles.chip, on ? styles.chipOn : styles.chipOff]}
                  onPress={() => setFilter(f.id)}
                >
                  <Text style={on ? styles.chipTextOn : styles.chipTextOff}>{f.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Itens */}
          {visible.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Nenhum item neste filtro.</Text>
            </View>
          ) : (
            <View style={styles.list}>{visible.map(renderCard)}</View>
          )}
        </ScrollView>
      )}

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: bottom + 16 }]}
        onPress={() => router.push('/enxoval/add' as never)}
        accessibilityLabel="Adicionar item"
      >
        <DGIcon name="plus" size="md" color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[3],
    backgroundColor: colors.surface,
    ...shadows.soft,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { ...typography.h2, color: colors.primary },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { paddingHorizontal: spacing[5], paddingTop: spacing[4], gap: spacing[4] },

  segment: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceVariant,
    borderRadius: 999,
    padding: 4,
    gap: 4,
  },
  segmentBtn: { flex: 1, paddingVertical: 8, borderRadius: 999, alignItems: 'center' },
  segmentBtnActive: { backgroundColor: colors.surface, ...shadows.soft },
  segmentTextActive: { ...typography.label, color: colors.primary },
  segmentTextMuted: { ...typography.label, color: colors.textSecondary, fontSize: 13 },

  quickRow: { flexDirection: 'row', gap: spacing[3] },
  quickBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickText: { ...typography.label, color: colors.text, fontSize: 13 },

  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing[5],
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
    gap: spacing[3],
  },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  progressEyebrow: { ...typography.eyebrow, color: colors.secondary, marginBottom: 4 },
  progressNum: { flexDirection: 'row' },
  progressNumStrong: { ...typography.h1, color: colors.primary },
  progressNumMuted: { ...typography.body, color: colors.textSecondary },
  progressCheck: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: { height: 8, borderRadius: 999, backgroundColor: colors.surfaceVariant, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 999, backgroundColor: colors.primary },
  progressHint: { ...typography.bodySmall, color: colors.textSecondary },

  filters: { gap: 8, paddingVertical: 2 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 },
  chipOn: { backgroundColor: colors.primary },
  chipOff: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  chipTextOn: { ...typography.label, color: colors.onPrimary, fontSize: 13 },
  chipTextOff: { ...typography.label, color: colors.textSecondary, fontSize: 13 },

  list: { gap: spacing[3] },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
  },
  cardIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1, minWidth: 0 },
  cardTitle: { ...typography.label, color: colors.text, fontSize: 15 },
  cardTitleDone: { color: colors.textSecondary, textDecorationLine: 'line-through' },
  cardSub: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },

  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  badgePending: { backgroundColor: colors.surfaceVariant },
  badgeBought: { backgroundColor: colors.primaryLight },
  badgeEssential: { backgroundColor: colors.primaryLight },
  badgeText: { ...typography.eyebrow },
  badgeTextPending: { color: colors.textSecondary },
  badgeTextBought: { color: colors.primary },
  badgeTextEssential: { color: colors.warning },

  empty: {
    paddingVertical: spacing[8],
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
  },
  emptyText: { ...typography.body, color: colors.textSecondary },

  fab: {
    position: 'absolute',
    right: spacing[5],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.cta,
  },
});
