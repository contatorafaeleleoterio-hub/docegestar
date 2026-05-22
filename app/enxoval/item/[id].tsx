import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DGIcon } from '../../../src/components/DGIcon';
import { FloatingLabelInput } from '../../../src/components/ui/FloatingLabelInput';
import { FloatingLabelSelect } from '../../../src/components/ui/FloatingLabelSelect';
import {
  ENXOVAL_CATEGORY_LABEL,
  ENXOVAL_CATEGORY_ORDER,
  EnxovalCategoryId,
  EnxovalPriority,
  EnxovalStatus,
} from '../../../src/data/enxovalTemplate';
import { deleteItem, getItem, upsertItem } from '../../../src/db/enxovalRepo';
import { useBottomSpacing } from '../../../src/hooks/useBottomSpacing';
import { colors, shadows, spacing, typography } from '../../../src/theme';

function parseMoney(value: string): number | null {
  const normalized = value.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.').trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatInput(value: number | null): string {
  return value == null ? '' : String(value).replace('.', ',');
}

const CATEGORY_OPTIONS = ENXOVAL_CATEGORY_ORDER.map((category) => ({
  value: category,
  label: ENXOVAL_CATEGORY_LABEL[category],
}));

const STATUS_OPTIONS: { value: EnxovalStatus; label: string }[] = [
  { value: 'desejado', label: 'Desejado' },
  { value: 'pesquisando', label: 'Pesquisando' },
  { value: 'comprado', label: 'Comprado' },
  { value: 'nao_preciso', label: 'Não preciso' },
];

const PRIORITY_OPTIONS: { value: EnxovalPriority; label: string }[] = [
  { value: 'essencial', label: 'Essencial' },
  { value: 'desejavel', label: 'Desejável' },
];

export default function EnxovalItemDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottom = useBottomSpacing(false);
  const { id } = useLocalSearchParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [item, setItem] = useState<Awaited<ReturnType<typeof getItem>>>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<EnxovalCategoryId | null>(null);
  const [status, setStatus] = useState<EnxovalStatus | null>(null);
  const [priority, setPriority] = useState<EnxovalPriority | null>(null);
  const [qty, setQty] = useState('1');
  const [priceTarget, setPriceTarget] = useState('');
  const [pricePaid, setPricePaid] = useState('');
  const [store, setStore] = useState('');
  const [link, setLink] = useState('');
  const [note, setNote] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [delivered, setDelivered] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        if (!id) return;
        const found = await getItem(String(id));
        if (!cancelled) {
          setItem(found);
          setLoading(false);
          if (found) {
            setName(found.name);
            setCategory(found.category);
            setStatus(found.status);
            setPriority(found.priority);
            setQty(String(found.qty));
            setPriceTarget(formatInput(found.priceTarget));
            setPricePaid(formatInput(found.pricePaid));
            setStore(found.store ?? '');
            setLink(found.link ?? '');
            setNote(found.note ?? '');
            setIsGift(found.isGift);
            setDelivered(found.delivered);
          }
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [id]),
  );

  const canSave = useMemo(() => {
    return !!item && name.trim().length > 1 && !!category && !!status && !!priority;
  }, [item, name, category, status, priority]);

  async function handleSave() {
    if (!item || !category || !status || !priority) return;

    setSaving(true);
    try {
      await upsertItem({
        ...item,
        name: name.trim(),
        category,
        status,
        priority,
        qty: Math.max(1, Number.parseInt(qty, 10) || 1),
        priceTarget: parseMoney(priceTarget),
        pricePaid: parseMoney(pricePaid),
        store: store.trim() || null,
        link: link.trim() || null,
        note: note.trim() || null,
        isGift,
        delivered,
      });
      router.back();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!item) return;
    Alert.alert('Excluir item', `Deseja remover "${item.name}" do enxoval?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteItem(item.id);
            router.replace('/enxoval' as never);
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir o item.');
          }
        },
      },
    ]);
  }

  async function handleOpenLink() {
    if (!link.trim()) {
      Alert.alert('Sem link', 'Adicione um link de loja para abrir este item.');
      return;
    }

    let url = link.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }

    try {
      await WebBrowser.openBrowserAsync(url);
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir o link agora.');
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingRoot}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.loadingRoot}>
        <Text style={styles.emptyTitle}>Item não encontrado</Text>
        <TouchableOpacity style={styles.backOnlyBtn} onPress={() => router.back()}>
          <Text style={styles.backOnlyText}>Voltar</Text>
        </TouchableOpacity>
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
          <Text style={styles.eyebrow}>DETALHE DO ITEM</Text>
          <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={handleDelete} accessibilityLabel="Excluir item">
          <DGIcon name="trash" size="sm" color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottom + 130 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <DGIcon name={status === 'comprado' ? 'check2' : 'star'} size="sm" color={colors.primary} />
          </View>
          <View style={styles.heroTextBox}>
            <Text style={styles.heroTitle}>{item.isCustom ? 'Item personalizado' : 'Item do template'}</Text>
            <Text style={styles.heroSub}>
              Atualize status, preço pago, entrega e link da loja. Tudo já persiste no SQLite.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <FloatingLabelInput label="Nome do item" value={name} onChangeText={setName} autoCapitalize="sentences" />
          <FloatingLabelSelect label="Categoria" value={category} options={CATEGORY_OPTIONS} onChange={setCategory} />
          <FloatingLabelSelect label="Status" value={status} options={STATUS_OPTIONS} onChange={setStatus} />
          <FloatingLabelSelect label="Prioridade" value={priority} options={PRIORITY_OPTIONS} onChange={setPriority} />
          <FloatingLabelInput label="Quantidade" value={qty} onChangeText={setQty} keyboardType="number-pad" />
          <FloatingLabelInput label="Preço alvo" value={priceTarget} onChangeText={setPriceTarget} keyboardType="decimal-pad" />
          <FloatingLabelInput label="Preço pago" value={pricePaid} onChangeText={setPricePaid} keyboardType="decimal-pad" />
          <FloatingLabelInput label="Loja" value={store} onChangeText={setStore} autoCapitalize="words" />
          <FloatingLabelInput label="Link da loja" value={link} onChangeText={setLink} autoCapitalize="none" />

          <View style={styles.toggleRow}>
            <ToggleChip label="Foi presente" active={isGift} onPress={() => setIsGift((value) => !value)} />
            <ToggleChip label="Já entregue" active={delivered} onPress={() => setDelivered((value) => !value)} />
          </View>

          <View style={styles.notesBlock}>
            <Text style={styles.notesLabel}>Notas</Text>
            <TextInput
              style={styles.notesInput}
              value={note}
              onChangeText={setNote}
              multiline
              placeholder="Tamanho, cor, observações de entrega ou qualquer detalhe da compra."
              placeholderTextColor={colors.inkSubtle}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.linkBtn} onPress={handleOpenLink}>
            <DGIcon name="arrowRight" size="xs" color={colors.primary} />
            <Text style={styles.linkBtnText}>Abrir link da loja</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottom + 16 }]}>
        <TouchableOpacity
          style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}
          disabled={!canSave || saving}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>{saving ? 'Salvando...' : 'Salvar alterações'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ToggleChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.toggleChip, active && styles.toggleChipOn]}
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: active }}
    >
      <View style={[styles.toggleDot, active && styles.toggleDotOn]} />
      <Text style={[styles.toggleText, active && styles.toggleTextOn]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  loadingRoot: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing[3], backgroundColor: colors.background },
  emptyTitle: { ...typography.h3, color: colors.text },
  backOnlyBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  backOnlyText: { ...typography.label, color: colors.onPrimary },
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
  heroBadge: {
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
  },
  toggleRow: { flexDirection: 'row', gap: spacing[2], marginBottom: spacing[3] },
  toggleChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  toggleChipOn: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  toggleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
  },
  toggleDotOn: { backgroundColor: colors.primary },
  toggleText: { ...typography.labelMd, color: colors.textSecondary, textAlign: 'center' },
  toggleTextOn: { color: colors.primary },
  notesBlock: { marginBottom: spacing[3] },
  notesLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing[1],
    marginBottom: spacing[2],
  },
  notesInput: {
    minHeight: 132,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing[4],
    ...typography.body,
    color: colors.text,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
  },
  linkBtnText: { ...typography.label, color: colors.primary },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    backgroundColor: colors.background,
  },
  saveBtn: {
    height: 54,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.cta,
  },
  saveBtnDisabled: {
    backgroundColor: colors.secondary,
    shadowOpacity: 0,
    elevation: 0,
  },
  saveText: { ...typography.label, color: colors.onPrimary, fontSize: 15 },
});
