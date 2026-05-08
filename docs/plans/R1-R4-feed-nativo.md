# Plano R.1–R.4 — Feed Nativo (Revista Digital no App)

**Data:** 2026-05-08
**Status:** Aprovado para execução
**Dependência:** ONB-12 Done ✅

---

## Contexto

O RF.1 já construiu a infraestrutura do feed:
- `app/(tabs)/explorar.tsx` — FlatList funcional com `buildWeeklyFeed()`
- `src/components/RevistaCard.tsx` — 5 layouts (stat, lista, checklist, pergunta, faq)
- `src/utils/revistaAdapter.ts` — transforma `WeekContent` em array de cards

**O feed funciona, mas tem 3 UX broken:**
1. **Checklist** — checkboxes visuais sem estado (toque não faz nada)
2. **Pergunta** — card estático sem interatividade
3. **Sem abertura** — feed começa direto no dado, sem contexto narrativo

**O objetivo de R.1–R.4** é elevar o feed de "funcional" para "polido" antes do submit Play Store.

---

## R.1 — Checklist com Persistência

**Sessão:** 1 | **Pts:** 2

### Problema
`RevistaCard` layout `checklist` renderiza checkboxes estáticos — toque não persiste.

### Solução
Criar `FeedChecklistCard` que usa o hook `useCareChecks` já existente (`src/hooks/useCareChecks.ts`).

### Arquivos

| Arquivo | Ação |
|---------|------|
| `src/types/index.ts` | Adicionar campo `weekNumber?: number` a `RevistaCard` |
| `src/utils/revistaAdapter.ts` | Passar `week.weekNumber` em todos os cards gerados |
| `src/components/FeedChecklistCard.tsx` | Criar — wrapper que usa `useCareChecks`, chave `feed_s{N}_item{i}` |
| `app/(tabs)/explorar.tsx` | Render condicional: `card.layout === 'checklist'` → `<FeedChecklistCard>` |

### Acceptance Criteria
- [ ] Checkbox marcado persiste após rolar o feed e voltar
- [ ] Chave SQLite: `feed_s{weekNumber}_item{index}`
- [ ] Semanas diferentes têm checklists independentes
- [ ] Typecheck 0 erros

---

## R.2 — Pergunta "Já refleti"

**Sessão:** 1 | **Pts:** 1

### Problema
Card `pergunta` mostra questão psicológica sem forma de interação — parece incompleto.

### Solução
Botão simples "💭 Já refleti" que persiste estado em AsyncStorage. Sem opções A/B (requer dados que não existem) — MVP usa toggle de "marcado como feito".

### Arquivos

| Arquivo | Ação |
|---------|------|
| `src/components/RevistaCard.tsx` | Layout `pergunta`: adicionar botão toggle + estado via `AsyncStorage` |

### Lógica
```
chave AsyncStorage: `feed_reflexao_s{weekNumber}`
estado: false (não refletiu) | true (já refletiu)
botão: "💭 Já refleti" → após toque → "✅ Reflexão feita"
```

### Acceptance Criteria
- [ ] Botão exibido abaixo do texto da pergunta
- [ ] Estado persiste entre sessões (AsyncStorage)
- [ ] Visual: após toque botão muda cor e texto
- [ ] Typecheck 0 erros

> **Nota:** R.1 e R.2 podem ser executados na mesma sessão (2 pts total).

---

## R.3 — Card Hero (Abertura do Feed)

**Sessão:** 1 | **Pts:** 2

### Problema
Feed começa com dado bruto (stat de tamanho do bebê) sem contexto emocional — sem "abertura" semanal.

### Solução
Novo layout `hero` no `RevistaCard.tsx`: título grande + texto narrativo + fundo gradiente sutil. Alimentado por `weekData.motivationalPhrase` (já existe em todas as semanas).

### Arquivos

| Arquivo | Ação |
|---------|------|
| `src/types/index.ts` | Adicionar `'hero'` a `RevistaCardLayout` + campo `heroText?: string` a `RevistaCard` |
| `src/utils/revistaAdapter.ts` | Inserir card hero no início do feed usando `week.motivationalPhrase` |
| `src/components/RevistaCard.tsx` | Adicionar layout `hero`: gradiente primário sutil, emoji grande, título, texto |

### Design do Hero Card
```
background: LinearGradient (primary opacity 10% → transparent)
emoji: 🌸 (fixo ou por trimestre)
title: "Semana {N}" (typography.h1)
heroText: week.motivationalPhrase (typography.body, cor textSecondary)
borderRadius: 20, padding: 24
```

### Acceptance Criteria
- [ ] Card hero é sempre o primeiro item do feed
- [ ] Reutiliza `motivationalPhrase` existente (nenhum dado novo necessário)
- [ ] Design coerente com paleta primária do app
- [ ] Typecheck 0 erros

---

## R.4 — WeekPeekCard → Explorar + QA Gate do Feed

**Sessão:** 1 | **Pts:** 2

### Parte A — WeekPeekCard aponta para Explorar
Verificar se o `WeekPeekCard` no dashboard tem CTA que navega para `/(tabs)/explorar`. Se não, adicionar.

| Arquivo | Ação |
|---------|------|
| `src/components/WeekPeekCard.tsx` | Verificar/adicionar botão "Ver feed completo →" com `router.push('/(tabs)/explorar')` |

### Parte B — QA Gate completo do Feed
Executado por @qa após R.3 Done:

1. `npm run typecheck` → 0 erros
2. `npm test` → todos PASS
3. `npx expo export --platform web` → bundle PASS
4. Cenários verificados por inspeção de código:
   - Feed exibe card hero como primeiro item ✓
   - Checklist persiste estado entre renders ✓
   - Pergunta mostra botão de reflexão ✓
   - Empty state exibido quando `weekData` nulo ✓
   - WeekPeekCard linka para tab Explorar ✓

---

## Sequência de Execução

| Story | Sessão | Pts | Dependência |
|-------|--------|-----|-------------|
| R.1 — Checklist persistence | 1 | 2 | ONB-12 Done |
| R.2 — Pergunta "Já refleti" | 1 (junto com R.1) | 1 | R.1 |
| R.3 — Hero card | 2 | 2 | R.2 Done |
| R.4 — WeekPeekCard + QA Gate | 3 | 2 | R.3 Done |

**Total:** 3 sessões | 7 pts

---

## O que NÃO está neste plano (pós-MVP)

- Imagens na revista (copiar PNGs da `Revista_docegestar/`) — requer ação manual do Rafael
- Textos editoriais customizados por semana (S16/S17) — pipeline C-0 separado
- Opções A/B na pergunta — requer design de conteúdo
- Layout de conquista com Share (card 15 da revista original)

---

## Referências

- Feed atual: `app/(tabs)/explorar.tsx`
- Componente: `src/components/RevistaCard.tsx`
- Adapter: `src/utils/revistaAdapter.ts`
- Tipos: `src/types/index.ts` (linha 114)
- Hook checklist: `src/hooks/useCareChecks.ts`
