import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DGIcon } from '../../src/components/DGIcon';
import { FloatingLabelInput } from '../../src/components/ui/FloatingLabelInput';
import { getAllItems, getBudget, setBudget } from '../../src/db/enxovalRepo';
import { EnxovalItem } from '../../src/data/enxovalTemplate';
import { useBottomSpacing } from '../../src/hooks/useBottomSpacing';
import { colors, shadows, spacing, typography } from '../../src/theme';

function parseMoney(value: string): number | null {
  const normalized = value.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.').trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function sumBought(items: EnxovalItem[]): number {
  return items.reduce((acc, item) => {
    if (item.status !== 'comprado' || item.pricePaid == null || item.pricePaid <= 0) return acc;
    return acc + item.pricePaid;
  }, 0);
}

function sumEconomy(items: EnxovalItem[]): number {
  return items.reduce((acc, item) => {
    if (
      item.status !== 'comprado' ||
      item.pricePaid == null ||
      item.pricePaid <= 0 ||
      item.priceTarget == null ||
      item.priceTarget <= item.pricePaid
    ) {
      return acc;
    }
    return acc + (item.priceTarget - item.pricePaid);
  }, 0);
}

export default function EnxovalFinancesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottom = useBottomSpacing(false);

  const [items, setItems] = useState<EnxovalItem[]>([]);
  const [budgetInput, setBudgetInput] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const [all, budget] = await Promise.all([getAllItems(), getBudget()]);
        if (!cancelled) {
          setItems(all);
          setBudgetInput(budget == null ? '' : String(budget).replace('.', ','));
        }
      })();
      return () => {
        cancelled = true;
      };
    }, []),
  );

  const metrics = useMemo(() => {
    const boughtItems = items
      .filter((item) => item.status === 'comprado')
      .sort((a, b) => (b.pricePaid ?? 0) - (a.pricePaid ?? 0));
    const totalSpent = sumBought(items);
    const budget = parseMoney(budgetInput) ?? 0;
    const remaining = Math.max(0, budget - totalSpent);
    const progress = budget > 0 ? Math.min(100, Math.round((totalSpent / budget) * 100)) : 0;
    const economy = sumEconomy(items);

    return {
      boughtItems,
      totalSpent,
      budget,
      remaining,
      progress,
      economy,
      acquired: items.filter((item) => item.status === 'comprado' || item.isGift).length,
      pending: items.filter((item) => item.status !== 'comprado' && item.status !== 'nao_preciso').length,
    };
  }, [items, budgetInput]);

  async function handleSaveBudget() {
    const parsed = parseMoney(budgetInput);
    if (parsed == null || parsed < 0) {
      Alert.alert('Valor inválido', 'Digite um orçamento total válido.');
      return;
    }

    setSaving(true);
    try {
      await setBudget(parsed);
      Alert.alert('Salvo', 'Orçamento atualizado com sucesso.');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o orçamento agora.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()} accessibilityLabel="Voltar">
          <DGIcon name="chevronLeft" size="sm" color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>FINANÇAS DO ENXOVAL</Text>
          <Text style={styles.title}>Resumo de compras</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <DGIcon name="activity" size="sm" color={colors.primary} />
          </View>
          <View style={styles.heroTextBox}>
            <Text style={styles.heroTitle}>{formatBRL(metrics.totalSpent)} já investidos</Text>
            <Text style={styles.heroSub}>
              {metrics.pending > 0
                ? `${metrics.pending} itens ainda seguem pendentes no enxoval.`
                : 'Todos os itens ativos já foram resolvidos.'}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <FloatingLabelInput
            label="Orçamento total"
            value={budgetInput}
            onChangeText={setBudgetInput}
            keyboardType="decimal-pad"
          />
          <TouchableOpacity style={styles.saveBudgetBtn} onPress={handleSaveBudget} disabled={saving}>
            <Text style={styles.saveBudgetText}>{saving ? 'Salvando...' : 'Salvar orçamento'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard label="Já gasto" value={formatBRL(metrics.totalSpent)} tint={colors.primaryLight} accent={colors.primary} />
          <MetricCard label="Restante" value={formatBRL(metrics.remaining)} tint="#E7F0FB" accent={colors.info} />
          <MetricCard label="Economia" value={formatBRL(metrics.economy)} tint={colors.successContainer} accent={colors.success} />
          <MetricCard label="Adquiridos" value={String(metrics.acquired)} tint="#FBEFE0" accent={colors.warning} />
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <Text style={styles.progressTitle}>Uso do orçamento</Text>
            <Text style={styles.progressValue}>{metrics.progress}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${metrics.progress}%` }]} />
          </View>
          <Text style={styles.progressHint}>
            Orçamento salvo: {metrics.budget > 0 ? formatBRL(metrics.budget) : 'a definir'}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Itens comprados mais caros</Text>
          </View>

          {metrics.boughtItems.length === 0 ? (
            <Text style={styles.emptyText}>Ainda não há compras registradas com preço pago.</Text>
          ) : (
            metrics.boughtItems.slice(0, 5).map((item) => (
              <View key={item.id} style={styles.purchaseRow}>
                <View style={styles.purchaseText}>
                  <Text style={styles.purchaseName}>{item.name}</Text>
                  <Text style={styles.purchaseMeta}>
                    {item.store || 'Loja não informada'} · {item.isGift ? 'presente' : 'compra'}
                  </Text>
                </View>
                <Text style={styles.purchasePrice}>{formatBRL(item.pricePaid ?? 0)}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function MetricCard({
  label,
  value,
  tint,
  accent,
}: {
  label: string;
  value: string;
  tint: string;
  accent: string;
}) {
  return (
    <View style={[styles.metricCard, { backgroundColor: tint }]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, { color: accent }]}>{value}</Text>
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
  scroll: { paddingHorizontal: spacing[5], paddingTop: spacing[2], gap: spacing[4] },
  hero: {
    flexDirection: 'row',
    gap: spacing[3],
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextBox: { flex: 1, gap: 4 },
  heroTitle: { ...typography.h3, color: colors.text },
  heroSub: { ...typography.bodySmall, color: colors.textSecondary },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
    gap: spacing[3],
  },
  saveBudgetBtn: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBudgetText: { ...typography.label, color: colors.primary },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  metricCard: {
    width: '47%',
    minHeight: 108,
    borderRadius: 22,
    padding: spacing[4],
    justifyContent: 'space-between',
  },
  metricLabel: { ...typography.caption, color: colors.textSecondary },
  metricValue: { ...typography.h3, color: colors.text },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
    gap: spacing[3],
  },
  progressTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressTitle: { ...typography.label, color: colors.text },
  progressValue: { ...typography.h3, color: colors.primary },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.surfaceVariant,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 999, backgroundColor: colors.primary },
  progressHint: { ...typography.bodySmall, color: colors.textSecondary },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing[3] },
  sectionTitle: { ...typography.label, color: colors.text },
  emptyText: { ...typography.body, color: colors.textSecondary },
  purchaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  purchaseText: { flex: 1 },
  purchaseName: { ...typography.labelMd, color: colors.text },
  purchaseMeta: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  purchasePrice: { ...typography.label, color: colors.primary },
});
