# /tarefa-ok — Encerramento de Sessão

Ao executar este comando, faça o seguinte em sequência:

## 1. Coletar o que foi feito nesta sessão

Revise o histórico da conversa atual e identifique:
- Quais bugs/features foram implementados (com IDs: B1, B2, feature X, etc.)
- Quais arquivos foram criados ou modificados
- Qual é a próxima ação imediata (o que vem depois)

## 2. Atualizar SESSION-HANDOFF.md

Arquivo: `docs/SESSION-HANDOFF.md`

Reescreva o documento com:
- **Último update:** data de hoje
- **Sessão:** descrição curta do que foi feito
- **Estado Atual:** tabela com status de cada item (✅ Done / ⏳ Próximo / ⏳ Pendente)
- **PRÓXIMA AÇÃO IMEDIATA:** bloco destacado com o que o próximo agente deve fazer primeiro, incluindo arquivo e linha se relevante
- **Contexto Técnico:** arquivos-chave, commits recentes, stack relevante
- **Bloqueios/Pendências:** o que está pausado e por quê

## 3. Atualizar LAUNCH-TRACK.md

Arquivo: `docs/stories/LAUNCH-TRACK.md`

Na seção correspondente à sessão atual (G-5.5 ou outra ativa):
- Marcar itens concluídos com ✅
- Atualizar tabela de status
- Registrar próxima ação

## 4. Atualizar BUG-TRACK.md (se a sessão envolveu bugs)

Arquivo: `docs/bugs/BUG-TRACK.md`

- Marcar bugs resolvidos como ✅ Done
- Atualizar "Próxima Ação" para o próximo bug da fila

## 5. Atualizar memória do projeto

Arquivo: `C:\Users\USUARIO\.claude\projects\C--Users-USUARIO-Desktop-GESTANTE\memory\project_status.md`

Append na seção da data atual com bullet points do que foi feito e qual é o próximo passo.

## 6. Confirmar ao usuário

Ao terminar, exiba:

```
✅ /tarefa-ok executado
Documentos atualizados:
- docs/SESSION-HANDOFF.md
- docs/stories/LAUNCH-TRACK.md
- docs/bugs/BUG-TRACK.md (se aplicável)
- memory/project_status.md

Próxima sessão começa em: [descreva o próximo passo em 1 linha]
```
