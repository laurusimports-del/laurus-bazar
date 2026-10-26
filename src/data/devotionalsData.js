// Currículo de Devocionais Diários com Intercalação:
// Dias Ímpares (1, 3, 5, 7, 9, 11, 13, 15): Casamento, Intimidade & Fé Conjugal
// Dias Pares (2, 4, 6, 8, 10, 12, 14, 16): Formação de Filhos, Disciplina Amorosa & Desafios Familiares

export const DEVOTIONALS_DATA = [
  // DIA 1: CASAMENTO & PAZ
  {
    id: 'phil-4-6-7',
    day: 1,
    track: 'marriage',
    trackLabel: 'Casamento & Fé',
    theme: 'Paz & Confiança Conjugal (Peace & Trust)',
    title: 'Peace That Transcends All Understanding',
    titlePt: 'A Paz que Excede Todo Entendimento',
    verseRef: 'Philippians 4:6-7',
    verseEn: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
    versePt: 'Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus.',
    audioSnippet: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
    keywords: [
      {
        word: 'anxious',
        ipa: '/ˈæŋk.ʃəs/',
        pos: 'adjective',
        meaningPt: 'ansioso, preocupado, inquieto',
        contextNote: 'Usado para descrever preocupação excessiva com o futuro do lar ou dos negócios.',
        exampleEn: 'Whenever you feel anxious, take a deep breath and pray.',
        examplePt: 'Sempre que você se sentir ansioso, respire fundo e ore.'
      },
      {
        word: 'petition',
        ipa: '/pəˈtɪʃ.ən/',
        pos: 'noun / verb',
        meaningPt: 'súplica, pedido fervoroso, petição',
        contextNote: 'Na Bíblia em inglês, refere-se a pedir algo específico a Deus com humildade.',
        exampleEn: 'We bring our petitions to God in the morning.',
        examplePt: 'Trazemos nossas petições a Deus pela manhã.'
      },
      {
        word: 'thanksgiving',
        ipa: '/ˌθæŋksˈɡɪv.ɪŋ/',
        pos: 'noun',
        meaningPt: 'gratidão, ações de graças',
        contextNote: 'Composto por "thanks" (agradecimento) + "giving" (dar). A chave da oração bíblica.',
        exampleEn: 'Start every prayer with heartfelt thanksgiving.',
        examplePt: 'Comece cada oração com sincera ação de graças.'
      },
      {
        word: 'transcends',
        ipa: '/trænˈsendz/',
        pos: 'verb (3rd person singular)',
        meaningPt: 'transcende, vai além, ultrapassa',
        contextNote: 'Algo que é maior do que a nossa capacidade humana de compreender.',
        exampleEn: 'His love transcends our limitations.',
        examplePt: 'O amor dEle transcende nossas limitações.'
      },
      {
        word: 'guard',
        ipa: '/ɡɑːrd/',
        pos: 'verb',
        meaningPt: 'proteger, guardar, vigiar como sentinela',
        contextNote: 'A metáfora de um soldado que faz a sentinela protegendo a mente e o coração.',
        exampleEn: 'God will guard our marriage with His wisdom.',
        examplePt: 'Deus guardará nosso casamento com Sua sabedoria.'
      }
    ],
    devotionalEn: `Anxiety often knocks at our door, especially when facing daily responsibilities, work decisions, and future plans as a couple. Yet, the Apostle Paul invites us to make a supernatural exchange: trade our worries for heartfelt prayers. Notice the key ingredient: thanksgiving. When we thank God for what He has already done, our faith rises. His peace is not just the absence of conflict—it is an active guardian protecting your emotional and spiritual intimacy today.`,
    devotionalPt: `A ansiedade frequentemente bate à nossa porta, especialmente ao lidar com as responsabilidades do dia a dia, decisões no trabalho e planos de futuro como casal. No entanto, o Apóstolo Paulo nos convida a fazer uma troca sobrenatural: trocar nossas preocupações por orações sinceras. Note o ingrediente essencial: ações de graças. Quando agradecemos a Deus pelo que Ele já fez, nossa fé se eleva. A paz dEle não é apenas a ausência de conflitos — é uma guardiã ativa que protege sua intimidade emocional e espiritual hoje.`,
    grammarGem: {
      title: 'A estrutura "Do not be..." para encorajamentos gentis',
      explanation: 'Use "Do not be [adjetivo]" para consolar o cônjuge com ternura em inglês. É uma forma suave e reconfortante.',
      example: '"Do not be afraid, honey. We are in this together and God is with us."'
    },
    couplePrayerEn: 'Lord, thank You for this day. Teach Adam and Marcela to cast every burden at Your feet. Guard our thoughts, quiet our hearts with Your peace, and let our marriage reflect Your serene presence in every circumstance. Amen.',
    couplePrayerPt: 'Senhor, obrigado por este dia. Ensina o Adam e a Marcela a lançarem todo fardo aos Teus pés. Guarda nossos pensamentos, aquieta nossos corações com Tua paz e faz nosso casamento refletir Tua presença serena em qualquer circunstância. Amém.',
    quiz: [
      {
        question: 'O que o Apóstolo Paulo recomenda fazer quando a ansiedade bater à porta do casal?',
        questionEn: 'According to Philippians 4:6, what should a couple do when feeling anxious?',
        options: [
          'Guardar tudo para si e ficar em silêncio',
          'Apresentar pedidos a Deus pela oração e súplica, com ações de graças',
          'Procurar distrações na internet',
          'Cobrar mais do cônjuge'
        ],
        correctIndex: 1,
        explanation: 'Paulo ensina que a oração com gratidão é o antídoto bíblico contra a ansiedade.'
      }
    ]
  },

  // DIA 2: FORMAÇÃO DE FILHOS & O CORAÇÃO (INTERCALADO)
  {
    id: 'prov-4-23-heart',
    day: 2,
    track: 'parenting',
    trackLabel: 'Família & Filhos',
    theme: 'O Coração do Filho (Guarding the Heart)',
    title: 'Guarding the Heart: Moral Reasons Over Mere Rules',
    titlePt: 'Alcançando o Coração: Razões Morais Acima de Regras Secas',
    verseRef: 'Proverbs 4:23 & Deuteronomy 6:6-7',
    verseEn: 'Above all else, guard your heart, for everything you do flows from it. These commandments that I give you today are to be on your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road.',
    versePt: 'Acima de tudo, guarde o seu coração, pois dele procedem as fontes da vida. Estas palavras que hoje lhe ordeno devem estar no seu coração. Ensine-as com persistência aos seus filhos. Converse sobre elas quando estiver em casa e quando andar pelo caminho.',
    audioSnippet: 'Above all else, guard your heart, for everything you do flows from it. Impress them on your children.',
    keywords: [
      {
        word: 'moral reasons',
        ipa: '/ˈmɔːr.əl ˈriː.zənz/',
        pos: 'noun phrase',
        meaningPt: 'razões morais (o porquê bíblico da conduta)',
        contextNote: 'Explicar a razão sagrada da instrução em vez de dar ordens autoritárias vazias.',
        exampleEn: 'We teach moral reasons so our children internalize truth.',
        examplePt: 'Ensinamos razões morais para que nossos filhos internalizem a verdade.'
      },
      {
        word: 'internalize',
        ipa: '/ɪnˈtɝː.nə.laɪz/',
        pos: 'verb',
        meaningPt: 'internalizar, abraçar intimamente no coração',
        contextNote: 'Quando o filho faz o certo mesmo quando ninguém está olhando.',
        exampleEn: 'Pray that our children internalize divine virtues.',
        examplePt: 'Orem para que nossos filhos internalizem virtudes divinas.'
      },
      {
        word: 'impress',
        ipa: '/ɪmˈpres/',
        pos: 'verb',
        meaningPt: 'gravar com persistência, imprimir na alma com carinho',
        contextNote: 'Deuteronômio 6 usa o termo hebraico para esculpir na rocha.',
        exampleEn: 'Impress God’s love on your children through daily stories.',
        examplePt: 'Grave o amor de Deus nos seus filhos através de histórias diárias.'
      }
    ],
    devotionalEn: `God's relentless focus is on the human heart, not merely external behavior. When correcting children, don't just say "Stop that!" Explain the moral reason: how their action affects others and honors God. By connecting everyday behavior to divine virtues, we stock our children's moral warehouse for life.`,
    devotionalPt: `O alvo constante de Deus é o coração humano, e não meras aparências. Ao corrigir os filhos, não diga apenas "Pare com isso!". Explique a razão moral: como aquela atitude afeta o próximo e honra a Deus. Ao conectar ações a virtudes divinas, abastecemos o depósito moral de nossos filhos para a vida inteira.`,
    grammarGem: {
      title: 'A Conjunção Moral "So that" (Para que / De modo que)',
      explanation: 'Conecte a instrução ao coração: "We share our toys so that we show Jesus\' love to our friends."',
      example: '"We tell the truth so that trust can dwell in our home."'
    },
    couplePrayerEn: 'Lord God, give Adam and Marcela patience to reach the heart of our children. Deliver our parenting from mere rules and shouting. May our home be an altar where divine virtues are internalized. Amen.',
    couplePrayerPt: 'Senhor Deus, dá ao Adam e à Marcela paciência para alcançar o coração de nossos filhos. Livra nossa disciplina de regras secas e gritos. Que nosso lar seja um altar onde virtudes divinas sejam internalizadas. Amém.',
    quiz: [
      {
        question: 'Qual é o objetivo de ensinar "razões morais" aos filhos em vez de apenas regras externas?',
        questionEn: 'What is the purpose of teaching moral reasons to children instead of mere rules?',
        options: [
          'Alcançar o coração da criança para que ela ame o bem por convicção própria',
          'Fazer a criança cansar mais rápido',
          'Evitar que ela faça perguntas',
          'Não há diferença alguma'
        ],
        correctIndex: 0,
        explanation: 'Razões morais alcançam o íntimo da criança, forjando um caráter íntegro para a vida toda.'
      }
    ]
  },

  // DIA 3: CASAMENTO & PACIÊNCIA
  {
    id: '1cor-13-4-7',
    day: 3,
    track: 'marriage',
    trackLabel: 'Casamento & Fé',
    theme: 'Amor Paciente & Generoso (Patient Love)',
    title: 'The Patient Love That Bears All Things',
    titlePt: 'O Amor Paciente que Tudo Suporta',
    verseRef: '1 Corinthians 13:4-7',
    verseEn: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.',
    versePt: 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor. O amor não se alegra com a injustiça, mas se alegra com a verdade. Tudo sofre, tudo crê, tudo espera, tudo suporta.',
    audioSnippet: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. Love always protects, always trusts, always hopes, always perseveres.',
    keywords: [
      {
        word: 'patient',
        ipa: '/ˈpeɪ.ʃənt/',
        pos: 'adjective',
        meaningPt: 'paciente, compassivo, perseverante',
        contextNote: 'Em grego bíblico (makrothumia), significa suportar com longanimidade antes de reagir.',
        exampleEn: 'Patience is love in slow motion.',
        examplePt: 'A paciência é o amor em câmera lenta.'
      },
      {
        word: 'kind',
        ipa: '/kaɪnd/',
        pos: 'adjective',
        meaningPt: 'bondoso, gentil, amável',
        contextNote: 'Disposição ativa de fazer o bem com delicadeza ao cônjuge.',
        exampleEn: 'A kind word turns away anger.',
        examplePt: 'Uma palavra amável desvia o furor.'
      },
      {
        word: 'perseveres',
        ipa: '/ˌpɝː.səˈvɪrz/',
        pos: 'verb (3rd person singular)',
        meaningPt: 'persevera, mantém-se firme na aliança',
        contextNote: 'Permanecer firme mesmo quando as circunstâncias exteriores são desafiadoras.',
        exampleEn: 'Covenant love perseveres through every storm.',
        examplePt: 'O amor de aliança persevera através de qualquer tempestade.'
      }
    ],
    devotionalEn: `Paul starts his famous definition of love not with deep emotions, but with a deliberate posture: patience. In marriage, patience means giving your spouse room to grow, to make mistakes, and to have difficult days without meeting them with criticism. Love keeps no record of wrongs. Today, make a conscious decision to tear up any mental checklist of petty grievances.`,
    devotionalPt: `Paulo inicia sua famosa definição de amor não com emoções arrebatadoras, mas com uma postura deliberada: a paciência. No casamento, paciência significa dar ao cônjuge espaço para crescer, errar e ter dias difíceis sem ser recebido com críticas. O amor não guarda rancor. Hoje, tome a decisão consciente de rasgar qualquer caderninho mental de queixas.`,
    grammarGem: {
      title: 'A expressão "Keeps no record of wrongs"',
      explanation: 'Literalmente: "não mantém registro de erros". Use para expressar perdão completo e reconciliação.',
      example: '"In our marriage, we keep no record of wrongs because grace reigns."'
    },
    couplePrayerEn: 'Father, forgive us for times when we were impatient or kept score of each other’s mistakes. Clothe Adam and Marcela with supernatural kindness. May our home be defined by the patient, enduring love of Christ. Amen.',
    couplePrayerPt: 'Pai, perdoa-nos pelas vezes em que fomos impacientes ou guardamos registros dos erros um do outro. Reveste o Adam e a Marcela com bondade sobrenatural. Que o nosso lar seja definido pelo amor paciente e eterno de Cristo. Amém.',
    quiz: [
      {
        question: 'Segundo 1 Coríntios 13:5, qual é a atitude do amor bíblico em relação a mágoas passadas?',
        questionEn: 'According to 1 Corinthians 13:5, what is love’s attitude toward past offenses?',
        options: [
          'Guarda tudo para cobrar depois numa discussão',
          'Não guarda rancor nem mantém registro de erros',
          'Conta para todos os vizinhos',
          'Finge que perdoou mas se afasta'
        ],
        correctIndex: 1,
        explanation: 'O amor bíblico "keeps no record of wrongs", liberando perdão genuíno e recomeço.'
      }
    ]
  },

  // DIA 4: DISCIPLINA & FILHO REBELDE (INTERCALADO)
  {
    id: 'heb-12-11-defiance',
    day: 4,
    track: 'parenting',
    trackLabel: 'Família & Filhos',
    theme: 'Filho Rebelde & Limites (Defiance & Restoration)',
    title: 'Dealing with Rebellion: Beyond Defiance into Loving Restoration',
    titlePt: 'Lidando com a Rebeldia: Além do Desafio rumo à Restauração',
    verseRef: 'Hebrews 12:11 & Ephesians 6:4',
    verseEn: 'No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it. Fathers, do not exasperate your children; instead, bring them up in the training and instruction of the Lord.',
    versePt: 'Nenhuma disciplina parece ser motivo de alegria no momento, mas sim de tristeza. Mais tarde, porém, produz fruto de justiça e paz para os que por ela foram exercitados. Pais, não irritem seus filhos; antes, criem-nos na disciplina e na instrução do Senhor.',
    audioSnippet: 'No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace.',
    keywords: [
      {
        word: 'defiance',
        ipa: '/dɪˈfaɪ.əns/',
        pos: 'noun',
        meaningPt: 'desafio aberto à autoridade dos pais',
        contextNote: 'Responder com autoridade serena, sem gritar ou humilhar a criança.',
        exampleEn: 'Calm consistency neutralizes defiance.',
        examplePt: 'A consistência calma neutraliza o desafio à autoridade.'
      },
      {
        word: 'reconciliation',
        ipa: '/ˌrek.ənˌsɪl.iˈeɪ.ʃən/',
        pos: 'noun',
        meaningPt: 'reconciliação com abraço e reafirmação do amor',
        contextNote: 'Toda disciplina bíblica termina em oração, abraço e restauração plena.',
        exampleEn: 'End every correction with loving reconciliation.',
        examplePt: 'Termine toda correção com reconciliação afetuosa.'
      }
    ],
    devotionalEn: `Defiance in children is a direct test of the boundaries God placed in the home. When parents react with screaming or sarcasm, they stoop to the child's level of immaturity. Scripture instructs parents: do not exasperate your children. Discipline with calm firmness, apply loving consequences, and conclude with a warm embrace and prayer of restoration.`,
    devotionalPt: `A rebeldia nos filhos testa os limites que Deus instituiu no lar. Quando os pais reagem com gritos ou sarcasmo, rebaixam-se ao nível de imaturidade da criança. A Bíblia instrui: não exasperem seus filhos. Corrija com firmeza mansa, aplique a consequência amorosa e encerre com um abraço quente e oração de restauração.`,
    grammarGem: {
      title: 'Comandos de Firmeza Calma: "In our home, we choose to..."',
      explanation: 'Use frases afirmativas de honra em inglês: "In our home, we speak with kindness and respect."',
      example: '"I love you, but in our family we do not shout. Let\'s try again with a quiet voice."'
    },
    couplePrayerEn: 'Lord Jesus, give Adam and Marcela supernatural patience when our children test boundaries. Teach us to lead with calm authority, reflecting Your cross of grace and truth. Amen.',
    couplePrayerPt: 'Senhor Jesus, dá ao Adam e à Marcela paciência sobrenatural quando nossos filhos testarem limites. Ensina-nos a liderar com autoridade serena, refletindo Tua cruz de graça e verdade. Amém.',
    quiz: [
      {
        question: 'Como os pais devem encerrar a disciplina de um comportamento rebelde?',
        questionEn: 'How should parents conclude the discipline of a rebellious behavior?',
        options: [
          'Com abraço caloroso, oração de reconciliação e reafirmação do amor incondicional',
          'Com mais broncas pelo resto da noite',
          'Ficando sem conversar por dias',
          'Expulsando a criança de casa'
        ],
        correctIndex: 0,
        explanation: 'A disciplina cristã restaura a comunhão e demonstra o perdão da cruz após o arrependimento.'
      }
    ]
  },

  // DIA 5: CASAMENTO & COMUNICAÇÃO
  {
    id: 'eph-4-29-communication',
    day: 5,
    track: 'marriage',
    trackLabel: 'Casamento & Fé',
    theme: 'Comunicação Construtiva (Edifying Words)',
    title: 'Speaking the Truth in Deep Love',
    titlePt: 'Falando a Verdade em Profundo Amor',
    verseRef: 'Ephesians 4:15, 29, 32',
    verseEn: 'Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up according to their needs, that it may benefit those who listen. Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.',
    versePt: 'Não saia da vossa boca nenhuma palavra torpe, mas só a que for boa para promover a edificação, para que dê graça aos que a ouvem. Sejam bondosos e compassivos uns para com os outros, perdoando-se mutuamente, assim como Deus os perdoou em Cristo.',
    audioSnippet: 'Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up.',
    keywords: [
      {
        word: 'unwholesome',
        ipa: '/ʌnˈhoʊl.səm/',
        pos: 'adjective',
        meaningPt: 'destrutivo, torpe, prejudicial, venenoso',
        contextNote: 'Palavras que diminuem, ironizam ou machucam a alma do outro.',
        exampleEn: 'Unwholesome words poison marital trust.',
        examplePt: 'Palavras destrutivas envenenam a confiança no casamento.'
      },
      {
        word: 'building up / edifying',
        ipa: '/ˈbɪl.dɪŋ ʌp/',
        pos: 'phrasal verb / noun',
        meaningPt: 'edificar, construir, fortalecer a dignidade',
        contextNote: 'Como um pedreiro que assenta tijolos sólidos no coração do cônjuge.',
        exampleEn: 'Speak words that build up your spouse’s confidence.',
        examplePt: 'Fale palavras que edifiquem a confiança do seu cônjuge.'
      }
    ],
    devotionalEn: `Words have creative power in a marriage. A single sarcastic remark can linger for weeks, while a genuine word of affirmation can heal fatigue and inspire boldness. Paul tells us: speak only what is helpful for building up. Before speaking during a disagreement, ask: "Will these words build a bridge or dig a trench?"`,
    devotionalPt: `As palavras têm poder criativo no casamento. Um único comentário sarcástico pode ecoar por semanas, enquanto uma palavra genuína de afirmação cura o cansaço e injeta coragem. Paulo nos adverte: falem apenas o que edifica. Antes de falar numa discordância, pergunte-se: "Essas palavras vão construir uma ponte ou cavar uma trincheira?"`,
    grammarGem: {
      title: 'A expressão "Build someone up" vs "Tear someone down"',
      explanation: '"Build up" significa edificar, elogiar e fortalecer; "tear down" significa depreciar e destruir.',
      example: '"Let us choose to build each other up every single day."'
    },
    couplePrayerEn: 'Lord, set a guard over our lips. Forgive us for careless words spoken in haste. May Adam’s words bless Marcela, and may Marcela’s words refresh Adam. Make our conversations sweet and holy. Amen.',
    couplePrayerPt: 'Senhor, põe uma guarda em nossos lábios. Perdoa-nos por palavras impensadas proferidas na pressa. Que as palavras do Adam abençoem a Marcela, e as da Marcela refrigere o Adam. Torna nossas conversas doces e santas. Amém.',
    quiz: [
      {
        question: 'Segundo Efésios 4:29, qual deve ser o critério para as palavras que saem de nossa boca no lar?',
        questionEn: 'According to Ephesians 4:29, what should guide the words spoken in our home?',
        options: [
          'Apenas o que for útil para edificar e transmitir graça aos que ouvem',
          'Falar tudo o que dá vontade sem pensar',
          'Criticar todos os pequenos defeitos',
          'Usar sarcasmo como forma de humor'
        ],
        correctIndex: 0,
        explanation: 'A Bíblia nos orienta a usar palavras construtivas que comuniquem graça e edificação mútua.'
      }
    ]
  },

  // DIA 6: CASAMENTO & TEMPO DE SOFÁ (INTERCALADO)
  {
    id: 'gen-2-24-sofa-time',
    day: 6,
    track: 'parenting',
    trackLabel: 'Família & Filhos',
    theme: 'Casamento Forte & Tempo de Sofá (Sofa Time)',
    title: 'The One-Flesh Fortress: Daily Sofa Time and Marital Priority',
    titlePt: 'A Fortaleza do Casal: O Tempo de Sofá e a Prioridade Conjugal',
    verseRef: 'Genesis 2:24 & Ephesians 5:31-33',
    verseEn: 'That is why a man leaves his father and mother and is united to his wife, and they become one flesh. However, each one of you also must love his wife as he loves himself, and the wife must respect her husband.',
    versePt: 'Por essa razão, o homem deixará pai e mãe e se unirá à sua mulher, e eles se tornarão uma só carne. Portanto, cada um de vocês também ame a sua mulher como a si mesmo, e a mulher trate o marido com todo o respeito.',
    audioSnippet: 'That is why a man leaves his father and mother and is united to his wife, and they become one flesh.',
    keywords: [
      {
        word: 'sofa time',
        ipa: '/ˈsoʊ.fə taɪm/',
        pos: 'noun phrase',
        meaningPt: 'tempo de sofá (15 minutos diários de conversa do casal perante os filhos)',
        contextNote: 'Demonstrar aos filhos que o amor dos pais é a maior âncora de segurança do lar.',
        exampleEn: 'During sofa time, children learn patience and see true love.',
        examplePt: 'Durante o tempo de sofá, os filhos aprendem paciência e veem o amor verdadeiro.'
      },
      {
        word: 'one-flesh',
        ipa: '/wʌn fleʃ/',
        pos: 'adjective',
        meaningPt: 'uma só carne (a aliança inquebrável do casal)',
        contextNote: 'O casamento veio antes dos filhos e continuará depois que eles crescerem.',
        exampleEn: 'Our one-flesh bond protects the peace of our home.',
        examplePt: 'Nosso laço de uma só carne protege a paz do nosso lar.'
      }
    ],
    devotionalEn: `The greatest emotional security a child can experience is seeing that their parents love each other passionately and visibly. Practice "sofa time": sit together for 15 uninterrupted minutes on the couch, hold hands, talk, and teach your children that mom and dad belong to each other.`,
    devotionalPt: `A maior segurança emocional de um filho é ver que seus pais se amam apaixonadamente e com visibilidade. Pratique o "tempo de sofá": sentem-se juntos por 15 minutos ininterruptos no sofá, deem as mãos, conversem com afeto e ensinem aos filhos que o amor do casal é sólido e prioritário.`,
    grammarGem: {
      title: 'A expressão "Put our marriage first"',
      explanation: 'Use em conversas em inglês: "Putting our marriage first gives our children lasting peace."',
      example: '"We put our marriage first because children flourish under united parents."'
    },
    couplePrayerEn: 'Lord, protect our marriage from becoming a child-centered home. Help us guard our daily romance, our laughter, and our sofa time. May our children rest secure in our united love. Amen.',
    couplePrayerPt: 'Senhor, protege nosso casamento de se tornar um lar centrado apenas nas crianças. Ajuda-nos a guardar nosso romance diário, nossos risos e nosso tempo de sofá. Que nossos filhos descansem seguros em nosso amor unido. Amém.',
    quiz: [
      {
        question: 'O que o hábito do "sofa time" (tempo de sofá) ensina visualmente aos filhos?',
        questionEn: 'What does daily "sofa time" visually teach children?',
        options: [
          'Que o amor dos pais é sólido e prioritário, transmitindo enorme segurança emocional',
          'Que a televisão é a coisa mais importante da casa',
          'Que os filhos devem mandar na rotina da família',
          'Que ninguém deve conversar na sala'
        ],
        correctIndex: 0,
        explanation: 'Ver os pais conversando carinhosamente no sofá ensina paciência e ancora a segurança emocional da criança.'
      }
    ]
  },

  // DIA 7: CASAMENTO & PARCERIA
  {
    id: 'eccl-4-9-12-unity',
    day: 7,
    track: 'marriage',
    trackLabel: 'Casamento & Fé',
    theme: 'Unidade & Parceria (Two Are Better Than One)',
    title: 'Two Are Far Better Than One: The Threefold Cord',
    titlePt: 'Melhor É Serem Dois: O Cordão de Três Dobras',
    verseRef: 'Ecclesiastes 4:9-12',
    verseEn: 'Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up. Though one may be overpowered, two can defend themselves. A cord of three strands is not quickly broken.',
    versePt: 'Melhor é serem dois do que um, porque têm melhor paga do seu trabalho. Pois se caírem, um levantará o seu companheiro. Se alguém quiser prevalecer contra um, os dois lhe resistirão; e o cordão de três dobras não se quebra tão depressa.',
    audioSnippet: 'Two are better than one, because they have a good return for their labor. A cord of three strands is not quickly broken.',
    keywords: [
      {
        word: 'threefold cord / three strands',
        ipa: '/ˈθriː.foʊld kɔːrd/',
        pos: 'noun phrase',
        meaningPt: 'cordão de três dobras (Marido + Esposa + Cristo no centro)',
        contextNote: 'A clássica metáfora bíblica para um casamento blindado pela presença do Senhor.',
        exampleEn: 'With Christ as our third strand, our marriage cannot be broken.',
        examplePt: 'Com Cristo como nossa terceira dobra, nosso casamento não pode ser rompido.'
      },
      {
        word: 'lift up / help up',
        ipa: '/lɪft ʌp/',
        pos: 'phrasal verb',
        meaningPt: 'levantar, reerguer o companheiro quando ele tropeça ou cansa',
        contextNote: 'O papel de apoio e consolo mútuo nas fases de desânimo.',
        exampleEn: 'When you are weary, I will help you up.',
        examplePt: 'Quando você estiver cansado(a), eu te ajudarei a levantar.'
      }
    ],
    devotionalEn: `Marriage was never designed to be an individual competition of who works harder or who is right. God designed marriage as a divine partnership where two become one, bound together by the Holy Spirit. If one stumbles, the other is stationed by God to lift them up. With Jesus at the center, your marriage cord is unbreakable.`,
    devotionalPt: `O casamento nunca foi planejado para ser uma competição de quem trabalha mais ou quem tem razão. Deus desenhou o matrimônio como uma parceria santa onde dois se tornam um, unidos pelo Espírito Santo. Se um tropeçar, o outro está posicionado por Deus para levantá-lo. Com Jesus no centro, o cordão do seu casamento é inquebrável.`,
    grammarGem: {
      title: 'A expressão "Better return for their labor"',
      explanation: 'Significa "melhor fruto ou recompensa pelo trabalho conjunto". Use ao celebrar vitórias a dois.',
      example: '"Working together as a couple yields a far better return for our family."'
    },
    couplePrayerEn: 'Lord Jesus, be the sacred third strand in our marriage cord. When one of us feels weak, give the other strength to lift up and encourage. Keep Adam and Marcela deeply united in purpose, vision, and holy love. Amen.',
    couplePrayerPt: 'Senhor Jesus, sê a terceira dobra santa no cordão do nosso casamento. Quando um de nós se sentir fraco, dá ao outro força para levantar e encorajar. Mantém o Adam e a Marcela profundamente unidos em propósito, visão e santo amor. Amém.',
    quiz: [
      {
        question: 'Quem é a terceira dobra indispensável no cordão do casamento cristão?',
        questionEn: 'Who is the indispensable third strand in a Christian marriage cord?',
        options: [
          'Cristo Jesus no centro da união',
          'A opinião dos parentes',
          'O dinheiro acumulado',
          'A rotina de trabalho'
        ],
        correctIndex: 0,
        explanation: 'Com Cristo no centro da aliança, as tempestades não conseguem romper o casamento.'
      }
    ]
  },

  // DIA 8: EMOÇÕES & BIRRAS (INTERCALADO)
  {
    id: 'prov-16-32-tantrums',
    day: 8,
    track: 'parenting',
    trackLabel: 'Família & Filhos',
    theme: 'Birras & Domínio Próprio (Tantrums & Self-Control)',
    title: 'Taming the Storm: Tantrums and Self-Control in Christ',
    titlePt: 'Acalmando a Tempestade: Birras e Autocontrole em Cristo',
    verseRef: 'Proverbs 16:32 & James 1:19-20',
    verseEn: 'Better a patient person than a warrior, one with self-control than one who takes a city. Everyone should be quick to listen, slow to speak and slow to become angry, because human anger does not produce the righteousness that God desires.',
    versePt: 'Melhor é o homem paciente do que o guerreiro, mais vale controlar o seu espírito do que conquistar uma cidade. Sejam todos prontos para ouvir, tardios para falar e tardios para se irar, pois a ira humana não produz a justiça de Deus.',
    audioSnippet: 'Better a patient person than a warrior, one with self-control than one who takes a city.',
    keywords: [
      {
        word: 'self-control',
        ipa: '/ˌself.kənˈtroʊl/',
        pos: 'noun',
        meaningPt: 'domínio próprio, autocontrole (fruto do Espírito Santo)',
        contextNote: 'A virtude que os pais devem modelar antes de exigir da criança.',
        exampleEn: 'Model self-control during emotional meltdowns.',
        examplePt: 'Seja exemplo de domínio próprio durante colapsos emocionais.'
      },
      {
        word: 'safe harbor',
        ipa: '/seɪf ˈhɑːr.bɚ/',
        pos: 'noun phrase',
        meaningPt: 'porto seguro (presença calma dos pais durante a crise)',
        contextNote: 'Não se descontrolar junto com o choro da criança.',
        exampleEn: 'Be a safe harbor, not another storm.',
        examplePt: 'Seja um porto seguro, e não outra tempestade.'
      }
    ],
    devotionalEn: `When a child throws a tantrum, the temptation is to either scream in anger or surrender to make the noise stop. Both reactions fail. If you surrender, you teach that screaming works; if you explode, you model a lack of self-control. Stay anchored. Whisper instead of shouting, wait for the storm to pass, and teach your child how to cultivate a quiet heart in Christ.`,
    devotionalPt: `Quando uma criança tem uma birra, a tentação da carne é gritar de volta ou ceder para o choro parar. Ambas as reações falham. Se você cede, ensina que a birra funciona; se você explode, demonstra falta de domínio próprio. Mantenha-se firme. Fale baixo em vez de gritar, espere a tempestade passar e ensine seu filho a ter um coração sereno em Cristo.`,
    grammarGem: {
      title: 'A frase carinhosa "Let’s wait for a quiet heart"',
      explanation: 'Comando amoroso em inglês para acalmar a criança: "Take a deep breath and let\'s wait for a quiet heart."',
      example: '"I hear that you are upset, but we don\'t scream. Let\'s breathe and find a quiet heart."'
    },
    couplePrayerEn: 'Lord, give Adam and Marcela supernatural self-control when our children experience emotional storms. May our calm presence be a peaceful sanctuary for our family. Amen.',
    couplePrayerPt: 'Senhor, dá ao Adam e à Marcela domínio próprio sobrenatural quando nossos filhos enfrentarem tempestades emocionais. Que nossa presença serena seja um santuário de paz para nossa família. Amém.',
    quiz: [
      {
        question: 'O que os pais devem fazer diante de uma crise de birra da criança?',
        questionEn: 'What should parents do during a child’s emotional tantrum?',
        options: [
          'Manter a calma, não ceder à exigência e ensinar o domínio próprio com voz suave após o choro cessar',
          'Gritar mais alto para assustar a criança',
          'Comprar doces para ela parar de chorar',
          'Ignorar para sempre'
        ],
        correctIndex: 0,
        explanation: 'Pais sábios atuam como porto seguro: não alimentam a raiva e mantêm o limite com tranquilidade.'
      }
    ]
  }
];
