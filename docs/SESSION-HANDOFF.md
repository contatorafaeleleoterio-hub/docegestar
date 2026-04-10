# Session Handoff — DoceGestar

> Documento atualizado ao final de cada sessão. Fonte de verdade para retomar o trabalho.
> **Último update:** 2026-04-10 | **Agente:** @devops (Gage) + @pm (Morgan)

---

## Estado Atual

| Item | Status | Observação |
|------|--------|------------|
| Story 2.1 — Onboarding | ✅ Done | QA concerns aceitos como débito técnico |
| Story 2.2 — Card Semanal | ✅ Done | 10 módulos implementados, QA PASS |
| Story 2.3 — Timeline | ✅ Done | Grade 40 semanas |
| Story 2.4 — Ferramentas | ✅ Done | Kick Counter + Contraction Timer |
| Config — Editar DPP | ✅ Done | Tela de configurações |
| Epic 2 — Git push | ✅ Done | Commits: d0ef109, 40ae04c, d07edb0, 3f29c1a, a736220 |
| Cloudflare Pages Deploy | ✅ Done | https://docegestar.pages.dev |
| docs/master/ — Master docs | ✅ Done | 3 arquivos commitados em a736220 |
| Epic 3 — Criação | ✅ Done | `docs/epics/epic-3.md` criado em 1cc2b15 |
| Epic 3 — Stories | ⏳ Pendente | @sm deve criar stories 3.1–3.4 |

### Working tree
- **Limpo** — nenhuma alteração pendente. `.claude/launch.json` é config interna (não commitar).

---

## Ação Imediata na Próxima Sessão

### 1. @sm — Criar stories do Epic 3

```
@sm *create-story
```

Criar as 4 stories a partir de `docs/epics/epic-3.md`:

| Story | Título | Pontos |
|-------|--------|--------|
| 3.1 | Configuração de Lembretes | 5 pts |
| 3.2 | Agendamento de Notificações Locais (`expo-notifications`) | 8 pts |
| 3.3 | Lembretes de Consulta Pré-Natal (CRUD) | 5 pts |
| 3.4 | Marcos Gestacionais Automáticos | 5 pts |

### 2. @po → @dev — Validar e implementar Story 3.1

```
@po *validate-story 3.1
@dev *implement 3.1
```

---

## Contexto Técnico Essencial

### Stack
- Expo 55 / React Native 0.83.2
- expo-sqlite (mobile) + AsyncStorage (web) via abstração em `src/db/`
- TypeScript — `npm run typecheck` deve sempre passar zero erros
- Deploy: Cloudflare Pages — push em `master` dispara deploy automático

### Dependência nova para Epic 3
- `expo-notifications ~0.28.x` — verificar compatibilidade com Expo 55 antes de instalar
- Verificar se já está em `package.json` antes de instalar

### Padrão de banco
```typescript
// src/db/index.ts — roteamento dinâmico por plataforma
Platform.OS === 'web'  → webStorage.ts (AsyncStorage, chaves prefixadas @docegestar:)
Platform.OS !== 'web'  → schema.ts (SQLite nativo)
```

### Fórmula da semana gestacional
```
semanaAtual = 40 - Math.round((dueDate - today) / 7)
clampado entre 1 e 40
```

### Regras arquiteturais
- **NÃO alterar `src/db/schema.ts`** — adicionar novas tabelas via `runMigrations()` em `src/db/index.ts`
- Tema: sempre usar `colors` e `typography` de `src/theme/` (nunca hardcode)
- Navegação pós-onboarding: `router.replace` (não `push`)
- Hook pattern: cancellation com `let cancelled = false` em useEffect async
- SQL: sempre queries parametrizadas + UPSERT com `ON CONFLICT`
- Web: `expo-notifications` não funciona — desabilitar graciosamente

### Débitos técnicos conhecidos (DT)
| ID | Descrição | Status |
|----|-----------|--------|
| DT-001 | Jest não configurado — sem testes unitários | Aceito |
| DT-002 | ESLint não configurado | Aceito |
| DT-003 | `parseDateBR` duplicada em `onboarding.tsx` e `config.tsx` | Pendente |
| DT-005 | GitHub Actions CI não configurado | Pendente |

### Git — repositório
- Remote: `https://github.com/contatorafaeleleoterio-hub/docegestar` (privado)
- Branch principal: `master`
- Deploy automático: Cloudflare Pages ao push em `master`

---

## Ordem de Execução Recomendada

```
PRÓXIMA SESSÃO
  1. @sm     → *create-story (stories 3.1–3.4 a partir de docs/epics/epic-3.md)
  2. @po     → *validate-story 3.1
  3. @dev    → *implement 3.1
  4. @qa     → *qa-gate 3.1
  5. @devops → *push (Story 3.1)
```
