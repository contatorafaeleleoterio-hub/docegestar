# Plano Sessão 1 — ONB-2 (Date Utils) + ONB-3 (6 Componentes UI Base)

## Context

Após ONB-1 Done (commit `c92203e` + `d7a4074`: tabela `migrations` + colunas `relationship`, `plan`, `plan_expires_at`), a Sessão 1 do roteiro Onboarding v2.1 entrega a **fundação não-visual** das próximas 5 sessões:

- **ONB-2** — `src/utils/dateUtils.ts`: cálculos gestacionais (Naegele LMP+280d, concepção+266d, métricas DPP) + setup Jest com testes de regressão.
- **ONB-3** — 6 componentes em `src/components/ui/` (diretório novo): `FloatingLabelInput`, `FloatingLabelSelect`, `MethodCard`, `ProgressDots`, `PrimaryButton`, `GradientButton` + barrel `index.ts`.

**Por que esta sessão entrega só "infra" sem telas:** ONB-7/8/10 dependem 100% destes componentes; sem eles, o trabalho de UI quebra em cascata. Isolar a fundação garante que a Sessão 2 (BottomSheet/Context) e seguintes não sejam contaminadas por bugs de baixo nível.

**Plano-mestre referência:** `C:\Users\USUARIO\.claude\plans\me-mostre-o-plano-cached-ocean.md`
**Spec UX/UI:** `docs/master/onboarding_spec_v2.md`

---

## Pré-Condições

| Item | Status | Verificação |
|------|--------|-------------|
| ONB-1 Done | ✅ | commits `c92203e`, `d7a4074` em `master` |
| `src/utils/date.ts` intacto | ✅ | parseDateBR/toISO/isoToBR/isDateOutOfRange — **NÃO sobrescrever** |
| `src/theme/index.ts` | ✅ | exporta `colors`, `typography`, `spacing`, `borderRadius`, `shadows` |
| `expo-linear-gradient` | ✅ | em `dependencies` (~55.0.13) |
| `src/components/ui/` | ❌ | **diretório não existe** — criar |
| `jest` / `jest-expo` em devDependencies | ❌ | script `"test": "jest"` existe mas runner não instalado |

---

## Story ONB-2 — Date Utils

### Arquivos

| Path | Ação |
|------|------|
| `src/utils/dateUtils.ts` | **CRIAR** — funções de cálculo DPP |
| `__tests__/dateUtils.test.ts` | **CRIAR** — diretório novo na raiz |
| `package.json` | **MODIFICAR** — adicionar devDeps + bloco `jest` |
| `jest.config.js` | **CRIAR** se preset `jest-expo` exigir |

### Spec funcional de `src/utils/dateUtils.ts`

```typescript
/**
 * Calcula DPP a partir da data da última menstruação (Regra de Naegele: LMP + 280 dias).
 * @param lmpISO  data ISO 'YYYY-MM-DD' (ex: '2026-01-30')
 * @returns       data ISO da DPP estimada
 * @throws        Error se lmpISO inválido
 */
calcDPPFromLMP(lmpISO: string): string

/**
 * Calcula DPP a partir da data de concepção (concepção + 266 dias).
 */
calcDPPFromConception(concISO: string): string

/**
 * Métricas gestacionais a partir da DPP.
 * @param dueISO  data ISO da DPP
 * @returns       métricas formatadas (pt-BR) e numéricas
 */
calcGestationMetrics(dueISO: string): {
  dppFormatted: string;     // "4 de outubro de 2026" (locale pt-BR)
  weeksElapsed: number;     // Math.floor(daysElapsed / 7) — NÃO Math.round
  daysElapsed: number;      // dia atual no ciclo de 280 dias
  weeksRemaining: number;   // Math.floor((280 - daysElapsed) / 7)
  daysRemaining: number;    // 280 - daysElapsed
}
```

### Convenções obrigatórias

- **Datas em UTC com hora 00:00:00:** usar `new Date('YYYY-MM-DDT00:00:00')` para evitar drift por fuso. Nunca `new Date(string)` cru.
- **Formatação pt-BR:** `new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)` → "4 de outubro de 2026".
- **`weeksElapsed` usa `Math.floor`:** semana 16 = dias 112-118; nunca arredondar para cima.
- **Negativos clamped a 0:** se a DPP já passou ou se LMP está no futuro, retornar 0 em todos os campos numéricos (não negativos).
- **Validação:** `isNaN(date.getTime())` → lançar `new Error('Invalid date: <input>')` com mensagem útil.

### Casos de teste obrigatórios — `__tests__/dateUtils.test.ts`

| # | Cenário | Esperado |
|---|---------|----------|
| 1 | `calcDPPFromLMP('2026-01-30')` | `'2026-11-06'` (LMP + 280 dias) |
| 2 | `calcDPPFromConception('2026-02-13')` | `'2026-11-06'` (conception + 266 dias) |
| 3 | `calcDPPFromLMP('xyz')` | lança `Error` com 'Invalid date' |
| 4 | `calcGestationMetrics(DPP+0d)` (hoje = DPP) | `weeksElapsed=40, daysElapsed=280, weeksRemaining=0` |
| 5 | `calcGestationMetrics(dueISO=hoje+140d)` (semana 20) | `weeksElapsed=20, daysElapsed=140, weeksRemaining=20, daysRemaining=140` |
| 6 | `calcGestationMetrics(dueISO=hoje-30d)` (DPP passada) | `weeksElapsed=40, weeksRemaining=0, daysRemaining=0` (clamp) |
| 7 | `calcGestationMetrics(dueISO=hoje+300d)` (LMP no futuro) | todos os campos numéricos = 0 (clamp) |
| 8 | `dppFormatted` contém "outubro" para `'2026-10-04'` | string em pt-BR |
| 9 | Boundary semana: dia 111 → `weeksElapsed=15`; dia 112 → `weeksElapsed=16` | `Math.floor` correto |

### Setup Jest

**Adicionar em `package.json`:**

```json
"devDependencies": {
  ...,
  "jest": "~29.7.0",
  "jest-expo": "~55.0.0",
  "@types/jest": "~29.5.12"
},
"jest": {
  "preset": "jest-expo",
  "testMatch": ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg))"
  ]
}
```

> Versões exatas: validar via `npx expo install jest-expo` (Expo SDK 55 alinha versões automaticamente). Se Expo recomendar versões diferentes, usar as recomendadas pelo Expo.

### QA Gate ONB-2

```powershell
npm install                                     # PASS — instala jest-expo
npm run typecheck                               # PASS — 0 erros
npm test -- __tests__/dateUtils.test.ts         # PASS — 9/9 testes
```

---

## Story ONB-3 — 6 Componentes UI Base

### Diretório

**Criar** `src/components/ui/` (não existe).

### Arquivos

| # | Path | Responsabilidade |
|---|------|-----------------|
| 1 | `src/components/ui/FloatingLabelInput.tsx` | Input com label flutuante via `Animated.Value` |
| 2 | `src/components/ui/FloatingLabelSelect.tsx` | Dropdown via `<Modal transparent>` |
| 3 | `src/components/ui/MethodCard.tsx` | Card radio-style para método DPP |
| 4 | `src/components/ui/ProgressDots.tsx` | ●○○ — indicador de etapa |
| 5 | `src/components/ui/PrimaryButton.tsx` | Botão sólido com estado disabled |
| 6 | `src/components/ui/GradientButton.tsx` | LinearGradient (primaryDeep → primary) |
| 7 | `src/components/ui/index.ts` | Barrel export (named) |

### Specs por componente

#### 1. `FloatingLabelInput.tsx`

**Props:**
```typescript
interface FloatingLabelInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  maxLength?: number;
  testID?: string;
}
```

**Implementação:**
- `Animated.Value` interno: `0` (label centralizada vertical) → `1` (label flutuou para topo).
- Trigger: `useEffect(() => animate(value || isFocused ? 1 : 0), [value, isFocused])`.
- `useNativeDriver: false` **obrigatório** — interpola `fontSize`, `top`, `color` (não-transformáveis).
- Container: altura 60, `borderRadius: borderRadius.xl` (12), `borderWidth: 1`, `paddingHorizontal: spacing[4]` (16), `paddingTop: 20`.
- Border color por estado:
  - Default: `colors.border` (#E5E7EB)
  - Focused: `colors.primary` (#DB2777)
  - Error: `colors.error` (#B91C1C)
- Label animado:
  - Pos 0: `top: 18, fontSize: 16, color: colors.textSecondary`
  - Pos 1: `top: 8, fontSize: 12, color: colors.primary` (ou error)
- Erro: `<Text style={typography.caption}>` abaixo do input com `color: colors.error`.
- Acessibilidade: `accessibilityLabel={label}`, `accessibilityState={{ invalid: !!error }}`.

#### 2. `FloatingLabelSelect.tsx`

**Props:**
```typescript
interface FloatingLabelSelectProps<T extends string> {
  label: string;
  value: T | null;
  options: ReadonlyArray<{ label: string; value: T }>;
  onChange: (value: T) => void;
  error?: string;
  testID?: string;
}
```

**Implementação:**
- Visual idêntico ao `FloatingLabelInput` (reusar estilos via composição interna ou copiar — não criar dependência).
- `<TouchableOpacity>` abre `<Modal transparent animationType="fade">` full-screen.
- Modal: overlay `colors.overlay`, painel central com lista de `<TouchableOpacity>` (uma por opção).
- Selected option destacada com `backgroundColor: colors.primaryLight` e check `<Ionicons name="checkmark" color={colors.primary} />`.
- Dismiss: tap no overlay ou seleção fecha.
- Acessibilidade: `accessibilityRole="combobox"`, opções com `accessibilityRole="menuitem"`.

#### 3. `MethodCard.tsx`

**Props:**
```typescript
interface MethodCardProps {
  icon: keyof typeof Ionicons.glyphMap;  // ex: 'medkit-outline'
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
  testID?: string;
}
```

**Implementação:**
- `<TouchableOpacity>` com `accessibilityRole="radio"` e `accessibilityState={{ selected }}`.
- Estado não-selecionado: `borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface`.
- Estado selecionado: `borderWidth: 2, borderColor: colors.primary, backgroundColor: colors.primaryLight`.
- Layout: row — Ionicons (28px, `colors.primary`) + coluna [title `typography.h3`, description `typography.bodySmall, color: colors.textSecondary`].
- `borderRadius: borderRadius['2xl']` (16), `padding: spacing[4]` (16), `marginBottom: spacing[3]` (12).

#### 4. `ProgressDots.tsx`

**Props:**
```typescript
interface ProgressDotsProps {
  total: number;
  current: number;  // 1-based
  testID?: string;
}
```

**Implementação:**
- Row de `total` `<View>` redondas (8x8), gap `spacing[2]` (8).
- Dot ativo (índice `< current`): `backgroundColor: colors.primary`.
- Dot inativo: `backgroundColor: colors.border`.
- Container: `accessibilityLabel={`Etapa ${current} de ${total}`}`.

#### 5. `PrimaryButton.tsx`

**Props:**
```typescript
interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'solid' | 'outline';  // default 'solid'
  testID?: string;
}
```

**Implementação:**
- `<TouchableOpacity activeOpacity={0.8}>`, altura 56, `borderRadius: borderRadius.pill` (32), centro alinhado.
- Solid: `backgroundColor: colors.primary`, label `colors.onPrimary`, `typography.label`.
- Outline: `borderWidth: 1.5, borderColor: colors.primary, backgroundColor: 'transparent'`, label `colors.primary`.
- `disabled`: `opacity: 0.5`, `disabled` prop nativo no TouchableOpacity.
- Acessibilidade: `accessibilityRole="button"`, `accessibilityState={{ disabled }}`.

#### 6. `GradientButton.tsx`

**Props:** mesmas de `PrimaryButton` minus `variant`.

**Implementação:**
- `<TouchableOpacity>` envolvendo `<LinearGradient colors={[colors.primaryDeep, colors.primary]} start={{x:0,y:0}} end={{x:1,y:0}}>`.
- Mesmo formato/altura/borderRadius/typography do PrimaryButton solid.
- `disabled`: `opacity: 0.5`.
- Import: `import { LinearGradient } from 'expo-linear-gradient'` (já instalado).

#### 7. `src/components/ui/index.ts`

```typescript
export { FloatingLabelInput } from './FloatingLabelInput';
export { FloatingLabelSelect } from './FloatingLabelSelect';
export { MethodCard } from './MethodCard';
export { ProgressDots } from './ProgressDots';
export { PrimaryButton } from './PrimaryButton';
export { GradientButton } from './GradientButton';
```

### Convenções de código (todos os componentes)

- **Imports tema:** `import { colors, typography, spacing, borderRadius } from '@/theme'` se alias estiver setado; senão path relativo `'../../theme'`. **Verificar `tsconfig.json` antes de editar primeiro arquivo.**
- **`StyleSheet.create`:** todos os estilos. Sem inline `style={{...}}` exceto valores dinâmicos.
- **Sem comentários:** apenas onde houver invariante não-óbvia (ex: por que `useNativeDriver: false`).
- **Sem PropTypes** (TypeScript).
- **`testID`** em todos componentes para QA visual futuro.

### QA Gate ONB-3

```powershell
npm run typecheck                               # PASS — 0 erros
npx expo export --platform web                  # PASS — bundle compila sem erros
```

> Sem teste visual nesta sessão — componentes serão exercitados nas Sessões 3-5 quando integrados às telas.

---

## Sequência AIOX (Workflow SDC)

Para **cada** story (ONB-2, depois ONB-3):

| Fase | Agente | Output |
|------|--------|--------|
| 1. Create | `@sm` | `docs/stories/ONB-{N}.story.md` (Draft) |
| 2. Validate | `@po` | 10-point checklist → status `Ready` |
| 3. Implement | `@dev` | arquivos do escopo + checkboxes File List |
| 4. QA Gate | `@qa` | typecheck + (test/bundle) PASS |
| 5. Push | `@devops` | commit + push origin/master |

**Commits separados:**
- `feat(onb2): add dateUtils with Naegele DPP calculations + jest setup`
- `feat(onb3): add 6 base UI components for onboarding flow`

---

## Arquivos Críticos (resumo)

### Criar
- `src/utils/dateUtils.ts`
- `__tests__/dateUtils.test.ts`
- `src/components/ui/FloatingLabelInput.tsx`
- `src/components/ui/FloatingLabelSelect.tsx`
- `src/components/ui/MethodCard.tsx`
- `src/components/ui/ProgressDots.tsx`
- `src/components/ui/PrimaryButton.tsx`
- `src/components/ui/GradientButton.tsx`
- `src/components/ui/index.ts`
- `docs/stories/ONB-2.story.md`
- `docs/stories/ONB-3.story.md`

### Modificar
- `package.json` — devDependencies (jest, jest-expo, @types/jest) + bloco `jest`

### Reutilizar (NÃO modificar)
- `src/utils/date.ts` — parseDateBR, formatDateInput, toISO, isoToBR, isDateOutOfRange (já existem; complementam dateUtils.ts)
- `src/theme/*` — colors.ts, typography.ts, spacing.ts, borderRadius.ts (tokens canônicos)

---

## Verificação Final da Sessão

```powershell
# 1. Após ONB-2:
npm install                                     # jest-expo instalado
npm run typecheck                               # 0 erros
npm test -- __tests__/dateUtils.test.ts         # 9/9 PASS

# 2. Após ONB-3:
npm run typecheck                               # 0 erros
npx expo export --platform web                  # bundle PASS

# 3. Commits no master:
git log --oneline -3
# Esperado: feat(onb3)..., feat(onb2)..., d7a4074
```

**Critérios de Done da Sessão 1:**
- [ ] ONB-2 commit `feat(onb2):` em master
- [ ] ONB-3 commit `feat(onb3):` em master
- [ ] `npm test` passa (jest configurado)
- [ ] `npm run typecheck` passa
- [ ] `LAUNCH-TRACK.md`: ONB-2 e ONB-3 marcadas ✅ Done
- [ ] `SESSION_HANDOFF.md` atualizado com próxima ação (Sessão 2: ONB-4 + ONB-5)

---

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| `jest-expo` versão incompatível com SDK 55 | Usar `npx expo install jest-expo` em vez de `npm install` direto — Expo resolve versão correta |
| `useNativeDriver: false` causa jank em label flutuante | Aceitável — `fontSize`/`top` não suportam native driver. Animação 200ms — imperceptível |
| Alias `@/theme` não configurado | Verificar `tsconfig.json` antes — fallback para path relativo `'../../theme'` |
| Boundary semana off-by-one (dia 112 vs 113) | Teste #9 cobre — `Math.floor(daysElapsed / 7)` é a fórmula clínica correta |
| Modal do `FloatingLabelSelect` em iOS clipa por safe area | Container do painel com `marginHorizontal: spacing[4]` + `maxHeight: '70%'` |

---

## Próxima Sessão (Sessão 2 do roteiro)

**Iniciar com:** `/gestor` → ONB-4 (BottomSheet + GestationCounter) + ONB-5 (OnboardingContext + saveOnboardingProfile)
