# UI-2 — Implementação das Imagens de Fruta (próxima sessão)

**Status:** 39 imagens criadas via Manus IA (2026-05-17), salvas em
`assets/fruits/` — `celula.png` + `fruta-03.png` … `fruta-40.png`.
Formato atual: PNG 1248×1248, RGBA com transparência. ✅

---

## ⚠️ QUESTÕES CRÍTICAS — resolver ANTES de implementar

### CRÍTICO 1 — Peso das imagens (otimização obrigatória)
As 39 imagens estão **cruas do Manus**: ~1,7–2,5 MB cada, **~74 MB no total**.
Empacotar assim **infla o APK em ~70 MB** — inaceitável para a Play Store.

**Ação:** otimizar antes de usar — redimensionar para **512×512 px** + compressão
PNG. Alvo: **< 60 KB por imagem** (~2 MB no total). Pode-se usar `sharp`
(já instalado) num script de lote. Manter os originais 1248px arquivados fora
de `assets/` se quiser um master.

### CRÍTICO 2 — Documentos com frutas substituídas / dados atualizados
A lista de comparações foi corrigida (JSON validado, 2026-05-17). **7 frutas
trocaram** e os dados de tamanho/peso mudaram em várias semanas. Já atualizado:
`src/data/weeks/weeks-01-13.ts`, `weeks-14-27.ts`, `weeks-28-40.ts`. ✅

Frutas substituídas (semana → nova fruta):
S11 Figo · S25 Abobrinha · S27 Couve-flor · S29 Abóbora-cabotiá ·
S32 Brócolis · S36 Alface-romana · S39 Melancia · S40 Abóbora moranga

**Documentos/código que CONSOMEM esses dados — revisar na implementação:**

| Arquivo | O que usa | Ação necessária |
|---------|-----------|-----------------|
| `app/(tabs)/dashboard.tsx:146` | `DGIcon name="flower"` fixo + `comparison`/`sizeCm`/`weightG` | Trocar ícone fixo pela imagem da fruta da semana |
| `app/(tabs)/bebe.tsx:107` | `DGIcon name="pregnant"` no anel central + badges sizeCm/weightG | Avaliar trocar pelo PNG da fruta da semana |
| `src/components/WeekCard.tsx:281-294` | `sizeCm`, `weightG`, `comparison` (texto) | Avaliar adicionar a imagem; ver CRÍTICO 3 |
| `src/utils/revistaAdapter.ts:42-43` | `sizeCm` + `comparison` no feed da Revista | Texto puxa do data — OK automático; só conferir visual |
| `src/types/index.ts:19` | Comentário `// ex: "Ameixa" \| "—"` | Comentário desatualizado — atualizar |

**Conteúdo editorial das 40 semanas** (`docs/docs_40_semanas/`, `landing/revista/`):
não foram verificados linha a linha. Se algum texto de semana cita a fruta em
prosa (ex: "do tamanho de um limão"), revisar as semanas substituídas
(11, 25, 27, 29, 32, 36, 39, 40). Grep por nomes antigos no código-fonte = limpo.

### CRÍTICO 3 — Sentinela `'—'` mudou de comportamento
Antes, semanas 1–5 tinham `comparison`/`sizeCm` = `'—'`. Agora têm valores reais
("Aglomerado de células", "Microscópico"). Código que testa `=== '—'`:
- `WeekCard.tsx:293` — `comparison !== '—'` → agora **mostra** "Aglomerado de
  células" nas semanas 1–2 (antes ocultava). Verificar se é o desejado.
- `heartbeatBpm` segue `'—'` nas semanas iniciais — esse guard não muda.

---

## Passos de implementação

### Passo 1 — Otimizar as imagens
Redimensionar as 39 PNGs para 512×512 + comprimir (alvo < 60 KB). Script `sharp`.
**Modelo recomendado:** `claude-haiku-4-5` · Justificativa: tarefa mecânica de
processamento de arquivos. · Tokens: Baixo (~2K).

### Passo 2 — Mapa semana → imagem
Criar `src/data/fruitImages.ts` com um mapa `require()` estático:
semanas 1–2 → `celula.png`; semanas 3–40 → `fruta-NN.png`. Expor helper
`getFruitImage(weekNumber)`.
**Modelo recomendado:** `claude-haiku-4-5` · Justificativa: arquivo de dados
estático, sem lógica. · Tokens: Baixo (~3K).

### Passo 3 — Ligar o dashboard (Painel Início)
`dashboard.tsx:146` — trocar `<DGIcon name="flower">` por `<Image>` com
`getFruitImage(currentWeek)`, `resizeMode="contain"`, dentro do `babyIcon`.
**Modelo recomendado:** `claude-sonnet-4-6` · Justificativa: edição em tela com
layout/estados. · Tokens: Médio (~6K).

### Passo 4 — Ligar a tela Bebê (opcional, validar com usuário)
`bebe.tsx:107` — avaliar trocar `<DGIcon name="pregnant">` pelo PNG da fruta no
anel de progresso central.
**Modelo recomendado:** `claude-sonnet-4-6` · Justificativa: mudança visual com
SVG/layout ao redor. · Tokens: Médio (~6K).

### Passo 5 — Verificar e validar
typecheck (0 erros novos), rodar o app, conferir Painel Início e tela Bebê na
semana atual e em semanas-extremo (1, 10, 40).

---

## Observações
- O ícone `flower` continua usado legitimamente em `birth-plan.tsx` e
  `perfil.tsx` (plano de parto) — **não** mexer nesses.
- `scripts/gerar-frutas.js` ficou obsoleto (era da rota Gemini API) — pode ser
  removido.
- Commit + APK seguem adiados até liberação do usuário.
