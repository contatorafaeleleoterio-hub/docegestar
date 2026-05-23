import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DGIcon } from '../../src/components/DGIcon';
import { getAllItems } from '../../src/db/enxovalRepo';
import { getProfile } from '../../src/hooks/useUserProfile';
import { useBottomSpacing } from '../../src/hooks/useBottomSpacing';
import { EnxovalItem, EnxovalTrack, ENXOVAL_TRACK_LABEL } from '../../src/data/enxovalTemplate';
import { colors, shadows, spacing, typography } from '../../src/theme';

function buildShareText({
  items,
  babyName,
  trackLabel,
  onlyPending,
}: {
  items: EnxovalItem[];
  babyName?: string | null;
  trackLabel: string;
  onlyPending: boolean;
}) {
  const filtered = items.filter((item) =>
    onlyPending ? item.status !== 'comprado' && item.status !== 'nao_preciso' : item.status !== 'nao_preciso',
  );

  const title = babyName
    ? `Enxoval (${trackLabel}) do bebê ${babyName}`
    : `Enxoval DoceGestar — ${trackLabel}`;

  const lines = filtered.map((item) => {
    const parts = [`• ${item.name}`];
    if (item.qty > 1) parts.push(`x${item.qty}`);
    if (item.store) parts.push(`(${item.store})`);
    if (item.status === 'comprado') parts.push('- comprado');
    if (item.isGift) parts.push('- presente');
    return parts.join(' ');
  });

  return `${title}\n\n${onlyPending ? 'Pendências atuais:' : 'Lista atual:'}\n${lines.join('\n')}`;
}

export default function EnxovalShareScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottom = useBottomSpacing(false);
  const { track } = useLocalSearchParams<{ track?: EnxovalTrack }>();
  const activeTrack: EnxovalTrack = track === 'mae' ? 'mae' : 'bebe';
  const trackLabel = ENXOVAL_TRACK_LABEL[activeTrack];

  const [items, setItems] = useState<EnxovalItem[]>([]);
  const [babyName, setBabyName] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const [allItems, profile] = await Promise.all([getAllItems(), getProfile()]);
        if (!cancelled) {
          setItems(allItems.filter((item) => item.track === activeTrack));
          setBabyName(profile?.babyName);
          setLoading(false);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [activeTrack]),
  );

  const summary = useMemo(() => {
    const active = items.filter((item) => item.status !== 'nao_preciso');
    const pending = active.filter((item) => item.status !== 'comprado');
    const bought = active.filter((item) => item.status === 'comprado');
    return {
      active,
      pending,
      bought,
      fullText: buildShareText({ items, babyName, trackLabel, onlyPending: false }),
      pendingText: buildShareText({ items, babyName, trackLabel, onlyPending: true }),
    };
  }, [items, babyName, trackLabel]);

  async function handleShare(message: string, title: string) {
    try {
      await Share.share({ title, message });
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir o compartilhamento agora.');
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()} accessibilityLabel="Voltar">
          <DGIcon name="chevronLeft" size="sm" color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>COMPARTILHAR · {trackLabel.toUpperCase()}</Text>
          <Text style={styles.title}>Lista do enxoval</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottom + 48 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Compartilhe sem sair do app</Text>
          <Text style={styles.heroText}>
            Envie a lista por WhatsApp, e-mail ou qualquer app — ótimo para chá de bebê e listas de presente.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryMetric}>
            <Text style={styles.metricValue}>{summary.active.length}</Text>
            <Text style={styles.metricLabel}>itens ativos</Text>
          </View>
          <View style={styles.summaryMetric}>
            <Text style={styles.metricValue}>{summary.pending.length}</Text>
            <Text style={styles.metricLabel}>pendentes</Text>
          </View>
          <View style={styles.summaryMetric}>
            <Text style={styles.metricValue}>{summary.bought.length}</Text>
            <Text style={styles.metricLabel}>comprados</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Ações rápidas</Text>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => handleShare(summary.pendingText, 'Pendências do enxoval')}
          >
            <DGIcon name="share" size="xs" color={colors.onPrimary} />
            <Text style={styles.primaryBtnText}>Compartilhar pendências</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => handleShare(summary.fullText, 'Lista completa do enxoval')}
          >
            <DGIcon name="share" size="xs" color={colors.primary} />
            <Text style={styles.secondaryBtnText}>Compartilhar lista completa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Prévia do texto</Text>
          <Text style={styles.previewText}>{summary.pendingText}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
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
  summaryCard: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  summaryMetric: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    padding: spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 96,
  },
  metricValue: { ...typography.h2, color: colors.primary },
  metricLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
    gap: spacing[3],
  },
  sectionTitle: { ...typography.label, color: colors.text },
  primaryBtn: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primaryBtnText: { ...typography.label, color: colors.onPrimary },
  secondaryBtn: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  secondaryBtnText: { ...typography.label, color: colors.primary },
  previewText: { ...typography.body, color: colors.textSecondary },
});
