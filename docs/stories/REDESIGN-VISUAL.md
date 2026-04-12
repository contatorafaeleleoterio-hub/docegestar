# Plano de Redesign Visual — DoceGestar (Aplicar Design docegestar.zip)

> **Status:** ⏳ Aguardando execução — Próxima sessão  
> **Aprovado por:** @aiox-master | **Data:** 2026-04-12  
> **Protocolo:** Story Development Cycle (SDC) — 4 sessões

---

## Objetivo

Aplicar o modelo visual do arquivo `docegestar.zip` no sistema atual, **mantendo** a stack React Native + Expo para lançamento na Play Store.

**O que muda:** Design visual (cores, layout, componentes)  
**O que NÃO muda:** Stack, SQLite, Expo Router, funcionalidades, AIOX

**Design de referência (zip extraído):**
- Localização: `C:\Users\USUARIO\Downloads\docegestar_extracted\src\`
- Cor primária: `#b30064` (magenta)
- Cor secundária: `#00637f` (teal)
- Glassmorphism adaptado para RN (`rgba` + sombras)
- Gradientes via `expo-linear-gradient`
- Bottom nav com animação de tab ativa
- Cards com `borderRadius: 16`, sombras suaves
- Fundo: `#f8f6f3`

---

## Sessão 1 — Story M.1: Design Tokens e Theme System
**Estimativa de contexto:** ~60-80k tokens

### Tarefa
Atualizar `src/theme/colors.ts` com a nova paleta do zip.

### Arquivos
- `src/theme/colors.ts`
- `src/theme/index.ts`

### Acceptance Criteria
- [ ] `src/theme/colors.ts` atualizado:
  - Primary: `#b30064` (era `#9a442d`)
  - Secondary: `#00637f` (era `#8e4e14`)
  - Background: `#f8f6f3` (manter tom creme)
  - Todas as chaves existentes mantidas (sem quebrar imports)
- [ ] App compila sem erros TypeScript
- [ ] Mudança de cores visualmente perceptível
- [ ] @devops push ao final

---

## Sessão 2 — Story M.2: Redesign da Tab Navigation e Header
**Estimativa de contexto:** ~100-120k tokens

### Tarefa
Redesenhar bottom nav e header/topbar no estilo do zip.

### Arquivos
- `app/(tabs)/_layout.tsx`
- `app/_layout.tsx`

### Acceptance Criteria
- [ ] Bottom nav: tab ativa com fundo `#b30064` + ícone branco
- [ ] Animação suave ao trocar de tab (`Animated` do RN)
- [ ] Header/TopBar: logo centralizada, ícone de perfil à direita, sombra suave
- [ ] Todas as 5 tabs navegam corretamente
- [ ] @devops push ao final

---

## Sessão 3 — Story M.3: Redesign das Telas Principais
**Estimativa de contexto:** ~150-180k tokens

### Tarefa
Redesenhar Dashboard, WeekCard, Timeline e Onboarding.

### Arquivos
- `app/(tabs)/dashboard.tsx`
- `src/components/WeekCard.tsx`
- `app/(tabs)/timeline.tsx`
- `app/onboarding.tsx`

### Acceptance Criteria
- [ ] Dashboard: card hero em gradiente `#b30064 → #d4006e`
- [ ] WeekCard: cards com fundo `rgba(255,255,255,0.8)`, `borderRadius: 16`, sombra suave
- [ ] Timeline: nova paleta (primário `#b30064`, completado com cor mais intensa)
- [ ] Onboarding: visual moderno (gradiente hero, inputs arredondados)
- [ ] App compila sem erros
- [ ] @devops push ao final

---

## Sessão 4 — Story M.4: Redesign de Ferramentas e Polimento Final
**Estimativa de contexto:** ~100-130k tokens

### Tarefa
Redesenhar Ferramentas e Config; polimento final; atualizar documentação.

### Arquivos
- `app/(tabs)/ferramentas.tsx`
- `app/(tabs)/config.tsx`
- `docs/master/03-DESIGN-SYSTEM.md`
- `docs/SESSION-HANDOFF.md`

### Acceptance Criteria
- [ ] KickCounter: botão grande com gradiente `#b30064`, card glassmorphism
- [ ] ContractionTimer: badge vermelho para 3-1-1, visual limpo
- [ ] Config: inputs com borda `#b30064` ao focar
- [ ] Design system documentado atualizado com nova paleta
- [ ] `npx expo export --platform web` gera `dist/` sem erros
- [ ] @devops push ao final

---

## Regras AIOX

- **Art. III (Story-Driven):** Cada sessão cria story com ACs antes de implementar
- **Art. II (Agent Authority):** Apenas `@devops` executa `git push`
- **Art. V (Quality First):** TypeScript + build passa antes de cada push
- **Limite de contexto:** Máximo 200k tokens por sessão

## Verificação End-to-End (pós Sessão 4)

1. `npx expo start` → visual novo em todas as telas
2. Dashboard: card hero em gradiente magenta
3. WeekCard: glassmorphism adaptado + 40 semanas de dados
4. Ferramentas: KickCounter + ContractionTimer com novo visual
5. `npx expo export --platform web` → `dist/` pronto para Cloudflare Pages
