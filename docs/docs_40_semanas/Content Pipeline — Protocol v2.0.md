# DoceGestar Content Pipeline — Protocol v2.0

## Princípios do sistema

* Execução determinística (1 tarefa por sessão)
* Zero acúmulo de contexto entre sessões
* Geração com validação e revisão obrigatórias
* Nenhuma tarefa é considerada concluída sem passar por validação + revisão
* Sistema tolerante a erro (retry explícito)

---

## Instruções para o agente

1. Ler este arquivo
2. Encontrar a primeira tarefa marcada [ ]
3. Executar APENAS essa tarefa
4. Seguir exatamente os READ/WRITE definidos
5. Executar validações obrigatórias (se existirem)
6. Se falhar → NÃO marcar como concluído
7. Se sucesso → marcar [x]
8. Parar e reportar resultado

🚫 Proibido:

* Executar mais de uma tarefa
* Ignorar falhas de validação
* Alterar estrutura de arquivos fora da tarefa

---

# FASE 0 — Infraestrutura (Setup único)

* [x] P0.1 — Criar estrutura de pastas
* [x] P0.2 — Criar data/TEMPLATE.md
* [x] P0.3 — Criar data/TEMPLATE_SEMANTIC.md
* [x] P0.4 — Criar data/DATA.json (expandido — 40 semanas)
* [x] P0.5 — Criar scripts/validate.js
* [x] P0.6 — Criar scripts/semantic_review.js
* [x] P0.7 — Criar scripts/normalize.js
* [x] P0.8 — Criar scripts/score.js
* [x] P0.9 — Criar estrutura de logs em /log/

---

# FASE 1 — Referência

* [ ] P1.0 — [MANUAL] Criar reference/semana_01.md
  REGRA: seguir TEMPLATE.md + TEMPLATE_SEMANTIC.md
  AÇÃO: humano cria e valida manualmente

* [ ] P1.1 — Validar referência
  READ: reference/semana_01.md
  RUN: node scripts/validate.js --semana=1

* [ ] P1.2 — Revisão semântica da referência
  READ: reference/semana_01.md
  RUN: node scripts/semantic_review.js --semana=1

---

# FASE 2 — Geração com loop de qualidade

## Template de execução por semana

### Etapa A — Geração

* [ ] P2.02.A — Gerar semana_02
  READ:  data/DATA.json (week: 2)
  READ:  data/TEMPLATE.md
  READ:  data/TEMPLATE_SEMANTIC.md
  READ:  reference/semana_01.md
  WRITE: weeks/semana_02.raw.md

---

### Etapa B — Validação estrutural

* [ ] P2.02.B — Validar estrutura semana_02
  RUN: node scripts/validate.js --semana=2 --input=raw

  ```
    SE FALHAR:
    → ir para P2.02.R (retry)
  ```

---

### Etapa C — Revisão semântica (IA)

* [ ] P2.02.C — Revisar conteúdo semana_02
  READ: weeks/semana_02.raw.md
  RUN: node scripts/semantic_review.js --semana=2

  ```
    OUTPUT:
    → weeks/semana_02.review.md

    SE FALHAR:
    → ir para P2.02.R
  ```

---

### Etapa D — Correção automática

* [ ] P2.02.D — Aplicar correções
  READ: weeks/semana_02.review.md
  WRITE: weeks/semana_02.final.md

---

### Etapa E — Score de qualidade

* [ ] P2.02.E — Gerar score
  RUN: node scripts/score.js --semana=2

  ```
    CRITÉRIO:
    score >= 85 → aprovado
    score < 85 → retry
  ```

---

### Etapa F — Finalização

* [ ] P2.02.F — Finalizar semana_02
  MOVE: weeks/semana_02.final.md → weeks/semana_02.md
  LOG: salvar resultado em log/pipeline.log

---

### Etapa R — Retry automático

* [ ] P2.02.R — Regerar semana_02
  REGRA:
  - Ajustar geração com base no erro anterior
  - Máximo 3 tentativas

  ```
    SE exceder:
    → marcar como ERRO CRÍTICO
    → registrar no log
    → pausar pipeline
  ```

---

## Repetir padrão até semana 40

* [ ] P2.03.A → P2.03.F — semana_03
* [ ] P2.04.A → P2.04.F — semana_04
  ...
* [ ] P2.40.A → P2.40.F — semana_40

---

# FASE 3 — Validação global

* [ ] P3.01 — Validar todas as semanas
  RUN:
  for i in $(seq 1 40); do node scripts/validate.js --semana=$i; done

---

# FASE 4 — Revisão global

* [ ] P4.01 — Revisão semântica completa
  RUN:
  for i in $(seq 1 40); do node scripts/semantic_review.js --semana=$i; done

---

# FASE 5 — Normalização

* [ ] P5.01 — Converter para JSON
  RUN:
  for i in $(seq 1 40); do node scripts/normalize.js --semana=$i; done

---

# FASE 6 — Score global

* [ ] P6.01 — Avaliar qualidade geral
  RUN:
  for i in $(seq 1 40); do node scripts/score.js --semana=$i; done

  ```
    OUTPUT:
    média geral do conteúdo
    semanas abaixo do threshold
  ```

---

# FASE 7 — Imagens (semi-automatizado)

* [ ] P7.01 — Gerar prompts de imagem
  READ: weeks/*.md
  WRITE: output/image_prompts.json

* [ ] P7.02 — Gerar imagens (externo)
  INPUT: prompts
  OUTPUT: /assets/images/

---

# LOGGING

Toda tarefa deve registrar:

* timestamp
* tarefa executada
* status (success | fail)
* score (se aplicável)
* tentativa (retry count)

Arquivo:
log/pipeline.log

---

# DEFINIÇÕES DE SUCESSO

Uma semana só é considerada pronta quando:

✔ passou validação estrutural
✔ passou revisão semântica
✔ score >= 85
✔ salva como .md final
✔ registrada no log

---

# DEFINIÇÕES DE FALHA

Uma semana falha quando:

✖ falha em validação
✖ falha em revisão
✖ score < 85 após 3 tentativas

Ação:
→ parar pipeline
→ exigir intervenção manual

---

# RESUMO DO FLUXO

gerar → validar → revisar → corrigir → pontuar → salvar → logar

---

# PRÓXIMA AÇÃO

→ Executar próxima tarefa [ ] da FASE 1 ou FASE 2
→ Nunca pular etapas
→ Nunca acumular tarefas

Este arquivo é a única fonte de verdade do estado do pipeline.
