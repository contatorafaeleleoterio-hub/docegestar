import { useState, useEffect, useCallback } from 'react';
import { getDatabase } from '../db';

interface CardMetaState {
  saved: Set<string>;
  noted: Set<string>;
}

interface BookmarkRow {
  card_id: string;
}

interface NoteRow {
  card_id: string;
}

/**
 * Carrega 1x o conjunto de card_ids salvos e com nota.
 * Deve ser instanciado 1x em explorar.tsx e passado por props aos cards.
 * Expoe isSaved/hasNote O(1) via Set.
 */
export function useCardMeta() {
  const [state, setState] = useState<CardMetaState>({
    saved: new Set<string>(),
    noted: new Set<string>(),
  });

  const load = useCallback(async () => {
    const db = await getDatabase();
    const bookmarks = await db.getAllAsync<BookmarkRow>('SELECT card_id FROM bookmarks');
    const notes = await db.getAllAsync<NoteRow>('SELECT card_id FROM card_notes');
    setState({
      saved: new Set(bookmarks.map((r) => r.card_id)),
      noted: new Set(notes.map((r) => r.card_id)),
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const isSaved = useCallback(
    (cardId: string): boolean => state.saved.has(cardId),
    [state.saved],
  );

  const hasNote = useCallback(
    (cardId: string): boolean => state.noted.has(cardId),
    [state.noted],
  );

  const toggleSave = useCallback(
    async (cardId: string) => {
      const currentlySaved = state.saved.has(cardId);
      // Update otimista
      setState((prev) => {
        const next = new Set(prev.saved);
        if (currentlySaved) {
          next.delete(cardId);
        } else {
          next.add(cardId);
        }
        return { ...prev, saved: next };
      });
      // Persistir no banco
      const db = await getDatabase();
      if (currentlySaved) {
        await db.runAsync('DELETE FROM bookmarks WHERE card_id = ?', [cardId]);
      } else {
        await db.runAsync(
          'INSERT OR IGNORE INTO bookmarks (card_id, created_at) VALUES (?, ?)',
          [cardId, Date.now()],
        );
      }
    },
    [state.saved],
  );

  const refreshNotes = useCallback(async () => {
    const db = await getDatabase();
    const notes = await db.getAllAsync<NoteRow>('SELECT card_id FROM card_notes');
    setState((prev) => ({ ...prev, noted: new Set(notes.map((r) => r.card_id)) }));
  }, []);

  return { isSaved, hasNote, toggleSave, refreshNotes };
}
