# SESSION_HANDOFF — DoceGestar | 2026-05-19

## Story Ativa
- **ID:** C-25..40 (Content Track — conteúdo editorial das 40 semanas)
- **Título:** Reference docs das semanas 25 a 40 via Manus IA
- **Status:** ⏳ Próxima sessão
- **Pasta:** `docs/docs_40_semanas/reference/`
- **Prompt:** `docs/docs_40_semanas/PROMPT-MANUS-v2.md`

## ⏭️ PRÓXIMA AÇÃO AO RETOMAR (/gestor)
Continuar C-25..40. Pedir ao Manus IA a **semana 25** usando o `PROMPT-MANUS-v2.md`
(trocar `[XX]` por 25 + anexar `semana_10.md` como modelo). Verificar (estrutura
15 cards, dados, antirrepetição) e salvar em `reference/semana_25.md`. Repetir até
a semana 40 (16 semanas restantes).
Depois: implementar todas as semanas em `src/data/weeks/*.ts` (lote único).

## O que foi feito (sessão 2026-05-19 — Content C-11..24)
- Criados 2 prompts de extração: `PROMPT-MANUS-extracao-semanas-faltantes.md` (v1) e `PROMPT-MANUS-v2.md` (v2 sintetizado, com regras antirrepetição)
- 13 reference docs gerados pelo Manus IA, verificados e salvos: `semana_11.md`–`semana_17.md` e `semana_19.md`–`semana_24.md`
- Correções aplicadas onde houve repetição/erro (S14, S15, S16); demais só ajustes menores

## Decisões desta sessão
- **Previews HTML descontinuados** — só reference docs daqui em diante
- Conteúdo gerado pelo Manus IA, 1 semana por vez, com o prompt v2
- Implementação no TypeScript fica para o final, em lote único

## Estado do Content Track
- Reference docs concluídos: **S01–S24** (todas)
- Reference docs pendentes: **S25–S40** (16 semanas)
- Implementadas em `src/data/weeks/*.ts`: S01–S06 e S18 (restante = lote final)

## Lançamento G-7 — Agendado 2026-06-01
Em/após 2026-06-01, a cota EAS Free renova e o lançamento acontece:
1. `eas build --platform android --profile production` (AAB)
2. `eas submit --platform android`
O `.easignore` já está ativo (protege de 71 MB de backup em `_fruits-originais-backup/`).

## Estado do código
- Último commit: `f6a1188` — Painel Início Proposta B (93 arquivos)
- typecheck: 15 erros (0 novos sobre baseline)
- Push feito: github.com/contatorafaeleleoterio-hub/docegestar
- **Nota:** os reference docs desta sessão NÃO foram commitados (sem instrução do usuário)
