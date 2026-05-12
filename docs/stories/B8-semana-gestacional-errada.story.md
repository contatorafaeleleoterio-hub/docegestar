# Story B8 — Bug: Semana gestacional exibida incorretamente

**Status:** Done  
**Tipo:** Bug Fix  
**Pontos:** 3  
**Data:** 2026-05-10  
**Criada por:** @sm (River)

---

## Descrição

A semana gestacional exibida no app é calculada de forma diferente em dois locais:

- `getCurrentWeek` / `calculateWeekFromDueDate` → retorna a semana clínica correta (ex: 18)
- `calcGestationMetrics.weeksElapsed` → retorna semanas *completas* (ex: 17 quando o usuário está na semana 18)

O `GestationCounter` em modo compacto exibe `Sem {weeksElapsed}`, que fica 1 semana abaixo do correto durante 6 dos 7 dias de cada semana gestacional. Um segundo bug é o uso de `Math.round` (em vez de `Math.floor`) ao calcular `daysToDue`, que pode causar drift de ±1 dia.

---

## Acceptance Criteria

- [ ] AC1: `GestationCounter` compact exibe a semana clínica correta (mesma que `getCurrentWeek`) para qualquer DPP
- [ ] AC2: `calcGestationMetrics` retorna novo campo `currentWeek: number` usando a fórmula `clamp(40 - floor(daysRemaining / 7), 1, 40)`
- [ ] AC3: `daysToDue` calculado com `Math.floor` (não `Math.round`) para consistência com zero-drift
- [ ] AC4: `weeksElapsed` mantém semântica atual ("semanas completas") — sem quebrar testes existentes
- [ ] AC5: Testes novos cobrem `currentWeek` para offsets 0d, 140d, 154d, 155d, 160d, 161d, 300d (antes e depois do parto)
- [ ] AC6: `npm run typecheck` → 0 erros
- [ ] AC7: `npm test` → todos os testes passam (incluindo os novos)

---

## Escopo

**IN:**
- `src/utils/dateUtils.ts` — adicionar `currentWeek` ao retorno, corrigir `Math.round` → `Math.floor`
- `src/components/ui/GestationCounter.tsx` — compact mode usa `metrics.currentWeek`
- `__tests__/dateUtils.test.ts` — novos testes para `currentWeek`

**OUT:**
- `src/data/index.ts` e `src/hooks/useCurrentWeek.ts` — NÃO alterar (fórmula já correta)
- Lógica de `weeksElapsed` — NÃO alterar semântica (quebra testes existentes)
- Refatoração de outros componentes fora do GestationCounter

---

## Dependências

Nenhuma story bloqueante.

---

## Riscos

- Testes existentes testam `weeksElapsed` em boundaries exatas (múltiplos de 7) onde o bug não aparece — cuidado para não alterar `weeksElapsed`
- `GestationCounter` full mode exibe "Já se passaram X semanas e Y dias" — esse texto está semanticamente correto (usa `weeksElapsed`) e NÃO deve ser alterado

---

## Definition of Done

- AC1–AC7 todos marcados
- `npm run typecheck` PASS
- `npm test` PASS (10+ testes, incluindo novos)
- Revisão visual: GestationCounter compact exibe semana correta

---

## File List

| Arquivo | Ação |
|---------|------|
| `src/utils/dateUtils.ts` | Modificar |
| `src/components/ui/GestationCounter.tsx` | Modificar |
| `__tests__/dateUtils.test.ts` | Modificar |

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| 2026-05-10 | @sm | Story criada (Draft) |
| 2026-05-10 | @po | Validação 10/10 — GO → Status: Ready |
| 2026-05-10 | @dev | Implementação: dateUtils (currentWeek + Math.floor), GestationCounter compact, testes novos (10-17) |
| 2026-05-10 | @qa | QA Gate PASS — typecheck 0 erros, 18/18 testes, AC1–AC7 verificados |
