# Story ONB-3 — Componentes UI Base do Onboarding

**Status:** Done
**Epic:** Onboarding v2.1
**Estimate:** 5 pts
**Created:** 2026-05-08
**Author:** @sm (River)

## Description

Criar 6 componentes UI base reutilizáveis em `src/components/ui/` (diretório novo) que
servirão de fundação para todas as telas do Onboarding v2.1 (ONB-6 a ONB-10) e do
Dashboard (ONB-11). Os componentes são purely presentational — sem lógica de domínio,
sem chamadas a hooks de dados, sem dependência de Context.

## Acceptance Criteria

1. **GIVEN** `src/components/ui/`, **THEN** existem os 7 arquivos: `FloatingLabelInput.tsx`, `FloatingLabelSelect.tsx`, `MethodCard.tsx`, `ProgressDots.tsx`, `PrimaryButton.tsx`, `GradientButton.tsx`, `index.ts`.
2. **GIVEN** `index.ts`, **THEN** todos os 6 componentes estão exportados como named exports.
3. **GIVEN** `FloatingLabelInput` com `value=""` e não-focado, **THEN** label aparece centralizada vertical (top:18, fontSize:16); ao focar ou ter valor, label flutua para topo (top:8, fontSize:12) via `Animated` com `useNativeDriver: false`.
4. **GIVEN** `FloatingLabelInput` com `error` truthy, **THEN** borda usa `colors.error` e texto de erro é renderizado abaixo com `typography.caption`.
5. **GIVEN** `FloatingLabelSelect` clicado, **THEN** abre `<Modal transparent animationType="fade">` full-screen com lista de opções; opção selecionada é destacada com `colors.primaryLight` + check.
6. **GIVEN** `MethodCard` com `selected=true`, **THEN** `borderWidth=2`, `borderColor=colors.primary`, `backgroundColor=colors.primaryLight`; `accessibilityRole="radio"` e `accessibilityState={{ selected: true }}`.
7. **GIVEN** `ProgressDots total=3 current=1`, **THEN** renderiza 3 dots redondos (8x8); dot 0 com `colors.primary`, dots 1 e 2 com `colors.border`.
8. **GIVEN** `PrimaryButton variant="solid" disabled`, **THEN** `opacity=0.5` e prop `disabled` aplicada; variant `outline` usa `borderColor=colors.primary` e fundo transparente.
9. **GIVEN** `GradientButton`, **THEN** usa `<LinearGradient colors={[colors.primaryDeep, colors.primary]} start={{x:0,y:0}} end={{x:1,y:0}}>`.
10. **GIVEN** `npm run typecheck`, **THEN** 0 erros.
11. **GIVEN** `npx expo export --platform web`, **THEN** bundle compila sem erros.

## Scope IN

- 7 arquivos em `src/components/ui/`:
  - `FloatingLabelInput.tsx` — animated label, estados focused/error
  - `FloatingLabelSelect.tsx` — Modal full-screen com lista de opções
  - `MethodCard.tsx` — radio-style card para método DPP
  - `ProgressDots.tsx` — indicador ●○○ 1-based
  - `PrimaryButton.tsx` — solid/outline + disabled
  - `GradientButton.tsx` — LinearGradient primaryDeep→primary
  - `index.ts` — barrel export

## Scope OUT

- BottomSheet (ONB-4)
- GestationCounter (ONB-4)
- Telas / rotas (ONB-6+)
- OnboardingContext (ONB-5)

## Dependencies

ONB-2 Done ✅ (commit `4cbf69a`).

## Risks

- `useNativeDriver: false` causa jank em label flutuante → aceitável; `fontSize`/`top` não suportam native driver. Animação 200ms é imperceptível.
- Alias `@/theme` não configurado em `tsconfig.json` (apenas extends `expo/tsconfig.base`) → usar imports relativos `../../theme`.
- Modal iOS clipa por safe area → painel central com `marginHorizontal: spacing[4]` + `maxHeight: '70%'`.

## Tasks

- [x] T1: Criar `src/components/ui/FloatingLabelInput.tsx` (animação + 3 estados de borda + erro caption) (@dev)
- [x] T2: Criar `src/components/ui/FloatingLabelSelect.tsx` (Modal transparent + lista de opções + check) (@dev)
- [x] T3: Criar `src/components/ui/MethodCard.tsx` (radio-style + accessibility) (@dev)
- [x] T4: Criar `src/components/ui/ProgressDots.tsx` (8x8 dots + accessibilityLabel) (@dev)
- [x] T5: Criar `src/components/ui/PrimaryButton.tsx` (solid/outline + disabled) (@dev)
- [x] T6: Criar `src/components/ui/GradientButton.tsx` (LinearGradient horizontal) (@dev)
- [x] T7: Criar `src/components/ui/index.ts` (barrel export named) (@dev)
- [x] T8: `npm run typecheck` → 0 erros (@qa)
- [x] T9: `npx expo export --platform web` → bundle PASS (@qa)
- [x] T10: Commit `feat(onb3): add 6 base UI components for onboarding flow` (@devops)

## File List

| Arquivo | Ação |
|---------|------|
| `src/components/ui/FloatingLabelInput.tsx` | CRIAR |
| `src/components/ui/FloatingLabelSelect.tsx` | CRIAR |
| `src/components/ui/MethodCard.tsx` | CRIAR |
| `src/components/ui/ProgressDots.tsx` | CRIAR |
| `src/components/ui/PrimaryButton.tsx` | CRIAR |
| `src/components/ui/GradientButton.tsx` | CRIAR |
| `src/components/ui/index.ts` | CRIAR |

## Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-05-08 | @sm | Story criada a partir de docs/plans/sessao-1-onb-2-onb-3.md |
| 2026-05-08 | @po | Validada 10/10 ✅ → Status Draft → Ready |
| 2026-05-08 | @dev | T1–T7 implementados — 6 componentes + barrel index.ts |
| 2026-05-08 | @qa | T8 typecheck 0 erros ✅ + T9 web bundle 1.9MB PASS ✅ |

## Dev Notes

**Tokens canônicos (já disponíveis em `src/theme/`):**
- `colors.primary` `#DB2777`, `colors.primaryDeep` `#9D174D`, `colors.primaryLight` `#FCE7F3`
- `colors.border` `#E5E7EB`, `colors.error` `#B91C1C`, `colors.textSecondary` `#6B7280`
- `borderRadius.xl` (12), `borderRadius['2xl']` (16), `borderRadius.pill` (32)
- `spacing[2]` (8), `spacing[3]` (12), `spacing[4]` (16)
- `typography.h3`, `typography.bodySmall`, `typography.label`, `typography.caption`

**Convenções obrigatórias:**
- `StyleSheet.create` para todos os estilos. Inline `style={{...}}` apenas para valores dinâmicos.
- `testID` em todos os componentes.
- Imports relativos: `import { colors } from '../../theme'` (alias `@/` não configurado).
- Sem comentários exceto onde houver invariante não-óbvia.
