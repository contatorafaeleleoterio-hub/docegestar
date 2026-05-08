# ONB-12 — QA Gate completo do Onboarding v2.1

**Epic:** Onboarding v2.1
**Status:** Ready
**Estimativa:** 2 pts
**Dependências:** ONB-11 Done

---

## Descrição

QA Gate de encerramento do Epic Onboarding. Valida todos os cenários do fluxo de onboarding revisado (spec v2.1), do typecheck, dos testes unitários e do web bundle.

---

## Acceptance Criteria

- [ ] `npm run typecheck` → 0 erros
- [ ] `npm test` → todos os testes PASS (≥ 10/10)
- [ ] `npx expo export --platform web` → bundle compila sem erros
- [ ] Cenário 1: novo usuário (sem perfil) → vai para onboarding
- [ ] Cenário 2: perfil sem DPP → vai para dashboard (estado vazio, sem crash)
- [ ] Cenário 3: perfil com DPP → vai para dashboard com GestationCounter visível
- [ ] Cenário 4: "Definir depois" salva due_date=null e navega para Plans→Dashboard
- [ ] Cenário 5: botão × do modal Parabéns salva dados (mesmo efeito do CTA)
- [ ] Cenário 6: back navigation de DueDate→Profile preserva nome e relationship no draft
- [ ] Cenário 7: fechar Plans com × → plan='free', navega para dashboard

---

## Scope IN

- Verificação de código para todos os 7 cenários
- Typecheck, test suite, web bundle export

## Scope OUT

- Testes de integração automatizados (pós-MVP)
- Screenshots/visual regression (pós-MVP)

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| 2026-05-08 | @sm | Story criada |
| 2026-05-08 | @po | Status Draft → Ready (GO) |
