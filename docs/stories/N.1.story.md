# N.1 — Reestruturação do Menu: 5 tabs → 4 tabs

**Epic:** Navegação (N)
**Status:** Ready
**Estimativa:** 8 pts
**Agente responsável:** @dev (Dex)
**Data de criação:** 2026-05-03

---

## User Story

Como usuária do DoceGestar, quero um menu inferior com 4 tabs (Início, Explorar, Ferramentas, Perfil) em vez de 5, para que a navegação seja mais limpa e o conteúdo semanal esteja integrado ao Início sem tabs redundantes.

## Contexto

- Menu atual tem 5 tabs: Início, Semana, Timeline, Ferramentas, Config
- Decisão: Semana e Timeline saem do menu — conteúdo migra para Início
- Tab nova: **Explorar** (ícone `compass-outline`) — shell para a Revista (story R.4)
- Config renomeia para **Perfil** (ícone `person-outline`)
- Timeline vira stack route acessível por botão "Ver todas as semanas" em Início
- Dashboard absorve dados da semana via card compacto "Peek + Detail"

---

## Acceptance Criteria

### AC-1 — Layout 4 tabs

- [ ] `app/(tabs)/_layout.tsx`: array TABS contém exatamente 4 entradas:
  `dashboard` (Início), `explorar` (Explorar), `ferramentas` (Ferramentas), `perfil` (Perfil)
- [ ] Ícones: `home-outline/home`, `compass-outline/compass`, `construct-outline/construct`, `person-outline/person`
- [ ] Tabs `semana` e `timeline` removidas do array e do `<Tabs.Screen>`
- [ ] `<Tabs.Screen name="config" />` substituído por `<Tabs.Screen name="perfil" />`

### AC-2 — Arquivo explorar.tsx

- [ ] `app/(tabs)/explorar.tsx` criado com placeholder mínimo: título "Explorar" + texto "Revista da Semana em breve" (será substituído em R.4)

### AC-3 — Arquivo perfil.tsx

- [ ] `app/(tabs)/config.tsx` renomeado para `app/(tabs)/perfil.tsx`
- [ ] Título da tela alterado de "Configurações" para "Perfil"
- [ ] Conteúdo interno preservado sem alterações

### AC-4 — Card peek "Semana" no Dashboard

- [ ] `app/(tabs)/dashboard.tsx`: novo card `WeekPeekCard` inserido após o hero card (Card 1)
- [ ] Card exibe: semana atual, dia na semana (`getCurrentDayInWeek`), tamanho (sizeCm), peso (weightG), bpm (heartbeatBpm), comparação (comparison) — todos condicionais (renderiza só se weekData existir)
- [ ] Formato da linha 1: `Semana {N} · Dia {D} de 7`
- [ ] Formato da linha 2: `{sizeCm} cm · {weightG} g · ♥ {bpm} bpm`
- [ ] Botão "Ver semana →" navega para `/(tabs)/semana` → **após rename da rota, navega para `/semana-detail`** (stack route — AC-5)
- [ ] Design: card com `borderRadius: 16`, fundo `colors.surfaceContainer`, borda `colors.border` — consistente com os demais cards do dashboard

### AC-5 — Timeline e Semana como stack routes

- [ ] `app/(tabs)/semana.tsx` movido para `app/semana-detail.tsx` (stack route fora de tabs)
- [ ] `app/(tabs)/timeline.tsx` movido para `app/timeline-detail.tsx` (stack route fora de tabs)
- [ ] Botão "Ver todas as semanas" adicionado ao dashboard (abaixo do WeekPeekCard), navega para `/timeline-detail`
- [ ] Expo Router reconhece as novas rotas (arquivos na raiz de `app/`)

### AC-6 — Referências internas atualizadas

- [ ] `_layout.tsx`: `router.push('/(tabs)/config')` no HeaderRight atualizado para `router.push('/(tabs)/perfil')`
- [ ] `npm run typecheck` → 0 erros

---

## Fora do Escopo

- Alterar conteúdo interno de ferramentas.tsx, semana-detail.tsx ou timeline-detail.tsx
- Implementar conteúdo real na tab Explorar (story R.4)
- Qualquer alteração no WeekCard ou nos dados de semana

---

## Dependências

- Nenhuma story pendente — pode executar imediatamente

---

## Arquivos a Modificar/Criar

| Arquivo | Ação |
|---------|------|
| `app/(tabs)/_layout.tsx` | Modificar — 4 tabs, ícones, refs |
| `app/(tabs)/dashboard.tsx` | Modificar — adicionar WeekPeekCard + botão timeline |
| `app/(tabs)/explorar.tsx` | Criar — placeholder |
| `app/(tabs)/config.tsx` → `app/(tabs)/perfil.tsx` | Renomear |
| `app/(tabs)/semana.tsx` → `app/semana-detail.tsx` | Mover |
| `app/(tabs)/timeline.tsx` → `app/timeline-detail.tsx` | Mover |

---

## Definition of Done

- 4 tabs visíveis no menu inferior
- Tap "Ver semana →" abre tela de semana completa
- Tap "Ver todas as semanas" abre timeline
- `npm run typecheck` → 0 erros
- Nenhuma rota quebrada

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| 2026-05-03 | @sm | Story criada |
| 2026-05-03 | @po | Status: Draft → Ready (GO 9/10) |
