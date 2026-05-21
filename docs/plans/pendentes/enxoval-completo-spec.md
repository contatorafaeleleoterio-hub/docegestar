# Enxoval Completo — Spec da Sessão E-1

**Data:** 2026-05-21
**Status:** Planejado (não iniciado)
**Origem:** Conceito enviado pelo usuário em 21/mai, expandido a partir de UR-S5.
**Posição na sequência:** **PÓS-G-7** — entra como primeira sessão da Onda 2 (depois da publicação Play Store em 01/jun).

---

## 1. Por que essa sessão é separada (e não cabe em UR-S5)

UR-S5 original era 1 story pequena (S): "popular tela com 30 itens essenciais na primeira abertura". O conceito que o usuário enviou é uma **feature de produto inteira** — 8 categorias, persistência SQLite, fluxo inicial guiado, filtros, modo loja, compartilhamento. Isso é trabalho de M-L, com schema novo, migration e múltiplas telas.

**Risco se forçássemos para Onda 1:**
- Atrasa G-7 (01/jun) — hoje a janela é apertada (Sub-A + Sub-B + UR-S4 + build EAS).
- Mistura editorial pesado (UR-S1/S2/S4/S6) com persistência/UX/migração — disciplinas diferentes, contexto trocando.

**Solução:**
- **UR-S5 fica como está na Onda 1** (escopo reduzido — ver §2): template de 30 itens carregados em memória na 1ª abertura. MVP-MVP do enxoval, suficiente para G-7.
- **Sessão E-1 (esta spec)** entra **depois** do G-7 — Onda 2. Pega o conceito completo, ataca o que falta para virar feature de verdade: SQLite, fluxo inicial, filtros, modo loja, compartilhar.

---

## 2. UR-S5 (Onda 1, pré-G-7) — escopo mínimo

Apenas o necessário para o app não soar vazio na Play Store:

- Criar `src/data/enxovalTemplate.ts` com **30 itens essenciais** distribuídos nas 4 categorias atuais (`roupas`, `higiene`, `quarto`, `saida`).
- Em `app/nursery.tsx`: na 1ª abertura (quando todas as categorias estiverem com array vazio em estado), pré-popular do template.
- Mantém persistência em `useState` (sem SQLite ainda).
- Mantém o Alert "Em breve" do botão `+`.

**Não fazer agora:** quantidade ajustável, prioridade editável, fluxo inicial, filtros, modo loja, compartilhar, SQLite, sugestões por IG.

Isso é o que entra na Onda 1. **Tudo abaixo é a sessão E-1 pós-G-7.**

---

## 3. Estado atual do código (auditoria 2026-05-21)

📄 **nursery.tsx**
📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\app\`

| Aspecto | Implementado | Faltando |
|---------|--------------|----------|
| Header (back + título + botão +) | ✅ | — |
| Hero de progresso (círculo + frase) | ✅ | — |
| Grade de categorias | ✅ (4) | 4 categorias novas |
| Lista de itens com checkbox | ✅ | quantidade, observação, prioridade editável |
| Persistência | ❌ (useState) | SQLite + sync |
| Adicionar item | ❌ (Alert) | tela/sheet de adicionar |
| Editar quantidade | ❌ | botões -/+ |
| Filtros | ❌ | barra de chips |
| Modo loja | ❌ | tela própria |
| Compartilhar | ❌ | menu + PDF/imagem |
| Fluxo inicial | ❌ | onboarding curto |
| Sugestão por IG | ❌ | hook + banner |
| Categorias visuais | 4 (`roupas`, `higiene`, `quarto`, `saida`) | adicionar `alimentacao`, `sono`, `passeio`, `farmacinha`, `maternidade`, `rn` |
| Itens default | só 6 em "roupas" | template ~120 itens (UR-S5 cuida de 30, E-1 expande pra ~120) |

---

## 4. Análise crítica do conceito enviado — melhorias propostas

O conceito veio bem estruturado. Pontos onde proponho ajustes:

### 4.1. Categorias — consolidar para evitar duplicação

Conceito original: 8 categorias (Higiene, Alimentação, Sono, Passeio, Roupas RN, Farmacinha, Maternidade, Quarto). O app já tem 4 (`roupas`, `higiene`, `quarto`, `saida`). Proposta:

| ID | Label | Origem |
|----|-------|--------|
| `roupas` | Roupas RN | já existe |
| `higiene` | Higiene | já existe |
| `quarto` | Quarto/Sono | unir "quarto" + "sono" (mesmo cômodo) |
| `alimentacao` | Alimentação | novo |
| `passeio` | Passeio | renomear "saida" → "passeio" (mais claro) |
| `farmacinha` | Farmacinha | novo |
| `maternidade` | Maternidade | novo |

**Total: 7 categorias** (não 8). "Saída" e "Maternidade" eram quase sinônimos no original — "Maternidade" cobre malas/documentos; "Passeio" cobre carrinho/bebê conforto/bolsa do dia a dia.

### 4.2. Prioridade — manter 2 níveis, não 3

Conceito: `essencial / importante / opcional`. O componente já usa 2 (`essencial / especial`). Proposta: ficar com **2 níveis** (`essencial`, `desejavel`). Menos cognição, mesmo valor. Filtro de "essencial" continua funcional.

### 4.3. Fluxo inicial — minimalista

Conceito sugere 4 perguntas (sexo, DPP, primeira gravidez, estação). O app já tem **3 dessas** no onboarding existente (gestationType/sex, DPP/dueDate). Não perguntar de novo.

**Proposta:** ler do `user_profile` o que já existe; perguntar **só "primeira gravidez? S/N"** dentro da própria tela do enxoval, 1x, ao entrar pela 1ª vez. Estação derivada da DPP (mês). Sem onboarding novo.

### 4.4. Compartilhar — começar simples

PDF + imagem + link é 3 caminhos diferentes (Print API, expo-print + canvas, deep-link). Proposta: **MVP de E-1 entrega só "compartilhar como imagem"** via `expo-media-library` + screenshot da lista (componente `view-shot`). PDF e link entram em E-2 (incremento posterior). Reduz complexidade e mantém o valor de "mostrar para o marido / chá de bebê".

### 4.5. Sugestões por IG — sem motor, copy estática

Conceito menciona "sistema simples baseado em IG". Proposta: **mapa estático** por faixa gestacional (`<20`, `20-27`, `28-35`, `36+`) → mensagem fixa. Sem regras complexas. Exemplo:

```ts
const SUGESTAO_POR_FASE: Record<string, string> = {
  '<20': 'Tempo de pesquisar — anote ideias, sem pressa.',
  '20-27': 'Boa hora pra começar a comprar os essenciais aos poucos.',
  '28-35': 'Hora de preparar a mala da maternidade.',
  '36+': 'Mala pronta? Confira a categoria Maternidade.',
};
```

Renderizar como banner discreto acima do hero de progresso.

### 4.6. Modo Checklist Rápido — usar parâmetro de rota, não tela nova

Conceito sugere "tela simplificada". Proposta: **mesmo `nursery.tsx` com query param `?mode=shopping`** que esconde hero + categorias visuais e mostra só os itens pendentes em lista única. Menos código duplicado, navegação via botão "Modo loja" no header.

### 4.7. Tabela `usuario_itens` separada da tabela `itens` — manter, mas com pegada de SQLite local

Como o app é offline-first (SQLite local, sem backend), não há `user_id`. Proposta:

```sql
-- v8 migration
CREATE TABLE IF NOT EXISTS enxoval_items (
  id TEXT PRIMARY KEY,             -- uuid OU id do template
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  qty_suggested INTEGER DEFAULT 1,
  qty_user INTEGER DEFAULT 0,
  bought INTEGER DEFAULT 0,        -- 0/1
  priority TEXT DEFAULT 'desejavel', -- 'essencial' | 'desejavel'
  essential INTEGER DEFAULT 0,     -- bit (true para itens do template marcados essenciais)
  note TEXT,
  is_custom INTEGER DEFAULT 0,     -- 0 = veio do template, 1 = usuária criou
  sort_order INTEGER,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_enxoval_category ON enxoval_items(category, sort_order);
```

Template fica em TypeScript (`src/data/enxovalTemplate.ts`). Na 1ª abertura, popula a tabela. Edits subsequentes ficam só no banco. Itens personalizados convivem na mesma tabela com `is_custom = 1`.

---

## 5. Escopo da Sessão E-1 (proposto)

### Trilha A — Persistência e dados
- `src/db/index.ts`: migration v8 (tabela `enxoval_items` + index)
- `src/data/enxovalTemplate.ts`: expandir UR-S5 (30 → ~120 itens, 7 categorias)
- `src/db/enxovalRepo.ts` (novo): CRUD + queries (filtrar por categoria, marcar comprado, ajustar qty, criar custom, listar pendentes)

### Trilha B — UI nova
- `app/nursery.tsx`: refator — consumir do repo, renderizar 7 categorias, suporte a `?mode=shopping`
- `src/components/enxoval/EnxovalItemRow.tsx`: linha com checkbox + qty stepper (-/+) + chip de prioridade + botão estrela
- `src/components/enxoval/EnxovalFilters.tsx`: barra de chips (Todos | Comprados | Pendentes | Essenciais)
- `src/components/enxoval/EnxovalAddSheet.tsx`: BottomSheet para adicionar item personalizado
- `src/components/enxoval/EnxovalSugestaoBanner.tsx`: banner discreto por fase IG
- `src/components/enxoval/EnxovalFirstRunSheet.tsx`: pergunta única "primeira gravidez?" na 1ª abertura

### Trilha C — Compartilhar (MVP)
- Instalar `react-native-view-shot` + `expo-sharing` (já existe? checar)
- Capturar screenshot da lista → compartilhar imagem
- Botão "Compartilhar" no header

### Fora de escopo (E-2 / futuro)
- Compartilhar como PDF, link público, lista para chá de bebê
- Motor de sugestões com regras complexas
- Marketplace, comparação de preço, gamificação
- IA, rede social, integração com lojas

---

## 6. Arquivos críticos

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\app\`
  📄 **nursery.tsx** — refator completo (consumir do repo + filtros + modo loja)

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\src\data\`
  📄 **enxovalTemplate.ts** — UR-S5 cria com 30 itens; E-1 expande para ~120

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\src\db\`
  📄 **index.ts** — migration v8
  📄 **enxovalRepo.ts** — novo

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\src\components\enxoval\`
  📄 **EnxovalItemRow.tsx** — novo
  📄 **EnxovalFilters.tsx** — novo
  📄 **EnxovalAddSheet.tsx** — novo
  📄 **EnxovalSugestaoBanner.tsx** — novo
  📄 **EnxovalFirstRunSheet.tsx** — novo

---

## 7. Critério de "pronto" da Sessão E-1

- ✅ Migration v8 aplicada, tabela `enxoval_items` populada pelo template na 1ª abertura
- ✅ 7 categorias visíveis, ~120 itens default distribuídos
- ✅ Ajuste de quantidade funciona (-/+) e persiste
- ✅ Marcar como comprado funciona e persiste
- ✅ Adicionar item personalizado funciona (BottomSheet → repo)
- ✅ Filtros operacionais (Todos | Comprados | Pendentes | Essenciais)
- ✅ Modo loja acessível via `?mode=shopping`
- ✅ Compartilhar imagem da lista funciona em Android
- ✅ Banner de sugestão por fase IG aparece no topo
- ✅ Pergunta "primeira gravidez?" aparece 1x na 1ª abertura, decisão persiste
- ✅ typecheck sem erros novos
- ✅ Testado no Redmi Note 9 (FX-2 — safe-area + maxFontSizeMultiplier)

---

## 8. Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Migration v8 quebrar usuárias com app já instalado | `CREATE TABLE IF NOT EXISTS` + popular só quando tabela vazia |
| Template de 120 itens demora pra revisar | Distribuir geração: usuário aprova categoria por categoria, ou usar Manus IA com prompt validado |
| `react-native-view-shot` pode dar problema no Expo Go | Já é compatível com Expo SDK atual; validar no APK preview EAS antes |
| Refator do `nursery.tsx` quebrar UI atual | Manter contrato de props/categorias; QA visual antes do commit |
| Pergunta "primeira gravidez?" parecer intrusiva | Aparecer 1x só, dispensável; gravar resposta no `user_profile` (coluna nova v9 ou reusar `firstChild` existente — já existe!) |

**Nota:** `user_profile.firstChild` já existe (migration v2). Reusar — não criar coluna nova.

---

## 9. Estimativa

- **Trilha A:** 1 sub-sessão (~2-3h focadas, modelo Sonnet)
- **Trilha B:** 1 sub-sessão grande (~3-4h, Sonnet com checkpoints)
- **Trilha C:** 1 sub-sessão curta (~1h)
- **Template ~120 itens:** revisão à parte com Manus IA (geração + revisão humana)

**Total: ~1 sessão completa de execução + 1 sessão de template.**

---

## 10. Quando iniciar

**Após G-7 publicação (01/jun).** Nova primeira sessão da Onda 2.

Sequência do roadmap atualizada:

1. **Onda 1 (pré-G-7):** UR-S1 → UR-S2 → UR-S3 → UR-S5 (mínimo) → UR-S6 → UR-S4 (último)
2. **G-7 (01/jun):** publicação Play Store
3. **Onda 2 (pós-G-7):** **E-1 (esta spec)** → restante Ondas 2/3 do user research

---

## Referências

- Conceito original do usuário: mensagem `/gestor` em 2026-05-21
- Estado atual da tela: `app/nursery.tsx` (auditado nesta sessão)
- Schema atual SQLite: `src/db/index.ts` (migrations v1-v7)
- Plano UR-01 (Onda 1): `C:\Users\USUARIO\.claude\plans\ok-atualize-o-plano-whimsical-hedgehog.md`
