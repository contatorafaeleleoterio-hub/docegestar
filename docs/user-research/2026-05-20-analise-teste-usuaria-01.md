# Análise de Teste de Usuária — DoceGestar

**Data da análise:** 2026-05-20
**Origem:** Áudios transcritos de gestante real testando o app pela primeira vez
**Sessão de teste:** 01 (primeira usuária)
**Extração via:** Prompt #1 — Tripla persona UX + PM + Copywriter
**Status:** Fonte canônica para evolução do produto

> **Por que este documento existe:** opiniões de usuárias reais são a base da evolução do DoceGestar. Este é o output bruto estruturado do primeiro teste de usabilidade — usar como entrada para benchmarks competitivos (Prompt #2), priorização de backlog e validação de hipóteses.

---

## 1. Tabela de Feedback

| # | Cat | Título | O que ela disse | Frase literal | Tela | Sentimento | Prio | Por quê | Esforço |
|---|-----|--------|-----------------|---------------|------|------------|------|---------|---------|
| 1 | CONTEÚDO | Marco da semana vago, sem info útil | O marco da semana na página inicial ficou vago — ela esperava informações sobre o que vai sentir naquela semana, cuidados necessários ou sintomas relevantes. | "ficou meio vago assim acho que ali era importante tipo colocar alguma coisa que a pessoa vai sentir naquela semana ou algum cuidado que ela precisa ter" | Início (Marco da Semana) | confusa | 🔴 Alta | É o elemento central do painel principal; se parece vazio, a usuária perde o motivo de abrir o app diariamente | M |
| 2 | UX | Conteúdo da semana exige clique para ver | Ela acha que deveria aparecer uma prévia do conteúdo da semana diretamente na tela, sem precisar clicar para acessar. | "já deveria ter uma prévia pra pessoa tipo não precisar clicar pra poder ir lá entendeu?" | Início (card Conteúdo da Semana) | confusa | 🔴 Alta | Aumenta fricção no fluxo principal; prévia inline eleva engajamento com zero custo de navegação | S |
| 3 | CONTEÚDO | Termos médicos sem glossário inline | Termos como "vernix casioso" e "mecônio" aparecem sem explicação. Ela não faz ideia do que significam e sente que o app deveria explicar entre parênteses. | "não faço ideia do que seja… poderia dar uma explicada entre parênteses o que seria essa situação" | Início (Marcos do Desenvolvimento) | ansiosa | 🔴 Alta | Linguagem inacessível cria distância e ansiedade em vez de acolhimento — contradiz o posicionamento do app | M |
| 4 | CONTEÚDO | Fontes de ferro e cálcio incompletas | O conteúdo nutricional cita carne vermelha como fonte de ferro, mas omite folhas verdes e outras fontes vegetais. Ela sente a informação pela metade. | "não se encontra só em carne vermelha pode colocar ali também tipo as folhas que encontra o ferro sabe?" | Card de nutrição (Explorar ou Início) | curiosa | 🔴 Alta | Informação nutricional incompleta pode prejudicar saúde real da gestante — risco clínico e de credibilidade | S |
| 5 | FEATURE | Lembretes de consultas no painel principal | Ela quer ver no painel lembretes proativos como "você tem consulta em tal data" ou "já se programe pra marcar sua segunda morfológica". | "você tem consulta tal data ou já se programe pra marcar a sua segunda morfológica sabe essas coisas assim" | Início | ansiosa | 🔴 Alta | Gestação tem datas críticas; lembrete proativo é o tipo de feature que faz a usuária recomendar o app | M |
| 6 | UX | Kick counter sem explicação de funcionamento | Ela não sabe se o contador de chutes vai gravar vídeo, marcar uma contagem ou registrar de outra forma — ficou completamente perdida sobre o que a ferramenta faz. | "eu não sei se o chute o que que seria né se daí vai marcar vai fazer vídeo ou vai registrar não sei de que forma" | Ferramentas (Kick Counter) | confusa | 🟡 Média | Onboarding da ferramenta está ausente; sem entender o propósito, a usuária não usa | S |
| 7 | CONTEÚDO | Linguagem dos marcos fria e sem emoção | O texto dos marcos poderia ser mais caloroso e materno, aproximando a gestante do bebê com linguagem empática como "seu bebezinho". | "seu bebezinho eh ele ainda não apareceu Mas se você pressiona você sente sabe? Alguma coisa assim" | Início (Marcos do Desenvolvimento) | acolhida | 🟡 Média | Tom empático é diferencial do app; texto clínico desperdiça oportunidade de vínculo emocional | S |
| 8 | CONTEÚDO | Card semana 20 sem mudanças corporais da mãe | O card da semana no Explorar foca no bebê mas não menciona o que a mãe vai sentir no corpo — ela cita unhas fortes, cabelo, acne — experiências reais que ela viveu. | "pode adicionar alguma coisa assim… suas unhas mais fortes você vai notar seu cabelo mais forte tipo alguma coisa que fale sobre a autoestima da mulher né" | Explorar (card Semana 20) | curiosa | 🟡 Média | Conteúdo centrado só no bebê ignora a experiência da mãe, reduzindo identificação com o app | M |
| 9 | FEATURE | Diário unificado em vez de ferramentas separadas | Ela sugere um diário livre onde a usuária possa escrever tudo (chutes, contrações, sentimentos), sem precisar separar em contadores distintos. | "poderia colocar daí o diário né pra pessoa poder escrever e não necessariamente separar o chute a contração agora porque daí pessoa coloca tudo no diário entendeu?" | Ferramentas | curiosa | 🟡 Média | Reflete preferência por flexibilidade sobre estrutura; pode coexistir com ferramentas atuais | M |
| 10 | CONTEÚDO | Dica de higienização de folhas ausente | Ao sugerir folhas como fonte de ferro, ela mesma lembrou que seria importante adicionar alerta para higienizar bem folhas e saladas cruas durante a gestação. | "observação lembre-se de higienizar muito bem as folhas e saladas cruas né?" | Card de nutrição | ansiosa | 🟡 Média | Segurança alimentar na gestação é sensível; a própria usuária identificou o risco | XS |
| 11 | FEATURE | Lista de enxoval com template base sugerida | A lista de enxoval é boa, mas ela sentiu falta de um ponto de partida com itens essenciais já sugeridos, para complementar com itens personalizados. | "dava pra utilizar também uma base nessa lista também coisas que são importantes" | Perfil (Lista de Enxoval) | curiosa | 🟡 Média | Template reduz esforço inicial e aumenta adoção da feature; ela já usa e vê valor | S |
| 12 | ELOGIO | Lista de enxoval adorada — usou no chá de bebê | Ela usou a lista de enxoval do app para montar a lista do próprio chá de bebê e achou a feature excelente. | "eu fiz uma lista pra pedir coisas aqui pro meu chá de bebê né?… essa parte do enxoval eu achei bem legal assim gostei bastante" | Perfil (Lista de Enxoval) | encantada | 🟢 Baixa | Elogio genuíno; prova de uso real e valor percebido | — |
| 13 | ELOGIO | App aprovado no geral com potencial alto | Ela conclui que o app está muito bom e que com os ajustes que sugeriu vai ficar excelente. | "no geral assim está muito bom acho que se fizer esses ajustes assim vai ficar bem legal" | App inteiro | acolhida | 🟢 Baixa | Endosso geral positivo de primeira-use | — |

---

## 2. 🎯 Top 3 Quick Wins

### 1. Glossário inline nos termos médicos (item #3) — Esforço S
Adicionar um tooltip ou texto entre parênteses para "vernix casioso", "mecônio" e similares resolve ansiedade imediata com poucas horas de trabalho editorial — zero engenharia.

### 2. Alerta de higienização nas dicas nutricionais (item #10) — Esforço XS
Uma linha de copy de segurança alimentar ("lembre-se de higienizar bem folhas e saladas cruas") transforma informação incompleta em conselho responsável — minutos para implementar.

### 3. Prévia do conteúdo da semana inline no Início (item #2) — Esforço S
Mostrar 2–3 linhas do conteúdo da semana diretamente no card do painel elimina um clique e aumenta o tempo de sessão — mudança de UI simples com alto retorno em engajamento.

---

## 3. 🚀 Top 3 Ideias Novas de Feature

### 1. "Minha Agenda Gestacional"
Lembretes proativos de consultas, exames e marcos clínicos exibidos no painel principal (item #5). A usuária não pediu uma lista — pediu um app que pensa junto com ela. Demanda emocional forte: *"já se programe pra marcar sua segunda morfológica"*.

### 2. "Diário Livre"
Um campo de texto aberto dentro de Ferramentas onde a usuária registra tudo — chutes, contrações, sentimentos, dores — sem precisar escolher a ferramenta certa (item #9). Complementa os contadores estruturados sem substituí-los.

### 3. "Semana no Seu Corpo"
Seção separada (ou aba dentro do card semanal) que narre as mudanças físicas da mãe naquela semana: cabelo, unhas, acne, humor, libido, energia (item #8). A usuária sinalizou que o app fala muito do bebê e pouco dela — e essa lacuna é oportunidade de posicionamento.

---

## 4. 🔥 Riscos de Retenção

### 1. Marco da semana vago (item #1)
Se o elemento principal do Início parece vazio na primeira visita, a usuária não encontra motivo para voltar no dia seguinte. **Desistência silenciosa após D1**.

### 2. Kick counter sem onboarding (item #6)
Ferramenta que a usuária não entende = ferramenta que ela não usa = aba inteira que perde valor. Se as Ferramentas parecem confusas, a percepção de utilidade do app cai.

### 3. Linguagem técnica sem tradução (item #3)
App que faz a gestante se sentir ignorante em vez de acolhida vai contra o posicionamento inteiro do DoceGestar. Se ela se sentir "burra" lendo os marcos, troca de app.

---

## 5. 💬 Frases Prontas para Marketing

| Frase | Onde usar |
|-------|-----------|
| *"eu fiz uma lista pra pedir coisas aqui pro meu chá de bebê né?"* | Landing page (prova de uso real) · IG/TikTok (UGC autêntico) |
| *"essa parte do enxoval eu achei bem legal assim gostei bastante"* | ASO Store (review-style) · IG Stories |
| *"no geral assim está muito bom acho que se fizer esses ajustes assim vai ficar bem legal"* | Landing page (seção "O que as gestantes dizem") |
| *"alguma coisa que fale sobre a autoestima da mulher né"* | Copy de campanha / posicionamento ("O app que cuida de você, não só do bebê") · Google Ads |
| *"já se programe pra marcar a sua segunda morfológica sabe essas coisas assim"* | Push notification (modelo de linguagem) · Onboarding copy |

---

## 6. 🎭 Insight Emocional Principal

Ela entra no app como uma **gestante ativa e informada, não passiva** — ela não quer só receber conteúdo, quer um parceiro de gestão. O tom dominante é **curiosidade engajada misturada com ansiedade latente**: ela faz perguntas o tempo todo ("o que que seria isso?", "vai registrar de que forma?"), mas não por frustração — por genuíno interesse em entender e usar bem. O momento mais revelador é quando ela própria lembra a dica de higienizar as folhas: ela está no modo de **cuidado ativo**, e quer que o app esteja no mesmo modo. Quando o app oferece algo que ela realmente usou — a lista de enxoval para o chá de bebê — o encantamento é imediato e concreto. **O risco não é ela achar o app ruim; é ela achar o app incompleto para o nível de engajamento que ela quer ter.**

---

## 7. 📊 Resumo Numérico

| Métrica | Valor |
|---------|-------|
| Total de itens extraídos | 13 |
| Distribuição por categoria | CONTEÚDO: 7 · FEATURE: 3 · UX: 2 · ELOGIO: 2 · BUG: 0 |
| Distribuição por prioridade | 🔥 0 · 🔴 5 · 🟡 6 · 🟢 2 |
| Sentimento dominante | curiosa |
| Aba mais comentada | **Início** (marco, prévia, lembretes) |
| Aba não mencionada (gap de teste) | **Onboarding** — não foi comentado nenhuma vez |

---

## 8. ❓ Perguntas em Aberto

1. **Kick counter:** Quando ela disse "não sei se vai marcar, fazer vídeo ou registrar" — ela já chegou a tocar no botão do contador de chutes ou apenas leu o nome da seção? Saber se é um problema de **copy** ou de **UX pós-interação** muda muito a solução.
2. **Diário:** Ela sugere um "diário para escrever tudo" — isso seria uma **substituta** para o contador de chutes e timer de contrações, ou uma **adição paralela**? A intenção era simplificar a aba ou enriquecer?
3. **Card semana 20 no Explorar:** Ela disse "aquela tarde que tem rosa… semana vinte" — ela estava vendo o card da sua **semana atual** ou navegou até a **semana 20 especificamente**? Se for a semana atual dela, qual a semana gestacional para contextualizar o feedback de conteúdo?

---

## Próximos passos

1. **Rodar Prompt #2 (investigação competitiva)** sobre esta análise para validar cada item contra implementações de mercado (Gravidez+, BabyCenter, Ovia, Canguru, etc.) e refinar as soluções a partir de padrões já validados.
2. **Resolver perguntas em aberto** na próxima rodada de teste com a mesma usuária (ou similar).
3. **Cobrir o gap do Onboarding** numa próxima sessão — direcionar a próxima usuária para passar pelo fluxo do zero.
4. **Mapear contra o LAUNCH-TRACK** quais itens 🔴 entram no MVP pré-G-7 e quais ficam para v1.1.
