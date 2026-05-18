# Protocolo "Preview de Tela" — Documento de Intenção

> **Status:** ⏳ PENDENTE — apenas registro de intenção. O protocolo será
> construído depois, pelo usuário.
> **Data do registro:** 2026-05-16
> **Origem:** pedido do usuário durante a sessão de updates de UI (troca da
> imagem da tela de boas-vindas).

---

## 1. Intenção

Ao final de **qualquer alteração de UI**, ter a opção de **abrir somente a
tela/local que foi alterado** e mostrá-lo funcionando — **sem** rodar o app
inteiro, sem iniciar cadastro e sem navegar manualmente por várias telas até
chegar no ponto modificado.

Uso pretendido: o usuário diz algo como **"rodar protocolo teste"** /
**"rodar preview da [tela]"** e recebe a tela alterada exibida isoladamente.
Aceita-se até uma tela estática, desde que mostre o resultado da alteração.

**Problema que resolve:** hoje, para conferir uma mudança na primeira tela
(boas-vindas), seria preciso abrir o app, passar pelo gate de perfil, percorrer
o fluxo — custo de tempo desproporcional para validar 1 tela.

---

## 2. Possibilidades levantadas

| Opção | Como funciona | Roda servidor? | Telas c/ dados | Esforço |
|-------|---------------|----------------|----------------|---------|
| **A. Rota direta** | expo-router dá URL a cada tela; abrir `localhost:8081/<rota>` direto no navegador | Sim (1×) | ⚠️ pode renderizar vazio sem estado | Zero |
| **B. Harness isolado** | Rota dev `/preview` que renderiza 1 tela embrulhada em mock providers + mock data | Sim (1×) | ✅ resolve | Setup médio |
| **C. Screenshot automático** | Agente abre a rota e entrega print da tela | Sim (1×) | depende de A/B | Zero (combina) |
| **D. Mockup HTML estático** | Réplica HTML da tela, sem Metro | Não | n/a | ⚠️ réplica diverge do código real |

**Recomendação inicial:** A + C para telas autônomas; B para telas que dependem
de perfil/estado (dashboard, perfil). D só como último recurso — diverge do app.

---

## 3. O que foi aprendido ao tentar executar (2026-05-16)

Tentativa de rodar o protocolo A+C na tela `/onboarding` (boas-vindas):

### 3.1 — Servidor de preview instável
- O preview MCP foi iniciado 2× com a config `docegestar-web`
  (`.claude/launch.json` → `expo start --web`, porta 8081).
- Nas 2 tentativas o servidor **morreu segundos após subir**
  (`Server not found. No running servers for this workspace.`).
- Hipóteses (não confirmadas):
  - `expo start --web` demora bastante para inicializar o Metro; o preview MCP
    pode considerar o processo morto antes de o bundle terminar.
  - O processo expo pode estar crashando no boot por outro motivo.
- **A confirmar:** rodar `npx expo start --web` manualmente no terminal e
  aguardar a mensagem `Web Bundling complete` (ou capturar o erro real).

### 3.2 — Bug histórico do `tslib`/supabase: provavelmente resolvido
- O bug antigo de tela preta vinha de `welcome.tsx`, que importava supabase.
- `welcome.tsx` foi **deletado** no commit `074f4fa`.
- Hoje só `src/utils/supabase.ts` e `src/utils/supabase.web.ts` importam
  supabase, e **nenhuma tela os puxa** — a cadeia que quebrava o bundle não
  existe mais.
- Os fixes `metro.config.js` e `src/utils/supabase.web.ts` seguem no working
  tree. Ou seja, a causa do bug não deve mais ocorrer — a instabilidade do
  item 3.1 é outra coisa, a investigar.

### 3.3 — Gate de redirecionamento na entrada
- Observado pelo usuário: ao abrir, o app foi **direto para dentro, sem passar
  pela tela de boas-vindas**.
- Causa: `app/index.tsx` é um gate. Ele decide a rota inicial:
  - perfil salvo encontrado → redireciona para `/(tabs)/dashboard`
  - sem perfil → redireciona para `/onboarding`
- No ambiente de teste já existe perfil salvo → o app pula a tela de boas-vindas.
- **Implicação para o protocolo:** abrir `localhost:8081/onboarding` direto
  ainda passa pelo `index.tsx` primeiro. Para previewar a tela de boas-vindas
  de forma confiável é preciso **contornar o gate** — por exemplo, uma rota de
  preview dedicada que não passe pelo `index.tsx`, ou limpar o estado de perfil
  antes.

---

## 4. Implicações para quando o protocolo for criado

1. **Deep-link puro (opção A) não basta sozinho** — o gate `index.tsx` e a
   ausência de estado fazem telas renderizarem errado ou vazias. O protocolo
   precisa de um mecanismo que pule o gate.
2. **Rota de preview dedicada (`/preview`) é o caminho mais robusto** — uma
   tela dev que importa o componente-alvo e o renderiza direto, fora do gate,
   com mock providers quando necessário (opção B).
3. **Estabilidade do servidor** — antes de automatizar, confirmar que
   `expo start --web` builda até o fim e se mantém de pé. Resolver o item 3.1.
4. **Forma de invocar** — pode ser um comando/skill (ex.: `/preview <tela>`) ou
   uma etapa fixa no fim de cada alteração de UI.

---

## 5. Pré-requisitos antes de construir o protocolo

- [ ] Confirmar que `npm run web` builda até `Web Bundling complete` e o
      servidor permanece estável.
- [ ] Decidir o mecanismo: deep-link puro vs rota `/preview` dedicada vs
      harness com mock data.
- [ ] Definir a forma de invocação (comando/skill vs etapa de workflow).
- [ ] Mapear quais telas são autônomas (servem com opção A) e quais dependem
      de estado (exigem opção B).

---

## 6. Resumo de uma linha

Criar um jeito de, ao fim de cada alteração de UI, abrir **só a tela alterada**
funcionando — provavelmente via uma rota `/preview` dedicada que pula o gate
`index.tsx` — sem percorrer cadastro nem navegação.
