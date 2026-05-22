import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';
import {
  ENXOVAL_CATEGORY_LABEL,
  ENXOVAL_CATEGORY_ORDER,
  ENXOVAL_SEED,
  EnxovalCategoryId,
  EnxovalItem,
} from '../../src/data/enxovalTemplate';
import { getAllItems, upsertItem } from '../../src/db/enxovalRepo';
import { useBottomSpacing } from '../../src/hooks/useBottomSpacing';
import { getProfile } from '../../src/hooks/useUserProfile';
import { colors, shadows, spacing, typography } from '../../src/theme';

const CATEGORY_META: Record<EnxovalCategoryId, { icon: DGIconName; tint: string }> = {
  roupas: { icon: 'heart', tint: colors.pink400 },
  higiene: { icon: 'droplet', tint: '#5C9BC2' },
  quarto: { icon: 'home', tint: colors.lav200 },
  alimentacao: { icon: 'sun', tint: colors.warning },
  passeio: { icon: 'baby', tint: colors.success },
  farmacinha: { icon: 'pill', tint: colors.error },
  maternidade: { icon: 'star', tint: colors.secondary },
};

function getGestationHint(dueDate?: string): string {
  if (!dueDate) {
    return 'Sem DPP definida ainda. Use este guia como referência geral e ajuste conforme sua realidade.';
  }

  const due = new Date(dueDate);
  if (Number.isNaN(due.getTime())) {
    return 'DPP inválida no perfil. O guia segue exibindo as recomendações completas.';
  }

  const now = new Date();
  const weeksUntilDue = Math.round((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 7));
  const currentWeek = Math.max(1, Math.min(40, 40 - weeksUntilDue));

  if (currentWeek <= 13) {
    return `Você está por volta da ${currentWeek}ª semana. Foque em planejar o essencial e evitar compras por impulso.`;
  }
  if (currentWeek <= 27) {
    return `Você está por volta da ${currentWeek}ª semana. Este é um ótimo momento para comparar preços e montar a base do enxoval.`;
  }
  return `Você está por volta da ${currentWeek}ª semana. Priorize pendências de maternidade, saída e itens de uso imediato.`;
}

export default function EnxovalGuideScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottom = useBottomSpacing(false);

  const [items, setItems] = useState<EnxovalItem[]>([]);
  const [expanded, setExpanded] = useState<EnxovalCategoryId | null>('roupas');
  const [loading, setLoading] = useState(true);
  const [hint, setHint] = useState('Carregando recomendações...');

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const [allItems, profile] = await Promise.all([getAllItems(), getProfile()]);
        if (!cancelled) {
          setItems(allItems);
          setHint(getGestationHint(profile?.dueDate));
          setLoading(false);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, []),
  );

  const grouped = useMemo(() => {
    return ENXOVAL_CATEGORY_ORDER.map((category) => {
      const list = ENXOVAL_SEED
        .filter((seed) => seed.category === category)
        .map((seed) => {
          const item = items.find((entry) => entry.id === seed.id);
          return {
            seed,
            item,
          };
        });

      const pending = list.filter(({ item }) => item && item.status !== 'comprado' && item.status !== 'nao_preciso').length;
      const done = list.filter(({ item }) => item?.status === 'comprado').length;
      return { category, list, pending, done };
    });
  }, [items]);

  async function handleRestore(item: EnxovalItem) {
    try {
      const next = { ...item, status: 'desejado' as const };
      await upsertItem(next);
      setItems((current) => current.map((entry) => (entry.id === item.id ? next : entry)));
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar este item agora.');
    }
  }

  async function handleSkip(item: EnxovalItem) {
    try {
      const next = { ...item, status: 'nao_preciso' as const };
      await upsertItem(next);
      setItems((current) => current.map((entry) => (entry.id === item.id ? next : entry)));
    } catch {
      Alert.alert('Erro', 'Não foi possível marcar como não preciso.');
    }
  }

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()} accessibilityLabel="Voltar">
          <DGIcon name="chevronLeft" size="sm" color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>GUIA PRÁTICO</Text>
          <Text style={styles.title}>Sugestões por categoria</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: bottom + 48 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Guia editorial do enxoval</Text>
            <Text style={styles.heroText}>{hint}</Text>
          </View>

          {grouped.map(({ category, list, pending, done }) => {
            const isOpen = expanded === category;
            const meta = CATEGORY_META[category];
            return (
              <View key={category} style={styles.accordion}>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  onPress={() => setExpanded((current) => (current === category ? null : category))}
                >
                  <View style={[styles.catIcon, { backgroundColor: `${meta.tint}22` }]}>
                    <DGIcon name={meta.icon} size="sm" color={meta.tint} />
                  </View>
                  <View style={styles.catText}>
                    <Text style={styles.catTitle}>{ENXOVAL_CATEGORY_LABEL[category]}</Text>
                    <Text style={styles.catMeta}>{pending} pendentes · {done} comprados</Text>
                  </View>
                  <DGIcon name={isOpen ? 'chevronDown' : 'chevronRight'} size="sm" color={colors.textSecondary} />
                </TouchableOpacity>

                {isOpen ? (
                  <View style={styles.accordionBody}>
                    {list.map(({ seed, item }) => {
                      const statusLabel =
                        item?.status === 'comprado'
                          ? 'Comprado'
                          : item?.status === 'nao_preciso'
                            ? 'Não preciso'
                            : 'Na lista';

                      return (
                        <View key={seed.id} style={styles.itemCard}>
                          <View style={styles.itemTop}>
                            <View style={styles.itemTextBox}>
                              <Text style={styles.itemTitle}>{seed.name}</Text>
                              <Text style={styles.itemSub}>
                                {seed.qty ?? 1} un. sugerida · {seed.priority === 'essencial' ? 'Essencial' : 'Desejável'}
                              </Text>
                            </View>
                            <View style={[
                              styles.stateBadge,
                              item?.status === 'comprado'
                                ? styles.stateBought
                                : item?.status === 'nao_preciso'
                                  ? styles.stateSkipped
                                  : styles.statePending,
                            ]}>
                              <Text style={styles.stateText}>{statusLabel}</Text>
                            </View>
                          </View>

                          <View style={styles.actionsRow}>
                            <TouchableOpacity
                              style={styles.secondaryBtn}
                              onPress={() => router.push(`/enxoval/item/${seed.id}` as never)}
                            >
                              <Text style={styles.secondaryBtnText}>Abrir item</Text>
                            </TouchableOpacity>

                            {item?.status === 'nao_preciso' ? (
                              <TouchableOpacity style={styles.primaryBtn} onPress={() => item && handleRestore(item)}>
                                <Text style={styles.primaryBtnText}>Voltar para lista</Text>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity style={styles.ghostBtn} onPress={() => item && handleSkip(item)}>
                                <Text style={styles.ghostBtnText}>Não preciso</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ) : null}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[3],
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  headerText: { flex: 1 },
  eyebrow: { ...typography.eyebrow, color: colors.secondary },
  title: { ...typography.h2, color: colors.text },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { paddingHorizontal: spacing[5], paddingTop: spacing[2], gap: spacing[4] },
  hero: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing[5],
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
    gap: spacing[2],
  },
  heroTitle: { ...typography.h3, color: colors.text },
  heroText: { ...typography.body, color: colors.textSecondary },
  accordion: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
  },
  catIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catText: { flex: 1 },
  catTitle: { ...typography.label, color: colors.text },
  catMeta: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  accordionBody: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
    gap: spacing[3],
  },
  itemCard: {
    borderRadius: 18,
    padding: spacing[4],
    backgroundColor: colors.background,
    gap: spacing[3],
  },
  itemTop: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start' },
  itemTextBox: { flex: 1 },
  itemTitle: { ...typography.label, color: colors.text, fontSize: 15 },
  itemSub: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  stateBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statePending: { backgroundColor: colors.surfaceVariant },
  stateBought: { backgroundColor: colors.primaryLight },
  stateSkipped: { backgroundColor: colors.secondaryContainer },
  stateText: { ...typography.caption, color: colors.textSecondary },
  actionsRow: { flexDirection: 'row', gap: spacing[2] },
  secondaryBtn: {
    flex: 1,
    minHeight: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: { ...typography.labelMd, color: colors.text },
  primaryBtn: {
    flex: 1,
    minHeight: 44,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { ...typography.labelMd, color: colors.onPrimary },
  ghostBtn: {
    flex: 1,
    minHeight: 44,
    borderRadius: 14,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostBtnText: { ...typography.labelMd, color: colors.textSecondary },
});
