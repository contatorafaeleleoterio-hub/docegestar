# M.3 — Redesign Visual: Dashboard, WeekCard, Timeline, Onboarding

**Epic:** Redesign Visual (M) — Sessão 3 de 4
**Status:** InProgress
**Estimativa:** 8 pts
**Agente responsável:** @dev (Dex)
**Data de criação:** 2026-04-12

---

## User Story

Como usuária do DoceGestar, quero que as telas principais — Dashboard, WeekCard, Timeline e Onboarding — reflitam a nova identidade visual com a paleta magenta + teal, tipografia NotoSerif e superfícies coesas, para que o app pareça moderno, acolhedor e visualmente consistente com o redesign aprovado.

## Contexto

- **M.1 (Done):** `src/theme/colors.ts` atualizado com paleta magenta `#b30064` + teal `#00637f`
- **M.2 (Done):** Tab bar inferior e header redesenhados com Ionicons + animação spring
- **M.3 (esta story):** Aplica o redesign às 4 telas/componentes de maior visibilidade do app
- **Referência de design:** `docegestar_timeline.html` na raiz do projeto

---

## Acceptance Criteria

### 1. Dashboard (`app/(tabs)/dashboard.tsx`)

- [x] **AC-D1:** Hero card com fundo em gradiente linear `[colors.primary, '#7a2d5a']` via `expo-linear-gradient`, `borderRadius: 24`, ocupando largura total do container
- [x] **AC-D2:** Número da semana exibido em `NotoSerif_700Bold` 56px, cor `#ffffff`, sobre o hero
- [x] **AC-D3:** Label de trimestre/fase em `NotoSerif_400Regular` 16px, cor `rgba(255,255,255,0.85)`
- [x] **AC-D4:** Cards de métricas (tamanho do bebê, countdown, frase motivacional) com `backgroundColor: colors.surface`, `borderRadius: 20`, sombra `shadows.editorial` (ou equivalente já usado no arquivo)
- [x] **AC-D5:** Botão share: `backgroundColor: colors.primary`, texto `#ffffff`, `borderRadius: 24`, ícone `Ionicons share-social-outline` size 18 à esquerda do texto
- [x] **AC-D6:** `expo-linear-gradient` adicionado ao `package.json` como dependência explícita

### 2. WeekCard (`src/components/WeekCard.tsx`)

- [x] **AC-W1:** `headerCard` exibe borda superior de 4px na cor do trimestre ativo — `colors.trimester1` (sem. 1–13), `colors.trimester2` (sem. 14–26), `colors.trimester3` (sem. 27–40)
- [x] **AC-W2:** Badge de trimestre usa `backgroundColor` do trimestre ativo + texto `#ffffff`
- [x] **AC-W3:** `progressBarFill` usa cor do trimestre ativo como `backgroundColor`
- [x] **AC-W4:** `babyBadge` usa `backgroundColor: colors.secondaryContainer`, texto `colors.secondary`
- [x] **AC-W5:** `newBadge` usa `backgroundColor: colors.primaryContainer`, texto `colors.primary`
- [x] **AC-W6:** `saveTipBtnSaved` (estado "salvo") usa `backgroundColor: colors.primary`, ícone/texto `#ffffff`
- [x] **AC-W7:** `SectionTitle` — cor do texto atualizada para `colors.primary` em todos os módulos do card

### 3. Timeline (`app/(tabs)/timeline.tsx`)

- [x] **AC-T1:** Célula da semana atual: `backgroundColor: colors.primary`, número `#ffffff`, `fontWeight: '700'`
- [x] **AC-T2:** Células concluídas: `backgroundColor: colors.secondaryContainer`, ícone ✓ na cor `colors.secondary`
- [x] **AC-T3:** Células futuras/bloqueadas: `backgroundColor: colors.surfaceContainerHighest`, ícone 🔒 na cor `colors.onSurfaceVariant`
- [x] **AC-T4:** Header de cada trimestre ("1° Trimestre" etc.) exibe faixa colorida de 6px de altura na cor `colors.trimesterN` como decoração lateral ou superior do bloco
- [x] **AC-T5:** Legend atualizada com amostras visuais das 3 cores exatas de AC-T1/T2/T3 e rótulos correspondentes
- [x] **AC-T6:** Progress badge ("X de 40 semanas concluídas"): `backgroundColor: colors.secondaryContainer`, texto `colors.secondary`, `borderRadius: 20`

### 4. Onboarding (`app/onboarding.tsx`)

- [x] **AC-O1:** Dots de progresso: ativo = `colors.primary` (12px), concluído = `colors.secondary` (8px), futuro = `colors.surfaceContainerHighest` (8px)
- [x] **AC-O2:** Botão "Próximo" / "Concluir": `backgroundColor: colors.primary`, texto `#ffffff`, `borderRadius: 24`
- [x] **AC-O3:** Botão "Voltar": `backgroundColor: transparent`, texto `colors.primary`, `borderRadius: 24`
- [x] **AC-O4:** Título de cada step em `NotoSerif_700Bold` 24px, cor `colors.onSurface`
- [x] **AC-O5:** `TextInput` com `borderColor: colors.primary` quando focado, `colors.outline` quando inativo (via state `focused`)

### 5. Requisitos Gerais

- [x] **AC-G1:** `npx tsc --noEmit` — zero erros após todas as alterações
- [x] **AC-G2:** Nenhuma importação não-utilizada introduzida em nenhum dos 4 arquivos
- [x] **AC-G3:** Nenhuma lógica de negócio alterada — apenas estilos e imports visuais

---

## Escopo Técnico — Arquivos a Modificar

| Arquivo | Tipo | Mudança Principal |
|---------|------|-------------------|
| `app/(tabs)/dashboard.tsx` | Modificado | Hero gradiente, cards métricas, botão share |
| `src/components/WeekCard.tsx` | Modificado | Bordas trimestre, badges, progress bar, SectionTitle |
| `app/(tabs)/timeline.tsx` | Modificado | Células, headers trimestre, legend, progress badge |
| `app/onboarding.tsx` | Modificado | Dots, botões, inputs focados, tipografia headings |
| `package.json` | Modificado | `expo-linear-gradient` adicionado |
| `package-lock.json` | Modificado | Lock file atualizado |

---

## Notas de Implementação para @dev

**Dashboard:**
```tsx
import { LinearGradient } from 'expo-linear-gradient';
// instalar: npx expo install expo-linear-gradient
<LinearGradient colors={[colors.primary, '#7a2d5a']} style={styles.heroCard}>
```

**WeekCard — cor do trimestre ativo:**
```ts
function trimesterColor(week: number) {
  if (week <= 13) return colors.trimester1;
  if (week <= 26) return colors.trimester2;
  return colors.trimester3;
}
```

**Onboarding — input focado:**
```tsx
const [focused, setFocused] = React.useState(false);
<TextInput
  onFocus={() => setFocused(true)}
  onBlur={() => setFocused(false)}
  style={[styles.input, focused && styles.inputFocused]}
/>
// styles.inputFocused: { borderColor: colors.primary }
```

---

## Riscos

| Risco | Mitigação |
|-------|-----------|
| `WeekCard` é o componente mais complexo (28KB, 7 módulos) | Alterar apenas `StyleSheet` e `TIP_CATEGORY_COLORS`; não tocar em lógica de hooks |
| `expo-linear-gradient` pode conflitar com Expo SDK 55 | Usar `npx expo install` para versão compatível; fallback: `backgroundColor: colors.primary` sólido |
| `onboarding.tsx` tem handlers acoplados ao layout | Alterar apenas propriedades de estilo e adicionar `onFocus`/`onBlur` nos inputs |

---

## QA Gate — Checklist

| # | Check | Critério |
|---|-------|----------|
| 1 | Code review | Tipagem correta, sem magic numbers, sem imports não usados |
| 2 | Unit tests | WAIVED (DT-001 aceito) |
| 3 | Acceptance criteria | Todos os 18 ACs verificados visualmente no Expo Go |
| 4 | No regressions | `npx tsc --noEmit` zero erros |
| 5 | Performance | LinearGradient declarativo — sem impacto em re-renders |
| 6 | Security | Mudanças puramente visuais — nenhuma superfície de ataque |
| 7 | Documentation | Story atualizada com Change Log completo |

---

## Change Log

- 2026-04-12 @sm (River) — Story M.3 criada (Draft)
- 2026-04-13 @sm (River) — Story checklist 10/10 executado; draft revisado e promovido para Ready (pré-validação @po)
- 2026-04-13 @po (Pax) — *validate-story executado. Score 10/10 — VERDICT: GO ✅. Status confirmado: Ready. Observações não-bloqueantes: (1) AC-D4 `colors.surface` = confirmar alinhamento com token `surfaceContainerLowest`; (2) consultar `docegestar_timeline.html` para AC-T4 fidelidade visual; (3) `TIP_CATEGORY_COLORS` hardcoded em WeekCard L22-27 fora de escopo M.3, candidato a M.4.
- 2026-04-13 @dev (Dex) — Implementação M.3 concluída. 18/18 ACs implementados. `npx tsc --noEmit` zero erros. Arquivos modificados: `app/(tabs)/dashboard.tsx` (hero LinearGradient, metric cards, share button com Ionicons), `src/components/WeekCard.tsx` (border trimestre, trimesterBadge, babyBadge, newBadge, saveTipBtn, sectionTitle), `app/(tabs)/timeline.tsx` (células concluídas, checkmark, legend, progressBadge, borderLeft 6px), `app/onboarding.tsx` (dots, botões, inputFocused, stepTitle). Dependência `expo-linear-gradient` instalada via `npx expo install`.
