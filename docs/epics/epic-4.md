# Epic 4 — MVP UX Enhancement

**ID:** Epic 4
**Agente criador:** @pm (Morgan)
**Data de criação:** 2026-04-10
**Status:** Planning
**Estimativa total:** 24 story points

---

## Objetivo

Elevar a experiência visual e funcional do app com melhorias de alto impacto e baixo esforço técnico — sem novas dependências externas. Features priorizadas por ICE Score do documento `docs/MVP-EXECUTION-PLAN.md`.

## Proposta de valor

A gestante passa a ter: onboarding personalizado com dados do bebê, banner motivacional compartilhável, navegação fluida entre informações do desenvolvimento, timeline trimestral clara, dicas categorizadas e histórico visual de sintomas.

## Escopo

### Dentro do Epic 4
- Onboarding expandido de 2 para 5 steps (gestationType, firstChild, babyName)
- Banner semanal com share nativo
- Cards swipeáveis de desenvolvimento do bebê
- Timeline com separadores de trimestre e visual de progresso
- Dica diária com categorias e persistência de dicas salvas
- Tracker de sintomas com histórico visual das últimas 4 semanas

### Fora do escopo
- Notificações e lembretes (→ Epic 3)
- Modo parceiro (→ backlog futuro)
- AR de tamanho do bebê (→ backlog futuro)
- Freemium/paywall (→ backlog futuro)

---

## Stories

| ID | Título | Feature | Complexidade | Pontos | Dependência |
|----|--------|---------|-------------|--------|-------------|
| 4.1 | Onboarding Estruturado | F13 | M | 5 pts | — |
| 4.2 | Banner Semanal + Share | F9 | S | 3 pts | 4.1 (babyName) |
| 4.3 | Cards Swipeáveis do Bebê | F3 | S | 3 pts | — |
| 4.4 | Timeline Visual Trimestral | F8 | S | 3 pts | — |
| 4.5 | Dica Diária com Categorias | F4 | M | 5 pts | — |
| 4.6 | Tracker de Sintomas Visual | F7 | M | 5 pts | — |

**Total:** 24 story points

---

## Restrições Técnicas

| Restrição | Detalhe |
|-----------|---------|
| Zero novas dependências | Usar ScrollView, View, Share API do React Native |
| SQLite | Novas colunas/tabelas via `runMigrations()` em `src/db/index.ts`. NUNCA alterar `schema.ts` |
| Theme tokens | Sempre importar cores de `src/theme/colors.ts` |
| TypeScript | `npm run typecheck` zero erros obrigatório |
| DT-003 | Aproveitar Story 4.1 para extrair `parseDateBR` para `src/utils/date.ts` |

---

## Critério de Aceite do Epic

Epic 4 considerado **Done** quando:
- [ ] Stories 4.1–4.6 com Status = Done
- [ ] QA Gate PASS (ou CONCERNS aceitos) em todas as 6 stories
- [ ] `npm run typecheck` zero erros
- [ ] App funcional na web (Cloudflare Pages) e mobile

---

## Definition of Done (por story)

Segue o padrão AIOX:
1. @po valida — Score ≥ 7/10 (Draft → Ready)
2. @dev implementa — typecheck PASS (Ready → InProgress → InReview)
3. @qa gate — veredicto PASS ou CONCERNS aceitos (InReview → Done)
4. @devops push (Done → GitHub)

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| 2026-04-10 | @pm | Epic 4 criado — Planning. 6 stories, 24pts estimados. F14 eliminado (redundante com Epic 3). |
