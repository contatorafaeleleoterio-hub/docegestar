# FX-2 — Sprint Responsividade & Safe-Area (Redmi Note 9)

> **Status:** Plano aprovado em 2026-05-15 — pronto para implementação na próxima sessão.
> **Tipo:** Sprint UX / correção de layout (Regra 5 — Design Gap).
> **Plano espelho:** `C:\Users\USUARIO\.claude\plans\o-design-atualizado-est-expressive-valiant.md`

---

## 1. Context

O design redesenhado (sessões RD-1..RD-7, plano canônico
`docs/plans/redesign-moderno-suave.md`) está **aprovado pelo usuário em
2026-05-15** e **não deve sofrer nenhuma alteração visual** — apenas correção
de layout.

Em um **Redmi Note 9** (Xiaomi, tela 6.53", 1080×2340 px, aspect ratio
~19.5:9, MIUI) o app apresenta 3 falhas:

1. **Textos estouram a tela** — o MIUI permite ampliar a fonte do sistema; o
   app não limita esse fator de escala, então títulos e nomes longos vazam.
2. **Botões escondidos atrás do menu flutuante** — a tab bar é
   `position: absolute` e ocupa ~118 px no fundo da tela; os ScrollViews não
   reservam folga suficiente, então CTAs ficam atrás dela.
3. **Scroll chega ao limite cedo** — `paddingBottom` inconsistente entre telas;
   `app/(tabs)/bebe.tsx` não tem nenhum.

**Resultado esperado:** mesma identidade visual aprovada, mas todo o conteúdo
acessível e legível em telas altas (19.5:9) e com a fonte ampliada do MIUI.

---

## 2. Análise da equipe (AIOX)

| Agente | Análise |
|--------|---------|
| **@sm** (River) | Story única de correção; escopo fechado em ~13 arquivos; sem dependências externas. |
| **@po** (Pax) | Valor: destrava uso real no aparelho do usuário; critério de Done = todos os CTAs acessíveis em 360/393/412 dp + fonte máx. do sistema. |
| **@ux-design-expert** (Uma) | Folga inferior padronizada e topo respeitando o notch. Design aprovado preservado: só espaçamento muda — nenhuma cor, fonte, componente ou hierarquia. |
| **@architect** (Aria) | Causa-raiz: ausência de `SafeAreaProvider` na raiz + valores de padding hardcoded espalhados. Solução: provider raiz + 1 hook compartilhado. **Sem wrapper de tela novo** — refactor evitado conforme decisão "correção direcionada por tela". |
| **@dev** (Dex) | Correção tela a tela reutilizando o hook `useBottomSpacing`. Implementação determinística. |
| **@qa** (Quinn) | Validar em 3 larguras (360/393/412 dp) + fonte do sistema no máximo. Typecheck baseline = 14 erros (0 novos). Sem regressões visuais. |
| **@devops** (Gage) | 1 commit; EAS build opcional após aprovação visual no web preview. |

---

## 3. Causas-raiz confirmadas (exploração do código)

| # | Arquivo | Problema |
|---|---------|----------|
| 1 | `app/_layout.tsx` | Sem `SafeAreaProvider` raiz; sem teto de `maxFontSizeMultiplier`. |
| 2 | `app/(tabs)/_layout.tsx` | Tab bar flutuante (`bottom: insets.bottom + 10`, altura interna ~52 px) sem folga reservada nas telas. |
| 3 | `app/(tabs)/bebe.tsx` | ScrollView **sem `paddingBottom`** — CTA atrás da tab bar (crítico). |
| 4 | `app/(tabs)/explorar.tsx` | FlatList `contentContainerStyle.paddingBottom: 40` — insuficiente. |
| 5 | `app/(tabs)/dashboard.tsx` | `paddingBottom: 120` fixo — não respeita `insets.bottom`. |
| 6 | `app/birth-plan.tsx`, `nursery.tsx`, `appointments.tsx`, `meds.tsx`, `exams.tsx` | `paddingBottom: spacing[10]` (~40 px) — insuficiente. |
| 7 | `app/meds.tsx` (~ln 191) | Nome do medicamento sem `numberOfLines` → estoura. |
| 8 | `app/(tabs)/ferramentas.tsx` | ScrollViews aninhados — auditar folga inferior. |
| 9 | `app/(tabs)/perfil.tsx`, `diario.tsx` | Já usam `insets.bottom + 120` (padrão correto) — normalizar para o hook. |

> **Nota de roteamento:** rotas em `app/` (raiz) — `birth-plan`, `nursery`,
> `appointments`, `meds`, `exams` — são telas empilhadas (Stack) e **não exibem
> a tab bar flutuante**. Precisam apenas de folga para a barra de navegação do
> Android (`insets.bottom`). Telas em `app/(tabs)/` exibem a tab bar e precisam
> da folga total. O hook trata os dois casos.

---

## 4. Plano de correção (direcionado por tela)

### Decisões aprovadas pelo usuário
- **Abordagem:** correção direcionada por tela (sem wrapper `SafeScreen`).
- **Fonte do MIUI:** limitar ampliação via `maxFontSizeMultiplier` (não travar).
- **Design:** aprovado e congelado — só layout muda.

### 4.1 — Base compartilhada

**`app/_layout.tsx`**
- Envolver a árvore renderizada com `<SafeAreaProvider>` de
  `react-native-safe-area-context` (já instalado, v5.6.2). Ordem sugerida:
  `<SafeAreaProvider><ErrorBoundary>...</ErrorBoundary></SafeAreaProvider>`.
- Adicionar teto global de escala de fonte, no corpo do componente raiz:
  ```ts
  import { Text, TextInput } from 'react-native';

  // @ts-expect-error defaultProps existe em runtime
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.maxFontSizeMultiplier = 1.3;
  // @ts-expect-error idem
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.maxFontSizeMultiplier = 1.3;
  ```
  Isso impede que a fonte gigante do MIUI quebre o layout, mantendo
  acessibilidade parcial (até 1.3×).

**`src/hooks/useBottomSpacing.ts`** (NOVO — ~14 linhas)
```ts
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../theme/spacing';

// Altura útil da tab bar flutuante (pill 40 + padding 6×2 = 52, arredondado).
export const TAB_BAR_HEIGHT = 64;

/**
 * Folga inferior para o conteúdo rolável não ficar atrás da tab bar
 * flutuante nem da barra de navegação do Android.
 * @param withTabBar true para telas em app/(tabs)/, false para rotas empilhadas.
 */
export function useBottomSpacing(withTabBar: boolean): number {
  const insets = useSafeAreaInsets();
  return withTabBar
    ? insets.bottom + TAB_BAR_HEIGHT + spacing[6]   // ~insets.bottom + 88
    : insets.bottom + spacing[8];                    // ~insets.bottom + 32
}
```

**`app/(tabs)/_layout.tsx`**
- Importar `TAB_BAR_HEIGHT` de `src/hooks/useBottomSpacing` (fonte única da
  constante) — manter o estilo atual da tab bar, apenas referenciar a constante
  se conveniente. Nenhuma mudança visual obrigatória aqui.

### 4.2 — Telas com tab bar → `useBottomSpacing(true)`

Substituir o `paddingBottom` do `contentContainerStyle` pelo valor do hook
(aplicar via style inline, pois depende de runtime):

| Arquivo | Ação |
|---------|------|
| `app/(tabs)/dashboard.tsx` | Trocar `paddingBottom: 120` pelo hook. |
| `app/(tabs)/explorar.tsx` | Trocar `paddingBottom: 40` da FlatList pelo hook. |
| `app/(tabs)/bebe.tsx` | **Adicionar** `contentContainerStyle={{ paddingBottom: bottom }}`. |
| `app/(tabs)/perfil.tsx` | Trocar `insets.bottom + 120` pelo hook. |
| `app/(tabs)/diario.tsx` | Trocar `insets.bottom + 120` pelo hook. |
| `app/(tabs)/ferramentas.tsx` | Aplicar o hook ao ScrollView externo; auditar scrolls aninhados. |

### 4.3 — Rotas empilhadas → `useBottomSpacing(false)`

| Arquivo | Ação |
|---------|------|
| `app/birth-plan.tsx` | Trocar `paddingBottom: spacing[10]` pelo hook. Conferir CTA fora do scroll (em `SafeAreaView` separado) — garantir que respeita `insets.bottom`. |
| `app/nursery.tsx` | Trocar `paddingBottom: spacing[10]` pelo hook. |
| `app/appointments.tsx` | Trocar `paddingBottom: spacing[10]` pelo hook. |
| `app/meds.tsx` | Trocar `paddingBottom: spacing[10]` pelo hook. |
| `app/exams.tsx` | Trocar `paddingBottom: spacing[10]` pelo hook. |

### 4.4 — Topo (elementos colados no notch)

- Telas com `SafeAreaView edges={['top']}` já estão corretas — não mexer.
- Auditar qualquer `paddingTop` hardcoded e garantir `+ insets.top` onde houver,
  **mantendo o espaçamento visual aprovado** — apenas deslocar o bloco para
  baixo da status bar, sem alterar o gap visual entre header e conteúdo.

### 4.5 — Overflow de texto

- `app/meds.tsx` (~ln 191) — adicionar `numberOfLines={1}` e `flexShrink: 1` ao
  texto do nome do medicamento.
- Auditar títulos com `\n` hardcoded (ex.: `app/birth-plan.tsx` ~ln 81) —
  garantir `flexShrink: 1` / `flexWrap` no container para não vazar com a fonte
  ampliada. Não remover o design — só blindar contra overflow.

---

## 5. Arquivos a modificar

```
app/_layout.tsx                   SafeAreaProvider raiz + maxFontSizeMultiplier
src/hooks/useBottomSpacing.ts      NOVO — hook de folga inferior + TAB_BAR_HEIGHT
app/(tabs)/_layout.tsx             usar TAB_BAR_HEIGHT da fonte única
app/(tabs)/dashboard.tsx           folga inferior (era 120 fixo)
app/(tabs)/explorar.tsx            folga inferior FlatList (era 40)
app/(tabs)/bebe.tsx                folga inferior (estava AUSENTE — crítico)
app/(tabs)/perfil.tsx              normalizar para o hook
app/(tabs)/diario.tsx              normalizar para o hook
app/(tabs)/ferramentas.tsx         folga inferior + auditar scrolls aninhados
app/birth-plan.tsx                 folga inferior + checar CTA fora do scroll
app/nursery.tsx                    folga inferior
app/appointments.tsx               folga inferior
app/meds.tsx                       folga inferior + numberOfLines no nome
app/exams.tsx                      folga inferior
```

**Total:** 13 arquivos editados + 1 arquivo novo.

---

## 6. Verificação (end-to-end)

1. **Typecheck** — `npm run typecheck` → baseline **14 erros, 0 novos**.
2. **Web preview** — `npm run web` (porta 8081/8082, via bash conforme SOP):
   - Redimensionar a janela para 360 / 393 / 412 dp de largura.
   - Em cada tela rolável (Início, Explorar, Bebê, Ferramentas, Perfil, Diário,
     Plano de Parto, Enxoval, Consultas, Vitaminas, Exames): rolar até o fim e
     confirmar que **todos os botões/CTAs ficam acima da tab bar**.
   - Confirmar que nenhum header cola na status bar do topo.
3. **Fonte ampliada** — simular `maxFontSizeMultiplier` / fonte grande: nenhum
   título ou nome de medicamento deve vazar a tela.
4. **APK (opcional, @devops)** — após aprovação visual, EAS build e teste real
   no Redmi Note 9: rolar até o fim de Início, Bebê, Plano de Parto, Vitaminas,
   Exames e Consultas confirmando todos os botões acessíveis.

---

## 7. Registro de aprovação do design

O design redesenhado (RD-1..RD-7) está **aprovado pelo usuário em 2026-05-15**.
FX-2 corrige **exclusivamente** layout, safe-area e escala de fonte. **Nenhuma
alteração visual** (cores, fontes, componentes, hierarquia, espaçamento de
design) é permitida nesta sprint.

---

## 8. Escopo / restrições

- **1 commit** — mensagem: `fix: responsividade e safe-area Redmi Note 9 [FX-2]`.
- Typecheck baseline = 14; **não introduzir erros novos**.
- **Sem novos componentes** além do hook `useBottomSpacing`.
- Design visual **intocado** — somente espaçamento, safe-area e escala de fonte.
- Diagnóstico de crash antes de qualquer EAS build (lição RD-4 / FX-1).

---

## 9. Equipe de execução (próxima sessão)

```
@sm → @po → @ux-design-expert → @architect → @dev → @qa → @devops
```
Modo @dev sugerido: **YOLO** (tarefa determinística, decisões já fechadas).
