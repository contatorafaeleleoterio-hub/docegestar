---
name: DoceGestar
description: Aplicativo de acompanhamento gestacional — elegante, acolhedor e premium. Identidade visual derivada da logo oficial — paleta ameixa-roxo + rose-gold com gradiente floral, tipografia Cormorant Garamond nos títulos e Plus Jakarta Sans no corpo, cantos generosamente arredondados.
colors:
  primary: "#DB2777"
  on-primary: "#FFFFFF"
  primary-deep: "#9D174D"
  primary-soft: "#FCE7F3"
  primary-tint: "#FFF5FA"
  secondary: "#D4927A"
  on-secondary: "#2C1810"
  secondary-soft: "#F9EDE8"
  on-secondary-soft: "#7A3E2E"
  accent-blush: "#F0BAB0"
  accent-mauve: "#BC7B6A"
  background: "#FFFFFF"
  on-background: "#111827"
  surface: "#FFFFFF"
  on-surface: "#111827"
  surface-muted: "#F9FAFB"
  on-surface-variant: "#6B7280"
  on-surface-muted: "#6B7280"
  surface-inverse: "#111827"
  on-surface-inverse: "#FFFFFF"
  surface-inverse-variant: "#1F2937"
  outline: "#E5E7EB"
  outline-variant: "#F3F4F6"
  success: "#166534"
  success-soft: "#DCFCE7"
  warning: "#92400E"
  warning-soft: "#FEF3C7"
  info: "#1D4ED8"
  info-soft: "#DBEAFE"
  error: "#B91C1C"
  error-soft: "#FEE2E2"
typography:
  display-xl:
    fontFamily: Cormorant Garamond
    fontSize: 64px
    fontWeight: "700"
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Cormorant Garamond
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Cormorant Garamond
    fontSize: 28px
    fontWeight: "600"
    lineHeight: 34px
  headline-md:
    fontFamily: Cormorant Garamond
    fontSize: 22px
    fontWeight: "600"
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: "600"
    lineHeight: 24px
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: "600"
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: "700"
    lineHeight: 14px
    letterSpacing: 0.06em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
rounded:
  sm: 8px
  DEFAULT: 12px
  md: 16px
  lg: 20px
  xl: 24px
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  screen-padding: 20px
  card-padding: 20px
  card-gap: 12px
  section-gap: 24px
components:
  hero-trimester-card:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.xl}"
    padding: 24px
  stat-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 16px
  metric-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 16px
  list-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
    padding: 16px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 56px
    padding: 0 24px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 0 20px
  button-ghost:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 44px
    padding: 0 18px
  button-inverse:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 56px
    padding: 0 24px
  fab:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: 56px
  pill-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 8px 14px
  pill-inactive:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 8px 14px
  badge-plus:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  badge-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  badge-warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
    height: 52px
    padding: 14px 16px
  bottom-nav:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-surface-inverse}"
    rounded: "{rounded.full}"
    height: 64px
    padding: 8px 12px
  bottom-nav-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 10px 16px
  paywall-card:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-surface-inverse}"
    rounded: "{rounded.xl}"
    padding: 28px
  diary-marker-card:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.headline-md}"
    rounded: "{rounded.lg}"
    padding: 20px
  reminder-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
    padding: 14px 16px
  mood-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    size: 56px
  mood-chip-selected:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.full}"
    size: 56px
  screen-canvas:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
    typography: "{typography.body-lg}"
    padding: 20px
  surface-muted-card:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
  metadata-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.caption}"
  caption-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.caption}"
  divider:
    backgroundColor: "{colors.outline}"
    rounded: "{rounded.sm}"
    height: 1px
  divider-soft:
    backgroundColor: "{colors.outline-variant}"
    rounded: "{rounded.sm}"
    height: 1px
  bem-estar-tile:
    backgroundColor: "{colors.secondary-soft}"
    textColor: "{colors.on-secondary-soft}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 14px
  secondary-pill:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 8px 14px
  info-banner:
    backgroundColor: "{colors.info-soft}"
    textColor: "{colors.info}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 14px
  alert-banner:
    backgroundColor: "{colors.error-soft}"
    textColor: "{colors.error}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 14px
  paywall-inner-tile:
    backgroundColor: "{colors.surface-inverse-variant}"
    textColor: "{colors.on-surface-inverse}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
  progress-ring:
    backgroundColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    size: 6px
  avatar-halo:
    backgroundColor: "{colors.accent-blush}"
    rounded: "{rounded.full}"
    size: 96px
  rose-accent-tile:
    backgroundColor: "{colors.secondary-soft}"
    textColor: "{colors.on-secondary-soft}"
    rounded: "{rounded.md}"
    padding: 16px
  logo-symbol:
    backgroundColor: "{colors.accent-mauve}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    size: 48px
---

## Overview

DoceGestar é um aplicativo de acompanhamento gestacional para gestantes brasileiras que querem viver os ~280 dias da jornada com tranquilidade, organização e leveza. A identidade visual é derivada diretamente da **logo oficial**: gestante-rosa em gradiente floral rose-gold, wordmark em roxo-ameixa serifado e fundo creme.

A direção é **"elegante e acolhedora"**: tipografia serifada Cormorant Garamond nos títulos (que ecoa o wordmark da logo), Plus Jakarta Sans no corpo (clareza funcional), paleta ameixa + rose-gold em lugar do rosa vibrante. O tom é **premium feminino** — não clínico, não infantil, não genérico.

O sistema é **mobile-first**, otimizado para uso rápido — checagem diária de cuidados, registro de chutes em segundos, leitura do conteúdo da semana. A meta emocional é fazer a usuária sentir que tem uma **doula digital de bolso**: presente, cuidadosa e refinada.

## Brand Logo

### Símbolo — Descrição técnica

Silhueta feminina em perfil esquerdo (facing right) — o rosto aponta para a direita na imagem — estilizada e fluida, composta por formas orgânicas que se fundem com elementos florais. O conjunto total forma uma figura verticalmente alongada, leve, sem contornos rígidos.

**Cabeça e rosto:** Perfil suave voltado para a direita, nariz e queixo delicados visíveis, sem detalhes faciais internos. O cabelo desce em ondas fluidas pelo lado direito da imagem (lado esquerdo anatômico da personagem) e pela frente do corpo, composto por múltiplas camadas de pétalas alongadas que simulam mechas — transicionando organicamente para o corpo e para a base floral.

**Corpo:** Torso visto de perfil, claramente grávido — barriga projetada para a direita com curva arredondada e proeminente. O contorno do peito, abdômen e costas é delineado por uma linha branca fina e contínua sobre o preenchimento em gradiente. As costas da figura ficam posicionadas à esquerda da composição.

**Fusão floral — elemento central:** A barriga se integra diretamente com uma rosa em botão aberto, posicionada na frente do abdômen. A rosa ocupa o quadrante inferior-direito da composição. Suas pétalas externas são grandes e abertas; o centro exibe espiral cônica clássica de rosa, com pétalas internas enroladas. As folhas da rosa se projetam para baixo e para os lados, formando a base principal da composição.

**Cabelo / segunda camada floral:** As formas que simulam mechas — visíveis no lado direito da imagem — se alargam progressivamente na base, mimetizando pétalas de flores ou folhas grandes. No quadrante inferior-esquerdo essa expansão forma uma segunda camada floral independente, com volume e presença próprios: pétalas/folhas amplas que espelham a rosa e equilibram visualmente a composição.

### Paleta cromática do símbolo

| Zona | Cor predominante | Token |
|------|-----------------|-------|
| Topo / cabeça / cabelo (claro) | Blush rosado suave | `accent-blush #F0BAB0` |
| Corpo / torso / barriga | Rose-gold médio | `secondary #D4927A` |
| Base / cabelo inferior / folhas | Mauve nude | `accent-mauve #BC7B6A` |
| Linha de contorno de planos | Branco puro | `on-primary #FFFFFF` |
| Fundo externo (não integra o símbolo) | Creme bege | `background #F7F0EB` |
| Wordmark "DoceGestar" | Roxo-ameixa serifado | `primary #4A3060` |

### Estilo gráfico

Ilustração vetorial orgânica com estética de glassmorphism floral — camadas translúcidas sobrepostas, volumes suaves sem arestas, sensação tridimensional obtida exclusivamente pelo gradiente interno e pela linha branca de separação de planos. Sem fundo próprio: a figura existe isolada sobre fundo creme externo que não integra o símbolo.

### Wordmark

**"DoceGestar"** em serif elegante próxima ao Cormorant Garamond, cor `primary #4A3060`. Tagline abaixo: _"Acompanhe sua gestação com amor"_ em peso regular, mesmo tom ameixa.

### Regras de uso da logo

- **Arquivo de referência:** `assets/Logo_Marca_DoceGestar_Base.png`
- **Espaço mínimo (clear space):** equivalente à altura da letra "D" do wordmark em todos os lados
- **Tamanho mínimo digital:** 120px de largura para símbolo + wordmark; 48px apenas para o símbolo isolado
- **Fundos permitidos:** creme `#F7F0EB` (preferencial), branco `#FFFFFF`, ameixa `#4A3060` (versão invertida)
- **Fundos proibidos:** qualquer cor vibrante, fotografias, padrões com ruído visual
- **Não distorcer** proporções; **não aplicar** sombras externas; **não recolorizar** o símbolo

## Colors

A paleta tem dois eixos derivados da logo:

**Eixo 1 — Ameixa/Roxo (`primary #4A3060`):** Cor do wordmark "DoceGestar". Usada para toda ação principal — CTAs, FAB, tab ativa, hero card, marcos de celebração. Contraste 14.8:1 com fundo creme, 22:1 com branco. Altamente legível.

- **`primary #4A3060`** — ameixa profundo, CTAs e elementos de ação
- **`primary-deep #3A2250`** — ameixa mais escura, texto sobre fundos tintados
- **`primary-soft #EDE4F3`** — fundo de pílulas inativas, chips, mood-chips selecionados
- **`primary-tint #F7F3FB`** — fundo ultra-suave de badges e hovers

**Eixo 2 — Rose-gold (`secondary #D4927A`):** Cor dominante da ilustração da logo. Usada como acento decorativo — anel de progresso, tiles de bem-estar, avatar halo. Nunca como fundo de texto pequeno.

- **`secondary #D4927A`** — rose-gold, principal acento da marca
- **`accent-blush #F0BAB0`** — blush claro (topo da ilustração), halos suaves
- **`accent-mauve #BC7B6A`** — mauve nude (rosa/base da ilustração), tiles rose-accent
- **`secondary-soft #F9EDE8`** — fundo blush para tiles de bem-estar
- **`on-secondary-soft #7A3E2E`** — texto marrom-rosado sobre blush (6.5:1 ✓)

**Fundos e superfícies:**

- **`background #F7F0EB`** — creme quente (espelha o fundo da logo), nunca branco-hospital
- **`surface #FFFFFF`** — cards e inputs, máximo contraste com o creme
- **`surface-muted #FAF6F3`** — superfícies aninhadas
- **`surface-inverse #2E1B36`** — fundo da bottom nav flutuante e paywall premium

**Texto:** `on-surface #2E1B36` para títulos e valores; `on-surface-variant #6B5A72` para descrições; `on-surface-muted #7A6985` para metadados.

**Semânticas** — `success`, `warning`, `info`, `error` em tons escuros sobre fundos soft. Sempre em badges/banners, nunca como fundo de card grande.

Todos os pares texto/fundo atendem WCAG AA (≥ 4.5:1). O linter `design.md` valida automaticamente.

## Typography

Sistema duplo derivado da identidade da logo:

**Cormorant Garamond** — exclusivo para `display` e `headline`. Ecoa o wordmark serifado da logo. Peso 600–700 em tamanhos grandes mantém elegância sem fragilidade. Tracking ligeiramente negativo nos display sizes.

- **`display-xl` (64px/700)** — números heróis: "20 semanas", "3 chutes", "+5,8 kg".
- **`display-lg` (48px/700)** — contadores grandes (contador de chutes, destaque de consulta).
- **`headline-lg` (28px/600)** — títulos de tela principais ("Sua saúde", "Consultas", "Meu Diário").
- **`headline-md` (22px/600)** — marcos e celebrações ("MARCO — METADE!", texto do paywall).

**Plus Jakarta Sans** — para todo o resto. Legibilidade funcional, moderna.

- **`title-md/sm`** — títulos de seção ("Cuidados de hoje", "Conteúdo semanal").
- **`body-lg/md`** — copy de cards, descrições, texto de inputs.
- **`label-md/sm`** — botões, pílulas, badges, legendas. Tracking positivo em `label-sm`.
- **`caption`** — metadados temporais ("14:32", "há 2h", "ontem").

Regra: a serifa aparece **no máximo 2 vezes por tela** para evitar cansaço visual. Todo o resto é sans-serif.

## Layout

Grid mobile-first, single-column, com ritmo generoso.

- **Padding lateral:** 20px constantes.
- **Ritmo vertical:** múltiplos de 8px. Entre cards = 12px; entre seções = 24px.
- **Grids horizontais** (stats, vitais) usam gap 12px e `rounded.lg`.
- **Bottom navigation** flutua 16px da borda inferior — ilha ameixa escura sobre o creme.
- **Headers:** ícone de voltar (44×44px) à esquerda, título `headline-lg` serifado centralizado, ação contextual à direita.
- **Safe areas iOS/Android** sempre respeitadas.

## Elevation & Depth

Profundidade por diferença de tom + sombra sutil — sem bordas pesadas.

- **Nível 0:** `background #F7F0EB` creme quente.
- **Nível 1 — Cards:** `surface #FFFFFF`, sombra `0 2px 8px rgba(46, 27, 54, 0.05)`.
- **Nível 2 — Hero / Marco / Paywall:** fundo `primary` ameixa, sombra `0 8px 24px rgba(74, 48, 96, 0.16)`.
- **Nível 3 — Bottom nav / FAB:** sombra `0 8px 32px rgba(46, 27, 54, 0.20)`.
- **Sem bordas duras em cards:** `outline #DDD5E2` apenas em divisores de 1px internos.

Gradientes reservados para: hero card (linear `primary-deep → primary` ~135°) e paywall (radial `surface-inverse-variant`). Rose-gold como gradiente apenas em elementos decorativos (halo, progress ring).

## Shapes

- **Pílulas (`rounded.full`)** — botões, abas, badges, chips, item ativo da bottom nav. Forma assinatura.
- **Cards (`rounded.xl` 24px)** — hero e paywall; `rounded.lg` (20px) para listas e métricas; `rounded.md` (16px) para rows e inputs.
- **Avatares** — `rounded.full` com halo `accent-blush`. Ecoa o gradiente circular da ilustração da logo.
- **Iconografia** — outline 2px stroke-linecap arredondado. Filled só em estado ativo.
- **Ilustrações** — gradiente suave + linhas brancas de contorno, estilo do símbolo da logo. Nunca fotografias.

## Components

### Hero trimester card

Card grande com fundo `primary` ameixa, texto branco. Número de semanas em `display-lg` Cormorant Garamond. Ilustração do bebê em gradiente rose-gold flutua à direita — espelha o símbolo da logo. É onde a identidade gráfica fica mais completa.

### Stat / Metric cards

Cards brancos em grid horizontal. Ícone 24×24 ameixa à esquerda, label `body-md` variant, valor em `headline-md` serifado. Badge `success` no canto quando há status.

### Pílulas e chips

**Ativa:** `primary` ameixa, texto branco. **Inativa:** `primary-soft` lavanda suave, texto `primary-deep`. Mood selector: círculos `rounded.full` com emoji; selecionado com `primary-tint` e anel ameixa 2px.

### Bottom navigation

Ilha `surface-inverse` ameixa escura, 5 ícones. Ativo em pílula `primary` expanding pill. Inativo: ícone branco. Sombra elevação 3.

### Floating Action Button (FAB)

56×56px `primary` ameixa, ícone branco "+". Bottom-right, 16px do edge da bottom nav.

### Rose-gold accent tile

Fundo `secondary-soft` blush, texto `accent-mauve`. Diferencia conteúdo de bem-estar/Nutrição dos cards clínicos ameixa. Par visual direto com o símbolo da logo.

### Paywall premium

`surface-inverse` ameixa escura, `rounded.xl`. Headline branca em `headline-lg` Cormorant Garamond. Benefícios com ícones rose-gold. CTA "Começar 7 dias grátis" em `button-inverse` (branco, texto escuro).

### Inputs

`rounded.md`, fundo branco, outline `primary-soft` 1.5px em foco. Ícone à esquerda em `on-surface-variant`. Link secundário em `caption` cor `primary-deep`.

### Banners semânticos

`info-banner` azul soft para dicas. `alert-banner` vermelho soft apenas para alertas médicos reais. Ambos `rounded.md`, inline ao conteúdo.

## Do's and Don'ts

**Do**

- Use Cormorant Garamond com generosidade em números heróis — é onde a elegância da marca aparece.
- Mantenha fundo creme `#F7F0EB` nas telas — diferencia do branco hospitalar e ecoa a logo.
- Use rose-gold (`secondary`, `accent-blush`, `accent-mauve`) como acento floral decorativo.
- Garanta touch targets ≥ 44×44px em qualquer elemento clicável.
- Celebre marcos com `diary-marker-card` ameixa — faz parecer um momento especial.

**Don't**

- Não use Cormorant Garamond abaixo de 600 em telas pequenas — fica frágil e ilegível.
- Não use rose-gold como fundo de elemento com texto pequeno — contraste insuficiente.
- Não misture mais de dois estilos tipográficos por tela.
- Não use fotografias humanas — quebra a estética ilustrada e cria vieses corporais.
- Não use gradientes em botões — reservados para ilustrações e hero card.
- Não substitua o fundo creme por branco puro — perde continuidade com a identidade da logo.
