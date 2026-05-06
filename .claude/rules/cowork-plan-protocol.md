---
paths:
  - "docs/plans/**"
---

# Cowork Plan Protocol — Model Selection & Token Optimization

## Regra Obrigatória

**Todo plano de execução para cowork DEVE incluir, ao final de cada etapa, uma recomendação de modelo.**

Esta recomendação é obrigatória para qualquer documento criado em `docs/plans/` que contenha etapas/tarefas para agentes.

---

## Critérios de Seleção de Modelo

### claude-haiku-4-5-20251001 — Rápido e econômico
**Usar quando a tarefa é:**
- Mecânica e repetitiva (copiar padrão, transformar dados)
- Geração de tipos TypeScript simples
- Adaptadores/mappers de dados (A → B sem lógica complexa)
- Geração de conteúdo em lote (texto, JSON estruturado seguindo template)
- Edições cirúrgicas em arquivos conhecidos
- Criação de arquivos de dados (`.ts` com exports estáticos)
- Formatação, lint fixes, rename de variáveis

**NÃO usar quando:**
- Há decisões de arquitetura
- O componente tem múltiplos estados e lógica condicional
- É necessário navegar e entender múltiplos arquivos simultaneamente

---

### claude-sonnet-4-6 — Padrão para desenvolvimento
**Usar quando a tarefa é:**
- Criação de componentes React Native com lógica moderada
- Hooks com side effects e estado complexo
- Screens completas com múltiplos estados (loading, empty, error, data)
- Integração entre camadas (dados → componente → tela)
- Debugging de erros de runtime
- Refatoração de módulos com dependências

**É o modelo padrão para a maioria das stories de desenvolvimento.**

---

### claude-opus-4-7 — Máxima capacidade
**Usar quando a tarefa é:**
- Decisões de arquitetura com trade-offs complexos
- Refatoração de múltiplos arquivos interdependentes
- Debugging de bugs sutis com causa não óbvia
- Design de sistema (novos domínios, novos padrões)
- Revisão crítica de segurança ou performance
- Tarefas com requisitos ambíguos que precisam de raciocínio extenso

**Reservar para tarefas onde Sonnet produz resultados insatisfatórios.**

---

## Formato Obrigatório no Plano

Cada etapa de um plano cowork deve terminar com:

```markdown
**Modelo recomendado:** `claude-haiku-4-5` | `claude-sonnet-4-6` | `claude-opus-4-7`
**Justificativa:** [1 linha explicando o critério aplicado]
**Tokens estimados:** Baixo (~2K) | Médio (~8K) | Alto (~20K+)
```

---

## Tabela de Referência Rápida

| Tipo de tarefa | Modelo | Custo relativo |
|---------------|--------|---------------|
| Gerar tipos TypeScript | Haiku | 💚 Baixo |
| Mapper/adaptador de dados | Haiku | 💚 Baixo |
| Geração de conteúdo em template | Haiku | 💚 Baixo |
| Componente UI simples (sem estado) | Haiku | 💚 Baixo |
| Componente UI com estado + async | Sonnet | 💛 Médio |
| Screen completa com hooks | Sonnet | 💛 Médio |
| Integração entre módulos | Sonnet | 💛 Médio |
| Debug de erro complexo | Sonnet | 💛 Médio |
| Arquitetura de novo sistema | Opus | 🔴 Alto |
| Refatoração multi-arquivo | Opus | 🔴 Alto |
| Revisão de segurança/performance | Opus | 🔴 Alto |

---

## Estratégia de Economia

1. **Haiku primeiro:** Para tarefas mecânicas, sempre tentar Haiku primeiro. Se o resultado for insatisfatório, escalar para Sonnet.
2. **Sonnet como padrão:** Para desenvolvimento geral, Sonnet é o ponto de equilíbrio custo-qualidade.
3. **Opus sob demanda:** Nunca usar Opus por padrão — apenas quando explicitamente necessário.
4. **Dividir tarefas grandes:** Uma tarefa Opus pode ser dividida em subtarefas menores executadas em Haiku/Sonnet.
5. **Prompts enxutos:** Contexto menor = menos tokens. Incluir apenas o necessário no prompt de cada etapa.
