# 03 — DoceGestar | Design System "Moderno Suave" (Paleta v3)

> Versão **resumo** (2026-05-20). Tokens extraídos diretamente de `src/theme/*`.

---

## Identidade visual

- **Estilo:** moderno suave, glassmorphism, com toques editoriais
- **Personalidade:** acolhedor, premium, brasileiro contemporâneo (não infantil, não clínico)
- **Inspiração:** mistura de revista digital + app de bem-estar

---

## Paleta de cores

📁 `src/theme/colors.ts`

### Primária (rosa)

| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#EC3779` | botões, destaques, tab ativa |
| `primaryDeep` | `#C8255F` | pressed state, base de gradiente |
| `primaryLight` / `primaryTint` | `#FFF1F5` | lavagem de fundo |
| `primaryContainer` | `#FFD9E4` | chips, badges suaves |
| `onPrimary` | `#FFFFFF` | texto sobre rosa |
| escala | `pink200..pink500` `#F9A8C9 → #EC3779` | gradientes e variações |

### Secundária (lavanda)

| Token | Hex | Uso |
|-------|-----|-----|
| `secondary` (lav200) | `#C9B8E8` | acentos, cards alternativos |
| `secondaryContainer` (lav50) | `#F4F0FB` | superfície alternativa |
| `lav100` | `#E8DFFA` | hover/pressed lavanda |
| `onSecondary` | `#3B2D6E` | texto sobre lavanda |

### Superfícies / fundo

| Token | Hex | Uso |
|-------|-----|-----|
| `background` | `#FBF7FA` | fundo principal (creme rosado) |
| `surface` | `#FFFFFF` | cards |
| `surfaceDim` | `#F4F0FB` | cards alternativos |
| `surfaceContainerHigh` | `#EDE7F3` | hairline (divisores) |

### Texto

| Token | Hex | Uso |
|-------|-----|-----|
| `text` | `#1F1A2E` | corpo principal (ink) |
| `textSecondary` / `textLight` | `#5E5870` | secundário (inkMuted) |
| `inkSubtle` | `#8A7FA0` | terciário, placeholders |

### Semânticos

| Token | Hex |
|-------|-----|
| `success` | `#3DB57E` |
| `warning` | `#F0A23A` |
| `error` | `#E15858` |
| `info` | `#1D4ED8` |
| `successContainer` | `#DCFCE7` |
| `errorContainer` | `#FDDEDE` |

### Cores por trimestre

| Trimestre | Cor | Hex |
|-----------|-----|-----|
| 1 | rosa suave | `#FFF1F5` |
| 2 | lavanda suave | `#F4F0FB` |
| 3 | ultra-suave | `#FBF7FA` |

### Tab bar / overlay

- `INK` (cor da pílula da tab bar): `#1F1A2E`
- `overlay` (modal/scrim): `rgba(31,26,46,0.5)`

---

## Tipografia

📁 `src/theme/typography.ts`

**Famílias:**
- **Plus Jakarta Sans** — UI, headlines, body (pesos 500, 600, 700, 800)
- **Fraunces 500 Italic** — editorial / pull quotes (destaques emocionais)

| Token | Font / Size / LH / Letter |
|-------|----------------------------|
| `display` | PlusJakarta 800 · 56 / 64 / -2 |
| `h1` | PlusJakarta 800 · 32 / 40 / -1.2 |
| `h2` | PlusJakarta 800 · 22 / 28 / -0.6 |
| `h3` | PlusJakarta 700 · 18 / 24 / -0.2 |
| `body` | PlusJakarta 500 · 14 / 22 |
| `bodySmall` | PlusJakarta 500 · 13 / 20 |
| `label` | PlusJakarta 600 · 14 / 20 |
| `caption` | PlusJakarta 600 · 12 / 16 |
| `eyebrow` | PlusJakarta 700 · 11 / 16 / +1.2 |
| `editorial` | **Fraunces 500 Italic** · 18 / 26 |

**Regra global:** `maxFontSizeMultiplier = 1.3` (evita overflow com fontes do MIUI/sistema ampliadas).

---

## Espaçamento

📁 `src/theme/spacing.ts` — escala base 4px

| Token | px | Uso típico |
|-------|----|-----------|
| 1 | 4 | hairline gap |
| 2 | 8 | inline gap |
| 3 | 12 | padding compacto |
| 4 | 16 | padding padrão de card |
| 5 | 20 | espaçamento médio |
| 6 | 24 | padding generoso (separa blocos) |
| 8 | 32 | seções |
| 10 / 12 / 14 / 24 | 40 / 48 / 56 / 96 | hero / página inteira |

**Regra:** sem divisores de 1px — usa padding 24–32 entre blocos.

---

## Componentes — padrões visuais

### Cards
- `borderRadius: 16–24`
- `padding: 16–24`
- Fundo `surface` (branco) sobre `background` rosado
- Shadow sutil: `shadowOpacity 0.06–0.10`, offset `0,4`, radius `12–16`

### Botões primários
- Gradiente `primaryDeep → primary` (`#C8255F → #EC3779`)
- `borderRadius: 16–28` (pill em algumas variações)
- Altura 48–56 dependendo da tela
- Texto branco `PlusJakartaSans 600 SemiBold`

### Inputs
- Fundo `surface`, borda `border` (`#EDE7F3`)
- Focus: borda `primary`
- Placeholder: `inkSubtle` (`#8A7FA0`)
- `react-native-mask-input` para datas DD/MM/AAAA

### Tab bar flutuante
- Pílula `#1F1A2E` (ink) com `borderRadius: 32`
- Posição absoluta, margin 16 lateral, bottom dinâmico (`safe-area + 22`)
- Item ativo: pílula `primary` rosa expandida com label
- Item inativo: ícone só, opacidade 55%
- Animação spring (tension 300, friction 22)

### Feed Revista (Explorar)
- `CardShell` ocupa 87% da altura visível (snap), 13% peek do próximo card
- Eyebrow (chapter + week) no topo
- Título h2 + corpo body
- `CardActionBar` no rodapé: Salvar (bookmark), Anotar (NoteSheet modal), Compartilhar (Share nativo)
- `FeedTopBar`: pílula com trimestre atual

### Painel Início (Dashboard)
- Hero gigante com a fruta 3D real (`fruta-NN.png`) sobre gradiente lavanda → rosa suave
- Pílulas com tamanho cm + peso g
- Card "Marco da semana" em destaque (`clinicalMilestone`)
- Carrossel horizontal de ações rápidas
- Sino com pontinho de notificação (sem badge numérico)

### Bottom sheets
- `borderRadius` superior `28`
- Handle drag bar central (4px alto, 40px largo, `inkSubtle`)
- Overlay `rgba(31,26,46,0.5)`

---

## Ícones — DGIcon

📁 `src/components/DGIcon.tsx` — ~38 ícones SVG customizados (react-native-svg)

Inclui: home, compass, tool, user, bell, bookmark, share, heart, plus, check, x, chevrons, search, calendar, clock, baby, fruit, drop, leaf, sparkle, lightning, eye, settings, info, alert, flower, weight, ruler, sleep, mood, food, pill, droplet…

**Convenção:** sempre via `<DGIcon name="..." size={N} color={...} />`. **Banimento de emojis no UI estrutural** — emojis só aparecem no conteúdo editorial dos cards do feed.

---

## Imagens — Frutas 3D

📁 `assets/fruits/`
- `celula.png` (S1–S2 — aglomerado de células)
- `fruta-03.png` .. `fruta-40.png` (38 frutas, render 3D clay/Pixar, 512×512, ~30–60 KB cada)
- Originais master 1024×1024 em `_originais/` (backup, fora do bundle)
- **Imagens são a fonte de verdade visual** — os reference docs editoriais foram alinhados às frutas das imagens (não o contrário)

---

## Sombras (shadows)

📁 `src/theme/shadows.ts`

| Nível | Uso |
|-------|-----|
| `soft` | cards padrão (offset 0,4 · radius 12 · opacity 0.06) |
| `card` | cards interativos (offset 0,8 · radius 16 · opacity 0.08) |
| `cta` | botões primários (offset 0,12 · radius 24 · opacity 0.12) |

---

## Border radius

📁 `src/theme/borderRadius.ts` — escala consistente

`xs:8 · sm:12 · md:16 · lg:20 · xl:24 · 2xl:28 · 3xl:32 · pill:999`

---

## Tone of voice / copy

- **Acolhedor, próximo, em 2ª pessoa** ("Você está…", "Seu bebê…")
- **Sem jargão médico desnecessário** — explicar quando usar
- **Brasileiro** — gírias suaves OK ("uma trégua", "do tamanho de…")
- **Sem urgência forçada** — nada de "ÚLTIMA CHANCE!"
- **Sinais de alerta** sempre destacados com `warning`/`error` + ícone de alerta
- **Frase motivacional** ao fim de cada semana (Fraunces italic)

---

## Resumo das regras de uso

1. **Imagens 3D = fonte de verdade.** Texto se adapta à imagem, não o contrário.
2. **Nenhum emoji no UI estrutural** — só em conteúdo editorial dos cards.
3. **Tab bar é flutuante** — todas as telas devem ter `paddingBottom` via `useBottomSpacing`.
4. **Inputs sempre com máscara** quando aplicável (datas, telefones).
5. **Glassmorphism** com moderação — só em hero do dashboard e cards de marcos.
6. **Fontes só carregadas** em `app/_layout.tsx`. Nunca usar `fontFamily` arbitrário.
7. **`maxFontSizeMultiplier = 1.3`** — global, evita overflow no MIUI.
