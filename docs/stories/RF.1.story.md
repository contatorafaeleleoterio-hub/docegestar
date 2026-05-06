# Story RF.1 — Refatoração Front-End: feed moderno, sem revista

**Status:** Ready  
**Epic:** Refatoração / UX Polish  
**Estimate:** 8 pts  
**Created:** 2026-05-06  
**Validated:** 2026-05-06 (@po — 10/10 ✅)
**Author:** @sm (River)  

## Description
Realinhar o front-end do app DoceGestar ao conceito original: **feed moderno e dinâmico**.
Remover camadas de linguagem editorial ("revista", "capítulos", "abertura/fechamento"),
deletar 3 arquivos órfãos em `app/(tabs)/`, padronizar card style entre telas e remover
redundâncias visuais (título duplicado no dashboard, card "Registro rápido" duplicado com FAB).

## Acceptance Criteria

1. **GIVEN** o app rodando, **WHEN** o usuário acessar Início, **THEN** não verá título
   "DoceGestar" duplicado dentro do scroll (apenas no header da tab bar).
2. **GIVEN** o app rodando, **WHEN** o usuário acessar Explorar, **THEN** nenhum card
   exibirá badge de capítulo (`Abertura`, `Bebê`, `Você`, `Nutrição`, `Ação Prática`,
   `Psicologia`, `Mito vs. Fato`, `Fechamento`) e o header dirá "Sua Semana".
3. **GIVEN** `app/(tabs)/`, **THEN** existirão exatamente 5 arquivos: `_layout.tsx`,
   `dashboard.tsx`, `explorar.tsx`, `ferramentas.tsx`, `perfil.tsx`.
4. **GIVEN** o WeekPeekCard renderizado, **THEN** badge = "DESTAQUES DA SEMANA" e
   CTA = "Ver conteúdo completo".
5. **GIVEN** `npm run typecheck`, **THEN** retorna 0 erros.
6. **GIVEN** `app/timeline-detail.tsx`, **THEN** preserva pulse animation, auto-scroll
   e progress bar por trimestre que estavam em `timeline.tsx`.
7. **GIVEN** o dashboard, **THEN** o Card "Registro rápido" foi removido (FAB cobre).
8. **GIVEN** `grep -i "revista" app/ src/components/`, **THEN** zero matches em strings
   de UI/labels (apenas paths/imports residuais aceitos para refactor futuro).

## Scope IN
- Etapa 1–9 da seção 8 do plano técnico (`docs/plans/refatoracao-frontend.md`)
- Adição de `colors.successContainer` ao theme
- 3 commits lógicos com mensagens conventional

## Scope OUT
- Rename de arquivos (`RevistaCard.tsx` → `FeedCard.tsx`) — refactor separado
- Edição de conteúdo editorial (textos das semanas)
- Novas features

## Dependencies
Nenhuma.

## Risks
- Regressão visual no timeline (mitigado por @qa manual + screenshot before/after)
- Rotas Expo Router fantasma se imports residuais (mitigado por grep da Fase 4)

## Tasks
- [ ] T1: Absorver melhorias de `timeline.tsx` em `timeline-detail.tsx` (@dev)
- [ ] T2: Deletar 3 órfãos: `config.tsx`, `semana.tsx`, `timeline.tsx` (@dev)
- [ ] T3: Adicionar `colors.successContainer` em `src/theme/colors.ts` (@ux)
- [ ] T4: Refatorar `revistaAdapter.ts` (rename + remove CHAPTER_COLORS) (@dev)
- [ ] T5: Refatorar `RevistaCard.tsx` (remove badges, hardcoded colors) (@dev)
- [ ] T6: Refatorar `explorar.tsx` (header, remove progress bar) (@dev)
- [ ] T7: Refatorar `WeekPeekCard.tsx` (rebrand) (@dev)
- [ ] T8: Refatorar `dashboard.tsx` (remove título duplicado, remove Card 5, reorder) (@dev)
- [ ] T9: Padronizar `ferramentas.tsx` (card style) (@dev)
- [ ] T10: `npm run typecheck` PASS + `npx expo export --platform web` PASS (@qa)

## File List
(a preencher pelo @dev durante execução)

## Change Log
| Date | Author | Change |
|------|--------|--------|
| 2026-05-06 | @po | Story validada: 10/10 ✅ → Status Draft → Ready |
| 2026-05-06 | @sm | Story criada a partir de docs/plans/refatoracao-frontend.md |

## Dev Notes
(vazio — será preenchido durante execução)
