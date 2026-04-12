# Session Handoff — DoceGestar

> Documento atualizado ao final de cada sessão. Fonte de verdade para retomar o trabalho.
> **Último update:** 2026-04-12 | **Agente:** @devops (Gage) — Story M.2 Done, push executado

---

## Estado Atual

| Item | Status | Observação |
|------|--------|------------|
| Story M.1 — Design Tokens | ✅ Done | QA PASS. Commit `0d18d75` |
| Story M.2 — Tab Navigation + Header | ✅ Done | QA PASS. CustomTabBar + Ionicons + Header |
| Story M.3 — Dashboard, WeekCard, Timeline, Onboarding | ⏳ Aguardando | **PRÓXIMA** |
| Story M.4 — Ferramentas + Polimento | ⏳ Aguardando | Após M.3 |
| Epic 3 — Stories 3.1–3.4 | ⏳ Draft | Após redesign completo |
| Git push | ✅ Done | origin/master (M.2) |
| Cloudflare Pages | ✅ Online | https://docegestar.pages.dev |

### Working tree
- **Limpo** — Story M.2 commitada e pushed.

---

## Decisão de Prioridade (aprovada @aiox-master)

```
Epic 4 (UX, 24pts) ANTES de Epic 3 (Notificações, 23pts)
Razão: Epic 4 tem zero novas dependências. Epic 3 requer expo-notifications.
F14 (notificações básicas MVP) ELIMINADO — redundante com Epic 3.
```

---

## ⚡ PRIORIDADE — Ação Imediata na Próxima Sessão

### REDESIGN VISUAL — Story M.3: Telas Principais (PRÓXIMA SESSÃO)

**Plano completo:** `docs/stories/REDESIGN-VISUAL.md`

**M.1 ✅ Done** (Design Tokens) | **M.2 ✅ Done** (Tab Nav + Header)

**Escopo M.3:**
- `app/(tabs)/dashboard.tsx` — redesign com nova paleta + glassmorphism
- `src/components/WeekCard.tsx` — cards com borderRadius 16 + sombras
- `app/(tabs)/timeline.tsx` — timeline visual atualizada
- `app/onboarding.tsx` — onboarding com identidade visual nova

**Ordem de execução restante:**

```
Sessão 3 — Story M.3: Telas Principais  ← PRÓXIMA
  @sm *create-story M.3
  @po *validate M.3
  @dev — dashboard, WeekCard, timeline, onboarding
  @qa *qa-gate M.3
  @devops *push

Sessão 4 — Story M.4: Ferramentas + Polimento
  @sm *create-story M.4
  @po *validate M.4
  @dev — ferramentas.tsx, config.tsx + docs
  @qa *qa-gate M.4
  @devops *push
```

**Design de referência:** `C:\Users\USUARIO\Downloads\docegestar_extracted\src\`
- Cor primária: `#b30064` (magenta)
- Cor secundária: `#00637f` (teal)
- Glassmorphism adaptado para RN (`rgba` + sombras)
- Cards: `borderRadius: 16`, sombras suaves
- Bottom nav: tab ativa com destaque `#b30064` + animação

**Regra AIOX:** Máximo 200k tokens por sessão. Cada sessão finaliza com @devops push.

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
