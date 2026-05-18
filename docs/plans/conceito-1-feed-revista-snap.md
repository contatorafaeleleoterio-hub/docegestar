# Conceito 1 — Feed Revista Snap · Especificação Técnica

> **Status:** 📐 Especificação técnica — aprovada como conceito, **não implementada**.
> **Escopo:** redesenho da tela **Explorar** (`app/(tabs)/explorar.tsx`).
> **Versão:** v1.0 · **Data:** 2026-05-16 · **Owner:** Eng · Mobile
> **Plataforma:** React Native 0.83 + Expo · **Persistência:** SQLite (`expo-sqlite`).

Documento técnico que descreve **funcionamento, dinâmica, dimensões, movimentos,
funções, regras e aparência** do card do feed semanal. Baseado no PDF
`Detalhes_tecnicos_cards.pdf` (19 págs) — porém **o design do PDF é
demonstrativo**: este documento já reconcilia tudo com o **Design System
"Moderno Suave"** real do app (`src/theme/`). Ver §13 para a comparação completa.

---

## Fonte técnica de referência (GitHub)

A mecânica de snap descrita aqui **não usa biblioteca externa** — usa o
componente nativo `FlatList` do React Native. A descrição técnica dos props de
snap, virtualização e `getItemLayout` segue a implementação e a documentação
oficiais do componente:

- **`facebook/react-native`** — componente `FlatList` / `VirtualizedList`
  (props `snapToInterval`, `snapToAlignment`, `decelerationRate`,
  `disableIntervalMomentum`, `getItemLayout`).
  Doc oficial: <https://reactnative.dev/docs/flatlist>

Alternativas avaliadas e **descartadas** para este conceito (registradas só
como referência de mercado): `dohooo/react-native-reanimated-carousel` (~3,4k ★)
e `Shopify/flash-list` (~7,1k ★). Motivo: o feed tem volume pequeno (40 semanas,
cards de altura fixa) — `FlatList` nativo resolve sem dependência nova. FlashList
fica como caminho de upgrade futuro se o feed crescer muito (mesmos props de snap).

---

## Sumário

| # | Seção | # | Seção |
|---|-------|---|-------|
| 01 | Visão geral & decisões | 08 | Banco de dados |
| 02 | Anatomia do CardShell | 09 | Performance |
| 03 | Dimensões & cálculo | 10 | Acessibilidade |
| 04 | Tipos de corpo | 11 | Edge cases |
| 05 | Mecânica de snap (movimento) | 12 | Checklist de aceite |
| 06 | Estados do feed | 13 | **Comparação com o Design System & ajustes** |
| 07 | Ações & fluxos | 14 | Notas de integração |

---

## 01 · Visão geral & decisões

O feed da tela Explorar é o canal principal de conteúdo semanal. Hoje usa um
`FlatList` simples com cards de **altura variável** (`RevistaCard` /
`FeedChecklistCard`). O Conceito 1 troca isso por um feed **estilo revista /
Instagram**: cada card tem **tamanho padrão**, ocupa quase toda a tela, mostra
um **peek** (espiada) do próximo card embaixo, e o scroll **assenta sozinho**
(snap) no card seguinte — sem parar no meio.

### Objetivos

| Objetivo | Descrição |
|----------|-----------|
| **Foco** | Um card por vez na tela, sem distração da "metade do próximo". |
| **Continuidade** | O peek revela que "tem mais" — afordância de "rolar continua". |
| **Fidelidade ao DS** | Card claro, sobre `colors.surface`, raio `borderRadius.lg`, `shadows.card`. |
| **Baixo risco** | Zero dependências novas — `FlatList` + `snapToInterval` é nativo. |

### Decisões assumidas

| Decisão | Escolha | Por quê |
|---------|---------|---------|
| Container do feed | `FlatList` vertical nativo | Já vem com virtualização, recycler, pull-to-refresh. |
| Snap | `snapToInterval` + `decelerationRate="fast"` | Não exige lib; `pagingEnabled` não serve (ver §05). |
| Altura do card | **Fixa** = `screenH × 0,87` | Snap preciso exige altura constante (`getItemLayout`). |
| Conteúdo só-texto | Citação editorial (Fraunces italic) | Evita card "vazio" quando não há imagem. |
| Compartilhar | API nativa `Share` | Sem lib; texto + deep-link `docegestar://card/<id>`. |
| Anotar | Bottom-sheet com `textarea` | Anotação privada por card; `INSERT OR REPLACE` no SQLite. |

---

## 02 · Anatomia do CardShell

Todo card — **independente do tipo de corpo** — usa o mesmo invólucro
(`CardShell`): **cabeçalho fixo**, **corpo flexível**, **barra de ações fixa**.
Só o miolo (corpo) muda entre os tipos.

```
┌─────────────────────────────────┐  ← raio borderRadius.lg (26)
│ A · CABEÇALHO  (fixo)            │     fundo colors.surface
│   chip eyebrow "SEMANA 20 ·      │     sombra shadows.card
│   SEU BEBÊ" + título             │
├─────────────────────────────────┤
│                                 │
│ B · CORPO FLEXÍVEL  (flex: 1)    │
│   texto / imagem / interação     │
│                                 │
├─────────────────────────────────┤  ← divisor borderTop 1px colors.border
│ C · BARRA DE AÇÕES  (fixa)       │
│   Salvar · Anotar · Compartilhar │
└─────────────────────────────────┘
   D · PEEK — 13% do próximo card aparecendo embaixo
```

| Zona | Conteúdo | Regra |
|------|----------|-------|
| **A — Cabeçalho** | Chip de semana + categoria com ícone. | Altura fixa ≈ 56 pt. Não rola. |
| **B — Corpo flexível** | Cresce com `flex: 1`. Texto, imagem ou interação. | Sempre dentro do mesmo padding lateral (`spacing[4]` = 16). |
| **C — Barra de ações** | Salvar · Anotar · Compartilhar + chevron "↓ próximo". | Altura fixa ≈ 52 pt. Separada por `borderTopWidth: 1`, cor `colors.border`. |
| **D — Peek** | 13% do próximo card visível embaixo. | Afordância visual de "rola que tem mais". Não é tocável como atalho. |

---

## 03 · Dimensões & cálculo

Todas as medidas derivam da **altura útil da viewport** (descontando status bar
e tab bar). **Regra crítica:** como o snap depende de altura fixa, o card
**nunca** pode ter altura dinâmica.

### Fórmula

```
availH        = screenH − insets.top − insets.bottom − headerH − tabBarH
cardH         = round(availH × 0.87)
peekH         = availH − cardH
itemH         = cardH + gap
snapToInterval = itemH
```

- `screenH` vem de `useWindowDimensions()` (recalcula em rotação).
- `insets` vem de `useSafeAreaInsets()` (`react-native-safe-area-context`).
- `tabBarH` **não é um número mágico** — deve ser derivado do hook existente
  `useBottomSpacing` / da constante `TAB_BAR_HEIGHT` (FX-2). Ver §13.
- `gap` = `spacing[4]` (16) — token do DS (ver §13; o PDF usava 14, fora da grade).

### Tabela de medidas (exemplos de referência)

| Variável | iPhone 14 (≈844 pt) | Pixel 7 (≈812 pt) | Nota |
|----------|--------------------|--------------------|------|
| `screenH` | 844 | 812 | Altura útil sem status bar |
| `tabBarH` | 88 | 88 | Tab bar flutuante + safe area (via `useBottomSpacing`) |
| `headerH` | 68 | 68 | Top bar in-content |
| `availH` | 688 | 656 | Disponível para o feed |
| **`cardH`** | **≈599** | **≈571** | 87% de `availH` |
| `peekH` | ≈89 | ≈85 | 13% de `availH` |
| `gap` | **16** | **16** | `spacing[4]` — espaço vertical entre cards |
| **`snapToInterval`** | **≈615** | **≈587** | `cardH + gap` |
| `marginH` | 16 | 16 | Margem lateral = `spacing[4]` |
| Hit target ações | 44 | 44 | Ícone 24 pt dentro de alvo 44×44 |

> Os valores numéricos são **derivados em runtime** pela fórmula — a tabela é
> só ilustrativa. Nunca hardcodar `cardH`.

### Aparência (tokens do DS)

| Propriedade | Token / valor |
|-------------|---------------|
| Fundo do card | `colors.surface` (`#FFFFFF`) |
| Raio | `borderRadius.lg` (26) |
| Sombra | `shadows.card` |
| Borda / divisor da barra de ações | `colors.border` (`#EDE7F3`), 1 px |
| Chip de semana · estado salvo | `colors.primary` (`#EC3779`) |
| Texto principal / secundário | `colors.text` (`#1F1A2E`) / `colors.textSecondary` (`#5E5870`) |
| Padding lateral | `spacing[4]` (16) |

---

## 04 · Tipos de corpo

O cabeçalho e a barra de ações são **idênticos** em todos os tipos — o que muda
é só o miolo (zona B).

| Tipo (`type`) | Conteúdo | Tipografia (ajustada ao DS — ver §13) |
|---------------|----------|----------------------------------------|
| `"text"` | Citação editorial + parágrafo de apoio. Sem imagem. | Citação: `typography.editorial` (Fraunces 500 Italic). Apoio: `typography.body`. |
| `"image"` | Ilustração em bloco arredondado (raio `borderRadius.md` = 18) + título + corpo. | Título: `typography.h2`. Corpo: `typography.body`. |
| `"interaction"` | Título + seletor (ex.: 5 emojis de humor) + `textarea` opcional. | Título: `typography.h2`. Persiste em `card_responses`. |

### Modelo de dados do conteúdo (proposto)

```ts
type FeedItem = {
  id: string;            // ex.: "w20-baby"
  week: number;          // ex.: 20
  type: 'text' | 'image' | 'interaction';
  category: 'baby' | 'didYouKnow' | 'mood' | 'symptom' | 'tip';
  title?: string;
  pull?: string;         // citação editorial (só em type=text)
  body: string;
  image?: { kind: 'fruit' | 'photo'; src: string; meta?: Record<string, string> };
  interaction?: { kind: 'mood' | 'kicks' | 'weight'; payload: unknown };
};
```

> ⚠️ Este modelo **substitui** o `RevistaCardType` atual (`src/types`). É preciso
> um adaptador a partir de `buildWeeklyFeed` / `revistaAdapter`. Ver §14.

---

## 05 · Mecânica de snap (movimento)

`FlatList` nativo com **altura de item constante**. Os props abaixo são todos os
necessários para a rolagem "assentar" sozinha no próximo card.

### Configuração do `FlatList`

| Prop | Valor | Função |
|------|-------|--------|
| `snapToInterval` | `cardH + gap` | Define o "passo" do snap — o próximo card começa exatamente a `cardH + gap` px abaixo. |
| `snapToAlignment` | `"start"` | O snap "encosta" o topo do card no topo do viewport. |
| `decelerationRate` | `"fast"` | Derrapagem curta. Sem isso a rolagem passa do snap e tem que voltar. |
| `disableIntervalMomentum` | `true` | Garante que **cada gesto avança só 1 card**. Sem isso, um flick forte pula 2–3. |
| `getItemLayout` | `(_, i) => ({ length: itemH, offset: itemH * i, index: i })` | Só funciona porque a altura é fixa. Zera medição → `scrollToIndex` instantâneo + virtualização sem "saltos". |
| `contentContainerStyle.paddingBottom` | `availH − cardH` | Folga para o **último** card conseguir snapar igual aos outros. |
| `contentContainerStyle.paddingHorizontal` | `spacing[4]` (16) | Margem lateral. |
| `ItemSeparatorComponent` | `View` com `height: gap` | Cria o `gap` visual entre cards. |

### ⚠️ Não usar `pagingEnabled`

`pagingEnabled` encaixa em múltiplos da **altura da viewport**, não da altura do
**card**. Como o card é menor que a viewport (87%), o snap ficaria errado e
desalinhado. Sempre `snapToInterval`.

### Movimentos disponíveis

| Gesto / ação | Resultado |
|--------------|-----------|
| Arrastar para cima/baixo | Feed assenta no card vizinho (1 card por gesto). |
| Toque no chevron "↓" da barra de ações | `scrollToIndex(atual + 1)` com animação — atalho para quem ainda não internalizou o gesto de scroll. |
| Pull-to-refresh (puxar no topo) | `RefreshControl` com `tintColor` = `colors.primary`. |
| Rotação de tela | `useWindowDimensions` recalcula `cardH`; o `FlatList` re-snapa para o card atual. |

---

## 06 · Estados do feed

Cada estado tem um shape próprio. O **skeleton mantém a altura do card** (`cardH`)
para o conteúdo não dar "pulo" quando chega.

| Estado | Comportamento |
|--------|---------------|
| **Loading** | Skeleton card: cabeçalho + 3 linhas + barra de ações em shimmer. Renderiza ~3 placeholders na altura final. |
| **Empty** | "Sua próxima semana abre em X dias." CTA secundária para o Álbum. |
| **End-of-feed** | Último card especial: resumo da semana + atalho para a semana seguinte (se já disponível). |
| **Error** | Retry inline no topo do feed. Cards já em cache continuam funcionando. |
| **Offline** | Banner discreto. Salvar/anotar continuam — sincronizam ao voltar a rede. |

---

## 07 · Ações & fluxos

Três ações na barra inferior: **Salvar · Anotar · Compartilhar**. Mais o chevron
"↓ próximo" descrito em §05.

### Salvar (bookmark)

| Passo | Regra |
|-------|-------|
| 1 · Toque no ícone | Haptic leve (`impactLight`). |
| 2 · Otimista | Ícone preenche **imediatamente**; o estado local atualiza antes do banco. |
| 3 · Persistência | `INSERT OR IGNORE` / `DELETE` em `bookmarks` (toggle). |
| 4 · Confirmação | Toast curto: "Salvo em Favoritos". |

### Anotar (nota privada)

| Passo | Regra |
|-------|-------|
| 1 · Bottom-sheet | Abre com snap points 40% / 90%. Foco no `textarea`. |
| 2 · Auto-save | Debounce de ~600 ms — escreve sem botão "salvar". |
| 3 · Upsert | `INSERT OR REPLACE` em `card_notes` (`card_id`, `note`, `updated_at`). |
| 4 · Indicador | O card mostra um pontinho/rótulo "anotado" quando há nota. |

### Compartilhar (Share nativo)

- Usa `Share.share({ message, title })` do React Native.
- `message` inclui título do card + deep-link `docegestar://card/<id>`.
- Dispara `analytics('card_shared', { id, week })`.
- Abre iOS Share Sheet / Android Chooser.

---

## 08 · Banco de dados

Duas tabelas novas (+1 opcional) no SQLite local. **Local é a fonte da verdade**;
sincronização com servidor é opcional/futura.

### Migration `0007_feed.sql`

```sql
-- Cards salvos (favoritos)
CREATE TABLE bookmarks (
  card_id    TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL
);

-- Anotação privada por card (1:1)
CREATE TABLE card_notes (
  card_id    TEXT PRIMARY KEY,
  note       TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);

-- (opcional) Respostas de interação — mood, kicks, etc.
CREATE TABLE card_responses (
  card_id    TEXT NOT NULL,
  kind       TEXT NOT NULL,
  payload    TEXT NOT NULL,   -- JSON
  created_at INTEGER NOT NULL,
  PRIMARY KEY (card_id, created_at)
);

CREATE INDEX idx_bookmarks_created ON bookmarks(created_at DESC);
CREATE INDEX idx_notes_updated     ON card_notes(updated_at DESC);
```

### Queries em runtime

```sql
-- Marcar / desmarcar bookmark (toggle)
INSERT OR IGNORE INTO bookmarks (card_id, created_at) VALUES (?, ?);
DELETE FROM bookmarks WHERE card_id = ?;

-- Upsert da nota
INSERT OR REPLACE INTO card_notes (card_id, note, updated_at) VALUES (?, ?, ?);

-- Estado do card (salvo + tem nota) em uma única consulta
SELECT
  c.card_id,
  (b.card_id IS NOT NULL) AS is_saved,
  (n.card_id IS NOT NULL) AS has_note
FROM (SELECT ? AS card_id) c
LEFT JOIN bookmarks  b ON b.card_id = c.card_id
LEFT JOIN card_notes n ON n.card_id = c.card_id;
```

---

## 09 · Performance

| Regra | Detalhe |
|-------|---------|
| `getItemLayout` obrigatório | Só funciona porque a altura é fixa. Remove o "salto" de scroll e zera medição. |
| `removeClippedSubviews` + `windowSize={5}` | Mantém só ~5 cards em memória. |
| Memoizar `renderItem` | `React.memo(CardShell)` + `useCallback` nos handlers. |
| Imagens pré-redimensionadas | Servir em 1× e 2×. Considerar `FastImage` se houver muitas fotos. |
| Anotação com debounce | Escreve no SQLite em debounce — não a cada tecla. |
| Animação do bookmark | `useNativeDriver: true` ao preencher o ícone. |

**Meta:** scroll a 60 fps em iPhone 11 / Pixel 4a; primeiro card visível em
< 200 ms a partir do `onMount` do feed.

---

## 10 · Acessibilidade

| Item | Regra |
|------|-------|
| Hit targets | 44×44 mínimo; ícone 24 pt dentro do alvo. |
| VoiceOver / TalkBack | Cada card é um único nó `accessibilityRole="article"`, com `accessibilityLabel` composto: "Semana 20, Seu Bebê. Do tamanho de uma banana. 25 cm, 300 g…". |
| Ações rotuladas | "Salvar este card", "Adicionar uma anotação", "Compartilhar este card". |
| Estado | Bookmark anuncia "Salvo" / "Removido dos salvos" via `AccessibilityInfo.announceForAccessibility`. |
| Contraste | `colors.text` sobre `colors.surface` ≈ 14,8:1; `colors.textSecondary` ≈ 5,6:1. Ambos AA. |
| Reduce motion | Respeitar `AccessibilityInfo.isReduceMotionEnabled()` — desliga a animação de preencher o bookmark. |
| Dynamic Type | Tipografia escalável; corpo cresce até ~130% (limitado por `maxFontSizeMultiplier = 1.3`, já global via FX-2). |

---

## 11 · Edge cases

| Caso | Comportamento |
|------|---------------|
| Conteúdo longo demais (texto não cabe) | Truncar com `numberOfLines` + "Ler mais" abre o card em tela cheia (rota `CardDetail`). |
| Card único na semana | Sem peek. Render normal — o `paddingBottom` compensa. |
| Imagem falhou de carregar | Fallback: gradiente `colors.lav100 → colors.primaryContainer` + ícone "image-off". Card continua utilizável. |
| Rotação para landscape | Recalcular `cardH` via `useWindowDimensions`; `FlatList` re-snapa para o card atual. |
| Tablet / iPad | Limitar largura do feed a ~480 pt e centralizar. Mesmo card, mesma proporção de altura. |
| Anotação grande (> 2000 chars) | Hard-limit no input; toast de aviso aos 1900. |
| Share cancelado pela usuária | `Share.share()` rejeita silenciosamente — **não** logar como erro. |

---

## 12 · Checklist de aceite

Critério binário. Tudo marcado = pronto para release.

- [ ] **VISUAL** — Card a 87% da altura útil (medido pela fórmula da §03).
- [ ] **VISUAL** — Peek de 13% visível, alinhado com a margem lateral.
- [ ] **VISUAL** — Tokens do DS: `surface`, `border`, `borderRadius.lg`, `shadows.card`, `primary` — sem cores avulsas.
- [ ] **SNAP** — Snap preciso ao próximo card: solta qualquer card a 30%+ da altura e ele assenta no próximo.
- [ ] **SNAP** — 1 gesto = 1 card; flick forte não pula 2+ (`disableIntervalMomentum` ativo).
- [ ] **PERF** — 60 fps no scroll (iPhone 11 / Pixel 4a; JS thread livre de jank).
- [ ] **PERF** — Primeiro card visível em < 200 ms.
- [ ] **AÇÃO** — Salvar persiste após reabrir o app (estado vem do SQLite).
- [ ] **AÇÃO** — Anotação salva sem botão (auto-save com debounce ~600 ms; indicador no card).
- [ ] **AÇÃO** — Share abre sheet nativo (iOS Share Sheet / Android Chooser, com texto + deep-link).
- [ ] **ESTADOS** — Skeleton, empty, end, error, offline cobertos, na mesma altura do card real.
- [ ] **A11Y** — VoiceOver / TalkBack navegam card a card; ações rotuladas.
- [ ] **A11Y** — Reduce motion respeitado.
- [ ] **QA** — Rotação não quebra o snap (vira para landscape e volta — card atual continua snapado).

---

## 13 · Comparação com o Design System & ajustes

O PDF de referência usa nomes/valores **demonstrativos**. Abaixo, cada item foi
confrontado com o DS real (`src/theme/`). **✅ Mantém** = já está no padrão;
**⚠️ Ajusta** = o documento já adotou o valor correto do DS.

| Item do PDF | DS estabelecido (`src/theme/`) | Veredito | Valor final adotado |
|-------------|-------------------------------|----------|---------------------|
| `surface` `#FFFFFF` | `colors.surface` `#FFFFFF` | ✅ Mantém | `colors.surface` |
| `hairline` `#EDE7F3` | `colors.border` / `colors.divider` `#EDE7F3` | ✅ Mantém | `colors.border` |
| `rLg` = 26 | `borderRadius.lg` = 26 | ✅ Mantém | `borderRadius.lg` |
| `shadowCard` (`0 1 2 / 0 8 28`) | `shadows.card` | ✅ Mantém | `shadows.card` |
| `pink500` `#EC3779` | `colors.pink500` / `colors.primary` `#EC3779` | ✅ Mantém | `colors.primary` |
| `ink` / `inkMuted` | `colors.text` / `colors.textSecondary` | ✅ Mantém | `colors.text` / `colors.textSecondary` |
| Fallback `lav100 → pink100` | `colors.lav100` existe; **não há** `pink100` | ⚠️ Ajusta | `colors.lav100 → colors.primaryContainer` (`#FFD9E4`) |
| `gap` = 14 | Escala base-4: `spacing[3]`=12, `spacing[4]`=16 (**14 fora da grade**) | ⚠️ Ajusta | `spacing[4]` = **16** |
| Padding lateral = 18 | `spacing[4]`=16 (`RevistaCard` atual já usa 16; **18 fora da grade**) | ⚠️ Ajusta | `spacing[4]` = **16** |
| Citação "Fraunces italic **32 pt**" | `typography.editorial` = Fraunces 500 Italic **18/26** (não há token 32 pt) | ⚠️ Ajusta | `typography.editorial` |
| Título "Jakarta **24**/800" | `typography.h2` = Jakarta 800 **22/28** (não há token 24 pt) | ⚠️ Ajusta | `typography.h2` |
| Parágrafo de apoio "**15 pt**" | Não há token 15 pt | ⚠️ Ajusta | `typography.body` (14/22) |
| Corpo 14 pt | `typography.body` 14/22 | ✅ Mantém | `typography.body` |
| Chip de cabeçalho (uppercase) | `typography.eyebrow` 11/Bold/`letterSpacing 1.2` | ✅ Mantém | `typography.eyebrow` |
| `tabBarH` = 88 (valor fixo) | Hook `useBottomSpacing` + `TAB_BAR_HEIGHT` = 64 + safe-area inset (FX-2) | ⚠️ Ajusta | Consumir `useBottomSpacing` — **não** hardcodar 88 |
| Ícone ação 24 / hit 44 | Padrão de acessibilidade | ✅ Mantém | 24 dentro de 44×44 |
| Imagem em bloco arredondado raio 22 | `borderRadius` tem `md`=18 e `lg`=26 (não há 22) | ⚠️ Ajusta | `borderRadius.md` = 18 |

### Resumo dos ajustes feitos

1. **`gap` 14 → 16** (`spacing[4]`): 14 não pertence à escala base-4 do DS.
2. **Padding lateral 18 → 16** (`spacing[4]`): mesmo motivo + consistência com o `RevistaCard` atual.
3. **Tipografia**: sem tokens de 32 pt / 24 pt / 15 pt — adotados `editorial`,
   `h2` e `body` respectivamente. Se for desejada uma citação maior que 18 pt,
   é preciso **criar um token** novo no DS (ex.: `editorialLg`) — não inventar
   tamanho avulso no componente.
4. **`tabBarH`**: derivar do hook `useBottomSpacing` (FX-2), não usar o número
   fixo 88.
5. **`pink100`**: o DS não tem essa chave — usar `colors.primaryContainer`.
6. **Raio da imagem 22 → 18** (`borderRadius.md`).
7. **Raio do card = 26** (`borderRadius.lg`): é o token correto. Atenção — o
   `RevistaCard`/`HeroCard` atuais **hardcodam 20**, o que já é um desvio do DS;
   o novo `CardShell` deve usar o token `borderRadius.lg`.

Tudo o mais (cores de superfície, sombra, hairline, texto, primary) **já está
dentro do padrão** e foi mantido.

---

## 14 · Notas de integração

- **Modelo de conteúdo:** o `FeedItem` (§04) não é o `RevistaCardType` atual
  (`src/types`). Os layouts de hoje (`hero`, `stat`, `lista`, `checklist`,
  `pergunta`, `faq`) precisam ser mapeados para `type` (`text` / `image` /
  `interaction`) — provavelmente estendendo `buildWeeklyFeed` /
  `revistaAdapter` com um adaptador, ou migrando o modelo.
- **Tela alvo:** `app/(tabs)/explorar.tsx` — hoje monta o `FlatList` direto.
  O `CardShell` e o `FeedList` seriam componentes novos em `src/components/`.
- **Hook de espaçamento:** reutilizar `useBottomSpacing` (`src/hooks/`) para a
  folga inferior — já implementado no FX-2.
- **Rota `CardDetail`:** o edge case "Ler mais" (§11) pressupõe uma rota de
  detalhe em tela cheia que **ainda não existe** — precisa ser criada.
- **Migration:** `0007_feed.sql` é nova — verificar o número da última migration
  antes de implementar.
- **Próximo passo (não incluído neste documento):** transformar esta spec num
  plano de implementação com stories. Conforme instrução, **nada além deste
  documento foi gerado**.
```
