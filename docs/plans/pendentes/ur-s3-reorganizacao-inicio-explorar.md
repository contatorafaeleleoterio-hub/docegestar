# Plano UR-S3 — Reorganização Início ↔ Explorar

**Data:** 2026-05-21
**Story:** UR-S3 (Onda 1, item 1)
**Status:** Aguardando aprovação (plan mode)
**Origem:** `/gestor` — detalhamento solicitado após UR-01-REORDER deixar UR-S3 com "detalhamento pendente em revisão posterior".

---

## Contexto

A 1ª usuária teste sentiu o app fragmentado: o **Início** mostra só um resumo da semana e empurra ela pra outra aba pra ler o conteúdo real. O **Explorar** (feed revista vertical com snap, FEED-SNAP commit) hospeda o conteúdo da semana atual e nada mais — sub-utilizado para o que poderia ser uma área de descoberta/biblioteca.

UR-S3 troca essa arquitetura: **conteúdo da semana vive no Início** (a gestante abre o app e já está dentro da semana), e **Explorar** vira a "Biblioteca Plus" — hub para os 3 conteúdos extras já implementados em RD-7 (Álbum, Artigo, Chat).

Decisões aprovadas pelo usuário em 2026-05-21:
- Conteúdo da semana no Início = **FeedSnap embutido** (reusa FlatList vertical com snap, mesma UX da Explorar atual)
- Nova Explorar = **hub Plus** apontando para `album.tsx`, `article.tsx`, `chat.tsx` (rotas root já existentes)

**Outcome esperado:** menos cliques pra chegar no conteúdo, Explorar deixa de duplicar Início, sinaliza visualmente que o "Plus" existe (preparando monetização pós-MVP), G-7 (01/jun) inalterado.

---

## Escopo

### IN
1. **`dashboard.tsx`** — embutir FeedSnap (semana atual) abaixo das seções existentes; remover CTA "Conteúdo da semana" (vira redundante).
2. **`explorar.tsx`** — reescrever como hub Biblioteca Plus com 3 cards (Álbum, Artigo, Chat) navegando para rotas root existentes.
3. **Tab label** — manter "Explorar" no nome (decisão do plano canônico).
4. **Ícone da aba** — manter `compass` (consistente com biblioteca/descoberta).

### OUT (não fazer agora)
- Reescrever conteúdo do FeedSnap (cards já existem via `buildWeeklyFeed`).
- Tocar em `WeekCard.tsx` (980L) — segue intocado, usado em rotas hidden `bebe`/`saude`/`diario`.
- Criar novos conteúdos para Biblioteca Plus — usa o que RD-7 já implementou.
- Monetização/paywall do Plus — fora desta sessão.
- Mexer em UR-S5/S1/S2/S4/S6 — stories separadas.

---

## Implementação detalhada

### 1. Dashboard recebe FeedSnap embutido

📄 **dashboard.tsx**
📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\app\(tabs)\`

**Mudanças:**

- Manter intacto o topo (saudação + sino, mega herói com fruta, marco clínico, carrossel "Esta semana", ações rápidas Chute/Contração/Diário).
- **Remover** CTA "Conteúdo da semana" (vira redundante — o conteúdo está logo abaixo).
- **Manter** CTA "Ferramentas pré-natais".
- **Abaixo** do CTA de Ferramentas, embutir o FeedSnap.

**Atenção crítica — competição de scroll:**

O dashboard hoje é `ScrollView`. FeedSnap é `FlatList` vertical com snap full-screen. Aninhar `FlatList` dentro de `ScrollView` no React Native dá warning + UX ruim (gestos competem).

**Solução:** trocar `ScrollView` raiz do dashboard por **`FlatList` com `ListHeaderComponent`** contendo todas as seções atuais do dashboard. A `data` da FlatList = os RevistaCards da semana. Mantém snap + um único gesto vertical.

- `ListHeaderComponent` = topo do dashboard atual (herói + marco + carrossel + ações + CTA Ferramentas + um separador "Sua semana" como cabeçalho de seção)
- `data` = `buildWeeklyFeed(weekData)` (até 10 cards já implementados)
- `renderItem` = reusar `CardShell` (`src/components/feed/CardShell.tsx`)
- `snapToInterval`, `decelerationRate="fast"`, `getItemLayout` — replicar de `explorar.tsx`
- Manter `useFeedDimensions()`, `useCardMeta()`, `NoteSheet` integrados

**Reuso obrigatório (não duplicar):**
- `useCurrentWeek`, `useWeekData` — hooks de `src/hooks/`
- `buildWeeklyFeed` — `src/utils/revistaAdapter.ts`
- `CardShell`, `NoteSheet`, `useFeedDimensions`, `useCardMeta` — `src/components/feed/`
- `useBottomSpacing` — já cobre safe area da tab bar (FX-2)

### 2. Explorar vira Biblioteca Plus

📄 **explorar.tsx**
📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\app\(tabs)\`

**Reescrita completa** (não preservar nada da estrutura FeedSnap — toda essa lógica migrou para o dashboard).

**Nova estrutura — `ScrollView` simples com 3 cards:**

- Header com título "Biblioteca Plus" + subtítulo curto ("Conteúdos extras para você").
- 3 cards verticais, cada um navegando para a rota root correspondente:

| Card | Rota | Ícone DGIcon |
|------|------|--------------|
| Álbum da Gestação | `router.push('/album')` | `image` (ou existente) |
| Artigos | `router.push('/article')` | `book` |
| Chat com Especialista | `router.push('/chat')` | `message` |

**Padrão visual:**
- Reusar tokens do design system (`src/design/tokens.ts`).
- Card glassmorphism com gradient sutil (mesmo padrão de `MethodCard` ou cards do dashboard).
- `maxFontSizeMultiplier={1.3}` herdado do root.
- `useBottomSpacing(true)` para folga inferior.

**Sem novos componentes** — usar `Pressable` + `View` + `Text` + `LinearGradient` + `DGIcon` já existentes.

### 3. Tab layout — sem mudanças

📄 **_layout.tsx**
📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\app\(tabs)\`

Nenhuma alteração. As 4 abas (Início, Explorar, Ferramentas, Perfil) continuam. Rotas hidden (`bebe`, `saude`, `diario`) intocadas.

---

## Arquivos críticos

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\app\(tabs)\`
  📄 **dashboard.tsx** — refatorar raiz de `ScrollView` → `FlatList` + `ListHeaderComponent`; remover CTA "Conteúdo da semana"
  📄 **explorar.tsx** — reescrita completa como hub Biblioteca Plus

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\src\components\feed\`
  📄 **CardShell.tsx** — reusar como está
  📄 **NoteSheet.tsx** — reusar como está

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\src\utils\`
  📄 **revistaAdapter.ts** — reusar `buildWeeklyFeed`

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\src\hooks\`
  📄 **useFeedDimensions, useCardMeta, useCurrentWeek, useWeekData** — reusar

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\app\` (rotas root — alvo dos links da Biblioteca Plus)
  📄 **album.tsx** — não alterar
  📄 **article.tsx** — não alterar
  📄 **chat.tsx** — não alterar

---

## Sequência de execução

1. **@po (Pax)** — validar a story UR-S3 (10-point checklist, formato AIOX, verdict GO esperado já que escopo está fechado).
2. **@dev (Dex)** — implementação em 2 trilhas paralelas:
   - **Trilha 2.A — Dashboard:** refatorar para `FlatList + ListHeaderComponent`, integrar FeedSnap, remover CTA "Conteúdo da semana".
   - **Trilha 2.B — Explorar:** reescrita como hub Plus (3 cards de navegação).
3. **@qa (Quinn)** — typecheck (manter baseline 15 erros, 0 novos) + smoke das 4 abas (foco em scroll/snap do dashboard, sem `VirtualizedLists nested in ScrollView` warning).
4. **@devops (Gage)** — commit consolidado + push (build EAS só em G-7, 01/jun).

---

## Verificação end-to-end

1. **`npm run typecheck`** — 0 erros novos sobre baseline 15.
2. **`npm run web`** — abrir no Chrome:
   - Início: confirmar topo intacto (herói/marco/carrossel/ações/Ferramentas) + scroll continua e revela os RevistaCards da semana com snap funcionando.
   - Confirmar que NoteSheet abre ao tocar em "Anotar" num card do feed embutido.
   - Confirmar que "Salvar" persiste via `useCardMeta`.
   - Explorar: header "Biblioteca Plus" + 3 cards; cada toque navega para `/album`, `/article`, `/chat`.
   - Voltar do Plus volta para a aba Explorar (não para o Início).
3. **Console** — sem warning `VirtualizedLists should never be nested inside plain ScrollViews`.
4. **Redmi Note 9 (web emulado em 360×800):** safe-area inferior respeitada; último card não fica atrás da tab bar.
5. **Visual:** comparar com `docs/design_system/_archived/design_handoff_docegestar/screens/direction-b-*.jsx` (referência hi-fi) para coerência de espaçamento.

---

## Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| `FlatList` raiz no dashboard quebra gestos de pull-to-refresh ou animação do `useBottomSpacing` | Reusar exatamente o setup da `explorar.tsx` atual (já testado). Não introduzir `RefreshControl` agora. |
| `ListHeaderComponent` pesado (herói com gradient + carrossel + ações) degrada performance | `windowSize={5}` + `initialNumToRender={2}` já mitigam. Se travar, memoizar o header com `React.memo`. |
| Snap full-screen do feed pode "engolir" o header em devices baixos | Testar em Redmi Note 9 (FX-2 baseline). Se necessário, ajustar `snapToOffsets` para começar após o header. |
| Remover CTA "Conteúdo da semana" pode confundir usuário acostumado (improvável — ainda não há base) | Sem mitigação; é improvement intencional. |
| Biblioteca Plus aponta para Álbum/Artigo/Chat que crasharam no APK `7f129dea` (FX-1) | FX-1 já resolveu via `074f4fa`/`751d00c`. Smoke das 3 rotas no `npm run web` antes do commit. |
| Card "Chat com Especialista" cria expectativa de feature que não tem backend | Aceitar para Onda 1 — tela existe (RD-7) com mock. Backend = pós-G-7. |

---

## Critério de "pronto"

- ✅ `dashboard.tsx` mostra topo + RevistaCards da semana atual com snap, sem warning.
- ✅ CTA "Conteúdo da semana" removido do dashboard.
- ✅ `explorar.tsx` mostra header Biblioteca Plus + 3 cards navegáveis.
- ✅ `useCardMeta` (salvar/anotar) continua funcional no feed embutido.
- ✅ `npm run typecheck` baseline mantida (15 erros, 0 novos).
- ✅ Smoke das 4 abas + 3 rotas Plus sem crash no `npm run web`.
- ✅ LAUNCH-TRACK linha UR-S3 marcada ✅.
- ✅ Commit + push pelo @devops.

---

## Fora de escopo (não fazer nesta sessão)

- UR-S5 (template enxoval) — próxima story da Onda 1.
- UR-S1/S2/S4/S6 — stories editoriais posteriores.
- Reescrever conteúdo dos RevistaCards.
- Tocar em `WeekCard.tsx` ou rotas hidden (`bebe`, `saude`, `diario`).
- Criar novos conteúdos para Álbum/Artigo/Chat.
- Implementar paywall/monetização do Plus.
- Build EAS — agendado para G-7 (2026-06-01).
