# Sintomas 2.0 — Plano de Implementação (Completo: Núcleo + Plus)

> Sessão GESTOR de pesquisa+proposta (2026-05-23). Escopo aprovado pelo usuário: **Completo**.
> Origem: reformular a função de Sintomas para uso **diário**, com registro nos 7 dias
> da semana, clareza de qual período foi mais forte, e relatório para o médico.
> **Status: aguardando green light para implementar.**

## 1. Objetivo

Transformar a tela de Sintomas (hoje: liga/desliga por semana) numa ferramenta de uso
diário, prática e acolhedora, que:
- registra sintomas **dia a dia** com **intensidade** (Leve/Moderado/Forte);
- mostra **qual dia/período da semana** os sintomas foram mais fortes;
- gera um **relatório compartilhável** para levar à consulta.

Princípio-guia (validado por pesquisa — estudo npj/Nature, 1,5M sintomas): **79% das
usuárias registram só uma vez**. Fricção mata o hábito → tudo tem que ser de **1 toque**.

## 2. Estado atual (o que existe)

| Arquivo | Hoje |
|---------|------|
| `app/symptoms.tsx` | Checkbox liga/desliga dos sintomas da semana + gráfico de *contagem* nas últimas 4 semanas + "sintoma mais frequente" |
| `src/hooks/useSymptomChecks.ts` | CRUD do boolean por semana |
| `src/data/shared/symptoms.ts` | Banco de sintomas por trimestre (T1/T2/T3) — **reaproveitado** |
| `src/db/schema.ts` / `index.ts` | Tabela `symptom_checks (week, symptom_key, checked)` — sem data, sem intensidade |

Limitações: sem dia, sem intensidade, sem nota, sem relatório.

## 3. Modelo de dados — Migration v10

Nova tabela (não migrar a antiga — `symptom_checks` não tem data nem intensidade;
fica intocada para não quebrar; o recurso novo começa limpo em `symptom_logs`).

```sql
-- v10: registro diário de sintomas com intensidade
CREATE TABLE IF NOT EXISTS symptom_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  log_date TEXT NOT NULL,                -- 'YYYY-MM-DD' (dia)
  week INTEGER NOT NULL,                 -- semana gestacional (denormalizada p/ query rápida)
  symptom_key TEXT NOT NULL,
  intensity TEXT CHECK(intensity IN ('leve','media','forte')),  -- convenção já usada no projeto
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(log_date, symptom_key)
);
CREATE INDEX IF NOT EXISTS idx_symptom_logs_week ON symptom_logs(week);
CREATE INDEX IF NOT EXISTS idx_symptom_logs_date ON symptom_logs(log_date);

-- nota livre por dia (também serve p/ "dia sem sintomas" registrado)
CREATE TABLE IF NOT EXISTS symptom_day_notes (
  log_date TEXT PRIMARY KEY,
  note TEXT,
  no_symptoms INTEGER DEFAULT 0,         -- 1 = usuária marcou "sem sintomas hoje"
  updated_at TEXT DEFAULT (datetime('now'))
);
```

**3 frentes (mesmo padrão das migrations v3–v9):**
1. `src/db/schema.ts` — adicionar os `CREATE TABLE` (instalações nativas limpas).
2. `src/db/index.ts` — bloco `// v10` com `try { await db.runAsync(...) } catch {}` idempotente.
3. `src/db/webStorage.ts` — handlers do shim (SELECT/upsert) espelhando o que já existe
   para `symptom_checks` (linhas ~47, ~148, ~241-246), para persistir na preview web.

## 4. Arquitetura de telas e componentes

**`app/symptoms.tsx` (reescrita):**
1. Header (mantém).
2. Hero "Como você está hoje?" + Semana N.
3. **WeekStrip** — 7 dias da semana atual (Seg→Dom). Cada dia: bolinha com cor = maior
   intensidade do dia (vazio/leve/media/forte). Toca o dia → seleciona (default = hoje).
   Dias futuros desabilitados. **É aqui que se vê qual período foi mais forte.**
4. **Painel do dia selecionado:**
   - Chips dos sintomas comuns da semana (`getWeek(week).symptoms`). Toque **cicla**
     leve→moderado→forte→limpa; cor cresce com a intensidade.
   - "🌸 Sem sintomas hoje" (1 toque) — reforço positivo, grava `no_symptoms=1`.
   - "✏️ Anotar algo" → `DayNoteSheet` (TextInput opcional por dia).
5. **WeeklyInsight** — frase do tipo "Seus sintomas foram mais fortes na quinta e sexta"
   (dia de maior soma de intensidade). [Plus] + acolhimento clínico contextual.
6. **WeeklyIntensityChart** — faixa/heatmap dos 7 dias (Núcleo). [Plus] tendência
   multi-semana.
7. **Botão "Relatório para a consulta"** → `app/symptoms/report.tsx`.

**Componentes novos** (`src/components/symptoms/`):
- `WeekStrip.tsx` · `SymptomChip.tsx` · `DayNoteSheet.tsx` · `WeeklyIntensityChart.tsx`

**Hooks:**
- `useSymptomLogs(week)` (evolui o `useSymptomChecks`):
  `logsByDay`, `setIntensity(date, key, intensity|null)`, `markNoSymptoms(date)`,
  `setDayNote(date, note)`, e derivado `weeklyIntensity` (totais por dia → dia mais forte).
- `useSymptomReport(weeksBack=4)` — agrega para o relatório.

## 5. Relatório para o médico

Tela/sheet `app/symptoms/report.tsx`. Conteúdo:
- Semana gestacional + período coberto (ex.: últimas 4 semanas).
- Por sintoma: nº de dias, **intensidade máxima**, em que semanas/dias ocorreu.
- Top 3 sintomas + tendência (piorando/estável/melhorando).
- Anotações da gestante.
- [Plus] Sinais de alerta sinalizados.

**Compartilhamento:**
- **Núcleo:** imagem via `react-native-view-shot` + `expo-sharing` (mesmas libs já
  previstas no Enxoval — **ainda não instaladas**, viram tarefa explícita).
- **Plus:** PDF via `expo-print`.

## 6. Fases

### Fase 1 — Núcleo (pré-G-7, 01/jun) — ✅ IMPLEMENTADO 2026-05-23 (typecheck 0)
- [x] T1 — Migration v10 só em `index.ts` + shim `webStorage.ts` (seguiu a convenção real v3–v9; `schema.ts` não tocado).
- [x] T2 — `useSymptomLogs`. `useSymptomChecks` **mantido** (não era órfão — `WeekCard.tsx` usa).
- [x] T3 — `WeekStrip` + `SymptomChip` + `DayNoteSheet` em `src/components/symptoms/`.
- [x] T4 — `app/symptoms.tsx` reescrita (faixa 7 dias gestacionais + chips + insight "dia mais forte" + gráfico de intensidade).
- [x] T5 — `useSymptomReport` + `app/symptom-report.tsx`. **Desvio:** compartilha como **TEXTO** (`Share.share`); imagem/PDF (view-shot/expo-sharing/expo-print) movido p/ Plus + EAS.
- [x] T6 — typecheck 0 erros. Validação web = **pendente do usuário**.

### Fase 2 — Plus (pós-G-7)
- [ ] T7 — `src/data/shared/symptomInsights.ts` (mapa semana→acolhimento clínico:
      náusea pico ~sem 8, dor de cabeça ~15-16, azia 32-36, insônia subindo no 3º tri).
      **Copy revisada pela régua editorial.**
- [ ] T8 — Integração sinais de alerta no relatório: se sintoma `forte` ∈
      `getWeek(week).warningSignals`, badge gentil "vale comentar com o médico".
      **Copy da régua, não inventada.**
- [ ] T9 — Tendência de intensidade multi-semana no `WeeklyIntensityChart`.
- [ ] T10 — Relatório PDF (`expo-print`).
- [ ] T11 — (opcional) sensibilidade a perda gestacional / gêmeos — princípio de design.

## 7. Dependências novas
`react-native-view-shot`, `expo-sharing` (Fase 1) · `expo-print` (Fase 2). Validar no
APK preview EAS (view-shot pode variar entre Expo Go e build).

## 8. No Invention / Régua editorial
Toda copy de acolhimento clínico (T7) e de alerta (T8) sai da régua canônica
`docs/user-research/2026-05-20-regua-editorial-avisos-gestacao.md` + fontes
FEBRASGO/MS/ACOG. Padrões de timing vêm do estudo npj/Nature (PMC10567694). **Proibido
inventar texto médico.**

## 9. Riscos
| Risco | Mitigação |
|-------|-----------|
| `view-shot` no Expo Go | Validar no APK EAS antes do G-7; senão, relatório só texto via `Share.share` |
| Fricção (lição dos 79%) | Tudo 1 toque; abre no "hoje"; "sem sintomas" positivo |
| Escopo vs G-7 | Núcleo cobre 100% do pedido; Plus só pós-lançamento |
| Fuso/data local | Usar data local `YYYY-MM-DD` consistente (helper único) |

## 10. Critérios de aceite (Núcleo)
- Registrar intensidade de um sintoma num dia específico e persistir (web + nativo).
- WeekStrip mostra os 7 dias com cor por intensidade; toca dia passado/hoje, futuro bloqueado.
- "Sem sintomas hoje" e nota por dia funcionam.
- Insight aponta corretamente o dia de maior intensidade da semana.
- Relatório gera resumo correto e compartilha como imagem.
- typecheck: 0 erros novos sobre o baseline.
