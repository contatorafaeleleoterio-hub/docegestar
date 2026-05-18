import { useState, useEffect, useRef, useCallback } from 'react';
import { getDatabase } from '../db';

interface NoteRow {
  note: string;
}

const DEBOUNCE_MS = 600;

/**
 * Gerencia a nota de um card especifico.
 * Instanciado dentro do NoteSheet — 1 instancia por card aberto.
 * Auto-save com debounce de 600ms.
 * flush() deve ser chamado no onDismiss do BottomSheet.
 */
export function useCardNote(cardId: string) {
  const [note, setNote] = useState('');
  const pendingRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Carrega nota existente ao montar
  useEffect(() => {
    let cancelled = false;
    getDatabase().then(async (db) => {
      const row = await db.getFirstAsync<NoteRow>(
        'SELECT note FROM card_notes WHERE card_id = ?',
        [cardId],
      );
      if (!cancelled) {
        setNote(row?.note ?? '');
      }
    });
    return () => {
      cancelled = true;
    };
  }, [cardId]);

  const persist = useCallback(async (value: string) => {
    const db = await getDatabase();
    if (value.trim().length === 0) {
      await db.runAsync('DELETE FROM card_notes WHERE card_id = ?', [cardId]);
    } else {
      await db.runAsync(
        'INSERT OR REPLACE INTO card_notes (card_id, note, updated_at) VALUES (?, ?, ?)',
        [cardId, value, Date.now()],
      );
    }
  }, [cardId]);

  const onChangeText = useCallback(
    (value: string) => {
      setNote(value);
      pendingRef.current = value;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (pendingRef.current !== null) {
          persist(pendingRef.current);
          pendingRef.current = null;
        }
      }, DEBOUNCE_MS);
    },
    [persist],
  );

  /** Persiste imediatamente qualquer escrita pendente (chamar no onDismiss). */
  const flush = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (pendingRef.current !== null) {
      await persist(pendingRef.current);
      pendingRef.current = null;
    }
  }, [persist]);

  return { note, onChangeText, flush };
}
