# M.4 — Redesign Visual: Ferramentas e Config (Polimento Final)

**Epic:** Redesign Visual (M) — Sessão 4 de 4
**Status:** InReview
**Estimativa:** 5 pts
**Agente responsável:** @dev (Dex)
**Data de criação:** 2026-04-14

---

## User Story

Como usuária do DoceGestar, quero que as telas de Ferramentas e Configurações reflitam a mesma identidade visual moderna aplicada nas demais telas, com o botão de kick em gradiente magenta, glassmorphism nos cards e inputs com feedback visual ao focar, para que o app tenha consistência visual completa antes do lançamento na Play Store.

## Contexto

- **M.1 (Done):** `src/theme/colors.ts` — paleta magenta `#b30064` + teal `#00637f`
- **M.2 (Done):** Tab bar inferior + header redesenhados
- **M.3 (Done):** Dashboard, WeekCard, Timeline, Onboarding redesenhados
- **M.4 (esta story):** Últimas 2 telas com gap visual identificado na auditoria G-2
- **Gap identificado G-2:** KickCounter sem gradiente (cor sólida); Config sem border focus `#b30064`

---

## Acceptance Criteria

### 1. Ferramentas — KickCounter (`app/(tabs)/ferramentas.tsx`)

- [x] **AC-K1:** Botão de kick (`kickBtn`) substituído por `LinearGradient` com cores `[colors.primary, '#7a2d5a']`, mantendo dimensões circulares (160×160, borderRadius 80)
- [x] **AC-K2:** Texto do contador de chutes (número) permanece `NotoSerif_700Bold` 56px, cor `#ffffff`
- [x] **AC-K3:** Subtítulo "Toque para registrar chute" permanece visível, cor `rgba(255,255,255,0.85)`
- [x] **AC-K4:** Botão "Iniciar Sessão" / "Nova Sessão" (`primaryBtn`) usa `LinearGradient` com `[colors.primary, '#7a2d5a']`, `borderRadius: 12`
- [x] **AC-K5:** Botão "Encerrar Sessão" (`stopBtn`) mantém visual `errorContainer` atual — sem alteração

### 2. Ferramentas — Glassmorphism nos cards

- [x] **AC-G1:** `card` style atualizado para `backgroundColor: 'rgba(255,255,255,0.85)'` + `borderWidth: 1` + `borderColor: 'rgba(255,255,255,0.6)'`
- [x] **AC-G2:** Shadow do card intensificada: `shadowOpacity: 0.10`, `shadowRadius: 30`, `elevation: 4`

### 3. Ferramentas — ContractionTimer

- [x] **AC-C1:** Badge 3-1-1 (`isActive311`) usa `backgroundColor: colors.error`, texto `#ffffff` — mais visível que o `errorContainer` atual
- [x] **AC-C2:** Botão "Iniciar Contração" (`primaryBtn` no ContractionTimer) usa `LinearGradient` — mesma regra do AC-K4

### 4. Config (`app/(tabs)/config.tsx`)

- [x] **AC-CF1:** Input de nome e input de DPP têm `borderWidth: 1` + `borderColor: colors.border` em estado inativo
- [x] **AC-CF2:** Ao focar (`onFocus`), `borderColor` muda para `colors.primary` — via state local `focused`
- [x] **AC-CF3:** Ao desfocar (`onBlur`), `borderColor` volta para `colors.border`
- [x] **AC-CF4:** Input em erro continua exibindo `backgroundColor: colors.errorContainer` sem quebrar o border focus
- [x] **AC-CF5:** Botão "Salvar Alterações" usa `LinearGradient` com `[colors.primary, '#7a2d5a']`, `borderRadius: 12`

### 5. Requisitos Gerais

- [x] **AC-R1:** `npx tsc --noEmit` — zero erros após todas as alterações
- [x] **AC-R2:** Nenhuma lógica de negócio alterada — apenas estilos e imports visuais
- [x] **AC-R3:** `expo-linear-gradient` já instalado (M.3) — não instalar novamente
- [x] **AC-R4:** `npx expo export --platform web` — gera `dist/` sem erros

---

## Escopo Técnico — Arquivos a Modificar

| Arquivo | Tipo | Mudança Principal |
|---------|------|-------------------|
| `app/(tabs)/ferramentas.tsx` | Modificado | LinearGradient no kickBtn + primaryBtn; glassmorphism nos cards; badge 3-1-1 |
| `app/(tabs)/config.tsx` | Modificado | Focus state nos inputs; LinearGradient no saveBtn |

---

## Notas de Implementação para @dev

**LinearGradient já disponível (instalado em M.3):**
```tsx
import { LinearGradient } from 'expo-linear-gradient';
```

**kickBtn com gradiente (substituir TouchableOpacity wrapper interno):**
```tsx
<TouchableOpacity onPress={handleKick} activeOpacity={0.7}>
  <LinearGradient
    colors={[colors.primary, '#7a2d5a']}
    style={styles.kickBtn}
  >
    <Text style={styles.kickBtnText}>{count}</Text>
    <Text style={styles.kickBtnSub}>Toque para registrar chute</Text>
  </LinearGradient>
</TouchableOpacity>
```

**primaryBtn com gradiente (padrão reutilizável):**
```tsx
<TouchableOpacity onPress={handler}>
  <LinearGradient colors={[colors.primary, '#7a2d5a']} style={styles.primaryBtn}>
    <Text style={styles.primaryBtnText}>Texto</Text>
  </LinearGradient>
</TouchableOpacity>
```

**Config — focus state:**
```tsx
const [focusedField, setFocusedField] = useState<'name' | 'date' | null>(null);

// style dinâmico:
style={[
  styles.input,
  focusedField === 'name' && styles.inputFocused,
  dateError ? styles.inputError : null
]}
onFocus={() => setFocusedField('name')}
onBlur={() => setFocusedField(null)}

// no StyleSheet:
inputFocused: { borderColor: colors.primary, borderWidth: 1 },
input: { ..., borderWidth: 1, borderColor: colors.border }
```

---

## Riscos

| Risco | Mitigação |
|-------|-----------|
| LinearGradient não é View — não recebe `onPress` diretamente | Envolver em TouchableOpacity pai; LinearGradient é filho |
| Múltiplos `primaryBtn` em ferramentas.tsx | Refatorar para componente inline ou repetir padrão sem extrair componente |
| `inputError` + `inputFocused` conflito de estilos | Array de estilos do RN aplica último — erro tem precedência por ordem |

---

## QA Gate — Checklist

| # | Check | Critério |
|---|-------|----------|
| 1 | Code review | LinearGradient usado corretamente (filho de TouchableOpacity), tipagem OK |
| 2 | Unit tests | WAIVED (DT-001 aceito) |
| 3 | Acceptance criteria | Todos os 13 ACs verificados |
| 4 | No regressions | `tsc --noEmit` zero erros |
| 5 | Performance | LinearGradient declarativo — sem impacto |
| 6 | Security | Mudanças puramente visuais |
| 7 | Documentation | Story atualizada com Change Log |

---

## File List

- `app/(tabs)/ferramentas.tsx`
- `app/(tabs)/config.tsx`

---

## Change Log

- 2026-04-14 @sm (River) — Story M.4 criada (Draft)
- 2026-04-14 @po (Pax) — *validate-story-draft executado. Score 10/10 — VERDICT: GO ✅. Status: Draft → Ready.
- 2026-04-14 @dev (Dex) — Implementação M.4 concluída. 13/13 ACs implementados. `npx tsc --noEmit` zero erros. `npx expo export --platform web` OK (dist/ gerado, 1.6MB bundle). Arquivos modificados: `app/(tabs)/ferramentas.tsx` (LinearGradient kickBtn + primaryBtns, glassmorphism cards, badge311 vermelho), `app/(tabs)/config.tsx` (focus state inputs, LinearGradient saveBtn). Lógica de negócio intacta.
- 2026-04-14 @qa (Quinn) — QA Gate executado. **VERDICT: PASS** ✅ — 7/7 checks aprovados: (1) Code review: LinearGradient corretamente encapsulado, overflow:hidden em wrappers, zero imports não usados; (2) Unit tests: WAIVED (DT-001); (3) ACs: 13/13 implementados; (4) No regressions: tsc zero erros + web export OK; (5) Performance: LinearGradient declarativo; (6) Security: mudanças visuais puras; (7) Documentation: story atualizada. Status: InReview → Pronto para @devops push.
