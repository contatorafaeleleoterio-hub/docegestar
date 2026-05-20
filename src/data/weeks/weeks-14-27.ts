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
      comparison: 'Limão-siciliano',
      heartbeatBpm: '120–160 bpm',
      milestones: [
        '🦒 Pescoço alongado — o pescoço se alonga, a cabeça se ergue e se separa do tronco',
        '👁️ Olhos para frente — os olhos migram das laterais para a frente do rosto, com pálpebras ainda fundidas',
        '👂 Orelhas no lugar — movem-se para suas posições finais nas laterais da cabeça',
        '🦵 Pernas mais longas — crescem mais que os braços; o bebê já dobra joelhos e cotovelos',
        '👶 Lanugo — uma fina camada de pelos macios começa a cobrir o corpo, ajudando a regular a temperatura',
      ],
      clinicalMilestone: 'Órgãos genitais visíveis no ultrassom; cabeça ainda maior que o corpo.',
    },
    symptoms: [
      '🤩 Brilho da gravidez — pele mais radiante e cabelos mais brilhantes pelo aumento do volume sanguíneo',
      '😴 Aumento da energia — a fadiga do 1º trimestre diminui e a disposição retorna',
      '🔥 Azia e indigestão — podem persistir pelo relaxamento do esfíncter esofágico',
      '👃 Congestão nasal — o maior fluxo sanguíneo incha as mucosas do nariz',
      '🦷 Gengivas sensíveis — alterações hormonais deixam as gengivas mais propensas a sangramentos',
      '🦵 Dores nos ligamentos redondos — pontadas no baixo ventre pelo estiramento que sustenta o útero',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(14),
    curiosities: [
      'O segundo trimestre está em pleno vapor — a fase de maior bem-estar para muitas gestantes',
      'O pescoço do bebê se alonga nesta semana, dando ao corpo uma aparência mais humana',
      'O famoso "brilho da gravidez" aparece pelo aumento do volume sanguíneo e das alterações hormonais',
    ],
    weeklyTip: 'Agende uma avaliação odontológica — a gravidez aumenta a sensibilidade das gengivas, e o cuidado bucal é seguro e recomendado.',
    motivationalPhrase: 'O segundo trimestre chegou trazendo mais leveza e brilho. Aproveite cada transformação. ✨',
    weeklyChecklist: [
      'Confirmar o resultado do ultrassom morfológico do 1º trimestre com o obstetra',
      'Agendar a consulta de pré-natal do 2º trimestre',
      'Manter a suplementação de ácido fólico e ferro conforme a prescrição',
      'Marcar uma avaliação odontológica',
      'Incluir caminhadas leves de 20 a 30 minutos na rotina',
      'Hidratar bem ao longo do dia para aliviar a congestão nasal e a constipação',
    ],
    warningSignals: [
      { description: 'Sangramento vaginal, mesmo discreto', severity: 'urgent' },
      { description: 'Cólica forte ou dor abdominal que não cede', severity: 'urgent' },
      { description: 'Febre acima de 38°C', severity: 'urgent' },
      { description: 'Dor de cabeça intensa com visão embaçada', severity: 'urgent' },
      { description: 'Ardor ao urinar ou urina turva — possível infecção urinária', severity: 'monitor' },
    ],
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
      heartbeatBpm: '120–160 bpm',
      milestones: [
        '👂 Audição em desenvolvimento — os ossículos do ouvido médio se endurecem e o bebê começa a perceber sons',
        '👁️ Sensibilidade à luz — os olhos, ainda fechados, já reagem a uma luz forte direcionada à barriga',
        '👃 Olfato e paladar — as células olfativas e gustativas se desenvolvem; o bebê sente o sabor do líquido amniótico',
        '💅 Unhas e cabelos — as unhas se desenvolvem e os primeiros fios de cabelo podem surgir no couro cabeludo',
        '🦴 Ossificação avançada — a medula óssea já produz células sanguíneas, assumindo a função do fígado e do baço',
      ],
      clinicalMilestone: 'Paladar em desenvolvimento; início de sucção do polegar; início de crescimento dos cabelos.',
    },
    symptoms: [
      '😴 Disposição em alta — o 2º trimestre traz mais energia para retomar atividades',
      '🍽️ Apetite aumentado — com as náuseas para trás, a fome volta com força',
      '🤧 Nariz congestionado — a rinite da gravidez incha a mucosa nasal',
      '🩸 Gengivas que sangram — a gengivite gestacional é comum nesta fase',
      '🌀 Pontadas na lateral da barriga — o estiramento dos ligamentos do útero causa fisgadas rápidas',
      '🔥 Azia ocasional — o útero em crescimento e a digestão mais lenta provocam refluxo',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(15),
    curiosities: [
      'Os ossículos do ouvido se endurecem e o bebê começa a ouvir sua voz e o batimento do seu coração',
      'A partir desta semana é possível fazer a sexagem fetal, exame de sangue que detecta o sexo do bebê',
      'O bebê reage à luz mesmo com os olhos fechados — pode se mover ao receber claridade na barriga',
    ],
    weeklyTip: 'Comece a hidratar a barriga com óleo de amêndoas ou manteiga de karité para manter a pele elástica e prevenir estrias.',
    motivationalPhrase: 'Você carrega dentro de si alguém que já ouve sua voz e sente o mundo. 🍎',
    weeklyChecklist: [
      'Agendar o exame de sexagem fetal, se desejar saber o sexo do bebê',
      'Continuar as vitaminas pré-natais e o ácido fólico conforme orientação',
      'Manter uma dieta equilibrada e rica em nutrientes',
      'Praticar exercícios leves para gestantes, como caminhada ou natação',
      'Pesquisar sobre cursos de gestantes e amamentação',
      'Agendar a próxima consulta de pré-natal',
    ],
    warningSignals: [
      { description: 'Sangramento vaginal, leve ou intenso', severity: 'urgent' },
      { description: 'Cólicas fortes ou dor abdominal contínua', severity: 'urgent' },
      { description: 'Febre acima de 38°C', severity: 'urgent' },
      { description: 'Perda de líquido aquoso e contínuo pela vagina', severity: 'urgent' },
      { description: 'Ardor ao urinar ou urina com odor forte — possível infecção urinária', severity: 'monitor' },
    ],
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
      size: { value: 11.6, unit: 'cm', display: '~11,6 cm' },
      weightG: '~100g',
      comparison: 'Abacate',
      heartbeatBpm: '120–160 bpm',
      milestones: [
        '🐟 Movimentos de "peixinho" — músculos mais fortes permitem movimentos amplos, sentidos como leves toques',
        '😊 Expressões faciais — os músculos do rosto se desenvolvem; o bebê faz caretas e franze a testa',
        '👂 Audição mais apurada — o bebê começa a distinguir sons e a reagir a ruídos mais altos',
        '🦵 Pernas mais longas — já mais longas que os braços, permitindo chutar e se esticar com facilidade',
        '🩸 Circulação intensa — o coração bombeia cerca de 25 litros de sangue por dia',
      ],
      clinicalMilestone: 'Sistema auditivo se torna ativo; o bebê escuta sons externos; batimentos fetais podem ser ouvidos com estetoscópio.',
    },
    symptoms: [
      '🤰 Barriga mais visível — o útero cresce e sobe, tornando a gravidez evidente',
      '🤩 Bem-estar geral — o 2º trimestre costuma trazer menos enjoos e mais disposição',
      '🔥 Azia e refluxo — pelo relaxamento muscular da progesterona e pressão do útero no estômago',
      '👃 Congestão nasal — o aumento do fluxo sanguíneo mantém a sensação de nariz entupido',
      '🩸 Gengivas sensíveis — podem sangrar com mais facilidade pelas alterações hormonais',
      '🦵 Dores nos ligamentos redondos — desconfortos na região pélvica pelo crescimento do útero',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(16),
    curiosities: [
      'O bebê já consegue ouvir você — fale, cante e leia histórias em voz alta para ele',
      'Muitas mamães sentem os primeiros movimentos entre as semanas 16 e 22',
      'O coração do bebê bombeia cerca de 25 litros de sangue por dia, sustentando o rápido crescimento',
    ],
    weeklyTip: 'Comece a conversar e cantar para o bebê — ele já consegue ouvir e se acalmar com a sua voz.',
    motivationalPhrase: 'Sua voz é o primeiro amor que ele conhece. Fale para ele. 🥑',
    // ── campos enriquecidos — piloto S16 ──────────────────────────────
    maternalChanges: [
      'Útero cresce acima do umbigo, barriga fica mais visível',
      'Pele pode apresentar manchas escuras (melasma)',
      'Ligamentos uterinos causam pontadas na virilha',
      'Aumento do fluxo vaginal (normal, se sem odor)',
      'Cãibras noturnas nas pernas tornam-se mais frequentes',
    ],
    warningSignals: [
      { description: 'Sangramento vaginal', severity: 'urgent' },
      { description: 'Dor abdominal intensa', severity: 'urgent' },
      { description: 'Febre acima de 38°C', severity: 'urgent' },
      { description: 'Dor de cabeça intensa com visão turva', severity: 'urgent' },
      { description: 'Ausência de movimentos fetais após a semana 18', severity: 'urgent' },
      { description: 'Inchaço repentino nas mãos ou rosto', severity: 'monitor' },
    ],
    dailyFocus: [
      { day: 1, title: 'Hidratação', tip: 'Beba 8–10 copos de água hoje. Hidratação adequada reduz câimbras e cansaço no 2º trimestre.' },
      { day: 2, title: 'Movimento', tip: 'Faça 30 minutos de caminhada leve. Ajuda a circulação e reduz o inchaço nas pernas.' },
      { day: 3, title: 'Ferro no prato', tip: 'Inclua uma refeição rica em ferro hoje: feijão, lentilha ou carne magra com limão para melhor absorção.' },
      { day: 4, title: 'Conexão com o bebê', tip: 'Reserve 10 minutos para falar ou cantar para o bebê — ele já ouve sua voz na semana 16.' },
      { day: 5, title: 'Descanso', tip: 'Durma de lado (preferencialmente esquerdo) com um travesseiro entre os joelhos para aliviar as costas.' },
      { day: 6, title: 'Mindfulness', tip: 'Pratique 5 minutos de respiração profunda: 4 segundos inspirando, 4 segurando, 4 soltando.' },
      { day: 7, title: 'Consulta & Exames', tip: 'Revise a agenda de pré-natal. Semana 16 é ideal para morfológica e amniocentese se indicada.' },
    ],
    weeklyChecklist: [
      'Prestar atenção aos primeiros movimentos do bebê e anotar as sensações',
      'Manter a rotina de exercícios leves e alongamentos diários',
      'Continuar com a suplementação de vitaminas e ferro conforme orientação médica',
      'Hidratar a pele da barriga e dos seios para prevenir estrias',
      'Agendar a próxima consulta de pré-natal e o ultrassom morfológico do 2º trimestre',
      'Conversar com o bebê e estimular a conexão através do toque e da voz',
    ],
    mythBuster: {
      myth: '"Preciso comer por dois durante a gravidez"',
      fact: 'No 2º trimestre, o aumento necessário é de apenas ~300 kcal/dia — equivalente a 1 iogurte + 1 fruta. Qualidade importa mais que quantidade.',
    },
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
      heartbeatBpm: '120–160 bpm',
      milestones: [
        '🛡️ Sistema imunológico ativo — o bebê começa a produzir seus próprios anticorpos contra infecções',
        '🧴 Formação da gordura marrom — inicia o acúmulo do tecido adiposo que regula o calor corporal',
        '👂 Audição em desenvolvimento — o bebê percebe sons abafados do corpo da mãe, como o batimento cardíaco',
        '🦴 Esqueleto em ossificação — a cartilagem se transforma em osso sólido, com articulações ainda flexíveis',
        '🧤 Impressões digitais — os sulcos nas pontas dos dedos se tornam únicos e definitivos',
      ],
      clinicalMilestone: 'Glândulas sudoríparas em formação; o bebê movimenta articulações ativamente.',
    },
    symptoms: [
      '🏠 Crescimento uterino — o útero sobe entre o osso púbico e o umbigo, tornando a gravidez visível',
      '⚡ Dor no nervo ciático — o peso do útero pressiona o nervo, causando pontadas da lombar às pernas',
      '👃 Congestão nasal — a rinite gestacional dilata os vasos nasais',
      '💧 Aumento de secreções — corrimento vaginal e transpiração aumentam pela maior atividade metabólica',
      '🎈 Gases e distensão — a progesterona deixa a digestão mais lenta, favorecendo o acúmulo de gases',
      '💤 Sonhos vívidos — sonhos intensos são comuns, reflexo das mudanças hormonais e emocionais',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(17),
    curiosities: [
      'O bebê já produz seus próprios anticorpos, somando-se às defesas que recebe da mãe pela placenta',
      'A gordura marrom acumulada agora ajudará a manter o bebê aquecido após o nascimento',
      'O útero subindo desloca o centro de gravidade — a postura e o equilíbrio começam a mudar',
    ],
    weeklyTip: 'Faça alongamentos leves para a lombar e evite cruzar as pernas ao sentar para aliviar a pressão no nervo ciático.',
    motivationalPhrase: 'Seu corpo construiu um escudo interno para protegê-lo. Cada curva conta uma história de amor. 🧅',
    weeklyChecklist: [
      'Revisar os exames de rotina do 2º trimestre (hemograma, glicemia, urina)',
      'Agendar o ultrassom morfológico do 2º trimestre (ideal entre 20 e 24 semanas)',
      'Verificar a carteira de vacinação (dTpa a partir da 20ª semana)',
      'Aplicar hidratantes ou óleos na barriga e seios para prevenir estrias',
      'Manter exercícios leves (caminhada, natação ou ioga gestacional)',
      'Dormir preferencialmente de lado para favorecer a oxigenação fetal',
    ],
    warningSignals: [
      { description: 'Sangramento vaginal, mesmo sem dor', severity: 'urgent' },
      { description: 'Dor de cabeça súbita e intensa que não passa com repouso', severity: 'urgent' },
      { description: 'Inchaço repentino nas mãos e no rosto', severity: 'urgent' },
      { description: 'Dor ao urinar ou febre — possível infecção urinária', severity: 'monitor' },
      { description: 'Corrimento com odor forte ou coceira', severity: 'monitor' },
    ],
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
      heartbeatBpm: '110–160 bpm',
      milestones: [
        'Ouvido apurado — vozes, músicas e batimentos cardíacos já chegam com clareza ao bebê',
        'Movimentos mais vigorosos — chutes e socos ficam mais fortes; muitas mamães começam a sentir agora',
        'Pernas e pés mais definidos — estrutura óssea avança e músculos ficam mais fortes',
        'Pele menos transparente — lanugo (pelos finos) cobre o corpo para proteção',
        'Em meninas: o ovário já está formado com cerca de 5 milhões de óvulos',
      ],
      clinicalMilestone: 'Impressões digitais únicas consolidadas; a mãe pode começar a sentir os primeiros movimentos (quickening).',
    },
    symptoms: [
      'Mais disposição — segundo trimestre traz melhora nas náuseas e no cansaço',
      'Vontade de urinar com frequência — útero crescendo pressiona a bexiga',
      'Dores lombares e pélvicas — estiramento dos ligamentos e mudança do centro de gravidade',
      'Prisão de ventre e gases — progesterona diminui o trânsito intestinal',
      'Dor do ligamento redondo — pontada rápida no baixo ventre ao mudar de posição',
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
    motivationalPhrase: 'O bebê está mais presente do que nunca. Cada chutinho é uma mensagem de amor. 🤰',
    weeklyChecklist: [
      'Consulta pré-natal em dia (a cada 4 semanas até a 28ª semana)',
      'Agendar o ultrassom morfológico (indicado entre semanas 20 e 22)',
      'Exames laboratoriais de rotina (hemograma, glicemia, urina)',
      'Manter suplementação de ácido fólico e ferro conforme orientação',
      'Registrar os movimentos do bebê — qualquer parada brusca merece atenção',
      'Descanso e postura: dormir de lado e fazer pausas regulares',
    ],
    warningSignals: [
      { description: 'Sangramento vaginal moderado ou intenso', severity: 'urgent' },
      { description: 'Dor abdominal forte ou cólicas contínuas', severity: 'urgent' },
      { description: 'Diminuição ou parada dos movimentos fetais', severity: 'urgent' },
      { description: 'Dor de cabeça intensa, visão turva ou edema súbito', severity: 'urgent' },
    ],
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
      heartbeatBpm: '120–160 bpm',
      milestones: [
        '🧴 Vérnix caseoso — uma substância cerosa e branca cobre a pele, protegendo-a do líquido amniótico',
        '🧠 Especialização sensorial — as áreas do cérebro para olfato, paladar, audição, visão e tato se organizam',
        '🦵 Pernas mais longas — os membros inferiores atingem a proporção final, tornando os movimentos coordenados',
        '💤 Ciclos de sono — o bebê estabelece períodos regulares de sono e vigília',
        '👄 Deglutição ativa — engole líquido amniótico com frequência, amadurecendo intestinos e rins',
      ],
      clinicalMilestone: 'Camada de vernix caseosa protege a pele; todos os órgãos já formados, entramos na fase de crescimento puro.',
    },
    symptoms: [
      '🩸 Pressão arterial baixa — tonturas ao levantar rápido pelo sistema circulatório expandido',
      '🦵 Cãibras nas pernas — especialmente à noite, pela fadiga muscular e pressão do útero',
      '🤰 Dor no ligamento redondo — fisgadas nas laterais do abdômen ao mudar de posição',
      '🏜️ Pele seca ou coceira — a pele da barriga estica rapidamente, causando ressecamento e prurido leve',
      '👃 Nariz entupido ou sangramentos — as mucosas nasais ficam mais sensíveis pelo maior fluxo sanguíneo',
      '💨 Falta de ar leve — o útero empurra os órgãos para cima, reduzindo o espaço dos pulmões',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(19),
    curiosities: [
      'O vérnix caseoso funciona como uma camada protetora natural para a pele delicada do bebê',
      'O bebê já sente o gosto do que você come através do líquido amniótico',
      'Esta é a última semana medida da cabeça ao bumbum (CRL); a partir da 20ª, mede-se da cabeça ao calcanhar',
    ],
    weeklyTip: 'Como o bebê já sente sabores, uma alimentação variada e colorida pode influenciar positivamente o paladar dele no futuro.',
    motivationalPhrase: 'Você está no limiar da metade da jornada. Cada dia, uma nova conexão sensorial. 🥭',
    weeklyChecklist: [
      'Confirmar o agendamento do ultrassom morfológico do 2º trimestre (entre 20 e 24 semanas)',
      'Manter o uso diário de protetor solar no rosto para prevenir o melasma',
      'Iniciar ou manter exercícios pélvicos (Kegel)',
      'Organizar a lista de enxoval, aproveitando a energia do 2º trimestre',
      'Monitorar a ingestão de ferro e observar sinais de cansaço extremo ou palidez',
      'Hidratar a pele da barriga e seios pelo menos duas vezes ao dia',
    ],
    warningSignals: [
      { description: 'Sangramento ou perda de líquido pela vagina', severity: 'urgent' },
      { description: 'Contrações rítmicas e dolorosas com a barriga endurecendo', severity: 'urgent' },
      { description: 'Visão embaçada ou pontinhos brilhantes — possível pico de pressão', severity: 'urgent' },
      { description: 'Coceira intensa nas palmas das mãos e pés — possível colestase gestacional', severity: 'urgent' },
      { description: 'Ausência de movimentos fetais após estimular o bebê', severity: 'urgent' },
    ],
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
      heartbeatBpm: '120–160 bpm',
      milestones: [
        '📏 Medida cabeça-calcanhar — o bebê passa a ser medido da cabeça aos pés, o que explica o salto no comprimento',
        '🧠 Desenvolvimento cerebral — as células nervosas se conectam de forma complexa, aprimorando a coordenação',
        '🦵 Movimentos vigorosos — com mais espaço para girar, os chutes ficam mais definidos e perceptíveis',
        '🥣 Produção de mecônio — o sistema digestivo produz o mecônio, a primeira evacuação do bebê após o nascimento',
        '🧼 Proteção contínua — o vérnix caseoso continua espesso, protegendo a pele sensível',
      ],
      clinicalMilestone: 'Metade da gestação; ciclos de sono e vigília definidos; o bebê engole líquido amniótico regularmente.',
    },
    symptoms: [
      '🤰 Umbigo "para fora" — a pressão do útero pode deixar o umbigo saltado ou mais plano',
      '🛌 Dificuldade para dormir — encontrar uma posição confortável vira um desafio com a barriga crescendo',
      '🔥 Azia persistente — o útero pressiona o estômago, facilitando o retorno do ácido gástrico',
      '🦵 Inchaço nos pés — o aumento do volume sanguíneo causa edema ao final do dia',
      '🌀 Tonturas leves — mudanças bruscas de posição podem causar quedas temporárias de pressão',
      '💆 Dores de cabeça — pelas mudanças hormonais ou tensão muscular no pescoço e ombros',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(20),
    curiosities: [
      'Você chegou à metade da gestação — 20 semanas completas!',
      'A partir desta semana o bebê é medido da cabeça ao calcanhar; o "salto" de tamanho é apenas a nova forma de medir',
      'É o período ideal para o ultrassom morfológico do 2º trimestre, que revisa a anatomia do bebê em detalhes',
    ],
    weeklyTip: 'A partir desta semana você já pode tomar a vacina dTpa, que protege você e o bebê contra coqueluche, difteria e tétano — consulte seu médico.',
    motivationalPhrase: 'Metade da jornada, o dobro de amor. Você está radiante. ✨',
    weeklyChecklist: [
      'Realizar o ultrassom morfológico do 2º trimestre (janela: 20 a 24 semanas)',
      'Tomar a vacina dTpa conforme o calendário vacinal de gestantes',
      'Medir a pressão arterial regularmente',
      'Intensificar os exercícios de Kegel',
      'Pesquisar cursos de preparação para o parto e amamentação',
      'Manter a suplementação de ferro e ácido fólico',
    ],
    warningSignals: [
      { description: 'Pressão arterial acima de 14/9, sobretudo com dor de cabeça ou visão turva', severity: 'urgent' },
      { description: 'Perda de líquido amniótico — calcinha molhada de forma constante e incolor', severity: 'urgent' },
      { description: 'Sangramento vaginal de qualquer quantidade', severity: 'urgent' },
      { description: 'Dor abdominal tipo cólica forte e contrações frequentes', severity: 'urgent' },
      { description: 'Febre ou calafrios — possível infecção', severity: 'urgent' },
    ],
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
      heartbeatBpm: '120–160 bpm',
      milestones: [
        '🤨 Sobrancelhas e pálpebras — os fios das sobrancelhas estão no lugar e as pálpebras já estão estruturadas',
        '🍭 Deglutição de açúcar — o bebê engole líquido amniótico e seu sistema digestivo extrai água e glicose',
        '🦴 Medula óssea ativa — assume o papel principal na produção de glóbulos vermelhos',
        '👂 Reconhecimento de vozes — o bebê começa a distinguir a voz da mãe de outros sons do ambiente',
        '🦶 Coordenação motora — os chutes ficam mais precisos; o bebê toca o rosto e segura o cordão umbilical',
      ],
      clinicalMilestone: 'Pele começa a responder ao toque; muda-se a medida de comprimento para cabeça ao calcanhar (crown-heel).',
    },
    symptoms: [
      '🍗 Aumento do apetite — o corpo pede nutrientes extras para o crescimento fetal',
      '🩸 Varizes e vasinhos — o maior volume de sangue e a pressão do útero favorecem pequenas varizes',
      '🏜️ Estrias incipientes — a pele esticando ao máximo pode causar coceira e marcas avermelhadas',
      '🦷 Gengivas sensíveis — os hormônios aumentam o fluxo sanguíneo, causando sangramentos leves',
      '😴 Insônia gestacional — a dificuldade de posição e a atividade noturna do bebê atrapalham o sono',
      '💨 Palpitações leves — o coração bate mais rápido para bombear o volume extra de sangue',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(21),
    curiosities: [
      'O sistema auditivo está tão desenvolvido que o bebê já distingue a sua voz de outros sons',
      'O bebê engole líquido amniótico e seu intestino já consegue absorver água e glicose',
      'A medula óssea assume a produção de glóbulos vermelhos, antes dividida com o fígado e o baço',
    ],
    weeklyTip: 'Prefira lanches com proteína entre as refeições (iogurte, ovos, castanhas) — mantêm a saciedade e evitam picos de açúcar.',
    motivationalPhrase: 'Cada chutinho é um "oi, mamãe" do jeito mais adorável possível. 🥕',
    weeklyChecklist: [
      'Revisar os resultados do ultrassom morfológico, se já realizado',
      'Iniciar ou manter a aplicação de óleos para prevenção de estrias',
      'Consultar o dentista se notar sangramento persistente nas gengivas',
      'Manter a rotina de exercícios leves (30 min, 3 a 5 vezes por semana)',
      'Observar o padrão de movimentos do bebê ao longo do dia',
      'Planejar a vacina dTpa, se ainda não tomou',
    ],
    warningSignals: [
      { description: 'Dor pélvica tipo pressão ou contrações frequentes', severity: 'urgent' },
      { description: 'Inchaço assimétrico com dor na panturrilha de uma perna', severity: 'urgent' },
      { description: 'Perda de líquido ou sangue pela vagina', severity: 'urgent' },
      { description: 'Tontura com desmaio', severity: 'urgent' },
      { description: 'Sangramento gengival excessivo', severity: 'monitor' },
    ],
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
      comparison: 'Mamão-papaia',
      heartbeatBpm: '120–160 bpm',
      milestones: [
        '🖐️ Tato em evidência — o bebê explora o ambiente tocando o cordão, o rosto e os membros',
        '💡 Percepção de luz — mesmo com as pálpebras seladas, os olhos já captam a luminosidade externa',
        '👂 Reação a sons — o bebê ouve e já tem preferências: músicas suaves acalmam, ruídos altos assustam',
        '🥚 Sistema reprodutor — nos meninos os testículos começam a descer; nas meninas útero e ovários já estão em posição',
        '🧠 Maturação do córtex — o cérebro cria bilhões de conexões sinápticas para processar as sensações',
      ],
      clinicalMilestone: 'Pulmões se desenvolvem rapidamente; o bebê começa a se parecer com um recém-nascido em miniatura.',
    },
    symptoms: [
      '💨 Falta de ar leve — a pressão do útero sobre o diafragma torna a respiração mais superficial',
      '🔥 Ondas de calor — o aumento do metabolismo e do fluxo sanguíneo causa episódios de calor súbito',
      '🦵 Pernas e pés inchados — o edema é comum ao fim do dia, especialmente após muito tempo parada',
      '⚡ Contrações de Braxton Hicks — o útero faz pequenos espasmos de treino, deixando a barriga dura',
      '🤰 Estrias e coceira — a pele da barriga continua esticando, intensificando a coceira',
      '🛌 Dores pélvicas — a relaxina afrouxa os ligamentos da bacia, causando desconforto ao caminhar',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(22),
    curiosities: [
      'O sentido do tato vira a principal ferramenta de exploração — o bebê sente as mãos, o rosto e o útero',
      'Mesmo com as pálpebras fechadas, o bebê já percebe a luz que atravessa a barriga',
      'As contrações de Braxton Hicks são "treinos" indolores do útero para o parto, normais a partir de agora',
    ],
    weeklyTip: 'Beba água constantemente — a desidratação é uma das principais causas de contrações de treinamento frequentes.',
    motivationalPhrase: 'Você nutre não apenas o corpo dele, mas todos os seus sentidos. 🌽',
    weeklyChecklist: [
      'Realizar o ultrassom morfológico do 2º trimestre, se ainda não fez',
      'Iniciar a contagem de movimentos fetais em períodos de relaxamento',
      'Aplicar protetor solar diariamente para prevenir o agravamento do melasma',
      'Beber de 2 a 3 litros de água por dia para evitar contrações de treinamento excessivas',
      'Fazer exercícios de alongamento para a região lombar e pélvica',
      'Organizar a lista da mala da maternidade',
    ],
    warningSignals: [
      { description: 'Contrações dolorosas e rítmicas em intervalos regulares', severity: 'urgent' },
      { description: 'Sangramento vaginal, mesmo que pequeno', severity: 'urgent' },
      { description: 'Perda de líquido incolor com cheiro de cloro — possível bolsa rompida', severity: 'urgent' },
      { description: 'Dor de cabeça intensa e persistente que não passa', severity: 'urgent' },
      { description: 'Visão com pontos brilhantes — sinal de alerta para pré-eclâmpsia', severity: 'urgent' },
    ],
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
      heartbeatBpm: '120–160 bpm',
      milestones: [
        '👂 Audição seletiva — o bebê reconhece sons familiares, especialmente a sua voz e o seu coração',
        '🫁 Vasos pulmonares — os capilares dos pulmões se multiplicam, preparando o órgão para respirar',
        '🧴 Pigmentação da pele — a pele perde a transparência e ganha tonalidade rosada',
        '🦶 Movimentos visíveis — chutes e piruetas já causam ondulações visíveis na superfície da barriga',
        '🧠 Sono REM — o cérebro apresenta padrões de sono REM, indicando que o bebê pode estar sonhando',
      ],
      clinicalMilestone: 'Capaz de ouvir e reconhecer a voz da mãe; cérebro e audição em desenvolvimento acelerado.',
    },
    symptoms: [
      '🦶 Edema (inchaço) — a pressão do útero nas veias pélvicas causa inchaço nos pés e tornozelos',
      '🩸 Sangramento nasal e gengival — o aumento da circulação deixa as mucosas mais frágeis',
      '⚡ "Brain fog" gestacional — esquecimentos e distração ligados às mudanças hormonais e à falta de sono',
      '🛌 Cãibras noturnas — espasmos dolorosos nas panturrilhas pelo cansaço muscular',
      '🤰 Linha nigra — a linha escura que divide a barriga fica mais evidente pela pigmentação hormonal',
      '💨 Palpitações e calor — o esforço cardíaco extra causa coração acelerado e ondas de calor',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(23),
    curiosities: [
      'O bebê pesa cerca de meio quilo e já reconhece a sua voz entre outros sons',
      'O cérebro já apresenta sono REM — o bebê pode estar começando a sonhar dentro do útero',
      'A partir do marco de meio quilo, as chances de sobrevivência em caso de parto prematuro aumentam',
    ],
    weeklyTip: 'Eleve os pés acima do nível do coração por 20 minutos ao fim do dia para drenar o excesso de líquido das pernas.',
    motivationalPhrase: 'Meio quilo de amor puro crescendo dentro de você. Que privilégio. 🍆',
    weeklyChecklist: [
      'Monitorar o ganho de peso semanal conforme a orientação médica',
      'Praticar exercícios de relaxamento para melhorar a qualidade do sono',
      'Beber água constantemente, mesmo sem sentir sede, para evitar contrações',
      'Planejar a vacina dTpa, se ainda não tomou',
      'Aplicar hidratantes nas pernas e pés para aliviar a sensação de peso',
      'Manter a suplementação de ferro e vitaminas prescrita pelo obstetra',
    ],
    warningSignals: [
      { description: 'Inchaço súbito nas mãos ou rosto, sobretudo com dor de cabeça', severity: 'urgent' },
      { description: 'Diminuição brusca dos movimentos do bebê após estimulá-lo', severity: 'urgent' },
      { description: 'Sangramento vaginal de qualquer quantidade', severity: 'urgent' },
      { description: 'Dor lombar intensa e constante', severity: 'monitor' },
      { description: 'Corrimento com coceira ou cheiro forte', severity: 'monitor' },
    ],
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
      heartbeatBpm: '120–160 bpm',
      milestones: [
        '🛡️ Viabilidade fetal — bebês nascidos a partir desta semana já têm chances reais de sobrevivência em UTI neonatal',
        '🫁 Início do surfactante — as células pulmonares começam a produzir a substância que permitirá respirar',
        '👂 Audição completa — o ouvido interno está totalmente desenvolvido; o bebê se assusta e se acalma com sons',
        '🧠 Sulcos cerebrais — a superfície do cérebro forma dobras e sulcos, ampliando a área de processamento',
        '👁️ Pálpebras se abrindo — em breve o bebê começará a abrir e fechar os olhos, praticando o reflexo de piscar',
      ],
      clinicalMilestone: 'Rosto quase totalmente formado; olhos se abrem pela primeira vez.',
    },
    symptoms: [
      '🦵 Pernas pesadas e inchaço — o útero comprime os vasos pélvicos, dificultando o retorno do sangue',
      '🏜️ Coceira na barriga e seios — o estiramento da pele causa prurido; evite coçar com as unhas',
      '👁️ Olhos secos e sensíveis — as mudanças hormonais reduzem a produção de lágrimas',
      '🛌 Sono interrompido — entre os chutes do bebê e a vontade de urinar, o sono contínuo fica raro',
      '🔥 Azia e refluxo — a progesterona relaxa a válvula do estômago e o útero o empurra para cima',
      '⚡ Contrações de treinamento — as Braxton Hicks ficam mais frequentes, mas indolores e irregulares',
    ],
    care: careT2,
    nutrients: NUTRIENTS_T2,
    exams: getExamsForWeek(24),
    curiosities: [
      'A semana 24 marca o limite de viabilidade fetal — um divisor de águas da gestação',
      'Os pulmões começam a produzir surfactante, substância que impede que os alvéolos colapsem ao respirar',
      'A superfície do cérebro, antes lisa, começa a formar sulcos e dobras para processar informações complexas',
    ],
    weeklyTip: 'O Teste Oral de Tolerância à Glicose (TOTG) é feito entre as semanas 24 e 28 — agende com seu médico para rastrear o diabetes gestacional.',
    motivationalPhrase: 'Cada semana que passa, mais próxima você está do encontro mais esperado da sua vida. 🌽',
    weeklyChecklist: [
      'Realizar o Teste de Tolerância à Glicose (TOTG) entre as semanas 24 e 28',
      'Medir a pressão arterial em todas as consultas de pré-natal',
      'Manter a hidratação da pele para evitar o agravamento das estrias',
      'Praticar exercícios de baixo impacto (caminhada, hidroginástica) regularmente',
      'Observar e registrar os períodos de maior atividade do bebê',
      'Iniciar o planejamento do plano de parto com o obstetra',
    ],
    warningSignals: [
      { description: 'Visão turva ou dor de cabeça frontal — sinal de alerta para pré-eclâmpsia', severity: 'urgent' },
      { description: 'Contrações com dor e ritmo a cada 10 a 15 minutos', severity: 'urgent' },
      { description: 'Sangramento ou perda de líquido pela vagina', severity: 'urgent' },
      { description: 'Febre sem causa aparente', severity: 'urgent' },
      { description: 'Sede excessiva e urina frequente — possível diabetes gestacional', severity: 'monitor' },
    ],
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
      comparison: 'Abobrinha',
      heartbeatBpm: '140–160 bpm',
      milestones: [
        'O cabelo continua crescendo e ganhando cor',
        'As narinas se abrem — o bebê "cheira" o líquido amniótico',
        'O sistema nervoso central está cada vez mais organizado',
        'Os pulmões continuam amadurecendo',
        'O bebê pode reconhecer a voz do pai',
        'O reflexo de sobressalto (Moro) já está presente',
      ],
      clinicalMilestone: 'Pulmões continuam amadurecendo; a pele fica menos translúcida.',
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
      clinicalMilestone: 'Olhos abertos e piscando; padrão de sono e vigília que a mãe consegue perceber.',
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
      comparison: 'Couve-flor',
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
      clinicalMilestone: 'Soluços fetais; reconhece vozes e responde à luz; fim do 2º trimestre.',
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
