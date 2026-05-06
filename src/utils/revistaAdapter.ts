// DoceGestar — Adaptador de Feed
// Transforma WeekContent em array de RevistaCard para exibição no feed semanal

import type { WeekContent, RevistaCard } from '../types';

// Mapa de perguntas por trimestre (Psicologia)
const PSYCHOLOGY_QUESTIONS = {
  1: 'Como você está se sentindo com essa gravidez?',
  2: 'Que sonho você tem para o bebê?',
  3: 'O que mais a emociona nessa reta final?',
} as const;

/**
 * Constrói o feed de cards da revista para uma semana
 * Retorna array de RevistaCard na ordem de apresentação
 */
export function buildRevistaFeed(week: WeekContent): RevistaCard[] {
  const cards: RevistaCard[] = [];
  const weekNum = week.weekNumber;

  // ─────────────────────────────────────────
  // 1. HERO — Abertura (celebração)
  // ─────────────────────────────────────────
  cards.push({
    id: `${weekNum}-abertura`,
    layout: 'hero',
    chapter: 'Abertura',
    title: `Bem-vinda à semana ${weekNum}!`,
    subtitle: week.motivationalPhrase,
    emoji: '🌸',
  });

  // ─────────────────────────────────────────
  // 2. STAT — Bebê (tamanho)
  // ─────────────────────────────────────────
  cards.push({
    id: `${weekNum}-baby-size`,
    layout: 'stat',
    chapter: 'Bebê',
    title: 'Tamanho do bebê',
    statValue: week.baby.sizeCm,
    statLabel: `Comparação: ${week.baby.comparison}`,
    emoji: '👶',
  });

  // ─────────────────────────────────────────
  // 3. STAT — Bebê (batimentos cardíacos)
  // ─────────────────────────────────────────
  cards.push({
    id: `${weekNum}-baby-heartbeat`,
    layout: 'stat',
    chapter: 'Bebê',
    title: 'Batimentos do coração',
    statValue: week.baby.heartbeatBpm,
    statLabel: 'batidas por minuto',
    emoji: '❤️',
  });

  // ─────────────────────────────────────────
  // 4. LISTA — Bebê (marcos do desenvolvimento)
  // ─────────────────────────────────────────
  cards.push({
    id: `${weekNum}-baby-milestones`,
    layout: 'lista',
    chapter: 'Bebê',
    title: 'Marcos do desenvolvimento',
    items: week.baby.milestones.slice(0, 6),
  });

  // ─────────────────────────────────────────
  // 5. LISTA — Você (sintomas da semana)
  // ─────────────────────────────────────────
  cards.push({
    id: `${weekNum}-você-sintomas`,
    layout: 'lista',
    chapter: 'Você',
    title: 'Sintomas comuns desta semana',
    items: week.symptoms.slice(0, 5),
  });

  // ─────────────────────────────────────────
  // 6. LISTA — Nutrição (top 3 nutrientes)
  // ─────────────────────────────────────────
  const topNutrients = week.nutrients.slice(0, 3).map(n => {
    const food = n.foods[0] || 'alimentos variados';
    return `${n.name} — encontrado em: ${food}`;
  });

  cards.push({
    id: `${weekNum}-nutrição`,
    layout: 'lista',
    chapter: 'Nutrição',
    title: 'Nutrientes prioritários',
    items: topNutrients,
  });

  // ─────────────────────────────────────────
  // 7. LISTA — Sinais de Alerta (se existir)
  // ─────────────────────────────────────────
  if (week.warningSignals && week.warningSignals.length > 0) {
    cards.push({
      id: `${weekNum}-sinais-alerta`,
      layout: 'lista',
      chapter: 'Sinais de Alerta',
      title: 'Quando procurar ajuda médica',
      items: week.warningSignals.map(w => w.description),
    });
  }

  // ─────────────────────────────────────────
  // 8. CHECKLIST — Ação prática (se existir)
  // ─────────────────────────────────────────
  if (week.weeklyChecklist && week.weeklyChecklist.length > 0) {
    cards.push({
      id: `${weekNum}-ação`,
      layout: 'checklist',
      chapter: 'Ação Prática',
      title: 'Tarefas da semana',
      items: week.weeklyChecklist,
    });
  }

  // ─────────────────────────────────────────
  // 9. PERGUNTA — Psicologia (reflexão interativa)
  // ─────────────────────────────────────────
  const trimesterQuestion =
    PSYCHOLOGY_QUESTIONS[week.trimester as keyof typeof PSYCHOLOGY_QUESTIONS];

  cards.push({
    id: `${weekNum}-psicologia`,
    layout: 'pergunta',
    chapter: 'Psicologia',
    title: 'Uma reflexão para você',
    question: trimesterQuestion,
    emoji: '💭',
  });

  // ─────────────────────────────────────────
  // 10. FAQ — Mito vs. Fato (se existir)
  // ─────────────────────────────────────────
  if (week.mythBuster) {
    cards.push({
      id: `${weekNum}-faq`,
      layout: 'faq',
      chapter: 'Mito vs. Fato',
      title: 'Desmentindo mitos',
      myth: week.mythBuster.myth,
      fact: week.mythBuster.fact,
    });
  }

  // ─────────────────────────────────────────
  // 11. HERO — Fechamento (conquista + CTA share)
  // ─────────────────────────────────────────
  cards.push({
    id: `${weekNum}-fechamento`,
    layout: 'hero',
    chapter: 'Fechamento',
    title: `Semana ${weekNum} concluída!`,
    subtitle: week.weeklyTip,
    emoji: '🏆',
    cta: 'Compartilhar',
  });

  return cards;
}
