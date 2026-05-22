import React, { useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DGIcon } from '../../src/components/DGIcon';
import { FloatingLabelInput } from '../../src/components/ui/FloatingLabelInput';
import { FloatingLabelSelect } from '../../src/components/ui/FloatingLabelSelect';
import {
  ENXOVAL_CATEGORY_LABEL,
  ENXOVAL_CATEGORY_ORDER,
  EnxovalCategoryId,
  EnxovalPriority,
  EnxovalItem,
} from '../../src/data/enxovalTemplate';
import { getAllItems, upsertItem } from '../../src/db/enxovalRepo';
import { colors, shadows, spacing, typography } from '../../src/theme';
import { useBottomSpacing } from '../../src/hooks/useBottomSpacing';

function parseMoney(value: string): number | null {
  const normalized = value.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.').trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

const CATEGORY_OPTIONS = ENXOVAL_CATEGORY_ORDER.map((category) => ({
  value: category,
  label: ENXOVAL_CATEGORY_LABEL[category],
}));

const PRIORITY_OPTIONS: { value: EnxovalPriority; label: string }[] = [
  { value: 'essencial', label: 'Essencial' },
  { value: 'desejavel', label: 'Desejável' },
];

export default function EnxovalAddScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottom = useBottomSpacing(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<EnxovalCategoryId | null>('roupas');
  const [priority, setPriority] = useState<EnxovalPriority | null>('desejavel');
  const [qty, setQty] = useState('1');
  const [priceTarget, setPriceTarget] = useState('');
  const [store, setStore] = useState('');
  const [link, setLink] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const canSave = useMemo(() => {
    return name.trim().length > 1 && !!category && !!priority;
  }, [name, category, priority]);

  async function handleSave() {
    if (!canSave || !category || !priority) {
      Alert.alert('Campos obrigatórios', 'Preencha ao menos nome, categoria e prioridade.');
      return;
    }

    setSaving(true);
    try {
      const items = await getAllItems();
      const nextSortOrder = items.reduce((max, item) => Math.max(max, item.sortOrder), -1) + 1;
      const parsedQty = Math.max(1, Number.parseInt(qty, 10) || 1);

      const item: EnxovalItem = {
        id: `custom-${Date.now()}`,
        name: name.trim(),
        category,
        status: 'desejado',
        priority,
        qty: parsedQty,
        priceTarget: parseMoney(priceTarget),
        pricePaid: null,
        isGift: false,
        delivered: false,
        store: store.trim() || null,
        link: link.trim() || null,
        note: note.trim() || null,
        isCustom: true,
        sortOrder: nextSortOrder,
      };

      await upsertItem(item);
      router.replace(`/enxoval/item/${item.id}` as never);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o item agora.');
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
          <Text style={styles.eyebrow}>SESSÃO E-1.2</Text>
          <Text style={styles.title}>Adicionar item</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Monte o enxoval do seu jeito</Text>
          <Text style={styles.heroText}>
            Crie itens personalizados com preço-alvo, loja e observações. Os atalhos Plus
            seguem visíveis como gancho, mas o fluxo manual já está funcional.
          </Text>
        </View>

        <View style={styles.card}>
          <FloatingLabelInput
            label="Nome do item"
            value={name}
            onChangeText={setName}
            autoCapitalize="sentences"
          />
          <FloatingLabelSelect
            label="Categoria"
            value={category}
            options={CATEGORY_OPTIONS}
            onChange={setCategory}
          />
          <FloatingLabelSelect
            label="Prioridade"
            value={priority}
            options={PRIORITY_OPTIONS}
            onChange={setPriority}
          />
          <FloatingLabelInput
            label="Quantidade desejada"
            value={qty}
            onChangeText={setQty}
            keyboardType="number-pad"
          />
          <FloatingLabelInput
            label="Preço alvo (opcional)"
            value={priceTarget}
            onChangeText={setPriceTarget}
            keyboardType="decimal-pad"
          />
          <FloatingLabelInput
            label="Loja (opcional)"
            value={store}
            onChangeText={setStore}
            autoCapitalize="words"
          />
          <FloatingLabelInput
            label="Link da loja (opcional)"
            value={link}
            onChangeText={setLink}
            autoCapitalize="none"
          />

          <View style={styles.notesBlock}>
            <Text style={styles.notesLabel}>Observações</Text>
            <TextInput
              style={styles.notesInput}
              value={note}
              onChangeText={setNote}
              multiline
              placeholder="Anote cor, tamanho, preferência de marca ou qualquer detalhe importante."
              placeholderTextColor={colors.inkSubtle}
              textAlignVertical="top"
            />
          </View>
          <View style={styles.quickActions}>
            <Text style={styles.quickTitle}>Atalhos Plus</Text>
            <View style={styles.quickGrid}>
              {['Buscar por link', 'Escanear print', 'Comparar preços'].map((label) => (
                <View key={label} style={styles.quickPill}>
                  <DGIcon name="sparkles" size="xs" color={colors.secondary} />
                  <Text style={styles.quickPillText}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottom + 16 }]}>
        <TouchableOpacity
          style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={!canSave || saving}
        >
          <Text style={styles.saveText}>{saving ? 'Salvando...' : 'Salvar item'}</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.primaryLight,
    borderRadius: 24,
    padding: spacing[5],
    gap: spacing[2],
  },
  heroTitle: { ...typography.h3, color: colors.primary },
  heroText: { ...typography.body, color: colors.textSecondary },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
  },
  notesBlock: { marginTop: spacing[1], marginBottom: spacing[3] },
  notesLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing[1],
    marginBottom: spacing[2],
  },
  notesInput: {
    minHeight: 112,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing[4],
    ...typography.body,
    color: colors.text,
  },
  quickActions: { gap: spacing[2] },
  quickTitle: { ...typography.label, color: colors.text },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  quickPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.surfaceVariant,
  },
  quickPillText: { ...typography.caption, color: colors.onSecondary },
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
