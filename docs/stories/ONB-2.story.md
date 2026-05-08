# Story ONB-2 — Date Utils para Cálculos Gestacionais

**Status:** Done
**Epic:** Onboarding v2.1
**Estimate:** 3 pts
**Created:** 2026-05-08
**Author:** @sm (River)

## Description

Criar `src/utils/dateUtils.ts` com funções de cálculo gestacional (Regra de Naegele:
LMP+280 dias e Concepção+266 dias) e métricas de DPP (semanas/dias decorridos e restantes,
formatação pt-BR). Adicionar setup Jest com `jest-expo` para garantir suíte de testes
de regressão. Esta story é dependência direta de ONB-8 (tela DueDate) e ONB-9 (modal
CongratulationsSheet).

## Acceptance Criteria

1. **GIVEN** `calcDPPFromLMP('2026-01-30')`, **THEN** retorna `'2026-11-06'` (LMP + 280 dias).
2. **GIVEN** `calcDPPFromConception('2026-02-13')`, **THEN** retorna `'2026-11-06'` (concepção + 266 dias).
3. **GIVEN** input ISO inválido, **WHEN** qualquer função for chamada, **THEN** lança `Error` com mensagem `'Invalid date: <input>'`.
4. **GIVEN** `calcGestationMetrics(dueISO=hoje+140d)`, **THEN** retorna `weeksElapsed=20, daysElapsed=140, weeksRemaining=20, daysRemaining=140`.
5. **GIVEN** DPP no passado ou LMP no futuro, **THEN** todos os campos numéricos são clamped a valores válidos (0 ou 280, sem negativos).
6. **GIVEN** `dppFormatted` para `'2026-10-04'`, **THEN** retorna string em pt-BR contendo "outubro" (`new Intl.DateTimeFormat('pt-BR', ...)`).
7. **GIVEN** boundary de semana, **THEN** dia 111 → `weeksElapsed=15`; dia 112 → `weeksElapsed=16` (fórmula `Math.floor`, não `Math.round`).
8. **GIVEN** `npm test`, **THEN** 9/9 testes PASS.
9. **GIVEN** `npm run typecheck`, **THEN** 0 erros.

## Scope IN

- `src/utils/dateUtils.ts`: criar arquivo novo com 3 funções públicas (`calcDPPFromLMP`, `calcDPPFromConception`, `calcGestationMetrics`).
- `__tests__/dateUtils.test.ts`: criar diretório e arquivo de testes (9 cenários).
- `package.json`: adicionar devDeps `jest`, `jest-expo`, `@types/jest` via `npx expo install jest-expo`; adicionar bloco `"jest"` com preset `jest-expo` e `transformIgnorePatterns`.
- Datas em UTC (`new Date('YYYY-MM-DDT00:00:00')`); `Math.floor` para semanas; clamp negativos a 0.

## Scope OUT

- `src/utils/date.ts` — **NÃO modificar** (parseDateBR/toISO/isoToBR/isDateOutOfRange permanecem intactos).
- Componentes UI, telas, hooks (são ONB-3+).
- Lógica de notificações ou agendamento.

## Dependencies

ONB-1 Done ✅ (commits `c92203e`, `d7a4074`).

## Risks

- `jest-expo` versão incompatível com Expo SDK 55 → mitigado: usar `npx expo install jest-expo` (Expo resolve versão correta).
- Drift por fuso horário em `new Date(string)` → mitigado: sempre usar sufixo `T00:00:00`.
- Off-by-one em boundary de semana → mitigado: AC7 cobre dia 111 vs 112 explicitamente.

## Tasks

- [x] T1: Criar `src/utils/dateUtils.ts` com `calcDPPFromLMP` (Naegele LMP+280d) (@dev)
- [x] T2: Adicionar `calcDPPFromConception` (concepção+266d) (@dev)
- [x] T3: Adicionar `calcGestationMetrics` (dppFormatted pt-BR + métricas numéricas com clamp) (@dev)
- [x] T4: Validação de input — lançar `Error('Invalid date: ...')` para ISO inválido (@dev)
- [x] T5: `npx expo install jest-expo @types/jest jest` (@dev)
- [x] T6: Adicionar bloco `"jest"` em `package.json` (preset jest-expo + transformIgnorePatterns) (@dev)
- [x] T7: Criar `__tests__/dateUtils.test.ts` com 9 cenários (@dev)
- [x] T8: `npm run typecheck` → 0 erros (@qa)
- [x] T9: `npm test` → 9/9 PASS (@qa)
- [x] T10: Commit `feat(onb2): add dateUtils with Naegele DPP calculations + jest setup` + push master (@devops)

## File List

| Arquivo | Ação |
|---------|------|
| `src/utils/dateUtils.ts` | CRIAR |
| `__tests__/dateUtils.test.ts` | CRIAR |
| `package.json` | MODIFICAR (devDependencies + bloco jest) |

## Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-05-08 | @sm | Story criada a partir de docs/plans/sessao-1-onb-2-onb-3.md |
| 2026-05-08 | @po | Validada 10/10 ✅ → Status Draft → Ready |
| 2026-05-08 | @dev | T1–T7 implementados — dateUtils.ts (3 funções) + jest-expo + 9 testes (10 cases) |
| 2026-05-08 | @qa | T8 typecheck 0 erros ✅ + T9 10/10 testes PASS ✅ |

## Dev Notes

**Referência do plano:** `docs/plans/sessao-1-onb-2-onb-3.md` (seção "Story ONB-2").

**Spec funcional (assinaturas):**

```typescript
calcDPPFromLMP(lmpISO: string): string             // ISO 'YYYY-MM-DD'
calcDPPFromConception(concISO: string): string     // ISO 'YYYY-MM-DD'
calcGestationMetrics(dueISO: string): {
  dppFormatted: string;     // "4 de outubro de 2026" (Intl pt-BR)
  weeksElapsed: number;     // Math.floor(daysElapsed / 7)
  daysElapsed: number;      // 0..280, clamped
  weeksRemaining: number;   // Math.floor((280 - daysElapsed) / 7)
  daysRemaining: number;    // 0..280, clamped
}
```

**Convenções obrigatórias:**
- UTC sempre: `new Date('YYYY-MM-DDT00:00:00')` — nunca `new Date(stringCru)`.
- pt-BR via `new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })`.
- `Math.floor` em divisões de semana (convenção clínica).
- Clamp: 0 ≤ daysElapsed ≤ 280 antes de derivar outros campos.
