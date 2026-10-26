// Base de Notícias Bilíngues Reais e Artigos de Alto Nível para Aprendizado de Inglês
// Categorias: Tecnologia, Cibersegurança, Política, Economia, Bolsa de Valores, Desenvolvimento Pessoal

export const NEWS_CATEGORIES = [
  { id: 'all', label: 'Todas as Notícias', icon: '🌐', color: '#6366f1' },
  { id: 'technology', label: 'Tecnologia', icon: '💻', color: '#3b82f6' },
  { id: 'cybersecurity', label: 'Cibersegurança', icon: '🛡️', color: '#ef4444' },
  { id: 'politics', label: 'Política & Geopolítica', icon: '🏛️', color: '#8b5cf6' },
  { id: 'economy', label: 'Economia Global', icon: '📈', color: '#10b981' },
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
  }
];
