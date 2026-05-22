# PRD — Módulo Enxoval (DoceGestar Plus)

**Versão:** 2.0 (aperfeiçoada e ajustada à arquitetura real do DoceGestar)
**Base:** PRD v1 enviado pelo usuário (pesquisa Perplexity + benchmark Babylist/MyRegistry/The Bump)
**Data:** 2026-05-22
**Autor da revisão:** GESTOR (agente CEO)
**Status:** Proposta para validação — substitui o conceito genérico por um spec executável no DoceGestar
**Relacionado:** `enxoval-completo-spec.md` (E-1) · `fluxo-telas-enxoval-premium-v2.md` (doc irmão)

---

## 0. O que mudou da v1 → v2 (resumo executivo)

A v1 é um bom PRD **genérico de produto**, mas foi escrito sem conhecer as restrições reais do app. A v2 mantém 100% da intenção e expande, corrigindo o que não se sustenta na stack atual (React Native + Expo + SQLite offline-first, sem backend ativo).

| # | Ponto da v1 | Problema encontrado | Correção na v2 |
|---|-------------|---------------------|----------------|
| 1 | "OCR leve" para print | Expo managed **não tem OCR on-device**; exige ML Kit (dev build) ou API de nuvem (custo + rede + privacidade) | OCR vira **feature premium Fase 2** via API de nuvem; MVP usa entrada manual a partir da imagem |
| 2 | Link auto-preenche nome/preço/imagem/loja | Impossível no cliente (CORS, páginas renderizam via JS). Precisa de scraper server-side | Auto-fill vira **premium** via **Cloudflare Worker** (o time já usa Workers + tem `wrangler` instalado). MVP = colar link + campos manuais |
| 3 | "Share → App" (receber do WhatsApp/Insta) | Não funciona no Expo Go; exige `expo-share-intent` + config plugin + **EAS dev build** + intent-filter Android | Mantido, mas marcado **premium Fase 2** com pré-requisito de dev build |
| 4 | Lista compartilhada com parceiro (link, papéis, marcar comprado em tempo real) | Exige **backend** (Supabase está instalado mas **não é usado** hoje) + auth + RLS + sync | Vira **pilar premium Fase 3** sobre Supabase. MVP = compartilhar **imagem/texto** (snapshot) via Share nativo |
| 5 | Status "Entregue" e "Ganhou de presente" como status paralelos a "Comprado" | Quebra a matemática financeira (item "Entregue" perde semântica de "comprado") | **Correção de modelagem:** `status` = ciclo de compra; `entregue` e `presente` viram **flags** independentes |
| 6 | Foco majoritário no bebê | O próprio usuário reforçou: precisa contemplar a **mãe** | v2 estrutura em **2 grupos** (Bebê + Mãe), com categorias de pós-parto, amamentação, autocuidado e maternidade |
| 7 | PRD não menciona monetização | A intenção real é **gancho premium** | v2 adiciona **modelo Free × Premium** completo, ancorado no paywall e na flag `plan` que **já existem** no código |
| 8 | "Notificar quando preço cair" | Notificação 24/7 = scraping em background = backend pesado | Mantido como **verificação manual** (premium) — sem push em background; badge ao abrir o item |
| 9 | Sem requisitos não-funcionais | Faltavam offline, performance, privacidade, acessibilidade | v2 adiciona seção NFR completa |
| 10 | Sem faseamento técnico | Tudo "no mesmo saco" | v2 entrega **3 fases** mapeadas à viabilidade real, protegendo o cronograma do G-7 |

> **Reality-check de receita:** o paywall (`app/onboarding/plans.tsx`) e a flag `plan` existem, mas hoje a assinatura é só um **flag local sem cobrança**. Converter de verdade exige integrar **Google Play Billing** (via `react-native-iap` ou **RevenueCat**) + criar produtos no Play Console. Isso é pré-requisito de qualquer receita real e está listado como dependência da Fase 2.

---

## 1. Visão da funcionalidade

O **Enxoval** é o módulo do DoceGestar que transforma o caos de links, prints, planilhas e apps de loja (WhatsApp, Instagram, Pinterest, Shopee, Amazon, Mercado Livre) em **um lugar só**: descobrir → organizar → planejar gasto → comprar → acompanhar.

Ele é, ao mesmo tempo:

- **Guia de decisão** — checklist inteligente (Bebê + Mãe) adaptado à fase da gestação.
- **Lista de compras** — itens com status, quantidade, prioridade e loja.
- **Controle financeiro simples** — orçamento, gasto, falta e economia, 100% editável.
- **Ferramenta de compartilhamento** — mostrar para o parceiro / família / chá de bebê.

**Posicionamento estratégico:** o Enxoval é o **gancho de conversão para o DoceGestar Plus**. O núcleo (checklist + lista + finanças básicas) é **gratuito e genuinamente útil** — é o que prende a usuária. As funções de **superpoder** (captura automática, comparação de preço, lista colaborativa, exportação) são **premium**.

**Princípio de leveza:** o módulo não pode pesar o app (que já teve crash de boot — ver FX-1). Carregamento sob demanda, sem dependências nativas no caminho de import, dados locais primeiro.

---

## 2. Contexto técnico DoceGestar (a "régua de realidade")

Tudo neste PRD respeita o que o app **é hoje**:

| Aspecto | Estado real | Implicação para o Enxoval |
|---------|-------------|---------------------------|
| Arquitetura de dados | **SQLite local offline-first** (migrations v1–v7) | Núcleo do enxoval é local; sem necessidade de rede |
| Próxima migration livre | **v8** | Tabelas novas entram na v8 |
| Backend | **Supabase instalado mas inativo** (`src/utils/supabase.ts` existe, mas nenhuma feature usa) | Recursos colaborativos exigem ativar Supabase = trabalho novo (Fase 3) |
| Premium | `UserProfile.plan: 'free' \| 'premium'` + `planExpiresAt` **já existem**; paywall pronto (`plans.tsx`) | Gating de feature é trivial: checar `plan === 'premium'` |
| Cobrança real | **Não integrada** (flag setado sem pagamento) | Receita real exige Billing (Fase 2 pré-req) |
| Tela atual | `app/nursery.tsx` — UI base (hero progresso + 4 categorias + checkbox), `useState`, template de 30 itens em memória (UR-S5) | Refatorar para consumir do SQLite e expandir |
| Deps presentes | `expo-image-picker`, `expo-web-browser`, `expo-linking`, `expo-file-system`, `expo-sqlite`, `react-native-mask-input`, `expo-crypto` | Cobrem foto, abrir link, deep-link, máscara de preço |
| Deps **ausentes** | `expo-sharing`, `react-native-view-shot`, `expo-print`, `expo-clipboard`, OCR, share-intent | Cada uma vira tarefa explícita na fase que a usa |
| Infra de deploy | Cloudflare (Workers/Pages) + `wrangler` instalado | Caminho natural para o scraper de link (Fase 2) |
| Design | Tokens (`src/theme`), `DGIcon` (38 ícones), BottomSheet, `useBottomSpacing`, padrão FeedSnap | Reusar — não reinventar UI |

---

## 3. Personas e papéis

| Persona | Acesso | Ações |
|---------|--------|-------|
| **Gestante (principal)** | Total | Cria/edita itens, define orçamento, marca status, vê finanças, compartilha |
| **Parceiro / família** | Convidado (premium, Fase 3) | Vê a lista; marca "comprado"/"presente"; adiciona observação; **não** edita valores |
| **Convidado de chá de bebê** | Só-leitura + marcar presente (premium, Fase 3) | Vê itens; marca "vou dar de presente" |

No MVP (Fase 1), só existe a gestante; "compartilhar" é um **snapshot** (imagem/texto), não colaboração.

---

## 4. Modelo de monetização — Free × Premium (o gancho)

O núcleo grátis precisa ser **bom de verdade** (senão não vira hábito). O premium vende **conveniência e colaboração**.

| Capacidade | Free | Premium (DoceGestar Plus) |
|-----------|:----:|:-------------------------:|
| Checklist inteligente Bebê + Mãe (por fase) | ✅ | ✅ |
| Meu Enxoval: itens, categorias, status, qtd, prioridade, observação | ✅ | ✅ |
| Adicionar item manual (nome, preço, loja, link colado) | ✅ | ✅ |
| Finanças básicas (orçamento, gasto, falta) | ✅ | ✅ |
| Abrir link da loja no navegador in-app | ✅ | ✅ |
| Compartilhar lista como **imagem/texto** (snapshot) | ✅ | ✅ |
| **Captura automática por link** (auto-preenche nome/preço/imagem/loja) | — | ✅ |
| **Captura por imagem/print (OCR)** | — | ✅ |
| **Captura por compartilhamento** (Share → App) | — | ✅ |
| **Comparação de preço multi-loja** (lado a lado + menor preço) | — | ✅ |
| **Alerta de queda de preço** (verificação manual) | — | ✅ |
| **Lista colaborativa** com parceiro/família (tempo real, papéis) | — | ✅ |
| **Modo Chá de Bebê** (link público p/ convidados marcarem presente) | — | ✅ |
| **Exportar PDF** do enxoval | — | ✅ |
| Relatório de economia avançado | — | ✅ |

**Regra de gating:** funções premium aparecem para todas (descoberta = marketing), mas com selo "Plus" e, ao tocar, abrem o paywall existente (`plans.tsx`). Nunca esconder — sempre **provocar desejo**.

> **Decisão recomendada:** **não** limitar a quantidade de itens no plano free (limitar o núcleo parece punitivo e mata o hábito). Gate só nas funções de "superpoder".

---

## 5. Modelo de dados (SQLite — migration v8)

Offline-first. Template em TypeScript popula a tabela na 1ª abertura. Edições ficam no banco.

```sql
-- v8.1 — itens do enxoval (template + personalizados)
CREATE TABLE IF NOT EXISTS enxoval_items (
  id            TEXT PRIMARY KEY,            -- id do template OU uuid (custom)
  owner         TEXT NOT NULL DEFAULT 'bebe',-- 'bebe' | 'mae'
  category      TEXT NOT NULL,               -- id da categoria
  name          TEXT NOT NULL,
  brand         TEXT,
  size          TEXT,
  link          TEXT,
  store         TEXT,
  image_uri     TEXT,
  qty_suggested INTEGER DEFAULT 1,
  qty_desired   INTEGER DEFAULT 1,
  qty_bought    INTEGER DEFAULT 0,
  price_current REAL,                        -- preço observado na loja
  price_target  REAL,                        -- preço desejado (teto)
  price_paid    REAL,                        -- preço final pago
  status        TEXT NOT NULL DEFAULT 'desejado',
                -- 'desejado'|'pesquisando'|'aguardando_promocao'|'comprado'|'nao_preciso'
  priority      TEXT DEFAULT 'desejavel',    -- 'essencial' | 'desejavel'
  is_gift       INTEGER DEFAULT 0,           -- FLAG: ganhou de presente (independe de status)
  delivered     INTEGER DEFAULT 0,           -- FLAG: já chegou
  delivered_at  TEXT,
  bought_at     TEXT,
  group_id      TEXT,                        -- mesmo produto em lojas diferentes (comparação)
  note          TEXT,
  is_custom     INTEGER DEFAULT 0,           -- 0 = template, 1 = usuária criou
  ignored       INTEGER DEFAULT 0,           -- "não preciso" vindo da checklist
  sort_order    INTEGER,
  created_at    TEXT,
  updated_at    INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_enxoval_cat    ON enxoval_items(owner, category, sort_order);
CREATE INDEX IF NOT EXISTS idx_enxoval_status ON enxoval_items(status);
CREATE INDEX IF NOT EXISTS idx_enxoval_group  ON enxoval_items(group_id);

-- v8.2 — configurações e orçamento (linha única)
CREATE TABLE IF NOT EXISTS enxoval_settings (
  id            INTEGER PRIMARY KEY CHECK (id = 1),
  budget_total  REAL DEFAULT 0,
  first_run_done INTEGER DEFAULT 0,
  updated_at    INTEGER NOT NULL
);
```

**Por que `is_gift` e `delivered` são flags, não status (correção-chave):**
Um item pode ser **comprado E entregue**, ou **presente E entregue**. Tratar como status paralelos faria um item "Entregue" perder a informação de que foi comprado, quebrando o cálculo de "já gasto". Como flags, o ciclo de compra (`status`) e a logística (`delivered`) são ortogonais.

**Fonte do template:** `src/data/enxovalTemplate.ts` (UR-S5 já criou 30 itens; Fase 1 expande para ~120 com grupos Bebê+Mãe). Migração popula só quando a tabela está vazia (`SELECT COUNT(*)` = 0) → seguro para quem já tem o app.

**Premium colaborativo (Fase 3):** espelho das mesmas colunas em tabelas Supabase (`enxoval_lists`, `enxoval_items`, `enxoval_members`) com RLS por `list_id`. Sync local↔nuvem só quando `plan === 'premium'` e o compartilhamento está ativo.

---

## 6. Domínio — categorias, status, prioridade

### 6.1 Categorias (2 grupos)

**Bebê**
1. Roupas (RN/P)
2. Higiene & Banho
3. Quarto & Sono
4. Alimentação (amamentação/mamadeira, utensílios)
5. Passeio (carrinho, bebê conforto, bolsa)
6. Saúde & Farmacinha

**Mãe**
7. Maternidade (mala, documentos, parto)
8. Pós-parto & Recuperação
9. Amamentação (sutiãs, bombinha, pomada, conchas)
10. Autocuidado & Conforto

> A UI usa um **toggle Bebê / Mãe** no topo; cada grupo mostra suas categorias. Resolve o pedido explícito de "considerar a mãe, não só o bebê".

### 6.2 Status (ciclo de compra) — 5 valores

`desejado` → `pesquisando` → `aguardando_promocao` → `comprado` → (`nao_preciso` a qualquer momento)

- **Pendentes** (entram em "falta"): `desejado`, `pesquisando`, `aguardando_promocao`
- **Concluídos:** `comprado` (ou flag `is_gift`)
- **Descartado:** `nao_preciso`

### 6.3 Flags ortogonais

- `is_gift` — adquirido sem a usuária pagar (entra em "adquiridos", não em "gasto")
- `delivered` (+ `delivered_at`) — chegou fisicamente

### 6.4 Prioridade — 2 níveis

`essencial` | `desejavel` (alinha ao componente atual; menos carga cognitiva que 3 níveis). Filtro "Essenciais" continua útil para orçamento apertado.

---

## 7. Requisitos funcionais (FR)

### Captura
- **FR-1 (Free):** Adicionar item manual com nome, categoria, grupo (Bebê/Mãe), qtd desejada, preço, loja, link, prioridade, observação. Status inicial `desejado`.
- **FR-2 (Free):** Colar link manualmente no campo "link" (sem auto-fill).
- **FR-3 (Premium):** Auto-preencher item a partir de um link colado (nome/preço/imagem/loja) via Worker de metadados.
- **FR-4 (Premium):** Capturar item via imagem/print (OCR de nome+preço; campos editáveis).
- **FR-5 (Premium):** Receber item por compartilhamento de outro app (Share → App).

### Organização
- **FR-6 (Free):** Listar "Meu Enxoval" agrupado por categoria, com toggle Bebê/Mãe.
- **FR-7 (Free):** Filtros por status (Todos, Pendentes, Comprados, Essenciais).
- **FR-8 (Free):** Editar qualquer campo do item; alterar status; ajustar qtd comprada vs desejada.
- **FR-9 (Free):** Marcar `nao_preciso` (item some dos pendentes, não conta no orçamento).
- **FR-10 (Free):** Abrir o link da loja no navegador in-app (`expo-web-browser`).

### Checklist (guia)
- **FR-11 (Free):** Checklist consolidada Bebê+Mãe com quantidade recomendada e observação por item, adaptada à fase gestacional (derivada da DPP).
- **FR-12 (Free):** "Salvar no enxoval" cria o item em `desejado`; "Não preciso" marca como ignorado sem criar.

### Finanças
- **FR-13 (Free):** Definir/editar `budget_total` a qualquer momento.
- **FR-14 (Free):** Ao marcar `comprado`, registrar `price_paid` e `bought_at` (opcionais e editáveis).
- **FR-15 (Free):** Painel com Orçamento, Já gasto, Falta, Economia (regras na §8).
- **FR-16 (Free):** Recalcular tudo automaticamente em qualquer edição retroativa.

### Comparação & promoção (Premium)
- **FR-17 (Premium):** Salvar o mesmo produto em várias lojas (mesmo `group_id`) e ver lado a lado, com destaque do menor preço.
- **FR-18 (Premium):** Marcar `aguardando_promocao` e, ao abrir o item, verificar manualmente se `price_current < price_target` (badge "abaixo do desejado"). Sem push em background.

### Entrega
- **FR-19 (Free):** Marcar `delivered` + data; opção "Devolvido" com motivo curto (regrava `nao_preciso` + nota).
- **FR-20 (Free):** Destaque visual de itens `comprado` ainda não `delivered`.

### Compartilhamento
- **FR-21 (Free):** Compartilhar a lista como **imagem** (snapshot da tela) e/ou **texto** via Share nativo.
- **FR-22 (Premium):** Lista **colaborativa** (link + papéis: editar / marcar comprado / só ver).
- **FR-23 (Premium):** **Modo Chá de Bebê** — link público; convidados marcam "vou presentear"; evita presente duplicado.
- **FR-24 (Premium):** Exportar **PDF** do enxoval.

### Onboarding do módulo
- **FR-25 (Free):** 1ª abertura: ler `dueDate`/`firstChild` do `user_profile` (não re-perguntar); opcionalmente sugerir definir orçamento. Marcar `first_run_done`.

---

## 8. Regras de negócio (finanças) — corrigidas e explícitas

```
adquiridos      = itens com status='comprado' OU is_gift=1
ja_gasto        = Σ price_paid  onde status='comprado' E price_paid > 0
                  (presentes NÃO entram em gasto — foram adquiridos sem desembolso)
falta_orcamento = max(0, budget_total − ja_gasto)
economia        = Σ max(0, price_target − price_paid)
                  onde status='comprado' E price_target > 0 E price_paid > 0
progresso(%)    = adquiridos / (total − ignorados − nao_preciso)
```

**Casos de borda definidos:**
- Item `comprado` sem `price_paid` → conta em "adquiridos"/progresso, mas **não** em "já gasto".
- `is_gift` com `price_paid` preenchido (ex.: a usuária quer registrar valor estimado) → conta em "adquiridos", **não** em "gasto" (presente). Campo separado "valor recebido em presentes" pode somar isso (relatório premium).
- `qty_desired > qty_bought` → item permanece "parcial" nos pendentes até `qty_bought ≥ qty_desired`.

---

## 9. Requisitos não-funcionais (NFR)

- **NFR-1 Offline-first:** todo o núcleo funciona sem rede. Recursos premium de nuvem degradam graciosamente (mensagem clara, nunca crash).
- **NFR-2 Performance/leveza:** módulo carregado sob demanda; sem libs nativas no caminho de import (lição do FX-1). Lista virtualizada (`FlatList`) para ~120+ itens.
- **NFR-3 Persistência segura:** migrations idempotentes (`CREATE TABLE IF NOT EXISTS`); popular template só com tabela vazia.
- **NFR-4 Privacidade:** OCR/scraper enviam dados a serviços externos → exigir consentimento explícito + atualizar a política de privacidade (docegestar.com.br/privacidade). LGPD.
- **NFR-5 Acessibilidade:** `accessibilityRole`/labels (padrão atual), alvos ≥ 44px, respeitar `maxFontSizeMultiplier=1.3` (FX-2) e safe-area.
- **NFR-6 i18n:** 100% PT-BR; preços em BRL com `react-native-mask-input`.
- **NFR-7 Resiliência de rede (premium):** timeouts e fallback para entrada manual quando o Worker/OCR falha.

---

## 10. Faseamento (protege o G-7 e a viabilidade)

| Fase | Escopo | Backend? | Deps novas | Quando |
|------|--------|:--------:|------------|--------|
| **Fase 0** ✅ | UR-S5 mínimo — 30 itens em memória | Não | — | Já feito (G-7) |
| **Fase 1 — MVP Enxoval (FREE)** | SQLite v8, template ~120 (Bebê+Mãe), categorias, status corrigido, qtd, finanças básicas, checklist, add manual, abrir link, entrega, compartilhar imagem | Não | `react-native-view-shot`, `expo-sharing` | **Onda 2 (pós-G-7)** |
| **Fase 2 — Premium Captura & Comparação** | Auto-fill por link (Worker), OCR (cloud), Share→App (dev build), comparação multi-loja, verificação de preço, PDF | Worker + OCR cloud | `expo-share-intent`, `expo-print`, `expo-clipboard`, OCR | Após Fase 1 + **decisão de Billing** |
| **Fase 3 — Premium Colaborativo** | Lista compartilhada (Supabase), papéis, Modo Chá de Bebê (link público) | Supabase (ativar) | auth + RLS | Após validação de demanda da Fase 2 |

**Pré-requisito de receita (entre Fase 1 e 2):** integrar Google Play Billing (RevenueCat recomendado) + criar produtos (mensal/anual) no Play Console e conectar ao paywall existente.

---

## 11. Métricas de sucesso

- **Ativação:** % de gestantes que criam ≥ 1 item de enxoval na 1ª semana.
- **Engajamento:** itens marcados por usuária; retorno semanal ao módulo.
- **Hook → conversão:** % que toca em função premium (descoberta) → % que abre paywall → % que assina.
- **Retenção:** uso do enxoval correlacionado a retenção D30.
- **Financeiro:** orçamento médio definido; "economia" total exibida (prova de valor).

---

## 12. Riscos & mitigações

| Risco | Severidade | Mitigação |
|-------|:----------:|-----------|
| Auto-fill de link instável (lojas variam HTML) | Alta | Worker com parsers por loja + fallback manual; nunca bloquear o cadastro |
| OCR impreciso | Média | Sempre editável; OCR é "acelerador", não fonte de verdade |
| Share→App quebra Expo Go | Média | Só em dev/preview build EAS; documentar; feature-flag |
| Custo de OCR/scraper cloud | Média | Limitar a premium; cache; rate-limit no Worker |
| Billing não integrado vira "premium fake" | **Alta** | Decidir Billing antes de lançar gating premium; até lá, Fase 1 é 100% free |
| Conflito com CLAUDE.md ("MVP gratuito") | Média | Atualizar objetivo do produto: free no G-7, premium na Onda 2 |
| Migration v8 em base instalada | Média | `IF NOT EXISTS` + popular só vazio (padrão validado v2–v7) |
| Refator do `nursery.tsx` quebrar UI | Média | Preservar contrato visual; QA no Redmi Note 9 antes do commit |
| Privacidade (dados a serviços externos) | Alta | Consentimento + política atualizada (LGPD) |

---

## 13. Decisões de produto em aberto (com recomendação)

1. **Timing:** Enxoval premium é Onda 2 (pós-G-7)?
   → **Recomendado: SIM.** Fase 1 (free) entra logo após o G-7; não atrasa a publicação.
2. **Billing:** RevenueCat ou `react-native-iap` puro?
   → **Recomendado: RevenueCat** (abstrai Play Billing, webhooks, trials; menos código).
3. **Auto-fill de link:** Worker próprio (Cloudflare) ou API de terceiros (Microlink/LinkPreview)?
   → **Recomendado: Worker próprio** — o time já domina Cloudflare + `wrangler` instalado; controla custo e privacidade.
4. **Limite de itens no free:** limitar?
   → **Recomendado: NÃO** — gate só nas funções de superpoder.
5. **Modo Chá de Bebê (link público):** entra na Fase 3 ou vira E-2 separado?
   → **Recomendado: Fase 3**, junto da lista colaborativa (mesma infra Supabase).

---

## 14. Fora de escopo (não fazer)

- Scraping profundo/automático em tempo real de todas as lojas.
- Detecção automática avançada de duplicados (fica manual por nome+loja).
- Histórico de preços com gráficos e push 24/7.
- Integração com gateways de pagamento de loja / cupons.
- Marketplace próprio, rede social, gamificação pesada.

---

## 15. Recomendação de modelo por fase de build (cowork-plan-protocol)

| Entrega | Modelo | Justificativa | Tokens |
|---------|--------|---------------|:------:|
| Template ~120 itens (`enxovalTemplate.ts`) | `claude-haiku-4-5` | Geração de dados estáticos seguindo schema | Baixo |
| Migration v8 + `enxovalRepo.ts` (CRUD/queries) | `claude-sonnet-4-6` | Integração dados↔SQLite, regras financeiras | Médio |
| Refator `nursery.tsx` + componentes (filtros, sheets, toggle, finanças) | `claude-sonnet-4-6` | Telas com múltiplos estados e lógica | Médio |
| Worker de auto-fill de link (Fase 2) | `claude-sonnet-4-6` | Parsing + endpoint + fallback | Médio |
| Arquitetura Supabase colaborativa + RLS (Fase 3) | `claude-opus-4-7` | Decisão de arquitetura multi-usuário com trade-offs | Alto |
| Integração Billing/RevenueCat | `claude-opus-4-7` | Crítico, dinheiro real, edge cases | Alto |

---

## Referências

- PRD v1 + fluxo de telas v1 — enviados pelo usuário (sessão Perplexity, 2026-05-22)
- `enxoval-completo-spec.md` — spec E-1 anterior (este PRD a expande)
- Código auditado: `app/nursery.tsx`, `src/data/enxovalTemplate.ts`, `src/db/index.ts`, `src/hooks/useUserProfile.ts`, `src/types/index.ts`, `app/onboarding/plans.tsx`, `package.json`
- Benchmarks citados pelo usuário: Babylist, MyRegistry, The Bump
