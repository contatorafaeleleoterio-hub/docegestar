# Story M.1 — Design Tokens: Atualização do Theme System

> **Epic:** Redesign Visual (M) — Sessão 1 de 4  
> **Status:** InReview  
> **Estimativa:** 3 pts  
> **Agente responsável:** @dev (Dex)  
> **Data de criação:** 2026-04-12  

---

## Descrição

Como equipe de desenvolvimento, precisamos atualizar o sistema de design tokens (`src/theme/colors.ts`) para refletir a nova identidade visual aprovada do `docegestar.zip`, substituindo a paleta "The Ethereal Cradle" (ferrugem/âmbar) pela nova paleta magenta + teal. Esta é a fundação do redesign completo — sem ela, as sessões M.2–M.4 não podem aplicar as cores corretas.

---

## Acceptance Criteria

- [x] `primary` atualizado: `#9a442d` → `#b30064` (magenta)
- [x] `secondary` atualizado: `#8e4e14` → `#00637f` (teal)
- [x] `background` / `surface` atualizados: `#fbf9f5` → `#f3f7fb`
- [x] Todas as chaves existentes mantidas (zero quebra de imports em outros arquivos)
- [x] App compila sem erros TypeScript (`npx tsc --noEmit` passa)
- [ ] Mudança de cores visualmente perceptível (magenta no lugar de ferrugem)

---

## Escopo

**IN:** `src/theme/colors.ts` — mapeamento completo da nova paleta  
**OUT:** `typography.ts`, `borderRadius.ts`, `spacing.ts`, `shadows.ts` — inalterados  
**OUT:** Qualquer arquivo de tela ou componente — inalterado nesta sessão

---

## Dependências

- **Prerequisito:** Nenhuma story anterior pendente
- **Bloqueio para:** M.2 (tab nav), M.3 (telas), M.4 (ferramentas)
- **Referência:** `C:\Users\USUARIO\Downloads\docegestar_extracted\src\index.css`

---

## Riscos

- Cores de superfície mudam de tom quente (creme) para frio (azul-acinzentado) — pode impactar legibilidade em componentes que assumiam fundo creme. Mitigação: verificar contraste nas 7 telas principais no `npx expo start`.

---

## Critérios de Done

- [x] `colors.ts` atualizado com nova paleta completa
- [x] `npx tsc --noEmit` → zero erros
- [ ] Story status: Done
- [ ] @devops push executado

---

## File List

| Arquivo | Ação |
|---------|------|
| `src/theme/colors.ts` | MODIFIED |

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| 2026-04-12 | @sm (River) | Story criada — Status: Draft |
| 2026-04-12 | @po (Pax) | Validação 10/10 — GO — Status: Draft → Ready |
| 2026-04-12 | @dev (Dex) | Iniciando implementação — Status: Ready → InProgress |
| 2026-04-12 | @dev (Dex) | colors.ts atualizado (paleta completa), npx tsc --noEmit PASS |
| 2026-04-12 | @qa (Quinn) | QA Gate PASS (observação: AC visual pendente de runtime) — Status: InProgress → InReview |
