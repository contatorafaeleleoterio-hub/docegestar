# Handoff: DoceGestar — App de acompanhamento gestacional

## Visão geral
DoceGestar é um app (mobile-first + web) para mulheres gestantes acompanharem a jornada da gestação: bebê semana a semana, saúde da mãe, exames, consultas, lembretes de vitaminas, contador de chutes, plano de parto, enxoval, diário, álbum, chat com obstetriz e plano premium.

Este pacote contém **17 telas mobile hi-fi** + **documentação completa do Design System** (Moderno Suave).

## Sobre os arquivos de design
Os arquivos em `screens/` e `design-system/` são **referências de design criadas em HTML** — protótipos que mostram look & feel e comportamento pretendido, **não código de produção para copiar diretamente**.

A tarefa é **recriar esses designs no ambiente existente do projeto** (React Native, Flutter, SwiftUI, Next.js, etc.) usando os padrões e bibliotecas já estabelecidos. Se ainda não houver codebase, escolha o framework mais apropriado (sugestão: **React Native + Expo** para mobile, **Next.js + TypeScript** para web).

## Fidelidade
**Hi-fi (alta fidelidade)** — Cores, tipografia, espaçamento, raios, sombras e interações estão finais. Implemente pixel-perfect usando as bibliotecas do codebase.

## Telas

Todas em viewport 360×780 (iPhone 14 Pro padrão). Tab bar fixa em `home / bebê / saúde / diário / eu`.

### Entrada
- **Onboarding** (`screens/direction-b-1.jsx` → `OnboardingB`) — Hero ilustrado + headline + CTA pill primário + link "Já tem conta? Entrar".
- **Login** (`LoginB`) — Form email/senha + social (Google/Apple) + link recuperação.

### Núcleo
- **Hoje / Home** (`HomeB`) — Header com avatar + saudação + bell. Hero pink gradient com semanas (display 56px) + ilustração do feto + progress. Linha "Seu bebê hoje" + 3 cards de cuidados + atalho contador de chutes. Tab bar.
- **Bebê semanal** (`screens/direction-b-2.jsx` → `BabyWeekB`) — Header com semana navegável. Círculo de progresso 220px com ilustração do feto centralizada + badges de comprimento/peso laterais. Grade 3×2 de cards de conteúdo semanal categorizado.
- **Saúde da mãe** (`HealthB`) — Header + card de timeline gestacional 6w-28w com marker animado. Grid 2×2 de métricas (pressão, sono, pH urina, dor). Card de ganho de peso com gráfico SVG sparkline. Chips de sintomas (selecionados em pink500).
- **Diário** (`DiaryB`) — Header editorial com data grande. Seletor de mood (emojis substituídos por ícones na implementação). Quick chips. Timeline de entradas (marco em pink gradient, foto, registro de chutes). FAB pink.

### Cuidado clínico
- **Agenda de consultas** (`screens/direction-b-3.jsx` → `AppointmentsB`)
- **Exames & resultados** (`screens/direction-b-4.jsx` → `ExamsB`) — Status row (concluídos/pendentes/atenção) + tabs trimestre + card pendente destacado em warning + lista de exames concluídos.
- **Lembretes de vitaminas** (`MedsB`)
- **Contador de chutes** (`KickCounterB`) — Tela cheia, círculo de contagem grande.

### Conexão & memórias
- **Chat com obstetriz** (`ChatB`) — Header com avatar online status. Mensagens recebidas (radius `18 18 18 4`) em surface, enviadas (radius `18 18 4 18`) em pink500. Card de conteúdo embed. Indicador de digitação. Composer com botão de envio pink.
- **Álbum / Galeria** (`AlbumB`) — Header + filtros + grid editorial 2×2 (esta semana) + timeline mensal 3-up + strip de marco compartilhável.
- **Artigo / Conteúdo Plus** (`ArticleB`) — Hero foto 240px + nav glass + título + meta autor + body + pull quote serif itálico + checklist preview com paywall.

### Preparação para o parto
- **Plano de parto** (`BirthPlanB`) — Header gradient lavanda→pink. Progress 62%. 8 seções com check de completude. CTA "Enviar para obstetra".
- **Enxoval / Checklist** (`NurseryB`) — Progress circular hero. 4 categorias (roupas/higiene/quarto/saída) em grid. Lista de itens com checkbox + preço + tag prioridade.

### Conta & monetização
- **Perfil** (`ProfileB`)
- **Premium / Paywall** (`PremiumB`)

## Design Tokens

Todos definidos em `design-system/tokens.jsx`.

### Cores

| Token | Hex | Uso |
|---|---|---|
| `pink50` | `#FFF1F5` | Background tinted |
| `pink100` | `#FFD9E4` | Background suave |
| `pink200` | `#FFB3CB` | Acentos |
| `pink300` | `#FF7FAB` | Hover state |
| `pink400` | `#FF4B8E` | Gradient start |
| **`pink500`** | **`#EC3779`** | **CTA principal · estados ativos** |
| `pink600` | `#C8255F` | Pressed state |
| `lav50` | `#F4F0FB` | Background segundo plano |
| `lav100` | `#E5DCF5` | Cards suaves |
| `lav200` | `#C9B8E8` | Ícones tinted lavanda |
| `bg` | `#FBF7FA` | App background |
| `surface` | `#FFFFFF` | Cards |
| `ink` | `#1F1A2E` | Texto principal |
| `inkMuted` | `#5E5870` | Texto secundário |
| `inkSubtle` | `#9690A8` | Placeholder, meta |
| `hairline` | `#EDE7F3` | Borders, dividers |
| `success` | `#3DB57E` | Status positivo |
| `warning` | `#F0A23A` | Status atenção |
| `danger` | `#E15858` | Status erro |

### Tipografia

Fontes:
- **Plus Jakarta Sans** (Google Fonts) — UI principal (95% dos casos)
- **Fraunces** (Google Fonts) — Pull quotes e acentos editoriais (italic 500)

Escala:
| Nome | Tamanho | Peso | Letter-spacing |
|---|---|---|---|
| Display | 56px | 800 | -2 |
| H1 | 32px | 800 | -1.2 |
| H2 | 22px | 800 | -0.6 |
| H3 | 18px | 700 | -0.2 |
| Body | 14px | 500 | 0 |
| Caption | 12px | 600 | 0 |
| Eyebrow | 11px UPPERCASE | 700 | 1.2 |

### Espaçamento (base 4)
`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56`

### Raios
| Token | px |
|---|---|
| xs | 8 |
| sm | 12 |
| md | 18 |
| lg | 26 |
| xl | 36 |
| pill | 100 (∞) |

### Sombras
- **soft**: `0 2px 8px rgba(40,20,60,0.04), 0 16px 40px rgba(236,55,121,0.06)`
- **card**: `0 1px 2px rgba(40,20,60,0.04), 0 8px 28px rgba(40,20,60,0.06)`
- **cta**: `0 12px 28px rgba(236,55,121,0.4)` (pink500 com 40% alpha)

## Iconografia

**36 ícones customizados** em `design-system/ds-icons.jsx`. Não use Lucide/Feather/MaterialIcons direto — recrie esses 36 mantendo as características:

- Grid 24×24
- `strokeWidth: 1.75` uniforme
- `strokeLinecap: "round"`, `strokeLinejoin: "round"`
- `fill: none`, cor via `currentColor`

Tamanhos nomeados:
| Token | px | Uso |
|---|---|---|
| xs | 12 | Badges, status |
| sm | 16 | Inline em texto, chips |
| md | 20 | Botões, tabs |
| lg | 24 | Header, ação principal |
| xl | 32 | Empty states, hero |

Variantes de aplicação:
1. **Outline** — Padrão. Cor `ink` ou `inkMuted`.
2. **Tinted** — Ícone outline dentro de container `{cor}/20% bg` + ícone na cor sólida.
3. **Solid** — Ícone branco dentro de container `pink500` (CTAs primários).
4. **Premium** — Gradient dourado `#F0C75C → #C9923A` para conteúdo exclusivo.

**Banido**: emojis em UI funcional (ações, status, navegação). Permitido apenas em entradas livres do diário escritas pela usuária.

## Componentes principais

### Button
- Variantes: `primary` (pink500), `secondary` (lav50), `ghost` (border hairline), `danger`
- Tamanhos: `sm` (40px), `md` (52px), `lg` (58px)
- Sempre `border-radius: 100` (pill)
- Suporta `icon` à esquerda

### Chip
- Selecionado: `pink500 bg + white text + shadow-cta`
- Padrão: `surface bg + ink text + border hairline`

### Input
- 52px altura, radius 16, `surface bg + border 1.5px hairline`
- Ícone à esquerda em `inkMuted`
- Label 12px/600 acima

### Toggle
- 46×28 pill, círculo 22px com sombra suave
- On: `pink500` / Off: `hairline`

### Badge
- 10.5px/700, padding 3×9, radius pill
- Tones: `neutral` (lav50/pink600), `success`, `warning`, `danger`

### Card (List item / Metric)
- `surface bg + radius 16/18 + shadow-card + padding 14`

## Padrões

### Header (toda tela)
3 zonas:
1. **Navegação esquerda** — 42×42 botão (back / menu) — surface + shadow-card
2. **Centro** — Eyebrow 11px inkMuted + Título H2 22px
3. **Ação direita** — 42×42 (pink500 + shadow-cta para primária / surface para secundária)

### Hero emocional
Gradient `pink400 → pink500 → pink600`, branco em cima, tipografia Display 40-56px, progress bar branca `25% alpha`.

### Tab bar (mobile)
Fixa no fundo, `ink bg`, radius 32, padding 6. Item ativo expande com label visível em `pink500 bg`.

## Voz e tom

✅ **SIM** — Direto, caloroso, respeitoso. Trate a usuária como adulta.
> "Você está na metade da jornada. Continue assim."

❌ **NÃO** — Diminutivos forçados, infantilização, emojis em excesso.
> "Aaaaai, mamãezinha! Tá quaaase lá! 💕💕💕"

## Arquivos neste pacote

```
design_handoff_docegestar/
├── README.md                       ← este arquivo
├── DoceGestar.html                 ← canvas com todas as 17 telas
├── DesignSystem.html               ← documentação visual interativa
├── design-system/
│   ├── tokens.jsx                  ← tokens de cor/tipo/espaço
│   ├── ds-icons.jsx                ← 36 ícones padronizados + componente DGIcon
│   ├── ds-sections-1.jsx           ← seções foundation da doc
│   ├── ds-sections-2.jsx           ← seções componentes da doc
│   ├── logo.jsx                    ← logo SVG
│   └── illustrations.jsx           ← ilustrações (mãe, feto) + ícones legados
└── screens/
    ├── direction-b-1.jsx           ← Onboarding, Login, Home
    ├── direction-b-2.jsx           ← Bebê, Saúde, Diário
    ├── direction-b-3.jsx           ← Agenda, Chutes, Vitaminas, Premium, Perfil
    └── direction-b-4.jsx           ← Chat, Álbum, Exames, Parto, Enxoval, Artigo
```

## Como abrir os designs

1. Abra `DesignSystem.html` em um navegador para ver toda a documentação navegável.
2. Abra `DoceGestar.html` para ver as 17 telas mobile lado a lado em um canvas pan/zoom.

## Próximos passos sugeridos para o dev

1. Configurar Plus Jakarta Sans + Fraunces no projeto (Google Fonts ou self-hosted)
2. Implementar tokens em `theme.ts` / `tailwind.config.js` / equivalente
3. Recriar os 36 ícones como componentes (sugestão: SVGR ou componente único parametrizado tipo `DGIcon`)
4. Construir biblioteca de componentes (Button, Chip, Badge, Input, Toggle, ListItem, MetricCard)
5. Montar telas a partir dos componentes
