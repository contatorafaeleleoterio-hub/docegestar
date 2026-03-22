// DoceGestar — Semanas 14–27 (2º Trimestre)
// Conteúdo baseado no PRD e fontes médicas referenciadas (PRD seção 6)

import type { WeekContent } from '../../types';
import { CARE_BASE, CARE_T2 } from '../shared/care';
import { NUTRIENTS_T2 } from '../shared/nutrients';
import { getExamsForWeek } from '../shared/exams';

const careT2 = [...CARE_BASE, ...CARE_T2];

export const weeks14to27: WeekContent[] = [
  // ─────────────────────────────────────────────
  // SEMANA 14
  // ─────────────────────────────────────────────
  {
    weekNumber: 14,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~8,7 cm',
      weightG: '~43g',
      comparison: 'Limão siciliano',
      heartbeatBpm: '145–160 bpm',
      milestones: [
        'O feto consegue fazer expressões faciais',
        'Os rins produzem urina de forma regular',
        'A tireoide começa a produzir hormônios de forma autônoma',
        'O feto pode sucionar o polegar e fazer movimentos de rolar',
        'Os pelos finos (lanugo) começam a cobrir o corpo',
        'O sistema imunológico primitivo está ativo',
      ],
    },
    symptoms: [
      'Dores nas costas',
      'Fome aumentada',
      'Congestão nasal',
      'Inchaço leve',
      'Câimbras nas pernas',
      'Dores no ligamento redondo',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(14),
    curiosities: [
      'Bem-vinda ao segundo trimestre — o "trimestre da lua de mel" da gravidez para muitas mamães!',
      'As náuseas geralmente diminuem agora e a energia retorna',
      'O bebê já tem pelos finíssimos por todo o corpo que ajudam na regulação de temperatura',
    ],
    weeklyTip: 'Com a energia voltando, este é o momento ideal para começar exercícios de pilates ou yoga para gestantes — ajudam nas dores e no parto.',
    motivationalPhrase: 'O segundo trimestre chegou trazendo mais leveza. Aproveite cada momento.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 15
  // ─────────────────────────────────────────────
  {
    weekNumber: 15,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~10,1 cm',
      weightG: '~70g',
      comparison: 'Maçã',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'O feto desenvolve reflexo de preensão (aperta tudo que toca)',
        'Os olhos respondem à luz, embora as pálpebras permaneçam fechadas',
        'As orelhas estão se movendo para a posição final',
        'O feto começa a desenvolver padrões de sono e vigília',
        'Os ossos estão mais rígidos (ossificação acelerada)',
        'O feto move os braços e pernas coordenadamente',
      ],
    },
    symptoms: [
      'Fome aumentada',
      'Dores nas costas',
      'Inchaço leve',
      'Câimbras nas pernas',
      'Congestão nasal',
      'Dores no ligamento redondo',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(15),
    curiosities: [
      'O bebê já tem padrões de sono — e pode estar dormindo muito enquanto você está acordada',
      'Os olhos do bebê respondem à luz mesmo fechados — tente iluminar sua barriga!',
      'O reflexo de preensão é tão forte que, ao nascer, o bebê consegue suspender seu próprio peso pelas mãos',
    ],
    weeklyTip: 'Comece a hidratar a barriga com óleo de amêndoas ou manteiga de karité para manter a pele elástica e prevenir estrias.',
    motivationalPhrase: 'Você carrega dentro de si alguém que já sonha e já sente o mundo.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 16
  // ─────────────────────────────────────────────
  {
    weekNumber: 16,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~11,6 cm',
      weightG: '~100g',
      comparison: 'Abacate',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'Os músculos estão mais fortes e os movimentos mais vigorosos',
        'O bebê pode ouvir sons externos — sua voz, músicas',
        'A pele é transparente, deixando os vasos sanguíneos visíveis',
        'As sobrancelhas e cílios começam a crescer',
        'O cordão umbilical é mais grosso e resistente',
        'O coração bombeia cerca de 25 litros de sangue por dia',
      ],
    },
    symptoms: [
      'Primeiros movimentos do bebê',
      'Fome aumentada',
      'Dores nas costas',
      'Inchaço leve',
      'Congestão nasal',
      'Câimbras nas pernas',
      'Falta de ar leve',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(16),
    curiosities: [
      'O bebê já consegue ouvir você! Fale, cante, leia histórias em voz alta para ele',
      'Muitas mamães sentem os primeiros movimentos entre as semanas 16 e 20',
      'O coraçãozinho já bombeia tanto sangue que é possível ouvi-lo com o estetoscópio do médico',
    ],
    weeklyTip: 'Comece a conversar e cantar para o bebê — ele já consegue ouvir e se acalmar com a sua voz.',
    motivationalPhrase: 'Sua voz é o primeiro amor que ele conhece. Fale para ele.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 17
  // ─────────────────────────────────────────────
  {
    weekNumber: 17,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~13 cm',
      weightG: '~140g',
      comparison: 'Pera',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'A gordura subcutânea começa a se acumular',
        'O feto desenvolve reflexo de engolir e piscar',
        'Os padrões de impressão digital estão completamente formados',
        'O sistema nervoso autônomo controla a frequência cardíaca',
        'O feto começa a regular sua própria temperatura',
        'Os ossos continuam a se ossificar e endurecer',
      ],
    },
    symptoms: [
      'Primeiros movimentos do bebê',
      'Fome aumentada',
      'Dores nas costas',
      'Sangramento gengival',
      'Linha nigra (linha escura no abdômen)',
      'Inchaço leve',
      'Câimbras nas pernas',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(17),
    curiosities: [
      'O bebê começa a acumular gordurinha — que vai mantê-lo aquecido ao nascer',
      'As impressões digitais únicas estão 100% formadas nessa semana',
      'O bebê pode ter soluços no útero — você pode sentir como pequenos espasmos rítmicos',
    ],
    weeklyTip: 'Sangramento gengival é normal na gravidez. Use fio dental diariamente e escova com cerdas macias para proteger a saúde bucal.',
    motivationalPhrase: 'Cada curva do seu corpo conta a história mais bonita do mundo.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 18
  // ─────────────────────────────────────────────
  {
    weekNumber: 18,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~14,2 cm',
      weightG: '~190g',
      comparison: 'Batata-doce',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'O feto pode ouvir sons externos com clareza',
        'Os movimentos são mais coordenados e perceptíveis',
        'O vernix caseoso (camada protetora branca) começa a cobrir a pele',
        'Os genitais externos estão completamente formados',
        'O feto boceja, se alonga e soluça regularmente',
        'O sistema nervoso continua se desenvolvendo rapidamente',
      ],
    },
    symptoms: [
      'Primeiros movimentos do bebê',
      'Fome aumentada',
      'Dores nas costas',
      'Linha nigra (linha escura no abdômen)',
      'Manchas na pele (melasma)',
      'Congestão nasal',
      'Inchaço leve',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(18),
    curiosities: [
      'O vernix é como um protetor solar natural que protege a pele delicada do bebê',
      'O ultrassom morfológico pode ser feito entre as semanas 18 e 22 — uma das consultas mais emocionantes!',
      'O bebê já tem seus próprios padrões de sono que podem não coincidir com os seus',
    ],
    weeklyTip: 'Use protetor solar diariamente para prevenir o melasma (manchas na pele). FPS 30 ou mais em áreas expostas.',
    motivationalPhrase: 'Seu bebê já ouve sua risada. Ria muito.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 19
  // ─────────────────────────────────────────────
  {
    weekNumber: 19,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~15,3 cm',
      weightG: '~240g',
      comparison: 'Manga',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'Última semana com medição CRL (cabeça-bumbum) — próxima semana mede comprimento total',
        'Os sentidos (paladar, tato, olfato, visão, audição) estão se desenvolvendo',
        'O cérebro está desenvolvendo áreas especializadas para cada sentido',
        'O feto pode reconhecer a voz da mãe entre outros sons',
        'As células nervosas que controlam os movimentos já estão conectadas',
        'O cabelo começa a aparecer na cabeça',
      ],
    },
    symptoms: [
      'Primeiros movimentos do bebê',
      'Dores no ligamento redondo',
      'Fome aumentada',
      'Manchas na pele (melasma)',
      'Falta de ar leve',
      'Dores nas costas',
      'Sangramento gengival',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(19),
    curiosities: [
      'Pesquisas mostram que bebês reconhecem a música que ouviram no útero após o nascimento',
      'Os cinco sentidos do bebê estão todos em desenvolvimento simultâneo nessa semana',
      'A partir da próxima semana, o bebê é medido de cabeça a pé — um marco simbólico do crescimento',
    ],
    weeklyTip: 'As dores no ligamento redondo (pontadas nos lados da barriga) são normais. Levante-se devagar e evite movimentos bruscos.',
    motivationalPhrase: 'Metade do caminho percorrido. Você está indo incrivelmente bem.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 20
  // ─────────────────────────────────────────────
  {
    weekNumber: 20,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~25,6 cm',
      weightG: '~300g',
      comparison: 'Banana',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'Metade da gestação — marco importantíssimo!',
        'Agora medido de cabeça a pé pela primeira vez',
        'O vernix caseoso cobre todo o corpo',
        'O feto engole líquido amniótico e produz mecônio',
        'Os movimentos são sentidos com mais clareza pela mamãe',
        'As sobrancelhas e cabelos estão visíveis no ultrassom',
        'O sistema imunológico está mais maduro',
      ],
    },
    symptoms: [
      'Primeiros movimentos do bebê',
      'Dores nas costas',
      'Fome aumentada',
      'Inchaço leve',
      'Linha nigra (linha escura no abdômen)',
      'Falta de ar leve',
      'Câimbras nas pernas',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(20),
    curiosities: [
      'Parabéns! Você chegou à metade da gestação — 20 semanas completas!',
      'O ultrassom morfológico nessa faixa mostra os órgãos do bebê em detalhes incríveis',
      'O bebê já engole cerca de meio litro de líquido amniótico por dia',
    ],
    weeklyTip: 'Registre a metade da gestação! Tire uma foto da barriga, escreva no diário — são memórias que você vai querer guardar.',
    motivationalPhrase: 'Metade da jornada, o dobro de amor. Você está radiante. ✨',
  },

  // ─────────────────────────────────────────────
  // SEMANA 21
  // ─────────────────────────────────────────────
  {
    weekNumber: 21,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~26,7 cm',
      weightG: '~360g',
      comparison: 'Cenoura',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'O feto desenvolve o sentido do tato — toca o próprio rosto e o cordão umbilical',
        'As sobrancelhas estão completamente formadas',
        'O bebê pratica movimentos de respiração com líquido amniótico',
        'Os intestinos absorvem açúcares do líquido amniótico',
        'O feto tem períodos regulares de sono profundo',
        'Os movimentos são vigorosos e perceptíveis',
      ],
    },
    symptoms: [
      'Primeiros movimentos do bebê',
      'Dores nas costas',
      'Fome aumentada',
      'Inchaço leve',
      'Câimbras nas pernas',
      'Congestão nasal',
      'Dores no ligamento redondo',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(21),
    curiosities: [
      'O bebê pratica respirar líquido amniótico para fortalecer os pulmões',
      'As sobrancelhas do bebê estão completamente formadas — provavelmente parecidas com as suas!',
      'O bebê pode reagir aos seus movimentos — quando você se mexe, ele também se mexe',
    ],
    weeklyTip: 'Documente os movimentos do bebê em um diário. Registrar quando ele se mexe mais pode revelar padrões divertidos.',
    motivationalPhrase: 'Cada chutinho é um "oi, mamãe" do jeito mais adorável possível.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 22
  // ─────────────────────────────────────────────
  {
    weekNumber: 22,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~27,8 cm',
      weightG: '~430g',
      comparison: 'Mamão papaia',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'O bebê já parece um recém-nascido em miniatura',
        'Os lábios e olhos estão completamente formados',
        'O bebê desenvolve o sentido do paladar',
        'As pálpebras e sobrancelhas estão visíveis',
        'A gordura subcutânea começa a aumentar',
        'O cérebro cresce mais de 500% nessa fase do segundo trimestre',
      ],
    },
    symptoms: [
      'Primeiros movimentos do bebê',
      'Dores nas costas',
      'Fome aumentada',
      'Manchas na pele (melasma)',
      'Sangramento gengival',
      'Inchaço leve',
      'Câimbras nas pernas',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(22),
    curiosities: [
      'O bebê já consegue distinguir sabores no líquido amniótico — que é influenciado pelo que você come',
      'Comer cenouras durante a gravidez pode fazer o bebê apreciar mais o sabor ao nascer',
      'Os olhos do bebê estão completamente formados mas as íris ainda não têm pigmentação definitiva',
    ],
    weeklyTip: 'Varie sua alimentação com frutas, legumes e proteínas coloridas — o bebê experimenta os sabores através do líquido amniótico.',
    motivationalPhrase: 'Você nutre não apenas o corpo dele, mas todos os seus sentidos.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 23
  // ─────────────────────────────────────────────
  {
    weekNumber: 23,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~28,9 cm',
      weightG: '~500g',
      comparison: 'Toranja',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'O bebê alcança 500g — um marco simbólico',
        'Os pulmões desenvolvem os alvéolos (sáculos de ar)',
        'O bebê reage a sons altos com movimentos bruscos',
        'A pele está ganhando elasticidade',
        'Os vasos sanguíneos dos pulmões estão se desenvolvendo',
        'O bebê tem padrões regulares de sono e vigília (12–14h de sono)',
      ],
    },
    symptoms: [
      'Primeiros movimentos do bebê',
      'Dores nas costas',
      'Fome aumentada',
      'Câimbras nas pernas',
      'Inchaço leve',
      'Falta de ar leve',
      'Linha nigra (linha escura no abdômen)',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(23),
    curiosities: [
      'O bebê dorme de 12 a 14 horas por dia dentro do útero — não se preocupe se sentir menos movimentos nessas horas',
      'Os sons altos podem assustar o bebê — você pode sentir um "pulo" na barriga!',
      'A partir dos 500g, o bebê tem cada vez mais chances de sobrevivência em caso de parto prematuro (com suporte intensivo)',
    ],
    weeklyTip: 'Evite sons muito altos próximos à barriga — o bebê já ouve e pode se assustar. Prefira músicas suaves.',
    motivationalPhrase: 'Meio quilo de amor puro crescendo dentro de você. Que privilégio.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 24
  // ─────────────────────────────────────────────
  {
    weekNumber: 24,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~30 cm',
      weightG: '~600g',
      comparison: 'Espiga de milho',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'Os pulmões produzem surfactante (essencial para respirar ao nascer)',
        'O cérebro está crescendo rapidamente em complexidade',
        'O bebê responde a músicas com movimentos específicos',
        'Os olhos começam a abrir e fechar',
        'A pele ainda é enrugada (falta gordura) mas ganha cor',
        'O bebê tem um aperto de mão firme',
      ],
    },
    symptoms: [
      'Primeiros movimentos do bebê',
      'Dores nas costas',
      'Câimbras nas pernas',
      'Inchaço leve',
      'Falta de ar leve',
      'Fome aumentada',
      'Dores no ligamento redondo',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(24),
    curiosities: [
      'O surfactante produzido pelos pulmões é essencial para a primeira respiração — sem ele os pulmões colapsariam',
      'A produção de surfactante é uma das razões pelas quais bebês prematuros precisam de suporte respiratório',
      'O bebê abre e fecha os olhos pela primeira vez nessa semana',
    ],
    weeklyTip: 'O teste de diabetes gestacional (TOTG) é feito entre as semanas 24 e 28. Não esqueça de agendar com seu médico.',
    motivationalPhrase: 'Cada semana que passa, mais próxima você está do encontro mais esperado da sua vida.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 25
  // ─────────────────────────────────────────────
  {
    weekNumber: 25,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~34,6 cm',
      weightG: '~660g',
      comparison: 'Couve-flor',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'O cabelo continua crescendo e ganhando cor',
        'As narinas se abrem — o bebê "cheira" o líquido amniótico',
        'O sistema nervoso central está cada vez mais organizado',
        'Os pulmões continuam amadurecendo',
        'O bebê pode reconhecer a voz do pai',
        'O reflexo de sobressalto (Moro) já está presente',
      ],
    },
    symptoms: [
      'Primeiros movimentos do bebê',
      'Dores nas costas',
      'Câimbras nas pernas',
      'Inchaço leve',
      'Falta de ar leve',
      'Sangramento gengival',
      'Manchas na pele (melasma)',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(25),
    curiosities: [
      'O bebê pode reconhecer a voz do pai — incentive o parceiro a falar e cantar para a barriga',
      'O reflexo de Moro (susto) que você vai ver após o nascimento já está presente no útero',
      'As narinas do bebê se abrem nessa semana — ele "cheira" o ambiente amniótico',
    ],
    weeklyTip: 'Convide o parceiro para colocar a mão na barriga e falar com o bebê — ele reconhece vozes externas e isso fortalece o vínculo.',
    motivationalPhrase: 'O bebê está aprendendo a te amar antes mesmo de te ver.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 26
  // ─────────────────────────────────────────────
  {
    weekNumber: 26,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~35,6 cm',
      weightG: '~760g',
      comparison: 'Alface',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'Os olhos se abrem completamente pela primeira vez',
        'O bebê desenvolve padrão de sono REM (sonhos!)',
        'Os pulmões estão mais maduros — produção de surfactante aumenta',
        'O bebê reage a luz intensa na barriga',
        'A gordura continua a se acumular sob a pele',
        'A medula óssea assume a produção total de glóbulos vermelhos',
      ],
    },
    symptoms: [
      'Primeiros movimentos do bebê',
      'Dores nas costas',
      'Câimbras nas pernas',
      'Inchaço leve',
      'Falta de ar leve',
      'Fome aumentada',
      'Congestão nasal',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(26),
    curiosities: [
      'Pesquisadores acreditam que bebês sonham no útero durante o sono REM!',
      'Você pode testar a reação do bebê à luz apontando uma lanterna para a barriga',
      'O bebê já pisca os olhos em resposta à luz — seus reflexos visuais estão funcionando',
    ],
    weeklyTip: 'Observe os padrões de movimento do bebê. Se perceber redução significativa, entre em contato com seu médico.',
    motivationalPhrase: 'Ele abre os olhinhos — e o mundo que ele encontrará terá você como centro.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 27
  // ─────────────────────────────────────────────
  {
    weekNumber: 27,
    trimester: 2,
    baby: {
      stage: 'feto',
      sizeCm: '~36,6 cm',
      weightG: '~875g',
      comparison: 'Couve-flor grande',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'Última semana do segundo trimestre',
        'O bebê ocupa quase todo o espaço do útero',
        'O cérebro tem a aparência de nozes — sulcos e dobras bem definidos',
        'O bebê pode ouvir conversas fora do útero',
        'Os pulmões estão quase prontos para respirar ar',
        'O bebê dorme e acorda em ciclos de 30–90 minutos',
        'As pálpebras têm cílios completamente formados',
      ],
    },
    symptoms: [
      'Primeiros movimentos do bebê',
      'Dores nas costas',
      'Câimbras nas pernas',
      'Inchaço leve',
      'Falta de ar leve',
      'Insônia',
      'Fome aumentada',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(27),
    curiosities: [
      'O segundo trimestre termina aqui — você está prestes a entrar na reta final!',
      'O cérebro do bebê tem agora a mesma aparência rugosa de nozes que terá ao nascer',
      'Os pulmões estão tão desenvolvidos que, em caso de parto prematuro, as chances de sobrevivência são muito boas',
    ],
    weeklyTip: 'Comece a pesquisar cursos de preparação para o parto. A maioria é recomendada para o terceiro trimestre — agende já.',
    motivationalPhrase: 'Segundo trimestre concluído! Você está irresistível e mais perto do dia mais feliz da sua vida. 🌸',
  },
];
