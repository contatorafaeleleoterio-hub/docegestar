// Enxoval - repositorio de dados (CRUD sobre enxoval_items + enxoval_settings)
// SQL simples (sem WHERE de filtro): a filtragem por categoria/status e feita em
// memoria na tela, garantindo paridade entre SQLite nativo e o shim web.

import { getDatabase } from './index';
import {
  EnxovalItem,
  ENXOVAL_SEED,
  ENXOVAL_TEMPLATE_VERSION,
  resolveCategory,
  seedToItem,
  trackOfCategory,
} from '../data/enxovalTemplate';

interface ItemRow {
  id: string;
  category: string;
  track: string | null;
  name: string;
  status: string;
  priority: string;
  qty_user: number;
  price_target: number | null;
  price_paid: number | null;
  is_gift: number;
  delivered: number;
  store: string | null;
  link: string | null;
  note: string | null;
  is_custom: number;
  sort_order: number;
}

const COLUMNS =
  'id, category, name, status, priority, qty_user, price_target, price_paid, ' +
  'is_gift, delivered, store, link, note, is_custom, sort_order, track, updated_at';

function rowToItem(r: ItemRow): EnxovalItem {
  // Resolve categoria (remapeia itens legados 'maternidade') e deriva a trilha.
  const category = resolveCategory(r.id, r.category);
  return {
    id: r.id,
    category,
    track: trackOfCategory(category),
    name: r.name,
    status: r.status as EnxovalItem['status'],
    priority: r.priority as EnxovalItem['priority'],
    qty: r.qty_user ?? 1,
    priceTarget: r.price_target ?? null,
    pricePaid: r.price_paid ?? null,
    isGift: !!r.is_gift,
    delivered: !!r.delivered,
    store: r.store ?? null,
    link: r.link ?? null,
    note: r.note ?? null,
    isCustom: !!r.is_custom,
    sortOrder: r.sort_order ?? 0,
  };
}

function itemParams(item: EnxovalItem): (string | number | null)[] {
  return [
    item.id,
    item.category,
    item.name,
    item.status,
    item.priority,
    item.qty,
    item.priceTarget,
    item.pricePaid,
    item.isGift ? 1 : 0,
    item.delivered ? 1 : 0,
    item.store,
    item.link,
    item.note,
    item.isCustom ? 1 : 0,
    item.sortOrder,
    trackOfCategory(item.category),
    Date.now(),
  ];
}

export async function getAllItems(): Promise<EnxovalItem[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<ItemRow>(`SELECT ${COLUMNS} FROM enxoval_items`);
  return rows.map(rowToItem).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getItem(id: string): Promise<EnxovalItem | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<ItemRow>(
    `SELECT ${COLUMNS} FROM enxoval_items WHERE id = ?`,
    [id],
  );
  return row ? rowToItem(row) : null;
}

export async function upsertItem(item: EnxovalItem): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT OR REPLACE INTO enxoval_items (${COLUMNS}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    itemParams(item),
  );
}

export async function deleteItem(id: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM enxoval_items WHERE id = ?', [id]);
}

/**
 * Sincroniza o template com a base local de forma segura.
 * Apenas insere itens ausentes; nunca sobrescreve itens que a usuaria ja editou.
 */
export async function seedIfEmpty(): Promise<void> {
  const db = await getDatabase();
  const currentItems = await getAllItems();
  const existingIds = new Set(currentItems.map((item) => item.id));
  const currentMaxSort = currentItems.reduce((max, item) => Math.max(max, item.sortOrder), -1);

  let inserted = 0;
  for (let i = 0; i < ENXOVAL_SEED.length; i++) {
    const seed = ENXOVAL_SEED[i];
    if (existingIds.has(seed.id)) continue;
    await upsertItem(seedToItem(seed, currentMaxSort + inserted + 1));
    inserted += 1;
  }

  await db.runAsync(
    'INSERT OR REPLACE INTO enxoval_settings (key, value) VALUES (?, ?)',
    ['template_version', String(ENXOVAL_TEMPLATE_VERSION)],
  );
}

export async function getBudget(): Promise<number | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ value: string }>(
    'SELECT value FROM enxoval_settings WHERE key = ?',
    ['budget_total'],
  );
  const v = row?.value ? parseFloat(row.value) : NaN;
  return Number.isFinite(v) ? v : null;
}

export async function setBudget(value: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'INSERT OR REPLACE INTO enxoval_settings (key, value) VALUES (?, ?)',
    ['budget_total', String(value)],
  );
}
