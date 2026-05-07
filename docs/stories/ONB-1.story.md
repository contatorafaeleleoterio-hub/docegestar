# Story ONB-1 — Migration + Schema: relationship, plan, plan_expires_at

**Status:** Done
**Epic:** Onboarding v2.1
**Estimate:** 2 pts
**Created:** 2026-05-07
**Author:** @sm (River)

## Description

Adicionar três colunas à tabela `user_profile` e criar a tabela de controle de migrations
(`migrations`) para garantir que todas as alterações de schema sejam idempotentes.
Esta story é a fundação de todas as telas do Onboarding v2.1 — sem ela, nenhuma tela
consegue persistir `relationship`, `plan` ou `plan_expires_at`.

## Acceptance Criteria

1. **GIVEN** o app sendo iniciado pela primeira vez, **WHEN** `runMigrations()` executar,
   **THEN** a tabela `migrations` é criada e a migration `version = 2` é registrada nela.
2. **GIVEN** o app sendo iniciado uma segunda vez (re-entry), **WHEN** `runMigrations()` executar,
   **THEN** os `ALTER TABLE` são pulados (idempotência via `PRAGMA table_info`) e nenhum erro é lançado.
3. **GIVEN** `PRAGMA table_info(user_profile)`, **THEN** as colunas `relationship`, `plan` e
   `plan_expires_at` existem com seus tipos e constraints corretos:
   - `relationship TEXT CHECK(relationship IN ('mae','parceiro','outro'))`
   - `plan TEXT DEFAULT 'free' CHECK(plan IN ('free','premium'))`
   - `plan_expires_at TEXT` (nullable, sem constraint — validação na camada de aplicação)
4. **GIVEN** um `user_profile` existente sem essas colunas (upgrade de versão anterior),
   **WHEN** a migration executar, **THEN** os dados existentes são preservados e
   as novas colunas recebem seus defaults (`plan = 'free'`, outros = `NULL`).
5. **GIVEN** `npm run typecheck`, **THEN** retorna 0 erros.

## Scope IN

- `src/db/schema.ts`: adicionar tabela `migrations` e lógica de versão dentro de `runMigrations()`
- Adicionar `ALTER TABLE user_profile ADD COLUMN` para `relationship`, `plan`, `plan_expires_at`
- Verificação `PRAGMA table_info` antes de cada `ALTER` para idempotência
- `src/types/index.ts`: atualizar interface `UserProfile` com os 3 novos campos

## Scope OUT

- `src/db/index.ts` — **não alterar**
- `useUserProfile` hook — não alterar nesta story (ONB-5+)
- Qualquer UI, tela ou componente
- Lógica de negócio de `plan` (feature flag, acesso a conteúdo) — pós-launch

## Dependencies

Nenhuma.

## Risks

- ALTER TABLE pode falhar se a coluna já existir em devices com versão parcialmente migrada
  → mitigado por `PRAGMA table_info` antes de cada ALTER (AC2)

## Tasks

- [x] T1: Criar tabela `migrations` em `runMigrations()` dentro de `src/db/schema.ts` (@dev)
- [x] T2: Implementar lógica de versão (SELECT version = 2 → skip se existir) (@dev)
- [x] T3: Adicionar `ALTER TABLE user_profile ADD COLUMN relationship` com PRAGMA guard (@dev)
- [x] T4: Adicionar `ALTER TABLE user_profile ADD COLUMN plan` com PRAGMA guard (@dev)
- [x] T5: Adicionar `ALTER TABLE user_profile ADD COLUMN plan_expires_at` com PRAGMA guard (@dev)
- [x] T6: Atualizar interface `UserProfile` em `src/types/index.ts` (@dev)
- [x] T7: `npm run typecheck` → 0 erros (@qa)

## File List

| Arquivo | Ação |
|---------|------|
| `src/db/schema.ts` | Modificar — adicionar tabela migrations + 3 colunas |
| `src/types/index.ts` | Modificar — atualizar interface UserProfile |

## Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-05-07 | @sm | Story criada a partir de onboarding_spec_v2.md (seção Migration + Schema) |
| 2026-05-07 | @po | Validada 10/10 ✅ → Status Draft → Ready |
| 2026-05-07 | @dev | T1–T6 implementados (commit c92203e) — migrations table + 3 colunas idempotentes |
| 2026-05-07 | @qa | T7 typecheck PASS ✅ → 0 erros |
| 2026-05-07 | @devops | Push master ec6992f → c92203e ✅ → Status InReview → Done |

## Dev Notes

Referência spec: `docs/master/onboarding_spec_v2.md` → seção "Schema Update Necessário"

SQL de referência da spec:
```sql
-- tabela migrations (criar se não existir)
CREATE TABLE IF NOT EXISTS migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version INTEGER UNIQUE,
  applied_at TEXT
);

-- guard + alter para cada coluna:
-- PRAGMA table_info(user_profile) → checar se coluna já existe
-- Se não existir → executar ALTER TABLE
ALTER TABLE user_profile ADD COLUMN relationship TEXT
  CHECK(relationship IN ('mae','parceiro','outro'));

ALTER TABLE user_profile ADD COLUMN plan TEXT
  DEFAULT 'free' CHECK(plan IN ('free','premium'));

ALTER TABLE user_profile ADD COLUMN plan_expires_at TEXT;
```
