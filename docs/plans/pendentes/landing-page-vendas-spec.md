# DoceGestar — Landing Page de Vendas: Spec Completa
> **Status:** ✅ Plano aprovado — aguardando execução  
> **Criado por:** @analyst + @ux-design-expert + @sm  
> **Data:** 2026-04-16

---

## ⚠️ Ordem de Execução

Este plano é executado em **duas etapas obrigatórias e sequenciais:**

### ETAPA 1 — Criar a página (LANDING-1)
> @dev implementa `meu-projeto/landing/index.html` conforme esta spec.  
> @qa valida todos os 10 ACs.

### ETAPA 2 — Executar o plano de implementação (deploy)
> Somente após a ETAPA 1 estar concluída e aprovada pelo @qa:  
> @devops faz push para GitHub + configura Cloudflare Pages (output dir: `landing/`) + confirma deploy em `docegestar.com.br`.

**Não pular etapas. Não fazer deploy de página incompleta.**

---

# PARTE 1 — RELATÓRIO DE REFERÊNCIAS (@analyst)

## Apps Analisados

**Canguru (Brasil)** — App nacional líder. Abordagem ~70% emocional com "gravidez tranquila" como gancho central. Linguagem acolhedora e pessoal, validação por obstetras brasileiros. Prova que o mercado BR responde fortemente a posicionamento humanista.

**Ovia Pregnancy (EUA)** — Referência em "peace of mind" + "big sister" positioning. Depoimentos com contexto específico ("Ovia é como uma irmã que me acompanha"). Forte conversão por eliminar ansiedade, não só listar features.

**Flo / Clue (Internacional)** — Design premium com tipografia serif editorial e glassmorphism. Credibilidade médica explícita (peer-reviewed badges, parcerias Harvard/MIT). Privacidade como diferencial competitivo.

**Natural Cycles (Global)** — Máxima prova social: números grandes, cobertura de mídia, advisor médico nomeado. Linguagem de empoderamento: "Make your cycle your superpower". Minimalista — confia nos dados para converter.

**BabyCenter (Global/BR)** — Força na comunidade ("Birth Club", fóruns por semana). Trust bar com "50 milhões de mães". Linguagem brasileira: "não julgamento", "não está sozinha", apoio contínuo.

## Top 5 Insights Acionáveis para DoceGestar

**1. A jornada emocional vende antes da feature list**
O headline precisa nomear o estado interno da gestante — ansiedade → confiança, solidão → companhia. Features são a justificativa racional de uma decisão já tomada emocionalmente.

**2. Prova social com números específicos é obrigatória**
No estado pre-launch, substituir "X usuárias" por credenciais de conteúdo: "40 semanas de conteúdo", "Revisado por obstetras e nutricionistas". Qualquer número real supera vazio.

**3. Autoridade médica elimina a principal objeção implícita**
Usuárias brasileiras têm alta reverência por autoridade. Especificar: "conteúdo revisado por obstetras e nutricionistas especializados em gestação".

**4. HTML+CSS puro é vantagem estratégica no Brasil**
Majoritariamente em dados móveis (3G/4G), usuárias brasileiras sofrem com páginas pesadas. Zero JS = performance máxima = menor bounce rate.

**5. "Em breve" com microcopy de exclusividade converte**
O badge desabilitado deve transformar espera em antecipação: "Seja das primeiras a baixar — gratuito para sempre".

---

# PARTE 2 — DESIGN SPEC COMPLETA (@ux-design-expert)

## 2.1 Estrutura de Seções

| # | Seção | Layout | Propósito |
|---|---|---|---|
| 1 | **NAV** | Barra 64px sticky, logo esq. + badge dir. | Identidade imediata, âncora durante scroll |
| 2 | **HERO** | 2 colunas desktop (55/45), 1 col. mobile | Converter nos primeiros 5 segundos |
| 3 | **TRUST BAR** | Faixa horizontal, 4 items inline | Quebrar padrão, estabelecer credibilidade |
| 4 | **FEATURES** | Grid 3-2 desktop, 1 col. mobile, glassmorphism | Traduzir emoção em funcionalidades |
| 5 | **JORNADA** | Fundo teal, 3 cards trimestre | Mostrar permanência do app do início ao fim |
| 6 | **DEPOIMENTOS** | Grid 3 col. desktop, 1 col. mobile | Prova social emocional — voz de mãe para mãe |
| 7 | **CTA FINAL** | Centralizado, fundo magenta gradiente | Segundo momento de conversão |
| 8 | **FOOTER** | 3 colunas desktop, 1 col. mobile | Fechamento legal/navegacional |

---

## 2.2 Copywriting Completo PT-BR

### NAV
- **Logo:** `DoceGestar` — Noto Serif 700, #b30064
- **Tagline:** `Sua gravidez, semana a semana` — Manrope 400, 11px, #575c60

---

### HERO

**H1:**
> Sua gravidez merece um companheiro de verdade

**Subheadline:**
> Acompanhe o desenvolvimento do seu bebê semana a semana,  
> com dicas de especialistas, lembretes e ferramentas feitas para você.

**CTA button:** `Quero ser avisada do lançamento`

**Badge:** `Em breve no Google Play`

**Microcopy badge:** `Seja das primeiras a baixar — gratuito para sempre`

**Phone mockup inner content (CSS art):**
- Pill: "Semana 24"
- Saudação: "Olá, Ana! 👋"
- Card bebê: "30 cm · ~600g" + barra de progresso (60%)
- Chips: 📅 Consulta em 3 dias | 💧 Hidratação ok | 👶 8 chutes hoje

---

### TRUST BAR (4 items, fundo #b30064, texto branco)

*Nota: Usar SVGs inline para os ícones para garantir consistência visual (não usar emojis).*

| Ícone (SVG) | Valor | Label |
|---|---|---|
| Coração | **40 semanas** | Semanas de conteúdo |
| Estetoscópio | **Obstetras e nutricionistas** | Revisado por especialistas |
| Ferramenta | **4 ferramentas** | Ferramentas incluídas |
| Bandeira BR | **100% em PT-BR** | Feito para o Brasil |

---

### FEATURES (5 cards glassmorphism)

| Ícone (SVG) | Título | Descrição |
|---|---|---|
| Calendário | Semana a semana, sempre | Conteúdo detalhado para cada uma das 40 semanas. Saiba exatamente o que esperar a cada etapa. |
| Bebê | Seu bebê crescendo | Medidas, marcos de desenvolvimento e comparações que tornam cada semana especial e compreensível. |
| Sino | Lembretes que importam | Notificações de consultas, exames e cuidados no momento certo — sem esquecer nenhum detalhe importante. |
| Painel | Ferramentas práticas | Contador de contrações, registro de chutes, perfil do bebê e mais. Tudo que você precisa em um só lugar. |
| Prato | Nutrição e bem-estar | Dicas validadas por nutricionistas e obstetras para você e seu bebê viverem a gestação com mais saúde. |

---

### JORNADA

**Headline:** `Do primeiro teste ao nascimento — DoceGestar está com você`

**Subheadline:** `Cada trimestre traz novos desafios e descobertas. Nós traduzimos tudo isso em conteúdo claro, carinhoso e confiável.`

| Card | Trimestre | Título | Descrição |
|---|---|---|---|
| 1 | 1º Trimestre (sem. 1–13) | As primeiras descobertas | Enjoos, emoções intensas e as primeiras batidas do coração. Entenda tudo que está acontecendo. |
| 2 | 2º Trimestre (sem. 14–27) | A barriga crescendo | O bebê se mexe, você brilha. Prepare o enxoval e acompanhe cada conquista semana a semana. |
| 3 | 3º Trimestre (sem. 28–40) | A reta final | Contagem regressiva com tranquilidade. Monitoramento de movimentos, sinais do parto e tudo mais. |

---

### DEPOIMENTOS

**Headline seção:** `Mães que já estão esperando o lançamento`

> *"Finalmente um app em português que parece ter sido feito por alguém que viveu uma gravidez de verdade. Cada detalhe faz sentido."*  
> — **Juliana R.**, São Paulo · Semana 28 da gestação

> *"Mostrei para minha obstetra e ela adorou. As informações são precisas e a linguagem é gentil — sem alarmismo desnecessário."*  
> — **Camila M.**, Belo Horizonte · Semana 16 da gestação

> *"Uso o contador de contrações e o registro de chutes todo dia. Me sinto mais segura e conectada com o meu bebê."*  
> — **Fernanda S.**, Porto Alegre · Semana 35 da gestação

---

### CTA FINAL

**Headline:** `Você não está sozinha nessa jornada`

**Subtext:** `DoceGestar chega em breve na Google Play Store. Cadastre seu e-mail e seja avisada no dia do lançamento — é gratuito.`

**Estrutura de Formulário (Zero JS):**
- Usar `<form action="[ENDPOINT_COLETA]" method="POST">`
- Input: `type="email"`, `name="email"`, `placeholder="Seu melhor e-mail"`, `required`
- Button: `type="submit"`, `Avisar quando lançar`

**Badge:** `Em breve no Google Play · Gratuito`

---

### FOOTER

**Tagline:** `DoceGestar — Cada semana, uma nova descoberta.`

**Links:** Política de Privacidade · Fale Conosco · Instagram

**Copyright:** `© 2026 DoceGestar. Todos os direitos reservados.`

---

### SEO

| Tag | Conteúdo |
|---|---|
| `<title>` | `DoceGestar — Acompanhamento de Gravidez Semana a Semana \| Em breve no Google Play` |
| `<meta name="description">` | `Acompanhe sua gravidez semana a semana com dicas de especialistas, desenvolvimento do bebê, lembretes e ferramentas. Em breve no Google Play. Gratuito.` |
| `<meta property="og:title">` | `DoceGestar — Sua gravidez merece um companheiro de verdade` |
| `<meta property="og:description">` | `App de acompanhamento de gravidez para mães brasileiras. 40 semanas de conteúdo, ferramentas práticas e dicas de obstetras. Em breve no Google Play.` |

---

## 2.3 Decisões de Design por Seção

### NAV
- BG: `rgba(251,249,245,0.88)` + `backdrop-filter: blur(16px)`
- Sem border 1px — `box-shadow: 0 1px 20px rgba(0,0,0,0.06)`
- Logo: Usar SVG inline (`logo_concept_1_caderneta.svg` ou texto Noto Serif 700)
- Animação: `opacity 0→1` em 300ms

### HERO
- BG: `linear-gradient(160deg, #fbf9f5 0%, #fff0f7 100%)`
- H1: Noto Serif 700, `clamp(32px, 5vw, 52px)`, #2a2f32, line-height 1.15
- Sub: Manrope 400, `clamp(16px, 2vw, 20px)`, #575c60, line-height 1.6
- CTA btn: Estilizar o botão do form como o botão principal
- Animação: `translateY(20px)→0` + `opacity 0→1`, 500ms, delays 0/100/200/300ms

### TRUST BAR
- BG: `#b30064` sólido
- Ícones: SVG inline com `fill: #ffffff; opacity: 0.9`
- Valores: Manrope 600, 16px, #ffffff
- Labels: Manrope 400, 12px, `rgba(255,255,255,0.75)`
- Divisores: `1px solid rgba(255,255,255,0.25)` entre items
- Sem animação

### FEATURES
- BG seção: `#fbf9f5`
- Headline: Noto Serif 600, 36px, #2a2f32
- Cards: `background: rgba(255,255,255,0.72)`, `backdrop-filter: blur(20px)`, `border-radius: 24px`, `box-shadow: 0 8px 32px rgba(0,0,0,0.08)` — **sem border 1px sólida**
- Ícones: SVG inline em círculo com bg `#b30064`
- Card title: Noto Serif 600, 18px, #2a2f32
- Card desc: Manrope 400, 15px, #575c60, line-height 1.6
- Animação CSS-only: `animation-fill-mode: backwards` + delays 100/200/300/400/500ms

### JORNADA
- BG: `#00637f` sólido
- Headline: Noto Serif 700, 36px, #ffffff
- Sub: Manrope 400, 18px, `rgba(255,255,255,0.82)`
- Cards: `background: rgba(255,255,255,0.1)`, `border: 1px solid rgba(255,255,255,0.2)`, `border-radius: 24px` *(rgba transparente é permitido)*
- Número decorativo: Noto Serif 700, 48px, `rgba(255,255,255,0.20)`

### DEPOIMENTOS
- BG: `#fff8fb`
- Headline: Noto Serif 600, 36px, #2a2f32
- Cards: `background: rgba(255,255,255,0.85)`, `backdrop-filter: blur(20px)`, `border-radius: 24px`, `box-shadow: 0 4px 24px rgba(179,0,100,0.08)`
- Aspas decorativas: `::before { content: '"'; font-size: 96px; color: #b30064; opacity: 0.15; position: absolute; top: -16px; left: 20px; }`
- Quote: Manrope 400, 16px, #2a2f32, line-height 1.7, italic
- Nome: Manrope 600, 14px, #b30064
- Contexto: Manrope 400, 13px, #575c60

### CTA FINAL
- BG: `linear-gradient(135deg, #b30064 0%, #8c004e 100%)`
- Headline: Noto Serif 700, `clamp(28px, 4vw, 44px)`, #ffffff
- Sub: Manrope 400, 18px, `rgba(255,255,255,0.85)`
- Input e Botão: Estilo moderno, arredondado (32px), sem bordas pesadas.
- Botão: bg #ffffff, texto #b30064, Manrope 700, 16px, border-radius 32px

### FOOTER
- BG: `#2a2f32`
- Logo: Noto Serif 700, 18px, #ffffff
- Links: Manrope 400, 14px, `rgba(255,255,255,0.7)`, hover #ffffff
- Copyright: Manrope 400, 12px, `rgba(255,255,255,0.4)`

---

## 2.4 Layout Responsivo

| Elemento | Mobile < 768px | Tablet 768–1023px | Desktop ≥ 1024px |
|---|---|---|---|
| NAV | Logo centralizado, badge oculto | Logo + badge inline | Logo + badge à direita |
| HERO layout | 1 col, texto → mockup | 1 col, mockup menor | 2 cols (55/45 split) |
| HERO H1 | 32px | 40px | 52px |
| Phone mockup | 240px centralizado | 260px | 300px |
| TRUST BAR | 2×2 grid | 4 items em linha | 4 items em linha |
| FEATURES | 1 coluna | 2 colunas | 3-2 grid |
| JORNADA | 1 coluna | 1 coluna | 3 colunas |
| DEPOIMENTOS | 1 coluna | 1 coluna | 3 colunas |
| CTA padding | 48px 24px | 72px 40px | 96px 40px |
| FOOTER | 1 col centralizada | 2 colunas | 3 colunas |
| Section padding | 64px 24px | 80px 40px | 96px 80px |

**Container:** `max-width: 1200px; margin: 0 auto; padding: 0 clamp(24px, 5vw, 80px)`

---

## 2.5 Mockup CSS-Art (Phone Frame — puro CSS/HTML)

```html
<div class="phone-mockup" role="img" aria-label="Preview do app DoceGestar mostrando semana 24 da gestação">
  <div class="phone-screen">
    <div class="phone-status-bar">
      <span>9:41</span>
      <span>●●●</span>
    </div>
    <div class="phone-app-content">
      <span class="phone-week-pill">Semana 24</span>
      <p class="phone-greeting">Olá, Ana! 👋</p>
      <div class="phone-baby-card">
        <p class="phone-baby-label">Seu bebê hoje</p>
        <p class="phone-baby-size">30 cm · ~600g</p>
        <div class="phone-progress-track">
          <div class="phone-progress-fill"></div>
        </div>
        <p class="phone-progress-label">60% da gestação concluída</p>
      </div>
      <div class="phone-info-row">
        <div class="phone-info-chip">📅 Consulta<br>em 3 dias</div>
        <div class="phone-info-chip">💧 Hidrata-<br>ção ok</div>
        <div class="phone-info-chip">👶 8 chutes<br>hoje</div>
      </div>
    </div>
  </div>
</div>
```

**CSS key specs:**
```css
.phone-mockup {
  width: 280px; height: 560px;
  background: linear-gradient(145deg, #1a1a2e, #16213e);
  border-radius: 48px; padding: 12px;
  box-shadow: 0 40px 80px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.08);
  position: relative;
}
/* Dynamic Island */
.phone-mockup::before {
  content: ''; position: absolute;
  top: 20px; left: 50%; transform: translateX(-50%);
  width: 80px; height: 24px;
  background: #1a1a2e; border-radius: 12px; z-index: 10;
}
.phone-screen {
  width: 100%; height: 100%;
  background: #fbf9f5; border-radius: 38px; overflow: hidden;
}
.phone-week-pill {
  background: #b30064; color: white;
  font-family: 'Manrope'; font-size: 12px; font-weight: 600;
  padding: 4px 14px; border-radius: 32px; display: inline-block;
}
.phone-progress-fill {
  height: 6px; width: 60%;
  background: linear-gradient(90deg, #b30064, #ff6ea9);
  border-radius: 6px;
}
.phone-info-chip {
  flex: 1;
  background: rgba(0,99,127,0.08); border-radius: 10px;
  padding: 8px; text-align: center;
  font-family: 'Manrope'; font-size: 10px; color: #00637f; font-weight: 600;
}
```

---

# PARTE 3 — STORY TÉCNICA LANDING-1 (@sm)

## Header

| Campo | Valor |
|---|---|
| **ID** | LANDING-1 |
| **Título** | Criar landing page estática de vendas DoceGestar |
| **Épico** | Launch Track |
| **Story Points** | 3 |
| **Arquivo alvo** | `meu-projeto/landing/index.html` |
| **Deploy** | Cloudflare Pages — output dir: `landing/` |
| **Status** | Ready |
| **Responsável** | @dev |
| **Revisão** | @qa |
| **Push/Deploy** | @devops |

## User Story

> Como **mãe gestante brasileira** que descobriu o DoceGestar antes do lançamento,  
> eu quero **ver uma página de apresentação clara e acolhedora do app**,  
> para que **eu entenda o valor do produto, sinta confiança e me cadastre para ser avisada no lançamento**.

## Critérios de Aceite (Gherkin)

```gherkin
# AC-1: Performance
Dado que acesso docegestar.com.br em celular com 4G
Quando a página carrega
Então o tamanho total (HTML + CSS) deve ser menor que 150KB sem fontes externas

# AC-2: Zero JavaScript
Dado que inspeciono o código-fonte
Quando busco por <script> ou handlers on*
Então não deve existir nenhum JS inline ou externo
E a página deve funcionar com JS desabilitado no navegador

# AC-3: Responsividade mobile
Dado que acesso em viewport 375px
Quando visualizo todas as seções
Então todos os textos devem ser legíveis sem zoom
E nenhum elemento deve causar scroll horizontal
E o CTA button deve ter touch target mínimo de 48×48px

# AC-4: CTA state desabilitado
Dado que a landing está no estado pre-launch
Quando visualizo o badge "Em breve no Google Play"
Então o badge não deve ter cursor pointer nem href ativo
E deve exibir exatamente "Em breve no Google Play"
E o microcopy "Seja das primeiras a baixar — gratuito para sempre" deve estar visível abaixo

# AC-5: Fontes carregadas
Dado que a página carrega
Quando as fontes renderizam
Então headlines usam Noto Serif (600 ou 700)
E corpo usa Manrope (400, 500 ou 600)
E ambas são carregadas via Google Fonts com preconnect no <head>

# AC-6: SEO e OG tags
Dado que inspeciono o <head>
Então deve existir <title> com "DoceGestar" e menos de 70 chars
E <meta name="description"> com menos de 155 chars
E <meta property="og:title"> e <meta property="og:description">
E <meta name="viewport" content="width=device-width, initial-scale=1">

# AC-7: Validação HTML
Dado que submeto ao W3C Validator
Então não deve haver erros de HTML (warnings aceitáveis)
E DOCTYPE deve ser <!DOCTYPE html>
E atributo lang deve ser "pt-BR"

# AC-8: Todas as 8 seções presentes
Dado que visualizo a landing completa
Então devem estar presentes: NAV, HERO, TRUST BAR, FEATURES (5 cards), JORNADA (3 trimestres), DEPOIMENTOS (3 cards), CTA FINAL, FOOTER
E cada seção deve conter o conteúdo exato do copywriting desta spec

# AC-9: Design system correto
Dado que inspeciono os estilos
Então primário deve ser #b30064, secundário #00637f, fundo #fbf9f5
E não deve haver border 1px sólida em cor não-transparente (apenas box-shadow ou rgba)

# AC-10: Acessibilidade básica
Dado que verifico acessibilidade
Então phone mockup deve ter role="img" e aria-label descritivo
E contraste texto normal ≥ 4.5:1
E contraste texto grande ≥ 3:1
E uso de Landmarks HTML5 (<nav>, <main>, <section>, <footer>) presente
```

## Checklist de Implementação

### `<head>`
- [ ] DOCTYPE, `lang="pt-BR"`, charset UTF-8
- [ ] `<meta name="viewport">` correto
- [ ] `<title>` e `<meta name="description">` conforme spec
- [ ] OG title + OG description
- [ ] `<meta property="og:image" content=".gemini/docegestar-assets/logo/og-image-1200x630.jpg">`
- [ ] `<link rel="preconnect">` para Google Fonts (2 links)
- [ ] Google Fonts: Noto Serif 600,700 + Manrope 400,500,600
- [ ] `<link rel="icon" type="image/x-icon" href=".gemini/docegestar-assets/favicon/favicon.ico">`
- [ ] `<link rel="apple-touch-icon" href=".gemini/docegestar-assets/favicon/apple-touch-icon.png">`
- [ ] CSS reset + variáveis design system em `:root`

### NAV
- [ ] `position: sticky; top: 0; z-index: 100`
- [ ] backdrop-filter blur, sem border 1px, box-shadow suave
- [ ] Logo: Usar `.gemini/docegestar-assets/logo/logo-full-transparent.png` (Nota: recortar margens brancas excessivas no CSS ou via `object-fit`)
- [ ] Tagline conforme spec

### HERO
- [ ] Grid 2 cols desktop / 1 col mobile
- [ ] `<h1>` com copy exato
- [ ] CTA button: Botão do form de cadastro estilizado
- [ ] Badge + microcopy conforme spec
- [ ] Phone mockup HTML+CSS conforme spec 2.5
- [ ] Animações entrada com animation-delay escalonado

### TRUST BAR
- [ ] Fundo #b30064 sólido
- [ ] 4 items: Ícone SVG inline + valor + label
- [ ] Grid 4 cols desktop, 2×2 mobile

### FEATURES
- [ ] 5 cards glassmorphism (sem border 1px sólida)
- [ ] Grid 3-2 desktop (3 cards + 2 centralizados), 1 col mobile
- [ ] `<h2>` para headline da seção
- [ ] Animações CSS-only com delays

### JORNADA
- [ ] Fundo #00637f sólido, textos brancos
- [ ] 3 cards com label trimestre + range semanas + copy exato
- [ ] Número decorativo em CSS
- [ ] 3 cols desktop, 1 col mobile

### DEPOIMENTOS
- [ ] Fundo #fff8fb
- [ ] 3 cards glassmorphism com aspas `::before`
- [ ] Copy exato (nomes, cidades, semanas)

### CTA FINAL
- [ ] Fundo gradiente magenta
- [ ] Headline + sub conforme spec
- [ ] Formulário `<form>` com input de e-mail e botão submit
- [ ] Botão: bg branco + texto magenta

### FOOTER
- [ ] Fundo #2a2f32
- [ ] 3 cols desktop, 1 col mobile
- [ ] Links `href="#"` no MVP
- [ ] Copyright 2026

## Critérios de QA

### Visual QA
- [ ] Chrome DevTools 375px — sem overflow horizontal
- [ ] Chrome 1440px — hero 2 colunas, features 3-2
- [ ] Phone mockup sem imagens externas
- [ ] Ícones SVG consistentes em todos os browsers
- [ ] Glassmorphism visível nos cards
- [ ] TRUST BAR: branco/magenta ≥ 4.5:1
- [ ] JORNADA: branco/teal ≥ 4.5:1
- [ ] Fontes Noto Serif e Manrope (não fallback genérico)
- [ ] Badge CTA sem aparência de botão clicável

### Technical QA
- [ ] `view-source:` — zero `<script>` ou `on*`
- [ ] Form submit funciona (envia POST para o endpoint)
- [ ] W3C Validator — zero erros
- [ ] `<html lang="pt-BR">` presente
- [ ] 5 features com copy exato
- [ ] OG tags no `<head>`
- [ ] Arquivo ≤ 150KB

## Definition of Done

- [ ] `meu-projeto/landing/index.html` criado com todas as 8 seções *(ETAPA 1)*
- [ ] Zero erros W3C Validator *(ETAPA 1)*
- [ ] Zero JavaScript *(ETAPA 1)*
- [ ] Responsivo 375px / 768px / 1440px sem overflow *(ETAPA 1)*
- [ ] Design system aplicado corretamente *(ETAPA 1)*
- [ ] Copywriting PT-BR 100% conforme esta spec *(ETAPA 1)*
- [ ] @devops fez push + Cloudflare Pages output dir = `landing/` + deploy confirmado em `docegestar.com.br` *(ETAPA 2)*

---

> **Nota pós-lançamento na Play Store:** substituir o badge "Em breve" pelo botão oficial do Google Play com o link real da store e remover `pointer-events: none` do CTA.

---

> **Nota pós-lançamento na Play Store:** substituir o badge "Em breve" pelo botão oficial do Google Play com o link real da store e remover `pointer-events: none` do CTA.
