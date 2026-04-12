# Story M.2 — Tab Navigation + Header: Redesign Visual

> **Epic:** Redesign Visual (M) — Sessão 2 de 4  
> **Status:** Done  
> **Estimativa:** 5 pts  
> **Agente responsável:** @dev (Dex)  
> **Data de criação:** 2026-04-12  

---

## User Story

Como usuária do DoceGestar, quero uma navegação inferior com identidade visual renovada — ícones reais, animações suaves e destaque em magenta — para que o app pareça moderno e coeso com a nova paleta de cores.

---

## Acceptance Criteria

- [x] Tab bar inferior usa ícones Ionicons (não emojis)
- [x] Tab ativa exibe pill animado com `colors.primary` (`#b30064`)
- [x] Animação spring ao trocar de tab (tension 300, friction 20)
- [x] Header com título "DoceGestar" em `NotoSerif_700Bold` cor primary
- [x] Header right: ícone de perfil navega para `/(tabs)/config`
- [x] `useSafeAreaInsets` — paddingBottom dinâmico no tab bar
- [x] Shadow iOS + elevation Android no tab bar e header
- [x] `@expo/vector-icons` adicionado como dependência

---

## Escopo Técnico

### Arquivos Modificados

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `app/(tabs)/_layout.tsx` | Modificado | Reescrita completa — CustomTabBar + Header |
| `app/_layout.tsx` | Modificado | Header shadow/elevation alinhado |
| `package.json` | Modificado | `@expo/vector-icons: ^15.1.1` adicionado |
| `package-lock.json` | Modificado | Lock file atualizado |

### Implementação

**CustomTabBar:**
- `TABS` array tipado com name, title, icon, iconActive
- `TabItem` com `Animated.spring` pill (width 44, height 32, borderRadius 16)
- `AnimatedView` interpola cor `rgba(179,0,100,0)` → `colors.primary`
- `BottomTabBarProps` do `@react-navigation/bottom-tabs`

**Header:**
- `HeaderTitle` — `NotoSerif_700Bold`, fontSize 18, color primary
- `HeaderRight` — `Ionicons person-circle-outline` size 28 → `/(tabs)/config`
- `headerTitleAlign: 'center'`

**Dependency:**
- `@expo/vector-icons ^15.1.1` (já incluído no Expo SDK, adicionado explicitamente)

---

## QA Gate

| Check | Resultado |
|-------|-----------|
| 1. Code review | PASS — tipagem correta, sem magic numbers, acessibilidade (accessibilityRole/Label) |
| 2. Unit tests | WAIVED (DT-001 aceito) |
| 3. Acceptance criteria | PASS — todos os 8 ACs atendidos |
| 4. No regressions | PASS — `npx tsc --noEmit` zero erros |
| 5. Performance | PASS — spring animation com `useNativeDriver: false` (necessário para backgroundColor) |
| 6. Security | PASS — nenhuma superfície de ataque |
| 7. Documentation | PASS — story completa, SESSION-HANDOFF atualizado |

**Veredicto:** ✅ QA PASS

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| 2026-04-12 | @sm (River) | Story criada — Status: Draft |
| 2026-04-12 | @po (Pax) | Validação GO — Status: Draft → Ready |
| 2026-04-12 | @dev (Dex) | Implementação: CustomTabBar + Header + @expo/vector-icons — Status: Ready → InReview |
| 2026-04-12 | @qa (Quinn) | QA Gate PASS (7/7, DT-001 WAIVED) — Status: InReview → Done |
| 2026-04-12 | @devops (Gage) | git push origin master — Story: Done |
