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
      sizeCm: '—',
      weightG: '—',
      comparison: '—',
      heartbeatBpm: '—',
      milestones: [
        'O ciclo menstrual é contado como início da gestação',
        'O corpo se prepara para a ovulação',
        'O útero está se tornando receptivo à implantação',
        'Os hormônios FSH e LH iniciam a maturação do óvulo',
        'Ainda não há embrião formado — a fecundação ainda não ocorreu',
      ],
    },
    symptoms: [
      'Cansaço e sonolência',
      'Sensibilidade emocional',
      'Aumento da frequência urinária',
      'Seios sensíveis e inchados',
      'Azia',
      'Tontura',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(1),
    curiosities: [
      'A semana 1 é contada a partir do primeiro dia da última menstruação',
      'A fecundação geralmente ocorre na semana 2 ou 3',
      'O corpo já produz hormônios que preparam o ambiente para o bebê',
    ],
    weeklyTip: 'Comece a tomar ácido fólico agora, se ainda não iniciou — ele protege o desenvolvimento do sistema nervoso do bebê.',
    motivationalPhrase: 'Toda grande jornada começa com um único passo. A sua começou hoje. ✨',
  },

  // ─────────────────────────────────────────────
  // SEMANA 2
  // ─────────────────────────────────────────────
  {
    weekNumber: 2,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: '—',
      weightG: '—',
      comparison: '—',
      heartbeatBpm: '—',
      milestones: [
        'O óvulo maduro é liberado na ovulação',
        'A fecundação pode ocorrer nesta semana',
        'Após a fecundação, forma-se o zigoto (célula única com 46 cromossomos)',
        'O zigoto inicia a divisão celular enquanto viaja pelas trompas de Falópio',
        'O sexo do bebê já está determinado geneticamente desde este momento',
      ],
    },
    symptoms: [
      'Cansaço e sonolência',
      'Sensibilidade emocional',
      'Seios sensíveis e inchados',
      'Tontura',
      'Azia',
      'Aumento da frequência urinária',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(2),
    curiosities: [
      'No momento da fecundação, já está definido se será menino ou menina',
      'O zigoto carrega metade dos genes de cada pai',
      'As primeiras divisões celulares ocorrem sem que as células cresçam — elas se dividem em partes menores',
    ],
    weeklyTip: 'Evite álcool e cigarro mesmo antes de confirmar a gravidez — o embrião é muito sensível nas primeiras semanas.',
    motivationalPhrase: 'A vida mais incrível do mundo está prestes a começar dentro de você.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 3
  // ─────────────────────────────────────────────
  {
    weekNumber: 3,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: '< 0,1 cm',
      weightG: '< 1g',
      comparison: 'Grão de areia',
      heartbeatBpm: '—',
      milestones: [
        'A blástula se implanta no endométrio uterino',
        'A implantação pode causar sangramento leve (sangramento de implantação)',
        'O corpo começa a produzir beta-hCG — o hormônio da gravidez',
        'O embrião se divide em células que formarão o bebê e a placenta',
        'O saco gestacional começa a se formar ao redor do embrião',
      ],
    },
    symptoms: [
      'Enjoos e náusea',
      'Cansaço e sonolência',
      'Seios sensíveis e inchados',
      'Aumento da frequência urinária',
      'Sensibilidade emocional',
      'Salivação excessiva',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(3),
    curiosities: [
      'O beta-hCG é o hormônio detectado nos testes de gravidez',
      'A implantação geralmente ocorre entre os dias 6 e 10 após a fecundação',
      'Um leve sangramento nessa semana pode ser confundido com menstruação — é o chamado "sangramento de nidação"',
    ],
    weeklyTip: 'Se sentir sangramento leve e suspeitar de gravidez, faça um teste de farmácia ou procure seu médico.',
    motivationalPhrase: 'Uma nova vida se ancora em você. Que momento mágico e poderoso.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 4
  // ─────────────────────────────────────────────
  {
    weekNumber: 4,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: '~0,1 cm',
      weightG: '< 1g',
      comparison: 'Semente de papoula',
      heartbeatBpm: '—',
      milestones: [
        'O embrião tem o tamanho de uma semente de papoula',
        'As três camadas germinativas começam a se diferenciar',
        'O tubo neural (que formará o cérebro e coluna vertebral) começa a se desenvolver',
        'O coração primitivo começa a se formar',
        'A placenta e o cordão umbilical estão se desenvolvendo',
        'O saco amniótico envolve o embrião para proteção',
      ],
    },
    symptoms: [
      'Enjoos e náusea',
      'Cansaço e sonolência',
      'Seios sensíveis e inchados',
      'Aumento da frequência urinária',
      'Azia',
      'Sensibilidade emocional',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(4),
    curiosities: [
      'O tubo neural se fechará nas próximas 2 semanas — o ácido fólico é essencial nesse processo',
      'A maioria das mulheres descobre a gravidez entre a semana 4 e 6',
      'O coração do bebê começa a se formar antes mesmo de você saber que está grávida',
    ],
    weeklyTip: 'Este é o momento mais crítico para o ácido fólico. Certifique-se de tomar 400–800 mcg por dia.',
    motivationalPhrase: 'Do menor dos começos nascem as maiores histórias. A sua está apenas começando.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 5
  // ─────────────────────────────────────────────
  {
    weekNumber: 5,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: '~0,3 cm',
      weightG: '< 1g',
      comparison: 'Semente de gergelim',
      heartbeatBpm: '80–100 bpm',
      milestones: [
        'O coração primitivo começa a bater (80–100 bpm)',
        'O cérebro, coluna vertebral e sistema nervoso estão se formando rapidamente',
        'Os primeiros brotos dos braços e pernas aparecem',
        'O tubo neural está se fechando',
        'Os olhos e ouvidos começam a se desenvolver',
        'A placenta está assumindo a produção de hormônios',
      ],
    },
    symptoms: [
      'Enjoos e náusea',
      'Cansaço e sonolência',
      'Seios sensíveis e inchados',
      'Aversão a cheiros',
      'Aumento da frequência urinária',
      'Salivação excessiva',
      'Tontura',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(5),
    curiosities: [
      'O coração do bebê pode ser visto batendo no ultrassom transvaginal a partir desta semana',
      'O embrião cresce a um ritmo extraordinário — cerca de 1 mm por dia',
      'Os primeiros batimentos são irregulares; vão se regularizar ao longo das próximas semanas',
    ],
    weeklyTip: 'Náuseas intensas pela manhã? Tente comer biscoito de água antes de se levantar da cama e faça refeições pequenas e frequentes.',
    motivationalPhrase: 'Hoje, pela primeira vez, um coraçãozinho começou a bater por você.',
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
      weightG: '< 1g',
      comparison: 'Lentilha',
      heartbeatBpm: '100–130 bpm',
      milestones: [
        'O coração já bate entre 100 e 130 vezes por minuto',
        'Brotos dos braços e pernas são visíveis',
        'O rosto começa a se moldar — olhos, narinas e boca em formação',
        'O cérebro se divide em três regiões distintas',
        'O sistema digestivo começa a se desenvolver',
        'Os pulmões primitivos começam a aparecer',
      ],
    },
    symptoms: [
      'Enjoos e náusea',
      'Cansaço e sonolência',
      'Seios sensíveis e inchados',
      'Aversão a cheiros',
      'Azia',
      'Salivação excessiva',
      'Constipação',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(6),
    curiosities: [
      'Nessa semana o embrião dobra de tamanho em relação à semana anterior',
      'O rosto do bebê está se formando — suas características já estão sendo esculpidas',
      'Os olhos do embrião começam como dois pontos escuros nas laterais da cabeça',
    ],
    weeklyTip: 'Se a náusea for muito intensa, converse com seu médico — existe medicação segura para a gravidez que pode ajudar.',
    motivationalPhrase: 'Cada célula que se divide é um verso na mais bela história já escrita.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 7
  // ─────────────────────────────────────────────
  {
    weekNumber: 7,
    trimester: 1,
    baby: {
      stage: 'embrião',
      sizeCm: '~1,3 cm',
      weightG: '< 1g',
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
        'Todos os órgãos principais estão formados (ainda imaturos)',
        'Dedos das mãos e pés visíveis, ainda ligados por membranas',
        'O nariz, lábios e pálpebras estão se definindo',
        'Os cotovelos se curvam e as mãos se fecham',
        'Os dentes de leite começam a se formar',
        'O embrião se move ativamente (ainda não percebido)',
        'A cauda embrionária desaparece completamente',
      ],
    },
    symptoms: [
      'Enjoos e náusea',
      'Cansaço e sonolência',
      'Seios sensíveis e inchados',
      'Constipação',
      'Azia',
      'Aversão a cheiros',
      'Aumento da frequência urinária',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(8),
    curiosities: [
      'Esta é a última semana chamada de "embrião" — a partir da semana 9 passa a ser "feto"',
      'Os dentes de leite que seu filho vai ter já estão sendo formados agora',
      'O bebê já tem reflexos primitivos — reage a estímulos externos',
    ],
    weeklyTip: 'Marque sua primeira consulta de pré-natal se ainda não fez. O primeiro ultrassom confirma a gestação e os batimentos cardíacos.',
    motivationalPhrase: 'Oito semanas de amor incondicional. E o melhor ainda está por vir.',
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
      heartbeatBpm: '150–170 bpm',
      milestones: [
        'Agora é oficialmente um feto',
        'Os dedos das mãos e pés estão separados',
        'O rosto tem expressão humana reconhecível',
        'O feto já se mexe, vira e chuta (não perceptível ainda)',
        'Os órgãos internos continuam amadurecendo',
        'Os músculos estão se desenvolvendo',
        'A tireoide começa a produzir hormônios',
      ],
    },
    symptoms: [
      'Enjoos e náusea',
      'Cansaço e sonolência',
      'Seios sensíveis e inchados',
      'Constipação',
      'Azia',
      'Sensibilidade emocional',
      'Aversão a cheiros',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(9),
    curiosities: [
      'A transição de embrião para feto marca o fim do período mais crítico de formação dos órgãos',
      'O feto já tem impressões digitais únicas nessa semana',
      'A voz do bebê começa a ser moldada — as cordas vocais estão se formando',
    ],
    weeklyTip: 'Sente cheiros com mais intensidade? É normal — a progesterona aumenta a sensibilidade olfativa. Evite ambientes com odores fortes.',
    motivationalPhrase: 'Ele é um feto agora — pequeno, perfeito e absolutamente seu.',
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
        'Todos os órgãos vitais estão formados e funcionando de forma rudimentar',
        'As unhas começam a crescer',
        'Os ossos e cartilagens estão se desenvolvendo',
        'O cérebro dobra de tamanho nessa semana',
        'O feto deglute líquido amniótico',
        'Os olhos se movem sob as pálpebras fechadas',
        'O cordão umbilical está completamente formado',
      ],
    },
    symptoms: [
      'Enjoos e náusea',
      'Cansaço e sonolência',
      'Seios sensíveis e inchados',
      'Aversão a cheiros',
      'Constipação',
      'Barriga começando a ficar visível',
      'Sensibilidade emocional',
    ],
    care: careT1,
    nutrients: NUTRIENTS_T1,
    exams: getExamsForWeek(10),
    curiosities: [
      'O bebê já deglute — praticando para quando o leite chegar!',
      'As unhas do bebê são tão macias que precisarão de cuidado especial ao nascer',
      'O cordão umbilical, agora completo, fará toda a troca nutricional entre você e o bebê',
    ],
    weeklyTip: 'A barriga pode começar a aparecer. Um sutiã de maternidade confortável pode aliviar a sensibilidade dos seios.',
    motivationalPhrase: 'Cada batida do coraçãozinho dele é um bilhete de amor endereçado a você.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 11
  // ─────────────────────────────────────────────
  {
    weekNumber: 11,
    trimester: 1,
    baby: {
      stage: 'feto',
      sizeCm: '~4–6 cm',
      weightG: '~7–8g',
      comparison: 'Limão',
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
