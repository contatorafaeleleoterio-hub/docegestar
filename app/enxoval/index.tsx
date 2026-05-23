import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, shadows } from '../../src/theme';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';
import { useBottomSpacing } from '../../src/hooks/useBottomSpacing';
import { getAllItems, seedIfEmpty, upsertItem } from '../../src/db/enxovalRepo';
import {
  EnxovalItem,
  EnxovalCategoryId,
  EnxovalTrack,
  ENXOVAL_CATEGORY_LABEL,
  ENXOVAL_TRACK_LABEL,
} from '../../src/data/enxovalTemplate';

type FilterId = 'todos' | 'pendentes' | 'comprados' | 'essenciais';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'pendentes', label: 'Pendentes' },
  { id: 'comprados', label: 'Comprados' },
  { id: 'essenciais', label: 'Essenciais' },
];

// Cor cheia + ícone por categoria (paleta viva do sistema)
const CATEGORY_META: Record<EnxovalCategoryId, { icon: DGIconName; tint: string }> = {
  roupas: { icon: 'heart', tint: '#EC5C93' },
  higiene: { icon: 'droplet', tint: '#5C9BC2' },
  quarto: { icon: 'moon', tint: '#9D7BD8' },
  alimentacao: { icon: 'sun', tint: '#F0A23A' },
  passeio: { icon: 'baby', tint: '#3DB57E' },
  farmacinha: { icon: 'pill', tint: '#E15858' },
  mala_maternidade: { icon: 'star', tint: '#EC3779' },
  pos_parto: { icon: 'activity', tint: '#E0719B' },
  amamentacao_mae: { icon: 'flower', tint: '#F472A8' },
};

const TRACKS: EnxovalTrack[] = ['bebe', 'mae'];

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
  const [track, setTrack] = useState<EnxovalTrack>('bebe');
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

  // Itens da trilha ativa (Bebê ou Mãe); nao_preciso fica fora da contagem
  const active = items.filter((i) => i.track === track && i.status !== 'nao_preciso');
  const doneCount = active.filter((i) => i.status === 'comprado').length;
  const total = active.length;
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  const visible = active.filter((i) => {
    if (filter === 'pendentes') return i.status !== 'comprado';
    if (filter === 'comprados') return i.status === 'comprado';
    if (filter === 'essenciais') return i.priority === 'essencial';
    return true;
  });

  async function toggleBought(item: EnxovalItem) {
    const next: EnxovalItem = {
      ...item,
      status: item.status === 'comprado' ? 'desejado' : 'comprado',
    };
    setItems((cur) => cur.map((i) => (i.id === item.id ? next : i)));
    try {
      await upsertItem(next);
    } catch {
      setItems((cur) => cur.map((i) => (i.id === item.id ? item : i)));
    }
  }

  function renderCard(item: EnxovalItem) {
    const meta = CATEGORY_META[item.category];
    const bought = item.status === 'comprado';
    const subtitle = bought && item.pricePaid != null
      ? `Comprado · ${formatBRL(item.pricePaid)}`
      : item.priceTarget != null
        ? `Alvo · ${formatBRL(item.priceTarget)}`
        : ENXOVAL_CATEGORY_LABEL[item.category];

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.card, bought && styles.cardDone]}
        activeOpacity={0.7}
        onPress={() => router.push(`/enxoval/item/${item.id}` as never)}
        accessibilityRole="button"
        accessibilityLabel={item.name}
      >
        <View style={[styles.cardIcon, { backgroundColor: meta.tint }]}>
          <DGIcon name={meta.icon} size="sm" color="#FFFFFF" />
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardTitleRow}>
            {item.priority === 'essencial' && !bought ? (
              <DGIcon name="star" size="xs" color={colors.warning} />
            ) : null}
            <Text style={[styles.cardTitle, bought && styles.cardTitleDone]} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
          <Text style={styles.cardSub} numberOfLines={1}>{subtitle}</Text>
        </View>
        <TouchableOpacity
          style={[styles.checkBtn, bought ? styles.checkBtnOn : styles.checkBtnOff]}
          onPress={() => toggleBought(item)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: bought }}
          accessibilityLabel={bought ? 'Desmarcar comprado' : 'Marcar como comprado'}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {bought ? <DGIcon name="check" size="sm" color="#FFFFFF" /> : null}
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push(`/enxoval/share?track=${track}` as never)} accessibilityLabel="Compartilhar">
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
          {/* Toggle Bebê | Mãe (funcional) */}
          <View style={styles.segment}>
            {TRACKS.map((t) => {
              const on = t === track;
              return (
                <TouchableOpacity
                  key={t}
                  style={[styles.segmentBtn, on && styles.segmentBtnActive]}
                  onPress={() => setTrack(t)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: on }}
                >
                  <Text style={on ? styles.segmentTextActive : styles.segmentTextMuted}>
                    {ENXOVAL_TRACK_LABEL[t]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Progresso (hero com gradiente) */}
          <LinearGradient
            colors={[colors.primary, colors.primaryDeep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.progressCard}
          >
            <View style={styles.progressTop}>
              <View style={{ flex: 1 }}>
                <Text style={styles.progressEyebrow}>
                  {track === 'bebe' ? 'ENXOVAL DO BEBÊ' : 'ENXOVAL DA MÃE'}
                </Text>
                <Text style={styles.progressNum}>
                  <Text style={styles.progressNumStrong}>{doneCount}</Text>
                  <Text style={styles.progressNumMuted}> / {total} itens</Text>
                </Text>
              </View>
              <View style={styles.progressPctBubble}>
                <Text style={styles.progressPctText}>{pct}%</Text>
              </View>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${pct}%` }]} />
            </View>
            <Text style={styles.progressHint}>
              {total === 0
                ? 'Nenhum item nesta lista ainda. Toque em + para adicionar.'
                : total - doneCount === 0
                  ? 'Tudo pronto nesta lista! 💗'
                  : `Faltam ${total - doneCount} itens para completar.`}
            </Text>
          </LinearGradient>

          {/* Acesso rápido */}
          <View style={styles.quickRow}>
            <TouchableOpacity style={styles.quickBtn} onPress={() => router.push(`/enxoval/guide?track=${track}` as never)}>
              <View style={[styles.quickIcon, { backgroundColor: '#5C9BC2' }]}>
                <DGIcon name="book" size="xs" color="#FFFFFF" />
              </View>
              <Text style={styles.quickText}>Guia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/enxoval/finances' as never)}>
              <View style={[styles.quickIcon, { backgroundColor: colors.success }]}>
                <DGIcon name="activity" size="xs" color="#FFFFFF" />
              </View>
              <Text style={styles.quickText}>Finanças</Text>
            </TouchableOpacity>
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
        onPress={() => router.push(`/enxoval/add?track=${track}` as never)}
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
  segmentBtn: { flex: 1, paddingVertical: 10, borderRadius: 999, alignItems: 'center' },
  segmentBtnActive: { backgroundColor: colors.surface, ...shadows.card },
  segmentTextActive: { ...typography.label, color: colors.primary },
  segmentTextMuted: { ...typography.label, color: colors.textSecondary },

  quickRow: { flexDirection: 'row', gap: spacing[3] },
  quickBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  quickIcon: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  quickText: { ...typography.label, color: colors.text, fontSize: 14 },

  progressCard: {
    borderRadius: 24,
    padding: spacing[5],
    gap: spacing[3],
    ...shadows.cta,
  },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressEyebrow: { ...typography.eyebrow, color: 'rgba(255,255,255,0.85)', marginBottom: 4 },
  progressNum: { flexDirection: 'row', alignItems: 'baseline' },
  progressNumStrong: { ...typography.h1, color: '#FFFFFF' },
  progressNumMuted: { ...typography.body, color: 'rgba(255,255,255,0.85)' },
  progressPctBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPctText: { ...typography.label, color: '#FFFFFF', fontSize: 16 },
  progressTrack: { height: 10, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.28)', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 999, backgroundColor: '#FFFFFF' },
  progressHint: { ...typography.bodySmall, color: 'rgba(255,255,255,0.92)' },

  filters: { gap: 8, paddingVertical: 2 },
  chip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 999 },
  chipOn: { backgroundColor: colors.primary, ...shadows.soft },
  chipOff: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  chipTextOn: { ...typography.label, color: colors.onPrimary, fontSize: 13 },
  chipTextOff: { ...typography.label, color: colors.textSecondary, fontSize: 13 },

  list: { gap: spacing[3] },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing[3],
    ...shadows.card,
  },
  cardDone: { backgroundColor: colors.surfaceVariant, ...shadows.soft },
  cardIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1, minWidth: 0 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  cardTitle: { ...typography.label, color: colors.text, fontSize: 15, flexShrink: 1 },
  cardTitleDone: { color: colors.textSecondary, textDecorationLine: 'line-through' },
  cardSub: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },

  checkBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBtnOff: { borderWidth: 2, borderColor: colors.border, backgroundColor: colors.surface },
  checkBtnOn: { backgroundColor: colors.success },

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
