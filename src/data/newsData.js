// Base de Notícias Bilíngues Reais e Artigos de Alto Nível para Aprendizado de Inglês
// Categorias: Tecnologia, Cibersegurança, Política, Economia, Bolsa de Valores, Desenvolvimento Pessoal

export const NEWS_CATEGORIES = [
  { id: 'all', label: 'Todas as Notícias', icon: '🌐', color: '#6366f1' },
  { id: 'economy', label: 'Economia (Brasil & Exterior)', icon: '📈', color: '#10b981' },
  { id: 'politics', label: 'Política (Brasil & Exterior)', icon: '🏛️', color: '#6366f1' },
  { id: 'technology', label: 'TI & Tecnologia Global', icon: '💻', color: '#3b82f6' },
  { id: 'philosophy-culture', label: 'Filosofia & Tradição', icon: '🏛️', color: '#8b5cf6' },
  { id: 'capitalism-liberty', label: 'Capitalismo & Livre Mercado', icon: '💰', color: '#d97706' },
  { id: 'homeschooling-education', label: 'Educação & Homeschooling', icon: '📚', color: '#059669' },
  { id: 'cybersecurity', label: 'Cibersegurança', icon: '🛡️', color: '#ef4444' },
  { id: 'stocks', label: 'Bolsa de Valores', icon: '📊', color: '#f59e0b' },
  { id: 'personal-development', label: 'Desenvolvimento Pessoal', icon: '🚀', color: '#ec4899' }
];

export const NEWS_ARTICLES = [
  // 1. TECNOLOGIA
  {
    id: 'tech-autonomous-agents',
    category: 'technology',
    categoryLabel: 'Tecnologia',
    categoryIcon: '💻',
    categoryColor: '#3b82f6',
    source: 'TechCrunch • Silicon Valley',
    readTime: '3 min read',
    publishedAt: 'Hoje • Destaque Tech',
    headlineEn: 'Autonomous AI Agents: Transforming Enterprise Software and Daily Workflows',
    headlinePt: 'Agentes Autônomos de IA: A Transformação do Software Corporativo e Fluxos de Trabalho',
    leadSummaryEn: 'The next frontier of artificial intelligence moves beyond passive chatbots to autonomous agents capable of executing multi-step business decisions without constant human supervision.',
    leadSummaryPt: 'A próxima fronteira da inteligência artificial avança além dos chatbots passivos para agentes autônomos capazes de executar decisões corporativas em várias etapas sem supervisão constante.',
    contentEn: `The technology sector is witnessing a seismic shift from conversational prompts to goal-driven autonomous agents. Unlike traditional large language models that merely respond to single queries, modern AI agents possess the ability to plan, decompose complex objectives into sequential tasks, browse databases, invoke external APIs, and debug their own errors in real time.

Major enterprise players and venture capital firms are pouring billions into agentic workflows. Instead of manually auditing customer invoices or compiling quarterly compliance reports, corporate teams can now deploy agents that orchestrate the entire lifecycle of operations. Industry analysts predict this transition will unlock unprecedented productivity gains, allowing engineers and leaders to shift focus from repetitive administration to strategic innovation.`,
    contentPt: `O setor de tecnologia está testemunhando uma mudança sísmica dos comandos conversacionais para agentes autônomos orientados por metas. Ao contrário dos modelos tradicionais de linguagem que apenas respondem a consultas simples, os agentes modernos de IA possuem a capacidade de planejar, decompor objetivos complexos em tarefas sequenciais, pesquisar bancos de dados, acionar APIs externas e depurar os próprios erros em tempo real.

Grandes corporações e fundos de capital de risco estão investindo bilhões em fluxos de trabalho baseados em agentes. Em vez de auditar manualmente faturas de clientes ou compilar relatórios trimestrais de conformidade, equipes corporativas agora podem implementar agentes que orquestram todo o ciclo das operações. Analistas da indústria preveem que essa transição destravará ganhos de produtividade sem precedentes, permitindo que engenheiros e líderes migrem o foco da administração repetitiva para a inovação estratégica.`,
    audioText: `Autonomous AI Agents: Transforming Enterprise Software and Daily Workflows. The technology sector is witnessing a seismic shift from conversational prompts to goal-driven autonomous agents. Unlike traditional large language models that merely respond to single queries, modern AI agents possess the ability to plan, decompose complex objectives into sequential tasks, browse databases, invoke external APIs, and debug their own errors in real time.`,
    keywords: [
      {
        word: 'autonomous agents',
        ipa: '/ɔːˈtɑː.nə.məs ˈeɪ.dʒənts/',
        pos: 'noun phrase',
        meaningPt: 'agentes autônomos (sistemas de IA que executam tarefas sem intervenção humana contínua)',
        contextNote: 'O conceito central da nova geração de inteligência artificial aplicada aos negócios.',
        exampleEn: 'Autonomous agents can troubleshoot server bottlenecks before engineers wake up.',
        examplePt: 'Agentes autônomos podem solucionar gargalos de servidores antes dos engenheiros acordarem.'
      },
      {
        word: 'seismic shift',
        ipa: '/ˈsaɪz.mɪk ʃɪft/',
        pos: 'noun phrase',
        meaningPt: 'mudança sísmica, transformação radical de grande impacto',
        contextNote: 'Expressão sofisticada muito usada no jornalismo de negócios e finanças.',
        exampleEn: 'The rise of cloud computing caused a seismic shift in IT infrastructure.',
        examplePt: 'A ascensão da computação em nuvem causou uma mudança sísmica na infraestrutura de TI.'
      },
      {
        word: 'orchestrate',
        ipa: '/ˈɔːr.kə.streɪt/',
        pos: 'verb',
        meaningPt: 'orquestrar, coordenar harmonicamente múltiplas etapas ou sistemas',
        contextNote: 'Usado para descrever a gestão automatizada de sistemas complexos de software.',
        exampleEn: 'The platform orchestrates payment processing across global banking rails.',
        examplePt: 'A plataforma orquestra o processamento de pagamentos em redes bancárias globais.'
      },
      {
        word: 'scalability',
        ipa: '/ˌskeɪ.ləˈbɪl.ə.t̬i/',
        pos: 'noun',
        meaningPt: 'escalabilidade (capacidade de um sistema crescer sem perder desempenho)',
        contextNote: 'Termo indispensável para quem atua em tecnologia e investimentos de risco.',
        exampleEn: 'Cloud native architecture provides infinite scalability during Black Friday traffic.',
        examplePt: 'A arquitetura nativa em nuvem fornece escalabilidade infinita durante o tráfego da Black Friday.'
      },
      {
        word: 'unprecedented',
        ipa: '/ʌnˈpres.ə.den.t̬ɪd/',
        pos: 'adjective',
        meaningPt: 'sem precedentes, inédito na história',
        contextNote: 'Muito comum em notícias de economia, inovação e mercados mundiais.',
        exampleEn: 'The company reported unprecedented revenue growth in the third quarter.',
        examplePt: 'A empresa reportou um crescimento de receita sem precedentes no terceiro trimestre.'
      }
    ],
    takeaways: [
      {
        en: 'AI is advancing from passive conversational interfaces into proactive autonomous agents.',
        pt: 'A IA está evoluindo de interfaces conversacionais passivas para agentes proativos autônomos.'
      },
      {
        en: 'Agentic workflows enable end-to-end task execution, reducing human friction in corporate processes.',
        pt: 'Fluxos baseados em agentes permitem a execução ponta a ponta de tarefas, reduzindo o atrito humano nas empresas.'
      }
    ],
    quiz: [
      {
        question: 'What is the main difference between traditional chatbots and modern autonomous AI agents?',
        questionEn: 'What is the main difference between traditional chatbots and modern autonomous AI agents?',
        options: [
          'Autonomous agents can plan, execute multi-step tasks, and call APIs without constant prompts',
          'Traditional chatbots are more expensive to develop',
          'Autonomous agents only work with audio commands',
          'There is no technical difference between them'
        ],
        correctIndex: 0,
        explanation: 'Agentes autônomos não se limitam a responder perguntas; eles decompõem metas complexas e acionam ferramentas e sistemas externos de forma independente.'
      },
      {
        question: 'O que significa a expressão idiomática "seismic shift" no contexto do artigo?',
        questionEn: 'What does the idiomatic expression "seismic shift" mean in this context?',
        options: [
          'Uma mudança pequena e temporária',
          'Uma transformação radical e profunda de mercado',
          'Um terremoto físico na sede das empresas',
          'Um erro grave de programação'
        ],
        correctIndex: 1,
        explanation: '"Seismic shift" metáfora geológica para descrever uma virada de chave gigantesca e estrutural na indústria.'
      }
    ]
  },

  // 2. CIBERSEGURANÇA
  {
    id: 'cyber-zero-day-ransomware',
    category: 'cybersecurity',
    categoryLabel: 'Cibersegurança',
    categoryIcon: '🛡️',
    categoryColor: '#ef4444',
    source: 'Wired • Cybersecurity Briefing',
    readTime: '3 min read',
    publishedAt: 'Hoje • Alerta Global',
    headlineEn: 'Zero-Day Vulnerabilities and Cloud Breaches: The Evolving Threat Landscape',
    headlinePt: 'Vulnerabilidades de Dia Zero e Invasões em Nuvem: O Cenário em Evolução das Ameaças',
    leadSummaryEn: 'Cybersecurity agencies worldwide warn of sophisticated state-sponsored threat actors weaponizing zero-day flaws before vendors can release protective patches.',
    leadSummaryPt: 'Agências de cibersegurança em todo o mundo alertam sobre invasores estatais sofisticados que utilizam falhas de dia zero antes que os desenvolvedores lancem correções.',
    contentEn: `In an increasingly interconnected corporate world, cybersecurity has moved from the server room to the boardroom. Security researchers have revealed that threat actors are exploiting "zero-day vulnerabilities"—undisclosed software flaws unknown to vendors—at a historic pace. These vulnerabilities allow attackers to bypass standard firewalls, gain elevated administrative privileges, and deploy evasive ransomware within enterprise networks.

Experts emphasize that passive perimeter defense is no longer sufficient. Organizations are accelerating the adoption of "Zero Trust" architecture, a security philosophy governed by the mantra: "Never trust, always verify." Under this framework, every user identity, access request, and endpoint device must undergo continuous biometric and cryptographic authentication, minimizing blast radius in the event of an inevitable breach.`,
    contentPt: `Em um mundo corporativo cada vez mais interconectado, a cibersegurança migrou da sala de servidores diretamente para a mesa da diretoria executiva. Pesquisadores de segurança revelaram que invasores estão explorando "vulnerabilidades de dia zero" — falhas de software não divulgadas e desconhecidas pelos próprios desenvolvedores — em um ritmo histórico. Essas brechas permitem que atacantes contornem firewalls comuns, obtenham privilégios administrativos elevados e instalem ransomwares imperceptíveis nas redes empresariais.

Especialistas enfatizam que a defesa de perímetro passiva já não é suficiente. As organizações estão acelerando a adoção da arquitetura "Zero Trust", uma filosofia de segurança regida pelo mantra: "Nunca confie, sempre verifique". Sob esse modelo, toda identidade de usuário, solicitação de acesso e dispositivo terminal passa por autenticação criptográfica e biométrica contínua, minimizando o raio de impacto diante de uma invasão inevitável.`,
    audioText: `Zero-Day Vulnerabilities and Cloud Breaches: The Evolving Threat Landscape. Cybersecurity researchers have revealed that threat actors are exploiting zero-day vulnerabilities at a historic pace. Organizations are adopting Zero Trust architecture, governed by the mantra: Never trust, always verify.`,
    keywords: [
      {
        word: 'zero-day vulnerability',
        ipa: '/ˈzɪr.oʊ deɪ ˌvʌl.nɚ.əˈbɪl.ə.t̬i/',
        pos: 'noun phrase',
        meaningPt: 'vulnerabilidade de dia zero (falha de software desconhecida pelo fabricante e sem patch disponível)',
        contextNote: 'Chama-se dia zero porque os desenvolvedores têm 0 dias para corrigir antes do ataque.',
        exampleEn: 'The hackers gained root access through an unpatched zero-day vulnerability.',
        examplePt: 'Os hackers obtiveram acesso raiz por meio de uma vulnerabilidade de dia zero sem correção.'
      },
      {
        word: 'threat actors',
        ipa: '/θret ˈæk.tɚz/',
        pos: 'noun phrase',
        meaningPt: 'agentes de ameaça, invasores maliciosos, cibercriminosos',
        contextNote: 'Termo técnico padrão para indivíduos ou grupos que realizam ciberataques.',
        exampleEn: 'State-sponsored threat actors targeted critical infrastructure providers.',
        examplePt: 'Agentes de ameaça patrocinados por governos atacaram fornecedores de infraestrutura crítica.'
      },
      {
        word: 'Zero Trust architecture',
        ipa: '/ˈzɪr.oʊ trʌst ˈɑːr.kə.tek.tʃɚ/',
        pos: 'noun phrase',
        meaningPt: 'arquitetura de Confiança Zero (modelo de segurança que exige verificação permanente)',
        contextNote: 'Princípio moderno: não assumir que ninguém dentro da rede é confiável por padrão.',
        exampleEn: 'Zero Trust architecture prevents lateral movement once a hacker penetrates the firewall.',
        examplePt: 'A arquitetura Zero Trust impede o movimento lateral assim que um hacker penetra o firewall.'
      },
      {
        word: 'blast radius',
        ipa: '/blæst ˈreɪ.di.əs/',
        pos: 'noun phrase',
        meaningPt: 'raio de impacto, alcance dos danos de um ataque ou pane',
        contextNote: 'Metáfora bélica adotada na segurança da informação e engenharia de software.',
        exampleEn: 'Microsegmentation reduces the blast radius of any individual compromised account.',
        examplePt: 'A microssegmentação reduz o raio de impacto de qualquer conta individual comprometida.'
      },
      {
        word: 'elevated privileges',
        ipa: '/ˈel.ə.veɪ.t̬ɪd ˈprɪv.əl.ɪ.dʒɪz/',
        pos: 'noun phrase',
        meaningPt: 'privilégios de acesso administrativo elevado (root / superusuário)',
        contextNote: 'O objetivo principal de invasores para controlar o sistema por completo.',
        exampleEn: 'Never run routine applications with elevated administrator privileges.',
        examplePt: 'Nunca execute aplicativos rotineiros com privilégios de administrador elevados.'
      }
    ],
    takeaways: [
      {
        en: 'Zero-day exploits allow attackers to compromise systems before vendors can publish patches.',
        pt: 'Falhas de dia zero permitem o comprometimento de sistemas antes que fabricantes lancem correções.'
      },
      {
        en: 'Zero Trust architecture assumes breaches will happen and enforces continuous identity verification.',
        pt: 'A arquitetura Zero Trust assume que invasões acontecerão e impõe verificação contínua de identidade.'
      }
    ],
    quiz: [
      {
        question: 'O que define uma vulnerabilidade como "Zero-Day" em cibersegurança?',
        questionEn: 'What defines a software vulnerability as a "Zero-Day"?',
        options: [
          'É uma falha de segurança desconhecida pelo fabricante para a qual ainda não existe correção pública',
          'É um vírus que expira após 24 horas',
          'É um antivírus gratuito de teste',
          'É uma senha que possui zero números'
        ],
        correctIndex: 0,
        explanation: 'O termo "Zero-Day" indica que a falha foi descoberta antes do fabricante criar um patch de correção.'
      },
      {
        question: 'Qual é o mantra essencial da filosofia de segurança "Zero Trust"?',
        questionEn: 'What is the essential mantra of the "Zero Trust" security philosophy?',
        options: [
          'Never trust, always verify (Nunca confie, sempre verifique)',
          'Install firewalls and forget (Instale firewalls e esqueça)',
          'Trust employees without passwords (Confie nos funcionários sem senhas)',
          'Only check access once a year (Apenas cheque acessos uma vez ao ano)'
        ],
        correctIndex: 0,
        explanation: 'Zero Trust baseia-se na verificação rigorosa e contínua de todo usuário, máquina e aplicação.'
      }
    ]
  },

  // 3. POLÍTICA & GEOPOLÍTICA
  {
    id: 'politics-global-trade-semiconductors',
    category: 'politics',
    categoryLabel: 'Política & Geopolítica',
    categoryIcon: '🏛️',
    categoryColor: '#8b5cf6',
    source: 'Financial Times • Global Policy',
    readTime: '4 min read',
    publishedAt: 'Hoje • Diplomacia & Poder',
    headlineEn: 'Global Trade Alliances Shift Amid Semiconductor Sanctions and Clean Energy Accords',
    headlinePt: 'Alianças do Comércio Global se Transformam Diante de Sanções em Chips e Acordos de Energia',
    leadSummaryEn: 'World superpowers are redrawing geopolitical trade maps through aggressive subsidies, export controls on critical microchips, and strategic bilateral agreements.',
    leadSummaryPt: 'Superpotências mundiais estão redesenhando o mapa do comércio geopolítico através de subsídios agressivos, controle de exportação de chips e acordos bilaterais estratégicos.',
    contentEn: `Geopolitics and global supply chains have become inextricably linked as Western democracies and Asian powerhouses recalibrate their industrial policies. At the core of the current diplomatic friction is access to high-end semiconductor manufacturing equipment. Export restrictions have prompted major tech nations to subsidize domestic fabrication plants, pouring tens of billions in government grants to ensure technological sovereignty.

Simultaneously, bilateral diplomatic negotiations are accelerating around rare earth minerals essential for electric vehicles and defense technology. Observers note that national security is now the primary lens shaping international trade law, replacing the unconstrained globalization of previous decades with regionalized alliances and "friend-shoring" strategies.`,
    contentPt: `A geopolítica e as cadeias globais de suprimentos tornaram-se indissociavelmente ligadas à medida que democracias ocidentais e potências asiáticas recalibram suas políticas industriais. No epicentro do atrito diplomático atual está o acesso a equipamentos avançados para a fabricação de semicondutores. Restrições de exportação levaram grandes nações tecnológicas a subsidiar fábricas locais, injetando dezenas de bilhões de dólares em incentivos governamentais para assegurar soberania tecnológica.

Simultaneamente, negociações diplomáticas bilaterais estão se acelerando em torno de minerais de terras raras, vitais para veículos elétricos e tecnologias de defesa. Observadores destacam que a segurança nacional tornou-se a principal lente que molda as leis de comércio internacional, substituindo a globalização irrestrita das décadas passadas por alianças regionalizadas e estratégias de fabricação entre países parceiros (friend-shoring).`,
    audioText: `Global Trade Alliances Shift Amid Semiconductor Sanctions and Clean Energy Accords. At the core of the diplomatic friction is access to high-end semiconductor manufacturing equipment. National security is now the primary lens shaping international trade.`,
    keywords: [
      {
        word: 'semiconductor',
        ipa: '/ˌsem.i.kənˈdʌk.tɚ/',
        pos: 'noun',
        meaningPt: 'semicondutor, microchip avançado essencial para IA e eletrônicos',
        contextNote: 'O recurso mais disputado e estratégico da geopolítica moderna.',
        exampleEn: 'Advanced semiconductors are the oil of the 21st century technological economy.',
        examplePt: 'Semicondutores avançados são o petróleo da economia tecnológica do século XXI.'
      },
      {
        word: 'friend-shoring',
        ipa: '/frend ˈʃɔːr.ɪŋ/',
        pos: 'noun',
        meaningPt: 'transferência de fábricas para países aliados e parceiros políticos confiáveis',
        contextNote: 'Estratégia para evitar dependência de fornecedores geopoliticamente hostis.',
        exampleEn: 'Friend-shoring protects pharmaceutical manufacturing from diplomatic retaliation.',
        examplePt: 'O friend-shoring protege a produção farmacêutica contra retaliações diplomáticas.'
      },
      {
        word: 'sovereignty',
        ipa: '/ˈsɑːv.rən.t̬i/',
        pos: 'noun',
        meaningPt: 'soberania nacional, autonomia de decisão e poder supremo',
        contextNote: 'Conceito político clássico fundamental para a diplomacia e segurança internacional.',
        exampleEn: 'Technological sovereignty guarantees that a country can defend its domestic grid.',
        examplePt: 'A soberania tecnológica garante que um país possa defender sua rede elétrica nacional.'
      },
      {
        word: 'bilateral agreements',
        ipa: '/baɪˈlæt̬.ɚ.əl əˈɡriː.mənts/',
        pos: 'noun phrase',
        meaningPt: 'acordos bilaterais (pactos firmados diretamente entre dois países soberanos)',
        contextNote: 'Diferente de tratados multilaterais com dezenas de participantes.',
        exampleEn: 'The two nations signed bilateral agreements to reduce trade tariffs on agricultural goods.',
        examplePt: 'As duas nações assinaram acordos bilaterais para reduzir tarifas de importação agrícola.'
      },
      {
        word: 'recalibrate',
        ipa: '/ˌriːˈkæl.ə.breɪt/',
        pos: 'verb',
        meaningPt: 'recalibrar, ajustar estrategicamente uma política ou rumo de ação',
        contextNote: 'Verbo comum na retórica de diplomatas e governantes mundiais.',
        exampleEn: 'Diplomats are meeting in Geneva to recalibrate nuclear non-proliferation talks.',
        examplePt: 'Diplomatas estão reunidos em Genebra para recalibrar as conversas de não-proliferação.'
      }
    ],
    takeaways: [
      {
        en: 'Semiconductors and rare earth minerals have become the epicenter of modern geopolitical power.',
        pt: 'Semicondutores e minerais de terras raras tornaram-se o epicentro do poder geopolítico moderno.'
      },
      {
        en: 'Friend-shoring is replacing unrestricted globalization with trusted regional trade alliances.',
        pt: 'O friend-shoring está substituindo a globalização irrestrita por alianças de comércio de confiança mútua.'
      }
    ],
    quiz: [
      {
        question: 'O que significa a estratégia geopolítica de "friend-shoring"?',
        questionEn: 'What does the geopolitical strategy of "friend-shoring" refer to?',
        options: [
          'Realocar cadeias de produção e fábricas para países aliados e politicamente estáveis',
          'Contratar amigos para trabalhar no governo',
          'Comprar ações de empresas em praias internacionais',
          'Fechar fronteiras e proibir viagens a turismo'
        ],
        correctIndex: 0,
        explanation: '"Friend-shoring" é a prática diplomática de concentrar fornecedores em nações aliadas para mitigar riscos de guerra e chantagens comerciais.'
      },
      {
        question: 'Qual insumo tecnológico é considerado o pivô das disputas comerciais globais atuais?',
        questionEn: 'Which technological input is considered the core pivot of current global trade disputes?',
        options: [
          'Microchips semicondutores avançados',
          'Fios de cobre para telefonia fixa',
          'Monitores de tubo antigos',
          'Papel para impressão de documentos'
        ],
        correctIndex: 0,
        explanation: 'Os semicondutores de última geração são indispensáveis para inteligência artificial, computação de nuvem e defesa militar.'
      }
    ]
  },

  // 4. ECONOMIA GLOBAL
  {
    id: 'economy-central-banks-rate-cuts',
    category: 'economy',
    categoryLabel: 'Economia Global',
    categoryIcon: '📈',
    categoryColor: '#10b981',
    source: 'Bloomberg • Macroeconomics',
    readTime: '3 min read',
    publishedAt: 'Hoje • Economia Global',
    headlineEn: 'Central Banks Signal Coordinated Interest Rate Cuts as Inflation Moderates',
    headlinePt: 'Bancos Centrais Sinalizam Cortes Coordenados de Juros com a Moderação da Inflação',
    leadSummaryEn: 'Global monetary policy enters an easing cycle as consumer price indexes cool down, raising hopes for an elusive soft landing in major Western economies.',
    leadSummaryPt: 'A política monetária global entra em um ciclo de afrouxamento com a desaceleração da inflação, fortalecendo expectativas de um pouso suave nas principais economias ocidentais.',
    contentEn: `Following the most aggressive tightening cycle in four decades, the world's most influential central bankers are pivoting toward monetary easing. Fresh macroeconomic data indicates that headline inflation has steadily converged toward the target two-percent threshold across North America and Europe, driven by cooling energy costs and normalized maritime supply chains.

The primary debate among monetary policy committees is the velocity and magnitude of borrowing cost reductions. While lower interest rates stimulate consumer lending, corporate capital expenditure, and mortgage markets, central bank governors remain vigilant against reigniting price pressures in tight labor markets. Economists widely agree that achieving a "soft landing"—taming inflation without plunging the economy into a painful recession—would be a historic macroeconomic achievement.`,
    contentPt: `Após o ciclo de aperto monetário mais agressivo em quatro décadas, os banqueiros centrais mais influentes do planeta estão pivotando em direção ao afrouxamento monetário. Dados macroeconômicos recentes indicam que a inflação cheia convergiu de maneira consistente para a meta de dois por cento na América do Norte e na Europa, impulsionada pelo arrefecimento dos custos de energia e pela normalização das cadeias de transporte marítimo.

O principal debate nos comitês de política monetária reside na velocidade e na magnitude dos cortes nas taxas de empréstimo. Embora juros mais baixos estimulem o crédito ao consumidor, investimentos de capital corporativo e o mercado imobiliário, os presidentes dos bancos centrais permanecem vigilantes para não reativar pressões de preços em mercados de trabalho aquecidos. Economistas concordam que alcançar um "pouso suave" (soft landing) — domar a inflação sem empurrar a economia para uma recessão dolorosa — representará um marco macroeconômico histórico.`,
    audioText: `Central Banks Signal Coordinated Interest Rate Cuts as Inflation Moderates. Global monetary policy enters an easing cycle as consumer price indexes cool down. Economists agree that achieving a soft landing would be an extraordinary achievement.`,
    keywords: [
      {
        word: 'interest rate cuts',
        ipa: '/ˈɪn.trɪst reɪt kʌts/',
        pos: 'noun phrase',
        meaningPt: 'cortes nas taxas de juros (redução do custo do dinheiro pelos bancos centrais)',
        contextNote: 'O principal estímulo para aquecer empréstimos, consumo e investimentos produtivos.',
        exampleEn: 'Interest rate cuts generally lower mortgage payments and encourage business expansion.',
        examplePt: 'Cortes nas taxas de juros geralmente reduzem parcelas de financiamentos e incentivam a expansão empresarial.'
      },
      {
        word: 'soft landing',
        ipa: '/sɑːft ˈlæn.dɪŋ/',
        pos: 'noun phrase',
        meaningPt: 'pouso suave (controlar a inflação sem provocar uma recessão econômica)',
        contextNote: 'O Santo Graal da política monetária moderna; o cenário econômico mais desejado.',
        exampleEn: 'The Federal Reserve hopes to engineer a soft landing without spiking unemployment.',
        examplePt: 'O Banco Central americano espera conduzir um pouso suave sem disparar o desemprego.'
      },
      {
        word: 'monetary easing',
        ipa: '/ˈmɑː.nə.ter.i ˈiː.zɪŋ/',
        pos: 'noun phrase',
        meaningPt: 'afrouxamento monetário (redução de juros e injeção de liquidez na economia)',
        contextNote: 'Oposto de "tightening" (aperto monetário / alta de juros).',
        exampleEn: 'Monetary easing stimulates stock markets as yields on cash equivalents diminish.',
        examplePt: 'O afrouxamento monetário estimula as bolsas de valores à medida que os rendimentos da renda fixa caem.'
      },
      {
        word: 'capital expenditure',
        ipa: '/ˈkæp.ə.t̬əl ɪkˈspen.də.tʃɚ/',
        pos: 'noun phrase (CapEx)',
        meaningPt: 'despesas de capital (investimentos de longo prazo em máquinas, prédios e inovação)',
        contextNote: 'Métrica financeira vital para avaliar a saúde e o apetite de expansão de empresas.',
        exampleEn: 'Tech giants increased their capital expenditure on artificial intelligence data centers.',
        examplePt: 'Gigantes da tecnologia aumentaram suas despesas de capital em centros de dados de inteligência artificial.'
      },
      {
        word: 'vigilant',
        ipa: '/ˈvɪdʒ.əl.ənt/',
        pos: 'adjective',
        meaningPt: 'vigilante, atento, em prontidão contra riscos',
        contextNote: 'Muito comum em atas e discursos oficiais de bancos centrais.',
        exampleEn: 'Governors remain vigilant regarding sticky service-sector inflation.',
        examplePt: 'Diretores permanecem vigilantes em relação à inflação persistente no setor de serviços.'
      }
    ],
    takeaways: [
      {
        en: 'Central banks are transitioning from rate hikes to rate cuts as inflation approaches targets.',
        pt: 'Bancos centrais estão migrando de altas para cortes de juros à medida que a inflação se aproxima das metas.'
      },
      {
        en: 'Achieving a soft landing requires balancing rate reductions without reigniting price pressures.',
        pt: 'Alcançar um pouso suave requer equilibrar a redução de juros sem reativar pressões inflacionárias.'
      }
    ],
    quiz: [
      {
        question: 'O que significa o termo macroeconômico "soft landing"?',
        questionEn: 'What does the macroeconomic term "soft landing" mean?',
        options: [
          'Reduzir a inflação de volta à meta sem derrubar a economia em uma recessão profunda',
          'Um pouso de emergência de aviões comerciais',
          'A queda no preço de passagens aéreas',
          'A perda total de empregos em um país'
        ],
        correctIndex: 0,
        explanation: '"Soft landing" descreve o cenário econômico ideal em que os juros controlam os preços sem matar a atividade produtiva.'
      },
      {
        question: 'Qual é o efeito esperado do "monetary easing" (afrouxamento monetário) sobre o crédito e empresas?',
        questionEn: 'What is the expected effect of monetary easing on credit and businesses?',
        options: [
          'Barateia o crédito, incentiva investimentos produtivos e estimula o consumo',
          'Congela todas as contas bancárias',
          'Aumenta o custo das dívidas de forma imediata',
          'Obriga os cidadãos a comprarem apenas ouro'
        ],
        correctIndex: 0,
        explanation: 'Juros menores reduzem o custo dos empréstimos corporativos e fomentam novos projetos de investimento.'
      }
    ]
  },

  // 5. BOLSA DE VALORES & MERCADOS FINANCEIROS
  {
    id: 'stocks-wall-street-bull-market',
    category: 'stocks',
    categoryLabel: 'Bolsa de Valores',
    categoryIcon: '📊',
    categoryColor: '#f59e0b',
    source: 'CNBC Markets • New York',
    readTime: '3 min read',
    publishedAt: 'Hoje • Mercados em Alta',
    headlineEn: 'Wall Street Hits Record Highs Led by Semiconductor Rally and Tech Earnings Beat',
    headlinePt: 'Bolsa de Nova York Atinge Recordes Históricos com Alta em Semicondutores e Lucros Acima do Esperado',
    leadSummaryEn: 'The S&P 500 and Nasdaq posted fresh all-time highs as corporate balance sheets demonstrate robust cash flow and soaring demand for enterprise computing infrastructure.',
    leadSummaryPt: 'O S&P 500 e a Nasdaq registraram novas máximas históricas com balanços corporativos demonstrando fluxo de caixa robusto e demanda em alta por infraestrutura tecnológica.',
    contentEn: `Equity markets in New York surged to historic milestones today, propelled by stronger-than-expected corporate quarterly earnings and an unprecedented rally in artificial intelligence hardware manufacturers. The benchmark S&P 500 climbed past key psychological resistance levels, driven by institutional fund inflows and optimistic guidance from tech leaders.

Portfolio managers point out that market breadth is expanding beyond the mega-cap tech giants. Mid-cap industrials, regional banking equities, and renewable energy sectors also participated in today's green session. Financial analysts caution that while valuation multiples are trading above historical averages, resilient earnings per share and low corporate debt defaults continue to provide fundamental support for the broader bull market.`,
    contentPt: `Os mercados de ações em Nova York subiram para patamares históricos hoje, impulsionados por resultados trimestrais corporativos acima do esperado e por uma alta impressionante nas fabricantes de hardware de inteligência artificial. O índice de referência S&P 500 ultrapassou níveis psicológicos de resistência, impulsionado por aportes de fundos institucionais e projeções otimistas das lideranças do setor de tecnologia.

Gestores de carteiras destacam que a amplitude do mercado está se expandindo além das gigantescas empresas de tecnologia. Indústrias de médio porte, bancos regionais e setores de energia limpa também participaram da sessão positiva de hoje. Analistas financeiros alertam que, embora os múltiplos de avaliação estejam negociando acima das médias históricas, o lucro por ação resiliente e a baixa taxa de calote de dívidas corporativas continuam dando suporte fundamental ao mercado de alta (bull market).`,
    audioText: `Wall Street Hits Record Highs Led by Semiconductor Rally and Tech Earnings Beat. The benchmark S&P 500 climbed past key resistance levels, driven by institutional fund inflows and resilient earnings per share.`,
    keywords: [
      {
        word: 'bull market',
        ipa: '/bʊl ˈmɑːr.kɪt/',
        pos: 'noun phrase',
        meaningPt: 'mercado em alta (período prolongado de valorização das ações e otimismo dos investidores)',
        contextNote: 'O touro ataca de baixo para cima; o urso (bear market) ataca de cima para baixo.',
        exampleEn: 'Disciplined long-term investors accumulate solid assets during both bull and bear markets.',
        examplePt: 'Investidores disciplinados de longo prazo acumulam ativos sólidos tanto em mercados de alta quanto de baixa.'
      },
      {
        word: 'earnings per share',
        ipa: '/ˈɝː.nɪŋz pɚ ʃer/',
        pos: 'noun phrase (EPS)',
        meaningPt: 'lucro por ação (lucro líquido total da empresa dividido pelo número de ações em circulação)',
        contextNote: 'A métrica rainha para avaliar a rentabilidade real de uma companhia listada na bolsa.',
        exampleEn: 'The company beat consensus earnings per share forecasts by twelve percent.',
        examplePt: 'A empresa superou as estimativas de lucro por ação do mercado em doze por cento.'
      },
      {
        word: 'market capitalization',
        ipa: '/ˈmɑːr.kɪt ˌkæp.ə.t̬əl.əˈzeɪ.ʃən/',
        pos: 'noun phrase (Market Cap)',
        meaningPt: 'valor de mercado da empresa (preço da ação multiplicado pelo total de ações)',
        contextNote: 'Classifica empresas em Large-Cap (gigantes), Mid-Cap e Small-Cap.',
        exampleEn: 'Apple and Microsoft boast market capitalizations exceeding three trillion dollars.',
        examplePt: 'A Apple e a Microsoft possuem valores de mercado que ultrapassam três trilhões de dólares.'
      },
      {
        word: 'quarterly guidance',
        ipa: '/ˈkwɔːr.t̬ɚ.li ˈɡaɪ.dəns/',
        pos: 'noun phrase',
        meaningPt: 'projeção trimestral oficial dada pela diretoria da empresa sobre vendas e lucros futuros',
        contextNote: 'Muitas vezes mexe mais no preço da ação do que o resultado do trimestre passado.',
        exampleEn: 'The stock tumbled after the CEO issued conservative quarterly guidance.',
        examplePt: 'A ação despencou após o presidente executivo divulgar projeções trimestrais conservadoras.'
      },
      {
        word: 'dividend yield',
        ipa: '/ˈdɪv.ə.dend jiːld/',
        pos: 'noun phrase',
        meaningPt: 'taxa de dividendos (percentual do preço da ação pago aos acionistas em dinheiro ao ano)',
        contextNote: 'Crucial para quem investe com foco em renda passiva recorrente.',
        exampleEn: 'Conservative investors favor blue-chip companies with a stable dividend yield.',
        examplePt: 'Investidores conservadores preferem empresas consolidadas com uma taxa de dividendos estável.'
      }
    ],
    takeaways: [
      {
        en: 'The S&P 500 reached all-time highs driven by AI hardware demand and solid balance sheets.',
        pt: 'O S&P 500 bateu recordes históricos impulsionado pela demanda de hardware de IA e balanços saudáveis.'
      },
      {
        en: 'Market breadth is expanding as industrials and regional banks join the technology rally.',
        pt: 'A amplitude do mercado está aumentando à medida que indústrias e bancos se juntam à alta do setor de tecnologia.'
      }
    ],
    quiz: [
      {
        question: 'O que representa a sigla financeira EPS (Earnings Per Share) na análise de ações?',
        questionEn: 'What does the financial acronym EPS (Earnings Per Share) represent?',
        options: [
          'Lucro líquido da empresa dividido pelo total de ações em circulação',
          'O valor que o investidor precisa pagar de imposto',
          'O preço máximo que a ação pode custar no pregão',
          'O número de filiais da empresa no exterior'
        ],
        correctIndex: 0,
        explanation: 'O EPS (Lucro por Ação) mede a rentabilidade atribuída a cada cota do negócio, sendo o principal termômetro de balanço.'
      },
      {
        question: 'Qual é a diferença entre um "Bull Market" e um "Bear Market"?',
        questionEn: 'What is the difference between a "Bull Market" and a "Bear Market"?',
        options: [
          'Bull Market é mercado em alta prolongada; Bear Market é mercado em queda generalizada',
          'Bull Market é mercado na Europa e Bear Market nos Estados Unidos',
          'Ambos significam a mesma coisa na linguagem de Wall Street',
          'Bull Market é negociado apenas por bancos e Bear Market por pessoas físicas'
        ],
        correctIndex: 0,
        explanation: 'Bull Market reflete otimismo e preços subindo; Bear Market reflete pessimismo e desvalorização generalizada de ativos.'
      }
    ]
  },

  // 6. DESENVOLVIMENTO PESSOAL & ALTA PERFORMANCE
  {
    id: 'personal-deep-work-dopamine',
    category: 'personal-development',
    categoryLabel: 'Desenvolvimento Pessoal',
    categoryIcon: '🚀',
    categoryColor: '#ec4899',
    source: 'Harvard Business Review • High Performance',
    readTime: '3 min read',
    publishedAt: 'Hoje • Hábitos & Maestria',
    headlineEn: 'Deep Work and Dopamine Resets: How High Performers Protect Focus in a Distracted World',
    headlinePt: 'Trabalho Focado e Desintoxicação de Dopamina: Como Profissionais de Alta Performance Blindam a Atenção',
    leadSummaryEn: 'Neuroscience and behavioral psychology demonstrate that safeguarding uninterrupted blocks of cognitive focus is the single greatest competitive advantage of the 21st century.',
    leadSummaryPt: 'A neurociência e a psicologia comportamental comprovam que blindar blocos ininterruptos de foco cognitivo é a maior vantagem competitiva do século XXI.',
    contentEn: `In an era dominated by perpetual notifications, algorithmically generated short-form video, and instant messaging interruptions, the ability to concentrate deeply without distraction has become an increasingly scarce superpower. Renowned neuroscientists point out that every sudden context switch extracts a heavy "attention residue," requiring up to twenty-three minutes for the human brain to regain peak cognitive flow.

High performers across finance, technology, and entrepreneurship are systematically adopting "dopamine resets" and rigorous time-blocking protocols. By sequestering digital devices during the first ninety minutes of the workday, practicing deliberate daily study, and cultivating non-negotiable bedtime routines, professionals can retrain their neuroplasticity. True excellence does not require superhuman willpower; it requires designing an environment where focus is natural and distraction is friction-heavy.`,
    contentPt: `Em uma época dominada por notificações perpétuas, vídeos curtos gerados por algoritmos e interrupções constantes de mensagens instantâneas, a capacidade de se concentrar profundamente sem distrações tornou-se um superpoder cada vez mais raro. Neurocientistas de renome destacam que cada mudança repentina de contexto cobra um pesado "resíduo de atenção", exigindo até vinte e três minutos para que o cérebro humano recupere o estado de fluxo cognitivo pleno.

Profissionais de alta performance nas finanças, tecnologia e empreendedorismo estão adotando de forma sistemática "desintoxicações de dopamina" e protocolos rigorosos de blocos de tempo. Ao isolar aparelhos digitais durante os primeiros noventa minutos do dia, praticar estudo diário deliberado e cultivar rotinas inegociáveis de descanso, o cérebro retreina sua neuroplasticidade. A verdadeira excelência não exige uma força de vontade sobre-humana; ela requer desenhar um ambiente onde o foco seja natural e a distração seja cheia de obstáculos.`,
    audioText: `Deep Work and Dopamine Resets: How High Performers Protect Focus in a Distracted World. The ability to concentrate deeply without distraction has become a scarce superpower. True excellence requires designing an environment where focus is natural and distraction is friction-heavy.`,
    keywords: [
      {
        word: 'deep work',
        ipa: '/diːp wɝːk/',
        pos: 'noun phrase',
        meaningPt: 'trabalho focado, atividade profissional que exige máxima concentração cognitiva sem distrações',
        contextNote: 'Conceito criado pelo professor Cal Newport; oposto do "shallow work" (trabalho superficial de responder e-mails).',
        exampleEn: 'I schedule two hours of uninterrupted deep work before opening any communication apps.',
        examplePt: 'Eu agendo duas horas de trabalho focado ininterrupto antes de abrir qualquer aplicativo de mensagens.'
      },
      {
        word: 'attention residue',
        ipa: '/əˈten.ʃən ˈrez.ə.duː/',
        pos: 'noun phrase',
        meaningPt: 'resíduo de atenção (a lentidão mental que fica quando mudamos rapidamente de uma tarefa para outra)',
        contextNote: 'O custo oculto de tentar fazer várias coisas ao mesmo tempo (multitasking).',
        exampleEn: 'Checking your phone during meetings leaves attention residue that impairs critical thinking.',
        examplePt: 'Olhar o celular durante reuniões deixa um resíduo de atenção que prejudica o raciocínio crítico.'
      },
      {
        word: 'time-blocking',
        ipa: '/taɪm ˈblɑː.kɪŋ/',
        pos: 'noun',
        meaningPt: 'bloqueio de tempo (dividir o dia em blocos dedicados a tarefas específicas na agenda)',
        contextNote: 'A técnica de gestão de tempo mais recomendada por executivos de alta performance.',
        exampleEn: 'Time-blocking eliminates decision fatigue regarding what to work on next.',
        examplePt: 'O bloqueio de tempo elimina a fadiga de decisão sobre qual tarefa realizar a seguir.'
      },
      {
        word: 'neuroplasticity',
        ipa: '/ˌnʊr.oʊ.plæsˈtɪs.ə.t̬i/',
        pos: 'noun',
        meaningPt: 'neuroplasticidade (capacidade do cérebro de se reorganizar e criar novas conexões sinápticas)',
        contextNote: 'A prova científica de que adultos podem aprender novos idiomas e habilidades em qualquer idade.',
        exampleEn: 'Daily language learning stimulates neuroplasticity and sharpens overall memory.',
        examplePt: 'O aprendizado diário de idiomas estimula a neuroplasticidade e aprimora a memória geral.'
      },
      {
        word: 'deliberate practice',
        ipa: '/dɪˈlɪb.ɚ.ət ˈpræk.tɪs/',
        pos: 'noun phrase',
        meaningPt: 'prática deliberada (treino focado com feedback imediato para corrigir pontos fracos)',
        contextNote: 'A diferença entre simplesmente repetir algo no piloto automático e realmente evoluir com maestria.',
        exampleEn: 'Deliberate practice with native audio accelerates your English speaking confidence.',
        examplePt: 'A prática deliberada com áudio nativo acelera a sua confiança ao falar inglês.'
      }
    ],
    takeaways: [
      {
        en: 'Concentrating deeply without distraction is the primary competitive advantage of our modern era.',
        pt: 'Concentrar-se profundamente sem distrações é a principal vantagem competitiva da era moderna.'
      },
      {
        en: 'Context switching creates attention residue that severely degrades problem-solving ability.',
        pt: 'Mudar constantemente de contexto gera resíduo de atenção que degrada a capacidade de resolver problemas.'
      }
    ],
    quiz: [
      {
        question: 'O que o conceito neurológico de "attention residue" (resíduo de atenção) comprova?',
        questionEn: 'What does the neurological concept of "attention residue" prove?',
        options: [
          'Que trocar constantemente de tarefa cobra um alto custo mental, exigindo até 23 minutos para retomar o foco pleno',
          'Que o cérebro humano funciona melhor quando faz cinco coisas ao mesmo tempo',
          'Que dormir tarde melhora a memória',
          'Que notificações de celular não causam distração'
        ],
        correctIndex: 0,
        explanation: 'O resíduo de atenção comprova que o cérebro não realiza multitarefa real; ele apenas perde energia trocando de foco com lentidão.'
      },
      {
        question: 'O que é "Deep Work" (trabalho focado) segundo a literatura de alta performance?',
        questionEn: 'What is "Deep Work" according to high performance literature?',
        options: [
          'Trabalho intelectual focado e ininterrupto que desafia a mente ao limite e gera resultados de alto valor',
          'Trabalhar embaixo d\'água ou em minas',
          'Responder mensagens enquanto assiste televisão',
          'Trabalhar 20 horas por dia sem dormir'
        ],
        correctIndex: 0,
        explanation: 'Deep Work é o estado de imersão focado em tarefas complexas, livre de distrações e interrupções superficiais.'
      }
    ]
  },

  // 7. FILOSOFIA & TRADIÇÃO (OLAVO DE CARVALHO)
  {
    id: 'philo-olavo-intellect',
    category: 'philosophy-culture',
    categoryLabel: 'Filosofia & Tradição',
    categoryIcon: '🏛️',
    categoryColor: '#8b5cf6',
    source: 'Brasil Paralelo & Estudos Culturais',
    readTime: '4 min read',
    publishedAt: 'Destaque Cultural • Filosofia',
    headlineEn: 'The Primacy of Reality: Olavo de Carvalho and the Formation of the Human Intellect',
    headlinePt: 'A Primazia da Realidade: Olavo de Carvalho e a Formação da Inteligência Humana',
    leadSummaryEn: 'How Brazilian thinker Olavo de Carvalho challenged modern ideological traps, restored classical literary studies, and insisted that genuine philosophy must begin with concrete human experience rather than academic abstractions.',
    leadSummaryPt: 'Como o filósofo Olavo de Carvalho desafiou as armadilhas ideológicas da modernidade, resgatou os estudos literários clássicos e insistiu que a autêntica filosofia deve partir da experiência humana concreta e não de abstrações acadêmicas.',
    contentEn: `Few intellectual figures in modern Latin America have stirred as profound a cultural awakening as Olavo de Carvalho. Central to his philosophical legacy is the "Primacy of Reality" (a primazia da realidade)—the conviction that genuine cognition must anchor itself in the concrete awareness of existence before descending into political slogans or bureaucratic ideology.

Through his seminal work on the "Four Discourses" (Aristotle's progression through poetic, rhetorical, dialectical, and logical expression), Carvalho demonstrated that a society cannot develop sound logic without first nourishing the moral imagination through great literature. In an era dominated by cultural hegemony and intellectual complacency, his seminars rekindled the study of Western classics, the defense of Christianity, and the pursuit of truth regardless of ideological fashion. As documented in widespread cultural productions, his thought catalyzed a generation to seek intellectual sovereignty, family protection, and moral courage.`,
    contentPt: `Poucas figuras intelectuais na América Latina moderna despertaram um renascimento cultural tão profundo quanto Olavo de Carvalho. No centro de seu legado filosófico está a "Primazia da Realidade" — a convicção de que o autêntico conhecimento deve ancorar-se na percepção concreta da existência antes de se render a slogans políticos ou ideologias burocráticas.

Por meio de sua obra fundamental sobre a "Teoria dos Quatro Discursos" (a progressão aristotélica através da poética, retórica, dialética e lógica), Carvalho demonstrou que uma sociedade não consegue desenvolver lógica sólida sem antes nutrir o imaginário moral através da grande literatura. Em uma era dominada pela hegemonia cultural e pela complacência intelectual, seus seminários reacenderam o estudo dos clássicos ocidentais, a defesa do cristianismo e a busca pela verdade acima das modas ideológicas. Conforme retratado em produções do Brasil Paralelo, seu pensamento catalisou uma geração a buscar soberania intelectual, proteção da família e coragem moral.`,
    audioText: `The Primacy of Reality: Olavo de Carvalho and the Formation of the Human Intellect. Central to his philosophical legacy is the Primacy of Reality: the conviction that genuine cognition must anchor itself in the concrete awareness of existence before descending into political slogans. Carvalho demonstrated that a society cannot develop sound logic without first nourishing the moral imagination through great literature.`,
    keywords: [
      {
        word: 'primacy of reality',
        ipa: '/ˈpraɪ.mə.si əv riˈæl.ə.t̬i/',
        pos: 'noun phrase',
        meaningPt: 'primazia da realidade (o princípio filosófico de que os fatos concretos precedem as teorias mentais)',
        contextNote: 'O conceito central da epistemologia de Olavo de Carvalho contra o relativismo pós-moderno.',
        exampleEn: 'The primacy of reality requires confronting facts rather than ideological wishful thinking.',
        examplePt: 'A primazia da realidade exige confrontar os fatos em vez de ilusões ideológicas.'
      },
      {
        word: 'moral imagination',
        ipa: '/ˈmɔːr.əl ɪˌmædʒ.əˈneɪ.ʃən/',
        pos: 'noun phrase',
        meaningPt: 'imaginário moral (a capacidade humana de intuir o bem, a beleza e a ordem através de narrativas nobres)',
        contextNote: 'Desenvolvido por Edmund Burke e Russell Kirk, e central nos ensinamentos clássicos de formação humana.',
        exampleEn: 'Reading classic fairy tales nurtures the moral imagination of young children.',
        examplePt: 'Ler contos de fadas clássicos nutre o imaginário moral de crianças pequenas.'
      },
      {
        word: 'cultural hegemony',
        ipa: '/ˈkʌl.tʃɚ.əl hɪˈdʒem.ə.ni/',
        pos: 'noun phrase',
        meaningPt: 'hegemonia cultural (o controle invisível da linguagem, escolas e mídia por uma ideologia dominante)',
        contextNote: 'Conceito formulado por Antonio Gramsci e amplamente desmascarado nos documentários do Brasil Paralelo.',
        exampleEn: 'Understanding cultural hegemony allows families to protect their children from indoctrination.',
        examplePt: 'Compreender a hegemonia cultural permite às famílias protegerem seus filhos da doutrinação.'
      },
      {
        word: 'intellectual sovereignty',
        ipa: '/ˌɪn.t̬əlˈek.tʃu.əl ˈsɑːv.rən.ti/',
        pos: 'noun phrase',
        meaningPt: 'soberania intelectual (a coragem de pensar com a própria cabeça guiado pela verdade e pela evidência)',
        contextNote: 'A virtude de não se dobrar ao pensamento de manada ou à aprovação do grupo.',
        exampleEn: 'Olavo urged students to attain intellectual sovereignty through rigorous classical reading.',
        examplePt: 'Olavo exortava os alunos a alcançarem soberania intelectual por meio de leitura clássica rigorosa.'
      },
      {
        word: 'four discourses',
        ipa: '/fɔːr ˈdɪs.kɔːr.sɪz/',
        pos: 'noun phrase',
        meaningPt: 'os quatro discursos (a escada do conhecimento humano: Poética, Retórica, Dialética e Lógica)',
        contextNote: 'A tese de Carvalho que une a obra de Aristóteles em uma pedagogia integral do intelecto.',
        exampleEn: 'The four discourses theory shows that logic cannot exist in a literary vacuum.',
        examplePt: 'A teoria dos quatro discursos demonstra que a lógica não pode existir em um vácuo literário.'
      }
    ],
    takeaways: [
      {
        en: 'Philosophy begins with concrete existential experience, not with sterile political formulas.',
        pt: 'A filosofia começa com a experiência existencial concreta, e não com fórmulas políticas estéreis.'
      },
      {
        en: 'Nourishing the moral imagination through classical literature is indispensable for clear logical thinking.',
        pt: 'Nutrir o imaginário moral através da literatura clássica é indispensável para o raciocínio lógico claro.'
      }
    ],
    quiz: [
      {
        question: 'Segundo a tese da "Primazia da Realidade", o que deve guiar a busca pelo conhecimento?',
        questionEn: 'According to the "Primacy of Reality" thesis, what must guide genuine cognition?',
        options: [
          'A experiência concreta e o confronto honesto com os fatos da vida real',
          'A repetição de slogans ideológicos do momento',
          'Apenas o diploma concedido por universidades estatais',
          'A opinião da maioria nas redes sociais'
        ],
        correctIndex: 0,
        explanation: 'A primazia da realidade afirma que os fatos e a vivência concreta do ser humano são superiores a quaisquer construções ideológicas abstratas.'
      },
      {
        question: 'Qual é o primeiro degrau necessário para formar o intelecto antes de alcançar a Lógica?',
        questionEn: 'What is the foundational first step necessary before reaching sound Logic?',
        options: [
          'A Poética e a nutrição do imaginário através de grandes histórias e virtudes clássicas',
          'Decorar fórmulas matemáticas avançadas na infância',
          'Assistir televisão o dia inteiro',
          'Fazer debates políticos partidários'
        ],
        correctIndex: 0,
        explanation: 'Na teoria dos quatro discursos, a Poética e o imaginário moral formam a base indispensável sobre a qual a Retórica, a Dialética e a Lógica se sustentam.'
      }
    ]
  },

  // 8. FILOSOFIA & TRADIÇÃO (FRIEDRICH NIETZSCHE)
  {
    id: 'philo-nietzsche-nihilism',
    category: 'philosophy-culture',
    categoryLabel: 'Filosofia & Tradição',
    categoryIcon: '🏛️',
    categoryColor: '#8b5cf6',
    source: 'Western Civilization Review • Ideias & Filosofia',
    readTime: '4 min read',
    publishedAt: 'Debate Filosófico • Clássicos',
    headlineEn: 'Friedrich Nietzsche and the Crisis of Nihilism: Diagnosing the Modern Moral Vacuum',
    headlinePt: 'Friedrich Nietzsche e a Crise do Niilismo: O Diagnóstico do Vácuo Moral Moderno',
    leadSummaryEn: 'Far from celebrating moral decay, Nietzsche prophetically warned that abandoning transcendent spiritual foundations would unleash devastating existential despair across Western civilization.',
    leadSummaryPt: 'Longe de celebrar a decadência moral, Nietzsche alertou profeticamente que o abandono das fundações espirituais transcendentes desencadearia um devastador desespero existencial na civilização ocidental.',
    contentEn: `When Friedrich Nietzsche penned his famous aphorism proclaiming that modern man had discarded the divine, he was not cheering; he was sounding an alarm. Nietzsche understood with terrifying lucidity that the moral values of the West—human dignity, objective truth, justice, and charity—were inextricably rooted in biblical foundations. Severing the fruit from the root, he predicted, would lead to the rise of totalitarian ideologies, cultural exhaustion, and widespread nihilism.

Nihilism is the paralyzing conviction that life possesses no ultimate meaning, purpose, or moral boundaries. In response, modern conservative and Christian thinkers study Nietzsche as a devastating mirror of modernity: he proved that secular materialism cannot sustain ethics on its own. Rebuilding the West requires rejecting apathy, cultivating virtue, and anchoring the family in transcendent truth that outlasts cultural storms.`,
    contentPt: `Quando Friedrich Nietzsche escreveu seu famoso aforismo proclamando que o homem moderno havia descartado o sagrado, ele não estava celebrando; estava soando um alarme de incêndio. Nietzsche compreendeu com clareza aterrorizante que os valores morais do Ocidente — a dignidade humana, a verdade objetiva, a justiça e a caridade — estavam inextricavelmente enraizados em fundamentos bíblicos. Cortar o fruto da raiz, previu ele, levaria à ascensão de ideologias totalitárias, à exaustão cultural e ao niilismo generalizado.

O niilismo é a convicção paralisante de que a vida não possui significado supremo, propósito ou balizas morais. Como resposta, pensadores conservadores e cristãos contemporâneos estudam Nietzsche como um espelho revelador da modernidade: ele provou que o materialismo laico não consegue sustentar a ética por si só. Reconstruir o Ocidente exige rejeitar a apatia, cultivar a virtude e ancorar a família na verdade transcendente que sobrevive às tempestades culturais.`,
    audioText: `Friedrich Nietzsche and the Crisis of Nihilism: Diagnosing the Modern Moral Vacuum. Nietzsche understood with terrifying lucidity that the moral values of the West were inextricably rooted in biblical foundations. Severing the fruit from the root would lead to total nihilism. Rebuilding the West requires rejecting apathy, cultivating virtue, and anchoring the family in transcendent truth.`,
    keywords: [
      {
        word: 'nihilism',
        ipa: '/ˈnaɪ.ə.lɪz.əm/',
        pos: 'noun',
        meaningPt: 'niilismo (a crença destrutiva de que nada tem sentido, valor objetivo ou propósito supremo)',
        contextNote: 'A doença existencial da sociedade moderna ocidental diagnosticada por Nietzsche.',
        exampleEn: 'Nihilism leads to cynicism, apathy, and the collapse of family structures.',
        examplePt: 'O niilismo conduz ao cinismo, à apatia e ao colapso das estruturas familiares.'
      },
      {
        word: 'transcendent truth',
        ipa: '/trænˈsen.dənt truːθ/',
        pos: 'noun phrase',
        meaningPt: 'verdade transcendente (princípios eternos que existem além das opiniões humanas passageiras)',
        contextNote: 'A base da ordem moral clássica e cristã que fundamenta a dignidade humana.',
        exampleEn: 'Human rights are meaningless without a transcendent truth that sanctifies human life.',
        examplePt: 'Direitos humanos não têm sentido sem uma verdade transcendente que santifique a vida humana.'
      },
      {
        word: 'lucidity',
        ipa: '/luːˈsɪd.ə.t̬i/',
        pos: 'noun',
        meaningPt: 'lucidez, clareza penetrante de raciocínio',
        contextNote: 'Capacidade de enxergar as consequências inevitáveis de uma escolha cultural.',
        exampleEn: 'The philosopher diagnosed the moral decay of our century with remarkable lucidity.',
        examplePt: 'O filósofo diagnosticou a decadência moral de nosso século com notável lucidez.'
      },
      {
        word: 'inextricably',
        ipa: '/ˌɪn.ɪkˈstrɪk.ə.bli/',
        pos: 'adverb',
        meaningPt: 'inextricavelmente, de forma inseparável e profundamente entrelaçada',
        contextNote: 'Usado para enfatizar que a civilização ocidental não pode se dissociar de suas raízes espirituais.',
        exampleEn: 'Western law is inextricably tied to Judeo-Christian moral foundations.',
        examplePt: 'O direito ocidental está inextricavelmente ligado aos fundamentos morais judaico-cristãos.'
      },
      {
        word: 'amor fati',
        ipa: '/ˈɑː.mɔːr ˈfɑː.ti/',
        pos: 'latin phrase / concept',
        meaningPt: 'amor ao destino (abraçar com coragem e dignidade cada desafio da existência sem vitimismo)',
        contextNote: 'A resposta nietzschiana para transformar o sofrimento inevitável em superação e força.',
        exampleEn: 'Instead of complaining, cultivate amor fati and overcome every trial with dignity.',
        examplePt: 'Em vez de reclamar, cultive amor fati e supere cada provação com dignidade.'
      }
    ],
    takeaways: [
      {
        en: 'Nietzsche forewarned that abandoning transcendent moral foundations results in spiritual exhaustion and nihilism.',
        pt: 'Nietzsche alertou que abandonar os fundamentos morais transcendentes resulta em esgotamento espiritual e niilismo.'
      },
      {
        en: 'Secular materialism is incapable of sustaining human dignity without religious roots.',
        pt: 'O materialismo laico é incapaz de sustentar a dignidade humana sem raízes espirituais.'
      }
    ],
    quiz: [
      {
        question: 'O que Nietzsche previu que aconteceria quando a sociedade ocidental abandonasse seus fundamentos espirituais?',
        questionEn: 'What did Nietzsche predict would occur when Western society abandoned its spiritual foundations?',
        options: [
          'A ascensão do niilismo, vácuo moral e o surgimento de ideologias totalitárias destrutivas',
          'Uma era imediata de paz perfeita e fraternidade universal',
          'O fim de todas as guerras no planeta',
          'Nenhuma alteração nos costumes morais'
        ],
        correctIndex: 0,
        explanation: 'Nietzsche alertou profeticamente que sem Deus, os valores ocidentais desmoronariam em um vazio de sentido que abriria espaço para o totalitarismo.'
      },
      {
        question: 'Por que pensadores clássicos e conservadores estudam o diagnóstico de Nietzsche sobre a modernidade?',
        questionEn: 'Why do classical and conservative thinkers study Nietzsche’s diagnosis of modernity?',
        options: [
          'Porque ele provou que o secularismo materialista não consegue criar uma moral objetiva duradoura por conta própria',
          'Para concordar com o ateísmo militante',
          'Para abandonar a leitura de livros clássicos',
          'Porque ele ensinava a desistir da família'
        ],
        correctIndex: 0,
        explanation: 'Nietzsche evidenciou que se você remove os alicerces sagrados da civilização ocidental, todo o edifício da moral e da dignidade humana desaba.'
      }
    ]
  },

  // 9. CAPITALISMO & LIVRE MERCADO (ESCOLA AUSTRÍACA)
  {
    id: 'capitalism-free-enterprise',
    category: 'capitalism-liberty',
    categoryLabel: 'Capitalismo & Livre Mercado',
    categoryIcon: '💰',
    categoryColor: '#d97706',
    source: 'Ludwig von Mises Institute • Liberdade Econômica',
    readTime: '4 min read',
    publishedAt: 'Economia Política • Teoria Austríaca',
    headlineEn: 'Why Free Enterprise and Capitalism Lifted Billions Out of Poverty: The Austrian Perspective',
    headlinePt: 'Por que o Capitalismo e a Livre Iniciativa Tiraram Bilhões da Pobreza: A Visão Austríaca',
    leadSummaryEn: 'From Ludwig von Mises to Thomas Sowell, economic history proves that private property, price signals, and voluntary trade are humanity’s greatest moral and material engines of prosperity.',
    leadSummaryPt: 'De Ludwig von Mises a Thomas Sowell, a história econômica comprova que a propriedade privada, o sistema de preços e as trocas voluntárias são o maior motor moral e material de prosperidade da humanidade.',
    contentEn: `Two centuries ago, over ninety percent of the world’s population lived in extreme poverty. Today, that figure has plummeted below ten percent—not through government decrees or central planning, but through the triumph of free market capitalism and individual initiative.

As Ludwig von Mises famously explained in his magnum opus *Human Action*, the market is not a building or an institution; it is a continuous process of voluntary cooperation among individuals seeking to improve their conditions. In a free enterprise system, profits are not stolen; they are earned by serving the customer better than anyone else. Prices act as vital signals conveying scarcity, coordination, and consumer preferences across continents. When governments undermine property rights, inflate fiat currencies, and overregulate enterprise, they destroy the capital accumulation necessary for families to thrive. Defending capitalism is defending the sacred liberty to work, build wealth, and pass down an inheritance to your children's children.`,
    contentPt: `Dois séculos atrás, mais de noventa por cento da população mundial vivia em extrema pobreza. Hoje, esse índice despencou para menos de dez por cento — não por meio de decretos governamentais ou planejamento central, mas pelo triunfo do capitalismo de livre mercado e da iniciativa individual.

Como Ludwig von Mises brilhantemente explicou em sua obra-prima *Ação Humana*, o mercado não é um edifício ou uma instituição burocrática; é um processo contínuo de cooperação voluntária entre indivíduos que buscam melhorar de vida. Em um sistema de livre iniciativa, o lucro não é roubado; ele é conquistado servindo ao próximo com qualidade superior. Os preços funcionam como sinais vitais que comunicam escassez, coordenação e preferências dos consumidores pelo mundo. Quando governos violam a propriedade privada, inflacionam a moeda e asfixiam o comércio com burocracia, destroem a acumulação de capital indispensável para que as famílias prosperem. Defender o capitalismo é defender a liberdade sagrada de trabalhar, gerar riqueza e deixar herança para os filhos de seus filhos.`,
    audioText: `Why Free Enterprise and Capitalism Lifted Billions Out of Poverty. Two centuries ago, over ninety percent of the world lived in extreme poverty. Today, that figure has plummeted below ten percent through free market capitalism. In a free enterprise system, profits are earned by serving the customer. Defending capitalism is defending the sacred liberty to work, build wealth, and pass down an inheritance to your family.`,
    keywords: [
      {
        word: 'free enterprise',
        ipa: '/friː ˈen.t̬ɚ.praɪz/',
        pos: 'noun phrase',
        meaningPt: 'livre iniciativa (o direito de empreender, produzir e comercializar sem interferência estatal opressiva)',
        contextNote: 'O pilar econômico fundamental da liberdade e da prosperidade ocidental.',
        exampleEn: 'Free enterprise rewards individuals who create real value for their communities.',
        examplePt: 'A livre iniciativa recompensa os indivíduos que geram valor real para suas comunidades.'
      },
      {
        word: 'voluntary exchange',
        ipa: '/ˈvɑː.lən.ter.i ɪksˈtʃeɪndʒ/',
        pos: 'noun phrase',
        meaningPt: 'troca voluntária (quando duas partes negociam livremente e ambas saem beneficiadas)',
        contextNote: 'A essência do comércio moral: nenhuma das partes é forçada; há benefício mútuo.',
        exampleEn: 'In every voluntary exchange, both the buyer and the seller gain value.',
        examplePt: 'Em toda troca voluntária, tanto o comprador quanto o vendedor ganham valor.'
      },
      {
        word: 'spontaneous order',
        ipa: '/spɑːnˈteɪ.ni.əs ˈɔːr.dɚ/',
        pos: 'noun phrase',
        meaningPt: 'ordem espontânea (a coordenação natural e eficiente que surge da liberdade sem controle central)',
        contextNote: 'Termo célebre de Friedrich Hayek para explicar como mercados complexos se auto-organizam.',
        exampleEn: 'The price system produces a spontaneous order that no central planner could ever calculate.',
        examplePt: 'O sistema de preços produz uma ordem espontânea que nenhum burocrata central conseguiria calcular.'
      },
      {
        word: 'capital accumulation',
        ipa: '/ˈkæp.ə.t̬əl əˌkjuː.mjəˈleɪ.ʃən/',
        pos: 'noun phrase',
        meaningPt: 'acumulação de capital (poupança e investimento em ferramentas que aumentam a produtividade)',
        contextNote: 'A razão pela qual salários reais e o padrão de vida sobem em países livres.',
        exampleEn: 'Without capital accumulation and savings, a nation remains trapped in subsistence.',
        examplePt: 'Sem acumulação de capital e poupança, uma nação permanece presa na subsistência.'
      },
      {
        word: 'sound money',
        ipa: '/saʊnd ˈmʌn.i/',
        pos: 'noun phrase',
        meaningPt: 'moeda sadia, lastreada e protegida contra a inflação e a desvalorização estatal',
        contextNote: 'Princípio da Escola Austríaca de que moedas inflacionárias corroem o poder de compra da família.',
        exampleEn: 'Sound money protects the purchasing power of hard-working families against inflation.',
        examplePt: 'A moeda sadia protege o poder de compra das famílias trabalhadoras contra a inflação.'
      }
    ],
    takeaways: [
      {
        en: 'Free enterprise and private property have reduced global extreme poverty from 90% to under 10%.',
        pt: 'A livre iniciativa e a propriedade privada reduziram a extrema pobreza global de 90% para menos de 10%.'
      },
      {
        en: 'Profit in a free market is achieved through honest service to others and mutual voluntary cooperation.',
        pt: 'O lucro em um livre mercado é conquistado servindo honestamente ao próximo em cooperação voluntária mútua.'
      }
    ],
    quiz: [
      {
        question: 'Segundo a Escola Austríaca de Economia (Mises e Hayek), qual é o papel dos preços de mercado?',
        questionEn: 'According to the Austrian School of Economics, what is the role of market prices?',
        options: [
          'Agir como sinais vitais que comunicam escassez, demanda e coordenam a produção global sem burocracia central',
          'Apenas enriquecer governos através de tributação',
          'Serem tabelados por políticos em gabinetes',
          'Criar desigualdade involuntária'
        ],
        correctIndex: 0,
        explanation: 'Os preços livres transmitem informações instantâneas sobre escassez e preferências de milhões de pessoas que nenhum planejador central seria capaz de reunir.'
      },
      {
        question: 'O que permitiu à humanidade sair da miséria generalizada dos séculos passados?',
        questionEn: 'What allowed humanity to escape widespread poverty over the past two centuries?',
        options: [
          'A liberdade de mercado, respeito à propriedade privada e acumulação de capital',
          'O aumento contínuo de impostos e dívida pública',
          'A proibição do comércio internacional',
          'A impressão desenfreada de dinheiro sem lastro'
        ],
        correctIndex: 0,
        explanation: 'O capitalismo de livre iniciativa permitiu que investimentos em tecnologia, indústrias e comércio elevassem a produtividade humana em níveis históricos.'
      }
    ]
  },

  // 10. EDUCAÇÃO & HOMESCHOOLING (O TRIVIUM CLÁSSICO)
  {
    id: 'edu-homeschooling-trivium',
    category: 'homeschooling-education',
    categoryLabel: 'Educação & Homeschooling',
    categoryIcon: '📚',
    categoryColor: '#059669',
    source: 'Classical Education & Homeschool Legal Defense',
    readTime: '4 min read',
    publishedAt: 'Educação Domiciliar • Família & Formação',
    headlineEn: 'The Classical Homeschooling Renaissance: Restoring Academic Rigor and the Classical Trivium',
    headlinePt: 'O Renascimento do Homeschooling Clássico: Restaurando o Rigor Acadêmico e o Trivium Clássico',
    leadSummaryEn: 'Faced with ideological indoctrination and declining academic standards in traditional schools, millions of families are choosing homeschooling to restore excellence, virtue, and parental authority.',
    leadSummaryPt: 'Diante da doutrinação ideológica e da queda de padrões acadêmicos nas escolas convencionais, milhões de famílias estão escolhendo a educação domiciliar para resgatar a excelência, a virtude e a autoridade dos pais.',
    contentEn: `Homeschooling is no longer an eccentric fringe movement; it is a full-fledged educational renaissance. In the United States, Europe, and increasingly across Brazil, millions of parents have reclaimed primary responsibility for their children’s minds and souls. Rather than delegating moral formation to state bureaucracy, homeschooling families build customized learning environments rooted in classical wisdom.

At the heart of the most successful homeschooling models lies the classical Trivium—an educational framework structured around three developmental stages:
1. Grammar (the foundation of facts, phonics, rich vocabulary, and memory);
2. Logic (the capacity to analyze arguments, detect fallacies, and discern truth);
3. Rhetoric (the art of eloquent, persuasive communication of truth with grace).

Standardized testing repeatedly reveals that homeschooled children score between 15 and 30 percentile points higher than their traditionally schooled peers, regardless of parental income. More importantly, homeschooling creates unshakable parent-child bonds, shields young minds from toxic peer pressure, and restores the sacred calling of the Christian home as the preeminent school of character.`,
    contentPt: `A educação domiciliar (homeschooling) já não é mais um movimento marginal ou exótico; é um autêntico renascimento educacional. Nos Estados Unidos, na Europa e crescentemente no Brasil, milhões de pais retomaram a responsabilidade primordial sobre a mente e o espírito de seus filhos. Em vez de terceirizar a formação moral para a burocracia estatal, famílias que educam em casa constroem ambientes de aprendizado personalizados ancorados na sabedoria clássica.

No cerne dos modelos de maior sucesso está o Trivium clássico — uma metodologia estruturada em três fases do desenvolvimento intelectual:
1. Gramática (a base de fatos, consciência fonêmica, vocabulário rico e memorização);
2. Lógica (a capacidade de analisar argumentos, detectar falácias e discernir a verdade);
3. Retórica (a arte de comunicar a verdade com eloquência, persuasão e graça).

Avaliações acadêmicas padronizadas revelam repetidamente que alunos educados em casa pontuam de 15 a 30 pontos percentuais acima de seus pares em escolas convencionais, independentemente da renda familiar. Mais do que notas, o homeschooling constrói laços familiares inquebráveis, blinda as crianças de pressões destrutivas de colegas e resgata o chamado sagrado do lar cristão como a principal escola de caráter.`,
    audioText: `The Homeschooling Renaissance: Restoring Academic Rigor and the Classical Trivium. Homeschooling is a full-fledged educational renaissance. Parents have reclaimed primary responsibility for their children's minds. At the heart of this movement is the classical Trivium: Grammar, Logic, and Rhetoric. Homeschooled children consistently outperform traditional schools while cultivating strong character and faith.`,
    keywords: [
      {
        word: 'homeschooling',
        ipa: '/ˈhoʊm.skuː.lɪŋ/',
        pos: 'noun',
        meaningPt: 'educação domiciliar (ensino ministrado pela própria família no ambiente do lar)',
        contextNote: 'O modelo de educação mais antigo da história da civilização humana.',
        exampleEn: 'Homeschooling allows parents to tailor the curriculum to their child’s unique pace and gifts.',
        examplePt: 'O homeschooling permite aos pais adaptar o currículo ao ritmo e aos dons únicos de seus filhos.'
      },
      {
        word: 'the Trivium',
        ipa: '/ðə ˈtrɪv.i.əm/',
        pos: 'proper noun phrase',
        meaningPt: 'o Trivium (as três artes liberais da linguagem: Gramática, Lógica e Retórica)',
        contextNote: 'O método clássico medieval que ensina a criança a pensar com clareza e falar com poder.',
        exampleEn: 'Mastering the Trivium equips students to learn any subject independently throughout life.',
        examplePt: 'Dominar o Trivium capacita o estudante a aprender qualquer matéria de forma autônoma por toda a vida.'
      },
      {
        word: 'parental authority',
        ipa: '/pəˈren.t̬əl əˈθɔːr.ə.t̬i/',
        pos: 'noun phrase',
        meaningPt: 'autoridade e soberania dos pais (o direito e dever sagrado de guiar a educação dos próprios filhos)',
        contextNote: 'Reconhecido no direito natural e em tratados internacionais de direitos humanos.',
        exampleEn: 'God entrusted parental authority directly to mothers and fathers, not the government.',
        examplePt: 'Deus confiou a autoridade parental diretamente a pais e mães, e não ao governo.'
      },
      {
        word: 'phonics',
        ipa: '/ˈfɑː.nɪks/',
        pos: 'noun',
        meaningPt: 'método fônico (ensino da leitura associando os sons das letras às suas grafias)',
        contextNote: 'O padrão ouro de alfabetização comprovado pela neurociência e pela tradição clássica.',
        exampleEn: 'Systematic phonics instruction enables early readers to decode complex vocabulary effortlessly.',
        examplePt: 'A instrução fônica sistemática capacita os leitores iniciantes a decodificar vocabulário complexo sem esforço.'
      },
      {
        word: 'rhetoric',
        ipa: '/ˈret̬.ɚ.ɪk/',
        pos: 'noun',
        meaningPt: 'retórica (a arte da expressão clara, persuasiva e virtuosa da verdade em público)',
        contextNote: 'O estágio culminante do Trivium clássico.',
        exampleEn: 'Rhetoric trains young leaders to defend their faith and articulate ideas with eloquence.',
        examplePt: 'A retórica treina jovens líderes a defenderem sua fé e articularem ideias com eloquência.'
      }
    ],
    takeaways: [
      {
        en: 'The classical Trivium teaches children how to think critically and express truth, not merely what to memorize.',
        pt: 'O Trivium clássico ensina as crianças a pensarem criticamente e expressarem a verdade, e não apenas o que memorizar.'
      },
      {
        en: 'Homeschooled students consistently achieve superior academic results and demonstrate emotional maturity.',
        pt: 'Estudantes educados em casa obtêm consistentemente resultados acadêmicos superiores e maturidade emocional.'
      }
    ],
    quiz: [
      {
        question: 'Quais são as três etapas que compõem o Trivium na educação clássica?',
        questionEn: 'What are the three stages that comprise the classical Trivium?',
        options: [
          'Gramática (fundamentos e fatos), Lógica (raciocínio crítico) e Retórica (eloquência e persuasão)',
          'Futebol, Natação e Ginástica',
          'Mídias sociais, Jogos e Televisão',
          'Biologia, Química e Física'
        ],
        correctIndex: 0,
        explanation: 'O Trivium clássico estrutura o aprendizado em Gramática (conhecimento da linguagem), Lógica (organização do raciocínio) e Retórica (expressão virtuosa da verdade).'
      },
      {
        question: 'Por que o homeschooling tem crescido rapidamente entre famílias cristãs e conservadoras?',
        questionEn: 'Why has homeschooling grown rapidly among Christian and conservative families?',
        options: [
          'Porque permite blindar os filhos contra doutrinação ideológica e oferece excelência acadêmica e moral superior',
          'Porque as famílias não querem que os filhos aprendam a ler',
          'Para que as crianças fiquem apenas jogando videogame',
          'Por determinação de governos estatais'
        ],
        correctIndex: 0,
        explanation: 'O homeschooling devolve aos pais o protagonismo na formação do caráter, fé e excelência intelectual de seus filhos.'
      }
    ]
  },

  // 11. EDUCAÇÃO & FORMAÇÃO DE FILHOS (COMO EDUCAR SEUS FILHOS)
  {
    id: 'edu-raising-strong-children',
    category: 'homeschooling-education',
    categoryLabel: 'Educação & Homeschooling',
    categoryIcon: '📚',
    categoryColor: '#059669',
    source: 'Brasil Paralelo Família & Tradição Educacional',
    readTime: '4 min read',
    publishedAt: 'Pedagogia Clássica • Formação do Caráter',
    headlineEn: 'How to Educate Your Children: Cultivating Noble Habits, Virtue, and Moral Imagination at Home',
    headlinePt: 'Como Educar Seus Filhos: Cultivando Hábitos Nobres, Virtude e Imaginário Moral no Lar',
    leadSummaryEn: 'Modern educational psychology often reduces children to cognitive test machines. Classical family education focuses on cultivating virtues, love for the good and beautiful, and noble habits.',
    leadSummaryPt: 'A psicologia educacional moderna frequentemente reduz a criança a uma máquina de testes cognitivos. A educação familiar clássica foca em forjar virtudes, o amor pelo belo e hábitos nobres de honra.',
    contentEn: `In their acclaimed documentary series on family education, commentators at Brasil Paralelo emphasize a timeless truth: education is not mere technical training for a job market; it is the spiritual and moral formation of a human soul. As British educator Charlotte Mason taught, "Education is an atmosphere, a discipline, a life."

Parents who desire to raise courageous, faithful, and intellectually sharp children must focus on three core pillars:
1. Guarding the gates of the senses: replacing screen addiction and digital dopamine with "living books"—masterpieces of history, biography, mythology, and scripture that portray noble sacrifice;
2. Habit training: forming foundational virtues of obedience, order, honesty, and diligence before the age of seven, so doing what is right becomes second nature;
3. Exemplary modeling: children rarely listen to lectures, but they never fail to imitate who their parents genuinely are. When parents read passionately, pray with reverence, and love each other visibly, children naturally inherit the high culture of the home.`,
    contentPt: `Em suas aclamadas séries documentais sobre educação e família, pesquisadores do Brasil Paralelo enfatizam uma verdade milenar: educar não é mero treinamento técnico para o mercado de trabalho; é a formação espiritual e moral da alma humana. Como ensinava a educadora britânica Charlotte Mason: "A educação é uma atmosfera, uma disciplina e uma vida."

Pais que desejam criar filhos corajosos, tementes a Deus e intelectualmente brilhantes devem focar em três pilares indispensáveis:
1. A guarda dos sentidos: substituir o vício em telas e a dopamina digital por "livros vivos" (living books) — clássicos da história, biografias, fábulas e as Escrituras que ilustram o heroísmo e o sacrifício moral;
2. A formação de hábitos: inculcar virtudes de obediência imediata, ordem, honestidade e diligência antes dos sete anos, para que fazer o bem se torne uma segunda natureza;
3. O exemplo vivo dos pais: as crianças raramente ouvem sermões longos, mas nunca falham em imitar quem os pais realmente são. Quando pai e mãe leem com entusiasmo, oram com reverência e se amam com visibilidade, os filhos herdam naturalmente a alta cultura do lar.`,
    audioText: `How to Educate Your Children: Cultivating Noble Habits, Virtue, and Moral Imagination. Education is not mere technical training; it is the spiritual formation of a human soul. Guard the gates of the senses by replacing screens with living books. Inculcate foundational habits of diligence, honesty, and obedience. Children imitate who parents genuinely are.`,
    keywords: [
      {
        word: 'living books',
        ipa: '/ˈlɪv.ɪŋ bʊks/',
        pos: 'noun phrase',
        meaningPt: 'livros vivos (obras escritas com paixão por autores que amam o assunto, cheias de ideias nobres e imaginação)',
        contextNote: 'Termo cunhado por Charlotte Mason em oposição aos manuais escolares secos e enfadonhos.',
        exampleEn: 'Reading living books inspires a child’s love for reading far more than dry textbooks.',
        examplePt: 'Ler livros vivos inspira o amor da criança pela leitura muito mais do que manuais escolares áridos.'
      },
      {
        word: 'habit training',
        ipa: '/ˈhæb.ɪt ˈtreɪ.nɪŋ/',
        pos: 'noun phrase',
        meaningPt: 'treinamento de hábitos (a prática constante de virtudes diárias até se tornarem automáticas)',
        contextNote: 'Mason dizia que um bom hábito é como um trilho de trem que facilita a jornada da vida moral.',
        exampleEn: 'Consistent habit training in early childhood lays the foundation for lifelong discipline.',
        examplePt: 'O treino constante de hábitos na primeira infância lança as bases para a disciplina por toda a vida.'
      },
      {
        word: 'discipleship',
        ipa: '/dɪˈsaɪ.pəl.ʃɪp/',
        pos: 'noun',
        meaningPt: 'discipulado (o ato de ensinar pela convivência, pelo exemplo e pela transmissão de valores espirituais)',
        contextNote: 'O mandamento bíblico de Deuteronômio 6 aplicado à rotina familiar diária.',
        exampleEn: 'Christian parenting is essentially intentional spiritual discipleship in the home.',
        examplePt: 'A paternidade cristã é essencialmente um discipulado espiritual intencional no lar.'
      },
      {
        word: 'noble',
        ipa: '/ˈnoʊ.bəl/',
        pos: 'adjective',
        meaningPt: 'nobre, elevado, digno de honra e admiração',
        contextNote: 'Usado para qualificar caráter, virtudes e aspirações elevadas da alma.',
        exampleEn: 'We must inspire our children to pursue noble ideals instead of vulgar trends.',
        examplePt: 'Devemos inspirar nossos filhos a perseguirem ideais nobres em vez de modismos vulgares.'
      },
      {
        word: 'second nature',
        ipa: '/ˈsek.ənd ˈneɪ.tʃɚ/',
        pos: 'idiom / noun phrase',
        meaningPt: 'segunda natureza (uma virtude tão praticada que passa a ser executada com naturalidade e espontaneidade)',
        contextNote: 'A definição aristotélica de virtude moral.',
        exampleEn: 'Through patient repetition, kindness and order become second nature to a child.',
        examplePt: 'Por meio da repetição paciente, a bondade e a ordem tornam-se uma segunda natureza para a criança.'
      }
    ],
    takeaways: [
      {
        en: 'True education shapes the moral and spiritual soul, not merely job qualifications.',
        pt: 'A verdadeira educação molda a alma moral e espiritual, e não apenas qualificações de trabalho.'
      },
      {
        en: 'Nourishing children with living books and living examples builds enduring character.',
        pt: 'Nutrir as crianças com livros vivos e exemplos vivos constrói um caráter inabalável.'
      }
    ],
    quiz: [
      {
        question: 'Segundo Charlotte Mason e a tradição clássica, o que são "living books" (livros vivos)?',
        questionEn: 'According to Charlotte Mason and the classical tradition, what are "living books"?',
        options: [
          'Livros bem escritos, com linguagem rica e histórias que tocam a alma e inspiram nobreza moral',
          'Apostilas resumidas para memorizar antes de provas',
          'Manuais técnicos cheios de termos burocráticos',
          'Revistas de fofoca'
        ],
        correctIndex: 0,
        explanation: 'Livros vivos são obras literárias ricas, que despertam a imaginação e ensinam grandes verdades através da narrativa e da beleza.'
      },
      {
        question: 'Qual é o meio mais eficaz de transmitir virtudes e honra aos filhos segundo os especialistas?',
        questionEn: 'What is the most effective way to transmit virtue and honor to children according to experts?',
        options: [
          'O exemplo prático diário dos pais vivendo com amor, reverência e integridade no lar',
          'Deixar a criança na frente de telas e celulares o dia todo',
          'Apenas dar broncas quando a criança errar',
          'Contratar professores particulares para ensinar tudo'
        ],
        correctIndex: 0,
        explanation: 'As crianças aprendem prioritariamente por imitação: o testemunho visível do amor, oração e integridade dos pais é o alicerce moral mais forte que existe.'
      }
    ]
  },
  // 12. ECONOMIA: BRASIL & EXTERIOR
  {
    id: 'economy-brazil-agribusiness-markets',
    category: 'economy',
    categoryLabel: 'Economia (Brasil & Exterior)',
    categoryIcon: '📈',
    categoryColor: '#10b981',
    source: 'Financial Times • Brasil & Americas',
    readTime: '4 min read',
    publishedAt: 'Hoje • Brasil & Mercados Globais',
    headlineEn: "Brazil's Agribusiness Surge, Copom Interest Rate Policy, and the Global Currency Equation",
    headlinePt: 'O Avanço do Agronegócio Brasileiro, a Taxa Selic do Copom e a Equação Cambial Global',
    leadSummaryEn: "As Brazil strengthens its status as a premier global agricultural powerhouse, domestic policymakers balance fiscal challenges and interest rate spreads against international commodity demand.",
    leadSummaryPt: 'À medida que o Brasil consolida seu papel como um dos maiores celeiros do planeta, formuladores de políticas equilibram desafios fiscais e a taxa de juros com a demanda internacional por commodities.',
    contentEn: `Brazil's economic performance in global commerce illustrates the profound connection between domestic productivity and international capital markets. Supported by cutting-edge agricultural technology, record-setting soybean harvests, and booming livestock exports, the nation continues to generate substantial foreign exchange reserves. Brazilian agribusiness ("o agro") feeds over one billion people worldwide, anchoring the country's trade balance and cementing its indispensable role in global food security.

Simultaneously, the Central Bank of Brazil (Banco Central) and its Monetary Policy Committee (Copom) must navigate volatile macroeconomic forces. Controlling domestic inflation requires managing the benchmark Selic interest rate while monitoring the Federal Reserve's policy in Washington. When foreign interest rates fluctuate, capital flows can swiftly trigger currency devaluations, making imported goods costlier. Brazilian executives and global traders recognize that sustained economic growth demands relentless fiscal discipline, legal certainty, and open trade corridors with both the Americas and emerging Asian economies.`,
    contentPt: `O desempenho econômico do Brasil no comércio global ilustra a profunda ligação entre a produtividade doméstica e os mercados de capitais internacionais. Respaldado por tecnologia agrícola de ponta, safras recordes de soja e uma forte expansão nas exportações de carnes, o país continua gerando substanciais reservas cambiais. O agronegócio brasileiro abastece mais de um bilhão de pessoas no mundo, ancorando a balança comercial e consolidando um papel indispensável na segurança alimentar do planeta.

Simultaneamente, o Banco Central do Brasil e seu Comitê de Política Monetária (Copom) precisam navegar forças macroeconômicas voláteis. Controlar a inflação doméstica exige calibrar a taxa básica Selic enquanto se acompanha de perto as decisões de juros do Federal Reserve em Washington. Quando as taxas de juros externas oscilam, os fluxos de capital podem rapidamente desvalorizar a moeda nacional, encarecendo produtos importados. Empresários brasileiros e investidores globais reconhecem que o crescimento sustentável requer disciplina fiscal rigorosa, segurança jurídica e corredores de comércio abertos tanto com as Américas quanto com as economias emergentes da Ásia.`,
    audioText: `Brazil's Agribusiness Surge, Copom Interest Rate Policy, and the Global Currency Equation. Supported by cutting-edge agricultural technology, the nation continues to generate substantial foreign exchange reserves. Controlling domestic inflation requires managing the benchmark Selic rate while monitoring the Federal Reserve.`,
    keywords: [
      {
        word: 'agribusiness',
        ipa: '/ˈæɡ.rəˌbɪz.nɪs/',
        pos: 'noun',
        meaningPt: 'agronegócio, cadeia produtiva e industrial agropecuária',
        contextNote: 'O principal motor exportador e gerador de superávit cambial do Brasil.',
        exampleEn: 'Brazilian agribusiness drives rural economic development and infrastructure investment.',
        examplePt: 'O agronegócio brasileiro impulsiona o desenvolvimento econômico rural e investimentos em infraestrutura.'
      },
      {
        word: 'trade balance',
        ipa: '/treɪd ˈbæl.əns/',
        pos: 'noun phrase',
        meaningPt: 'balança comercial (diferença entre exportações e importações de um país)',
        contextNote: 'Termo central de comércio internacional.',
        exampleEn: 'A positive trade balance strengthens national foreign currency reserves.',
        examplePt: 'Uma balança comercial positiva fortalece as reservas em moeda estrangeira da nação.'
      },
      {
        word: 'benchmark interest rate',
        ipa: '/ˈbentʃ.mɑːrk ˈɪn.trɪst reɪt/',
        pos: 'noun phrase',
        meaningPt: 'taxa básica de juros (como a Selic no Brasil ou os Fed Funds nos EUA)',
        contextNote: 'A taxa que orienta todo o custo do crédito e combate à inflação na economia.',
        exampleEn: 'Copom sets the benchmark interest rate to steer inflation toward official targets.',
        examplePt: 'O Copom define a taxa básica de juros para direcionar a inflação rumo às metas oficiais.'
      },
      {
        word: 'foreign exchange reserves',
        ipa: '/ˈfɔːr.ən ɪksˈtʃeɪndʒ rɪˈzɝːvz/',
        pos: 'noun phrase',
        meaningPt: 'reservas cambiais (moedas estrangeiras guardadas pelo Banco Central)',
        contextNote: 'O colchão de liquidez que protege o país contra crises financeiras externas.',
        exampleEn: 'Substantial foreign exchange reserves shield the economy from speculative currency attacks.',
        examplePt: 'Reservas cambiais substanciais protegem a economia contra ataques especulativos à moeda.'
      },
      {
        word: 'fiscal discipline',
        ipa: '/ˈfɪs.kəl ˈdɪs.ə.plɪn/',
        pos: 'noun phrase',
        meaningPt: 'disciplina fiscal (equilíbrio responsável entre receitas e gastos do governo)',
        contextNote: 'Condição indispensável para conter a dívida pública e atrair investimentos privados.',
        exampleEn: 'Long-term prosperity requires unyielding fiscal discipline and low government waste.',
        examplePt: 'A prosperidade de longo prazo requer disciplina fiscal inegociável e baixo desperdício governamental.'
      }
    ],
    takeaways: [
      {
        en: "Brazil's agricultural capacity plays an indispensable role in international food security and export revenues.",
        pt: 'A capacidade agrícola do Brasil desempenha um papel indispensável na segurança alimentar internacional e nas receitas de exportação.'
      },
      {
        en: 'Domestic interest rates and currency stability are inextricably tied to global monetary policies like the Federal Reserve.',
        pt: 'As taxas de juros domésticas e a estabilidade da moeda estão intrinsecamente ligadas a políticas monetárias globais como as do Federal Reserve.'
      }
    ],
    quiz: [
      {
        question: 'Por que o agronegócio é considerado a espinha dorsal do comércio exterior brasileiro?',
        questionEn: 'Why is agribusiness considered the backbone of Brazilian foreign trade?',
        options: [
          'Porque produz safras recordes que geram superávit na balança comercial e alimentam mais de 1 bilhão de pessoas no mundo',
          'Porque o Brasil só consome alimentos importados',
          'Porque a agricultura não utiliza nenhuma tecnologia',
          'Porque não gera empregos no interior'
        ],
        correctIndex: 0,
        explanation: 'O agronegócio brasileiro é altamente tecnificado, gerando safras históricas de soja, milho e carnes que garantem reservas cambiais e sustentam a balança comercial.'
      },
      {
        question: 'O que o Banco Central do Brasil (Copom) deve monitorar ao definir a taxa Selic?',
        questionEn: 'What must the Central Bank of Brazil (Copom) monitor when setting the Selic rate?',
        options: [
          'A inflação doméstica, as contas públicas e as taxas de juros do Federal Reserve americano',
          'Apenas o clima da semana seguinte',
          'Nenhum indicador econômico',
          'Apenas o resultado do futebol'
        ],
        correctIndex: 0,
        explanation: 'Para preservar o poder de compra do Real e atrair investimentos, o Copom precisa equilibrar a inflação local com o cenário de juros internacionais dos EUA e a responsabilidade fiscal.'
      }
    ]
  },
  // 13. POLÍTICA: BRASIL & EXTERIOR
  {
    id: 'politics-brazil-institutions-diplomacy',
    category: 'politics',
    categoryLabel: 'Política (Brasil & Exterior)',
    categoryIcon: '🏛️',
    categoryColor: '#6366f1',
    source: 'The Wall Street Journal • Latin America Dispatch',
    readTime: '4 min read',
    publishedAt: 'Hoje • Política & Geopolítica',
    headlineEn: "Brazil's Institutional Balance: National Congress, Domestic Reforms, and Global Diplomatic Strategy",
    headlinePt: 'O Equilíbrio Institucional Brasileiro: Congresso Nacional, Reformas Internas e Estratégia Diplomática Global',
    leadSummaryEn: "The constitutional balance of powers within the Brazilian republic shapes domestic regulatory reform while diplomatic leadership negotiates critical alliances with global powers.",
    leadSummaryPt: 'O equilíbrio constitucional de poderes na república brasileira molda as reformas regulatórias internas enquanto a liderança diplomática negocia alianças estratégicas com potências mundiais.',
    contentEn: `In Brasília, political life is defined by the rigorous contest of ideas between the National Congress, the executive branch, and the constitutional judiciary. Lawmakers in the Senate and Chamber of Deputies play a vital role in drafting tax overhauls, administrative simplifications, and business deregulation laws. Preserving the classical doctrine of "checks and balances" remains central to public discourse, as legal scholars and civic leaders emphasize that institutional predictability and freedom of expression are the true bedrock of national stability.

Beyond its borders ("pra fora"), Brazil's foreign policy commands substantial geopolitical weight. As the leading democracy in South America, the country continually calibrates its bilateral relations with traditional partners in the United States and Europe alongside expanding commercial ties across Asia and the Middle East. Seasoned diplomats argue that national sovereignty must guide every treaty: upholding the nation's democratic values, protecting vital trade interests, and asserting constructive leadership on the world stage without compromising national independence.`,
    contentPt: `Em Brasília, a vida política é definida pela dinâmica e pelo debate intenso de ideias entre o Congresso Nacional, o Poder Executivo e a Suprema Corte. Parlamentares no Senado Federal e na Câmara dos Deputados desempenham um papel decisivo na condução de reformas tributárias, simplificações administrativas e leis de desregulamentação da atividade econômica. Preservar a doutrina clássica de "freios e contrapesos" (checks and balances) permanece no centro do debate público, com juristas e líderes cívicos destacando que a previsibilidade institucional e a liberdade de expressão são os verdadeiros pilares da estabilidade da nação.

Para além das fronteiras ("pra fora"), a política externa brasileira carrega considerável peso geopolítico. Como a maior democracia da América do Sul, o país calibra continuamente suas relações bilaterais com parceiros tradicionais nos Estados Unidos e na Europa, ao mesmo tempo em que expande laços comerciais na Ásia e no Oriente Médio. Diplomatas experientes sustentam que a soberania nacional deve nortear cada tratado: defendendo os valores democráticos da nação, protegendo interesses comerciais estratégicos e exercendo liderança construtiva no cenário internacional sem abrir mão da independência do país.`,
    audioText: `Brazil's Institutional Balance: National Congress, Domestic Reforms, and Global Diplomatic Strategy. Preserving the classical doctrine of checks and balances remains central to public discourse. Beyond its borders, Brazil's foreign policy commands substantial geopolitical weight.`,
    keywords: [
      {
        word: 'checks and balances',
        ipa: '/tʃeks ænd ˈbæl.ən.sɪz/',
        pos: 'noun phrase',
        meaningPt: 'freios e contrapesos (sistema constitucional em que cada poder fiscaliza e limita o outro)',
        contextNote: 'Princípio político fundamental estabelecido por Montesquieu para evitar abusos de poder.',
        exampleEn: 'A healthy republic relies on robust checks and balances between the branches of government.',
        examplePt: 'Uma república saudável apoia-se em freios e contrapesos robustos entre os poderes de governo.'
      },
      {
        word: 'National Congress',
        ipa: '/ˈnæʃ.ən.əl ˈkɑːŋ.ɡrəs/',
        pos: 'noun phrase',
        meaningPt: 'Congresso Nacional (o poder legislativo composto pela Câmara dos Deputados e Senado)',
        contextNote: 'Onde as leis e reformas estruturantes do país são votadas.',
        exampleEn: 'The National Congress debated the new tax reform to simplify state commerce.',
        examplePt: 'O Congresso Nacional debateu a nova reforma tributária para simplificar o comércio interestadual.'
      },
      {
        word: 'national sovereignty',
        ipa: '/ˈnæʃ.ən.əl ˈsɑːv.rən.t̬i/',
        pos: 'noun phrase',
        meaningPt: 'soberania nacional (o direito e autoridade suprema do povo governar a si próprio)',
        contextNote: 'Conceito inegociável na condução da diplomacia internacional.',
        exampleEn: 'Foreign agreements must respect national sovereignty and constitutional boundaries.',
        examplePt: 'Acordos externos devem respeitar a soberania nacional e os limites constitucionais.'
      },
      {
        word: 'bilateral relations',
        ipa: '/baɪˈlæt̬.ɚ.əl rɪˈleɪ.ʃənz/',
        pos: 'noun phrase',
        meaningPt: 'relações bilaterais (tratados e diálogos diplomáticos diretos entre dois países)',
        contextNote: 'Usado para acordos comerciais diretos de exportação e cooperação.',
        exampleEn: 'Strengthening bilateral relations opens new export markets for manufactured goods.',
        examplePt: 'Fortalecer relações bilaterais abre novos mercados de exportação para bens manufaturados.'
      },
      {
        word: 'deregulation',
        ipa: '/diːˌreɡ.jəˈleɪ.ʃən/',
        pos: 'noun',
        meaningPt: 'desregulamentação (eliminação de regras excessivas que travam a livre iniciativa)',
        contextNote: 'Prática defendida para atrair capitais e aumentar a eficiência dos negócios.',
        exampleEn: 'Economic deregulation empowers entrepreneurs to launch new businesses quickly.',
        examplePt: 'A desregulamentação econômica capacita empreendedores a iniciarem novas empresas com agilidade.'
      }
    ],
    takeaways: [
      {
        en: 'The constitutional doctrine of checks and balances protects citizen freedoms and creates investment predictability.',
        pt: 'A doutrina constitucional de freios e contrapesos protege as liberdades dos cidadãos e cria previsibilidade para investimentos.'
      },
      {
        en: "Brazil's foreign diplomacy must assertively champion national sovereignty and commercial independence.",
        pt: 'A diplomacia externa do Brasil deve defender de forma assertiva a soberania nacional e a independência comercial.'
      }
    ],
    quiz: [
      {
        question: 'Qual é o papel fundamental do princípio de "checks and balances" (freios e contrapesos)?',
        questionEn: 'What is the fundamental role of the "checks and balances" principle?',
        options: [
          'Garantir que nenhum poder se sobreponha aos demais, preservando as liberdades e a estabilidade constitucional',
          'Eliminar as leis do país',
          'Permitir que um único governante tome todas as decisões sem controle',
          'Apenas organizar o orçamento anual'
        ],
        correctIndex: 0,
        explanation: 'Os freios e contrapesos garantem a independência e a harmonia entre o Legislativo, o Executivo e o Judiciário, impedindo tiranias e arbitrariedades.'
      },
      {
        question: 'O que deve nortear a política externa do Brasil no cenário internacional?',
        questionEn: "What should guide Brazil's foreign policy on the international stage?",
        options: [
          'A soberania nacional, a defesa dos interesses do povo brasileiro e a cooperação comercial vantajosa',
          'A submissão cega a qualquer determinação externa',
          'O fechamento total das fronteiras comerciais',
          'A renúncia aos tratados bilaterais'
        ],
        correctIndex: 0,
        explanation: 'A soberania nacional e os interesses estratégicos de prosperidade da população brasileira devem sempre ser a bússola das relações exteriores do país.'
      }
    ]
  }
];
