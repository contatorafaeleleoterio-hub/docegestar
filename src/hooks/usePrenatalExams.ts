import { useState, useEffect, useCallback } from 'react';
import { getDatabase } from '../db';
import { EXAM_SCHEDULE } from '../data/shared/exams';
import type { DatabaseAdapter } from '../db';

export type ExamStatus = 'pendente' | 'agendado' | 'realizado';
export type Trimester = 1 | 2 | 3;

export interface PrenatalExam {
  id: number;
  name: string;
  trimester: Trimester;
  weekStart: number | null;
  weekEnd: number | null;
  notes: string | null;
  status: ExamStatus;
  scheduledDate: string | null;
  resultUri: string | null;
}

interface ExamRow {
  id: number;
  name: string;
  trimester: number;
  week_start: number | null;
  week_end: number | null;
  notes: string | null;
  status: string | null;
  scheduled_date: string | null;
  result_uri: string | null;
}

export function trimesterForWeek(week: number): Trimester {
  return week <= 13 ? 1 : week <= 27 ? 2 : 3;
}

export function formatExamPeriod(start: number | null, end: number | null): string {
  if (start == null) return 'Quando indicado';
  if (end == null || end === start) return `${start} sem`;
  return `${start}–${end} sem`;
}

function rowToExam(row: ExamRow): PrenatalExam {
  return {
    id: row.id,
    name: row.name,
    trimester: (row.trimester as Trimester) ?? 1,
    weekStart: row.week_start,
    weekEnd: row.week_end,
    notes: row.notes,
    status: (row.status as ExamStatus) ?? 'pendente',
    scheduledDate: row.scheduled_date,
    resultUri: row.result_uri,
  };
}

async function seedIfEmpty(db: DatabaseAdapter): Promise<void> {
  const existing = await db.getAllAsync<{ id: number }>(
    'SELECT id FROM prenatal_exams LIMIT 1'
  );
  if (existing.length > 0) return;
  const now = new Date().toISOString();
  for (const period of EXAM_SCHEDULE) {
    const trimester = trimesterForWeek(period.weekStart);
    for (const exam of period.exams) {
      await db.runAsync(
        'INSERT INTO prenatal_exams (name, trimester, week_start, week_end, notes, status, scheduled_date, result_uri, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [exam.name, trimester, period.weekStart, period.weekEnd, exam.notes ?? null, 'pendente', null, null, now]
      );
    }
  }
}

export function usePrenatalExams() {
  const [exams, setExams] = useState<PrenatalExam[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const db = await getDatabase();
    await seedIfEmpty(db);
    const rows = await db.getAllAsync<ExamRow>(
      'SELECT id, name, trimester, week_start, week_end, notes, status, scheduled_date, result_uri ' +
      'FROM prenatal_exams ORDER BY week_start ASC, id ASC'
    );
    setExams(rows.map(rowToExam));
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    load().then(() => { if (cancelled) setLoading(true); });
    return () => { cancelled = true; };
  }, [load]);

  const updateExam = useCallback(async (
    id: number,
    fields: { status: ExamStatus; scheduledDate: string | null; notes: string | null }
  ): Promise<void> => {
    const db = await getDatabase();
    const exam = exams.find((e) => e.id === id);
    if (!exam) return;
    await db.runAsync(
      'UPDATE prenatal_exams SET name = ?, trimester = ?, week_start = ?, week_end = ?, notes = ?, status = ?, scheduled_date = ?, result_uri = ? WHERE id = ?',
      [exam.name, exam.trimester, exam.weekStart, exam.weekEnd, fields.notes, fields.status, fields.scheduledDate, exam.resultUri, id]
    );
    await load();
  }, [exams, load]);

  return { exams, loading, reload: load, updateExam };
}
