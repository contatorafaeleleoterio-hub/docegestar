# Story ONB-4 — BottomSheet + GestationCounter

**Status:** Done
**Epic:** Onboarding v2.1
**Estimate:** 3 pts
**Created:** 2026-05-08
**Author:** @sm (River)

## Description

Criar 2 componentes UI em `src/components/ui/`:
- **BottomSheet**: modal animado (overlay + slide-up) usando apenas `Animated` nativo do RN, sem dependências externas.
- **GestationCounter**: display de métricas gestacionais (semanas/dias decorridos e restantes) com modo full (modal) e modo compact (Dashboard Card 8).

Ambos são primitivas reutilizáveis — BottomSheet é usado em ONB-9 (modal "Parabéns!"), GestationCounter em ONB-9 e ONB-11 (Dashboard).

## Acceptance Criteria

1. **GIVEN** `BottomSheet visible=true`, **THEN** overlay anima opacity `0→0.4` (300ms, native driver) e sheet anima `translateY 300→0` (350ms, native driver) simultaneamente.
2. **GIVEN** toque no overlay ou chamada `onDismiss`, **THEN** animação reverte (300ms) e `onDismiss()` é chamado apenas no callback `.start()`.
3. **GIVEN** `BottomSheet`, **THEN** usa `<Modal transparent statusBarTranslucent>` com drag handle visual (pill cinza 32×4px) no topo do sheet.
4. **GIVEN** `GestationCounter estimatedDueDate="YYYY-MM-DD" compact=false`, **THEN** exibe semanas e dias decorridos, semanas e dias restantes, e DPP formatada em pt-BR.
5. **GIVEN** `GestationCounter compact=true`, **THEN** exibe badge compacto com semana atual e semanas restantes.
6. **GIVEN** `npm run typecheck`, **THEN** 0 erros.
7. **GIVEN** `npx expo export --platform web`, **THEN** bundle PASS.

## Scope IN

- `src/components/ui/BottomSheet.tsx`
- `src/components/ui/GestationCounter.tsx`
- Atualizar `src/components/ui/index.ts` (append 4 exports)

## Scope OUT

- Tela "Parabéns!" (ONB-9)
- Dashboard Card 8 (ONB-11)
- Gestos de swipe (pós-launch)

## Dependencies

ONB-2 Done ✅ (`calcGestationMetrics` em `src/utils/dateUtils.ts`)
ONB-3 Done ✅ (padrão de componentes e tokens estabelecidos)

## Tasks

- [x] T1: Criar `src/components/ui/BottomSheet.tsx` (Animated overlay + sheet + Modal) (@dev)
- [x] T2: Criar `src/components/ui/GestationCounter.tsx` (full + compact mode) (@dev)
- [x] T3: Atualizar `src/components/ui/index.ts` (4 exports) (@dev)
- [x] T4: `npm run typecheck` → 0 erros (@qa)
- [x] T5: `npx expo export --platform web` → PASS (@qa)
- [x] T6: Commit `feat(onb4): add BottomSheet and GestationCounter components` (@devops)

## File List

| Arquivo | Ação |
|---------|------|
| `src/components/ui/BottomSheet.tsx` | CRIAR |
| `src/components/ui/GestationCounter.tsx` | CRIAR |
| `src/components/ui/index.ts` | MODIFICAR |

## Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-05-08 | @sm | Story criada |
| 2026-05-08 | @po | Validada 10/10 ✅ → Status Draft → Ready |
| 2026-05-08 | @dev | T1–T3 implementados |
| 2026-05-08 | @qa | T4 typecheck 0 erros ✅ + T5 bundle PASS ✅ |

## Dev Notes

- `useNativeDriver: true` é suportado para `opacity` e `transform` — usar em ambos.
- `colors.overlay = 'rgba(17, 24, 39, 0.5)'` — mas animar até 0.4 para suavidade.
- Sheet: `borderTopLeftRadius: 24`, `borderTopRightRadius: 24`, `backgroundColor: colors.surface`.
- Imports relativos: `../../theme`, `../../utils/dateUtils`.
