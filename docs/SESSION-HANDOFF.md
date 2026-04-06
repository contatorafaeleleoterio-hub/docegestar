# Session Handoff — DoceGestar

> Documento atualizado ao final de cada sessão. Fonte de verdade para retomar o trabalho.
> **Último update:** 2026-04-05 | **Agente:** @aiox-master (Orion)

---

## Estado Atual

| Item | Status | Observação |
|------|--------|------------|
| Story 2.1 — Onboarding | ✅ Done | QA concerns aceitos como débito técnico |
| Story 2.2 — Card Semanal | ✅ Done | 10 módulos implementados |
| Story 2.3 — Timeline | ✅ Done | Grade 40 semanas |
| Story 2.4 — Ferramentas | ✅ Done | Kick Counter + Contraction Timer |
| Plano Web — Etapa 1 | ✅ Done | react-dom, react-native-web instalados |
| Plano Web — Etapa 2 | ✅ Done | webStorage.ts + dynamic imports por Platform.OS |
| Plano Web — Etapa 3 | ⚡ Pendente | Guard Vibration aplicado; falta rodar `npx expo start --web` |
| Git push Epic 2 | ❌ Pendente | Nenhum commit do Epic 2 no repositório |

---

## Ação Imediata na Próxima Sessão

### 1. @dev — Concluir Etapa 3 (verificação no browser)

O guard de plataforma já está em `app/(tabs)/ferramentas.tsx:66`:
```typescript
if (Platform.OS !== 'web') Vibration.vibrate(50);
```

Executar:
```bash
npm run typecheck       # confirmar zero erros (já passou em 2026-04-05)
npx expo start --web    # abrir no browser
```

Verificar as 5 abas:
- Dashboard — semana real + contagem regressiva
- Semana — WeekCard com 10 módulos
- Timeline — grade visual 40 semanas
- Ferramentas — Kick Counter sem crash (sem vibração no web)
- Config — editar nome/DPP

Critério: app roda sem erros críticos de console → Etapa 3 DONE.

### 2. @devops — Push completo do Epic 2

Nenhum commit do Epic 2 existe no repositório (git log mostra apenas Epic 0 e Epic 1).
@devops deve commitar e fazer push de todo o trabalho:

```
feat: implement Epic 2 — UI Implementation complete [Story 2.1–2.4]
feat: add web platform support — AsyncStorage abstraction layer
```

Arquivos a incluir:
- `src/hooks/` — 7 hooks novos (useWeekData, useWeekTracking, useSymptomChecks, useCareChecks, useWeekCompletion, useSpecialMoment, useAllCompletions)
- `src/components/WeekCard.tsx`
- `src/db/webStorage.ts` + `src/db/index.ts`
- `app/(tabs)/dashboard.tsx`, `semana.tsx`, `timeline.tsx`, `ferramentas.tsx`, `config.tsx`
- `app/semana/[week].tsx`
- `app/onboarding.tsx`, `app/index.tsx`
- `src/hooks/useUserProfile.ts`, `src/hooks/useCurrentWeek.ts`
- `app.json`, `package.json`, `package-lock.json`

### 3. @pm — Iniciar planejamento do Epic 3

Após push do Epic 2, convocar @pm para `*create-epic`.

Sugestões de escopo para Epic 3 (a confirmar com o usuário):
- Notificações / lembretes gestacionais
- Conteúdo estático enriquecido por semana
- Exportação de dados / relatório para médico
- Onboarding enriquecido com foto de ultrassom

---

## Contexto Técnico Essencial

### Stack
- Expo 55 / React Native 0.83.2
- expo-sqlite (mobile) + AsyncStorage (web) via abstração em `src/db/`
- TypeScript — `npm run typecheck` deve sempre passar zero erros

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
- **NÃO alterar `src/db/schema.ts`** — apenas ler/escrever via `getDatabase()`
- Tema: sempre usar `colors` e `typography` de `src/theme/` (nunca hardcode)
- Navegação pós-onboarding: `router.replace` (não `push`)

### Débitos técnicos conhecidos
- Jest não configurado — sem testes unitários (débito aceito)
- ESLint não configurado — problema pré-existente do Epic 0
- `parseDateBR` e `formatDateInput` duplicadas em `onboarding.tsx` e `config.tsx` (refatorar em utils/)

---

## Plano Web (referência completa)

Plano aprovado em: `C:\Users\USUARIO\.claude\plans\sequential-skipping-valiant.md`

| Etapa | Status | Descrição |
|-------|--------|-----------|
| 1 | ✅ Done | Instalar react-dom, react-native-web; configurar app.json |
| 2 | ✅ Done | Criar webStorage.ts + atualizar src/db/index.ts |
| 3 | ⚡ Pendente | Guard Vibration aplicado; testar no browser |

---

## Ordem de Execução Recomendada

```
PRÓXIMA SESSÃO
  1. @dev  → npx expo start --web → confirmar Etapa 3 ✅
  2. @devops → git commit + push Epic 2
  3. @pm   → *create-epic (Epic 3 planning)
  4. @sm   → *draft stories do Epic 3
  5. @po   → *validate-story-draft (cada story)
```
