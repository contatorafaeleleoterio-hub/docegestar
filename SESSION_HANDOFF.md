# SESSION_HANDOFF — DoceGestar | 2026-05-23

## Story Ativa
- **ID:** CE-1 (Epic Consultas & Exames)
- **Título:** Painel de Acompanhamento da Gestação — Fundação + Visão Geral + Consultas
- **Status:** Implementado · typecheck **0 erros** · **aguarda validação web** · **sem commit**
- **Decisões travadas:** abas inferiores (4 telas) · CE-1 = Fundação + Visão Geral + Consultas

## O que foi implementado nesta sessão (CE-1)
- **Migration v11** (`src/db/index.ts`): colunas ricas em `prenatal_appointments` (specialty, professional, location, status) + nova tabela `prenatal_exams` (timeline + status) + índice.
- **Shim web** (`src/db/webStorage.ts`): branches CRUD para `prenatal_appointments` e `prenatal_exams` (antes Consultas ficava vazia na web — caía no `return []`).
- **`src/hooks/usePrenatalAppointments.ts`** reescrito: campos ricos + `addAppointment(input)` (assinatura nova, sem callers antigos), `updateAppointment`, `setStatus`, `reschedule`, `reload`, agendamento de notificação no add/update.
- **`src/hooks/usePrenatalExams.ts`** (novo): seed da timeline a partir de `EXAM_SCHEDULE` (`src/data/shared/exams.ts`) na 1ª abertura; read + `updateExam`.
- **Navegação:** `app/_layout.tsx` registra `consultas-exames`; `app/consultas-exames/_layout.tsx` = Tabs com barra flutuante (4 abas).
- **Telas:** `visao-geral.tsx` (próxima consulta com ações, próximo exame, indicadores, barra de progresso semana/trimestre), `consultas.tsx` (CRUD completo: filtros próximas/concluídas/atrasadas, BottomSheet criar/editar com máscaras DD/MM/AAAA + HH:MM, concluir/reabrir, reagendar via edição, excluir), `exames.tsx` (timeline recomendada por trimestre — somente leitura nesta fase), `historico.tsx` (stub).
- **Entry point:** `app/(tabs)/ferramentas.tsx` — cards "Consultas" + "Exames & Laudos" unificados em **"Consultas e Exames"** → `/consultas-exames/visao-geral`.

## O que falta
- **Validação visual na web** (`npm run web`): abrir Ferramentas → Consultas e Exames; criar consulta; testar filtros, concluir, editar/reagendar, excluir; ver Visão Geral atualizar; conferir timeline de exames.
- **Commit** (via @devops) após aprovação: `feat(ce1): painel consultas e exames — fundação + visão geral + consultas`.
- Telas antigas `app/appointments.tsx` e `app/exams.tsx` ficaram **órfãs** (deslinkadas de Ferramentas, ainda registradas no Stack) — remover na limpeza do CE-2.

## Próxima ação ao retomar
1. Usuário valida CE-1 na web → ajustes apontados.
2. Commit via @devops.
3. **CE-2** — aba Exames completa (agendar, marcar realizado, filtros pendentes/realizados) + reforço da timeline gestacional.

## Arquivos tocados
| Arquivo | Status |
|---------|--------|
| src/db/index.ts | ✅ v11 migration |
| src/db/webStorage.ts | ✅ shim consultas + exames |
| src/hooks/usePrenatalAppointments.ts | ✅ reescrito (rico + update/status/reschedule) |
| src/hooks/usePrenatalExams.ts | ✅ novo (seed timeline) |
| app/_layout.tsx | ✅ rota consultas-exames |
| app/consultas-exames/_layout.tsx | ✅ novo (Tabs) |
| app/consultas-exames/visao-geral.tsx | ✅ novo |
| app/consultas-exames/consultas.tsx | ✅ novo (CRUD) |
| app/consultas-exames/exames.tsx | ✅ novo (read-only) |
| app/consultas-exames/historico.tsx | ✅ novo (stub) |
| app/(tabs)/ferramentas.tsx | ✅ entry unificado |

## Decisões desta sessão
- Reuso de `EXAM_SCHEDULE` (`src/data/shared/exams.ts`) como seed da timeline — não inventar exames.
- `status` de consulta = `agendada`/`concluida`; "atrasada" é derivado (agendada + data passada), não armazenado.
- Upload de resultados (PDF/foto) = **CE-4 pós-G-7** (exige expo-document-picker/image-picker → EAS rebuild; cota Free bloqueada até 2026-06-01).
- Recarga em foco (`useFocusEffect`) na Visão Geral e Consultas para refletir mudanças entre abas.
- Sem commit (sem instrução).
