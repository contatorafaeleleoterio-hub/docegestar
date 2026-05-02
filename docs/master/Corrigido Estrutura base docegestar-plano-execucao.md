# DoceGestar — Plano de Execução
## Aplicação das Sugestões Técnicas (Semana 16 como modelo)

---

## Fase 1 — Tipagem & Estrutura de Dados
**Arquivo:** `src/types/index.ts`

### Tarefa 1.1 — DT-006: Adicionar novos tipos ao `WeekContent`
Incluir os campos opcionais na interface existente:

```typescript
warningSignals?: WarningSigns[]
dailyFocus?: DailyFocus[]
mythBuster?: MythBuster
maternalChanges?: string[]
weeklyChecklist?: string[]
```

> Manter opcionais (`?`) no MVP. Para a versão final, avaliar tornar `dailyFocus` obrigatório para evitar "buracos" de conteúdo na UI.

**Tags:** TypeScript

---

### Tarefa 1.2 — Normalizar campo `sizeCm`
Refatorar de `sizeCm: string` para objeto estruturado:

```typescript
size: {
  value: number      // ex: 11.6
  unit: 'cm' | 'mm'
  display: string    // ex: '~11,6 cm'
}
```

> Habilita gráficos e barras de progresso futuras sem quebra de dados existentes. Usar a Semana 16 como piloto antes de escalar para as 40 semanas.

**Tags:** TypeScript, Escalabilidade

---

## Fase 2 — Dados Semana 16 (+ validação médica)
**Arquivo:** `src/data/weeks/weeks-14-27.ts`

### Tarefa 2.1 — Inserir objeto completo da Semana 16
Preencher todos os campos enriquecidos com os dados mapeados no documento de arquitetura:

- `maternalChanges` — 5 mudanças no corpo da mãe
- `warningSignals` — 6 sinais de alerta (5 urgent + 1 monitor)
- `dailyFocus` — 7 focos diários (dias 1 a 7)
- `weeklyChecklist` — 8 itens práticos
- `mythBuster` — mito "comer por dois"

**Tags:** Conteúdo

---

### Tarefa 2.2 — DT-007: Padronizar fonte médica de referência
- Definir **Mayo Clinic** ou **MSD Manuals** como padrão-ouro para todos os dados clínicos
- Corrigir frequência cardíaca da Semana 16: app atual registra 140–160 bpm; fonte correta é **150–180 bpm**
- Auditar as demais semanas em busca de divergências similares

> Divergências em dados médicos afetam diretamente a credibilidade do app. Resolver antes da publicação da semana, não depois.

**Tags:** Débito técnico, Correção

---

## Fase 3 — Lógica de Negócio (helpers)
**Arquivo:** `src/data/index.ts`

### Tarefa 3.1 — DT-008: Implementar `getCurrentDayInWeek(dueDateISO)`

Fórmula segura:

```typescript
const dayIndex = totalDaysElapsed % 7
// 0 = primeiro dia da semana gestacional
// 6 = último dia
```

O conteúdo muda exatamente à meia-noite, criando sensação de "app vivo" — aumenta retenção (stickiness) no MVP.

**Tags:** TypeScript, Lógica

---

### Tarefa 3.2 — Escrever testes unitários para o helper
Cobrir os seguintes casos limite:

- Dia 0 (início da semana gestacional)
- Semana exata (`totalDaysElapsed % 7 === 0`)
- DPP no passado (gestação já encerrada)
- Data inválida ou ausente

> Garantir que o conteúdo exibido bate com o dia gestacional correto antes de subir para produção.

**Tags:** Testes

---

## Fase 4 — UI: WeekCard.tsx (módulos novos)
**Arquivo:** `src/components/WeekCard.tsx`

### Tarefa 4.1 — Módulo 4: Sinais de alerta colapsáveis (`warningSignals`)

Seção colapsável dentro do módulo de Sintomas:

```
⚠️ Quando ir ao médico imediatamente:
┌─────────────────────────────────────────┐
│ 🔴 Sangramento vaginal                  │
│ 🔴 Dor de cabeça intensa               │
└─────────────────────────────────────────┘
```

- Itens `severity: 'urgent'` → fundo levemente avermelhado + borda persistente
- Itens `severity: 'monitor'` → destaque mais suave
- Tratar como elemento crítico de segurança — maior contraste visual da semana

**Tags:** UX crítico

---

### Tarefa 4.2 — Módulo 11: Foco de Hoje (`dailyFocus`)

Novo módulo posicionado entre o Módulo 10 (Curiosidades) e o Disclaimer:

```
MÓDULO 11: FOCO DE HOJE
┌───────────────────────────────────────────────┐
│  💧 Hoje (Dia 3): Ferro no prato              │
│  ─────────────────────────────────────────    │
│  Inclua uma refeição rica em ferro hoje...    │
└───────────────────────────────────────────────┘
```

Lógica de seleção:
```typescript
const dayIndex = getCurrentDayInWeek(dueDateISO)
const focus = weekContent.dailyFocus?.[dayIndex]
```

> **Atenção QA:** validar layout em telas pequenas antes do deploy (ver Tarefa 4.5).

**Tags:** UX

---

### Tarefa 4.3 — Módulo 5: Checklist semanal persistente (`weeklyChecklist`)

- Reutilizar a tabela `care_checks` existente no SQLite
- Prefixo de chave distinto: `checklist_semanaX_itemN`
- **Nenhuma migração de banco necessária**
- Estado check/uncheck persiste entre sessões — dá ao usuário sensação de controle e progresso

**Tags:** UX, SQLite

---

### Tarefa 4.4 — Módulo 10: Mito da Semana (`mythBuster`)

Adicionar ao bloco de Curiosidades:

```
🔍 MITO DA SEMANA
┌─────────────────────────────────────────┐
│ ❌ "Preciso comer por dois"             │
│ ✅ Na verdade: apenas ~300 kcal a mais  │
└─────────────────────────────────────────┘
```

> Conteúdo ideal para compartilhamento no WhatsApp — potencial de crescimento orgânico no MVP.

**Tags:** UX

---

### Tarefa 4.5 — QA de layout em telas pequenas ⚡

Validar o Módulo 11 nos seguintes dispositivos prioritários:

| Dispositivo | Largura |
|---|---|
| iPhone SE (3ª geração) | 375px |
| Android compacto (ex: Moto G) | 360px |

Os `tips` do `dailyFocus` têm entre 80–120 caracteres. Em telas estreitas podem causar overflow ou forçar scroll indesejado dentro do card.

> Este é o teste mais crítico antes do deploy do Módulo 11.

**Tags:** QA, Testes

---

## Resumo de Débitos Técnicos

| ID | Descrição | Fase |
|---|---|---|
| DT-006 | Adicionar campos novos ao `WeekContent` em `src/types/index.ts` | 1 |
| DT-007 | Corrigir divergência de batimentos cardíacos e padronizar fonte médica | 2 |
| DT-008 | Implementar helper `getCurrentDayInWeek(dueDateISO)` em `src/data/index.ts` | 3 |

---

## Observações Finais

- **Arquitetura de dados estáticos** em arquivos `.ts` é a escolha correta para este estágio: elimina latência de API, permite funcionamento 100% offline e facilita code review do conteúdo médico antes do deploy.
- **Nenhuma tabela nova** no banco de dados é necessária para implementar todos os campos desta fase.
- **Ordem das fases é sequencial:** Fase 1 desbloqueia Fase 2, Fase 3 desbloqueia Fase 4. Não pule etapas.
