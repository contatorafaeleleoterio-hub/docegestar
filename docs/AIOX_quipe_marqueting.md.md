Contexto O DoceGestar tem uma equipe de desenvolvimento (Dev Squad) orquestrada pelo /gestor que funciona de forma autônoma. Agora precisamos replicar esse modelo para marketing, criando uma equipe de agentes que a Gabriela possa acionar com um unico comando para receber plano de acoes, relatorios e orientacoes — executando tarefas humanas apenas quando estritamente necessario (pagar anuncio, subir criativo, etc.). Restricao: Sem criacao de conteudo no MVP. Foco em Google Ads + Play Store ASO. Conteudo entra em fases posteriores se houver validacao.
Abordagem Recomendada Usar o @squad-creator (Craft) nativo do AIOX O framework ja possui toda a infraestrutura para criar squads:
@squad-creator com comandos *design-squad e *create-squad Diretorio ./squads/ para squads customizados Schema de validacao (squad-schema.json) Scripts de geracao, validacao e integracao
Por que essa abordagem: Segue o principio IDS (REUSE > ADAPT > CREATE). Toda a infraestrutura existe — basta usa-la.
Arquitetura da Squad de Marketing Fase 1 — MVP (agora) Apenas 4 agentes, suficientes para Google Ads + ASO: TierAgentePapelT0@mkt-chief (Chief)Orquestrador — analisa estado, decide prioridades, delegaT1@trafego (Master)Estrategia de campanhas Google AdsT1@aso (Master)Otimizacao Play Store (titulo, descricao, keywords)T2@kpi (Specialist)Leitura de metricas, relatorio semanal Fase 2 — Pos-validacao Adicionar: @conteudo, @seo, @copywriter Fase 3 — Escala Adicionar: @cro, @social, agentes de canal especificos
Comando de Ativacao: /marketing Criar um novo SKILL em .claude/skills/marketing/SKILL.md seguindo o padrao do /gestor:
Protocolo de 5 fases (igual ao gestor):
Leitura de estado (metricas, campanhas ativas, budget) Algoritmo de prioridade (Marketing Track Algorithm) Briefing a Gabriela Execucao autonoma delegando para agentes da squad Atualizacao de estado + lista de acoes humanas
Marketing Track Algorithm (regras de decisao em ordem):
BLOCKER (conta suspensa, budget zerado) → resolver SETUP INICIAL (sem conta Google Ads, sem keywords definidas) → configurar PESQUISA DE MERCADO (keywords, concorrentes, publico) → executar 1x CAMPANHA EM ANDAMENTO → otimizar/monitorar NOVA CAMPANHA → planejar e estruturar ASO REVIEW → otimizar listing da Play Store RELATORIO SEMANAL → gerar KPI report
Acoes humanas sinalizadas explicitamente:
Pagar fatura Google Ads Subir criativos na plataforma Aprovar textos antes de publicar Upload de screenshots na Play Store Aprovar budget de campanha
Coexistencia das Duas Squads Separacao por diretorio
Dev Squad: .aiox-core/development/agents/ (ja existe) Marketing Squad: ./squads/marketing/ (novo)
Comunicacao entre squads
Via arquivos de estado compartilhados em docs/:
docs/marketing/MARKETING-TRACK.md — estado do marketing (analogo ao LAUNCH-TRACK.md) docs/marketing/kpi-reports/ — relatorios semanais docs/marketing/campaigns/ — estrutura de campanhas
O /gestor pode ler o MARKETING-TRACK.md para entender o estado do marketing O /marketing pode ler o LAUNCH-TRACK.md para alinhar com o estado do produto
Sem conflitos de autoridade
Agentes de marketing NAO tocam em codigo, git, stories de dev Agentes de dev NAO tocam em campanhas, keywords, metricas de marketing Cada squad tem seu proprio namespace de agentes (@mkt-chief vs @gestor)
Procedimento de Execucao (Passo a Passo) Passo 0 — Criar o arquivo de brief (PRE-REQUISITO) Criar o arquivo docs/marketing/brief.md ANTES de acionar o squad-creator. Sem esse arquivo o *design-squad falha silenciosamente. Conteudo minimo do brief:
• Produto: app DoceGestar para gestantes
• Publico: gravidas de primeira viagem
• Foco MVP: Google Ads + Play Store ASO
• Restricao: sem criacao de conteudo nesta fase
• Execucao humana: Gabriela realiza acoes que exigem acesso a plataformas (pagar anuncio, subir criativo, upload Play Store, aprovar budget)
• Comando de entrada: /marketing
Passo 1 — Ativar o Squad Creator @squad-creator *design-squad --docs ./docs/marketing/brief.md Revisar as recomendacoes geradas antes de prosseguir para o Passo 2. Passo 2 — Criar o Squad *create-squad marketing --from-design Gera a estrutura em ./squads/marketing/ com agentes, tasks e workflows. ATENCAO: a flag --from-design e obrigatoria. Sem ela o squad-creator ignora o contexto do *design-squad e gera um squad generico vazio, exigindo customizacao total manual. Passo 3 — Customizar os agentes Ajustar as definicoes dos 4 agentes (mkt-chief, trafego, aso, kpi) com:
Voice DNA em portugues Heuristics especificas do DoceGestar Tasks e checklists de marketing
ATENCAO — campo obrigatorio no squad.yaml: Verificar que o arquivo squads/marketing/squad.yaml contem o campo slashPrefix definido como "marketing". Esse campo e o que conecta o comando /marketing ao @mkt-chief. Se estiver ausente ou incorreto, o comando /marketing nao funcionara. Exemplo do trecho critico: name: marketing slashPrefix: marketing
Passo 4 — Criar o SKILL /marketing Criar .claude/skills/marketing/SKILL.md seguindo o padrao do /gestor mas com:
Marketing Track Algorithm (em vez do Launch Track) Referencia aos agentes da squad marketing Estado lido de docs/marketing/MARKETING-TRACK.md Lista explicita de acoes que requerem humano
Passo 5 — Criar arquivo de estado inicial Criar docs/marketing/MARKETING-TRACK.md com estado inicial do marketing. Passo 6 — Validar o squad (ANTES de atualizar o CLAUDE.md) @squad-creator *validate-squad marketing --strict Corrigir qualquer erro antes de prosseguir. Atualizar o CLAUDE.md com o squad quebrado pode causar conflitos no /gestor nas proximas sessoes. Passo 7 — Atualizar CLAUDE.md Adicionar referencia ao /marketing na secao de objetivo do sistema, similar ao /gestor. Executar este passo somente apos validacao bem-sucedida no Passo 6. Passo 8 — Testar o fluxo completo Invocar /marketing e verificar se o fluxo de 5 fases executa corretamente.
Protocolos Alinhados com Dev Squad ProtocoloDev SquadMarketing SquadSessoes divididasSim (context window)Sim (mesma logica)Handoff entre agentesagent-handoff.mdMesmo protocoloQuality gatesQA Gate (7 checks)Marketing QA (checklist proprio)Estado persistenteLAUNCH-TRACK.mdMARKETING-TRACK.mdComando de entrada/gestor/marketingAcoes humanasAprovar planoPagar, subir criativos, aprovar textos
Arquivos Criticos a Modificar/Criar ArquivoAcaodocs/marketing/brief.mdCriar PRIMEIRO (pre-requisito do Passo 0)squads/marketing/squad.yamlCriar (via squad-creator) — verificar slashPrefix: marketingsquads/marketing/agents/.mdCriar (4 agentes fase 1)squads/marketing/tasks/.mdCriar (tasks de marketing).claude/skills/marketing/SKILL.mdCriar (comando /marketing)docs/marketing/MARKETING-TRACK.mdCriar (estado inicial).claude/CLAUDE.mdAtualizar SOMENTE apos validacao (Passo 7).claude/rules/agent-authority.mdAtualizar (adicionar autoridades mkt)
Verificacao
Confirmar que docs/marketing/brief.md foi criado antes de acionar o squad-creator (Passo 0) Confirmar que *create-squad foi executado com a flag --from-design (Passo 2) Confirmar que squads/marketing/squad.yaml contem slashPrefix: marketing (Passo 3) Executar *validate-squad marketing --strict e garantir zero erros antes de tocar no CLAUDE.md (Passo 6) Invocar /marketing e verificar se o fluxo de 5 fases executa corretamente (Passo 8) Verificar que /gestor continua funcionando normalmente (sem conflitos) Confirmar que acoes humanas sao sinalizadas corretamente no briefing Verificar leitura cruzada de estado (marketing le LAUNCH-TRACK, gestor le MARKETING-TRACK)

