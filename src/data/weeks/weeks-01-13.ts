// DoceGestar — Semanas 1–13 (1º Trimestre)
// Conteúdo baseado no PRD e fontes médicas referenciadas (PRD seção 6)

import type { WeekContent } from '../../types';
import { CARE_BASE, CARE_T1 } from '../shared/care';
import { NUTRIENTS_T1 } from '../shared/nutrients';
import { getExamsForWeek } from '../shared/exams';

const careT1 = [...CARE_BASE, ...CARE_T1];

export const weeks01to13: WeekContent[] = [
  // ─────────────────────────────────────────────
  // SEMANA 1
  // ─────────────────────────────────────────────
  {
    weekNumber: 1,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: 'Microscópico',
      weightG: '< 1g',
      comparison: 'Aglomerado de células',
      heartbeatBpm: '—',
      milestones: [
        'FSH em ação — o hormônio folículo-estimulante inicia a maturação do óvulo dominante',
        'Renovação do endométrio — o útero descama o revestimento anterior e constrói nova camada receptiva',
        'Estrogênio em ascensão — os níveis sobem progressivamente, estimulando o espessamento do endométrio',
        'Óvulo se formando — um folículo cresce e protege o óvulo que será liberado na ovulação (semana 2)',
        'O sexo do bebê será definido na fecundação: cromossomo X do óvulo + X ou Y do espermatozoide',
      ],
      clinicalMilestone: 'O corpo se prepara para a gestação: o óvulo amadurece e o útero renova o endométrio.',
    },
    symptoms: [
      'Sangramento menstrual — a menstruação segue seu ciclo na semana 1',
      'Cólicas uterinas — contrações leves para descamar o endométrio',
      'Sensibilidade emocional — flutuações de humor pela queda de progesterona',
      'Cansaço e sonolência — hormônios em transição geram baixa energia',
      'Seios sensíveis — alterações hormonais causam desconforto mamário leve',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(1),
    curiosities: [
      'A semana 1 é contada a partir do primeiro dia da última menstruação (DUM) — padrão internacional',
      'A fecundação geralmente ocorre na semana 2 ou 3; ainda não há embrião formado agora',
      'Cada cuidado tomado antes da fecundação já faz parte da história do bebê',
    ],
    weeklyTip: 'Comece a tomar ácido fólico agora, se ainda não iniciou — ele protege o desenvolvimento do sistema nervoso do bebê.',
    motivationalPhrase: 'A jornada mais bonita da sua vida está começando. O primeiro passo já foi dado. 🌱',
    weeklyChecklist: [
      'Confirmar a DUM com seu médico',
      'Iniciar ácido fólico (400–800 mcg/dia)',
      'Agendar a primeira consulta pré-natal',
      'Informar o médico sobre medicamentos em uso',
      'Eliminar álcool, tabaco e substâncias prejudiciais',
      'Adotar hábitos saudáveis: alimentação, hidratação e sono',
    ],
    warningSignals: [
      { description: 'Sangramento fora do padrão menstrual (intenso ou com coágulos)', severity: 'urgent' },
      { description: 'Dor pélvica intensa e unilateral', severity: 'urgent' },
      { description: 'Febre acima de 38°C', severity: 'urgent' },
      { description: 'Sintomas de infecção urinária (ardência, urgência, dor pélvica)', severity: 'monitor' },
    ],
  },

  // ─────────────────────────────────────────────
  // SEMANA 2
  // ─────────────────────────────────────────────
  {
    weekNumber: 2,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: 'Microscópico',
      weightG: '< 1g',
      comparison: 'Aglomerado de células',
      heartbeatBpm: '—',
      milestones: [
        'LH em pico — o hormônio luteinizante dispara, sinalizando ao ovário para liberar o óvulo maduro',
        'Ovulação — o folículo dominante se rompe e libera o óvulo, fértil por 12–24 horas',
        'Fecundação — um espermatozoide une-se ao óvulo, formando o zigoto com 46 cromossomos únicos',
        'Zigoto em divisão — 1 → 2 → 4 → 8 → 16 células (mórula) enquanto viaja pelas trompas',
        'Em direção ao útero — o embrião microscópico chega ao útero ao final da semana como blástula',
      ],
      clinicalMilestone: 'Ovulação e fecundação: o óvulo encontra o espermatozoide e forma o zigoto, com os 46 cromossomos do bebê.',
    },
    symptoms: [
      'Muco cervical elástico e transparente — sinal clássico da ovulação (semelhante a clara de ovo)',
      'Dor ovulatória (Mittelschmerz) — desconforto pélvico leve e unilateral que passa em horas',
      'Aumento sutil da temperatura basal — progesterona do corpo lúteo eleva levemente a temperatura',
      'Spotting de ovulação — sangramento leve rosado ou acastanhado pode ocorrer na ovulação',
      'Aumento do desejo sexual — pico de estrogênio e LH eleva naturalmente a libido',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(2),
    curiosities: [
      'No momento da fecundação, já está definido se será menino ou menina: espermatozoide X (menina) ou Y (menino)',
      'O zigoto tem apenas 0,1 mm — microscópico — mas carrega todo o DNA de um novo ser humano único',
      'As primeiras divisões celulares ocorrem sem que as células cresçam: elas se dividem em partes menores (clivagem)',
    ],
    weeklyTip: 'Monitore os sinais de ovulação (muco elástico, leve cólica) e mantenha o ácido fólico: a proteção começa antes da confirmação da gravidez.',
    motivationalPhrase: 'O encontro mais extraordinário pode estar acontecendo agora — silencioso, mas cheio de vida. 🌸',
    weeklyChecklist: [
      'Manter ácido fólico (400–800 mcg/dia)',
      'Eliminar álcool e tabaco completamente',
      'Monitorar sinais de ovulação (muco cervical, temperatura basal)',
      'Manter alimentação equilibrada e hidratação',
      'Evitar medicamentos sem prescrição (especialmente anti-inflamatórios)',
      'Dormir bem e reduzir o estresse',
    ],
    warningSignals: [
      { description: 'Dor pélvica intensa e persistente (além da Mittelschmerz leve)', severity: 'urgent' },
      { description: 'Sangramento abundante fora do período menstrual', severity: 'urgent' },
      { description: 'Dor unilateral aguda com irradiação (possível torção ovariana)', severity: 'urgent' },
      { description: 'Febre alta associada a dor pélvica (possível infecção pélvica)', severity: 'urgent' },
    ],
  },

  // ─────────────────────────────────────────────
  // SEMANA 3
  // ─────────────────────────────────────────────
  {
    weekNumber: 3,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: 'Microscópico',
      weightG: '< 1g',
      comparison: 'Grão de areia',
      heartbeatBpm: '—',
      milestones: [
        'Chegada ao útero — a blástula (embrião com ~100 células) chega ao útero após viagem pelas trompas',
        'Implantação (nidação) — o trofoblasto ancora-se no endométrio e inicia conexão com vasos maternos',
        'Duas camadas celulares — trofoblasto (futuro placenta) e massa celular interna (futuro bebê)',
        'Beta-hCG em produção — logo após a implantação, o hormônio da gravidez começa a ser secretado',
        'Progesterona mantém o endométrio — o corpo lúteo impede a menstruação e protege o embrião',
      ],
      clinicalMilestone: 'Início da diferenciação celular; o disco embrionário começa a se formar.',
    },
    symptoms: [
      'Sangramento de implantação — spotting rosado ou marrom, muito leve, dura 1–3 dias',
      'Cólica de implantação — desconforto pélvico suave, semelhante a cólica menstrual leve',
      'Temperatura basal elevada — progesterona mantém temperatura 0,2–0,5°C acima do normal',
      'Cansaço e sonolência — progesterona em ascensão provoca sensação de cansaço incomum',
      'Seios levemente sensíveis — progesterona e início do hCG causam discreta sensibilidade mamária',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(3),
    curiosities: [
      'O beta-hCG é o hormônio detectado nos testes de gravidez — começa a ser produzido logo após a implantação',
      'A implantação ocorre entre os dias 6 e 10 após a fecundação — o embrião "escolhe" o ponto ideal do endométrio',
      'O sangramento de implantação é muito diferente da menstruação: rosado, levíssimo e com duração de 1–3 dias',
    ],
    weeklyTip: 'Se notar spotting leve e suspeitar de gravidez, anote e aguarde: o teste ficará positivo na semana 4, quando o hCG já é detectável.',
    motivationalPhrase: 'Uma nova vida se ancora em você. O lar foi encontrado. 🌱',
    weeklyChecklist: [
      'Manter ácido fólico (400–800 mcg/dia)',
      'Eliminar álcool, tabaco e cafeína em excesso',
      'Anotar qualquer spotting ou cólica incomum para relatar ao médico',
      'Planejar o teste de gravidez para a semana 4',
      'Evitar medicamentos sem avaliação médica',
      'Descansar bem e manter hidratação adequada',
    ],
    warningSignals: [
      { description: 'Sangramento abundante (similar à menstruação) com cólica forte', severity: 'urgent' },
      { description: 'Dor pélvica aguda e unilateral (possível gravidez ectópica)', severity: 'urgent' },
      { description: 'Dor abdominal intensa com tontura ou desmaio (emergência — trompa rompida)', severity: 'urgent' },
      { description: 'Febre acima de 38°C', severity: 'urgent' },
    ],
  },

  // ─────────────────────────────────────────────
  // SEMANA 4
  // ─────────────────────────────────────────────
  {
    weekNumber: 4,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: 'Microscópico',
      weightG: '< 1g',
      comparison: 'Semente de papoula',
      heartbeatBpm: '—',
      milestones: [
        'Gastrulação — o embrião forma três camadas (ectoderme, mesoderme, endoderme): o projeto completo do corpo humano',
        'Início do tubo neural — a ectoderme começa a dobrar para formar o cérebro e a medula espinhal (fecha até a semana 6)',
        'Tubo cardíaco primitivo — a mesoderme esboça o coração; ainda não bate, mas já se organiza',
        'Saco amniótico e córion — o embrião está protegido pelo âmnio e pelo córion com vilosidades ancoradas no endométrio',
        'Beta-hCG detectável — o hCG já é alto o suficiente para o teste de farmácia ficar positivo',
      ],
      clinicalMilestone: 'O embrião se implantou completamente; o coração primitivo começa a se estruturar.',
    },
    symptoms: [
      'Náuseas leves — o hCG em ascensão começa a provocar enjoos, especialmente pela manhã',
      'Cansaço intenso — progesterona elevada tem efeito sedativo; sonolência fora do comum é normal',
      'Seios sensíveis e pesados — estrogênio e progesterona estimulam as glândulas mamárias',
      'Aumento da frequência urinária — hCG estimula os rins e o útero em expansão pressiona a bexiga',
      'Temperatura basal elevada — progesterona mantém a temperatura corporal acima do normal',
      'Sensibilidade emocional — flutuações hormonais aumentam a labilidade emocional',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(4),
    curiosities: [
      'A gastrulação organiza o embrião em três camadas: ectoderme (pele e sistema nervoso), mesoderme (coração, músculos, ossos) e endoderme (pulmões e digestivo)',
      'A maioria das mulheres descobre a gravidez nesta semana — o teste fica positivo quando o hCG já é detectável',
      'O tubo neural está se formando agora: é a janela mais crítica para o ácido fólico prevenir defeitos como espinha bífida',
    ],
    weeklyTip: 'O tubo neural está se fechando esta semana — o ácido fólico (400–800 mcg/dia) é a proteção mais importante agora.',
    motivationalPhrase: 'Do menor dos começos nascem as maiores histórias. A sua está apenas começando. 🌱',
    weeklyChecklist: [
      'Manter ácido fólico (400–800 mcg/dia) — janela crítica do tubo neural',
      'Agendar a primeira consulta pré-natal (semana 6–8)',
      'Fazer o teste de gravidez se ainda não fez (primeira urina da manhã)',
      'Eliminar álcool, tabaco e cafeína em excesso',
      'Evitar medicamentos sem avaliação médica',
      'Descansar e respeitar o cansaço intenso',
    ],
    warningSignals: [
      { description: 'Sangramento intenso com cólica forte (diferente do spotting de implantação)', severity: 'urgent' },
      { description: 'Dor pélvica unilateral aguda (possível gravidez ectópica — emergência)', severity: 'urgent' },
      { description: 'Dor abdominal com tontura ou desmaio (possível ruptura de trompa — pronto-socorro imediato)', severity: 'urgent' },
      { description: 'Febre acima de 38°C', severity: 'urgent' },
    ],
  },

  // ─────────────────────────────────────────────
  // SEMANA 5
  // ─────────────────────────────────────────────
  {
    weekNumber: 5,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: 'Microscópico',
      weightG: '< 1g',
      comparison: 'Semente de gergelim',
      heartbeatBpm: '80–100 bpm',
      milestones: [
        'Primeiros batimentos cardíacos — o tubo cardíaco primitivo começa a contrair: 80–100 bpm',
        'Três vesículas cerebrais — prosencéfalo, mesencéfalo e rombencéfalo: a estrutura do SNC está traçada',
        'Primeiros brotos de membros — protuberâncias laterais sinalizam onde serão braços e pernas',
        'Olhos e ouvidos em formação — placas ópticas e fossetas auditivas começam a se diferenciar',
        'Tubo digestivo primitivo — esôfago, estômago e intestinos em formação a partir da endoderme',
        'Placenta em desenvolvimento — vilosidades coriônicas assumindo progressivamente a produção hormonal',
      ],
      clinicalMilestone: 'Surgem os primeiros segmentos corporais; a espinha dorsal e o cérebro primitivo começam a se formar.',
    },
    symptoms: [
      'Náuseas e vômitos — enjoo matinal clássico (pode ocorrer a qualquer hora): efeito direto do hCG',
      'Fadiga severa — progesterona em alta tem efeito sedativo intenso; dormir muito e ainda sentir cansaço é normal',
      'Seios muito sensíveis — dor mamária intensa: estrogênio expande ductos, progesterona expande alvéolos',
      'Aversão a cheiros e sabores — hiperosmia gestacional: olfato hiperagudo que pode provocar náusea',
      'Frequência urinária aumentada — hCG estimula os rins; útero em crescimento pressiona a bexiga',
      'Salivação excessiva (ptialismo) — afeta até 70% das gestantes no 1º trimestre',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(5),
    curiosities: [
      'O coração do bebê pode ser detectado no ultrassom transvaginal a partir desta semana — geralmente visível na semana 6 ou 7',
      'O embrião cresce cerca de 1 mm por dia nesta fase — um ritmo de crescimento extraordinário',
      'Os primeiros batimentos são irregulares e vão se acelerar nas próximas semanas, chegando a 170–180 bpm',
    ],
    weeklyTip: 'Náuseas intensas? Coma um biscoito de água antes de se levantar da cama e faça refeições pequenas a cada 2–3h — estômago vazio piora o enjoo.',
    motivationalPhrase: 'Hoje, pela primeira vez, um coraçãozinho começou a bater por você. 💓',
    weeklyChecklist: [
      'Manter ácido fólico (400–800 mcg/dia) — tubo neural ainda em fechamento',
      'Agendar primeira consulta pré-natal se ainda não agendou (semana 6–8)',
      'Estratégia anti-náusea: refeições pequenas e frequentes + biscoito antes de levantar',
      'Conversar com médico sobre vitamina B6 para náuseas (25 mg 3x/dia)',
      'Eliminar álcool e tabaco completamente',
      'Descansar sem culpa — a fadiga intensa é fisiológica',
    ],
    warningSignals: [
      { description: 'Vômitos incoercíveis — incapacidade de manter alimento ou líquido por mais de 24h (hiperemese gravídica)', severity: 'urgent' },
      { description: 'Sangramento com cólica além de spotting leve — pode indicar ameaça de aborto ou gravidez ectópica', severity: 'urgent' },
      { description: 'Dor pélvica unilateral intensa com sangramento — emergência: descartar gravidez ectópica', severity: 'urgent' },
      { description: 'Febre acima de 38°C', severity: 'urgent' },
    ],
  },

  // ─────────────────────────────────────────────
  // SEMANA 6
  // ─────────────────────────────────────────────
  {
    weekNumber: 6,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: '~0,6 cm',
      weightG: '~1,5g',
      comparison: 'Lentilha',
      heartbeatBpm: '100–130 bpm',
      milestones: [
        '❤️ Batimento cardíaco visível — 100–130 bpm detectáveis no ultrassom transvaginal',
        '🧠 Três vesículas cerebrais distintas — prosencéfalo, mesencéfalo e rombencéfalo diferenciados',
        '👃 Fossinhas nasais — depressões que esboçam o nariz; maxilar inferior começa a se projetar',
        '👁️ Placas ópticas mais definidas — futuros olhos protuberantes nas laterais da cabeça',
        '🦾 Brotos de membros em forma de remo — braços e pernas como pequenas pás ainda sem dedos',
        '🌡️ Fígado, pâncreas e tireóide em formação — diferenciação dos órgãos a partir da endoderme',
      ],
      clinicalMilestone: 'O coração começa a bater, cerca de 110 bpm; início de olhos, nariz e ouvidos.',
    },
    symptoms: [
      '🤢 Náuseas e vômitos — podem piorar com o aumento do hCG; enjoos a qualquer hora do dia',
      '😴 Fadiga intensa — progesterona com efeito sedativo; sonolência diurna é fisiológica',
      '👃 Hiperosmia — olfato hiperagudizado transforma cheiros em gatilhos de náusea',
      '🩺 Seios sensíveis e pesados — dor, ardência e aumento de volume pelo estrogênio',
      '🚻 Urgência urinária — hCG estimula os rins; útero pressiona a bexiga',
      '💧 Salivação excessiva (ptialismo) — produção aumentada de saliva típica do 1º trimestre',
      '🌪️ Tontura e vertigem leve — queda da pressão e aumento do volume sanguíneo',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(6),
    curiosities: [
      'O batimento cardíaco do embrião acelera progressivamente: 80–100 bpm (S5) → 100–130 bpm (S6) → 170–180 bpm (S9–10)',
      'O rosto humano é formado por 5 estruturas distintas que se fundem — qualquer falha nessa fusão origina fissuras labiais ou palatinas',
      'O embrião na semana 6 já faz movimentos espontâneos microscópicos — você não sente, mas ele se move',
    ],
    weeklyTip: 'Agende o ultrassom transvaginal se ainda não fez — a semana 6 é quando o batimento cardíaco costuma ser detectado pela primeira vez.',
    motivationalPhrase: 'Um ponto pulsando na tela — pequeno demais para o mundo, grande demais para ignorar. 💓',
    weeklyChecklist: [
      'Agendar ultrassom transvaginal (confirmação do batimento)',
      'Manter ácido fólico (400–800 mcg/dia)',
      'Estratégia anti-náusea: refeições pequenas e frequentes + biscoito antes de levantar',
      'Conversar com médico sobre vitamina B6 para náuseas (25 mg até 3×/dia)',
      'Eliminar álcool, tabaco e cafeína acima de 200 mg/dia',
      'Descansar — a fadiga intensa é fisiológica nesta fase',
      'Anotar sintomas para levar à consulta pré-natal',
    ],
    warningSignals: [
      { description: 'Ausência de batimento no ultrassom após semana 6+2 dias (embrião visível sem batimento)', severity: 'urgent' },
      { description: 'Sangramento vermelho vivo com cólica — ameaça de aborto ou ectópica', severity: 'urgent' },
      { description: 'Dor pélvica unilateral intensa com sangramento — emergência (descartar ectópica)', severity: 'urgent' },
      { description: 'Vômitos incoercíveis — incapacidade de manter líquidos por mais de 24h (hiperemese)', severity: 'urgent' },
    ],
  },

  // ─────────────────────────────────────────────
  // SEMANA 7
  // ─────────────────────────────────────────────
  {
    weekNumber: 7,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: '~1 cm',
      weightG: '~3g',
      comparison: 'Mirtilo',
      heartbeatBpm: '120–160 bpm',
      milestones: [
        'O embrião tem o dobro do tamanho da semana passada',
        'Dedos das mãos começam a se formar',
        'O cérebro cresce rapidamente — mais de 100 neurônios por minuto',
        'Os rins primitivos estão em desenvolvimento',
        'A língua e o palato começam a se formar',
        'Os olhos ganham pigmentação',
        'O fígado já produz células sanguíneas',
      ],
      clinicalMilestone: 'Cérebro em crescimento acelerado; brotos de braços e pernas surgem.',
    },
    symptoms: [
      'Enjoos e náusea',
      'Cansaço e sonolência',
      'Seios sensíveis e inchados',
      'Aversão a cheiros',
      'Constipação',
      'Salivação excessiva',
      'Tontura',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(7),
    curiosities: [
      'O cérebro do bebê cresce tão rápido que o crânio não consegue acompanhar — por isso a cabeça parece desproporcional',
      'O embrião já faz movimentos espontâneos, mas você ainda não consegue sentir',
      'Os rins já filtram pequenas quantidades de fluido',
    ],
    weeklyTip: 'Cansaço extremo é normal nessa fase — o seu corpo está trabalhando incrivelmente duro. Durma quando puder sem culpa.',
    motivationalPhrase: 'Seu corpo é um milagre em tempo real. Cuide-se com amor.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 8
  // ─────────────────────────────────────────────
  {
    weekNumber: 8,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: '~1,6 cm',
      weightG: '~1g',
      comparison: 'Framboesa',
      heartbeatBpm: '150–170 bpm',
      milestones: [
        'Última semana de embrião — da semana 9 em diante passa a ser chamado de feto',
        'Dedos das mãos e pés visíveis, ainda unidos por membranas finas',
        'Cotovelos funcionais — os braços já dobram e o embrião faz movimentos espontâneos',
        'Cauda embrionária desaparece completamente (apoptose programada)',
        'Dentes de leite em formação — as cristas dentárias dos 20 dentes já aparecem na gengiva',
        'Pálpebras se fechando — permanecerão fundidas até a semana 26–28',
        'Todos os órgãos principais formados, agora entram em fase de amadurecimento',
      ],
      clinicalMilestone: 'Dedos das mãos e pés em formação; rabo embrionário desaparece; órgãos principais esboçados.',
    },
    symptoms: [
      'Náuseas intensas — pico do hCG e estômago lento pela progesterona',
      'Fadiga extrema e sonolência diurna',
      'Azia e refluxo — esfíncter esofágico relaxado pela progesterona',
      'Constipação — intestino lento pelo hormônio',
      'Urgência urinária crescente — útero do tamanho de um limão pressionando a bexiga',
      'Hiperosmia intensa — aversão a cheiros antes neutros',
      'Hipersensibilidade emocional e choros espontâneos',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(8),
    curiosities: [
      'Esta é a última semana chamada de "embrião" — a partir da semana 9 passa a ser "feto"',
      'Os dentes de leite que seu filho vai ter já estão sendo formados agora, em miniatura',
      'A cauda vestigial que o embrião tinha nas semanas anteriores desaparece completamente nesta semana',
    ],
    weeklyTip: 'Gengibre, biscoito de água antes de levantar e refeições pequenas a cada 2–3 horas são as estratégias mais eficazes contra as náuseas do pico do 1º trimestre.',
    motivationalPhrase: 'Oito semanas de amor incondicional. A fase de criar os órgãos está encerrada — agora é crescer. 🍓',
    weeklyChecklist: [
      'Agendar (ou confirmar) a primeira consulta pré-natal',
      'Manter ácido fólico (400–800 mcg/dia) sem interrupção',
      'Solicitar exames de rotina do 1º trimestre ao médico',
      'Testar estratégias anti-enjoo: gengibre, biscoito de água, refeições pequenas',
      'Hidratar-se ao longo do dia em pequenos volumes',
      'Eliminar álcool, tabaco, cafeína acima de 200 mg/dia e automedicação',
    ],
    warningSignals: [
      { description: 'Vômitos incessantes por mais de 24h sem conseguir ingerir nada (hiperemese)', severity: 'urgent' },
      { description: 'Sangramento vermelho vivo com cólica', severity: 'urgent' },
      { description: 'Dor pélvica unilateral intensa com sangramento — descartar ectópica', severity: 'urgent' },
      { description: 'Febre acima de 38°C', severity: 'urgent' },
      { description: 'Ausência de batimentos no ultrassom após semana 8', severity: 'urgent' },
    ],
  },

  // ─────────────────────────────────────────────
  // SEMANA 9
  // ─────────────────────────────────────────────
  {
    weekNumber: 9,
    trimester: 1,
    baby: {
      stage: 'feto',
      sizeCm: '~2,3 cm',
      weightG: '~2g',
      comparison: 'Uva',
      heartbeatBpm: '170–180 bpm',
      milestones: [
        'Primeira semana como feto — a fase de construção dos órgãos está encerrada',
        'Dedos separados — as membranas entre os dígitos foram absorvidas; unhas primitivas aparecem',
        'Pico cardíaco — 170–180 bpm, o mais rápido de toda a gestação',
        'Tireoide em ação — produz T3 e T4 próprios, essenciais para metabolismo e neurodesenvolvimento',
        'Impressões digitais únicas se formando nas pontas dos dedos',
        'Cordas vocais em construção — a laringe se desenvolve',
        'Rosto com proporções reconhecíveis — olhos na posição frontal, nariz definido, orelhas externas',
      ],
      clinicalMilestone: 'Folículos pilosos e dentes de leite em formação; início de movimentos espontâneos.',
    },
    symptoms: [
      'Náuseas — início do declínio gradual à medida que o hCG começa a cair',
      'Fadiga — persiste, pode começar a aliviar levemente',
      'Azia e refluxo — esfíncter esofágico relaxado pela progesterona',
      'Urgência urinária — útero do tamanho de uma laranja pequena',
      'Dores de cabeça — combinação de alterações hormonais, vasodilatação e desidratação',
      'Salivação excessiva (ptialismo) — fenômeno hormonal temporário',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(9),
    curiosities: [
      'A transição de embrião para feto marca o fim do período mais crítico de formação dos órgãos',
      'O feto já tem impressões digitais únicas — nenhuma outra pessoa no mundo terá as mesmas',
      'O batimento cardíaco desta semana (170–180 bpm) é o pico de toda a gestação — só diminui a partir daqui',
    ],
    weeklyTip: 'Comer algo pequeno a cada 2 horas — proteína + carboidrato complexo — estabiliza o açúcar no sangue e é a estratégia mais eficaz contra as náuseas do 1º trimestre.',
    motivationalPhrase: 'Ele é um feto agora — pequeno, com dedos separados e impressões digitais únicas. Absolutamente seu. 🍇',
    weeklyChecklist: [
      'Manter ácido fólico (400–800 mcg/dia) e confirmar com médico sobre ferro',
      'Agendar ultrassom morfológico do 1º trimestre (semanas 11–14)',
      'Manter refeições pequenas a cada 2–3 horas para controlar náuseas',
      'Hidratar-se bem — desidratação piora dores de cabeça',
      'Iniciar exercício leve regular (caminhada 30 min)',
      'Eliminar álcool, tabaco, AINEs e cafeína acima de 200 mg/dia',
    ],
    warningSignals: [
      { description: 'Sangramento vermelho vivo com cólica', severity: 'urgent' },
      { description: 'Vômitos incessantes por mais de 24h sem conseguir ingerir nada', severity: 'urgent' },
      { description: 'Dor pélvica unilateral intensa — descartar ectópica', severity: 'urgent' },
      { description: 'Febre acima de 38°C', severity: 'urgent' },
      { description: 'Dor de cabeça intensa e persistente que não cede com paracetamol', severity: 'monitor' },
    ],
  },

  // ─────────────────────────────────────────────
  // SEMANA 10
  // ─────────────────────────────────────────────
  {
    weekNumber: 10,
    trimester: 1,
    baby: {
      stage: 'feto',
      sizeCm: '~3,1 cm',
      weightG: '~4g',
      comparison: 'Morango',
      heartbeatBpm: '150–170 bpm',
      milestones: [
        'Intestino retorna ao abdômen — a hérnia fisiológica umbilical se reduz e a cavidade abdominal se fecha',
        'Unhas em crescimento — surgem sobre os dígitos das mãos e dos pés',
        'Dentes de leite com posição definida — 20 germes dentários na maxila e mandíbula, mineralização iniciando',
        'Cérebro em expansão explosiva — ~250.000 neurônios formados por minuto nesta fase',
        'Diafragma se formando — a cúpula muscular que separará tórax de abdômen está em construção',
        'Papilas gustativas emergentes — primeiras estruturas do paladar aparecem na língua',
        'Movimentos espontâneos dos membros — visíveis no ultrassom, ainda imperceptíveis para a mãe',
      ],
      clinicalMilestone: 'Transição da cartilagem para osso; início de crescimento de unhas.',
    },
    symptoms: [
      'Náuseas — início do declínio gradual para muitas gestantes (hCG perto do pico)',
      'Fadiga intensa — placenta ainda não assumiu completamente a função hormonal',
      'Azia e refluxo — progesterona relaxa o esfíncter esofágico',
      'Urgência urinária — útero crescendo comprime a bexiga',
      'Palpitações e coração acelerado — volume sanguíneo materno aumentou ~20%',
      'Tontura e hipotensão ortostática ao levantar rápido',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(10),
    curiosities: [
      'O intestino do feto passa semanas fora do abdômen protegido no cordão umbilical — e retorna na semana 10',
      'O cérebro fetal produz ~250.000 neurônios por minuto nesta fase de crescimento explosivo',
      'Os 20 dentes de leite já têm posição definida na gengiva — e vão nascer meses após o parto',
    ],
    weeklyTip: 'Gengibre (cápsulas, chá ou biscoito) e vitamina B6 têm evidência científica de redução de náuseas na gestação — converse com seu médico sobre as doses.',
    motivationalPhrase: 'Ele tem 3 cm, unhas crescendo e 250.000 neurônios formados por minuto. Tudo isso acontece enquanto você respira. 🍓',
    weeklyChecklist: [
      'Agendar ultrassom morfológico do 1º trimestre (janela: semanas 11–14)',
      'Confirmar suplementação: ácido fólico + ferro (se indicado) + DHA',
      'Manter refeições pequenas a cada 2–3 horas para controlar náuseas',
      'Ingerir 2–3 L de água por dia',
      'Praticar exercício leve (caminhada 20–30 min)',
      'Eliminar álcool, tabaco e AINEs',
    ],
    warningSignals: [
      { description: 'Sangramento vermelho vivo com cólica', severity: 'urgent' },
      { description: 'Vômitos por mais de 24h sem conseguir ingerir nada', severity: 'urgent' },
      { description: 'Dor pélvica intensa unilateral — descartar ectópica', severity: 'urgent' },
      { description: 'Febre acima de 38°C', severity: 'urgent' },
      { description: 'Dor abdominal intensa e persistente', severity: 'urgent' },
    ],
  },

  // ─────────────────────────────────────────────
  // SEMANA 11
  // ─────────────────────────────────────────────
  {
    weekNumber: 11,
    trimester: 1,
    baby: {
      stage: 'feto',
      sizeCm: '~4,1 cm',
      weightG: '~7g',
      comparison: 'Figo',
      heartbeatBpm: '150–165 bpm',
      milestones: [
        'O feto abre e fecha as mãos',
        'Os genitais externos começam a se diferenciar',
        'O diafragma está se formando',
        'Os folículos capilares aparecem',
        'O feto pode bocejar e sugar o polegar',
        'O sistema linfático começa a se desenvolver',
        'Os ossos estão endurecendo (ossificação)',
      ],
      clinicalMilestone: 'Sistema digestivo totalmente formado; o bebê já chuta, mas a mãe ainda não sente.',
    },
    symptoms: [
      'Enjoos e náusea',
      'Cansaço e sonolência',
      'Constipação',
      'Barriga começando a ficar visível',
      'Seios sensíveis e inchados',
      'Azia',
      'Tontura',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(11),
    curiosities: [
      'O sexo do bebê pode ser identificado no ultrassom a partir dessa semana',
      'O bebê já pratica sugar o polegar — um reflexo que usará ao nascer',
      'O bocejar do bebê é um dos primeiros comportamentos reconhecíveis visíveis no ultrassom',
    ],
    weeklyTip: 'O ultrassom de translucência nucal (11–13 semanas) é um exame importante — não perca essa janela.',
    motivationalPhrase: 'Ele já abre as mãozinhas — como se estivesse esperando para segurar a sua.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 12
  // ─────────────────────────────────────────────
  {
    weekNumber: 12,
    trimester: 1,
    baby: {
      stage: 'feto',
      sizeCm: '~5,4 cm',
      weightG: '~14g',
      comparison: 'Ameixa',
      heartbeatBpm: '150–165 bpm',
      milestones: [
        'Os reflexos são mais complexos — reage ao toque',
        'Os rins produzem urina que é liberada no líquido amniótico',
        'Os intestinos voltam para a cavidade abdominal (saíam para o cordão umbilical)',
        'O sistema nervoso central está mais desenvolvido',
        'As digitais estão completamente formadas',
        'O feto consegue dobrar os dedos',
        'A medula óssea começa a produzir glóbulos brancos',
      ],
      clinicalMilestone: 'Reflexos de sucção e deglutição ativos; fim da fase crítica de organogênese.',
    },
    symptoms: [
      'Enjoos e náusea',
      'Cansaço e sonolência',
      'Barriga começando a ficar visível',
      'Constipação',
      'Azia',
      'Aversão a cheiros',
      'Seios sensíveis e inchados',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(12),
    curiosities: [
      'A partir dessa semana, os intestinos do bebê passam a funcionar dentro da barriga — antes estavam no cordão umbilical!',
      'O feto já tem digitais únicas — impossíveis de encontrar em qualquer outro ser humano',
      'O risco de aborto cai significativamente após as 12 semanas',
    ],
    weeklyTip: 'O fim do primeiro trimestre está próximo! Muitas mães escolhem essa semana para compartilhar a notícia com familiares e amigos.',
    motivationalPhrase: 'Doze semanas de milagres silenciosos. Você está fazendo algo extraordinário.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 13
  // ─────────────────────────────────────────────
  {
    weekNumber: 13,
    trimester: 1,
    baby: {
      stage: 'feto',
      sizeCm: '~7,4 cm',
      weightG: '~23g',
      comparison: 'Pêssego',
      heartbeatBpm: '150–160 bpm',
      milestones: [
        'Final do primeiro trimestre — fase mais crítica concluída',
        'O feto tem proporções mais parecidas com um bebê recém-nascido',
        'Os ossos da cabeça estão se formando',
        'O feto consegue fazer careta',
        'O pâncreas produz insulina',
        'As cordas vocais estão completamente formadas',
        'O feto pode sugar e engolir ativamente',
      ],
      clinicalMilestone: 'Impressões digitais únicas surgem; cordas vocais em formação; fim do 1º trimestre.',
    },
    symptoms: [
      'Enjoos e náusea',
      'Cansaço e sonolência',
      'Barriga começando a ficar visível',
      'Constipação',
      'Tontura',
      'Seios sensíveis e inchados',
      'Sensibilidade emocional',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(13),
    curiosities: [
      'O primeiro trimestre termina nessa semana — você superou a fase de maior risco!',
      'As náuseas geralmente começam a diminuir a partir da 13ª semana para a maioria das gestantes',
      'O bebê pode fazer caretas no útero — mas você ainda não consegue sentir',
    ],
    weeklyTip: 'Com o primeiro trimestre concluído, hora de celebrar! O risco de aborto cai significativamente e a energia costuma voltar em breve.',
    motivationalPhrase: 'Primeiro trimestre concluído! Você e seu bebê são mais fortes do que imagina. 💪',
  },
];
