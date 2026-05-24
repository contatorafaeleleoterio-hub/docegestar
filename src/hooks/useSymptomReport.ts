import { useState, useEffect } from 'react';
import { getDatabase } from '../db';
import { Intensity, INTENSITY_WEIGHT, INTENSITY_LABEL } from './useSymptomLogs';

const RANK: Intensity[] = ['leve', 'media', 'forte'];

export interface SymptomSummary {
  symptom: string;
  days: number;
  maxIntensity: Intensity;
  weeks: number[];
}

export interface ReportData {
  fromWeek: number;
  toWeek: number;
  symptoms: SymptomSummary[];
  trend: 'melhorando' | 'estavel' | 'piorando' | null;
  notes: { week: number; date: string; note: string }[];
  totalDaysLogged: number;
  warningAlerts: string[]; // Avisos de saúde baseados em sinais de alerta
}

export function useSymptomReport(currentWeek: number, weeksBack = 4) {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const db = await getDatabase();
      const fromWeek = Math.max(1, currentWeek - weeksBack + 1);
      const perSymptom: Record<string, { dates: Set<string>; max: Intensity; weeks: Set<number> }> = {};
      const weekTotals: Record<number, number> = {};
      const allDates = new Set<string>();
      const notes: { week: number; date: string; note: string }[] = [];

      for (let w = fromWeek; w <= currentWeek; w++) {
        const logs = await db.getAllAsync<{ log_date: string; symptom_key: string; intensity: Intensity }>(
          'SELECT log_date, symptom_key, intensity FROM symptom_logs WHERE week = ?',
          [w]
        );
        for (const r of logs) {
          if (!r.intensity) continue;
          const s = (perSymptom[r.symptom_key] ??= { dates: new Set(), max: 'leve', weeks: new Set() });
          s.dates.add(r.log_date);
          s.weeks.add(w);
          allDates.add(r.log_date);
          if (RANK.indexOf(r.intensity) > RANK.indexOf(s.max)) s.max = r.intensity;
          weekTotals[w] = (weekTotals[w] ?? 0) + INTENSITY_WEIGHT[r.intensity];
        }
        const dayNotes = await db.getAllAsync<{ log_date: string; note: string | null; no_symptoms: number }>(
          'SELECT log_date, note, no_symptoms FROM symptom_day_notes WHERE week = ?',
          [w]
        );
        for (const n of dayNotes) if (n.note) notes.push({ week: w, date: n.log_date, note: n.note });
      }

      const symptoms: SymptomSummary[] = Object.entries(perSymptom)
        .map(([symptom, v]) => ({
          symptom,
          days: v.dates.size,
          maxIntensity: v.max,
          weeks: [...v.weeks].sort((a, b) => a - b),
        }))
        .sort((a, b) => b.days - a.days);

      let trend: ReportData['trend'] = null;
      const cur = weekTotals[currentWeek] ?? 0;
      const prev = weekTotals[currentWeek - 1];
      if (prev !== undefined && prev > 0) {
        if (cur > prev * 1.15) trend = 'piorando';
        else if (cur < prev * 0.85) trend = 'melhorando';
        else trend = 'estavel';
      }

      // Sinais de alerta (Régua Editorial 3.0)
      const warningAlerts: string[] = [];
      for (const s of symptoms) {
        if (s.maxIntensity === 'forte') {
          if (s.symptom.toLowerCase().includes('inchaço') && currentWeek >= 20) {
            warningAlerts.push('Inchaço repentino em mãos, rosto ou pés pode indicar pré-eclâmpsia. Avalie com o obstetra.');
          }
          if (s.symptom.toLowerCase().includes('dor lombar') || s.symptom.toLowerCase().includes('dor nas costas') || s.symptom.toLowerCase().includes('redondo')) {
            warningAlerts.push('Dores abdominais fortes ou cólicas persistentes requerem atenção. Não ignore.');
          }
        }
      }

      const criticalKeywords = [
        { word: 'sangue', message: 'Sangramento vaginal: procure o hospital imediatamente.' },
        { word: 'sangramento', message: 'Sangramento vaginal: procure o hospital imediatamente.' },
        { word: 'febre', message: 'Febre persistente: avalie com o obstetra ou pronto-socorro.' },
        { word: 'líquido', message: 'Perda de líquido pela vagina pode ser bolsa rota. Vá ao hospital.' },
        { word: 'contrações fortes', message: 'Contrações fortes e frequentes: avalie se está em trabalho de parto.' },
      ];

      for (const n of notes) {
        const text = n.note.toLowerCase();
        for (const ck of criticalKeywords) {
          if (text.includes(ck.word) && !warningAlerts.includes(ck.message)) {
            warningAlerts.push(ck.message);
          }
        }
      }

      if (!cancelled) {
        setData({ fromWeek, toWeek: currentWeek, symptoms, trend, notes, totalDaysLogged: allDates.size, warningAlerts });
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [currentWeek, weeksBack]);

  return { data, loading };
}

const TREND_TEXT: Record<NonNullable<ReportData['trend']>, string> = {
  piorando: 'aumentaram em relação à semana anterior',
  melhorando: 'diminuíram em relação à semana anterior',
  estavel: 'estáveis em relação à semana anterior',
};

export function buildReportText(data: ReportData): string {
  const lines: string[] = [];
  lines.push('DoceGestar — Relatório de Sintomas');
  lines.push(`Semana ${data.toWeek} · semanas ${data.fromWeek}–${data.toWeek} · ${data.totalDaysLogged} dia(s) registrado(s)`);
  lines.push('');

  if (data.symptoms.length) {
    lines.push('Sintomas registrados:');
    for (const s of data.symptoms) {
      lines.push(`• ${s.symptom} — ${s.days} dia(s) (máx: ${INTENSITY_LABEL[s.maxIntensity]})`);
    }
  } else {
    lines.push('Nenhum sintoma registrado no período.');
  }

  if (data.trend) {
    lines.push('');
    lines.push(`Tendência: sintomas ${TREND_TEXT[data.trend]}.`);
  }

  if (data.warningAlerts && data.warningAlerts.length) {
    lines.push('');
    lines.push('Sinais de Alerta Identificados:');
    for (const w of data.warningAlerts) {
      lines.push(`⚠️ ${w}`);
    }
  }

  if (data.notes.length) {
    lines.push('');
    lines.push('Anotações:');
    for (const n of data.notes) lines.push(`• Semana ${n.week}: “${n.note}”`);
  }

  lines.push('');
  lines.push('Gerado pelo app DoceGestar.');
  return lines.join('\n');
}
