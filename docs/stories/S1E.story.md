# Story S1E — Modular Feed / Home Scroll

**Status:** InProgress  
**Sprint:** 1-E  
**Points:** 5  
**Agentes:** @sm → @po → @dev → @qa → @devops

---

## Description

Substituir a home estática por um feed vertical scrollável com 7 cards ordenados por valor contextual. A mudança transforma o dashboard de uma tela informativa passiva em um feed dinâmico orientado a retenção diária.

## Acceptance Criteria

- [ ] AC1: Dashboard usa `ScrollView` em vez de `View` fixo
- [ ] AC2: Feed contém 7 cards na ordem: Hero · Bebê · Sintomas · Dica · Registro Rápido · Curiosidade · Progresso
- [ ] AC3: Card Hero — gradient magenta, semana atual, trimestre, botão compartilhar embutido
- [ ] AC4: Card Bebê — emoji de fruta/vegetal + tamanho + comparação (mesma lógica de S1B no WeekCard)
- [ ] AC5: Card Sintomas Esperados — 3 sintomas da semana (maternalChanges se disponível, fallback SYMPTOMS_T1/T2/T3)
- [ ] AC6: Card Dica do Dia — tip de DAILY_TIPS rotacionada por dia da semana, com badge de categoria
- [ ] AC7: Card Registro Rápido — 3 atalhos rápidos: Sintomas, Consultas, Contador (navegar para ferramentas)
- [ ] AC8: Card Curiosidade — curiosities[0] da semana (fallback: motivationalPhrase)
- [ ] AC9: Card Progresso — barra de progresso do trimestre + streak + dias restantes
- [ ] AC10: Streak card migrado para dentro do card Progresso (sem card separado)
- [ ] AC11: `npm run typecheck` → 0 erros
- [ ] AC12: Web preview funcional (ScrollView com web guard se necessário)

## Scope

**IN:**
- Rewrite de `app/(tabs)/dashboard.tsx`
- Uso de hooks existentes: `useCurrentWeek`, `useStreak`, `usePrenatalAppointments`, `getProfile`
- Uso de dados: `getWeek`, `DAILY_TIPS`, `SYMPTOMS_T1/T2/T3`

**OUT:**
- Nenhum novo hook criado
- Nenhum componente extraído (inline styles no dashboard)
- FAB quick-log real (Sprint 1-F)
- Modificação no WeekCard ou outras telas

## File List

- `app/(tabs)/dashboard.tsx` — rewrite completo

## Change Log

| Date | Agent | Change |
|------|-------|--------|
| 2026-04-30 | @sm | Story criada |
