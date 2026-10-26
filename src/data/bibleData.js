// Bilingual Holy Bible Data (English NIV / Portuguese NVI)
// Complete 66 Books (Genesis to Revelation) with Chapter Counts & Testament Organization
// Verses mapped with Linked Devotionals for deep spiritual study

export const BIBLE_BOOKS = [
  // ==========================================
  // ANTIGO TESTAMENTO / OLD TESTAMENT (39 Livros)
  // ==========================================
  // Pentateuco (A Lei)
  { id: 'genesis', name: 'Gênesis', nameEn: 'Genesis', abbrev: 'Gn', testament: 'OT', category: 'Pentateuco', chapters: 50 },
  { id: 'exodus', name: 'Êxodo', nameEn: 'Exodus', abbrev: 'Êx', testament: 'OT', category: 'Pentateuco', chapters: 40 },
  { id: 'leviticus', name: 'Levítico', nameEn: 'Leviticus', abbrev: 'Lv', testament: 'OT', category: 'Pentateuco', chapters: 27 },
  { id: 'numbers', name: 'Números', nameEn: 'Numbers', abbrev: 'Nm', testament: 'OT', category: 'Pentateuco', chapters: 36 },
  { id: 'deuteronomy', name: 'Deuteronômio', nameEn: 'Deuteronomy', abbrev: 'Dt', testament: 'OT', category: 'Pentateuco', chapters: 34 },

  // Livros Históricos
  { id: 'joshua', name: 'Josué', nameEn: 'Joshua', abbrev: 'Js', testament: 'OT', category: 'Históricos', chapters: 24 },
  { id: 'judges', name: 'Juízes', nameEn: 'Judges', abbrev: 'Jz', testament: 'OT', category: 'Históricos', chapters: 21 },
  { id: 'ruth', name: 'Rute', nameEn: 'Ruth', abbrev: 'Rt', testament: 'OT', category: 'Históricos', chapters: 4 },
  { id: '1samuel', name: '1 Samuel', nameEn: '1 Samuel', abbrev: '1Sm', testament: 'OT', category: 'Históricos', chapters: 31 },
  { id: '2samuel', name: '2 Samuel', nameEn: '2 Samuel', abbrev: '2Sm', testament: 'OT', category: 'Históricos', chapters: 24 },
  { id: '1kings', name: '1 Reis', nameEn: '1 Kings', abbrev: '1Rs', testament: 'OT', category: 'Históricos', chapters: 22 },
  { id: '2kings', name: '2 Reis', nameEn: '2 Kings', abbrev: '2Rs', testament: 'OT', category: 'Históricos', chapters: 25 },
  { id: '1chronicles', name: '1 Crônicas', nameEn: '1 Chronicles', abbrev: '1Cr', testament: 'OT', category: 'Históricos', chapters: 29 },
  { id: '2chronicles', name: '2 Crônicas', nameEn: '2 Chronicles', abbrev: '2Cr', testament: 'OT', category: 'Históricos', chapters: 36 },
  { id: 'ezra', name: 'Esdras', nameEn: 'Ezra', abbrev: 'Ed', testament: 'OT', category: 'Históricos', chapters: 10 },
  { id: 'nehemiah', name: 'Neemias', nameEn: 'Nehemiah', abbrev: 'Ne', testament: 'OT', category: 'Históricos', chapters: 13 },
  { id: 'esther', name: 'Ester', nameEn: 'Esther', abbrev: 'Et', testament: 'OT', category: 'Históricos', chapters: 10 },

  // Livros Poéticos e Sapienciais
  { id: 'job', name: 'Jó', nameEn: 'Job', abbrev: 'Jó', testament: 'OT', category: 'Poéticos', chapters: 42 },
  { id: 'psalms', name: 'Salmos', nameEn: 'Psalms', abbrev: 'Sl', testament: 'OT', category: 'Poéticos', chapters: 150 },
  { id: 'proverbs', name: 'Provérbios', nameEn: 'Proverbs', abbrev: 'Pv', testament: 'OT', category: 'Poéticos', chapters: 31 },
  { id: 'ecclesiastes', name: 'Eclesiastes', nameEn: 'Ecclesiastes', abbrev: 'Ec', testament: 'OT', category: 'Poéticos', chapters: 12 },
  { id: 'songofsongs', name: 'Cânticos', nameEn: 'Song of Songs', abbrev: 'Ct', testament: 'OT', category: 'Poéticos', chapters: 8 },

  // Profetas Maiores
  { id: 'isaiah', name: 'Isaías', nameEn: 'Isaiah', abbrev: 'Is', testament: 'OT', category: 'Profetas Maiores', chapters: 66 },
  { id: 'jeremiah', name: 'Jeremias', nameEn: 'Jeremiah', abbrev: 'Jr', testament: 'OT', category: 'Profetas Maiores', chapters: 52 },
  { id: 'lamentations', name: 'Lamentações', nameEn: 'Lamentations', abbrev: 'Lm', testament: 'OT', category: 'Profetas Maiores', chapters: 5 },
  { id: 'ezekiel', name: 'Ezequiel', nameEn: 'Ezekiel', abbrev: 'Ez', testament: 'OT', category: 'Profetas Maiores', chapters: 48 },
  { id: 'daniel', name: 'Daniel', nameEn: 'Daniel', abbrev: 'Dn', testament: 'OT', category: 'Profetas Maiores', chapters: 12 },

  // Profetas Menores
  { id: 'hosea', name: 'Oseias', nameEn: 'Hosea', abbrev: 'Os', testament: 'OT', category: 'Profetas Menores', chapters: 14 },
  { id: 'joel', name: 'Joel', nameEn: 'Joel', abbrev: 'Jl', testament: 'OT', category: 'Profetas Menores', chapters: 3 },
  { id: 'amos', name: 'Amós', nameEn: 'Amos', abbrev: 'Am', testament: 'OT', category: 'Profetas Menores', chapters: 9 },
  { id: 'obadiah', name: 'Obadias', nameEn: 'Obadiah', abbrev: 'Ob', testament: 'OT', category: 'Profetas Menores', chapters: 1 },
  { id: 'jonah', name: 'Jonas', nameEn: 'Jonah', abbrev: 'Jn', testament: 'OT', category: 'Profetas Menores', chapters: 4 },
  { id: 'micah', name: 'Miqueias', nameEn: 'Micah', abbrev: 'Mq', testament: 'OT', category: 'Profetas Menores', chapters: 7 },
  { id: 'nahum', name: 'Naum', nameEn: 'Nahum', abbrev: 'Na', testament: 'OT', category: 'Profetas Menores', chapters: 3 },
  { id: 'habakkuk', name: 'Habacuque', nameEn: 'Habakkuk', abbrev: 'Hc', testament: 'OT', category: 'Profetas Menores', chapters: 3 },
  { id: 'zephaniah', name: 'Sofonias', nameEn: 'Zephaniah', abbrev: 'Sf', testament: 'OT', category: 'Profetas Menores', chapters: 3 },
  { id: 'haggai', name: 'Ageu', nameEn: 'Haggai', abbrev: 'Ag', testament: 'OT', category: 'Profetas Menores', chapters: 2 },
  { id: 'zechariah', name: 'Zacarias', nameEn: 'Zechariah', abbrev: 'Zc', testament: 'OT', category: 'Profetas Menores', chapters: 14 },
  { id: 'malachi', name: 'Malaquias', nameEn: 'Malachi', abbrev: 'Ml', testament: 'OT', category: 'Profetas Menores', chapters: 4 },

  // ==========================================
  // NOVO TESTAMENTO / NEW TESTAMENT (27 Livros)
  // ==========================================
  // Evangelhos
  { id: 'matthew', name: 'Mateus', nameEn: 'Matthew', abbrev: 'Mt', testament: 'NT', category: 'Evangelhos', chapters: 28 },
  { id: 'mark', name: 'Marcos', nameEn: 'Mark', abbrev: 'Mc', testament: 'NT', category: 'Evangelhos', chapters: 16 },
  { id: 'luke', name: 'Lucas', nameEn: 'Luke', abbrev: 'Lc', testament: 'NT', category: 'Evangelhos', chapters: 24 },
  { id: 'john', name: 'João', nameEn: 'John', abbrev: 'Jo', testament: 'NT', category: 'Evangelhos', chapters: 21 },

  // História da Igreja Primitiva
  { id: 'acts', name: 'Atos dos Apóstolos', nameEn: 'Acts', abbrev: 'At', testament: 'NT', category: 'Histórico', chapters: 28 },

  // Epístolas Paulinas
  { id: 'romans', name: 'Romanos', nameEn: 'Romans', abbrev: 'Rm', testament: 'NT', category: 'Cartas Paulinas', chapters: 16 },
  { id: '1corinthians', name: '1 Coríntios', nameEn: '1 Corinthians', abbrev: '1Co', testament: 'NT', category: 'Cartas Paulinas', chapters: 16 },
  { id: '2corinthians', name: '2 Coríntios', nameEn: '2 Corinthians', abbrev: '2Co', testament: 'NT', category: 'Cartas Paulinas', chapters: 13 },
  { id: 'galatians', name: 'Gálatas', nameEn: 'Galatians', abbrev: 'Gl', testament: 'NT', category: 'Cartas Paulinas', chapters: 6 },
  { id: 'ephesians', name: 'Efésios', nameEn: 'Ephesians', abbrev: 'Ef', testament: 'NT', category: 'Cartas Paulinas', chapters: 6 },
  { id: 'philippians', name: 'Filipenses', nameEn: 'Philippians', abbrev: 'Fp', testament: 'NT', category: 'Cartas Paulinas', chapters: 4 },
  { id: 'colossians', name: 'Colossenses', nameEn: 'Colossians', abbrev: 'Cl', testament: 'NT', category: 'Cartas Paulinas', chapters: 4 },
  { id: '1thessalonians', name: '1 Tessalonicenses', nameEn: '1 Thessalonians', abbrev: '1Ts', testament: 'NT', category: 'Cartas Paulinas', chapters: 5 },
  { id: '2thessalonians', name: '2 Tessalonicenses', nameEn: '2 Thessalonians', abbrev: '2Ts', testament: 'NT', category: 'Cartas Paulinas', chapters: 3 },
  { id: '1timothy', name: '1 Timóteo', nameEn: '1 Timothy', abbrev: '1Tm', testament: 'NT', category: 'Cartas Pastorais', chapters: 6 },
  { id: '2timothy', name: '2 Timóteo', nameEn: '2 Timothy', abbrev: '2Tm', testament: 'NT', category: 'Cartas Pastorais', chapters: 4 },
  { id: 'titus', name: 'Tito', nameEn: 'Titus', abbrev: 'Tt', testament: 'NT', category: 'Cartas Pastorais', chapters: 3 },
  { id: 'philemon', name: 'Filemom', nameEn: 'Philemon', abbrev: 'Fm', testament: 'NT', category: 'Cartas Paulinas', chapters: 1 },

  // Epístolas Gerais
  { id: 'hebrews', name: 'Hebreus', nameEn: 'Hebrews', abbrev: 'Hb', testament: 'NT', category: 'Cartas Gerais', chapters: 13 },
  { id: 'james', name: 'Tiago', nameEn: 'James', abbrev: 'Tg', testament: 'NT', category: 'Cartas Gerais', chapters: 5 },
  { id: '1peter', name: '1 Pedro', nameEn: '1 Peter', abbrev: '1Pe', testament: 'NT', category: 'Cartas Gerais', chapters: 5 },
  { id: '2peter', name: '2 Pedro', nameEn: '2 Peter', abbrev: '2Pe', testament: 'NT', category: 'Cartas Gerais', chapters: 3 },
  { id: '1john', name: '1 João', nameEn: '1 John', abbrev: '1Jo', testament: 'NT', category: 'Cartas Gerais', chapters: 5 },
  { id: '2john', name: '2 João', nameEn: '2 John', abbrev: '2Jo', testament: 'NT', category: 'Cartas Gerais', chapters: 1 },
  { id: '3john', name: '3 João', nameEn: '3 John', abbrev: '3Jo', testament: 'NT', category: 'Cartas Gerais', chapters: 1 },
  { id: 'jude', name: 'Judas', nameEn: 'Jude', abbrev: 'Jd', testament: 'NT', category: 'Cartas Gerais', chapters: 1 },

  // Revelação / Profecia
  { id: 'revelation', name: 'Apocalipse', nameEn: 'Revelation', abbrev: 'Ap', testament: 'NT', category: 'Profecia', chapters: 22 }
];

// Temas espirituais para estudo em Devocionais (conforme pedido do usuário)
export const DEVOTIONAL_THEMES = [
  { id: 'all', label: 'Todos os Temas', icon: '✨' },
  { id: 'love-marriage', label: 'Amor & Casamento', icon: '❤️' },
  { id: 'peace-trust', label: 'Paz & Confiança', icon: '🕊️' },
  { id: 'family-children', label: 'Família & Filhos', icon: '👨‍👩‍👧‍👦' },
  { id: 'wisdom-guidance', label: 'Sabedoria & Direção', icon: '💡' },
  { id: 'faith-promises', label: 'Fé & Promessas', icon: '🛡️' },
  { id: 'praise-worship', label: 'Louvor & Adoração', icon: '🎵' },
  { id: 'strength-courage', label: 'Força & Coragem', icon: '⚡' }
];

// Acervo rico de passagens bíblicas bilíngues mapeadas com conexões aos Devocionais
export const BIBLE_VERSES = [
  // --- GÊNESIS ---
  {
    id: 'gen-1-1',
    bookId: 'genesis',
    bookName: 'Gênesis',
    bookNameEn: 'Genesis',
    chapter: 1,
    verse: 1,
    reference: 'Gênesis 1:1',
    referenceEn: 'Genesis 1:1',
    verseEn: 'In the beginning God created the heavens and the earth.',
    versePt: 'No princípio Deus criou os céus e a terra.',
    keywords: [
      { word: 'beginning', ipa: '/bɪˈɡɪn.ɪŋ/', meaning: 'princípio, início primordial' },
      { word: 'created', ipa: '/kriˈeɪ.tɪd/', meaning: 'criou a partir do nada (Bará)' }
    ],
    reflectionEn: 'Every great chapter in your marriage and family begins by putting God at the very center.',
    reflectionPt: 'Cada grande capítulo do seu casamento e família começa colocando Deus no centro de tudo.'
  },
  {
    id: 'gen-2-18',
    bookId: 'genesis',
    bookName: 'Gênesis',
    bookNameEn: 'Genesis',
    chapter: 2,
    verse: 18,
    reference: 'Gênesis 2:18',
    referenceEn: 'Genesis 2:18',
    verseEn: 'The Lord God said, “It is not good for the man to be alone. I will make a helper suitable for him.”',
    versePt: 'Disse o Senhor Deus: “Não é bom que o homem esteja só; farei para ele uma auxiliadora que lhe seja idônea.”',
    keywords: [
      { word: 'helper suitable', ipa: '/ˈhelp.ɚ ˈsuː.t̬ə.bəl/', meaning: 'auxiliadora idônea, parceira de igual dignidade (Ezer Kenegdo)' }
    ],
    reflectionEn: 'A spouse is God’s divine companion, designed to complement, uplift, and share life in holy unity.',
    reflectionPt: 'O cônjuge é a companhia divina criada por Deus para complementar, apoiar e caminhar junto em santa aliança.'
  },
  {
    id: 'gen-2-24',
    bookId: 'genesis',
    bookName: 'Gênesis',
    bookNameEn: 'Genesis',
    chapter: 2,
    verse: 24,
    reference: 'Gênesis 2:24',
    referenceEn: 'Genesis 2:24',
    linkedDevotional: {
      id: 'gen-2-24-sofa-time',
      day: 6,
      title: 'The Sacred Bond: Prioritizing the Couple Over Child-Centeredness',
      titlePt: 'A Aliança Sagrada: Prioridade do Casal e o Tempo de Sofá'
    },
    verseEn: 'That is why a man leaves his father and mother and is united to his wife, and they become one flesh.',
    versePt: 'Por essa razão, o homem deixará pai e mãe e se unirá à sua mulher, e eles se tornarão uma só carne.',
    keywords: [
      { word: 'leaves', ipa: '/liːvz/', meaning: 'deixa, desliga-se como prioridade primária' },
      { word: 'united', ipa: '/juːˈnaɪ.tɪd/', meaning: 'unido, apegado em aliança perpétua' },
      { word: 'one flesh', ipa: '/wʌn fleʃ/', meaning: 'uma só carne (unidade indivisível)' }
    ],
    reflectionEn: 'Marriage is God’s sacred covenant where husband and wife form the emotional foundation of the home.',
    reflectionPt: 'O casamento é a aliança de Deus onde marido e esposa formam o alicerce mais seguro do lar.'
  },

  // --- DEUTERONÔMIO ---
  {
    id: 'deut-6-6-7',
    bookId: 'deuteronomy',
    bookName: 'Deuteronômio',
    bookNameEn: 'Deuteronomy',
    chapter: 6,
    verse: '6-7',
    reference: 'Deuteronômio 6:6-7',
    referenceEn: 'Deuteronomy 6:6-7',
    linkedDevotional: {
      id: 'prov-4-23-heart',
      day: 2,
      title: 'Guarding the Heart: Moral Reasons Over Mere Rules',
      titlePt: 'Alcançando o Coração: Razões Morais Acima de Regras Secas'
    },
    verseEn: 'These commandments that I give you today are to be on your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you lie down and when you get up.',
    versePt: 'Estas palavras que hoje lhe ordeno devem estar no seu coração. Ensine-as com persistência aos seus filhos. Converse sobre elas quando estiver em casa e quando andar pelo caminho, ao deitar-se e ao levantar-se.',
    keywords: [
      { word: 'impress', ipa: '/ɪmˈpres/', meaning: 'gravar com amor e constância, inculcar' },
      { word: 'talk about them', ipa: '/tɔːk əˈbaʊt ðem/', meaning: 'conversar naturalmente no dia a dia' }
    ],
    reflectionEn: 'Faith is transmitted not through strict sterile rules, but through daily organic conversations of love.',
    reflectionPt: 'A fé não se transmite por ordens secas, mas por conversas naturais e cheias de vida no lar.'
  },

  // --- JOSUÉ ---
  {
    id: 'joshua-1-9',
    bookId: 'joshua',
    bookName: 'Josué',
    bookNameEn: 'Joshua',
    chapter: 1,
    verse: 9,
    reference: 'Josué 1:9',
    referenceEn: 'Joshua 1:9',
    verseEn: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
    versePt: 'Não fui eu que lhe ordenei? Seja forte e corajoso! Não se apavore, nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.',
    keywords: [
      { word: 'courageous', ipa: '/kəˈreɪ.dʒəs/', meaning: 'corajoso, intrépido' },
      { word: 'discouraged', ipa: '/dɪˈskɝː.ɪdʒd/', meaning: 'desanimado, abatido' }
    ],
    reflectionEn: 'You do not face the challenges of life, work, and family alone; the Almighty leads your way.',
    reflectionPt: 'Vocês não enfrentam os desafios da vida, do trabalho e do lar sozinhos; o Todo-Poderoso vai adiante.'
  },

  // --- SALMOS ---
  {
    id: 'psalm-23-1-3',
    bookId: 'psalms',
    bookName: 'Salmos',
    bookNameEn: 'Psalms',
    chapter: 23,
    verse: '1-3',
    reference: 'Salmo 23:1-3',
    referenceEn: 'Psalm 23:1-3',
    verseEn: 'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.',
    versePt: 'O Senhor é o meu pastor; de nada terei falta. Em verdes pastagens me faz repousar e me conduz a águas tranquilas; restaura-me o vigor.',
    keywords: [
      { word: 'shepherd', ipa: '/ˈʃep.ɚd/', meaning: 'pastor que cuida e protege' },
      { word: 'quiet waters', ipa: '/ˈkwaɪ.ət ˈwɑː.t̬ɚz/', meaning: 'águas mansas e de paz' },
      { word: 'refreshes', ipa: '/rɪˈfreʃ.ɪz/', meaning: 'restaura, refrigera o vigor' }
    ],
    reflectionEn: 'When Jesus guides your family steps, true rest and divine peace replace all anxiety.',
    reflectionPt: 'Quando Jesus guia os passos da família, o verdadeiro descanso e a paz divina tomam o lugar do estresse.'
  },
  {
    id: 'psalm-91-1-2',
    bookId: 'psalms',
    bookName: 'Salmos',
    bookNameEn: 'Psalms',
    chapter: 91,
    verse: '1-2',
    reference: 'Salmo 91:1-2',
    referenceEn: 'Psalm 91:1-2',
    verseEn: 'Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, “He is my refuge and my fortress, my God, in whom I trust.”',
    versePt: 'Aquele que habita no abrigo do Altíssimo e descansa à sombra do Todo-Poderoso pode dizer ao Senhor: “Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio”.',
    keywords: [
      { word: 'shelter', ipa: '/ˈʃel.t̬ɚ/', meaning: 'abrigo, esconderijo seguro' },
      { word: 'fortress', ipa: '/ˈfɔːr.trəs/', meaning: 'fortaleza impenetrável' }
    ],
    reflectionEn: 'God’s presence is the ultimate spiritual canopy covering your household against all adversary.',
    reflectionPt: 'A presença de Deus é o escudo protetor soberano que guarda o seu casamento e seus filhos.'
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
    verseEn: 'Your word is a lamp for my feet, a light on my path.',
    versePt: 'Lâmpada para os meus pés é a tua palavra e, luz para o meu caminho.',
    keywords: [
      { word: 'lamp', ipa: '/læmp/', meaning: 'lâmpada, tocha que ilumina o próximo passo' },
      { word: 'path', ipa: '/pæθ/', meaning: 'caminho, trilha da vida' }
    ],
    reflectionEn: 'Scripture provides practical daily clarity for financial, marital, and parenting wisdom.',
    reflectionPt: 'As Escrituras fornecem clareza e discernimento para decisões financeiras, conjugais e familiares.'
  },
  {
    id: 'psalm-127-1-3',
    bookId: 'psalms',
    bookName: 'Salmos',
    bookNameEn: 'Psalms',
    chapter: 127,
    verse: '1-3',
    reference: 'Salmo 127:1-3',
    referenceEn: 'Psalm 127:1-3',
    verseEn: 'Unless the Lord builds the house, the builders labor in vain... Children are a heritage from the Lord, offspring a reward from him.',
    versePt: 'Se o Senhor não edificar a casa, em vão trabalham os que a constroem... Os filhos são herança do Senhor, uma recompensa que ele dá.',
    keywords: [
      { word: 'heritage', ipa: '/ˈher.ɪ.t̬ɪdʒ/', meaning: 'herança, bênção generacional' },
      { word: 'reward', ipa: '/rɪˈwɔːrd/', meaning: 'galardão, presente recompensador' }
    ],
    reflectionEn: 'Children are not an interruption or burden; they are God’s sacred reward and future arrows.',
    reflectionPt: 'Filhos não são um fardo ou interrupção; são uma recompensa preciosa e flechas nas mãos dos pais.'
  },

  // --- PROVÉRBIOS ---
  {
    id: 'prov-3-5-6',
    bookId: 'proverbs',
    bookName: 'Provérbios',
    bookNameEn: 'Proverbs',
    chapter: 3,
    verse: '5-6',
    reference: 'Provérbios 3:5-6',
    referenceEn: 'Proverbs 3:5-6',
    verseEn: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    versePt: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.',
    keywords: [
      { word: 'lean not', ipa: '/liːn nɑːt/', meaning: 'não se apoie no raciocínio limitado' },
      { word: 'paths straight', ipa: '/pæðz streɪt/', meaning: 'caminhos retos, alinhados à bênção' }
    ],
    reflectionEn: 'When husband and wife agree to pray before deciding, God aligns their steps in prosperity.',
    reflectionPt: 'Quando marido e mulher decidem orar antes de agir, Deus aplaina o caminho com sabedoria.'
  },
  {
    id: 'prov-4-23',
    bookId: 'proverbs',
    bookName: 'Provérbios',
    bookNameEn: 'Proverbs',
    chapter: 4,
    verse: 23,
    reference: 'Provérbios 4:23',
    referenceEn: 'Proverbs 4:23',
    linkedDevotional: {
      id: 'prov-4-23-heart',
      day: 2,
      title: 'Guarding the Heart: Moral Reasons Over Mere Rules',
      titlePt: 'Alcançando o Coração: Razões Morais Acima de Regras Secas'
    },
    verseEn: 'Above all else, guard your heart, for everything you do flows from it.',
    versePt: 'Acima de tudo, guarde o seu coração, pois dele procedem as fontes da vida.',
    keywords: [
      { word: 'guard', ipa: '/ɡɑːrd/', meaning: 'guardar com vigilância atenta' },
      { word: 'flows', ipa: '/floʊz/', meaning: 'flui, emana naturalmente' }
    ],
    reflectionEn: 'Parenting and marriage both succeed by guarding the internal heart, not just policing external acts.',
    reflectionPt: 'A criação dos filhos e a vida a dois triunfam quando cuidamos do coração, e não apenas de atos externos.'
  },
  {
    id: 'prov-18-21',
    bookId: 'proverbs',
    bookName: 'Provérbios',
    bookNameEn: 'Proverbs',
    chapter: 18,
    verse: 21,
    reference: 'Provérbios 18:21',
    referenceEn: 'Proverbs 18:21',
    linkedDevotional: {
      id: 'prov-18-21-words',
      day: 5,
      title: 'The Power of the Tongue: Words that Heal and Encourage',
      titlePt: 'O Poder da Língua: Palavras que Curam e Edificam o Cônjuge'
    },
    verseEn: 'The tongue has the power of life and death, and those who love it will eat its fruit.',
    versePt: 'A língua tem poder sobre a vida e sobre a morte; os que a usam com zelo comerão do seu fruto.',
    keywords: [
      { word: 'tongue', ipa: '/tʌŋ/', meaning: 'língua, palavras faladas' },
      { word: 'power of life', ipa: '/ˈpaʊ.ɚ əv laɪf/', meaning: 'poder vital de abençoar e curar' }
    ],
    reflectionEn: 'Every sentence spoken between husband and wife either breathes life or plants seeds of doubt.',
    reflectionPt: 'Cada frase dita entre o casal tem o poder de soprar vida e encorajamento ou de semear desânimo.'
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
    verseEn: 'Start children off on the way they should go, and even when they are old they will not turn from it.',
    versePt: 'Instrui a criança no caminho em que deve andar, e, até quando envelhecer, não se desviará dele.',
    keywords: [
      { word: 'start off', ipa: '/stɑːrt ɑːf/', meaning: 'iniciar, educar desde o alicerce' },
      { word: 'turn from it', ipa: '/tɝːn frəm ɪt/', meaning: 'desviar-se do caminho de retidão' }
    ],
    reflectionEn: 'Roots of divine integrity planted in childhood become the unshakable backbone of adulthood.',
    reflectionPt: 'Princípios bíblicos plantados com carinho na infância formam a espinha dorsal de um adulto sábio.'
  },

  // --- ECLESIASTES ---
  {
    id: 'eccl-4-9-12',
    bookId: 'ecclesiastes',
    bookName: 'Eclesiastes',
    bookNameEn: 'Ecclesiastes',
    chapter: 4,
    verse: '9-12',
    reference: 'Eclesiastes 4:9-12',
    referenceEn: 'Ecclesiastes 4:9-12',
    linkedDevotional: {
      id: 'eccl-4-9-12-unity',
      day: 7,
      title: 'A Cord of Three Strands: Unbreakable Teamwork in Marriage',
      titlePt: 'O Cordão de Três Dobras: Parceria Invencível no Casamento'
    },
    verseEn: 'Two are better than one, because they have a good return for their labor... A cord of three strands is not quickly broken.',
    versePt: 'É melhor ter companhia do que estar sozinho, porque maior é a recompensa do trabalho... Um cordão de três dobras não se rompe com facilidade.',
    keywords: [
      { word: 'cord of three strands', ipa: '/kɔːrd əv θriː strændz/', meaning: 'cordão de três dobras (Marido + Esposa + Cristo)' },
      { word: 'labor', ipa: '/ˈleɪ.bɚ/', meaning: 'trabalho, esforço conjunto' }
    ],
    reflectionEn: 'When husband and wife invite Christ to be the third strand of their marriage, no storm can break them.',
    reflectionPt: 'Quando marido e mulher entrelaçam a vida com Cristo, formam uma aliança inquebrável.'
  },

  // --- ISAÍAS ---
  {
    id: 'isaiah-40-31',
    bookId: 'isaiah',
    bookName: 'Isaías',
    bookNameEn: 'Isaiah',
    chapter: 40,
    verse: 31,
    reference: 'Isaías 40:31',
    referenceEn: 'Isaiah 40:31',
    verseEn: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
    versePt: 'Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não ficam exaustos, andam e não se cansam.',
    keywords: [
      { word: 'renew', ipa: '/rɪˈnuː/', meaning: 'renovar, recarregar o ânimo' },
      { word: 'soar', ipa: '/sɔːr/', meaning: 'voar alto com majestade' }
    ],
    reflectionEn: 'Waiting on God is not inactivity; it is plugging into the boundless power of heaven.',
    reflectionPt: 'Esperar no Senhor não é passividade; é conectar-se à fonte inesgotável da força do Alto.'
  },

  // --- JEREMIAS ---
  {
    id: 'jer-29-11',
    bookId: 'jeremiah',
    bookName: 'Jeremias',
    bookNameEn: 'Jeremiah',
    chapter: 29,
    verse: 11,
    reference: 'Jeremias 29:11',
    referenceEn: 'Jeremiah 29:11',
    verseEn: '“For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.”',
    versePt: '“Porque sou eu que conheço os planos que tenho para vocês”, diz o Senhor, “planos de fazê-los prosperar e não de lhes causar dano, planos de dar-lhes esperança e um futuro.”',
    keywords: [
      { word: 'prosper', ipa: '/ˈprɑː.spɚ/', meaning: 'prosperar com integridade e paz' },
      { word: 'future', ipa: '/ˈfjuː.tʃɚ/', meaning: 'futuro seguro e abençoado' }
    ],
    reflectionEn: 'The destiny of your family is secured in the loving and sovereign hands of the Lord.',
    reflectionPt: 'O futuro da sua família está desenhado e protegido pelas mãos fiéis do Senhor.'
  },

  // --- MATEUS ---
  {
    id: 'matt-6-33',
    bookId: 'matthew',
    bookName: 'Mateus',
    bookNameEn: 'Matthew',
    chapter: 6,
    verse: 33,
    reference: 'Mateus 6:33',
    referenceEn: 'Matthew 6:33',
    verseEn: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.',
    versePt: 'Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça, e todas essas coisas lhes serão acrescentadas.',
    keywords: [
      { word: 'seek first', ipa: '/siːk fɝːst/', meaning: 'buscar em primeiro lugar absoluto' },
      { word: 'righteousness', ipa: '/ˈraɪ.tʃəs.nəs/', meaning: 'justiça, integridade moral divina' }
    ],
    reflectionEn: 'Align your daily priorities with God’s Kingdom, and His provision will overflow in your home.',
    reflectionPt: 'Coloque o Reino de Deus como prioridade número um e a provisão necessária sempre chegará.'
  },

  // --- JOÃO ---
  {
    id: 'john-14-27',
    bookId: 'john',
    bookName: 'João',
    bookNameEn: 'John',
    chapter: 14,
    verse: 27,
    reference: 'João 14:27',
    referenceEn: 'John 14:27',
    verseEn: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.',
    versePt: 'Deixo-lhes a paz; a minha paz lhes dou. Não lha dou como o mundo a dá. Não se perturbe o seu coração, nem tenham medo.',
    keywords: [
      { word: 'troubled', ipa: '/ˈtrʌb.əld/', meaning: 'perturbado, inquieto' },
      { word: 'afraid', ipa: '/əˈfreɪd/', meaning: 'amedrontado, com receio' }
    ],
    reflectionEn: 'Jesus offers a transcendent peace that remains steady even in tumultuous times.',
    reflectionPt: 'A paz de Jesus não depende das circunstâncias; ela ancora o lar mesmo em tempos turbulentos.'
  },

  // --- ROMANOS ---
  {
    id: 'rom-8-28',
    bookId: 'romans',
    bookName: 'Romanos',
    bookNameEn: 'Romans',
    chapter: 8,
    verse: 28,
    reference: 'Romanos 8:28',
    referenceEn: 'Romans 8:28',
    verseEn: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    versePt: 'Sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados de acordo com o seu propósito.',
    keywords: [
      { word: 'in all things', ipa: '/ɪn ɔːl θɪŋz/', meaning: 'em todas as situações, boas e desafiadoras' },
      { word: 'purpose', ipa: '/ˈpɝː.pəs/', meaning: 'propósito soberano e eterno' }
    ],
    reflectionEn: 'God weaves every twist and turn of your family story into a tapestry of eternal blessing.',
    reflectionPt: 'Deus orquestra cada detalhe da história da sua família para produzir maturidade e bênção.'
  },

  // --- 1 CORÍNTIOS ---
  {
    id: '1cor-13-4-7',
    bookId: '1corinthians',
    bookName: '1 Coríntios',
    bookNameEn: '1 Corinthians',
    chapter: 13,
    verse: '4-7',
    reference: '1 Coríntios 13:4-7',
    referenceEn: '1 Corinthians 13:4-7',
    linkedDevotional: {
      id: '1cor-13-4-7',
      day: 3,
      title: 'Love Is Patient and Kind: Sacrificial Covenant Love',
      titlePt: 'O Amor é Paciente e Bondoso: Amor Sacrificial em Aliança'
    },
    verseEn: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.',
    versePt: 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor. O amor não se alegra com a injustiça, mas se alegra com a verdade. Tudo sofre, tudo crê, tudo espera, tudo suporta.',
    keywords: [
      { word: 'patient', ipa: '/ˈpeɪ.ʃənt/', meaning: 'paciente, longânimo diante de falhas' },
      { word: 'kind', ipa: '/kaɪnd/', meaning: 'bondoso, afável, gerador de bem' },
      { word: 'perseveres', ipa: '/ˌpɝː.səˈvɪrz/', meaning: 'persevera com fidelidade inabalável' }
    ],
    reflectionEn: 'True love is not just a passing feeling; it is a sacrificial daily commitment modeled after Christ.',
    reflectionPt: 'O amor bíblico não é apenas um sentimento passageiro; é uma decisão diária de honrar e abençoar.'
  },

  // --- EFÉSIOS ---
  {
    id: 'eph-4-29-32',
    bookId: 'ephesians',
    bookName: 'Efésios',
    bookNameEn: 'Ephesians',
    chapter: 4,
    verse: '29, 31-32',
    reference: 'Efésios 4:29, 31-32',
    referenceEn: 'Ephesians 4:29, 31-32',
    linkedDevotional: {
      id: 'eph-4-29-rebellion',
      day: 4,
      title: 'Rebellion and Restoration: Leading Children Back with Grace and Truth',
      titlePt: 'Filho Rebelde e Restauração: Liderando Filhos de Volta com Graça e Verdade'
    },
    verseEn: 'Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up according to their needs, that it may benefit those who listen... Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.',
    versePt: 'Nenhuma palavra torpe saia da boca de vocês, mas apenas a que for útil para edificar os outros, conforme a necessidade, para que conceda graça aos que a ouvem... Sejam bondosos e compassivos uns para com os outros, perdoando-se mutuamente, assim como Deus os perdoou em Cristo.',
    keywords: [
      { word: 'unwholesome talk', ipa: '/ʌnˈhoʊl.səm tɔːk/', meaning: 'palavra destrutiva, grosseira ou agressiva' },
      { word: 'building up', ipa: '/ˈbɪl.dɪŋ ʌp/', meaning: 'edificar, fortalecer o espírito' },
      { word: 'compassionate', ipa: '/kəmˈpæʃ.ən.ət/', meaning: 'compassivo, sensível à dor do outro' }
    ],
    reflectionEn: 'When restoring a struggling spouse or a rebellious child, speak with grace that heals rather than anger that wounds.',
    reflectionPt: 'Ao lidar com um cônjuge cansado ou um filho rebelde, fale com a graça que cura e atrai de volta ao coração.'
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
    verseEn: 'Husbands, love your wives, just as Christ loved the church and gave himself up for her.',
    versePt: 'Maridos, ame cada um a sua mulher, assim como Cristo amou a igreja e entregou-se por ela.',
    keywords: [
      { word: 'gave himself up', ipa: '/ɡeɪv hɪmˈself ʌp/', meaning: 'entregou-se sacrificialmente' }
    ],
    reflectionEn: 'A husband’s greatest strength is revealed when he serves and cherishes his wife sacrificially.',
    reflectionPt: 'A força do marido cristão se manifesta no cuidado carinhoso, na proteção e na dedicação à sua esposa.'
  },

  // --- FILIPENSES ---
  {
    id: 'phil-4-6-7',
    bookId: 'philippians',
    bookName: 'Filipenses',
    bookNameEn: 'Philippians',
    chapter: 4,
    verse: '6-7',
    reference: 'Filipenses 4:6-7',
    referenceEn: 'Philippians 4:6-7',
    linkedDevotional: {
      id: 'phil-4-6-7',
      day: 1,
      title: 'Peace That Transcends All Understanding',
      titlePt: 'A Paz que Excede Todo Entendimento'
    },
    verseEn: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
    versePt: 'Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus.',
    keywords: [
      { word: 'anxious', ipa: '/ˈæŋk.ʃəs/', meaning: 'ansioso, preocupado com o amanhã' },
      { word: 'petition', ipa: '/pəˈtɪʃ.ən/', meaning: 'súplica fervorosa, pedido' },
      { word: 'thanksgiving', ipa: '/ˌθæŋksˈɡɪv.ɪŋ/', meaning: 'ações de graças, coração grato' },
      { word: 'transcends', ipa: '/trænˈsendz/', meaning: 'vai além de qualquer lógica humana' },
      { word: 'guard', ipa: '/ɡɑːrd/', meaning: 'guardar e proteger como sentinela' }
    ],
    reflectionEn: 'Trade daily family worries for grateful prayer, and God’s active peace will guard your home.',
    reflectionPt: 'Troque as preocupações diárias por orações de gratidão, e a paz de Deus guardará seu casamento e filhos.'
  },

  // --- COLOSSENSES ---
  {
    id: 'col-3-12-14',
    bookId: 'colossians',
    bookName: 'Colossenses',
    bookNameEn: 'Colossians',
    chapter: 3,
    verse: '12-14',
    reference: 'Colossenses 3:12-14',
    referenceEn: 'Colossians 3:12-14',
    linkedDevotional: {
      id: 'col-3-12-14-tantrums',
      day: 8,
      title: 'Gentle Responses in Family Storms: Diffusing Tantrums with Self-Control',
      titlePt: 'Mansidão nas Tempestades Familiares: Acalmando Birras com Autocontrole'
    },
    verseEn: 'Clothe yourselves with compassion, kindness, humility, gentleness and patience. Bear with each other and forgive one another... And over all these virtues put on love, which binds them all together in perfect unity.',
    versePt: 'Revistam-se de profunda compaixão, bondade, humildade, mansidão e paciência. Suportem-se uns aos outros e perdoem as queixas... Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.',
    keywords: [
      { word: 'clothe yourselves', ipa: '/kloʊð jɚˈselvz/', meaning: 'revistam-se diariamente como vestimenta' },
      { word: 'gentleness', ipa: '/ˈdʒen.təl.nəs/', meaning: 'mansidão, controle sob o Espírito' },
      { word: 'perfect unity', ipa: '/ˈpɝː.fekt ˈjuː.nə.t̬i/', meaning: 'elo perfeito da unidade' }
    ],
    reflectionEn: 'Gentleness diffuses family storms and models Christ’s patient love for your growing children.',
    reflectionPt: 'A mansidão desarma discussões acaloradas e ensina aos filhos o poder do domínio próprio.'
  },

  // --- APOCALIPSE ---
  {
    id: 'rev-21-4',
    bookId: 'revelation',
    bookName: 'Apocalipse',
    bookNameEn: 'Revelation',
    chapter: 21,
    verse: 4,
    reference: 'Apocalipse 21:4',
    referenceEn: 'Revelation 21:4',
    verseEn: '“He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.”',
    versePt: '“Ele enxugará dos seus olhos toda lágrima. Não haverá mais morte, nem tristeza, nem choro, nem dor, pois a antiga ordem já passou.”',
    keywords: [
      { word: 'wipe every tear', ipa: '/waɪp ˈev.ri tɪr/', meaning: 'enxugará toda e qualquer lágrima' },
      { word: 'passed away', ipa: '/pæst əˈweɪ/', meaning: 'passou, foi superado pela glória eterna' }
    ],
    reflectionEn: 'Our family journey on earth points toward the eternal joy and restoration of God’s Kingdom.',
    reflectionPt: 'Nossa caminhada familiar na terra aponta para a glória e restauração eterna na presença do Pai.'
  }
];
