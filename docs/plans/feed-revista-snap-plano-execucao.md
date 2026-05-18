# Plano de Execução — Feed Revista Snap (tela Explorar)

> **Status:** 📋 Plano aprovado em escopo — **não implementado**.
> **Data:** 2026-05-16 · **Spec técnica:** `docs/plans/conceito-1-feed-revista-snap.md`
> **Decisões do usuário:** Salvar = só persistir (sem tela de salvos agora);
> entrega em fase única.

## Context

A tela **Explorar** (`app/(tabs)/explorar.tsx`) hoje usa um `FlatList` simples com
cards de **altura variável** e qualidade visual inconsistente. O objetivo é
transformá-la num feed estilo Instagram/TikTok: card de **altura fixa** (~87% do
viewport útil), **peek** de ~13% do próximo card, **snap scroll** (assenta sozinho
no card seguinte, sem parar no meio) e uma **barra de ações** por card —
Salvar · Anotar · Compartilhar.

A especificação técnica completa está em
`docs/plans/conceito-1-feed-revista-snap.md` (dimensões, tokens, regras). Este
documento é a execução dela.

**Resultado esperado:** feed com navegação fluida por snap, cada card com ações
funcionais, salvar e anotar persistindo localmente em SQLite.

## Abordagem

Manter o modelo de dados atual (`buildWeeklyFeed` → `RevistaCard[]`) — **não**
adotar o `FeedItem` da §04 do spec (refatoração desnecessária/arriscada). Criar um
`CardShell` de altura fixa que envolve cada `RevistaCard`: cabeçalho + corpo (os
renderizadores de layout atuais) + barra de ações. O `card.id` (ex.: `"20-hero"`)
já é estável e único → serve de `card_id` para bookmarks/notas.

Conteúdo é **estático bundled** (`src/data/weeks/`), sem rede — portanto **não**
há estados de loading/erro/offline nem skeleton. Sem dependências novas (sem
`expo-haptics`, sem toast); o feedback de salvar é o preenchimento ótimo do ícone.

`RevistaCard`/`FeedChecklistCard` são usados **só** em `explorar.tsx` (verificado
por Grep) — seguro modificá-los.

## Arquivos

### Criar

| Arquivo | Conteúdo |
|---------|----------|
| `src/components/feed/useFeedDimensions.ts` | Hook puro: calcula `availH`, `cardH`, `peekH`, `itemH`, `gap` (fórmula §03 do spec). |
| `src/hooks/useCardMeta.ts` | Carrega 1× o conjunto de `card_id` salvos + índice de notas. Expõe `isSaved(id)`, `hasNote(id)`, `toggleSave(id)`, `refreshNotes()`. |
| `src/hooks/useCardNote.ts` | Nota de 1 card: `note`, `onChangeText` (debounce 600 ms), `flush()`. Instanciado dentro do `NoteSheet`. |
| `src/components/feed/CardBody.tsx` | Despacha os 6 layouts (hero/stat/lista/checklist/pergunta/faq) para o miolo, sem invólucro. |
| `src/components/feed/CardActionBar.tsx` | Barra inferior: Salvar · Anotar · Compartilhar + chevron "↓ próximo". |
| `src/components/feed/NoteSheet.tsx` | Bottom-sheet de anotação (reusa `BottomSheet` + `TextInput` multiline). |
| `src/components/feed/CardShell.tsx` | Invólucro de altura fixa `cardH`: cabeçalho (chip eyebrow) + `CardBody` (`flex:1`) + `CardActionBar`. |
| `src/components/feed/FeedTopBar.tsx` | Barra de topo fixa (ex-`FeedHeader`), `height: 68`, fora do `FlatList`. |

### Modificar

| Arquivo | Mudança |
|---------|---------|
| `src/db/index.ts` | Bloco **v7** após o v6 (`daily_logs`): `CREATE TABLE IF NOT EXISTS bookmarks` / `card_notes` + índice, no mesmo padrão try-catch dos blocos v3–v6. |
| `src/components/RevistaCard.tsx` | Extrair o **miolo** de cada layout (remover o `View` container com `borderRadius:20`/`shadow`/`marginBottom`) para uso pelo `CardBody`. |
| `src/components/FeedChecklistCard.tsx` | Idem: expor só a lista, sem container. |
| `app/(tabs)/explorar.tsx` | `FeedTopBar` fixo acima; `FlatList` com props de snap; `renderItem` envolve em `CardShell`; remover `ListHeaderComponent`; estado do `NoteSheet`. |

## Passos (ordem de execução)

1. **Migration v7** (`src/db/index.ts`) — adicionar após o bloco v6:
   ```ts
   // v7 migrations: bookmarks + card_notes (Feed Revista Snap)
   try { await db.runAsync('CREATE TABLE IF NOT EXISTS bookmarks (card_id TEXT PRIMARY KEY, created_at INTEGER NOT NULL)'); } catch {}
   try { await db.runAsync('CREATE TABLE IF NOT EXISTS card_notes (card_id TEXT PRIMARY KEY, note TEXT NOT NULL, updated_at INTEGER NOT NULL)'); } catch {}
   try { await db.runAsync('CREATE INDEX IF NOT EXISTS idx_bookmarks_created ON bookmarks(created_at DESC)'); } catch {}
   ```
   Timestamps `INTEGER` (epoch via `Date.now()`). `card_responses` fica fora da v1.

2. **`useFeedDimensions`** — fórmula §03 do spec:
   ```ts
   const { height: screenH } = useWindowDimensions();
   const insets = useSafeAreaInsets();
   const HEADER_H = 68;
   const tabBarH = insets.bottom + TAB_BAR_HEIGHT;   // de useBottomSpacing.ts; não hardcodar 88
   const availH  = screenH - insets.top - HEADER_H - tabBarH;
   const gap     = spacing[4];                        // 16
   const cardH   = Math.round(availH * 0.87);
   const peekH   = availH - cardH;
   const itemH   = cardH + gap;
   ```

3. **`useCardMeta`** + **`useCardNote`** — seguir o padrão de `src/hooks/usePrenatalAppointments.ts` (`getDatabase()` → `getAllAsync`/`runAsync` → estado local + `load()`).
   - `useCardMeta`: carrega o conjunto inteiro de salvos/notas (volume pequeno) → `isSaved`/`hasNote` O(1). `toggleSave` faz **update otimista** + `INSERT OR IGNORE`/`DELETE`. Chamado **1× em `explorar.tsx`**, passado por props (não 1 hook de DB por card).
   - `useCardNote(cardId)`: `SELECT` no mount; `INSERT OR REPLACE` (ou `DELETE` se vazio) com debounce 600 ms; `flush()` no dismiss.

4. **Extrair miolos** — `RevistaCard.tsx` e `FeedChecklistCard.tsx`: separar corpo do invólucro. O `CardShell` passa a ser dono de `borderRadius`/`shadow`/`padding`. Corrigir desvio do DS: `borderRadius.lg` (26) no shell; `borderRadius.md` (18) nos blocos internos hero/faq.

5. **`CardBody`** — recebe `RevistaCard`, despacha para o miolo extraído. `flex:1`, `overflow:'hidden'`, `numberOfLines` em textos longos (trunca; sem rota de detalhe na v1).

6. **`NoteSheet`** — `BottomSheet` + `TextInput` multiline + `useCardNote`. `KeyboardAvoidingView` interno. `flush()` no `onDismiss`.

7. **`CardActionBar`** — 3 ações em alvos 44×44, ícones `DGIcon` 24 (`bookmark`/`edit`/`share`) + `chevronDown`. Salvar → `toggleSave`. Anotar → abre `NoteSheet`. Compartilhar:
   ```ts
   Share.share({ title: card.title, message: `${card.title}\n\ndocegestar://card/${card.id}` }).catch(() => {});
   ```
   Indicador "anotado" quando `hasNote(card.id)`.

8. **`CardShell`** — `View` com `height: cardH`, `colors.surface`, `borderRadius.lg`, `shadows.card`, `marginBottom:0`. Cabeçalho = chip `typography.eyebrow` (`chapter` + `Semana N`). Corpo = `CardBody` (`flex:1`). Rodapé = `CardActionBar`. `accessibilityRole="article"` + label composto.

9. **`FeedTopBar`** — ex-`FeedHeader` como barra fixa `height: 68` (casar com `HEADER_H`).

10. **`explorar.tsx`** — `FeedTopBar` fixo fora do `FlatList`; remover `ListHeaderComponent`. Props do `FlatList`:
    ```tsx
    snapToInterval={itemH}
    snapToAlignment="start"
    decelerationRate="fast"
    disableIntervalMomentum
    getItemLayout={(_, i) => ({ length: itemH, offset: itemH * i, index: i })}
    ItemSeparatorComponent={() => <View style={{ height: gap }} />}
    contentContainerStyle={{ paddingHorizontal: spacing[4], paddingTop: spacing[4], paddingBottom: peekH }}
    removeClippedSubviews windowSize={5} initialNumToRender={2} maxToRenderPerBatch={3}
    onScrollToIndexFailed={() => {}}
    ```
    `renderItem` envolve em `<CardShell>`. Chevron "↓" → `listRef.scrollToIndex({ index: i+1, animated: true })`. `NoteSheet` controlado por `useState<RevistaCard | null>`. Manter o `EmptyState` atual.

## Utilitários reutilizados (não recriar)

- `buildWeeklyFeed` / `RevistaCard` — `src/utils/revistaAdapter.ts`, `src/types/index.ts`
- `useCurrentWeek`, `useWeekData`, `getTrimester` — `src/hooks/`, `src/data`
- `TAB_BAR_HEIGHT` — `src/hooks/useBottomSpacing.ts`
- `getDatabase()` — `src/db/index.ts` (padrão de hook: `src/hooks/usePrenatalAppointments.ts`)
- `BottomSheet` — `src/components/ui/BottomSheet.tsx`
- `DGIcon` (`bookmark`/`edit`/`share`/`chevronDown`) — `src/components/DGIcon.tsx`
- Tokens do DS — `src/theme/` (`colors`, `typography`, `spacing`, `borderRadius`, `shadows`)
- `Share` — nativo do React Native

## Verificação

1. **Typecheck/lint:** `npm run typecheck` e `npm run lint` — 0 erros novos sobre o baseline.
2. **Snap:** card ocupa ~87% + peek ~13% visível; arrastar >30% assenta no próximo; flick forte avança só **1** card; chevron rola animado; **primeiro e último** card snapam alinhados (via `paddingBottom: peekH`); rotação não trava (`onScrollToIndexFailed`).
3. **Salvar:** ícone preenche imediato; fechar e reabrir o app mantém salvo; tocar de novo remove.
4. **Anotar:** sheet abre com foco no input; fecha sem botão "salvar"; reabrir mostra o texto; indicador "anotado" aparece/some.
5. **Compartilhar:** abre o sheet nativo com título + deep-link; cancelar **não** gera erro no console.
6. **Web:** `npm run web` — tela não quebra; `CREATE TABLE IF NOT EXISTS` roda no `getWebDatabase`.
7. Verificação visual no preview (snap, peek, barra de ações) antes de marcar concluído.

## Riscos

- **R1 — `getItemLayout` desalinhado** (falha mais comum de snap): `itemH` deve ser exatamente `cardH + gap`; o `gap` vem **só** do `ItemSeparatorComponent`; `CardShell` com `marginBottom:0`. Testar snap no 1º e no último card.
- **R2 — `HEADER_H` (68) ≠ altura real do `FeedTopBar`** → peek torto. Mitigar travando `FeedTopBar` com `height: 68`.
- **R3 — `BottomSheet` não tem snap points 40/90%** nem ajuste de teclado. MVP: usar como está + `KeyboardAvoidingView` interno no `NoteSheet`.
- **R4 — Conteúdo longo não cabe** no `cardH` fixo. Corpo `flex:1`/`overflow:'hidden'` + `numberOfLines`; truncamento aceito na v1 (§11 do spec). Testar em tela ~640 pt.
- **R5 — `disableIntervalMomentum`** já foi instável em Android antigo. Em RN 0.83 é estável — validar com flick forte no Android.
- **R6 — Baseline de typecheck:** o projeto tem ~15 erros pré-existentes (`GestationCounter.tsx` etc., fora de escopo). Conferir que a feature adiciona **0** erros novos.

## Fora de escopo (registrado)

- Tela para listar cards salvos (decisão do usuário: só persistir agora).
- Estados loading/erro/offline e skeleton (conteúdo é estático, sem rede).
- Tabela `card_responses` / seletor de humor `interaction` (o card `pergunta` mantém o toggle atual em AsyncStorage).
- Rota `CardDetail` "Ler mais" (conteúdo trunca na v1).
- Haptics (`expo-haptics`) — spec define zero dependências novas.
- Commit e EAS Build — adiados conforme instrução vigente do usuário.
