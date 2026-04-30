# S1B — Animated Baby/Fruit Comparison

**Epic:** Sprint 1 — Retention Features  
**Status:** InProgress  
**Estimativa:** 3 pts  
**Agente responsável:** @dev (Dex)  
**Data de criação:** 2026-04-29  

---

## User Story

Como usuária do DoceGestar, quero ver uma ilustração animada comparando o tamanho do meu bebê a uma fruta ou legume da semana, para que eu possa visualizar o crescimento de forma divertida e compartilhável.

## Contexto

- Spec: `docegestar-claude-code.md §2-B e §6` — Rank 3, ROI S+ (High Impact / Low Effort)
- Problema atual: campo "Parece um(a)" exibe apenas texto simples "Abacate" sem imagem ou animação
- Referência de mercado: feature mais compartilhada no BabyCenter e The Bump reviews
- Abordagem: emoji animado (Animated.loop scale pulse) — zero assets, zero dependências novas

---

## Acceptance Criteria

- [x] **AC-1:** `src/utils/fruitEmoji.ts` criado com mapeamento completo das 40 semanas (todas as `comparison` strings → emoji)
- [x] **AC-2:** Card 1 (Tamanho) em `WeekCard.tsx` exibe emoji grande (28px) acima do label "Parece um(a)" no lugar do texto plano
- [x] **AC-3:** Emoji pulsa suavemente (scale 1.0 → 1.15 → 1.0, loop, 1800ms) via `Animated.loop` enquanto o card é exibido
- [x] **AC-4:** Nome da fruta/legume permanece visível abaixo do emoji (texto menor, cor textSecondary)
- [x] **AC-5:** Semanas com `comparison: '—'` exibem `👶` com animação normal
- [x] **AC-6:** Platform web: animação funciona normalmente (`Animated` é suportado na web via React Native Web)
- [x] **AC-7:** Nenhuma nova dependência instalada
- [x] **AC-8:** `npm run typecheck` — 0 erros após implementação

---

## Scope

**IN:**
- `src/utils/fruitEmoji.ts` (novo arquivo)
- `src/components/WeekCard.tsx` — Card 1, apenas a seção metricItem de comparison

**OUT:**
- Dados das semanas (`weeks-*.ts`) — sem alteração
- Tipos (`types/index.ts`) — sem alteração
- Outros cards (Card 2, Card 3) — sem alteração
- Outras telas — sem alteração

---

## File List

- `src/utils/fruitEmoji.ts` — criado
- `src/components/WeekCard.tsx` — modificado (imports + Card 1 comparison metric)

---

## Dev Notes

Animação: `Animated.timing` com `Easing.inOut(Easing.sine)`, 900ms por half-cycle, loop via `Animated.sequence([in, out])`.  
Ref: `fruitScaleAnim` criado com `useRef(new Animated.Value(1))`.  
Web: `useNativeDriver: false` pois scale no web não suporta native driver.

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| 2026-04-29 | @sm | Story criada |
| 2026-04-29 | @po | GO — 10/10 (requisitos claros, scope definido, zero dependências) |
| 2026-04-29 | @dev | Implementação iniciada |
