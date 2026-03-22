// DoceGestar — Semanas 28–40 (3º Trimestre)
// Conteúdo baseado no PRD e fontes médicas referenciadas (PRD seção 6)

import type { WeekContent } from '../../types';
import { CARE_BASE, CARE_T3 } from '../shared/care';
import { NUTRIENTS_T3 } from '../shared/nutrients';
import { getExamsForWeek } from '../shared/exams';

const careT3 = [...CARE_BASE, ...CARE_T3];

export const weeks28to40: WeekContent[] = [
  // ─────────────────────────────────────────────
  // SEMANA 28
  // ─────────────────────────────────────────────
  {
    weekNumber: 28,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~37,6 cm',
      weightG: '~1kg',
      comparison: 'Berinjela',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'O bebê ultrapassa 1kg — um marco importantíssimo!',
        'Os olhos abrem e fecham e reagem à luz',
        'O cérebro está crescendo em complexidade e memória',
        'Os pulmões estão quase prontos para respirar',
        'O bebê tem períodos regulares de sono e atividade',
        'A gordura corporal está em 2–3% do peso total',
        'Os chutes são mais fortes e perceptíveis',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Inchaço nos pés e tornozelos',
      'Insônia',
      'Pressão pélvica',
      'Vontade frequente de urinar',
      'Dor lombar',
      'Falta de ar',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(28),
    curiosities: [
      'Bem-vinda ao terceiro trimestre — a reta final!',
      'O bebê já pesa mais de 1kg e a maioria das funções vitais estão prontas',
      'Os movimentos do bebê são agora tão fortes que podem ser vistos de fora da barriga',
    ],
    weeklyTip: 'Comece a contar os movimentos fetais diariamente — em geral, 10 movimentos em 2 horas é um bom sinal de bem-estar.',
    motivationalPhrase: 'Bem-vinda ao último ato. Cada dia que passa é vitória para os dois.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 29
  // ─────────────────────────────────────────────
  {
    weekNumber: 29,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~38,6 cm',
      weightG: '~1,15kg',
      comparison: 'Abóbora',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'O músculo cardíaco está mais desenvolvido e forte',
        'O bebê começa a se posicionar de cabeça para baixo',
        'Os ossos estão endurecendo, absorvendo muito cálcio',
        'O cérebro controla a respiração e temperatura',
        'O bebê pisca em resposta à luz',
        'A gordura subcutânea aumenta rapidamente',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Azia intensa',
      'Inchaço nos pés e tornozelos',
      'Insônia',
      'Dor lombar',
      'Vontade frequente de urinar',
      'Cansaço intenso',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(29),
    curiosities: [
      'O bebê está se preparando para a posição de parto — cabeça para baixo',
      'Nessa fase, os ossos do bebê absorvem tanto cálcio que sua demanda aumenta muito',
      'O bebê ganha cerca de 200g por semana a partir de agora',
    ],
    weeklyTip: 'A azia intensa é causada pelo bebê crescendo e pressionando o estômago. Faça refeições pequenas, evite deitar após comer e eleve a cabeceira da cama.',
    motivationalPhrase: 'Cada dia, ele fica mais forte. Cada dia, você também.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 30
  // ─────────────────────────────────────────────
  {
    weekNumber: 30,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~39,9 cm',
      weightG: '~1,3kg',
      comparison: 'Repolho',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'O lanugo começa a desaparecer gradualmente',
        'O vernix caseoso está mais espesso',
        'O bebê tem reflexos de sucção bem desenvolvidos',
        'O sistema imunológico recebe anticorpos da mãe via placenta',
        'Os pulmões respiram líquido amniótico regularmente (treino)',
        'O bebê tem expressões faciais reconhecíveis no ultrassom 4D',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Azia intensa',
      'Inchaço nos pés e tornozelos',
      'Insônia',
      'Pressão pélvica',
      'Falta de ar',
      'Dor lombar',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(30),
    curiosities: [
      'A placenta transfere anticorpos para o bebê — ele nasce com proteção imunológica temporária',
      'O ultrassom 4D nessa fase mostra expressões faciais do bebê com clareza',
      'O bebê pratica sugar e engolir continuamente — se preparando para amamentar',
    ],
    weeklyTip: 'Considere fazer um ultrassom 4D nessa fase — as expressões do bebê são visíveis e a experiência é muito especial.',
    motivationalPhrase: '30 semanas de amor. Sua dedicação é extraordinária.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 31
  // ─────────────────────────────────────────────
  {
    weekNumber: 31,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~41,1 cm',
      weightG: '~1,5kg',
      comparison: 'Coco',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'Todos os sentidos estão funcionando',
        'O bebê abre e fecha os olhos em resposta à luz',
        'Os pulmões estão 90% maduros',
        'O bebê ocupa quase todo o espaço uterino',
        'Os movimentos diminuem ligeiramente (menos espaço)',
        'O sistema nervoso regula a temperatura corporal',
        'O bebê gira menos mas chuta com mais força',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Inchaço nos pés e tornozelos',
      'Insônia',
      'Azia intensa',
      'Pressão pélvica',
      'Cansaço intenso',
      'Vontade frequente de urinar',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(31),
    curiosities: [
      'Os pulmões estão 90% prontos — em caso de parto agora, os chances de sobrevivência são excelentes',
      'Os movimentos menos frequentes são normais — o bebê tem menos espaço para girar',
      'O bebê passa a maior parte do tempo de olhos abertos quando está acordado',
    ],
    weeklyTip: 'Os movimentos podem parecer menos intensos — é porque o bebê tem menos espaço. Mas se sentir redução muito grande, procure seu médico.',
    motivationalPhrase: 'Você está na reta final. Cada dia é uma vitória para vocês dois.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 32
  // ─────────────────────────────────────────────
  {
    weekNumber: 32,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~42,4 cm',
      weightG: '~1,7kg',
      comparison: 'Jicama',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'A maioria dos bebês prematuros nessa semana sobrevive sem sequelas',
        'As unhas chegam às pontas dos dedos',
        'O cabelo está crescendo e pode ser bem visível',
        'Os pulmões estão quase completamente maduros',
        'O bebê desce ligeiramente em direção à pelve',
        'A gordura corporal está em 8% — as bochechas ficam mais redondas',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Azia intensa',
      'Inchaço nos pés e tornozelos',
      'Insônia',
      'Pressão pélvica',
      'Falta de ar',
      'Hemorroidas',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(32),
    curiosities: [
      'O ultrassom de crescimento fetal nessa semana verifica se o bebê está crescendo adequadamente',
      'As bochechas arredondadas do bebê que você vai apertar logo aparecem agora',
      'A semana 32 é considerada um marco de segurança — bebês prematuros nessa idade têm ótimo prognóstico',
    ],
    weeklyTip: 'O ultrassom de crescimento (semana 32) verifica líquido amniótico, placenta e peso estimado. Leve suas dúvidas para o médico.',
    motivationalPhrase: 'As bochechinhas estão ficando mais redondas. Em breve você vai apertá-las.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 33
  // ─────────────────────────────────────────────
  {
    weekNumber: 33,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~43,7 cm',
      weightG: '~1,9kg',
      comparison: 'Abacaxi',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'O bebê respira o líquido amniótico com coordenação',
        'Os ossos da cabeça ainda não estão fundidos (para facilitar o parto)',
        'O bebê detecta diferença entre dia e noite',
        'A gordura corporal continua aumentando',
        'O sistema digestivo está completamente formado',
        'O bebê pode distinguir o rosto da mãe de outras imagens',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Azia intensa',
      'Inchaço nos pés e tornozelos',
      'Insônia',
      'Ansiedade pré-parto',
      'Dor lombar',
      'Hemorroidas',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(33),
    curiosities: [
      'Os ossos da cabeça do bebê são flexíveis — isso é o que permite ele passar pelo canal do parto!',
      'O bebê já distingue dia e noite através da luz que filtra pela sua barriga',
      'A ansiedade pré-parto é completamente normal — converse com seu médico e parceiro sobre seus sentimentos',
    ],
    weeklyTip: 'Prepare-se emocionalmente para o parto: escreva seu plano de parto, visite a maternidade e converse com outras mães sobre suas experiências.',
    motivationalPhrase: 'A ansiedade que você sente é amor querendo sair. Respire fundo.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 34
  // ─────────────────────────────────────────────
  {
    weekNumber: 34,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~45 cm',
      weightG: '~2,1kg',
      comparison: 'Melão cantaloupe',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'Os pulmões estão completamente maduros para a maioria dos bebês',
        'O sistema imunológico recebe quantidade máxima de anticorpos',
        'O bebê pisca, chora silenciosamente e faz careta',
        'A gordura corporal está em 10–15%',
        'O bebê pode reconhecer músicas que você ouviu durante a gestação',
        'As unhas ultrapassam as pontas dos dedos',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Azia intensa',
      'Inchaço nos pés e tornozelos',
      'Insônia',
      'Pressão pélvica',
      'Cansaço intenso',
      'Falta de ar',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(34),
    curiosities: [
      'Os bebês nascidos na semana 34 têm 99% de chance de sobrevivência sem sequelas graves',
      'O bebê vai reconhecer as músicas que você ouviu durante a gravidez — crie uma playlist para ele!',
      'O choro silencioso no útero é real — o bebê pratica a respiração que usa para chorar ao nascer',
    ],
    weeklyTip: 'Monte sua mala da maternidade esta semana — ela deve estar pronta a partir da semana 36 para qualquer eventualidade.',
    motivationalPhrase: 'Quase lá. Cada dia que você o mantém aquecido é um presente de amor.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 35
  // ─────────────────────────────────────────────
  {
    weekNumber: 35,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~46,2 cm',
      weightG: '~2,4kg',
      comparison: 'Melão honeydew',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'Os rins estão completamente funcionais',
        'O bebê passa cerca de 90% do tempo dormindo',
        'A maioria dos órgãos está pronta — restam detalhes de amadurecimento',
        'O cabelo pode ser espesso e bem visível',
        'O bebê provavelmente está na posição cefálica (cabeça para baixo)',
        'As pernas ficam estendidas ao longo do corpo por falta de espaço',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Azia intensa',
      'Inchaço nos pés e tornozelos',
      'Insônia',
      'Pressão pélvica',
      'Vontade frequente de urinar',
      'Ansiedade pré-parto',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(35),
    curiosities: [
      'O bebê dorme 90% do tempo — a maior parte do seu crescimento acontece enquanto ele dorme',
      'Se ainda não virou, a maioria dos bebês assume a posição cefálica entre as semanas 34 e 36',
      'A cultura GBS (Streptococcus do grupo B) é feita entre as semanas 35 e 37 — é um exame simples e importante',
    ],
    weeklyTip: 'Faça o exame GBS agendado pelo seu obstetra — é indolor e fundamental para a segurança do parto.',
    motivationalPhrase: 'Você está tão perto. O bebê também sente que o encontro está chegando.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 36
  // ─────────────────────────────────────────────
  {
    weekNumber: 36,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~47,4 cm',
      weightG: '~2,6kg',
      comparison: 'Alface americana',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'O bebê está considerado "quase a termo" (pré-termo tardio)',
        'O vernix e lanugo diminuem significativamente',
        'Os rins produzem cerca de meio litro de urina por dia',
        'O bebê está encaixado na pelve (pode aliviar a falta de ar)',
        'Os pulmões estão 99% maduros',
        'O bebê ganha cerca de 250g por semana',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Pressão pélvica',
      'Insônia',
      'Vontade frequente de urinar',
      'Ansiedade pré-parto',
      'Cansaço intenso',
      'Hemorroidas',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(36),
    curiosities: [
      'O encaixe do bebê na pelve pode aliviar a falta de ar mas aumentar a pressão na bexiga',
      'A partir dessa semana, o bebê é considerado "a termo tardio" — muito bem desenvolvido',
      'Sua mala da maternidade deve estar pronta e no lugar de fácil acesso',
    ],
    weeklyTip: 'Sua mala da maternidade deve estar pronta agora. Inclua documentos, roupa para você e o bebê, absorventes pós-parto e coisas de higiene.',
    motivationalPhrase: 'Mala pronta, coração cheio. Quase hora do grande encontro.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 37
  // ─────────────────────────────────────────────
  {
    weekNumber: 37,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~48,6 cm',
      weightG: '~2,9kg',
      comparison: 'Acelga',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'O bebê é considerado "a termo" — pronto para nascer',
        'Os pulmões estão completamente maduros',
        'O bebê pratica a sucção intensamente',
        'A gordura corporal está em 15% — perfeita para termorregulação',
        'O bebê reconhece vozes familiares',
        'Todos os órgãos estão prontos para a vida fora do útero',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Pressão pélvica',
      'Insônia',
      'Ansiedade pré-parto',
      'Vontade frequente de urinar',
      'Dor lombar',
      'Cansaço intenso',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(37),
    curiosities: [
      'Parabéns! Seu bebê é considerado "a termo" — completamente desenvolvido para nascer',
      'O bebê pode nascer a qualquer momento a partir de agora — fique atenta aos sinais do parto',
      'Saiba reconhecer os sinais do parto: contrações regulares, perda do tampão mucoso, rompimento da bolsa',
    ],
    weeklyTip: 'Saiba os sinais do parto: contrações de 5 em 5 minutos por 1 hora, rompimento da bolsa ou perda do tampão — vá para a maternidade!',
    motivationalPhrase: 'A termo. Pronto. Perfeito. Assim como você sempre soube que seria.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 38
  // ─────────────────────────────────────────────
  {
    weekNumber: 38,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~49,8 cm',
      weightG: '~3,0kg',
      comparison: 'Alho-poró',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'O bebê está completamente desenvolvido',
        'O vernix está sendo absorvido pela pele',
        'As unhas podem precisar de corte logo após o nascimento',
        'O mecônio (primeira fezes) está acumulado no intestino',
        'O sistema digestivo está pronto para o leite materno',
        'O bebê faz movimentos de sucção e de respiração regularmente',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Pressão pélvica intensa',
      'Insônia',
      'Ansiedade pré-parto',
      'Vontade frequente de urinar',
      'Cansaço intenso',
      'Azia intensa',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(38),
    curiosities: [
      'O mecônio — a primeira "fezes" do bebê — está pronto para ser eliminado após o nascimento',
      'O bebê pode nascer com muito vernix ou quase nenhum, dependendo de quando nascer',
      'As unhas do bebê podem ser longas o suficiente para precisar de limagem logo após o nascimento',
    ],
    weeklyTip: 'Descanse o máximo possível — você vai precisar de energia para o parto e as primeiras semanas com o bebê.',
    motivationalPhrase: 'Dois dias, dois dias. Na verdade, pode ser qualquer hora. Você está pronta.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 39
  // ─────────────────────────────────────────────
  {
    weekNumber: 39,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~50,7 cm',
      weightG: '~3,2kg',
      comparison: 'Mini melancia',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'O bebê está em tamanho e desenvolvimento plenos',
        'O cérebro ainda está crescendo — 30% do tamanho adulto ao nascer',
        'Coordenação de todos os reflexos: sucção, preensão, Moro',
        'O bebê acumula a gordura final necessária para o nascimento',
        'O couro cabeludo pode ter muito ou pouco cabelo — completamente normal',
        'O bebê está no máximo nível de sensibilidade aos sons externos',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Pressão pélvica intensa',
      'Insônia',
      'Ansiedade pré-parto',
      'Vontade frequente de urinar',
      'Cansaço intenso',
      'Dor lombar',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(39),
    curiosities: [
      'Apenas 5% dos bebês nascem na data prevista — a maioria nasce entre as semanas 38 e 42',
      'O cérebro do bebê ao nascer tem apenas 30% do tamanho adulto — vai crescer muito nos próximos anos',
      'Os reflexos do bebê estão 100% prontos: ele vai sugar, agarrar e chorar assim que nascer',
    ],
    weeklyTip: 'Já falou com seu parceiro sobre como ir para a maternidade? Confirme o trajeto, a mala e quem vai ligar para quem no momento H.',
    motivationalPhrase: 'O bebê está pronto. Você está pronta. O amor que vem aí é maior que tudo.',
  },

  // ─────────────────────────────────────────────
  // SEMANA 40
  // ─────────────────────────────────────────────
  {
    weekNumber: 40,
    trimester: 3,
    baby: {
      stage: 'feto',
      sizeCm: '~51,2 cm',
      weightG: '~3,4kg',
      comparison: 'Melancia',
      heartbeatBpm: '130–150 bpm',
      milestones: [
        'A Data Prevista do Parto chegou!',
        'O bebê está completamente pronto para a vida fora do útero',
        'Todos os sistemas funcionam de forma autônoma',
        'O couro cabeludo pode ter muito ou pouco cabelo',
        'O bebê vai abrir os olhos e encarar o mundo logo após nascer',
        'O cordão umbilical tem cerca de 50 cm e continua nutrindo até ser cortado',
        'O encontro mais esperado da vida está a caminho',
      ],
    },
    symptoms: [
      'Contrações de Braxton Hicks',
      'Pressão pélvica intensa',
      'Insônia',
      'Ansiedade pré-parto',
      'Cansaço intenso',
      'Vontade frequente de urinar',
      'Hemorroidas',
    ],
    care: careT3,
    nutrients: NUTRIENTS_T3,
    exams: getExamsForWeek(40),
    curiosities: [
      'Apenas 5% dos bebês nascem exatamente na DPP — mas hoje é o dia simbólico mais especial da gestação!',
      'Bebês que ficam além da semana 40 são monitorados de perto para garantir o bem-estar',
      'O cordão umbilical, que te conectou por 40 semanas, em breve será cortado — mas o vínculo dura para sempre',
    ],
    weeklyTip: 'Esteja em contato constante com seu médico. Se não houver sinal de trabalho de parto, ele avaliará a necessidade de indução.',
    motivationalPhrase: '40 semanas de amor, dedicação e milagre. Agora é a hora. Você está pronta para ser mãe. ❤️',
  },
];
