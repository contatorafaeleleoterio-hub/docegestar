# Session Handoff — DoceGestar

> Documento atualizado ao final de cada sessão. Fonte de verdade para retomar o trabalho.
> **Último update:** 2026-04-11 | **Agente:** @aiox-master (sessão de continuidade)

---

## Estado Atual

| Item | Status | Observação |
|------|--------|------------|
| Story 4.1 — Onboarding 5 steps | ✅ Done | QA PASS. Commit `b254363` |
| Story 4.2 — Banner semanal + Share | ✅ Done | QA PASS. Commits `050791e`, `422911d` |
| Story 4.3 — Cards swipeáveis do bebê | ✅ Done | QA PASS. Commits `bb4f4bb`, `4bc4621` |
| Story 4.4 — Timeline visual trimestral | ⏳ Draft | Próxima a executar |
| Story 4.5 — Dica diária com categorias | ⏳ Draft | Aguardar 4.4 |
| Story 4.6 — Tracker de sintomas visual | ⏳ Draft | Aguardar 4.5 |
| Epic 3 — Stories 3.1–3.4 | ⏳ Draft | Aguardar Epic 4 Done |
| Git push | ✅ Done | origin/master `4bc4621` |
| Cloudflare Pages | ✅ Online | https://docegestar.pages.dev |

### Working tree
- **Limpo** — todos os arquivos da Story 4.3 commitados.

---

## Decisão de Prioridade (aprovada @aiox-master)

```
Epic 4 (UX, 24pts) ANTES de Epic 3 (Notificações, 23pts)
Razão: Epic 4 tem zero novas dependências. Epic 3 requer expo-notifications.
F14 (notificações básicas MVP) ELIMINADO — redundante com Epic 3.
```

---

## Ação Imediata na Próxima Sessão

### Continuar Epic 4 — Story 4.4 (Timeline visual trimestral)

```
@po *validate-story 4.4
@dev *implement 4.4
@qa *qa-gate 4.4
@devops *push
```

Story 4.4 (3pts) — Timeline visual com indicação dos 3 trimestres e marcos gestacionais.

---

## O que foi feito nesta sessão (2026-04-11)

### Story 4.2 — Banner Semanal Celebratório + Share
- `app/(tabs)/dashboard.tsx` — banner com saudação personalizada, milestone, contagem regressiva, Share nativo
- Commits: `050791e`, `422911d`

### Story 4.3 — Cards Swipeáveis do Bebê
- `src/components/WeekCard.tsx` — Módulo 3 substituído por 3 cards horizontais swipeáveis
- Card 1: Tamanho (`sizeCm`, `weightG`, `comparison`, `heartbeatBpm`)
- Card 2: Desenvolvimento (`milestones[]` com bullets visuais)
- Card 3: Novidade (`curiosities[0]` + badge "Novo esta semana")
- Dots de paginação com opacidade condicional via `onScroll` / `pagingEnabled`
- Commits: `bb4f4bb`, `4bc4621`

---

## Contexto Técnico Essencial

### Stack
- Expo 55 / React Native 0.83.2
- expo-sqlite (mobile) + AsyncStorage (web) via abstração em `src/db/`
- TypeScript — `npx tsc --noEmit` passa sem erros
- Deploy: Cloudflare Pages — push em `master` dispara deploy automático

### Regras arquiteturais
- **NÃO alterar `src/db/schema.ts`** — novas colunas via `runMigrations()` em `src/db/index.ts`
- **Nunca hardcode colors** — sempre `src/theme/colors.ts`
- **saveProfile** aceita 5 params; config.tsx deve passar os 5 (incluindo gestationType, firstChild, babyName)
- Web: `expo-notifications` não funciona — desabilitar graciosamente (relevante no Epic 3)
- Dados de semana: `weekData.curiosities[]` (3 fatos), `weekData.baby.*`, `weekData.milestones[]`

### Novidades da Story 4.1
- `src/utils/date.ts` — utilities de data (parseDateBR, formatDateInput, toISO, isoToBR, isDateOutOfRange)
- `src/db/index.ts` — v2 migrations: ALTER TABLE user_profile ADD COLUMN (gestationType, firstChild, babyName)
- `src/types/index.ts` — UserProfile com gestationType, firstChild, babyName
- `src/hooks/useUserProfile.ts` — saveProfile(name, dueDate, gestationType, firstChild, babyName)
- `app/onboarding.tsx` — stepper de 5 steps com confirmação visual

---

## Ordem de Execução Recomendada

```
Epic 4 (em andamento):
  ✅ 4.1 → ✅ 4.2 → ✅ 4.3 → 4.4 → 4.5 → 4.6
  
Epic 3 (após Epic 4 Done):
  3.1 → 3.2 → 3.3 → 3.4

Após cada story: @qa *qa-gate → @devops *push
```

---

## Débitos Técnicos

| ID | Descrição | Status |
|----|-----------|--------|
| DT-001 | Jest não configurado | Aceito |
| DT-002 | ESLint não configurado | Aceito |
| DT-003 | parseDateBR duplicada | ✅ RESOLVIDO em Story 4.1 |
| DT-005 | GitHub Actions CI não configurado | Pendente |
| DT-006 | expo-splash-screen não instalado + SplashScreen sem web guard | ✅ RESOLVIDO commits adaae65 + b254363 |
