// Bilingual Bible Explorer Data (English NIV / Portuguese NVI)
// Organized by books, chapters, and key faith/marriage/wisdom themes

export const BIBLE_THEMES = [
  { id: 'all', label: 'Todos os Temas', labelEn: 'All Themes', icon: '✨' },
  { id: 'love-marriage', label: 'Amor & Casamento', labelEn: 'Love & Marriage', icon: '❤️' },
  { id: 'peace-trust', label: 'Paz & Confiança', labelEn: 'Peace & Trust', icon: '🕊️' },
  { id: 'wisdom-guidance', label: 'Sabedoria & Direção', labelEn: 'Wisdom & Guidance', icon: '💡' },
  { id: 'family-children', label: 'Família & Filhos', labelEn: 'Family & Children', icon: '👨‍👩‍👧‍👦' },
  { id: 'faith-promises', label: 'Fé & Promessas', labelEn: 'Faith & Promises', icon: '🛡️' },
  { id: 'praise-worship', label: 'Louvor & Adoração', labelEn: 'Praise & Worship', icon: '🎵' },
  { id: 'strength-courage', label: 'Força & Coragem', labelEn: 'Strength & Courage', icon: '⚡' }
];

export const BIBLE_BOOKS = [
  { id: 'all', name: 'Todos os Livros', nameEn: 'All Books', testament: 'all' },
  { id: 'genesis', name: 'Gênesis', nameEn: 'Genesis', testament: 'OT' },
  { id: 'psalms', name: 'Salmos', nameEn: 'Psalms', testament: 'OT' },
  { id: 'proverbs', name: 'Provérbios', nameEn: 'Proverbs', testament: 'OT' },
  { id: 'isaiah', name: 'Isaías', nameEn: 'Isaiah', testament: 'OT' },
  { id: 'jeremiah', name: 'Jeremias', nameEn: 'Jeremiah', testament: 'OT' },
  { id: 'matthew', name: 'Mateus', nameEn: 'Matthew', testament: 'NT' },
  { id: 'john', name: 'João', nameEn: 'John', testament: 'NT' },
  { id: 'romans', name: 'Romanos', nameEn: 'Romans', testament: 'NT' },
  { id: '1corinthians', name: '1 Coríntios', nameEn: '1 Corinthians', testament: 'NT' },
  { id: 'ephesians', name: 'Efésios', nameEn: 'Ephesians', testament: 'NT' },
  { id: 'philippians', name: 'Filipenses', nameEn: 'Philippians', testament: 'NT' },
  { id: 'colossians', name: 'Colossenses', nameEn: 'Colossians', testament: 'NT' },
  { id: 'james', name: 'Tiago', nameEn: 'James', testament: 'NT' },
  { id: '1john', name: '1 João', nameEn: '1 John', testament: 'NT' }
];

export const BIBLE_VERSES = [
  // --- AMOR & CASAMENTO ---
  {
    id: 'gen-2-24',
    bookId: 'genesis',
    bookName: 'Gênesis',
    bookNameEn: 'Genesis',
    chapter: 2,
    verse: 24,
    reference: 'Gênesis 2:24',
    referenceEn: 'Genesis 2:24',
    themeId: 'love-marriage',
    verseEn: 'That is why a man leaves his father and mother and is united to his wife, and they become one flesh.',
    versePt: 'Por essa razão, o homem deixará pai e mãe e se unirá à sua mulher, e eles se tornarão uma só carne.',
    keywords: [
      { word: 'united', ipa: '/juːˈnaɪ.tɪd/', meaning: 'unido, ligado em aliança' },
      { word: 'one flesh', ipa: '/wʌn fleʃ/', meaning: 'uma só carne (aliança total)' }
    ],
    reflectionEn: 'Marriage is God’s sacred covenant where two independent lives are bonded into one indivisible union.',
    reflectionPt: 'O casamento é a sagrada aliança de Deus onde duas vidas independentes se fundem em uma união indivisível.'
  },
  {
    id: '1cor-13-4-7',
    bookId: '1corinthians',
    bookName: '1 Coríntios',
    bookNameEn: '1 Corinthians',
    chapter: 13,
    verse: '4-7',
    reference: '1 Coríntios 13:4-7',
    referenceEn: '1 Corinthians 13:4-7',
    themeId: 'love-marriage',
    verseEn: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.',
    versePt: 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor. O amor não se alegra com a injustiça, mas se alegra com a verdade. Tudo sofre, tudo crê, tudo espera, tudo suporta.',
    keywords: [
      { word: 'patient', ipa: '/ˈpeɪ.ʃənt/', meaning: 'paciente, longânimo' },
      { word: 'kind', ipa: '/kaɪnd/', meaning: 'bondoso, afável' },
      { word: 'perseveres', ipa: '/ˌpɝː.səˈvɪrz/', meaning: 'persevera, suporta com firmeza' }
    ],
    reflectionEn: 'Biblical love is not a passive emotion; it is a sacrificial daily decision to put the other person first.',
    reflectionPt: 'O amor bíblico não é uma emoção passageira; é a decisão sacrificial diária de priorizar o outro.'
  },
  {
    id: 'eph-5-25',
    bookId: 'ephesians',
    bookName: 'Efésios',
    bookNameEn: 'Ephesians',
    chapter: 5,
    verse: 25,
    reference: 'Efésios 5:25',
    referenceEn: 'Ephesians 5:25',
    themeId: 'love-marriage',
    verseEn: 'Husbands, love your wives, just as Christ loved the church and gave himself up for her.',
    versePt: 'Maridos, ame cada um a sua mulher, assim como Cristo amou a igreja e entregou-se por ela.',
    keywords: [
      { word: 'gave himself up', ipa: '/ɡeɪv hɪmˈself ʌp/', meaning: 'entregou-se sacrificialmente' },
      { word: 'church', ipa: '/tʃɝːtʃ/', meaning: 'igreja, o corpo de Cristo' }
    ],
    reflectionEn: 'A husband’s love reflects Christ’s servant leadership through protection, tenderness, and sacrifice.',
    reflectionPt: 'O amor do marido reflete a liderança servil de Cristo por meio de proteção, carinho e renúncia.'
  },
  {
    id: 'eph-5-33',
    bookId: 'ephesians',
    bookName: 'Efésios',
    bookNameEn: 'Ephesians',
    chapter: 5,
    verse: 33,
    reference: 'Efésios 5:33',
    referenceEn: 'Ephesians 5:33',
    themeId: 'love-marriage',
    verseEn: 'However, each one of you also must love his wife as he loves himself, and the wife must respect her husband.',
    versePt: 'Portanto, cada um de vocês também ame a sua mulher como a si mesmo, e a mulher trate o marido com todo o respeito.',
    keywords: [
      { word: 'respect', ipa: '/rɪˈspekt/', meaning: 'respeitar, tratar com estima e honra' },
      { word: 'loves himself', ipa: '/lʌvz hɪmˈself/', meaning: 'ama a si mesmo' }
    ],
    reflectionEn: 'Love and respect form the dual engine of a joyful, enduring Christian marriage.',
    reflectionPt: 'Amor e respeito formam a engrenagem dupla de um casamento cristão próspero e duradouro.'
  },

  // --- PAZ & CONFIANÇA ---
  {
    id: 'phil-4-6-7',
    bookId: 'philippians',
    bookName: 'Filipenses',
    bookNameEn: 'Philippians',
    chapter: 4,
    verse: '6-7',
    reference: 'Filipenses 4:6-7',
    referenceEn: 'Philippians 4:6-7',
    themeId: 'peace-trust',
    verseEn: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
    versePt: 'Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus.',
    keywords: [
      { word: 'anxious', ipa: '/ˈæŋk.ʃəs/', meaning: 'ansioso, preocupado' },
      { word: 'thanksgiving', ipa: '/ˌθæŋksˈɡɪv.ɪŋ/', meaning: 'ações de graças, gratidão' },
      { word: 'transcends', ipa: '/trænˈsendz/', meaning: 'vai além de qualquer lógica humana' }
    ],
    reflectionEn: 'Trading anxiety for prayer and gratitude unleashes a supernatural peace that guards our home.',
    reflectionPt: 'Trocar a ansiedade por oração e gratidão libera uma paz sobrenatural que protege o nosso lar.'
  },
  {
    id: 'john-14-27',
    bookId: 'john',
    bookName: 'João',
    bookNameEn: 'John',
    chapter: 14,
    verse: 27,
    reference: 'João 14:27',
    referenceEn: 'John 14:27',
    themeId: 'peace-trust',
    verseEn: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.',
    versePt: 'Deixo-lhes a paz; a minha paz lhes dou. Não lha dou como o mundo a dá. Não se perturbe o seu coração, nem tenham medo.',
    keywords: [
      { word: 'troubled', ipa: '/ˈtrʌb.əld/', meaning: 'perturbado, inquieto' },
      { word: 'afraid', ipa: '/əˈfreɪd/', meaning: 'com medo, amedrontado' }
    ],
    reflectionEn: 'Christ’s peace is an immovable anchor that remains steady even in the fiercest life storms.',
    reflectionPt: 'A paz de Cristo é uma âncora inabalável que permanece firme mesmo nas piores tempestades da vida.'
  },
  {
    id: 'psalm-23-1-3',
    bookId: 'psalms',
    bookName: 'Salmos',
    bookNameEn: 'Psalms',
    chapter: 23,
    verse: '1-3',
    reference: 'Salmo 23:1-3',
    referenceEn: 'Psalm 23:1-3',
    themeId: 'peace-trust',
    verseEn: 'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.',
    versePt: 'O Senhor é o meu pastor; de nada terei falta. Em verdes pastagens me faz repousar e me conduz a águas tranquilas; restaura-me o vigor.',
    keywords: [
      { word: 'shepherd', ipa: '/ˈʃep.ɚd/', meaning: 'pastor que guia e protege' },
      { word: 'lack nothing', ipa: '/læk ˈnʌθ.ɪŋ/', meaning: 'não sinto falta de nada essencial' },
      { word: 'refreshes', ipa: '/rɪˈfreʃ.ɪz/', meaning: 'refrigera, restaura a alma' }
    ],
    reflectionEn: 'When the Good Shepherd leads our marriage, we rest in green pastures of divine contentment.',
    reflectionPt: 'Quando o Bom Pastor lidera o casamento, repousamos em pastagens verdes de plena provisão.'
  },

  // --- SABEDORIA & DIREÇÃO ---
  {
    id: 'prov-3-5-6',
    bookId: 'proverbs',
    bookName: 'Provérbios',
    bookNameEn: 'Proverbs',
    chapter: 3,
    verse: '5-6',
    reference: 'Provérbios 3:5-6',
    referenceEn: 'Proverbs 3:5-6',
    themeId: 'wisdom-guidance',
    verseEn: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    versePt: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.',
    keywords: [
      { word: 'trust', ipa: '/trʌst/', meaning: 'confiar plenamente' },
      { word: 'lean not', ipa: '/liːn nɑːt/', meaning: 'não se apoie na própria lógica' },
      { word: 'paths straight', ipa: '/pæðz streɪt/', meaning: 'caminhos retos e desimpedidos' }
    ],
    reflectionEn: 'True wisdom begins when a couple surrenders self-reliance and seeks God’s sovereign direction.',
    reflectionPt: 'A verdadeira sabedoria começa quando o casal renuncia ao orgulho próprio e busca a direção de Deus.'
  },
  {
    id: 'james-1-5',
    bookId: 'james',
    bookName: 'Tiago',
    bookNameEn: 'James',
    chapter: 1,
    verse: 5,
    reference: 'Tiago 1:5',
    referenceEn: 'James 1:5',
    themeId: 'wisdom-guidance',
    verseEn: 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.',
    versePt: 'Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá generosamente e sem reprovação, e ela lhe será dada.',
    keywords: [
      { word: 'wisdom', ipa: '/ˈwɪz.dəm/', meaning: 'sabedoria prática e divina' },
      { word: 'generously', ipa: '/ˈdʒen.ɚ.əs.li/', meaning: 'generosamente, com abundância' }
    ],
    reflectionEn: 'Whenever a difficult decision arises in your home, ask God together with open and humble hearts.',
    reflectionPt: 'Sempre que surgir uma decisão difícil na casa de vocês, peçam sabedoria a Deus juntos em oração.'
  },
  {
    id: 'psalm-119-105',
    bookId: 'psalms',
    bookName: 'Salmos',
    bookNameEn: 'Psalms',
    chapter: 119,
    verse: 105,
    reference: 'Salmo 119:105',
    referenceEn: 'Psalm 119:105',
    themeId: 'wisdom-guidance',
    verseEn: 'Your word is a lamp for my feet, a light on my path.',
    versePt: 'Lâmpada para os meus pés é a tua palavra e, luz para o meu caminho.',
    keywords: [
      { word: 'lamp', ipa: '/læmp/', meaning: 'lâmpada, tocha que ilumina o passo imediato' },
      { word: 'path', ipa: '/pæθ/', meaning: 'caminho, trajetória da vida' }
    ],
    reflectionEn: 'God’s Word illuminates the very next step, giving clarity and wisdom for our family journey.',
    reflectionPt: 'A Palavra de Deus ilumina o próximo passo, dando clareza e sabedoria para a caminhada da família.'
  },

  // --- FAMÍLIA & FILHOS ---
  {
    id: 'deut-6-6-7',
    bookId: 'genesis', // Pentateuco
    bookName: 'Deuteronômio',
    bookNameEn: 'Deuteronomy',
    chapter: 6,
    verse: '6-7',
    reference: 'Deuteronômio 6:6-7',
    referenceEn: 'Deuteronomy 6:6-7',
    themeId: 'family-children',
    verseEn: 'These commandments that I give you today are to be on your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you lie down and when you get up.',
    versePt: 'Estas palavras que hoje lhe ordeno devem estar no seu coração. Ensine-as com persistência aos seus filhos. Converse sobre elas quando estiver em casa e quando andar pelo caminho, ao deitar-se e ao levantar-se.',
    keywords: [
      { word: 'impress', ipa: '/ɪmˈpres/', meaning: 'gravar com persistência, inculcar' },
      { word: 'sit at home', ipa: '/sɪt ət hoʊm/', meaning: 'sentar em casa na convivência diária' }
    ],
    reflectionEn: 'Parenting is not a weekly lecture; it is an organic, daily conversation about God’s goodness.',
    reflectionPt: 'Criar filhos não é uma palestra semanal; é uma conversa diária e natural sobre a bondade de Deus.'
  },
  {
    id: 'prov-22-6',
    bookId: 'proverbs',
    bookName: 'Provérbios',
    bookNameEn: 'Proverbs',
    chapter: 22,
    verse: 6,
    reference: 'Provérbios 22:6',
    referenceEn: 'Proverbs 22:6',
    themeId: 'family-children',
    verseEn: 'Start children off on the way they should go, and even when they are old they will not turn from it.',
    versePt: 'Instrui a criança no caminho em que deve andar, e, até quando envelhecer, não se desviará dele.',
    keywords: [
      { word: 'start off', ipa: '/stɑːrt ɑːf/', meaning: 'iniciar, guiar desde o princípio' },
      { word: 'turn from it', ipa: '/tɝːn frəm ɪt/', meaning: 'desviar-se, abandonar a rota' }
    ],
    reflectionEn: 'Foundational moral truths planted in early childhood form roots that weather adult storms.',
    reflectionPt: 'Princípios morais plantados na infância geram raízes que sustentam os filhos nas tempestades adultas.'
  },
  {
    id: 'psalm-127-3',
    bookId: 'psalms',
    bookName: 'Salmos',
    bookNameEn: 'Psalms',
    chapter: 127,
    verse: 3,
    reference: 'Salmo 127:3',
    referenceEn: 'Psalm 127:3',
    themeId: 'family-children',
    verseEn: 'Children are a heritage from the Lord, offspring a reward from him.',
    versePt: 'Os filhos são herança do Senhor, uma recompensa que ele dá.',
    keywords: [
      { word: 'heritage', ipa: '/ˈher.ɪ.t̬ɪdʒ/', meaning: 'herança, legado sagrado' },
      { word: 'reward', ipa: '/rɪˈwɔːrd/', meaning: 'galardão, presente recompensador' }
    ],
    reflectionEn: 'Children are never an inconvenience; they are God’s sacred reward entrusted to our stewardship.',
    reflectionPt: 'Os filhos nunca são um fardo; são um tesouro sagrado confiado por Deus à nossa mordomia.'
  },

  // --- FÉ & PROMESSAS ---
  {
    id: 'jer-29-11',
    bookId: 'jeremiah',
    bookName: 'Jeremias',
    bookNameEn: 'Jeremiah',
    chapter: 29,
    verse: 11,
    reference: 'Jeremias 29:11',
    referenceEn: 'Jeremiah 29:11',
    themeId: 'faith-promises',
    verseEn: '“For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.”',
    versePt: '“Porque sou eu que conheço os planos que tenho para vocês”, diz o Senhor, “planos de fazê-los prosperar e não de lhes causar dano, planos de dar-lhes esperança e um futuro.”',
    keywords: [
      { word: 'declares', ipa: '/dɪˈkleərz/', meaning: 'afirma com autoridade soberana' },
      { word: 'prosper', ipa: '/ˈprɑː.spɚ/', meaning: 'prosperar, ter paz e bem-estar (Shalom)' },
      { word: 'hope', ipa: '/hoʊp/', meaning: 'esperança viva e inabalável' }
    ],
    reflectionEn: 'God holds the blueprint of our family’s tomorrow with boundless goodwill and faithful grace.',
    reflectionPt: 'Deus segura o mapa do amanhã da nossa família com amor infalível e planos cheios de esperança.'
  },
  {
    id: 'rom-8-28',
    bookId: 'romans',
    bookName: 'Romanos',
    bookNameEn: 'Romans',
    chapter: 8,
    verse: 28,
    reference: 'Romanos 8:28',
    referenceEn: 'Romans 8:28',
    themeId: 'faith-promises',
    verseEn: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    versePt: 'Sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados de acordo com o seu propósito.',
    keywords: [
      { word: 'in all things', ipa: '/ɪn ɔːl θɪŋz/', meaning: 'em absolutamente todas as circunstâncias' },
      { word: 'purpose', ipa: '/ˈpɝː.pəs/', meaning: 'propósito soberano e eterno' }
    ],
    reflectionEn: 'Even setbacks and delays are woven by God into blessings for our spiritual maturity and unity.',
    reflectionPt: 'Até os desafios e imprevistos são orquestrados por Deus para abençoar e amadurecer o casal.'
  },
  {
    id: 'rom-8-38-39',
    bookId: 'romans',
    bookName: 'Romanos',
    bookNameEn: 'Romans',
    chapter: 8,
    verse: '38-39',
    reference: 'Romanos 8:38-39',
    referenceEn: 'Romans 8:38-39',
    themeId: 'faith-promises',
    verseEn: 'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers... will be able to separate us from the love of God that is in Christ Jesus our Lord.',
    versePt: 'Pois estou convencido de que nem morte nem vida, nem anjos nem demônios, nem o presente nem o futuro, nem quaisquer poderes... serão capazes de nos separar do amor de Deus que está em Cristo Jesus, nosso Senhor.',
    keywords: [
      { word: 'convinced', ipa: '/kənˈvɪnst/', meaning: 'plenamente convencido, certo' },
      { word: 'separate', ipa: '/ˈsep.ɚ.eɪt/', meaning: 'separar ou afastar' }
    ],
    reflectionEn: 'No circumstance on earth can ever sever the unbreakable bond of God’s everlasting love for you.',
    reflectionPt: 'Nenhuma circunstância terrena pode quebrar o amor inabalável que Deus tem por vocês.'
  },

  // --- FORÇA & CORAGEM ---
  {
    id: 'joshua-1-9',
    bookId: 'genesis',
    bookName: 'Josué',
    bookNameEn: 'Joshua',
    chapter: 1,
    verse: 9,
    reference: 'Josué 1:9',
    referenceEn: 'Joshua 1:9',
    themeId: 'strength-courage',
    verseEn: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
    versePt: 'Não fui eu que lhe ordenei? Seja forte e corajoso! Não se apavore, nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.',
    keywords: [
      { word: 'courageous', ipa: '/kəˈreɪ.dʒəs/', meaning: 'corajoso, destemido no Senhor' },
      { word: 'discouraged', ipa: '/dɪˈskɝː.ɪdʒd/', meaning: 'desanimado, abatido' }
    ],
    reflectionEn: 'Courage is not the absence of fear, but the assurance that God walks beside us into the unknown.',
    reflectionPt: 'Coragem não é a ausência de medo, mas a certeza de que Deus caminha ao nosso lado no desconhecido.'
  },
  {
    id: 'isaiah-40-31',
    bookId: 'isaiah',
    bookName: 'Isaías',
    bookNameEn: 'Isaiah',
    chapter: 40,
    verse: 31,
    reference: 'Isaías 40:31',
    referenceEn: 'Isaiah 40:31',
    themeId: 'strength-courage',
    verseEn: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
    versePt: 'Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não ficam exaustos, andam e não se cansam.',
    keywords: [
      { word: 'renew', ipa: '/rɪˈnuː/', meaning: 'renovar, recarregar o vigor' },
      { word: 'soar', ipa: '/sɔːr/', meaning: 'planar alto, voar com majestade' },
      { word: 'weary', ipa: '/ˈwɪr.i/', meaning: 'cansado, esgotado' }
    ],
    reflectionEn: 'Waiting on the Lord restores emotional energy and gives our marriage supernatural endurance.',
    reflectionPt: 'Esperar no Senhor restaura a energia emocional e dá ao casal um fôlego sobrenatural.'
  },

  // --- LOUVOR & ADORAÇÃO ---
  {
    id: 'psalm-100-1-5',
    bookId: 'psalms',
    bookName: 'Salmos',
    bookNameEn: 'Psalms',
    chapter: 100,
    verse: '1-5',
    reference: 'Salmo 100:1-5',
    referenceEn: 'Psalm 100:1-5',
    themeId: 'praise-worship',
    verseEn: 'Shout for joy to the Lord, all the earth. Worship the Lord with gladness; come before him with joyful songs... Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.',
    versePt: 'Aclamem o Senhor todos os habitantes da terra! Prestem culto ao Senhor com alegria; entrem na sua presença com cânticos alegres... Entrem por suas portas com ações de graças, e em seus átrios, com louvor; deem-lhe graças e bendigam o seu nome.',
    keywords: [
      { word: 'gladness', ipa: '/ˈɡlæd.nəs/', meaning: 'alegria santa, contentamento' },
      { word: 'gates', ipa: '/ɡeɪts/', meaning: 'portas do templo / entrada da presença' }
    ],
    reflectionEn: 'Praise clears the atmosphere of our home and invites God’s radiant presence into our family.',
    reflectionPt: 'O louvor limpa o ambiente do lar e atrai a presença radiante de Deus para o meio da família.'
  }
];
