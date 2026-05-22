# Fluxo de Telas — Módulo Enxoval (DoceGestar Plus)

**Versão:** 2.0 (aperfeiçoado e ajustado à navegação real do DoceGestar — expo-router)
**Base:** Documento de fluxo v1 enviado pelo usuário (9 fluxos)
**Data:** 2026-05-22
**Doc irmão:** `PRD-enxoval-premium-v2.md` (requisitos FR-* referenciados aqui)
**Status:** Proposta para validação

> **Como ler:** cada tela traz tags **[Free]/[Plus]**, **[Fase 1/2/3]** e **(rota)** expo-router quando aplicável. "Plus" = abre o paywall existente (`app/onboarding/plans.tsx`) se a usuária não for premium.

---

## 0. O que mudou da v1 → v2

| # | v1 | Correção/aperfeiçoamento v2 |
|---|----|------------------------------|
| 1 | Telas genéricas sem rota | Mapeadas para **rotas expo-router** reais; reuso de `app/nursery.tsx` |
| 2 | "Salvar via link" auto-preenche | Separado em **manual [Free]** e **auto-fill [Plus]** — realidade técnica |
| 3 | OCR como fluxo simples | Marcado **[Plus][Fase 2]** com dependência de OCR cloud |
| 4 | Share→App como fluxo trivial | Marcado **[Plus][Fase 2]**, exige dev build + intent-filter |
| 5 | Compartilhar lista = link/papéis | Dividido: **snapshot imagem [Free]** vs **colaborativa [Plus][Fase 3]** |
| 6 | Status "Entregue"/"Presente" como telas de status | Vira **flags** (toggles) na tela de detalhe, não status paralelos |
| 7 | Só bebê | Adicionado **toggle Bebê/Mãe** em todas as telas de lista/checklist |
| 8 | Faltavam fluxos | Adicionados: **F0 first-run**, **F5b orçamento**, **comparação multi-loja**, **upsell premium**, **estados vazio/erro** |
| 9 | Sem mapa de navegação | Adicionado **mapa de IA** + estados por tela |

---

## 1. Arquitetura de navegação (mapa de IA)

```
(tabs)/ferramentas.tsx
        │  card "Enxoval"  → router.push('/nursery')
        ▼
/nursery                         ← HUB do Enxoval [Free][Fase 1]
   ├─ toggle [ Bebê | Mãe ]
   ├─ banner sugestão por fase (derivada da DPP)
   ├─ hero de progresso (% + adquiridos/total)
   ├─ chips de filtro (Todos | Pendentes | Comprados | Essenciais)
   ├─ grade de categorias (do grupo ativo)
   ├─ lista de itens (FlatList)
   ├─ FAB "+"  → /enxoval/add (sheet)
   └─ header: [Checklist] [Finanças] [Compartilhar] [Modo loja]

Rotas filhas (novas):
/enxoval/add            → adicionar item (BottomSheet)         [Free][Fase 1]
/enxoval/item/[id]      → detalhe/edição do item               [Free][Fase 1]
/enxoval/checklist      → guia (Bebê+Mãe, por fase)            [Free][Fase 1]
/enxoval/financas       → painel financeiro + editar orçamento [Free][Fase 1]
/nursery?mode=shopping  → Modo loja (mesma tela, simplificada) [Free][Fase 1]
/enxoval/compare/[group]→ comparação multi-loja                [Plus][Fase 2]
/enxoval/share          → compartilhar (imagem/texto + Plus)   [Free/Plus]
```

> Reuso máximo: o **hub é o `nursery.tsx` atual** refatorado. Sheets seguem o padrão BottomSheet (ONB-4). Ícones via `DGIcon`.

---

## 2. Fluxo 0 — Primeira abertura (NOVO) [Free][Fase 1]

Cobre **FR-25**. Substitui o "onboarding de 4 perguntas" da v1 (que duplicaria dados).

1. **(rota /nursery)** — 1ª vez (`first_run_done = 0`):
   - Lê `dueDate` e `firstChild` do `user_profile` (NÃO re-pergunta).
   - Card de boas-vindas curto: "Seu enxoval, num lugar só." + 2 botões:
     - **"Ver sugestões"** → popula a lista a partir do template (~120 itens, status `desejado`).
     - **"Começar do zero"** → lista vazia (usuária adiciona manualmente).
   - Pergunta opcional (1 toque, dispensável): "Quer definir um orçamento agora?" → `/enxoval/financas` ou "Depois".
   - Grava `first_run_done = 1`.
2. Aberturas seguintes: vai direto ao hub com o estado salvo.

**Estados:** vazio (começar do zero) · populado (template) · sem DPP (sugestão por fase desativada, resto funciona).

---

## 3. Fluxo 1 — Acessar o módulo [Free][Fase 1]

1. **(tabs)/ferramentas** — card "Enxoval" (já existe, `route: '/nursery'`).
2. **/nursery (hub)** — visão geral com tudo na própria tela (não telas separadas para "guia/lista/finanças/compartilhar"; viram **ações no header** + rotas filhas):
   - Toggle **Bebê | Mãe**
   - Banner de sugestão por fase
   - Hero de progresso
   - Filtros + categorias + lista
   - Header: **Checklist** · **Finanças** · **Compartilhar** · **Modo loja**

> **Correção v1:** a v1 propunha 4 cards-tela ("Guia", "Meu enxoval", "Finanças", "Compartilhar"). Em mobile isso vira navegação redundante. v2 unifica no hub com atalhos — menos toques, menos código.

---

## 4. Fluxo 2 — Salvar um item

### 4.1 Manual (colar link OU digitar) [Free][Fase 1] — FR-1, FR-2
1. **/nursery** → FAB "+" → **/enxoval/add** (BottomSheet).
2. Formulário:
   - Grupo (Bebê/Mãe), Categoria, Nome* , Qtd desejada* , Preço, Loja, **Link (colar)**, Prioridade, Observação.
   - Status inicial: `desejado`.
3. "Salvar" → item aparece em **/nursery** na categoria certa.

**Estados:** validação (nome obrigatório) · sucesso (toast) · cancelar (descarta).

### 4.2 Auto-fill por link [Plus][Fase 2] — FR-3
1. **/enxoval/add** → campo link → botão **"Buscar dados ✨ Plus"**.
2. Se free → **paywall**. Se premium → chama **Cloudflare Worker** de metadados.
3. Worker retorna nome/preço/imagem/loja → preenche o formulário (**tudo editável**).
4. Falha/timeout → fallback para 4.1 (manual) com aviso gentil.

### 4.3 Compartilhamento (Share → App) [Plus][Fase 2] — FR-5
> Requer `expo-share-intent` + intent-filter Android + **EAS dev build** (não Expo Go).
1. Em outro app (WhatsApp/Insta/navegador) → Compartilhar → **DoceGestar**.
2. App abre **/enxoval/add** pré-carregado com o link/imagem recebidos.
3. Usuária confirma categoria/qtd/prioridade → Salvar.

### 4.4 Imagem/print (OCR) [Plus][Fase 2] — FR-4
1. **/enxoval/add** → "Enviar print ✨ Plus" → `expo-image-picker`.
2. Premium → imagem vai ao **OCR cloud**; extrai nome+preço (editáveis).
3. Free → paywall. Falha → entrada manual com a imagem anexada (`image_uri`).

---

## 5. Fluxo 3 — Organizar "Meu Enxoval" [Free][Fase 1] — FR-6..FR-10

1. **/nursery** — lista por categoria, dentro do grupo (Bebê/Mãe) ativo.
   - **Filtros:** Todos · Pendentes · Comprados · Essenciais.
   - Cada item: checkbox/seleção, nome, chip de prioridade, qtd (x/y), selo de status, preço.
2. Tocar item → **/enxoval/item/[id]** (detalhe):
   - Campos editáveis: nome, link, loja, preço atual, preço desejado, qtd desejada/comprada, prioridade, observação.
   - **Selo de status** (picker: desejado/pesquisando/aguardando_promocao/comprado/nao_preciso).
   - **Toggles (flags):** "Ganhei de presente", "Já chegou (entregue)".
   - Ações: "Marcar como comprado" (abre mini-fluxo financeiro — Fluxo 5), "Abrir na loja" (`expo-web-browser`), "Comparar preços ✨ Plus", "Excluir".
3. "Salvar" → volta à lista (recálculo automático).

**Estados:** vazio por categoria · item parcial (qtd comprada < desejada) · sem preço.

---

## 6. Fluxo 4 — Checklist (guia Bebê + Mãe) [Free][Fase 1] — FR-11, FR-12

1. **/enxoval/checklist** — blocos por categoria, **toggle Bebê/Mãe**.
   - Item: nome, **qtd recomendada**, observação curta (ex.: "principalmente para RN").
   - Adaptação por **fase gestacional** (derivada da DPP): destaca o que é prioridade agora.
2. Por item: **"Salvar no enxoval"** (cria em `desejado`) · **"Não preciso"** (marca `ignored`, não cria).
3. Não força aceitar tudo. Itens já salvos aparecem com check.

**Estados:** sem DPP (mostra checklist completa, sem destaque de fase) · item já no enxoval (marcado).

---

## 7. Fluxo 5 — Marcar comprado + atualizar finanças [Free][Fase 1] — FR-14, FR-15

1. **/enxoval/item/[id]** → status → **"Comprado"**.
2. Mini-fluxo (inline ou sheet):
   - **Preço final pago** (editável, `react-native-mask-input` BRL).
   - **Data da compra** (opcional).
   - Qtd comprada (default = desejada).
   - (opcional) forma de pagamento — só registro.
3. "Confirmar compra" → grava `price_paid`, `bought_at`, `status='comprado'`.
4. Atalho para **/enxoval/financas** com valores atualizados.

**Correção v1:** "Comprado" não vira "Entregue" automaticamente. Entrega é um **toggle** separado (Fluxo 8).

---

## 8. Fluxo 5b — Definir/editar orçamento (NOVO) [Free][Fase 1] — FR-13

1. **/enxoval/financas** → "Editar orçamento".
2. Campo único `budget_total` (BRL). Salvar → painel recalcula.

---

## 9. Fluxo 6 — Painel financeiro [Free][Fase 1] — FR-15, FR-16

1. **/enxoval/financas** — métricas (regras na §8 do PRD):
   - **Orçamento total** · **Já gasto** · **Falta** · **Economia em promoções**.
   - Barra de progresso de gasto vs orçamento.
   - Lista compacta de comprados com valor pago (toque → item).
2. "Editar orçamento" (Fluxo 5b). Edição de qualquer item recalcula tudo (FR-16).
3. **[Plus]** "Relatório de economia" detalhado (botão com selo).

**Estados:** orçamento = 0 (CTA "definir orçamento") · sem compras (economia = R$0).

---

## 10. Fluxo 7 — Comparação de preço multi-loja (NOVO) [Plus][Fase 2] — FR-17, FR-18

1. Em **/enxoval/item/[id]** → "Comparar preços ✨ Plus" → agrupa por `group_id`.
2. **/enxoval/compare/[group]** — mesmo produto em N lojas, lado a lado: loja, preço atual, link. **Destaque do menor preço.**
3. "Adicionar outra loja" → /enxoval/add com `group_id` preenchido.
4. Item em `aguardando_promocao` → botão **"Verificar preço"** (manual): compara `price_current` x `price_target`, badge "abaixo do desejado". **Sem push em background.**

---

## 11. Fluxo 8 — Entrega / devolução [Free][Fase 1] — FR-19, FR-20

1. **/nursery** — itens `comprado` e **não** `delivered` em destaque ("a caminho").
2. **/enxoval/item/[id]**:
   - Toggle **"Já chegou"** → `delivered=1` + `delivered_at`.
   - **"Devolvido"** → motivo curto (tamanho/defeito) → status `nao_preciso` + nota; recalcula finanças.

---

## 12. Fluxo 9 — Edição retroativa [Free][Fase 1] — FR-16

Qualquer item já comprado pode ter status/preço/qtd corrigidos em **/enxoval/item/[id]** → **finanças recalculam automaticamente**. (É o comportamento padrão da tela de detalhe; não é uma tela nova.)

---

## 13. Fluxo 10 — Compartilhar [Free + Plus]

### 13.1 Snapshot (imagem/texto) [Free][Fase 1] — FR-21
1. **/nursery** header → "Compartilhar" → **/enxoval/share**.
2. Opções:
   - **Como imagem** — `react-native-view-shot` captura a lista → Share nativo (`expo-sharing`).
   - **Como texto** — gera resumo (categorias + pendentes) → Share nativo.
3. Read-only; serve para "mostrar pro marido / chá de bebê" sem backend.

### 13.2 Lista colaborativa [Plus][Fase 3] — FR-22
1. **/enxoval/share** → "Compartilhar com parceiro ✨ Plus".
2. Premium → gera link (Supabase) + escolhe papel: **editar / marcar comprado / só ver**.
3. **Tela do convidado** (web ou app): mesma lista; permissões conforme papel; pode marcar "comprado"/"presente" + observação.

### 13.3 Modo Chá de Bebê [Plus][Fase 3] — FR-23
1. **/enxoval/share** → "Modo Chá de Bebê ✨ Plus" → link público.
2. Convidados marcam "vou presentear" (evita duplicado). Gestante vê quem reservou.

### 13.4 Exportar PDF [Plus][Fase 2] — FR-24
1. **/enxoval/share** → "Exportar PDF ✨ Plus" → `expo-print` gera o PDF do enxoval.

---

## 14. Modo Loja (NOVO) [Free][Fase 1]

1. **/nursery** header → "Modo loja" → **/nursery?mode=shopping**.
2. Mesma tela, simplificada: esconde hero + grade; mostra só **pendentes em lista única** com checkbox grande (otimizado para usar dentro da loja física). Marcar = `comprado` rápido.

> **Correção v1:** reusa a tela com query param em vez de criar tela nova → menos código duplicado.

---

## 15. Pontos de upsell premium (NOVO)

Onde o "gancho" aparece (sempre visível, nunca escondido):
- Botões com selo **"✨ Plus"**: auto-fill, OCR, comparar, colaborar, PDF, relatório.
- Tocar em qualquer um sendo free → **paywall existente** (`app/onboarding/plans.tsx`).
- Banner discreto no hub após X itens: "Compartilhe com o papai e comparem preços juntos ✨".

---

## 16. Estados globais por tela (checklist de UX)

| Tela | Vazio | Carregando | Erro | Premium-locked |
|------|-------|-----------|------|----------------|
| /nursery | "Comece seu enxoval" + CTA | skeleton | toast + retry | — |
| /enxoval/add | — | — | validação inline | botões Plus → paywall |
| /enxoval/item/[id] | — | spinner | toast | comparar → paywall |
| /enxoval/checklist | — | skeleton | toast | — |
| /enxoval/financas | "Defina seu orçamento" | — | — | relatório → paywall |
| /enxoval/compare | — | spinner Worker | fallback manual | tela inteira → paywall |
| /enxoval/share | — | — | "sem conexão" p/ colaborativo | colaborativa/PDF → paywall |

---

## 17. Telas novas a criar (resumo p/ design & dev)

📁 `app/`
  📄 **nursery.tsx** — refator: hub + toggle + filtros + modo loja [Fase 1]

📁 `app/enxoval/` (novas rotas)
  📄 **add.tsx** — adicionar item (sheet) [F1]
  📄 **item/[id].tsx** — detalhe/edição [F1]
  📄 **checklist.tsx** — guia Bebê+Mãe [F1]
  📄 **financas.tsx** — painel + orçamento [F1]
  📄 **share.tsx** — compartilhar [F1 imagem / F2-F3 Plus]
  📄 **compare/[group].tsx** — comparação multi-loja [F2]

📁 `src/components/enxoval/` (componentes)
  📄 EnxovalItemRow · EnxovalFilters · EnxovalGroupToggle · EnxovalAddSheet · EnxovalBudgetCard · EnxovalSugestaoBanner · PremiumLockButton

---

## 18. Recomendação de modelo por tela (cowork-plan-protocol)

| Entrega | Modelo | Justificativa | Tokens |
|---------|--------|---------------|:------:|
| Componentes de UI simples (Row, Toggle, Filters, Banner) | `claude-haiku-4-5` | UI determinística seguindo tokens | Baixo |
| `nursery.tsx` refator (hub, modo loja, filtros) | `claude-sonnet-4-6` | Múltiplos estados + query param | Médio |
| `add.tsx` / `item/[id].tsx` (form + status + flags) | `claude-sonnet-4-6` | Lógica de formulário e persistência | Médio |
| `financas.tsx` (regras + recálculo) | `claude-sonnet-4-6` | Regras de negócio | Médio |
| `compare/[group].tsx` + integração Worker | `claude-sonnet-4-6` | Integração rede + fallback | Médio |
| Telas colaborativas (Supabase, papéis) | `claude-opus-4-7` | Arquitetura multiusuário | Alto |

---

## Referências
- Fluxo v1 + PRD v1 — enviados pelo usuário (Perplexity, 2026-05-22)
- `PRD-enxoval-premium-v2.md` (requisitos FR-*)
- Navegação real: `app/_layout.tsx` (Stack), `app/(tabs)/ferramentas.tsx` (card → `/nursery`), `app/nursery.tsx`
