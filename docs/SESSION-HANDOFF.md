# Session Handoff — DoceGestar

> Documento atualizado ao final de cada sessão. Fonte de verdade para retomar o trabalho.
> **Último update:** 2026-04-10 | **Agente:** @aiox-master + @devops (Gage)

---

## Estado Atual

| Item | Status | Observação |
|------|--------|------------|
| Story 4.1 — Onboarding 5 steps | ✅ Done | QA PASS. DT-003 resolvido. Commit 4aad655 |
| Epic 4 — Stories 4.2–4.6 | ⏳ Draft | Prontas para validação @po |
| Epic 3 — Stories 3.1–3.4 | ⏳ Draft | Prontas, aguardar Epic 4 Done |
| Git push | ✅ Done | origin/master `4aad655` |
| Cloudflare Pages | ✅ Auto-deploy disparado | https://docegestar.pages.dev |

### Working tree
- **Limpo** — todos os arquivos da Story 4.1 commitados.

---

## Decisão de Prioridade (aprovada @aiox-master)

```
Epic 4 (UX, 24pts) ANTES de Epic 3 (Notificações, 23pts)
Razão: Epic 4 tem zero novas dependências. Epic 3 requer expo-notifications.
F14 (notificações básicas MVP) ELIMINADO — redundante com Epic 3.
```

---

## Ação Imediata na Próxima Sessão

### Continuar Epic 4 — Story 4.2 (Banner + Share)

```
@po *validate-story 4.2
@dev *implement 4.2
@qa *qa-gate 4.2
@devops *push
```

Story 4.2 é a mais simples da sequência (3pts, apenas estilização do dashboard + Share API nativa).

---

## Contexto Técnico Essencial

### Novidades da Story 4.1

- `src/utils/date.ts` — utilities de data (parseDateBR, formatDateInput, toISO, isoToBR, isDateOutOfRange)
- `src/db/index.ts` — v2 migrations: ALTER TABLE user_profile ADD COLUMN (gestationType, firstChild, babyName) com try/catch
- `src/types/index.ts` — UserProfile agora tem gestationType, firstChild, babyName
- `src/hooks/useUserProfile.ts` — saveProfile(name, dueDate, gestationType, firstChild, babyName) — todos os 5 params
- `app/onboarding.tsx` — stepper de 5 steps com confirmação visual
- `app/(tabs)/config.tsx` — preserva gestationType/firstChild/babyName ao salvar

### Stack
- Expo 55 / React Native 0.83.2
- expo-sqlite (mobile) + AsyncStorage (web) via abstração em `src/db/`
- TypeScript — `npm run typecheck` passa (exceto DT-006 expo-splash-screen pré-existente)
- Deploy: Cloudflare Pages — push em `master` dispara deploy automático

### Regras arquiteturais
- **NÃO alterar `src/db/schema.ts`** — novas colunas via `runMigrations()` em `src/db/index.ts`
- **Nunca hardcode colors** — sempre `src/theme/colors.ts`
- **saveProfile** aceita 5 params; config.tsx deve passar os 5 (incluindo os novos campos)
- Web: `expo-notifications` não funciona — desabilitar graciosamente (relevante no Epic 3)

---

## Ordem de Execução Recomendada

```
Epic 4 (em andamento):
  4.2 → 4.3 → 4.4 → 4.5 → 4.6
  
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
| DT-006 | expo-splash-screen type error em _layout.tsx | Novo, pendente |
