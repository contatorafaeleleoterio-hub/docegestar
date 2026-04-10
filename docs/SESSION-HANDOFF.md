# Session Handoff — DoceGestar

> Documento atualizado ao final de cada sessão. Fonte de verdade para retomar o trabalho.
> **Último update:** 2026-04-09 | **Agente:** @aiox-master (Orion)

---

## Estado Atual

| Item | Status | Observação |
|------|--------|------------|
| Story 2.1 — Onboarding | ✅ Done | QA concerns aceitos como débito técnico |
| Story 2.2 — Card Semanal | ✅ Done | 10 módulos implementados, QA PASS |
| Story 2.3 — Timeline | ✅ Done | Grade 40 semanas |
| Story 2.4 — Ferramentas | ✅ Done | Kick Counter + Contraction Timer |
| Config — Editar DPP | ✅ Done | Tela de configurações |
| Epic 2 — Git push | ✅ Done | Commits d0ef109, 40ae04c, d07edb0, 3f29c1a no remote |
| Cloudflare Pages Deploy | ✅ Done | https://docegestar.pages.dev |
| Epic 3 — Planejamento | ⏳ Pendente | Foco decidido: Notificações e Lembretes |

### Arquivos com alterações não commitadas
- `docs/stories/2.2.story.md` — modificado localmente
- `src/components/WeekCard.tsx` — modificado localmente

> @devops deve commitar e fazer push dessas alterações antes de iniciar Epic 3.

---

## Ação Imediata na Próxima Sessão

### 1. @devops — Commitar e push das alterações pendentes

```bash
git add docs/stories/2.2.story.md src/components/WeekCard.tsx
git commit -m "chore: sync Story 2.2 story file and WeekCard cleanup"
git push
```

### 2. @pm — Criar Epic 3

```
@pm *create-epic
```

- **Título:** Epic 3 — Notificações e Lembretes Gestacionais
- **Foco:** Lembretes de consultas pré-natais, marcos semanais, vacinas, movimento fetal
- **Criar:** `docs/epics/epic-3.md`

### 3. @sm — Criar stories do Epic 3

```
@sm *create-story
```

Stories sugeridas:
- **3.1** — Configuração de Lembretes (selecionar tipos)
- **3.2** — Agendamento de Notificações Locais (`expo-notifications`)
- **3.3** — Lembretes de Consulta Pré-Natal (CRUD)
- **3.4** — Marcos Gestacionais Automáticos (por semana)

### 4. @po → @dev — Validar e implementar Story 3.1

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
- Deploy: Cloudflare Pages — push em `main` dispara deploy automático

### Dependência nova para Epic 3
- `expo-notifications ~0.28.x` — verificar compatibilidade com Expo 55 antes de instalar

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

### Débitos técnicos conhecidos (DT)
| ID | Descrição | Status |
|----|-----------|--------|
| DT-001 | Jest não configurado — sem testes unitários | Aceito |
| DT-002 | ESLint não configurado | Aceito |
| DT-003 | `parseDateBR` duplicada em `onboarding.tsx` e `config.tsx` | Pendente |
| DT-005 | GitHub Actions CI não configurado | Pendente |

### Git — repositório
- Remote: `https://github.com/contatorafaeleleoterio-hub/docegestar` (privado)
- Branch principal: `main`
- Deploy automático: Cloudflare Pages ao push em `main`

---

## Ordem de Execução Recomendada

```
PRÓXIMA SESSÃO
  1. @devops → git commit + push (alterações pendentes 2.2 story + WeekCard)
  2. @pm     → *create-epic (Epic 3 — Notificações e Lembretes)
  3. @sm     → *create-story (stories 3.1–3.4)
  4. @po     → *validate-story 3.1
  5. @dev    → *implement 3.1
  6. @qa     → *qa-gate 3.1
  7. @devops → *push (Story 3.1)
```
