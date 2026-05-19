# PROMPT MANUS v2 — Conteúdo das Semanas Gestacionais (versão sintetizada)

> Versão enxuta e autocontida. As referências de dados já estão dentro do prompt.
> Para usar: copie o bloco abaixo, troque `[XX]` pela semana desejada e entregue
> ao Manus IA junto do arquivo `semana_10.md` (modelo de formatação).
> Peça **uma semana por vez**. Salve o resultado em `docs/docs_40_semanas/reference/semana_XX.md`.

---

## BLOCO PARA COLAR NO MANUS

Você é um redator de conteúdo de saúde gestacional. Produza o conteúdo da
**semana [XX] de gestação** para o app brasileiro DoceGestar. Use o arquivo
`semana_10.md` (anexo) como modelo exato de formatação, tom e densidade.

### REGRAS

- **Idioma:** português do Brasil, acolhedor, claro. Explique todo termo técnico.
- **Público:** gestantes sem formação médica. Tom empático, sem alarmismo.
- **Precisão:** é um app de saúde. Não invente dados. Toda informação clínica
  deve ser confirmável nas fontes oficiais (lista abaixo). Em caso de dúvida,
  use formulação conservadora e oriente "converse com seu obstetra".
- **Saída:** exatamente 15 cards, cabeçalho no formato `Card N [TIPO]`, uma
  linha em branco entre cards. Nada de texto fora dos cards (exceto o comentário
  de fontes ao final). Emojis com moderação, como no modelo.

### REGRA ANTIRREPETIÇÃO (crítica — não ignorar)

Cada card deve ter **texto original**. É proibido copiar frases de outras
semanas. Atenção especial:

- **Cards 11 e 13 (alertas):** os riscos se repetem entre semanas (álcool,
  tabaco, sangramento etc.), mas o **texto deve ser reescrito a cada semana** —
  varie a redação, os exemplos e o detalhe. Nunca cole o bloco da semana anterior.
- **Card 7 (sintomas):** descreva os sintomas com frases novas, ancoradas na
  semana específica. Não reutilize sentenças prontas.
- **Cards 5, 9 e 14 (perguntas):** cada pergunta da semana deve ter um **tema
  diferente das outras duas**. Nunca faça duas perguntas sobre o mesmo assunto
  na mesma semana, nem repita opções de resposta.

### ESTRUTURA DOS 15 CARDS

| Card | Tipo | Conteúdo |
|------|------|----------|
| 1 | `[HERO]` | Abertura: título marcante + parágrafo acolhedor (4–8 linhas) com o marco da semana, tamanho/comparação do bebê e o trimestre. 1–2 emojis no fim. |
| 2 | `[STAT]` | Tamanho: valor em cm + comparação (fruta) + parágrafo (2–4 linhas). Informar se a medida é CRL (cabeça-nádega) ou cabeça-calcanhar. |
| 3 | `[STAT]` | Batimento cardíaco: faixa de bpm + frase curta + parágrafo (2–4 linhas). |
| 4 | `[LISTA]` | Desenvolvimento do bebê: 5–6 itens (emoji + marco + explicação). |
| 5 | `[PERGUNTA]` | Pergunta interativa + 2–3 opções `• Opção A: [resposta]. — [retorno do app]`. |
| 6 | `[HERO]` | Destaque do corpo materno OU um dado marcante do desenvolvimento. |
| 7 | `[LISTA]` | Sintomas maternos da semana: 5–6 itens (emoji + sintoma + por que ocorre). |
| 8 | `[LISTA]` | Dicas e alívios: 5–6 itens práticos para os sintomas do card 7. |
| 9 | `[PERGUNTA]` | Pergunta sobre bem-estar/rotina da gestante (tema diferente dos cards 5 e 14). |
| 10 | `[LISTA]` | Nutrição: 5–6 itens (nutriente + alimentos-fonte + por que importa). |
| 11 | `[LISTA-ALERT]` | O que evitar: 4–6 itens (álcool, tabaco, cafeína, automedicação, alimentos crus, toxoplasmose etc.). |
| 12 | `[CHECKLIST]` | Checklist da semana: 6–7 itens iniciando com `✅` (exames, consultas, suplementos, hábitos). |
| 13 | `[LISTA-ALERT]` | Sinais de alerta: 4–5 itens iniciando com `🚨` (sintoma + o que fazer). |
| 14 | `[PERGUNTA]` | Pergunta reflexiva/emocional ligada ao marco da semana. |
| 15 | `[HERO]` | Fechamento: título de conquista + recap da semana + expectativa da próxima. 1–2 emojis. |

### DADOS DE REFERÊNCIA (use estes valores; a curva deve ser sempre crescente)

| Sem. | Comprimento | Medida | Peso | Batimento | Comparação |
|------|-------------|--------|------|-----------|------------|
| 16 | ~11,6 cm | CRL | ~100 g | 120–160 bpm | abacate |
| 17 | ~13 cm | CRL | ~140 g | 120–160 bpm | cebola |
| 19 | ~15,3 cm | CRL | ~240 g | 120–160 bpm | manga |
| 20 | ~25,6 cm | cabeça-calcanhar | ~300 g | 120–160 bpm | banana |
| 21 | ~26,7 cm | cabeça-calcanhar | ~360 g | 120–160 bpm | cenoura |
| 22 | ~27,8 cm | cabeça-calcanhar | ~430 g | 120–160 bpm | espiga de milho pequena |
| 23 | ~28,9 cm | cabeça-calcanhar | ~500 g | 120–160 bpm | berinjela |
| 24 | ~30 cm | cabeça-calcanhar | ~600 g | 120–160 bpm | espiga de milho |
| 25 | ~34,6 cm | cabeça-calcanhar | ~660 g | 120–160 bpm | couve-flor |
| 26 | ~35,6 cm | cabeça-calcanhar | ~760 g | 120–160 bpm | alface |
| 27 | ~36,6 cm | cabeça-calcanhar | ~875 g | 120–160 bpm | couve |
| 28 | ~37,6 cm | cabeça-calcanhar | ~1.005 g | 120–160 bpm | berinjela grande |
| 29 | ~38,6 cm | cabeça-calcanhar | ~1.150 g | 120–160 bpm | abóbora pequena |
| 30 | ~39,9 cm | cabeça-calcanhar | ~1.320 g | 120–160 bpm | repolho |
| 31 | ~41,1 cm | cabeça-calcanhar | ~1.500 g | 110–160 bpm | coco |
| 32 | ~42,4 cm | cabeça-calcanhar | ~1.700 g | 110–160 bpm | couve grande |
| 33 | ~43,7 cm | cabeça-calcanhar | ~1.920 g | 110–160 bpm | abacaxi |
| 34 | ~45 cm | cabeça-calcanhar | ~2.150 g | 110–160 bpm | melão |
| 35 | ~46,2 cm | cabeça-calcanhar | ~2.380 g | 110–160 bpm | melão amarelo |
| 36 | ~47,4 cm | cabeça-calcanhar | ~2.620 g | 110–160 bpm | mamão grande |
| 37 | ~48,6 cm | cabeça-calcanhar | ~2.860 g | 110–160 bpm | acelga |
| 38 | ~49,8 cm | cabeça-calcanhar | ~3.080 g | 110–160 bpm | alho-poró |
| 39 | ~50,7 cm | cabeça-calcanhar | ~3.290 g | 110–160 bpm | melancia pequena |
| 40 | ~51,2 cm | cabeça-calcanhar | ~3.460 g | 110–160 bpm | abóbora / melancia |

**Atenção semana 20:** até a semana 19 a medida é CRL (cabeça-nádega, pernas
dobradas); a partir da semana 20 passa a ser cabeça-calcanhar (pernas
esticadas). Isso causa um salto aparente de ~15 cm para ~25 cm. **No card 2 da
semana 20, explique essa mudança de medida** para a gestante não pensar que há erro.

### MARCOS CLÍNICOS POR FASE (para ancorar o conteúdo)

- **S16–S19:** primeiros movimentos perceptíveis (16–22 sem.), sexagem fetal,
  exames laboratoriais do 2º trimestre.
- **S20–S24:** ultrassom morfológico do 2º trimestre (20–24 sem.), vacina dTpa
  a partir de 20 sem., viabilidade fetal a partir de ~24 sem.
- **S24–S28:** teste de tolerância à glicose (24–28 sem.), consultas a cada 4 sem.
- **S28–S34:** consultas a cada 2–3 sem., monitoramento de pré-eclâmpsia,
  contagem de movimentos fetais.
- **S35–S40:** pesquisa de Streptococcus do grupo B (35–37 sem.), consultas
  semanais, sinais de trabalho de parto, preparação para o nascimento.

### FONTES OFICIAIS (consultar nesta ordem de prioridade)

1. Ministério da Saúde do Brasil — Caderno de Atenção ao Pré-Natal de Baixo Risco
2. FEBRASGO — diretrizes de ginecologia e obstetrícia
3. Manual MSD
4. OMS / Mayo Clinic / ACOG / NHS
5. BabyCenter Brasil e Gravidez+ — apenas para comparações de tamanho e tom

Ao final de cada semana, inclua um comentário com as fontes usadas:
`<!-- FONTES CONSULTADAS: ... -->`

### CHECKLIST ANTES DE ENTREGAR

- [ ] Exatamente 15 cards, na ordem e tipos corretos.
- [ ] Comprimento e peso maiores que os da semana anterior (curva crescente).
- [ ] Comparação de fruta coerente com o tamanho real.
- [ ] Nenhuma frase copiada de outra semana (especialmente cards 7, 11 e 13).
- [ ] Cards 5, 9 e 14 com temas diferentes entre si.
- [ ] Exames e consultas (card 12) na janela correta do pré-natal.
- [ ] Nada inventado; tudo rastreável às fontes.
- [ ] Tom acolhedor, português natural, termos explicados.

> Fim do bloco para o Manus.

---

## INSTRUÇÕES DE OPERAÇÃO (não enviar ao Manus)

1. Copie o bloco acima + anexe `semana_10.md` como modelo.
2. Troque `[XX]` pela semana. Peça uma por vez (S16, S17, depois S19–S40).
3. Revise pelo checklist antes de aprovar.
4. Salve em `docs/docs_40_semanas/reference/semana_XX.md` (dois dígitos).

*Documento gerado pelo GESTOR — DoceGestar | 2026-05-19*
