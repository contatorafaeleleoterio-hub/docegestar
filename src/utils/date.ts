// Utilitários de data — DoceGestar
// Extraído de onboarding.tsx e config.tsx (resolve DT-003)

export function parseDateBR(value: string): Date | null {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, day, month, year] = match;
  const d = new Date(`${year}-${month}-${day}T00:00:00`);
  if (isNaN(d.getTime())) return null;
  if (d.getDate() !== parseInt(day, 10)) return null;
  return d;
}

export function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isoToBR(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export function isDateOutOfRange(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const fortyWeeksAhead = new Date(today);
  fortyWeeksAhead.setDate(fortyWeeksAhead.getDate() + 40 * 7);
  return date < sevenDaysAgo || date > fortyWeeksAhead;
}
