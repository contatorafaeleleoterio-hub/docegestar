# Plano MVP — DoceGestar: Funcionalidades do Documento

## Contexto

O documento `funcionalidades_app_gestacao.docx` mapeia 15 funcionalidades para o app de acompanhamento de gestação, com análise UX e priorização ICE Score. O projeto já possui uma base sólida: 5 abas, onboarding, semana detalhada com 10 módulos, timeline, ferramentas (kick counter + contrações) e banco SQLite.

**Objetivo:** Lançar o mais rápido possível. Escopo MVP = visual funcional, sem over-engineering. Cada feature é entregável por si só.

---

## Escopo MVP — 3 Sprints

### Sprint 1 — Quick Wins (alto impacto, baixo esforço)

#### F13 · Onboarding Estruturado (5 steps)
**Arquivo:** `app/onboarding.tsx` (refatorar existente)

Hoje o onboarding coleta apenas nome + DPP. Expandir para:
1. **Step 1** – Data provável do parto (já existe)
2. **Step 2** – Tipo de gestação: Única / Gêmeos / Trigêmeos (novo campo `gestationType` no profile)
3. **Step 3** – Primeiro filho? Sim / Não (novo campo `firstChild`)
4. **Step 4** – Nome escolhido do bebê (novo campo `babyName`)
5. **Step 5** – Confirmação visual da jornada gerada

**Implementação MVP:** Componente de stepper visual simples (indicador de progresso no topo + troca de view por estado). Sem animações complexas.

**DB:** Adicionar colunas em `user_profile`: `gestationType TEXT`, `firstChild INTEGER`, `babyName TEXT`.
**Hook:** Atualizar `useUserProfile.ts` para incluir os novos campos.

---

#### F9 · Banner Semanal Celebratório com Compartilhamento
**Arquivo:** `app/(tabs)/dashboard.tsx`

O dashboard já mostra a semana atual. Transformar o card principal em um banner personalizado:
- Exibe: "Olá, [nome]! Você está na semana [N] 🌸"
- Exibe a frase motivacional da semana (já existe em `motivationalPhrase` nos dados)
- Exibe o marco principal do bebê (já existe em `milestones[0]`)
- Botão **Compartilhar** usando `react-native` `Share` API nativa (sem dependências extras)

**Implementação MVP:** Apenas estilização do card existente + `Share.share({ message: ... })`. Zero novas dependências.

---

#### F3 · Cards Deslizáveis de Info do Bebê
**Arquivo:** `src/components/WeekCard.tsx` (módulo 3 — Baby Development)

Hoje as informações do bebê ficam em texto corrido. Reorganizar em 3 cards swipeáveis:
- **Card 1 — Tamanho:** peso, comprimento, comparação com fruta
- **Card 2 — Desenvolvimento:** milestones da semana formatados como bullets visuais
- **Card 3 — Novidade:** curiosidade da semana com badge "Novo esta semana"

**Implementação MVP:** `ScrollView` horizontal com `pagingEnabled` + indicadores de paginação (dots). Usa `FlatList` ou views simples. Sem biblioteca externa.

---

#### F8 · Timeline Visual com Fases por Trimestre
**Arquivo:** `app/(tabs)/timeline.tsx` (refatorar existente)

A timeline já existe e mostra as 40 semanas. Melhorar:
- Separadores visuais de trimestre (T1, T2, T3) com cores do design system (`trimester1: #ffb4a1`, `trimester2: #abcbdb`, `trimester3: #c6e8f8`)
- Semanas futuras com visual "teaser" — card opaco + ícone de cadeado suave
- Semanas passadas com checkmark ou ícone de memória
- Semana atual destacada com borda e pulso visual

**Implementação MVP:** Refatoração do componente de item de semana existente. Sem animações complexas, apenas estilos condicionais.

---

### Sprint 2 — Core Features (médio esforço, alto valor)

#### F4 · Dica Diária com Categorias
**Arquivo:** `src/components/WeekCard.tsx` (módulo 5 — Care Tips) + `src/data/shared/care.ts`

Hoje as dicas de cuidado são uma lista plana. Reorganizar:
- Adicionar `category` às dicas: `'sono' | 'alimentação' | 'movimento' | 'emocional'`
- Mostrar apenas 1 dica destacada por sessão ("Dica do Dia") com ícone da categoria
- Card visual com cor por categoria
- Botão "Salvar dica" → salva em novo campo `saved_tips` no DB

**Implementação MVP:** Categorizar os dados existentes + novo visual do card. Persistência simples com nova tabela `saved_tips(week, tip_text)`.

---

#### F7 · Tracker de Sintomas com Histórico Visual
**Arquivo:** `app/(tabs)/ferramentas.tsx` (nova seção) + `src/hooks/useWeekTracking.ts`

Adicionar na aba Ferramentas uma seção "Meu Corpo esta Semana":
- Lista de sintomas comuns da semana atual (já existe em `symptoms` nos dados) com toggle sim/não
- Gráfico simples de histórico das últimas 4 semanas (barras ou pontos com `View` estilizadas — sem chart library)
- Exibe o symptom mais frequente

**Implementação MVP:** Reusa os dados de `symptom_checks` já persistidos. Componente de mini-gráfico feito com `View` + `StyleSheet` (sem biblioteca externa).

---

#### F14 · Notificações Básicas de Marco Semanal
**Arquivo:** novo `src/hooks/useNotifications.ts` + integração em `app/index.tsx`

Notificação local ao virar a semana:
- Solicita permissão no primeiro acesso (opcional, sem bloquear)
- Agenda notificação toda segunda-feira às 8h: "Semana [N] começou! Veja o que está acontecendo com [babyName]"
- Notificação de dica diária às 9h (opcional, configurável em Config)

**Dependência:** `expo-notifications` (já disponível no SDK Expo, sem instalação extra).
**Implementação MVP:** Apenas notificações locais. Sem push server. Configuração em `app/(tabs)/config.tsx`.

---

### Sprint 3 — Diferenciação (pós-MVP, baixa prioridade)

| Feature | Esforço | Motivo do adiamento |
|---------|---------|-------------------|
| F5 · Modo Parceiro | Alto | Requer auth multi-usuário ou sync Firebase |
| F2/F10 · AR de tamanho | Muito Alto | ARKit/ARCore = complexidade nativa |
| F6 · Personalização gêmeos | Médio | Depende do onboarding F13 primeiro |
| F11 · Freemium/paywall | Médio | Requer RevenueCat ou similar |
| F12 · Marketplace enxoval | Alto | Requer parcerias e curadoria |

---

## Arquivos Críticos a Modificar

| Arquivo | Sprint | Mudança |
|---------|--------|---------|
| `app/onboarding.tsx` | S1 | Refatorar para 5 steps |
| `src/db/schema.ts` | S1 | Novas colunas em `user_profile` |
| `src/hooks/useUserProfile.ts` | S1 | Incluir novos campos |
| `app/(tabs)/dashboard.tsx` | S1 | Banner personalizado + Share |
| `src/components/WeekCard.tsx` | S1+S2 | Cards swipe + dica diária |
| `app/(tabs)/timeline.tsx` | S1 | Cores de trimestre + teasers |
| `app/(tabs)/ferramentas.tsx` | S2 | Tracker de sintomas visual |
| `src/data/shared/care.ts` | S2 | Adicionar categoria às dicas |
| `src/hooks/useNotifications.ts` | S2 | Novo hook (criar) |
| `app/(tabs)/config.tsx` | S2 | Toggle de notificações |

---

## Verificação / Como Testar

1. **Onboarding:** `expo start` → limpar AsyncStorage → fluxo de 5 steps completo → verificar perfil salvo
2. **Banner + Share:** Dashboard exibe nome + frase + marco → botão Share abre diálogo nativo
3. **Cards swipe:** Semana atual → módulo bebê → deslizar entre Card 1/2/3 → dots mudam
4. **Timeline:** Verificar cores T1/T2/T3, semana atual destacada, futuras opacas
5. **Notificação:** Config → ativar notificação → `expo-notifications` agenda → simular virada de semana

---

## Ordem de Execução Recomendada

```
S1: F13 → F9 → F3 → F8
S2: F4 → F7 → F14
```

Cada item é independente e pode ser entregue e testado separadamente.
