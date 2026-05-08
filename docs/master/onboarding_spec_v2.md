# Especificação Técnica — Fluxo de Onboarding Revisado
## DoceGestar · Versão 2.1

**Data:** 2026-05-07
**Baseado em:** `ONBOARDING-ANALYSIS.md` + `01-MASTER-SYSTEM-DOCUMENT.md`
**Substitui:** `onboarding_spec.md` (v1 — baseada no concorrente "Gravidez+")
**Status:** ✅ Aprovado para execução — revisão de equipe concluída (2026-05-07)

---

## Changelog v2 → v2.1

| # | Ajuste | Agente |
|---|--------|--------|
| A | Auth Tela 1: stub "Em breve" definido para MVP | @po |
| B | Migration com verificação de versão (idempotência via `PRAGMA`) | @architect |
| C | Back navigation e draft preservation especificados | @qa |
| D | Re-entry com `due_date` null adicionado ao gate de navegação | @qa |
| E | Progress indicator `●○○` adicionado às Telas 2, 3 e 4 | @ux |
| F | `Math.round` → `Math.floor` em `calcGestationMetrics` | @architect |
| G | Tela 4 — carrossel: empty state definido | @po |
| H | Error state do date input especificado | @qa |
| I | `plan_expires_at` — semântica clarificada | @po |
| J | Breakpoint de cards lado a lado definido (`width < 360`) | @ux |
| K | Nota sobre comportamento não-destrutivo do `×` no modal | @qa |

---

## Contexto e Mudanças em Relação à v1

A spec v1 foi extraída de capturas de tela do app concorrente "Gravidez+" e era incompatível com a identidade e arquitetura do DoceGestar em três pontos críticos:

1. **Modelo de Auth:** A v1 tratava login como caminho primário. O DoceGestar tem como diferencial ser offline-first e sem login obrigatório. A hierarquia visual deve refletir isso — acesso livre como destaque, conta como opção secundária.
2. **Design System:** A v1 usava paleta ciano/roxo (`#00BCD4` / `#9C27B0`). O DoceGestar usa rosa pastel/verde menta conforme `src/theme/colors.ts`.
3. **Paywall agressivo:** Trial de 3 dias com cobrança automática contradiz o princípio de acolhimento do produto e o perfil de renda do público-alvo (renda média/baixa).

> **Nota sobre modelo híbrido (decisão arquitetural do Epic 3+):** O projeto migra de conteúdo 100% bundled para entrega progressiva por download. Isso impacta `getWeek()` → async e a criação da tabela `content_cache`. **Esta spec de onboarding NÃO implementa essa lógica** — o campo `plan` no schema deve existir como placeholder orientado por feature flag, sem lógica de entrega diferenciada de conteúdo.

---

## Visão Geral do Fluxo Revisado

```
[1] Tela de Boas-vindas
        ↓
[2] Tela "Seu perfil" (nome + parentesco)
        ↓
[3] Tela "Sua data estimada" (seleção de método + date picker)
        ↓
[Modal] "Parabéns!" (confirmação — bottom sheet animado)
        ↓
[4] Tela de Planos (apresentação free vs premium — sem cobrança automática)
        ↓
    Dashboard (Início)

Caminho alternativo:
[1] → [Stub "Em breve"] → [1]   (botão "Criar conta / Entrar")
[3] → "Definir depois" → [Modal pula] → [4] → Dashboard (due_date = null)
```

---

## Design System (DoceGestar)

Todos os componentes desta spec devem usar exclusivamente os tokens abaixo.
**Não usar valores hardcoded** — o design system será atualizado e os tokens garantem propagação automática.

### Paleta (`src/theme/colors.ts`)

| Token                   | Valor               | Uso                                            |
|-------------------------|---------------------|------------------------------------------------|
| `--primary`             | `#E8A0BF`           | Botões primários, bordas ativas, links         |
| `--primary-dark`        | `#D4819F`           | Hover/pressed de botões primários              |
| `--accent`              | `#A8D8B9`           | Ícones de destaque, badges, ações secundárias  |
| `--gradient-start`      | `#E8A0BF`           | Início do gradiente (botões de destaque)       |
| `--gradient-end`        | `#A8D8B9`           | Fim do gradiente                               |
| `--bg`                  | `#FEFCFD`           | Background das telas (branco quente)           |
| `--bg-light`            | `#FDF6F9`           | Background de cards e painéis internos         |
| `--text-primary`        | `#1A1A1A`           | Títulos e texto principal                      |
| `--text-secondary`      | `#757575`           | Labels de campos, textos auxiliares            |
| `--border`              | `#E0E0E0`           | Bordas de campos inativos                      |
| `--border-active`       | `#E8A0BF`           | Borda do campo em foco/selecionado             |
| `--btn-disabled`        | `#E8D5DE`           | Botão "Continuar" desabilitado                 |
| `--btn-disabled-text`   | `#B89AA6`           | Texto do botão desabilitado                    |
| `--surface`             | `#FFFFFF`           | Superfície de modais, bottom sheets, cards     |
| `--overlay`             | `rgba(0,0,0,0.4)`   | Fundo escurecido atrás de modais               |
| `--success`             | `#A8D8B9`           | Confirmações e estados de sucesso              |
| `--error`               | `#E57373`           | Validações de erro — borda + mensagem          |
| `--plan-badge-free`     | `#F3E8FF`           | Background do badge "Gratuito"                 |
| `--plan-badge-premium`  | `#FFF8E1`           | Background do badge "Premium"                  |

### Tipografia (`src/theme/typography.ts`)

| Elemento                   | Especificação                                      |
|----------------------------|----------------------------------------------------|
| Título de tela (h1)        | `font-size: 28px; font-weight: 700; color: var(--text-primary)` |
| Título de seção (h2)       | `font-size: 20px; font-weight: 600; color: var(--text-primary)` |
| Subtítulo / descrição      | `font-size: 14px; font-weight: 400; color: var(--text-secondary)` |
| Label flutuante (inativa)  | `font-size: 16px; color: var(--text-secondary)`    |
| Label flutuante (ativa)    | `font-size: 12px; color: var(--primary)`           |
| Label flutuante (erro)     | `font-size: 12px; color: var(--error)`             |
| Valor de campo             | `font-size: 16px; color: var(--text-primary)`      |
| Botão primário             | `font-size: 16px; font-weight: 600; color: #FFFFFF`|
| Link inline                | `font-size: 14px; color: var(--primary); font-weight: 500` |
| Texto legal/auxiliar       | `font-size: 11px; color: #9E9E9E`                  |
| Mensagem de erro inline    | `font-size: 12px; color: var(--error); margin-top: 4px` |
| Modal — info body          | `font-size: 14px; color: var(--text-primary)`      |
| Modal — valor destacado    | `font-weight: 700; color: var(--text-primary)`     |

---

## Componentes Novos a Criar

> Estes componentes não existem no projeto hoje (DT-009). Devem ser implementados antes das telas.

### `<FloatingLabelInput>`
Campo de texto com label flutuante — estilo Material Design adaptado ao tema DoceGestar.

- **Estado padrão:** Label posicionada como placeholder centralizado; borda `1px solid var(--border)`.
- **Estado ativo/preenchido:** Label sobe para o topo com `font-size: 12px; color: var(--primary)`; borda `2px solid var(--border-active)`.
- **Estado de erro:** Borda `2px solid var(--error)`; label cor `var(--error)`; mensagem de erro inline abaixo do campo (`font-size: 12px; color: var(--error)`).
- **Border-radius:** `12px`
- **Padding:** `20px 16px 8px`
- **Altura:** `60px`
- **Background:** `var(--surface)`
- **Transição:** `label transform 150ms ease-out`

Props adicionais:
```typescript
interface FloatingLabelInputProps {
  error?: string; // mensagem de erro — se presente, ativa estado de erro
}
```

### `<FloatingLabelSelect>`
Mesmo visual que `FloatingLabelInput`, com comportamento de dropdown ao tocar.

- Ao abrir, exibe lista de opções abaixo do campo em um container com `border-radius: 12px; box-shadow: 0 4px 16px rgba(232,160,191,0.2)`.
- Cada opção: `padding: 16px`; separadas por `border-bottom: 1px solid #F5F5F5`.
- Opção selecionada: `font-weight: 700; color: var(--primary)`.
- Fecha ao tocar fora da área ou ao selecionar uma opção.

### `<MethodCard>`
Card clicável para seleção de método de cálculo da DPP (Tela 3).

- Dimensões: `width: 100%; min-height: 72px; border-radius: 16px`
- Estado padrão: `background: var(--bg-light); border: 1.5px solid var(--border)`
- Estado selecionado: `background: #FDF0F6; border: 2px solid var(--primary)` + ícone de check `color: var(--primary)` à direita
- Conteúdo: ícone à esquerda (28px) + texto em duas linhas (título em negrito + descrição auxiliar)
- `pressedScale: 0.98` via `transform`

### `<PrimaryButton>`
Botão de ação principal — padrão do projeto já existente, confirmar alinhamento.

- `background: var(--primary)`; `border-radius: 32px`; `height: 52px`; `width: 100%`
- Estado desabilitado: `background: var(--btn-disabled); color: var(--btn-disabled-text); cursor: not-allowed`
- Estado pressed: `transform: scale(0.98)` via `Animated`

### `<GradientButton>`
Botão com gradiente — usado na Tela de Planos (CTA premium).

- `background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%)`
- Mesmas dimensões que `PrimaryButton`

### `<BottomSheet>`
Container animado para o modal "Parabéns!".

- React Native: `Animated.timing` com `translateY: 100% → 0` + `opacity: 0 → 1` do overlay
- `transition: 0.35s ease-out`
- `border-radius: 24px 24px 0 0`
- `background: var(--surface)`
- `padding: 24px 20px 40px` (40px de padding inferior garante safe area em iPhones com notch)
- **Não depende de biblioteca externa** — implementar com `Animated` do React Native

### `<ProgressDots>`
Indicador de progresso do onboarding — exibido nas Telas 2, 3 e 4.

```typescript
interface ProgressDotsProps {
  total: number;   // número total de etapas (3)
  current: number; // etapa atual (1-indexed)
}
```

- Dot ativo: `width: 20px; height: 8px; border-radius: 4px; background: var(--primary)`
- Dot inativo: `width: 8px; height: 8px; border-radius: 50%; background: var(--border)`
- Gap entre dots: `6px`
- Alinhamento: `text-align: center; margin-bottom: 16px`

### `<GestationCounter>`
Novo componente de métricas gestacionais — criado aqui para reuso no modal e no Dashboard.

```typescript
interface GestationCounterProps {
  estimatedDueDate: string; // ISO YYYY-MM-DD
  compact?: boolean;        // versão compacta para Dashboard
}
```

Exibe: semanas + dias decorridos | semanas + dias restantes
Usado em: modal "Parabéns!" (versão completa) e Card 8 do Dashboard (versão compact).

---

## Tela 1 — Boas-vindas

### Intenção de Design
O caminho principal é **explorar sem conta**. A opção de criar conta ou entrar é válida e visível, mas não deve competir visualmente com o acesso livre.

### Layout

```
┌─────────────────────────────────────────┐
│  [Logo DoceGestar + tagline]            │
│                                         │
│  Ilustração SVG — silhueta gestante     │
│  ~220px, fundo arredondado #FDF0F6      │
│                                         │
│  "Bem-vinda à sua jornada gestacional"  │
│  Subtítulo: "Acompanhe semana a semana, │
│  offline, sem cadastro obrigatório."    │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │  🌸 Explorar gratuitamente       │   │  ← CAMINHO PRIMÁRIO
│  │     background: var(--primary)   │   │
│  └──────────────────────────────────┘   │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │  👤 Criar conta / Entrar         │   │  ← CAMINHO SECUNDÁRIO (stub)
│  │     background: #FAFAFA          │   │
│  │     border: 1px solid --border   │   │
│  │     color: var(--text-primary)   │   │
│  └──────────────────────────────────┘   │
│                                         │
│  [Aviso legal + links política/termos]  │
└─────────────────────────────────────────┘
```

### Comportamento dos Botões

**"🌸 Explorar gratuitamente"**
- Avança diretamente para Tela 2
- Nenhum dado de auth é coletado
- `user_profile.plan` = `'free'`; `user_profile.account_type` = `'anonymous'` (ver schema abaixo)

**"👤 Criar conta / Entrar" — MVP: Stub "Em breve"**
- **Decisão MVP:** Navega para tela stub com mensagem `"Cadastro de conta chegando em breve! 🌸"` e botão `"Voltar"`.
- Nenhum dado de auth é coletado — `account_type` permanece `'anonymous'` para todos os usuários no MVP.
- Social login (Google/Facebook) e e-mail/senha são sub-epic pós-lançamento.
- Ver DT-010 na tabela de débitos técnicos.

### Footer
- Texto legal `font-size: 11px; color: #9E9E9E; text-align: center`
- Links "política de privacidade" e "termos de uso" em `color: var(--primary)`

---

## Tela 2 — "Seu perfil"

### Intenção de Design
Coletar apenas o que é imediatamente útil para personalizar a experiência. Campos irrelevantes para qualquer feature atual foram descartados (idade, "está grávida?", "tem filhos?").

### Header

```
<ProgressDots total={3} current={1} />   ←  ●○○

Título: "Seu perfil" + emoji 🌸
Subtítulo: "Algumas informações para personalizar sua experiência."
```

### Campos

| # | Label              | Tipo                  | Obrigatório | Opções / Observação                        |
|---|--------------------|-----------------------|-------------|---------------------------------------------|
| 1 | Seu nome           | `FloatingLabelInput`  | Não         | Livre; usado para saudação no Dashboard     |
| 2 | Você é             | `FloatingLabelSelect` | Sim         | "Mãe" / "Parceiro(a)" / "Outro"             |

**Justificativa dos campos descartados:**
- Idade — não usada por nenhuma feature atual
- "Está grávida?" — redundante no contexto do app
- "Tem filhos?" — não consumida por nenhum módulo existente

### Footer

- `<PrimaryButton>` "Continuar" — habilitado somente após seleção do campo "Você é"
- Sem botão "Pular" — campos mínimos exigidos

---

## Tela 3 — "Sua data estimada"

### Intenção de Design
Permitir que qualquer perfil de usuária (com DUM, com DPP do médico, ou que sabe a data de concepção) consiga calcular sua semana gestacional com precisão. A data estimada é o dado central de toda a experiência do app.

### Header

```
<ProgressDots total={3} current={2} />   ←  ●●○

Título: "Sua data estimada" + emoji 🗓️
Subtítulo: "Escolha o método que funciona melhor para você.
           Você pode alterar isso a qualquer momento nas configurações."
```

### Step 1 — Seleção do método

Três `<MethodCard>` empilhados com `gap: 12px`:

| Card | Ícone | Título                       | Descrição auxiliar                          |
|------|-------|------------------------------|---------------------------------------------|
| A    | 📋    | Data do médico               | "Informe a DPP que o médico calculou"       |
| B    | 📅    | Última menstruação           | "Calculamos a DPP pela Regra de Naegele"    |
| C    | 🌱    | Data de concepção            | "Se você sabe quando concebeu"              |

Apenas um card pode estar selecionado por vez.

### Step 2 — Input da data (aparece após seleção do método)

Campo `<FloatingLabelInput>` com date picker:

- Surge com animação `opacity: 0 → 1` + `translateY: 8px → 0` (`150ms ease-out`)
- Label dinâmica por método:
  - Método A → "Data prevista do parto (DPP)"
  - Método B → "Primeiro dia da última menstruação"
  - Método C → "Data de concepção"
- Ao tocar, abre date picker nativo do sistema
- Formato exibido: `"4 de outubro de 2026"` (pt-BR, via `toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })`)
- Validação: não aceitar datas futuras para método B e C; não aceitar datas de mais de 40 semanas atrás para nenhum método

**Estado de erro do campo de data:**
- Se a data selecionada for inválida (fora dos limites de validação):
  - Borda muda para `2px solid var(--error)`
  - Label muda para `color: var(--error)`
  - Mensagem inline abaixo do campo: `font-size: 12px; color: var(--error); margin-top: 4px`
  - Textos de erro por regra:
    - Data futura (métodos B/C): `"Essa data não pode estar no futuro."`
    - Data muito antiga: `"Data fora do período gestacional válido."`
  - Botão "Confirmar data" permanece desabilitado enquanto erro estiver ativo

### Lógica de Cálculo (`src/utils/dateUtils.ts`)

```typescript
// Novas funções a adicionar em dateUtils.ts (DT-003 já prevê refatoração deste arquivo)

export function calcDPPFromLMP(lmpDateISO: string): string {
  // Regra de Naegele: DPP = DUM + 280 dias
  const lmp = new Date(lmpDateISO);
  lmp.setDate(lmp.getDate() + 280);
  return lmp.toISOString().split('T')[0]; // retorna YYYY-MM-DD
}

export function calcDPPFromConception(conceptionDateISO: string): string {
  // DPP = data de concepção + 266 dias
  const d = new Date(conceptionDateISO);
  d.setDate(d.getDate() + 266);
  return d.toISOString().split('T')[0];
}

export function calcGestationMetrics(dueDateISO: string): {
  dppFormatted: string;     // "4 de outubro de 2026"
  weeksElapsed: number;
  daysElapsed: number;      // dias além das semanas completas
  weeksRemaining: number;
  daysRemaining: number;    // dias além das semanas completas restantes
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dpp = new Date(dueDateISO);
  const totalDaysGestation = 280;
  const gestationStart = new Date(dpp);
  gestationStart.setDate(gestationStart.getDate() - totalDaysGestation);

  const msPerDay = 86_400_000;
  const totalElapsed = Math.floor((today.getTime() - gestationStart.getTime()) / msPerDay);
  const totalRemaining = Math.floor((dpp.getTime() - today.getTime()) / msPerDay);

  return {
    dppFormatted: dpp.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
    weeksElapsed: Math.floor(totalElapsed / 7),
    daysElapsed: totalElapsed % 7,
    weeksRemaining: Math.floor(Math.max(0, totalRemaining) / 7),
    daysRemaining: Math.max(0, totalRemaining) % 7,
  };
}
```

**O resultado final de qualquer método é sempre a DPP** (`user_profile.due_date`). Os hooks existentes `useCurrentWeek()` e `getCurrentWeek(dueDateISO)` não precisam de alteração.

### Footer

- `<PrimaryButton>` "Confirmar data" — desabilitado até data preenchida e válida
- Link "Definir depois" em `color: var(--primary)` abaixo do botão
  - Avança sem preencher `due_date` (valor nulo no estado)
  - O modal "Parabéns!" **não é exibido** neste caso — fluxo vai direto para Tela 4
  - A tela principal exibe estado vazio com CTA para configuração — comportamento já existente

---

## Modal — "Parabéns!" (Bottom Sheet)

Aparece automaticamente após confirmação da data na Tela 3 (somente se data foi preenchida). Sobrepõe a Tela 3 com overlay `var(--overlay)`.

### Estrutura

```
┌────────────────────────────────────────┐
│  "Parabéns! 🎉"     [×]               │  ← header com botão fechar
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ 🌸 "Sua data estimada do parto é │  │  ← ícone fundo #FDF0F6
│  │    [DPP por extenso]."           │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ 🤰 "Você está grávida há        │  │
│  │    [X semanas] e [Y dias]."      │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ 📅 "Faltam [A semanas]          │  │
│  │    e [B dias] para o parto."     │  │
│  └──────────────────────────────────┘  │
│                                        │
│  <PrimaryButton>                       │
│  "Ir para minha jornada →"             │
└────────────────────────────────────────┘
```

### Ícones das linhas informativas

- Fundo: `#FDF0F6` (rosa muito claro) | `border-radius: 50%` | `width: 40px; height: 40px`
- Sem dependência externa de ícones — usar emoji ou SVG inline

### Animação (`Animated` do React Native)

```
Overlay:    opacity 0 → 0.4 | duration: 300ms | easing: ease-out
BottomSheet: translateY 100% → 0 | duration: 350ms | easing: ease-out
```

### Comportamento

- Botão `×` **ou** "Ir para minha jornada →": ambos salvam o `user_profile` no SQLite e avançam para Tela 4.
- **⚠️ Importante para implementação:** O `×` NÃO descarta os dados — ele tem o mesmo efeito do CTA. O estado já calculado é preservado e salvo em qualquer fechamento do modal.
- Salvar via `useUserProfile` hook — não diretamente no SQLite
- Fechar com swipe down também fecha (opcional para MVP)

---

## Tela 4 — Apresentação de Planos

> **⚠️ Redesign em relação à spec v1.** O paywall de trial com cobrança automática foi removido. Esta tela apresenta os planos de forma transparente, sem fricção para quem escolhe o gratuito.

> **⚠️ A divisão exata de funcionalidades entre free e premium está em aberto — aguardar definição do PO.** Esta tela deve ser construída orientada pelo campo `plan` em `user_profile` e por uma feature flag, sem hardcodar regras de negócio.

### Background

- Gradiente suave: `background: linear-gradient(180deg, #FDF6F9 0%, #F0FAF4 100%)`

### Header

```
<ProgressDots total={3} current={3} />   ←  ●●●

Botão × no canto superior direito → navega para Dashboard sem escolher
Título: "Escolha como quer acompanhar sua jornada"
Subtítulo: "Você pode mudar de plano a qualquer momento."
```

- Botão `×`: `background: #F0F0F0; border-radius: 50%; width: 36px; height: 36px`
- Título: `font-size: 22px; font-weight: 700`

### Cards de Plano

**Layout responsivo:**
- `width >= 360`: dois cards lado a lado (`flexDirection: 'row'; gap: 12px`)
- `width < 360`: cards empilhados (`flexDirection: 'column'; gap: 12px`)

#### Card Gratuito

```
background: var(--surface)
border: 1.5px solid var(--border)
border-radius: 20px
padding: 20px

Badge: "Gratuito" (background: var(--plan-badge-free))
Título: "Gratuito"
Preço: "R$ 0 / mês"

Itens inclusos: [A definir pelo PO]
  ✓ [Item 1]
  ✓ [Item 2]
  ✓ [Item 3]

[Continuar no gratuito]  ← PrimaryButton secondary style
  background: transparent
  border: 1.5px solid var(--primary)
  color: var(--primary)
```

#### Card Premium

```
background: #FFF8F2
border: 2px solid var(--primary)
border-radius: 20px
padding: 20px

Badge: "Premium" (background: var(--plan-badge-premium))
Título: "Premium"
Preço: "R$ [x,xx] / mês" [A definir pelo PO]

Itens inclusos: [A definir pelo PO]
  ★ [Tudo do gratuito]
  ★ [Item exclusivo 1]
  ★ [Item exclusivo 2]
  ★ [Item exclusivo 3]

[Assinar Premium]  ← GradientButton
```

### Timeline de Valor (componente vertical, abaixo dos cards)

Linha vertical conectando 3 ícones circulares `background: var(--accent)`:

| Ícone | Título               | Descrição                                              |
|-------|----------------------|--------------------------------------------------------|
| 🔒    | **Hoje**             | Acesse todas as funcionalidades gratuitas imediatamente. |
| 📅    | **Ao assinar**       | Desbloqueie ferramentas e conteúdo Premium.            |
| ⭐    | **A qualquer momento** | Cancele ou troque de plano quando quiser.            |

> Os rótulos desta timeline devem ser genéricos o suficiente para que a mudança de preços/features não exija alteração de código.

### Card de Destaque de Feature (carrossel)

- `background: var(--surface); border-radius: 16px; padding: 16px`
- Ícone quadrado gradiente rosa/menta (28px, `border-radius: 8px`) + texto descritivo
- Paginação de pontos (`●○○`) indicando carrossel de N slides — conteúdo a definir pelo PO
- **Não hardcodar funcionalidades específicas no código** — alimentar de array configurável

**Empty state do carrossel:** Se o array de slides vier vazio (conteúdo ainda não definido pelo PO), o carrossel inteiro é ocultado (`display: none` / `return null`). Não exibir carrossel vazio.

### Footer

- Texto `font-size: 12px; color: var(--text-secondary); text-align: center`:
  `"Ao assinar, você concorda com nossos termos de uso e política de privacidade."`

---

## Navegação e Estado Global

### Stack de Navegação

```
Stack.Navigator (onboarding)
  ├── Screen: Welcome        (sem header nativo)
  ├── Screen: ComingSoon     (stub auth — sem header nativo)   ← novo
  ├── Screen: Profile        (sem header nativo)
  ├── Screen: DueDate        (sem header nativo)
  └── Screen: Plans          (sem header nativo)

Modal: CongratulationsSheet  (renderizado sobre DueDate via state — não é screen própria)
```

### Transição entre telas

Slide horizontal (padrão de stack navigation). Sem transições personalizadas entre telas para manter previsibilidade.

### Estado Transitório (buffer entre telas)

```typescript
// Context ou estado local — apenas buffer antes de persistir no SQLite
interface OnboardingDraft {
  name: string;
  relationship: 'mae' | 'parceiro' | 'outro' | null;
  dueDateMethod: 'due_date' | 'lmp' | 'conception' | null;
  inputDate: string | null;   // ISO YYYY-MM-DD
  // Calculados após inputDate preenchido:
  estimatedDueDate: string | null; // ISO YYYY-MM-DD
}
```

**Estado calculado (não persistido como campos separados — recalcular sempre a partir de `due_date`):**
- `weeksElapsed`, `daysElapsed`, `weeksRemaining`, `daysRemaining` → derivados de `calcGestationMetrics(due_date)`

### Back Navigation — Preservação de Draft

O botão de voltar do dispositivo (hardware ou gesto) deve preservar o estado preenchido:

| De → Para         | Comportamento esperado                                             |
|-------------------|--------------------------------------------------------------------|
| Tela 2 → Tela 1   | Draft limpo — Tela 1 não usa dados do draft                        |
| Tela 3 → Tela 2   | Draft preservado: `name` e `relationship` mantidos no estado       |
| Tela 4 → Tela 3   | Não aplicável — Tela 4 não tem botão voltar nativo (apenas `×`)    |

**Implementação:** O `OnboardingDraft` deve viver em um `Context` compartilhado por todas as telas (não em estado local de cada tela). Isso garante que navegar para trás e retornar não apague os campos já preenchidos.

---

## Persistência — Abordagem Correta

> **Não usar `AsyncStorage` diretamente.** O projeto usa SQLite via `useUserProfile`. `AsyncStorage` só existe como fallback do SQLite no web (`src/db/webStorage.ts`).

### Fluxo de salvamento

```
Tela 2 (Perfil)   → draft em Context (não persiste ainda)
Tela 3 (Data)     → draft em Context (não persiste ainda)
Modal "Parabéns!" → botão "Ir para minha jornada" OU "×" dispara:
                    useUserProfile.save({
                      name,
                      relationship,
                      due_date: estimatedDueDate,
                      plan: 'free',
                    })
"Definir depois"  → useUserProfile.save({ name, relationship, due_date: null, plan: 'free' })
                    (persiste sem due_date — gate trata esse estado)
Tela 4 (Planos)   → se escolher Premium:
                    useUserProfile.update({ plan: 'premium', plan_expires_at: ... })
```

### Schema Update Necessário (`src/db/schema.ts`)

```typescript
// migration_version: 2
// runMigrations() deve verificar a versão antes de executar:
//   1. Criar tabela migrations (se não existir): id INTEGER, version INTEGER UNIQUE, applied_at TEXT
//   2. SELECT COUNT(*) FROM migrations WHERE version = 2
//   3. Se COUNT = 0: executar os ALTERs abaixo, depois INSERT INTO migrations (version, applied_at) VALUES (2, datetime('now'))
//   4. Se COUNT > 0: pular (já aplicado)
//
// Verificar existência de coluna antes de ALTER:
//   PRAGMA table_info(user_profile) → checar se coluna já existe na lista
//   Se existir: pular o ALTER específico (evita erro em re-execução parcial)
```

```sql
ALTER TABLE user_profile ADD COLUMN relationship TEXT
  CHECK(relationship IN ('mae','parceiro','outro'));

ALTER TABLE user_profile ADD COLUMN plan TEXT
  DEFAULT 'free' CHECK(plan IN ('free','premium'));

ALTER TABLE user_profile ADD COLUMN plan_expires_at TEXT;
  -- ISO 8601: YYYY-MM-DD
  -- NULL = plano free (sem expiração) ou assinatura premium ativa (sem data de corte)
  -- Data futura = premium com expiração agendada
  -- Data passada = premium expirado (tratar como free até renovação)
```

> **⚠️ NÃO alterar `src/db/index.ts` diretamente.** Migrations apenas em `schema.ts` seguindo o padrão existente de `runMigrations()`.

---

## Gate de Navegação (`app/index.tsx`)

```typescript
// Lógica revisada (stub — lógica real de conteúdo no Epic 3+)
if (!userProfile) {
  → onboarding (Welcome — Tela 1)
}

if (userProfile && !userProfile.due_date) {
  // Usuário completou Tela 2 mas clicou "Definir depois" na Tela 3
  // Vai para dashboard com estado vazio — CTA para configurar data já existe
  → dashboard (tier free, estado vazio)
}

if (userProfile && userProfile.due_date) {
  // Por ora, free e premium vão para o mesmo dashboard — feature flag decide conteúdo (TODO Epic 3+)
  → dashboard
}
```

---

## Comportamentos de UX / Microinterações

1. **Botão "Continuar/Confirmar" desabilitado** enquanto campos obrigatórios não preenchidos — sem toast de erro ao clicar no estado desabilitado.
2. **`<FloatingLabelSelect>` fecha** ao tocar fora ou ao selecionar opção.
3. **`<MethodCard>` — seleção exclusiva:** tocar em um card desmarca qualquer outro selecionado anteriormente.
4. **Campo de data oculto** até seleção de método — surge com animação leve (opacity + translateY).
5. **Keyboard avoiding:** `KeyboardAvoidingView` em todas as telas com campos de texto.
6. **"Definir depois"** na Tela 3 → persiste perfil sem `due_date`; modal "Parabéns!" não é exibido; vai diretamente para Tela 4.
7. **Fechar Tela de Planos** com `×` → navega para dashboard sem assinar; `plan` permanece `'free'`.
8. **Transição entre telas:** slide horizontal — padrão de stack navigation, sem customização.
9. **Botão `×` do modal "Parabéns!"** → mesmo efeito do CTA: salva os dados e avança. Não descarta dados.
10. **Draft preservado no back:** navegar para Tela 2 a partir da Tela 3 mantém `name` e `relationship` preenchidos.

---

## Acessibilidade

- Todos os botões com `accessibilityLabel` descritivo e `accessibilityRole="button"`

| Elemento | `accessibilityLabel` |
|----------|---------------------|
| Botão "Explorar gratuitamente" | `"Explorar o app gratuitamente, sem cadastro"` |
| Botão "Criar conta / Entrar" | `"Criar conta ou entrar — em breve"` |
| Botão "Continuar" (Tela 2) | `"Continuar para a próxima etapa"` |
| Botão "Confirmar data" (Tela 3) | `"Confirmar data estimada do parto"` |
| Link "Definir depois" | `"Definir a data depois, nas configurações"` |
| Botão "×" do modal | `"Fechar e ir para minha jornada"` |
| Botão "Ir para minha jornada" | `"Confirmar e abrir o app"` |
| Botão "×" da Tela 4 | `"Fechar e acessar o app no plano gratuito"` |

- `<MethodCard>` com `accessibilityRole="radio"` e `accessibilityState={{ selected: isSelected }}`
- Campos com `accessibilityHint` explicando o que é esperado
- Contraste mínimo AA para todo o texto (validar `--text-secondary` `#757575` sobre `var(--bg)` `#FEFCFD` — ✅ AA pass)
- Bottom sheet com `accessibilityViewIsModal={true}`

---

## Débitos Técnicos Gerados / Relacionados

| ID     | Descrição                                                                         | Prioridade | Relacionado com             |
|--------|-----------------------------------------------------------------------------------|------------|-----------------------------|
| DT-009 | Componentes `FloatingLabelInput`, `FloatingLabelSelect`, `MethodCard`, `BottomSheet`, `ProgressDots`, `GestationCounter` não existem | Alta | Todas as telas |
| DT-007 | Migration versionada: `relationship`, `plan`, `plan_expires_at` + tabela `migrations` em `user_profile` | Alta | Tela 2 + persistência |
| DT-003 | Extrair `parseDateBR` para `src/utils/dateUtils.ts` (já planejado); adicionar `calcDPPFromLMP`, `calcDPPFromConception`, `calcGestationMetrics` | Alta | Tela 3 |
| DT-010 | Tela stub "Em breve" para o fluxo de auth (ComingSoon screen) — uma tela simples com mensagem e botão voltar | Baixa | Tela 1 (caminho secundário) |
| DT-006 | `getWeek(n)` → async para conteúdo progressivo                                   | Alta (Epic 3+) | Arquitetura de conteúdo |
| DT-008 | Criar tabela `content_cache` no schema                                           | Média (Epic 3+) | Download progressivo |

---

## O Que Não Mudar

- `src/db/index.ts` — **não alterar**
- `useCurrentWeek()` — não precisa de mudança; recebe DPP e calcula semana
- `getCurrentWeek(dueDateISO)` — não precisa de mudança
- Estrutura de abas `(tabs)/` — onboarding é fluxo separado que redireciona para dashboard ao concluir
- Lógica de gate em `app/index.tsx` — apenas adicionar verificações de `plan` e `due_date` null

---

## Ordem de Implementação — Plano de Execução

A sequência abaixo é a ordem recomendada para stories. Cada bloco representa uma story candidata.

```
Story ONB-1 — Migration + Schema
  └─ src/db/schema.ts: tabela migrations + colunas relationship, plan, plan_expires_at
  └─ Validar com runMigrations() existente (idempotente via PRAGMA)

Story ONB-2 — Utils de data
  └─ src/utils/dateUtils.ts: calcDPPFromLMP, calcDPPFromConception, calcGestationMetrics
  └─ Unit tests para os 3 métodos de cálculo

Story ONB-3 — Componentes base
  └─ FloatingLabelInput (com error state)
  └─ FloatingLabelSelect
  └─ MethodCard
  └─ ProgressDots
  └─ PrimaryButton (confirmar alinhamento com existente)
  └─ GradientButton

Story ONB-4 — BottomSheet + GestationCounter
  └─ BottomSheet (Animated — sem biblioteca externa)
  └─ GestationCounter (completo + compact)

Story ONB-5 — OnboardingContext
  └─ Context com OnboardingDraft
  └─ Garantir preservação de draft no back navigation

Story ONB-6 — Tela 1: Welcome + Stub ComingSoon
  └─ app/onboarding/Welcome.tsx
  └─ app/onboarding/ComingSoon.tsx (stub "Em breve")

Story ONB-7 — Tela 2: Profile
  └─ app/onboarding/Profile.tsx
  └─ Integrar FloatingLabelInput + FloatingLabelSelect + ProgressDots

Story ONB-8 — Tela 3: DueDate
  └─ app/onboarding/DueDate.tsx
  └─ Integrar MethodCard + FloatingLabelInput com date picker + error state

Story ONB-9 — Modal: CongratulationsSheet
  └─ Renderizado sobre DueDate via state
  └─ Integrar GestationCounter + BottomSheet + comportamento do ×

Story ONB-10 — Tela 4: Plans (stub)
  └─ app/onboarding/Plans.tsx
  └─ Cards free/premium sem conteúdo hardcoded (array configurável)
  └─ Carrossel com empty state (oculta se array vazio)
  └─ Sem lógica de pagamento no MVP

Story ONB-11 — Gate de Navegação
  └─ app/index.tsx: lógica revisada com due_date null
  └─ Integrar GestationCounter no Card 8 do Dashboard

Story ONB-12 — QA Gate completo
  └─ Teste do fluxo completo (caminho primário)
  └─ Teste do "Definir depois" (caminho alternativo)
  └─ Teste de back navigation (draft preservation)
  └─ Teste de re-entry (userProfile exists, due_date null)
```

---

> **Nota para implementação:** A divisão exata de funcionalidades entre free e premium está propositalmente em aberto neste documento. A Tela de Planos deve ser construída orientada por feature flag / campo `plan`, de forma que a regra de negócio possa ser alterada sem mudança de código. Aguardar validação do PO antes de implementar a lógica de `content_cache` e entrega diferenciada de conteúdo.

*Fim da especificação v2.1. Revisada pela equipe AIOX em 2026-05-07. Aprovada para execução.*
