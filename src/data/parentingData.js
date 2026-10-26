// Currículo Bíblico e Prático de Formação de Filhos & Família em Casal
// Organizado por Tópicos Semanais e Desafios Reais da Criação Cristã

export const PARENTING_CATEGORIES = [
  { id: 'all', label: 'Todos os Tópicos', icon: '🌟' },
  { id: 'behavior', label: 'Comportamento & Rebeldia', icon: '🛡️' },
  { id: 'emotions', label: 'Birras & Emoções', icon: '🌊' },
  { id: 'heart', label: 'Coração & Virtudes', icon: '❤️' },
  { id: 'marriage', label: 'Casamento & Lar', icon: '💑' },
  { id: 'growth', label: 'Irmãos & Sabedoria Digital', icon: '🤝' }
];

export const PARENTING_TOPICS = [
  {
    id: 'topic-rebellion',
    topicNumber: 1,
    weekLabel: 'Semana 1',
    category: 'behavior',
    categoryLabel: 'Comportamento & Rebeldia',
    icon: '🛡️',
    topicTitle: 'Filho Rebelde & Desobediência',
    topicTitleEn: 'Rebellious Child & Defiance',
    title: 'Dealing with Rebellion: Reaching the Heart Beyond Defiance',
    titlePt: 'Lidando com a Rebeldia: Alcançando o Coração Além da Desobediência',
    verseRef: 'Hebrews 12:11 & Ephesians 6:4',
    verseEn: 'No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it. Fathers, do not exasperate your children; instead, bring them up in the training and instruction of the Lord.',
    versePt: 'Nenhuma disciplina parece ser motivo de alegria no momento, mas sim de tristeza. Mais tarde, porém, produz fruto de justiça e paz para os que por ela foram exercitados. Pais, não irritem seus filhos; antes, criem-nos na disciplina e na instrução do Senhor.',
    audioSnippet: 'No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace.',
    keywords: [
      {
        word: 'defiance',
        ipa: '/dɪˈfaɪ.əns/',
        pos: 'noun',
        meaningPt: 'desafio aberto à autoridade, desacato deliberado',
        contextNote: 'Diferente de um erro por distração, a rebeldia é a intenção consciente de desobedecer à instrução dos pais.',
        exampleEn: 'Calm consistency from parents diffuses defiance before it turns into rebellion.',
        examplePt: 'A consistência calma dos pais desativa o desafio à autoridade antes que ele se torne rebeldia.'
      },
      {
        word: 'firmness',
        ipa: '/ˈfɝːm.nəs/',
        pos: 'noun',
        meaningPt: 'firmeza tranquila, constância inabalável sem agressividade',
        contextNote: 'Pais sábios corrigem com autoridade mansa, sem gritos ou descontrole emocional.',
        exampleEn: 'We correct with tenderness in our voice and firmness in our boundary.',
        examplePt: 'Corrigimos com ternura na voz e firmeza nos limites estabelecidos.'
      },
      {
        word: 'boundary',
        ipa: '/ˈbaʊn.dɚ.i/',
        pos: 'noun',
        meaningPt: 'fronteira moral, limite claro de conduta e segurança',
        contextNote: 'Limites bíblicos comunicam amor e impedem que a criança se sinta desamparada.',
        exampleEn: 'Clear boundaries give children a safe sanctuary where they can flourish.',
        examplePt: 'Limites claros dão aos filhos um santuário seguro onde eles podem florescer.'
      },
      {
        word: 'heart repentance',
        ipa: '/hɑːrt rɪˈpen.təns/',
        pos: 'noun phrase',
        meaningPt: 'arrependimento genuíno do coração (não apenas medo da punição)',
        contextNote: 'O objetivo da correção bíblica não é apenas fazer a criança pedir desculpas rápidas, mas reconhecer a ofensa diante de Deus.',
        exampleEn: 'Pray for heart repentance rather than superficial apologies.',
        examplePt: 'Orem por arrependimento de coração em vez de desculpas superficiais.'
      },
      {
        word: 'reconciliation',
        ipa: '/ˌrek.ənˌsɪl.iˈeɪ.ʃən/',
        pos: 'noun',
        meaningPt: 'reconciliação restauradora e abraço de perdão',
        contextNote: 'Toda disciplina deve terminar com abraço afetuoso e reafirmação do amor incondicional dos pais.',
        exampleEn: 'True discipline always concludes with warm reconciliation and prayer.',
        examplePt: 'A verdadeira disciplina sempre se encerra com reconciliação afetuosa e oração.'
      }
    ],
    devotionalEn: `Every Christian parent will face moments when a child digs their heels in and says "No!" Defiance is a direct challenge to the authority God established in the home. However, Scripture cautions fathers and mothers: "Do not exasperate your children." When parents react with shouting, sarcasm, or anger, they stoop to the child's level of immaturity. Biblical discipline requires calm, unflinching firmness. We do not discipline to vent our adult frustration, but to shepherd a wandering soul back into the safety of God's blessing. Explain the moral boundary clearly, apply the loving consequence consistently, and immediately follow through with the ministry of reconciliation. When the child repents, embrace them, pray together, and affirm that they are deeply loved and fully restored.`,
    devotionalPt: `Todo pai e mãe cristão enfrentará dias em que o filho bate o pé e desafia: "Não vou fazer!" A rebeldia é um teste direto à autoridade que Deus instituiu no lar. Contudo, as Escrituras alertam os pais: "Não exasperem seus filhos." Quando os pais reagem com gritos, ironias ou raiva descontrolada, eles se rebaixam ao nível de imaturidade da criança. A disciplina bíblica requer firmeza calma e inabalável. Não corrigimos para descarregar frustrações de adultos, mas para pastorear uma alma de volta à segurança das bênçãos de Deus. Explique o limite moral com clareza, aplique a consequência amorosa com constância e, em seguida, exerça o ministério da reconciliação. Quando a criança se arrepender, abrace-a com ternura, orem juntos e reafirme que ela é profundamente amada e totalmente restaurada.`,
    grammarGem: {
      title: 'Estruturas de Firmeza Mansa: "I expect you to..." vs. Ordens Agressivas',
      explanation: 'Em inglês familiar culto, pais firmes e afetuosos usam "I expect you to [verb]" ou "In our home, we choose to [verb]" para estabelecer autoridade sem exasperar a criança.',
      example: 'Instead of shouting: "Stop being rude!"\nSay with calm authority: "I love you, but in our home we speak with respect. I expect you to try that again with a gentle voice."'
    },
    parentPrayerEn: 'Heavenly Father, grant Adam and Marcela supernatural patience when our children test boundaries and show defiance. Deliver us from the temptation of anger and shouting. Give us the calm authority of Christ, who corrected with truth and restored with grace. May our home be an altar where rebellion is dissolved by persistent, holy love. In Jesus\' mighty name, Amen.',
    parentPrayerPt: 'Pai Celestial, concede ao Adam e à Marcela paciência sobrenatural quando nossos filhos testarem limites e demonstrarem rebeldia. Livra-nos da tentação da ira e dos gritos. Dá-nos a autoridade mansa de Cristo, que corrigia com a verdade e restaurava com graça. Que nosso lar seja um altar onde a desobediência seja desarmada por um amor santo e constante. No poderoso nome de Jesus, Amém.',
    quiz: [
      {
        question: 'Segundo o ensino bíblico em Efésios 6:4 e Hebreus 12:11, como os pais devem responder à rebeldia de um filho?',
        questionEn: 'According to biblical teaching, how should parents respond to a child’s defiance?',
        options: [
          'Com autoridade calma, limites consistentes e reconciliação afetuosa, sem exasperar ou gritar com a criança',
          'Gritando mais alto para provar quem manda na casa',
          'Ignorando a desobediência e fingindo que nada aconteceu',
          'Expulsando a criança do quarto até o dia seguinte'
        ],
        correctIndex: 0,
        explanation: 'A disciplina bíblica jamais visa humilhar ou desabafar raiva; ela instrui com firmeza mansa e conclui com amor restaurador.'
      },
      {
        question: 'Qual é o papel da "reconciliation" (reconciliação) logo após a correção de um comportamento rebelde?',
        questionEn: 'What is the role of reconciliation immediately after correcting a rebellious behavior?',
        options: [
          'Comprar presentes caros para compensar o castigo',
          'Garantir à criança com um abraço e oração que o pecado foi perdoado e que o amor dos pais permanece inabalável',
          'Relembrar o erro da criança pelo resto da semana',
          'Fazer a criança assinar um contrato por escrito'
        ],
        correctIndex: 1,
        explanation: 'A reconciliação cura o coração da criança, demonstrando o perdão da cruz e renovando a comunhão familiar.'
      }
    ]
  },
  {
    id: 'topic-tantrums',
    topicNumber: 2,
    weekLabel: 'Semana 2',
    category: 'emotions',
    categoryLabel: 'Birras & Emoções',
    icon: '🌊',
    topicTitle: 'Birras, Frustração & Domínio Próprio',
    topicTitleEn: 'Tantrums, Meltdowns & Self-Control',
    title: 'Taming the Storm: Helping Children Master Frustration with Self-Control',
    titlePt: 'Acalmando a Tempestade: Ajudando os Filhos a Vencerem Birras com Domínio Próprio',
    verseRef: 'Proverbs 16:32 & James 1:19-20',
    verseEn: 'Better a patient person than a warrior, one with self-control than one who takes a city. My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry, because human anger does not produce the righteousness that God desires.',
    versePt: 'Melhor é o homem paciente do que o guerreiro, mais vale controlar o seu espírito do que conquistar uma cidade. Meus amados irmãos, tenham isto em mente: Sejam todos prontos para ouvir, tardios para falar e tardios para se irar, pois a ira humana não produz a justiça de Deus.',
    audioSnippet: 'Better a patient person than a warrior, one with self-control than one who takes a city.',
    keywords: [
      {
        word: 'tantrum',
        ipa: '/ˈtæn.trəm/',
        pos: 'noun',
        meaningPt: 'birra, crise emocional de raiva ou frustração',
        contextNote: 'Uma explosão emocional quando a criança não consegue lidar com um "não" ou com a frustração.',
        exampleEn: 'Never reward a tantrum by giving in to the child’s emotional demands.',
        examplePt: 'Nunca recompense uma birra cedendo às exigências emocionais da criança.'
      },
      {
        word: 'self-control',
        ipa: '/ˌself.kənˈtroʊl/',
        pos: 'noun',
        meaningPt: 'domínio próprio, autocontrole (fruto do Espírito Santo)',
        contextNote: 'A virtude que capacita a criança a frear impulsos e esperar com serenidade.',
        exampleEn: 'Self-control is a spiritual muscle that grows with patient parental training.',
        examplePt: 'O domínio próprio é um músculo espiritual que cresce com o treino paciente dos pais.'
      },
      {
        word: 'meltdown',
        ipa: '/ˈmelt.daʊn/',
        pos: 'noun',
        meaningPt: 'colapso emocional por exaustão ou sobrecarga sensorial',
        contextNote: 'Geralmente ocorre quando a criança está cansada, com fome ou hiperestimulada.',
        exampleEn: 'Distinguish between a willful tantrum and an exhausted emotional meltdown.',
        examplePt: 'Distinga entre uma birra proposital e um colapso emocional por exaustão.'
      },
      {
        word: 'safe harbor',
        ipa: '/seɪf ˈhɑːr.bɚ/',
        pos: 'noun phrase',
        meaningPt: 'porto seguro, presença acolhedora e estável dos pais',
        contextNote: 'Quando a tempestade emocional atinge a criança, o pai e a mãe devem ser a âncora serena.',
        exampleEn: 'Be a safe harbor during your child’s emotional storm, not another hurricane.',
        examplePt: 'Seja um porto seguro durante a tempestade emocional do seu filho, e não outro furacão.'
      },
      {
        word: 'de-escalate',
        ipa: '/diːˈes.kə.leɪt/',
        pos: 'verb',
        meaningPt: 'desarmar a tensão, acalmar o conflito progressivamente',
        contextNote: 'Usar voz baixa e respiração calma para baixar os batimentos e a adrenalina da criança.',
        exampleEn: 'Lowering your vocal pitch helps de-escalate tension immediately.',
        examplePt: 'Abaixar o tom da sua voz ajuda a desarmar a tensão de imediato.'
      }
    ],
    devotionalEn: `When a toddler or young child throws themselves onto the floor, screaming and flailing, parents feel immediate stress, especially in public places. The worldly urge is either to explode in anger or to surrender to the child's demands just to stop the noise. Both responses are fatal to moral development. If you surrender to a tantrum, you teach the child that emotional manipulation is a superpower. If you scream back, you show them that adults also lack self-control. Scripture teaches that one who controls their spirit is greater than a mighty warrior. When a tantrum strikes, stay anchored. Whisper instead of shouting. Remove the child to a quiet place, wait for the emotional storm to pass without giving in, and then help them identify their feelings while practicing self-control in Christ.`,
    devotionalPt: `Quando uma criança pequena se joga no chão, gritando e esperneando, os pais sentem um estresse imediato, ainda mais em locais públicos. O impulso da carne é explodir de raiva ou ceder às exigências da criança apenas para cessar o barulho. Ambas as reações são fatais para a formação do caráter. Se você cede à birra, ensina que a chantagem emocional é um superpoder. Se você grita de volta, demonstra que você também não possui domínio próprio. A Bíblia ensina que quem domina seu espírito vale mais que um guerreiro conquistador. Quando a birra surgir, mantenha-se ancorado. Fale baixo em vez de gritar. Leve a criança para um lugar calmo, espere a tempestade passar sem negociar o "não" e depois ensine-a a dar nome aos sentimentos praticando o autocontrole em Cristo.`,
    grammarGem: {
      title: 'Vocabulário de Moderação Emocional: "Take a deep breath" & "Quiet heart"',
      explanation: 'Use comandos carinhosos de desaceleração em inglês com as crianças: "Let\'s take a deep breath together" (Vamos respirar fundo juntos) e "Let\'s wait for a quiet heart" (Vamos esperar o coração se acalmar).',
      example: '"I hear you are upset, but screaming does not solve problems. Let\'s take a deep breath and wait for a quiet heart."'
    },
    parentPrayerEn: 'Lord Jesus, when emotional storms shake our home, be our peace. Grant us the supernatural grace to remain calm and anchored when our children throw tantrums. Teach us how to cultivate self-control in their tender hearts, showing them that true strength lies in a quiet, trusting spirit. May our patience reflect Your unfailing gentleness. In Your holy name, Amen.',
    parentPrayerPt: 'Senhor Jesus, quando tempestades emocionais abalarem nossa casa, sê a nossa paz. Concede-nos graça sobrenatural para permanecermos serenos e firmes quando nossos filhos tiverem birras. Ensina-nos a cultivar o domínio próprio no coração deles, mostrando que a verdadeira força repousa num espírito manso e confiante. Que a nossa paciência reflita a Tua infinita brandura. Em Teu santo nome, Amém.',
    quiz: [
      {
        question: 'O que acontece quando os pais cedem a uma birra para fazer a criança parar de chorar?',
        questionEn: 'What happens when parents give in to a tantrum just to stop the crying?',
        options: [
          'A criança aprende que a chantagem emocional funciona e repetirá o comportamento no futuro',
          'A criança se torna mais calma e agradecida no dia seguinte',
          'O problema é resolvido para sempre de forma bíblica',
          'A criança aprende inglês nativo instantaneamente'
        ],
        correctIndex: 0,
        explanation: 'Ceder à birra reforça na mente da criança que o descontrole emocional é o caminho para conseguir o que quer.'
      },
      {
        question: 'Qual é a atitude mais bíblica e sábia dos pais diante de uma crise de birra?',
        questionEn: 'What is the most biblical and wise parental posture during a tantrum?',
        options: [
          'Manter a calma, abaixar o tom de voz, não ceder à exigência e ensinar o domínio próprio após o término do choro',
          'Gritar mais alto e bater portas para intimidar a criança',
          'Prometer doces e brinquedos para a criança ficar quieta',
          'Deixar a criança sozinha na rua'
        ],
        correctIndex: 0,
        explanation: 'Pais equilibrados atuam como porto seguro: não alimentam a raiva, mantêm o limite e pastoreiam o domínio próprio.'
      }
    ]
  },
  {
    id: 'topic-heart-reasons',
    topicNumber: 3,
    weekLabel: 'Semana 3',
    category: 'heart',
    categoryLabel: 'Coração & Virtudes',
    icon: '❤️',
    topicTitle: 'Alcançando o Coração da Criança',
    topicTitleEn: 'Guarding the Heart: Moral Reasons Over Rules',
    title: 'Beyond Behavior: Teaching Moral Reasons to Form the Child’s Heart',
    titlePt: 'Além do Comportamento: Ensinando Razões Morais para Formar o Coração do Filho',
    verseRef: 'Proverbs 4:23 & Deuteronomy 6:6-7',
    verseEn: 'Above all else, guard your heart, for everything you do flows from it. These commandments that I give you today are to be on your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you lie down and when you get up.',
    versePt: 'Acima de tudo, guarde o seu coração, pois dele procedem as fontes da vida. Estas palavras que hoje lhe ordeno devem estar no seu coração. Ensine-as com persistência aos seus filhos. Converse sobre elas quando estiver em casa e quando andar pelo caminho, ao deitar-se e ao levantar-se.',
    audioSnippet: 'Above all else, guard your heart, for everything you do flows from it. Impress them on your children.',
    keywords: [
      {
        word: 'moral reasons',
        ipa: '/ˈmɔːr.əl ˈriː.zənz/',
        pos: 'noun phrase',
        meaningPt: 'razões morais (o porquê bíblico e espiritual da ação)',
        contextNote: 'O princípio essencial: explicar o propósito divino da regra em vez de dar ordens secas.',
        exampleEn: 'We teach moral reasons so our children obey from deep conviction, not mere fear.',
        examplePt: 'Ensinamos razões morais para que nossos filhos obedeçam por convicção profunda, e não por mero medo.'
      },
      {
        word: 'virtues',
        ipa: '/ˈvɝː.tʃuːz/',
        pos: 'noun (plural)',
        meaningPt: 'virtudes eternas e absolutas fundamentadas no caráter de Deus',
        contextNote: 'Diferente de valores humanos mutáveis, virtudes como verdade, justiça e misericórdia nunca passam.',
        exampleEn: 'Christian parenting anchors the soul to eternal virtues that withstand cultural storms.',
        examplePt: 'A paternidade cristã ancora a alma em virtudes eternas que resistem às tempestades culturais.'
      },
      {
        word: 'internalize',
        ipa: '/ɪnˈtɝː.nə.laɪz/',
        pos: 'verb',
        meaningPt: 'internalizar, abraçar intimamente como valor pessoal',
        contextNote: 'Quando a verdade divina deixa de ser a regra do pai e vira a convicção do filho.',
        exampleEn: 'Our daily prayers aim for children to internalize the truth as their own compass.',
        examplePt: 'Nossas orações diárias visam que os filhos internalizem a verdade como sua própria bússola.'
      },
      {
        word: 'conformity',
        ipa: '/kənˈfɔːr.mə.t̬i/',
        pos: 'noun',
        meaningPt: 'mera conformidade exterior sem transformação do íntimo',
        contextNote: 'Comportar-se bem apenas para evitar broncas enquanto os adultos estão olhando.',
        exampleEn: 'Outward conformity without inner faith often collapses in college years.',
        examplePt: 'A conformidade exterior sem fé interior frequentemente desmorona nos anos da faculdade.'
      },
      {
        word: 'moral warehouse',
        ipa: '/ˈmɔːr.əl ˈwer.haʊs/',
        pos: 'noun phrase',
        meaningPt: 'depósito moral (o estoque de princípios e sabedoria gravados no coração)',
        contextNote: 'Metáfora da formação do caráter: abastecer a mente infantil com verdades das Escrituras.',
        exampleEn: 'Daily conversations stock the child’s moral warehouse for future moral choices.',
        examplePt: 'Conversas diárias abastecem o depósito moral da criança para as escolhas morais do futuro.'
      }
    ],
    devotionalEn: `God is never satisfied with mere outward performance; His focus is relentlessly on the human heart. If parenting consists only of shouting "Don't touch that!" or "Be quiet!", we might produce an outwardly polite child, but one with an unregenerate, rebellious inner world. Biblical training requires explaining "moral reasons"—the sacred "why" behind every virtue. When a child snatches a toy, don't merely say "Give it back." Teach the moral reason: "In God's kingdom, love is kind and patient. When we snatch, we hurt our brother's feelings. Let's practice generosity because Jesus gave everything for us." By connecting everyday actions to divine virtues, we stock our children's moral warehouse with eternal truth that will guide them long after they leave our home.`,
    devotionalPt: `Deus nunca se contenta com meras aparências exteriores; o Seu alvo constante é o coração humano. Se a educação dos filhos se resumir a ordens secas como "Não toque nisso!" ou "Fique quieto!", poderemos até produzir uma criança bem-educada aos olhos dos outros, mas com um interior endurecido e rebelde. O discipulado bíblico exige ensinar "razões morais" — o "porquê" sagrado por trás de cada virtude. Quando uma criança arranca um brinquedo da mão do irmão, não diga apenas "Devolva agora!". Ensine a razão moral: "No Reino de Deus, o amor é paciente e bondoso. Quando você arranca à força, machuca o coração do seu irmão. Vamos praticar a generosidade, porque Jesus entregou tudo por nós." Ao conectar pequenas atitudes a virtudes divinas, abastecemos o depósito moral de nossos filhos com verdades que os guiarão pela vida inteira.`,
    grammarGem: {
      title: 'A Conjunção Moral "So that" para Conectar Princípios',
      explanation: 'Transforme regras em princípios usando a conjunção "so that" (para que / a fim de que). Isso acostuma a criança a pensar nas consequências morais de seus atos.',
      example: '"We tell the truth so that trust can dwell in our home."\n"We tidy our room so that we practice faithful stewardship of God\'s gifts."'
    },
    parentPrayerEn: 'Sovereign God, guard our hearts as parents so that we never settle for mere behavioral management. Grant Adam and Marcela divine wisdom to reach the heart of our children. Teach us to explain moral reasons with patience, gentleness, and grace. May divine virtues be etched deeply into the fabric of our family for generations to come. In Jesus\' name, Amen.',
    parentPrayerPt: 'Deus Soberano, guarda nossos corações como pais para que jamais nos contentemos com a mera gestão de comportamento. Concede ao Adam e à Marcela sabedoria do alto para alcançar o íntimo de nossos filhos. Ensina-nos a explicar razões morais com paciência, doçura e graça. Que virtudes divinas sejam gravadas no íntimo de nossa família para as futuras gerações. Em nome de Jesus, Amém.',
    quiz: [
      {
        question: 'Qual é o perigo da "mera conformidade exterior" (outward conformity) sem alcançar o coração?',
        questionEn: 'What is the danger of mere outward conformity without heart transformation?',
        options: [
          'A criança aprende a fingir na frente dos pais e se desvia assim que ganha liberdade',
          'A criança aprende a ler rápido demais',
          'A criança dorme cedo',
          'Não há perigo algum, conformidade é o alvo da Bíblia'
        ],
        correctIndex: 0,
        explanation: 'Se o coração não foi transformado pelas razões morais bíblicas, a criança abandonará a fé quando estiver longe dos olhos dos pais.'
      },
      {
        question: 'Como os pais ensinam "moral reasons" (razões morais) no dia a dia da casa?',
        questionEn: 'How do parents teach moral reasons in everyday family life?',
        options: [
          'Explicando com paciência o motivo bíblico e como cada atitude honra a Deus e abençoa o próximo',
          'Distribuindo castigos em silêncio sem conversar',
          'Contratando professores particulares para todas as matérias',
          'Dando dinheiro em troca de obediência'
        ],
        correctIndex: 0,
        explanation: 'Razões morais iluminam a mente da criança, mostrando como o amor a Deus e ao próximo se manifesta em ações concretas.'
      }
    ]
  },
  {
    id: 'topic-marriage-first',
    topicNumber: 4,
    weekLabel: 'Semana 4',
    category: 'marriage',
    categoryLabel: 'Casamento & Lar',
    icon: '💑',
    topicTitle: 'Casamento Forte: O Refúgio dos Filhos',
    topicTitleEn: 'Marriage First: The Fortress of "Sofa Time"',
    title: 'The Fortress of Home: Why a Thriving Marriage is the Greatest Gift to Your Children',
    titlePt: 'A Fortaleza do Lar: Por que um Casamento Vibrante é o Maior Presente aos Filhos',
    verseRef: 'Genesis 2:24 & Ephesians 5:31-33',
    verseEn: 'That is why a man leaves his father and mother and is united to his wife, and they become one flesh. However, each one of you also must love his wife as he loves himself, and the wife must respect her husband.',
    versePt: 'Por essa razão, o homem deixará pai e mãe e se unirá à sua mulher, e eles se tornarão uma só carne. Portanto, cada um de vocês também ame a sua mulher como a si mesmo, e a mulher trate o marido com todo o respeito.',
    audioSnippet: 'That is why a man leaves his father and mother and is united to his wife, and they become one flesh.',
    keywords: [
      {
        word: 'one-flesh union',
        ipa: '/wʌn fleʃ ˈjuː.njən/',
        pos: 'noun phrase',
        meaningPt: 'união de uma só carne (a aliança sagrada e prioritária do casal)',
        contextNote: 'O casamento veio antes dos filhos e deve permanecer como prioridade máxima dos pais.',
        exampleEn: 'Our one-flesh union is the bedrock upon which our children’s confidence is built.',
        examplePt: 'Nossa união de uma só carne é o alicerce sobre o qual a confiança de nossos filhos é construída.'
      },
      {
        word: 'child-centered trap',
        ipa: '/tʃaɪld ˈsen.tɚd træp/',
        pos: 'noun phrase',
        meaningPt: 'a armadilha do lar centrado nas crianças (onde os filhos ditam as regras da casa)',
        contextNote: 'Colocar os filhos como centro do universo sobrecarrega o casamento e gera filhos inseguros e mimados.',
        exampleEn: 'Avoid the child-centered trap by prioritizing your romance and daily date nights.',
        examplePt: 'Evite a armadilha do lar centrado nos filhos priorizando o romance e encontros regulares do casal.'
      },
      {
        word: 'sofa time',
        ipa: '/ˈsoʊ.fə taɪm/',
        pos: 'noun phrase',
        meaningPt: 'tempo de sofá (15 minutos diários de conversa a sós do casal perante os filhos)',
        contextNote: 'Prática de ouro da criação bíblica: o casal senta junto no sofá para conversar, enquanto os filhos esperam com respeito.',
        exampleEn: 'During sofa time, our children learn patience and witness marital harmony in action.',
        examplePt: 'Durante o tempo de sofá, nossos filhos aprendem paciência e testemunham a harmonia do casal em ação.'
      },
      {
        word: 'emotional anchor',
        ipa: '/ɪˈmoʊ.ʃən.əl ˈæŋ.kɚ/',
        pos: 'noun phrase',
        meaningPt: 'âncora emocional (a segurança psicológica inabalável que os filhos recebem)',
        contextNote: 'A maior certeza de uma criança vem de saber que o pai e a mãe se amam com fidelidade.',
        exampleEn: 'Seeing mom and dad embrace provides an unshakeable emotional anchor for our kids.',
        examplePt: 'Ver a mamãe e o papai se abraçando oferece uma âncora emocional inabalável para nossos filhos.'
      },
      {
        word: 'priority',
        ipa: '/praɪˈɔːr.ə.t̬i/',
        pos: 'noun',
        meaningPt: 'prioridade relacional inegociável',
        contextNote: 'Os filhos são hóspedes no lar por cerca de 20 anos; o casamento é uma aliança para a vida inteira.',
        exampleEn: 'Never sacrifice your marriage on the altar of parenting.',
        examplePt: 'Nunca sacrifique seu casamento no altar da criação dos filhos.'
      }
    ],
    devotionalEn: `One of the most liberating truths of Christian family life is that the greatest gift a father can give his children is to love their mother, and the greatest gift a mother can give is to respect their father. When a household becomes "child-centered," the entire family structure is inverted. Children are not emotionally equipped to sit on the throne of the home; it produces anxiety, demanding attitudes, and marital exhaustion. The "one-flesh union" is God's foundational design. A powerful, practical habit to cultivate is daily "sofa time": spending 15 uninterrupted minutes talking, smiling, and holding hands on the couch while the children are taught to play quietly nearby. This visual demonstration speaks louder than a thousand lectures: "Mom and Dad belong to each other, our home is secure, and God is at the center."`,
    devotionalPt: `Uma das verdades mais libertadoras da vida cristã em família é que o maior presente que um pai pode dar aos seus filhos é amar a mãe deles, e o maior presente que uma mãe pode dar é honrar o pai deles. Quando um lar se torna "centrado nos filhos", toda a ordem de Deus se inverte. As crianças não foram criadas para carregar o peso de serem o centro do universo; isso gera ansiedade, caprichos e esgotamento matrimonial. A "união de uma só carne" é a rocha instituída por Deus. Um hábito prático e poderoso é o "tempo de sofá" (sofa time): dedicar 15 minutos diários ininterruptos para conversar, sorrir e dar as mãos no sofá quando o cônjuge chega, enquanto os filhos aprendem a esperar e brincar por perto. Essa imagem fala mais que mil sermões: "Papai e mamãe se amam, nosso lar é seguro e Deus está no centro."`,
    grammarGem: {
      title: 'Expressões Idiomáticas de Prioridade: "To put [something] first" & "Anchor"',
      explanation: 'Use "put our marriage first" para declarar o compromisso conjugal em conversas em inglês com outros casais cristãos.',
      example: '"We always put our marriage first, because healthy parents raise secure children."'
    },
    parentPrayerEn: 'Lord God, thank You for weaving Adam and Marcela into one flesh. Protect our marriage from the stealthy danger of becoming a child-centered home. Renew our romance, our laughter, and our daily sofa time. May our mutual love and respect be a fortress of peace, assuring our children that our home is founded upon Your unbreakable covenant. In Jesus\' name, Amen.',
    parentPrayerPt: 'Senhor Deus, obrigado por teceres o Adam e a Marcela numa só carne. Protege nosso casamento do perigo sutil de nos tornarmos um lar centrado apenas nas crianças. Renova nosso romance, nossos risos e nosso tempo diário de sofá. Que nosso amor e honra mútuos sejam uma fortaleza de paz, assegurando aos nossos filhos que nossa casa repousa na Tua aliança inquebrável. Em nome de Jesus, Amém.',
    quiz: [
      {
        question: 'Por que o modelo de lar "centrado nos filhos" (child-centered) é perigoso para as próprias crianças?',
        questionEn: 'Why is a child-centered home dangerous for the children themselves?',
        options: [
          'Porque sobrecarrega a criança com o peso de ser o centro do mundo, gerando ansiedade, insegurança e desgastando o casamento dos pais',
          'Porque ensina a criança a orar demais',
          'Porque reduz o número de brinquedos no quarto',
          'Não há problema, os filhos devem ser o centro de tudo'
        ],
        correctIndex: 0,
        explanation: 'Crianças encontram verdadeira segurança ao verem que os pais se amam e que a aliança conjugal é sólida como uma rocha.'
      },
      {
        question: 'O que representa o hábito diário do "sofa time" (tempo de sofá) entre marido e mulher?',
        questionEn: 'What does the daily habit of "sofa time" represent in the home?',
        options: [
          'Dormir na sala para fugir das tarefas',
          'Dedicar 15 minutos de atenção mútua do casal perante os filhos, demonstrando visivelmente que o casamento é prioritário e firme',
          'Assistir a séries na TV sem conversar',
          'Cobrar as lições de casa de forma rigorosa'
        ],
        correctIndex: 1,
        explanation: 'O "tempo de sofá" é uma lição visual e prática de amor e paciência para toda a casa.'
      }
    ]
  },
  {
    id: 'topic-love-languages',
    topicNumber: 5,
    weekLabel: 'Semana 5',
    category: 'heart',
    categoryLabel: 'Coração & Virtudes',
    icon: '🗣️',
    topicTitle: 'As 5 Linguagens do Amor nos Filhos',
    topicTitleEn: 'Speaking Their Unique Love Languages',
    title: 'Filling the Reservoir: Discovering and Speaking Your Child’s Love Language',
    titlePt: 'Enchendo o Reservatório: Descobrindo e Falando a Linguagem de Amor de Cada Filho',
    verseRef: '1 John 3:18 & 1 Thessalonians 2:7-8',
    verseEn: 'Dear children, let us not love with words or speech but with actions and in truth. Just as a nursing mother cares for her children, so we cared for you. Because we loved you so much, we were delighted to share with you not only the gospel of God but our lives as well.',
    versePt: 'Filhinhos, não amemos de palavra nem de boca, mas em ação e em verdade. Como a mãe que acaricia os próprios filhos, assim nós tínhamos tanto afeto por vocês que estávamos prontos a dar-lhes não somente o evangelho de Deus, mas a nossa própria vida.',
    audioSnippet: 'Dear children, let us not love with words or speech but with actions and in truth.',
    keywords: [
      {
        word: 'emotional tank',
        ipa: '/ɪˈmoʊ.ʃən.əl tæŋk/',
        pos: 'noun phrase',
        meaningPt: 'tanque emocional (reservatório de carinho, aceitação e segurança interior)',
        contextNote: 'Quando o tanque de amor do filho está vazio, ele reage com desobediência, ciúme e irritabilidade.',
        exampleEn: 'A full emotional tank makes a child far more receptive to discipline and guidance.',
        examplePt: 'Um tanque emocional cheio torna a criança muito mais receptiva à disciplina e orientação.'
      },
      {
        word: 'words of affirmation',
        ipa: '/wɝːdz əv ˌæf.ɚˈmeɪ.ʃən/',
        pos: 'noun phrase',
        meaningPt: 'palavras de afirmação, elogio sincero e encorajamento constante',
        contextNote: 'Uma das cinco linguagens do amor: valorizar o caráter e o esforço do filho.',
        exampleEn: 'Words of affirmation heal insecurity and instill courage in the child’s spirit.',
        examplePt: 'Palavras de afirmação curam a insegurança e injetam coragem no espírito da criança.'
      },
      {
        word: 'quality time',
        ipa: '/ˈkwɑː.lə.t̬i taɪm/',
        pos: 'noun phrase',
        meaningPt: 'tempo de qualidade (olhar nos olhos e atenção plena sem celulares)',
        contextNote: 'Brincar no chão, conversar na cama e ouvir os sonhos da criança sem pressa.',
        exampleEn: 'Ten minutes of undivided quality time is worth more than hours of distracted presence.',
        examplePt: 'Dez minutos de tempo de qualidade exclusivo valem mais que horas de presença distraída.'
      },
      {
        word: 'physical touch',
        ipa: '/ˈfɪz.ɪ.kəl tʌtʃ/',
        pos: 'noun phrase',
        meaningPt: 'toque físico afetuoso (abraços apertados, cafuné, mãos dadas)',
        contextNote: 'Essencial para liberar ocitocina e transmitir proteção nos anos da infância.',
        exampleEn: 'A warm hug communicates unconditional safety faster than spoken words.',
        examplePt: 'Um abraço caloroso comunica segurança incondicional mais rápido que palavras faladas.'
      },
      {
        word: 'acts of service',
        ipa: '/ækts əv ˈsɝː.vɪs/',
        pos: 'noun phrase',
        meaningPt: 'atos de serviço (ajuda prática, cuidado zeloso e desvelo amoroso)',
        contextNote: 'Consertar um brinquedo quebrado ou preparar um lanche favorito como expressão de amor.',
        exampleEn: 'Generous acts of service reflect Christ’s servant heart in our daily routine.',
        examplePt: 'Atos generosos de serviço refletem o coração servo de Cristo em nossa rotina diária.'
      }
    ],
    devotionalEn: `Every child possesses an "emotional tank." When this reservoir runs dry, misbehavior, whining, defensiveness, and withdrawal are the predictable alarms. You may genuinely love your children with all your soul, but if you speak Spanish to someone who only understands French, communication breaks down. In the same way, we must discover each child's primary love language: words of affirmation, quality time, receiving gifts, acts of service, or physical touch. One child will melt with joy when you sit on the floor and build Lego towers for fifteen minutes. Another child will carry a small encouraging note in their pocket all day long. As parents, let us become fluent in our children's emotional dialects so that their tanks remain overflowing with the grace and love of God.`,
    devotionalPt: `Cada filho possui um "tanque emocional". Quando esse reservatório se esvazia, manhas, desobediência, ciúme e isolamento são os alarmes inevitáveis. Você pode amar seus filhos com toda a sua alma, mas se falar espanhol com quem só compreende francês, a comunicação falha. Da mesma maneira, precisamos descobrir a linguagem primária de cada filho: palavras de afirmação, tempo de qualidade, presentes com significado, atos de serviço ou toque físico. Um filho se derrete de alegria quando você senta no chão para montar bloquinhos por quinze minutos. Outro guardará no bolso o dia inteiro um bilhetinho de incentivo que você colocou na mochila. Como casal, sejamos fluentes nos dialetos emocionais de nossos filhos para que seus corações transbordem da graça de Deus.`,
    grammarGem: {
      title: 'Como expressar afirmação afetuosa em inglês com os filhos',
      explanation: 'Use frases curtas e poderosas de afirmação bíblica em inglês: "I believe in you" (Eu acredito em você), "I am proud of your heart" (Tenho orgulho do seu coração) e "God made you with a special purpose" (Deus te fez com um propósito especial).',
      example: '"I noticed how kind you were to your friend today. I am so proud of your generous heart!"'
    },
    parentPrayerEn: 'Father of tender mercy, teach Adam and Marcela to perceive the unique love languages of our children. Forgive us for the moments we were too hurried, distracted by screens, or impatient to listen. Help us keep their emotional reservoirs full of warmth, touch, and affirming words. May our home be saturated with the unmistakable aroma of Christ\'s love. In His precious name, Amen.',
    parentPrayerPt: 'Pai de terna misericórdia, ensina o Adam e a Marcela a perceberem a linguagem única de amor de cada filho. Perdoa-nos pelas vezes em que estivemos com pressa, distraídos por telas ou impacientes para escutar. Ajuda-nos a manter os reservatórios emocionais deles cheios de carinho, abraços e palavras de bênção. Que nossa casa seja perfumada com o aroma do amor de Cristo. Em Seu precioso nome, Amém.',
    quiz: [
      {
        question: 'O que as birras e o mau comportamento frequente de uma criança muitas vezes indicam?',
        questionEn: 'What does frequent misbehavior and whining in a child often signal?',
        options: [
          'Um sinal de alerta de que o "tanque emocional" da criança está vazio de afeto e atenção de qualidade',
          'Que a criança precisa comer mais açúcar',
          'Que a criança deve parar de brincar para sempre',
          'Nada relevante, crianças sempre se comportam mal'
        ],
        correctIndex: 0,
        explanation: 'Muitos conflitos e desobediências são gritos inconscientes de socorro de uma criança carente de afeto na sua linguagem de amor.'
      },
      {
        question: 'Quais são as 5 Linguagens do Amor que todo pai e mãe sábio deve praticar?',
        questionEn: 'What are the 5 Love Languages that wise parents practice at home?',
        options: [
          'Palavras de afirmação, tempo de qualidade, presentes com significado, atos de serviço e toque físico',
          'Gritos, cobranças, notas da escola, tarefas e críticas',
          'Dinheiro, videogame, televisão, internet e silêncio',
          'Regras, castigos, horários estritos, comparação e frieza'
        ],
        correctIndex: 0,
        explanation: 'Descobrir e falar a linguagem certa garante que a criança se sinta verdadeiramente amada e valorizada.'
      }
    ]
  },
  {
    id: 'topic-fathers-mandate',
    topicNumber: 6,
    weekLabel: 'Semana 6',
    category: 'marriage',
    categoryLabel: 'Casamento & Lar',
    icon: '👑',
    topicTitle: 'O Papel e o Mandato do Pai na Casa',
    topicTitleEn: 'The Father\'s Mandate: Leadership & Blessing',
    title: 'The Father’s Presence: Imparting Spiritual Identity, Security, and Freedom to Fail',
    titlePt: 'A Presença do Pai: Imprimindo Identidade Espiritual, Segurança e Liberdade para Errar',
    verseRef: 'Psalm 103:13 & Ephesians 6:4',
    verseEn: 'As a father has compassion on his children, so the Lord has compassion on those who fear him. Fathers, do not exasperate your children; instead, bring them up in the training and instruction of the Lord.',
    versePt: 'Como um pai tem compaixão de seus filhos, assim o Senhor tem compaixão dos que o temem. Pais, não irritem seus filhos; antes, criem-nos na disciplina e na instrução do Senhor.',
    audioSnippet: 'As a father has compassion on his children, so the Lord has compassion on those who fear him.',
    keywords: [
      {
        word: 'fatherly blessing',
        ipa: '/ˈfɑː.ðɚ.li ˈbles.ɪŋ/',
        pos: 'noun phrase',
        meaningPt: 'a bênção paterna (aprovação, validação e oração do pai)',
        contextNote: 'A bênção do pai estabelece a identidade e o senso de dignidade do filho perante o mundo.',
        exampleEn: 'Every child longs in their core for the spoken fatherly blessing.',
        examplePt: 'Toda criança anseia no íntimo pela bênção e validação declarada pelo pai.'
      },
      {
        word: 'spiritual leader',
        ipa: '/ˈspɪr.ə.tʃu.əl ˈliː.dɚ/',
        pos: 'noun phrase',
        meaningPt: 'líder espiritual (aquele que ora, lê a Bíblia e serve a família com amor)',
        contextNote: 'Liderança bíblica masculina não é autoritarismo, mas sacrifício e sacerdócio ativo no lar.',
        exampleEn: 'A Christian father leads on his knees through humble prayer and biblical teaching.',
        examplePt: 'O pai cristão lidera de joelhos, por meio da oração humilde e do ensino da Palavra.'
      },
      {
        word: 'freedom to fail',
        ipa: '/ˈfriː.dəm tuː feɪl/',
        pos: 'noun phrase',
        meaningPt: 'liberdade para errar e aprender sem medo de rejeição',
        contextNote: 'Pais equilibrados acolhem os erros dos filhos como oportunidades de aprendizado e graça.',
        exampleEn: 'Give your children the freedom to fail so they learn resilience under your grace.',
        examplePt: 'Dê aos seus filhos a liberdade para errar, para que desenvolvam resiliência sob a sua graça.'
      },
      {
        word: 'exasperate',
        ipa: '/ɪɡˈzæs.pə.reɪt/',
        pos: 'verb',
        meaningPt: 'irritar profundamente, desanimar com excesso de exigências ou frieza',
        contextNote: 'A advertência apostólica aos pais: jamais desanimar os filhos com perfeccionismo ou aspereza.',
        exampleEn: 'Never exasperate your child with unreasonable perfectionism.',
        examplePt: 'Nunca exaspere seu filho com um perfeccionismo desmedido.'
      },
      {
        word: 'approving countenance',
        ipa: '/əˈpruː.vɪŋ ˈkaʊn.t̬ən.əns/',
        pos: 'noun phrase',
        meaningPt: 'olhar de aprovação, sorriso e acolhimento paternal',
        contextNote: 'O rosto do pai quando chega em casa comunica valor ou rejeição em frações de segundo.',
        exampleEn: 'An approving countenance when you enter the room illuminates a child’s spirit.',
        examplePt: 'Um semblante de aprovação ao entrar na sala ilumina o espírito de um filho.'
      }
    ],
    devotionalEn: `God chose to reveal His supreme nature to humanity as "Father." The earthly father is the child's very first lens through which they understand the character of Almighty God. If an earthly father is harsh, distant, or perpetually critical, the child instinctively grows up viewing God as an angry judge waiting for them to stumble. Conversely, when a father is engaged, affectionate, and spiritually intentional, children find it natural to trust the Heavenly Father. Men must beware of passive disengagement. A father's role is not merely to bring home a paycheck, but to impart the spoken blessing, lead in family worship, and provide an atmosphere of grace where mistakes can be confessed without fear of emotional rejection. Father, your presence is irreplaceable.`,
    devotionalPt: `Deus escolheu revelar a Sua natureza suprema à humanidade com o título de "Pai". O pai terreno é a primeira lente através da qual a criança compreende o caráter do Deus Todo-Poderoso. Se o pai da terra for áspero, distante ou constantemente crítico, a criança crescerá vendo Deus como um juiz raivoso pronto para punir cada tropeço. Por outro lado, quando o pai é presente, afetuoso e intencional na fé, os filhos têm facilidade para confiar no Pai Celestial. Os homens devem fugir da omissão. O papel do pai não é apenas pagar contas, mas ministrar a bênção audível, liderar o devocional em família e criar uma atmosfera de graça onde erros podem ser confessados sem medo de desprezo. Pai, a sua presença é insubstituível.`,
    grammarGem: {
      title: 'A Bênção Audível do Pai em Inglês: "I bless you in the Name of..."',
      explanation: 'Pratique abençoar os filhos na hora de dormir em inglês: "The Lord bless you and keep you" (O Senhor te abençoe e te guarde) e "I bless your mind with peace and your heart with courage" (Abençoo sua mente com paz e seu coração com coragem).',
      example: '"May the Lord shine His face upon you and grant you peace as you sleep tonight."'
    },
    parentPrayerEn: 'Lord Almighty, strengthen Adam as the spiritual head and loving priest of our home. Guard his heart from passive fatigue or harsh anger. Give him the tender compassion of Christ to speak blessings, impart identity, and guide our children with joyful strength. May Marcela honor and uphold his leadership with grace. Bless our family altar, in Jesus\' name, Amen.',
    parentPrayerPt: 'Senhor Todo-Poderoso, fortalece o Adam como líder espiritual e sacerdote amoroso de nossa casa. Guarda o coração dele do cansaço passivo e da ira áspera. Concede-lhe a compaixão terna de Cristo para proferir bênçãos, afirmar identidades e guiar nossos filhos com força e alegria. Que a Marcela honre e apoie a liderança dele com sabedoria. Abençoa o altar de nossa família, em nome de Jesus, Amém.',
    quiz: [
      {
        question: 'Segundo as Escrituras, qual é a principal advertência feita diretamente aos pais (homens) em Efésios 6:4 e Colossenses 3:21?',
        questionEn: 'According to Scripture, what is the primary warning given directly to fathers?',
        options: [
          'Não irritar nem exasperar os filhos com críticas excessivas, descontrole ou perfeccionismo, para que não fiquem desanimados',
          'Trabalhar 24 horas por dia e não falar com ninguém',
          'Comprar carros velozes',
          'Nunca abraçar os filhos'
        ],
        correctIndex: 0,
        explanation: 'A liderança paterna bíblica é firme, porém marcada por compaixão e estímulo, sem ferir a alma dos filhos.'
      },
      {
        question: 'Qual é o impacto espiritual da bênção e da presença ativa do pai no desenvolvimento dos filhos?',
        questionEn: 'What is the spiritual impact of the father’s blessing and active presence?',
        options: [
          'Fornece a base de segurança emocional e facilita que a criança compreenda e confie no amor do Pai Celestial',
          'Faz a criança não precisar mais estudar na escola',
          'Apenas traz brinquedos novos',
          'Não possui nenhum impacto relevante'
        ],
        correctIndex: 0,
        explanation: 'O pai terreno atua como o primeiro reflexo visível da paternidade, proteção e providência de Deus.'
      }
    ]
  },
  {
    id: 'topic-sibling-rivalry',
    topicNumber: 7,
    weekLabel: 'Semana 7',
    category: 'growth',
    categoryLabel: 'Irmãos & Sabedoria Digital',
    icon: '🤝',
    topicTitle: 'Conflitos e Ciúmes Entre Irmãos',
    topicTitleEn: 'Sibling Rivalry: Peacemaking & Honor at Home',
    title: 'From Rivalry to Brotherhood: Teaching Children Honor, Sharing, and Forgiveness',
    titlePt: 'Da Rivalidade à Fraternidade: Ensinando Honra, Partilha e Perdão Genuíno entre Irmãos',
    verseRef: 'Romans 12:10 & Psalm 133:1',
    verseEn: 'Be devoted to one another in love. Honor one another above yourselves. How good and pleasant it is when God’s people live together in unity!',
    versePt: 'Dediquem-se uns aos outros com amor fraternal. Prefiram dar honra aos outros mais do que a si próprios. Como é bom e agradável quando os irmãos convivem em união!',
    audioSnippet: 'Be devoted to one another in love. Honor one another above yourselves.',
    keywords: [
      {
        word: 'sibling rivalry',
        ipa: '/ˈsɪb.lɪŋ ˈraɪ.vəl.ri/',
        pos: 'noun phrase',
        meaningPt: 'rivalidade, ciúmes e disputas entre irmãos',
        contextNote: 'Competição por atenção dos pais, posse de brinquedos e ciúmes comuns na infância.',
        exampleEn: 'Never compare your children, as comparison fuels toxic sibling rivalry.',
        examplePt: 'Nunca compare seus filhos, pois a comparação alimenta uma rivalidade destrutiva entre irmãos.'
      },
      {
        word: 'peacemaker',
        ipa: '/ˈpiːsˌmeɪ.kɚ/',
        pos: 'noun',
        meaningPt: 'pacificador, aquele que promove reconciliação e harmonia',
        contextNote: 'Jesus chamou os pacificadores de bem-aventurados; devemos treinar nossos filhos nessa virtude.',
        exampleEn: 'Teach children to be peacemakers who seek solutions, not just finger-pointers.',
        examplePt: 'Ensine os filhos a serem pacificadores que buscam soluções, e não apenas acusadores.'
      },
      {
        word: 'mutual honor',
        ipa: '/ˈmjuː.tʃu.əl ˈɑː.nɚ/',
        pos: 'noun phrase',
        meaningPt: 'honra mútua e preferência pelo irmão',
        contextNote: 'O princípio de Romanos 12:10: ter alegria em ver o irmão ser abençoado primeiro.',
        exampleEn: 'Practicing mutual honor turns competing siblings into lifelong allies.',
        examplePt: 'Praticar a honra mútua transforma irmãos rivais em aliados para toda a vida.'
      },
      {
        word: 'restitution',
        ipa: '/ˌres.təˈtuː.ʃən/',
        pos: 'noun',
        meaningPt: 'restituição e reparação bíblica de danos',
        contextNote: 'Se quebrou o brinquedo ou ofendeu o irmão, deve consertar ou compensar com amor.',
        exampleEn: 'Biblical repentance includes restitution and asking for forgiveness.',
        examplePt: 'O arrependimento bíblico inclui a restituição do dano e o pedido sincero de perdão.'
      },
      {
        word: 'unconditional forgiveness',
        ipa: '/ˌʌn.kənˈdɪʃ.ən.əl fɚˈɡɪv.nəs/',
        pos: 'noun phrase',
        meaningPt: 'perdão incondicional que apaga o rancor',
        contextNote: 'Ensinar a perdoar de coração assim como Cristo nos perdoou na cruz.',
        exampleEn: 'Children must learn unconditional forgiveness before the sun sets.',
        examplePt: 'Os filhos devem aprender o perdão incondicional antes que o sol se ponha.'
      }
    ],
    devotionalEn: `Sibling conflicts are not an unfortunate parenting accident; they are God's divine laboratory for character formation. If a child cannot learn to share a toy, wait their turn, and forgive an offense with their brother or sister under your roof, how will they ever navigate marriage, workplace relationships, or church life as adults? When quarrels erupt over toys or who sits in the front seat, do not act merely as a tired referee handing out quick punishments. Coach your children in biblical peacemaking. Ban toxic comparison from your vocabulary ("Why can't you be like your sister?"). Instead, train them to look into each other's eyes, confess their specific fault ("I was selfish with the truck, will you forgive me?"), and grant wholehearted forgiveness with a handshake or a hug.`,
    devotionalPt: `As brigas entre irmãos não são um acidente lamentável na criação; elas são o laboratório de Deus para forjar o caráter cristão. Se uma criança não aprender a dividir um brinquedo, esperar a sua vez e perdoar uma ofensa dentro de casa com o próprio irmão, como saberá lidar no futuro com o cônjuge, com os colegas de trabalho ou com os irmãos na igreja? Quando surgirem disputas por brinquedos ou por quem senta na janela do carro, não atue apenas como um juiz cansado distribuindo castigos rápidos. Seja um treinador de pacificação bíblica. Elimine comparações venenosas do vocabulário ("Por que você não é calmo como seu irmão?"). Em vez disso, ensine-os a olhar nos olhos, confessar o erro específico ("Fui egoísta ao puxar o brinquedo, você me perdoa?") e liberar perdão de coração com um abraço sincero.`,
    grammarGem: {
      title: 'A Fórmula Bíblica do Pedido de Perdão em Inglês',
      explanation: 'Ensine seus filhos a não dizerem apenas o seco "Sorry". Treine a frase bíblica completa: "I was wrong for [action]. Will you please forgive me?" (Eu errei por... Você me perdoa?).',
      example: '"I was wrong for taking your marker without asking. Will you please forgive me?" — "I forgive you!"'
    },
    parentPrayerEn: 'Lord God of peace, make our home a sanctuary of unity and love. Deliver our children from jealousy, bitterness, and selfish competition. Teach Adam and Marcela how to guide them into genuine reconciliation, mutual honor, and swift forgiveness. May our sons and daughters grow up as dearest friends and lifelong allies in Your Kingdom. In Jesus\' mighty name, Amen.',
    parentPrayerPt: 'Senhor Deus da paz, faz do nosso lar um santuário de união e amor. Livra nossos filhos de ciúmes, amargura e disputas egoístas. Ensina o Adam e a Marcela a guiá-los na reconciliação genuína, na honra mútua e no perdão sem demora. Que nossos filhos cresçam como melhores amigos e aliados para sempre no Teu Reino. No poderoso nome de Jesus, Amém.',
    quiz: [
      {
        question: 'Qual é um dos maiores erros dos pais que alimenta o ciúme e a briga entre irmãos?',
        questionEn: 'What is one of the biggest parental mistakes that fuels sibling rivalry?',
        options: [
          'Fazer comparações entre os filhos ("Veja como seu irmão tira notas melhores ou se comporta melhor")',
          'Incentivar a orarem juntos antes de dormir',
          'Ensinar a dividir brinquedos',
          'Dar o mesmo almoço para todos'
        ],
        correctIndex: 0,
        explanation: 'Comparações alimentam ressentimento, rebaixam a autoestima de um filho e geram rivalidade amarga.'
      },
      {
        question: 'Como os pais devem ensinar os filhos a resolverem brigas e ofensas de forma bíblica?',
        questionEn: 'How should parents teach children to resolve fights biblically?',
        options: [
          'Ensinando a reconhecer o erro específico, pedir perdão com humildade e praticar a reconciliação com afeto',
          'Mandando os dois ficarem sem falar um com o outro para sempre',
          'Dando razão sempre para quem chorar primeiro',
          'Deixando que briguem fisicamente para ver quem vence'
        ],
        correctIndex: 0,
        explanation: 'O processo bíblico exige confissão do erro real, perdão liberado de coração e restauração da comunhão.'
      }
    ]
  },
  {
    id: 'topic-screen-habits',
    topicNumber: 8,
    weekLabel: 'Semana 8',
    category: 'growth',
    categoryLabel: 'Irmãos & Sabedoria Digital',
    icon: '📱',
    topicTitle: 'Telas, Celular & Sabedoria Digital',
    topicTitleEn: 'Digital Stewardship: Screens, Focus & Wholesome Habits',
    title: 'Guarding Attention: Cultivating Focus, Presence, and Digital Temperance',
    titlePt: 'Protegendo a Atenção: Cultivando Foco, Presença e Moderação Digital no Lar',
    verseRef: '1 Corinthians 6:12 & Psalm 101:3',
    verseEn: '“I have the right to do anything,” you say—but not everything is beneficial. “I have the right to do anything”—but I will not be mastered by anything. I will not look with approval on anything that is vile.',
    versePt: '“Tudo me é permitido”, mas nem tudo convém. “Tudo me é permitido”, mas eu não deixarei que nada me domine. Não porei coisa torpe diante dos meus olhos.',
    audioSnippet: 'I have the right to do anything, but I will not be mastered by anything.',
    keywords: [
      {
        word: 'digital stewardship',
        ipa: '/ˈdɪdʒ.ə.t̬əl ˈstuː.ɚd.ʃɪp/',
        pos: 'noun phrase',
        meaningPt: 'mordomia digital (uso consciente, equilibrado e sábio da tecnologia)',
        contextNote: 'A tecnologia é ferramenta para servir ao Reino, e não senhor para dominar a mente da família.',
        exampleEn: 'Christian parents must model wise digital stewardship before expecting it from their kids.',
        examplePt: 'Pais cristãos devem ser exemplo de mordomia digital sábia antes de exigi-la dos filhos.'
      },
      {
        word: 'screen limits',
        ipa: '/skriːn ˈlɪm.ɪts/',
        pos: 'noun phrase',
        meaningPt: 'limites de tempo de tela e horários sem tecnologia',
        contextNote: 'Regras claras que protegem o cérebro em desenvolvimento da sobrecarga de dopamina.',
        exampleEn: 'Setting firm screen limits preserves precious time for books, outdoors, and family meals.',
        examplePt: 'Estabelecer limites firmes de tela preserva tempo precioso para leitura, ar livre e refeições em família.'
      },
      {
        word: 'overstimulation',
        ipa: '/ˌoʊ.vɚˌstɪm.jəˈleɪ.ʃən/',
        pos: 'noun',
        meaningPt: 'hiperestímulo cerebral (causador de irritabilidade, insônia e falta de foco)',
        contextNote: 'Vídeos curtos e jogos frenéticos saturam os receptores de dopamina das crianças.',
        exampleEn: 'Excessive dopamine from screens causes severe overstimulation and temper tantrums.',
        examplePt: 'O excesso de dopamina vindo das telas causa hiperestímulo severo e crises de irritabilidade.'
      },
      {
        word: 'undivided presence',
        ipa: '/ˌʌn.dɪˈvaɪ.dɪd ˈprez.əns/',
        pos: 'noun phrase',
        meaningPt: 'presença plena e atenta (sem celular na mão durante as conversas)',
        contextNote: 'Estar com os filhos de corpo e alma, sem olhar notificações enquanto eles falam.',
        exampleEn: 'Our children crave our undivided presence more than the latest gadgets.',
        examplePt: 'Nossos filhos anseiam pela nossa presença plena muito mais do que pelos aparelhos da moda.'
      },
      {
        word: 'purity',
        ipa: '/ˈpjʊr.ə.t̬i/',
        pos: 'noun',
        meaningPt: 'pureza da mente e dos olhos guardados no Senhor',
        contextNote: 'Filtrar o conteúdo que entra pelos olhos para proteger a inocência da criança.',
        exampleEn: 'Guarding our family’s digital purity is an essential spiritual duty.',
        examplePt: 'Proteger a pureza digital de nossa família é um dever espiritual essencial.'
      }
    ],
    devotionalEn: `We live in an unprecedented historical era where glowing digital screens compete aggressively for the souls, attention spans, and imaginations of our children. If parents do not intentionally cultivate an appetite for reality—books, nature, conversations, board games, and spiritual worship—the algorithm of the digital age will happily raise your children for you. Excessive screen consumption floods developing brains with artificial dopamine, leading to shortened attention spans, anxiety, and volcanic meltdowns when the device is turned off. Paul gave the ultimate Christian guideline: "Everything is permissible, but I will not be mastered by anything." As parents, we must lead by example: put smartphones away during meals, declare bedrooms screen-free sanctuaries, and teach children that technology is a tool to glorify God, not a master to enslave the mind.`,
    devotionalPt: `Vivemos em uma época sem precedentes na história, na qual telas digitais competem ferozmente pela alma, atenção e imaginação de nossos filhos. Se os pais não cultivarem com intencionalidade o gosto pelo mundo real — livros, ar livre, conversas à mesa, jogos de tabuleiro e culto doméstico —, o algoritmo desta era criará seus filhos no seu lugar. O consumo desenfreado de telas bombardeia o cérebro infantil com dopamina artificial, gerando déficit de foco, ansiedade e crises vulcânicas quando o aparelho é desligado. O apóstolo Paulo entregou a bússola perfeita: "Tudo me é permitido, mas não deixarei que nada me domine." Como casal, lideremos pelo exemplo: celulares guardados na hora das refeições, quartos livres de telas e instrução aos filhos de que a tecnologia é uma serva para honrar a Deus, e não uma senhora para escravizar a mente.`,
    grammarGem: {
      title: 'Termos de Limites Tecnológicos em Inglês: "Device-free zone" & "Tech-free table"',
      explanation: 'Use termos claros para estabelecer regras com carinho em inglês: "Our dinner table is a device-free zone" (Nossa mesa de jantar é uma área livre de aparelhos) e "Screen time is over for today" (O tempo de tela acabou por hoje).',
      example: '"We love talking to you! That\'s why mealtime is always a device-free zone in our family."'
    },
    parentPrayerEn: 'Lord God, in a hyperconnected world, give Adam and Marcela discernment and courage to guard our home. Forgive us when we surrender our attention to glowing screens instead of looking into the eyes of our children. Give us creativity to cultivate deep conversations, outdoor adventures, and spiritual hunger. May our home be an oasis of quiet presence and holy focus. In Jesus\' name, Amen.',
    parentPrayerPt: 'Senhor Deus, num mundo hiperconectado, dá ao Adam e à Marcela discernimento e coragem para guardar nosso lar. Perdoa-nos quando entregamos nossa atenção a telas brilhantes em vez de olhar nos olhos de nossos filhos. Dá-nos criatividade para cultivar conversas ricas, passeios na natureza e fome espiritual. Que nossa casa seja um oásis de presença atenta e foco santo. Em nome de Jesus, Amém.',
    quiz: [
      {
        question: 'Qual é o maior impacto do excesso de telas e vídeos rápidos no cérebro das crianças?',
        questionEn: 'What is the greatest impact of excessive screen time on children’s developing brains?',
        options: [
          'Hiperestímulo de dopamina que causa dificuldade de concentração, impaciência e explosões de irritabilidade',
          'Aumento da memória para versículos bíblicos',
          'Maior tranquilidade na hora de dormir',
          'Melhoria automática da caligrafia'
        ],
        correctIndex: 0,
        explanation: 'O hiperestímulo digital encurta a capacidade de foco e reduz a tolerância da criança à frustração normal da vida.'
      },
      {
        question: 'Como os pais cristãos devem liderar a questão das telas no lar de forma eficaz?',
        questionEn: 'How should Christian parents effectively lead screen habits at home?',
        options: [
          'Liderando pelo próprio exemplo, guardando celulares nas refeições e estabelecendo regras claras e tempos livres de tecnologia',
          'Deixando telas liberadas sem limite para a casa ficar quieta',
          'Usando o celular enquanto repreende o filho por usar o celular',
          'Proibindo energia elétrica na casa'
        ],
        correctIndex: 0,
        explanation: 'O exemplo dos pais é o sermão mais persuasivo: presença plena e limites claros protegem a sanidade da família.'
      }
    ]
  },
  {
    id: 'topic-overcoming-fear',
    topicNumber: 9,
    weekLabel: 'Semana 9',
    category: 'emotions',
    categoryLabel: 'Birras & Emoções',
    icon: '🕊️',
    topicTitle: 'Vencendo Medos, Pesadelos & Insegurança',
    topicTitleEn: 'Overcoming Fear with Faith: Raising Confident Kids',
    title: 'Faith Over Fear: Anchoring Children in the Perfect Love That Drives Out Dread',
    titlePt: 'Fé Acima do Medo: Ancorando os Filhos no Perfeito Amor que Lança Fora o Temor',
    verseRef: '2 Timothy 1:7 & Isaiah 41:10',
    verseEn: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline. So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.',
    versePt: 'Pois Deus não nos deu espírito de covardia, mas de poder, de amor e de equilíbrio. Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.',
    audioSnippet: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.',
    keywords: [
      {
        word: 'timid spirit',
        ipa: '/ˈtɪm.ɪd ˈspɪr.ɪt/',
        pos: 'noun phrase',
        meaningPt: 'espírito de covardia ou paralisia pelo medo',
        contextNote: 'A Bíblia afirma com autoridade que o medo paralisante não procede do Espírito de Deus.',
        exampleEn: 'God has not given our children a timid spirit, but one of courage and sound mind.',
        examplePt: 'Deus não deu aos nossos filhos um espírito de covardia, mas de coragem e mente sã.'
      },
      {
        word: 'power and love',
        ipa: '/ˈpaʊ.ɚ ænd lʌv/',
        pos: 'noun phrase',
        meaningPt: 'poder, amor e mente equilibrada dados pelo Espírito',
        contextNote: 'A tríplice armadura divina que cura a ansiedade e os temores infantis.',
        exampleEn: 'Speaking God’s promises replaces fear with power, love, and peace.',
        examplePt: 'Declarar as promessas de Deus substitui o medo por poder, amor e paz.'
      },
      {
        word: 'bedtime prayer',
        ipa: '/ˈbed.taɪm prer/',
        pos: 'noun phrase',
        meaningPt: 'oração ao deitar (o momento sagrado de descanso e bênção)',
        contextNote: 'Orar com as mãos sobre o filho antes de dormir dissipa pesadelos e inseguranças.',
        exampleEn: 'Consistent bedtime prayer establishes an atmosphere of heavenly security.',
        examplePt: 'A oração consistente ao deitar estabelece uma atmosfera de segurança celestial.'
      },
      {
        word: 'sound mind',
        ipa: '/saʊnd maɪnd/',
        pos: 'noun phrase',
        meaningPt: 'mente sã, raciocínio equilibrado e paz interior',
        contextNote: 'Pensamentos governados pela verdade bíblica, e não pela imaginação apavorada.',
        exampleEn: 'A sound mind rests firmly upon the unshakeable promises of Jesus.',
        examplePt: 'Uma mente sã repousa firme sobre as promessas inabaláveis de Jesus.'
      },
      {
        word: 'refuge',
        ipa: '/ˈref.juːdʒ/',
        pos: 'noun',
        meaningPt: 'refúgio, fortaleza espiritual e abrigo seguro',
        contextNote: 'Deus é o esconderijo seguro para onde a criança pode correr em oração.',
        exampleEn: 'Teach children that Jesus is their ever-present refuge in times of trouble.',
        examplePt: 'Ensine aos filhos que Jesus é seu refúgio sempre presente nos momentos de aflição.'
      }
    ],
    devotionalEn: `Childhood imagination is vast and vibrant, but without biblical truth, it easily becomes fertile soil for irrational fears: fear of the dark, monsters under the bed, school anxiety, fear of failure, or dread of being separated from parents. Dismissing these fears with a harsh "Don't be silly" invalidates the child's real emotional struggle. However, validating the fear by letting it control bedtime routines only entrenches anxiety. The biblical answer is replacement: replacing human dread with divine promises. The apostle Paul wrote that God has not given us a spirit of fear, but of power, love, and a sound mind. When your child feels afraid, pray with them, declare Psalm 91 or Isaiah 41:10 aloud, lay your hands on their head, and teach them that the Creator of galaxies is stationed as their personal guardian angel.`,
    devotionalPt: `A imaginação infantil é viva e efervescente, mas sem o alicerce da Palavra, torna-se solo fértil para temores: medo do escuro, monstros no armário, ansiedade na escola, medo de errar ou pavor de ficar longe dos pais. Desprezar esses sentimentos com um seco "Deixe de bobagem" invalida a dor da criança. Por outro lado, deixar que o medo controle a rotina da casa alimenta a ansiedade. A resposta bíblica é a substituição: trocar o pavor humano pelas promessas do Deus Todo-Poderoso. O apóstolo Paulo declarou que Deus não nos deu espírito de covardia, mas de poder, amor e equilíbrio. Quando o medo bater à porta, sente-se na cama com seu filho, leiam juntos o Salmo 91 ou Isaías 41:10, imponha as mãos com carinho e ensine que o Criador do universo cuida pessoalmente de cada detalhe do sono dele.`,
    grammarGem: {
      title: 'Promessas de Coragem em Inglês para a Hora de Dormir',
      explanation: 'Decore com seus filhos o versículo chave em inglês: "When I am afraid, I put my trust in You" (Salmo 56:3). Ensine-os a orar essa frase quando acordarem com medo.',
      example: '"Whenever fear knocks on your heart tonight, remember our verse: \'When I am afraid, I put my trust in You, Lord!\'"'
    },
    parentPrayerEn: 'Lord God, our Shield and Fortress, deliver our children from every snare of fear, anxiety, and dread. Anoint Adam and Marcela with words of peace and holy assurance at bedtime. When our children feel small or timid, remind them that the Almighty God holds them in the palm of His hand. May our home be filled with peaceful slumber and fearless faith. In the mighty name of Jesus, Amen.',
    parentPrayerPt: 'Senhor Deus, nosso Escudo e Fortaleza, livra nossos filhos de toda armadilha de medo, ansiedade e pavor. Unge o Adam e a Marcela com palavras de paz e santa certeza no momento de deitar. Quando nossos filhos se sentirem frágeis ou tímidos, lembra-os de que o Deus Todo-Poderoso os guarda na palma de Sua mão. Que nossa casa seja repleta de sono reparador e fé corajosa. No poderoso nome de Jesus, Amém.',
    quiz: [
      {
        question: 'De acordo com 2 Timóteo 1:7, qual é a natureza do Espírito que Deus nos deu para vencer o medo?',
        questionEn: 'According to 2 Timothy 1:7, what is the nature of the Spirit God gave us to overcome fear?',
        options: [
          'Não é um espírito de medo ou covardia, mas de poder, amor e equilíbrio mental',
          'Um espírito de desconfiança e silêncio',
          'Um espírito de fuga e isolamento',
          'Um espírito de críticas constantes'
        ],
        correctIndex: 0,
        explanation: 'O Espírito Santo traz convicção de autoridade, afeição profunda e clareza mental que dissipam os terrores noturnos.'
      },
      {
        question: 'Qual é a forma mais eficaz e bíblica de ajudar uma criança com medo do escuro ou pesadelos?',
        questionEn: 'What is the most biblical and effective way to help a child afraid of the dark?',
        options: [
          'Sentar na cama, orar juntos com carinho, ler promessas bíblicas como o Salmo 91 e ensinar a criança a confiar no cuidado de Jesus',
          'Deixar a criança no escuro chorando para "aprender na marra"',
          'Dizer que monstros realmente existem e que ela precisa correr',
          'Não dar atenção e desligar o interfone'
        ],
        correctIndex: 0,
        explanation: 'A oração amorosa e a declaração audível da Palavra de Deus enchem o quarto da criança de paz celestial.'
      }
    ]
  },
  {
    id: 'topic-gratitude-contentment',
    topicNumber: 10,
    weekLabel: 'Semana 10',
    category: 'heart',
    categoryLabel: 'Coração & Virtudes',
    icon: '🎁',
    topicTitle: 'Gratidão & Contentamento vs. Consumismo',
    topicTitleEn: 'Raising Grateful Children: Contentment in a Demanding World',
    title: 'A Grateful Heart: Uprooting Entitlement and Cultivating Generosity and Contentment',
    titlePt: 'Um Coração Grato: Vencendo o Consumismo e Cultivando Contentamento e Generosidade',
    verseRef: '1 Timothy 6:6-7 & 1 Thessalonians 5:18',
    verseEn: 'But godliness with contentment is great gain. For we brought nothing into the world, and we can take nothing out of it. Give thanks in all circumstances; for this is God’s will for you in Christ Jesus.',
    versePt: 'De fato, a piedade com contentamento é grande fonte de lucro. Pois nada trouxemos para este mundo e dele nada podemos levar. Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.',
    audioSnippet: 'Godliness with contentment is great gain. Give thanks in all circumstances.',
    keywords: [
      {
        word: 'contentment',
        ipa: '/kənˈtent.mənt/',
        pos: 'noun',
        meaningPt: 'contentamento bíblico, paz e satisfação no que Deus já proveu',
        contextNote: 'A virtude que vacina a criança contra a inveja e a ganância do mundo consumista.',
        exampleEn: 'True contentment is not having everything you want, but delighting in what God has given.',
        examplePt: 'O verdadeiro contentamento não é ter tudo o que deseja, mas alegrar-se com o que Deus já deu.'
      },
      {
        word: 'entitlement',
        ipa: '/ɪnˈtaɪ.t̬əl.mənt/',
        pos: 'noun',
        meaningPt: 'senso de direito adquirido, achar que o mundo lhe deve tudo',
        contextNote: 'A postura mimada de exigir privilégios e presentes sem esforço ou gratidão.',
        exampleEn: 'Uproot entitlement early by teaching children the joy of working and serving.',
        examplePt: 'Arranque o senso de merecimento mimado ensinando aos filhos a alegria de trabalhar e servir.'
      },
      {
        word: 'generosity',
        ipa: '/ˌdʒen.əˈrɑː.sə.t̬i/',
        pos: 'noun',
        meaningPt: 'generosidade, disposição alegre de doar e abençoar o próximo',
        contextNote: 'Reflexo de Cristo, que sendo rico se fez pobre por amor a nós.',
        exampleEn: 'Generosity is the antidote to the poison of selfish consumerism.',
        examplePt: 'A generosidade é o antídoto para o veneno do consumismo egoísta.'
      },
      {
        word: 'grateful heart',
        ipa: '/ˈɡreɪt.fəl hɑːrt/',
        pos: 'noun phrase',
        meaningPt: 'coração agradecido que celebra pequenas bênçãos diárias',
        contextNote: 'Cultivar o hábito de agradecer antes das refeições e antes de dormir por cada favor de Deus.',
        exampleEn: 'A grateful heart turns simple bread and butter into a festive feast.',
        examplePt: 'Um coração grato transforma pão e manteiga numa festa memorável.'
      },
      {
        word: 'stewardship',
        ipa: '/ˈstuː.ɚd.ʃɪp/',
        pos: 'noun',
        meaningPt: 'mordomia cristã, administrar com responsabilidade os dons de Deus',
        contextNote: 'Cuidar bem dos sapatos, brinquedos, roupas e recursos financeiros com reverência.',
        exampleEn: 'Faithful stewardship begins with taking good care of our toys and books.',
        examplePt: 'A mordomia fiel começa cuidando com carinho dos brinquedos e livros que recebemos.'
      }
    ],
    devotionalEn: `Modern advertising and social feeds bombard our children with a relentless message: "You don't have enough; you need the newest toy, the latest shoes, the trendiest snack." If parents do not cultivate biblical contentment, children grow up infected with the poisonous mindset of entitlement—believing that parents and the world owe them constant luxury and amusement. The apostle Paul declared that "godliness with contentment is great gain." We brought nothing into this world, and we can take nothing out of it. Cultivate gratitude deliberately around the family table: have each family member name three specific blessings they are thankful for each evening. Involve your children in giving—donating toys, visiting families in need, or writing thank-you notes. A generous, grateful child is nearly immune to depression, envy, and greed.`,
    devotionalPt: `A publicidade moderna e os influenciadores digitais bombardeiam nossos filhos com uma mensagem incansável: "Você não tem o bastante; você precisa do brinquedo novo, do tênis da moda, da comida da moda." Se os pais não cultivarem o contentamento bíblico, as crianças crescerão infectadas pelo veneno do merecimento mimado (entitlement) — acreditando que os pais e o mundo lhes devem luxo e entretenimento perpétuos. O apóstolo Paulo declarou que "a piedade com contentamento é grande lucro." Nada trouxemos para este mundo e nada levaremos dele. Cultive a gratidão intencionalmente ao redor da mesa: peça que cada um cite três bênçãos pelas quais é grato a cada noite. Envolva seus filhos na generosidade — doando brinquedos, preparando cestas para famílias necessitadas e escrevendo bilhetes de agradecimento. Uma criança grata é praticamente imune à inveja e à ganância.`,
    grammarGem: {
      title: 'A Prática Diária da Gratidão em Inglês à Mesa',
      explanation: 'Use perguntas de mesa em inglês para despertar gratidão: "What are three things you are thankful for today?" (Quais são três coisas pelas quais você é grato hoje?) e "How did God show His kindness to us today?" (Como Deus mostrou Sua bondade para nós hoje?).',
      example: '"Tonight at dinner, let\'s each share: I am grateful to God for [blessing] because [reason]."'
    },
    parentPrayerEn: 'Lord God, Giver of every good and perfect gift, uproot all selfishness, complaint, and entitlement from our home. Teach Adam and Marcela how to model contentment and lavish generosity before our children. May our family table be a perpetual feast of thanksgiving, rejoicing in Your daily bread and Your eternal salvation. In Jesus\' mighty name, Amen.',
    parentPrayerPt: 'Senhor Deus, Doador de toda boa dádiva, arranca todo egoísmo, murmuração e espírito mimado de nosso lar. Ensina o Adam e a Marcela a modelarem contentamento e generosidade abundante diante de nossos filhos. Que a nossa mesa seja uma celebração perpétua de ações de graças, alegrando-se no pão de cada dia e na Tua salvação eterna. No poderoso nome de Jesus, Amém.',
    quiz: [
      {
        question: 'Segundo 1 Timóteo 6:6-7, o que a Bíblia chama de "grande fonte de lucro" para a vida cristã?',
        questionEn: 'According to 1 Timothy 6:6-7, what does the Bible call "great gain"?',
        options: [
          'A piedade acompanhada de contentamento bíblico',
          'Acumular todos os brinquedos e roupas que a publicidade oferece',
          'Reclamar até conseguir o que quer',
          'Gastar sem pensar no amanhã'
        ],
        correctIndex: 0,
        explanation: 'O contentamento em Deus liberta o coração da escravidão do consumismo e gera paz inabalável.'
      },
      {
        question: 'Qual é um exercício prático excelente para vencer o espírito mimado (entitlement) nos filhos?',
        questionEn: 'What is an excellent practical exercise to defeat entitlement in children?',
        options: [
          'Compartilhar agradecimentos diários à mesa por bênçãos simples e envolver a criança na doação e serviço ao próximo',
          'Comprar presentes toda vez que a criança for a um shopping',
          'Nunca dizer a palavra "não"',
          'Culpar os outros por tudo'
        ],
        correctIndex: 0,
        explanation: 'Praticar ações de graças e atos concretos de doação desperta empatia, humildade e generosidade duradoura.'
      }
    ]
  }
];

// Backwards compatibility alias
export const PARENTING_CHAPTERS = PARENTING_TOPICS;
