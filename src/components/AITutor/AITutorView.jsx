import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Volume2, 
  Sparkles, 
  HelpCircle, 
  Settings, 
  MessageSquare,
  BookOpen,
  Heart,
  Plane,
  Shield,
  Coffee,
  Compass,
  Users,
  Lightbulb,
  Shuffle,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { askAITutor } from '../../services/geminiService';
import { speechService } from '../../services/speechService';
import { useUser } from '../../context/UserContext';

// Curated facts on Brazilian politics, powers, economy and finance
const DID_YOU_KNOW_FACTS = [
  {
    id: 'selic-copom',
    category: 'financas',
    categoryLabel: 'Finanças & Moeda',
    categoryIcon: '💰',
    color: '#10b981',
    title: 'O que é a Taxa Selic e como o Copom decide os juros?',
    textPt: 'A Selic é a taxa básica de juros da economia brasileira, fixada a cada 45 dias pelo Copom (Banco Central). Quando a Selic sobe, o crédito encarece e o consumo desacelera para frear a inflação. Quando cai, barateia empréstimos e estimula investimentos. Na visão da Escola Austríaca (Mises e Hayek), os juros refletem a preferência temporal das pessoas e governos não devem manipulá-los artificialmente.',
    englishTerm: 'Benchmark Interest Rate',
    ipa: '/ˈbentʃ.mɑːrk ˈɪn.trɪst reɪt/',
    termMeaning: 'Taxa básica de juros de referência da economia',
    exampleEn: 'Copom sets the benchmark interest rate to control monetary inflation.',
    examplePt: 'O Copom define a taxa básica de juros para controlar a inflação monetária.',
    prompt: 'Grace, me ensine termos financeiros em inglês sobre a Taxa Selic, o Copom e como decisões de juros afetam o orçamento de uma família.'
  },
  {
    id: 'tres-poderes',
    category: 'poderes',
    categoryLabel: 'Os Três Poderes',
    categoryIcon: '⚖️',
    color: '#6366f1',
    title: 'Como funciona a divisão dos Três Poderes e os freios e contrapesos no Brasil?',
    textPt: 'A Constituição divide a República em três poderes independentes e harmônicos: o Legislativo (Câmara e Senado criam leis e fiscalizam gastos), o Executivo (Presidência administra o governo) e o Judiciário (STF e tribunais aplicam a lei). O princípio clássico de Montesquieu de freios e contrapesos (checks and balances) existe para evitar que um poder usurpe as funções do outro ou se torne tirânico.',
    englishTerm: 'Checks and Balances',
    ipa: '/tʃeks ænd ˈbæl.ən.sɪz/',
    termMeaning: 'Sistema constitucional de freios e contrapesos',
    exampleEn: 'The doctrine of checks and balances prevents tyrannical concentration of power.',
    examplePt: 'A doutrina de freios e contrapesos impede a concentração tirânica de poder.',
    prompt: 'Grace, como explicar em inglês o sistema republicano de freios e contrapesos (checks and balances) e a separação dos três poderes?'
  },
  {
    id: 'agro-superavit',
    category: 'economia',
    categoryLabel: 'Economia Brasileira',
    categoryIcon: '📈',
    color: '#d97706',
    title: 'Por que o Agronegócio sustenta as contas externas do Brasil?',
    textPt: 'O agronegócio brasileiro é um dos mais produtivos e tecnológicos do planeta, respondendo por quase 50% de todas as exportações do país. Ao exportar safras históricas de soja, milho e carnes para a Ásia, Europa e Américas, o setor injeta bilhões de dólares no Brasil, gerando superávits na balança comercial e sustentando as reservas internacionais do Banco Central.',
    englishTerm: 'Trade Surplus',
    ipa: '/treɪd ˈsɝː.pləs/',
    termMeaning: 'Superávit na balança comercial (exportações > importações)',
    exampleEn: 'A strong agricultural trade surplus bolsters foreign currency reserves.',
    examplePt: 'Um forte superávit comercial no agronegócio fortalece as reservas em moeda estrangeira.'
    ,prompt: 'Grace, me ensine termos em inglês sobre o agronegócio brasileiro e seu papel estratégico no comércio internacional.'
  },
  {
    id: 'congresso-orcamento',
    category: 'politica',
    categoryLabel: 'Política Brasileira',
    categoryIcon: '🏛️',
    color: '#8b5cf6',
    title: 'Quem realmente tem a palavra final sobre o dinheiro público no Brasil?',
    textPt: 'Embora o Executivo elabore a proposta do orçamento anual (LOA), quem tem a autoridade constitucional de aprovar, modificar, cortar gastos e autorizar impostos é o Congresso Nacional (deputados e senadores). Nenhum imposto novo ou despesa pública pode ser cobrado do povo sem autorização expressa do parlamento.',
    englishTerm: 'Power of the Purse',
    ipa: '/ˈpaʊ.ɚ əv ðə pɝːs/',
    termMeaning: 'Autoridade parlamentar sobre o orçamento e gastos públicos',
    exampleEn: 'Congress exercises the power of the purse to hold state spending accountable.',
    examplePt: 'O Congresso exerce a autoridade do orçamento para fiscalizar os gastos estatais.',
    prompt: 'Grace, como explicar em inglês a aprovação do orçamento público e o papel fiscalizador do Congresso Nacional?'
  },
  {
    id: 'juros-reais-vs-nominais',
    category: 'financas',
    categoryLabel: 'Finanças & Poupança',
    categoryIcon: '💵',
    color: '#059669',
    title: 'Juros Nominais vs. Juros Reais: O que realmente protege o patrimônio?',
    textPt: 'O juro nominal é o percentual bruto prometido pela aplicação (ex: 12% ao ano). O juro real é o ganho que sobra após subtrair a inflação (IPCA). Se a inflação foi de 4%, o juro real é cerca de 8%. A família só constrói patrimônio real se a rentabilidade for superior à perda do poder de compra da moeda.',
    englishTerm: 'Real Interest Rate',
    ipa: '/riːl ˈɪn.trɪst reɪt/',
    termMeaning: 'Taxa de juro real (ganho real acima da inflação)',
    exampleEn: 'Real interest rates determine the actual growth of family savings.',
    examplePt: 'As taxas de juros reais determinam o crescimento real das economias familiares.',
    prompt: 'Grace, me ensine como falar em inglês sobre juros reais e nominais para proteção patrimonial da família.'
  },
  {
    id: 'stf-constituicao',
    category: 'poderes',
    categoryLabel: 'Poder Judiciário',
    categoryIcon: '🏛️',
    color: '#3b82f6',
    title: 'Qual é o papel original do STF segundo a Constituição?',
    textPt: 'Inspirado na Suprema Corte dos Estados Unidos, o STF foi desenhado para ser o guardião da Constituição (Art. 102). Sua função essencial é proteger direitos fundamentais, como a liberdade de expressão e a separação dos poderes, atuando sob o princípio da autocontenção judicial (judicial restraint), sem invadir o papel legislativo do Congresso.',
    englishTerm: 'Judicial Restraint',
    ipa: '/dʒuːˈdɪʃ.əl rɪˈstreɪnt/',
    termMeaning: 'Autocontenção judicial (não invadir funções legislativas)',
    exampleEn: 'Judicial restraint maintains harmony between constitutional branches.',
    examplePt: 'A autocontenção judicial mantém a harmonia entre os poderes constitucionais.',
    prompt: 'Grace, como discutir em inglês a teoria da separação de poderes e a autocontenção judicial?'
  }
];

export const AITutorView = ({ onOpenSettings }) => {
  const { settings, currentProfileName } = useUser();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello, ${currentProfileName}! I'm **Grace**, your personal Christian English tutor. 🕊️\n\nEstou aqui para acompanhar você e seu amor nos estudos da Bíblia, casamento, **filosofia e cultura clássica** (Olavo de Carvalho, Nietzsche, Brasil Paralelo), **capitalismo e livre mercado** (Escola Austríaca), **educação de filhos e homeschooling clássico** (Trivium, Charlotte Mason) e leitura de notícias internacionais. Como posso enriquecer o estudo de vocês hoje?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [factIndex, setFactIndex] = useState(0);
  const [factFilter, setFactFilter] = useState('all');
  const [isFactOpen, setIsFactOpen] = useState(false); // Collapsed by default so chat has maximum vertical space
  const messagesEndRef = useRef(null);

  const filteredFacts = factFilter === 'all' 
    ? DID_YOU_KNOW_FACTS 
    : DID_YOU_KNOW_FACTS.filter(f => f.category === factFilter);
  const activeFact = filteredFacts[factIndex % filteredFacts.length] || DID_YOU_KNOW_FACTS[0];

  const handleNextFact = (e) => {
    e?.stopPropagation();
    setFactIndex(prev => prev + 1);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (customPrompt = '') => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customPrompt) setInputText('');
    setIsLoading(true);

    try {
      const history = messages.slice(-6); // Keep last few messages for context
      const reply = await askAITutor({
        message: textToSend,
        history,
        apiKey: settings.geminiApiKey
      });

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: reply
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: 'Desculpe, tive uma pequena instabilidade ao processar a resposta. Pode tentar novamente em instantes?'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (text, msgId) => {
    if (speakingMsgId === msgId) {
      speechService.stop();
      setSpeakingMsgId(null);
      return;
    }

    setSpeakingMsgId(msgId);
    speechService.speak(text, {
      rate: 0.85,
      onEnd: () => setSpeakingMsgId(null),
      onError: () => setSpeakingMsgId(null)
    });
  };

  const starterChips = [
    {
      icon: <Sparkles size={14} color="#6366f1" />,
      label: '🏛️ Olavo & Primazia da Realidade',
      prompt: 'Grace, como podemos discutir em inglês a filosofia de Olavo de Carvalho sobre a primazia da realidade, a teoria dos 4 discursos e a formação do imaginário moral? Nos ensine vocabulário clássico.'
    },
    {
      icon: <Shield size={14} color="var(--color-rose)" />,
      label: '⚡ Nietzsche & Crise do Niilismo',
      prompt: 'Grace, me ajude a analisar em inglês o diagnóstico de Friedrich Nietzsche sobre a crise do niilismo ocidental e a busca pela verdade sob uma cosmovisão cristã e filosófica sólida.'
    },
    {
      icon: <Compass size={14} color="#10b981" />,
      label: '💰 Capitalismo & Escola Austríaca',
      prompt: 'Grace, me ensine termos essenciais em inglês sobre o livre mercado, a Escola Austríaca (Mises e Hayek), a ordem espontânea e por que a livre iniciativa retira milhões da pobreza.'
    },
    {
      icon: <BookOpen size={14} color="#8b5cf6" />,
      label: '📚 Homeschooling & O Trivium Clássico',
      prompt: 'Grace, como explicar o homeschooling clássico e as três etapas do Trivium (Grammar, Logic, Rhetoric) em inglês para enriquecer a educação dos nossos filhos?'
    },
    {
      icon: <Users size={14} color="var(--color-emerald)" />,
      label: '🏡 Como Educar Seus Filhos (Brasil Paralelo)',
      prompt: 'Grace, com base nos princípios da série "Como Educar Seus Filhos" (Brasil Paralelo) e Charlotte Mason, como cultivar hábitos nobres e virtudes nos filhos em inglês?'
    },
    {
      icon: <Coffee size={14} color="var(--color-gold)" />,
      label: '🛋️ Sofa Time & Casamento',
      prompt: 'Grace, como podemos praticar em inglês a proteção do nosso "sofa time" e explicar aos filhos que papai e mamãe se amam primeiro?'
    },
    {
      icon: <Heart size={14} color="var(--color-rose)" />,
      label: '❤️ 5 Linguagens do Amor no Lar',
      prompt: 'Grace, me ensine frases em inglês para aplicar as 5 Linguagens do Amor com meu cônjuge e com os filhos, abastecendo o "emotional tank" de cada um.'
    },
    {
      icon: <Sparkles size={14} color="#0284c7" />,
      label: '📰 Notícias Internacionais & Geopolítica',
      prompt: 'Grace, como discutir notícias internacionais de economia global, inteligência artificial e geopolítica em inglês? Me ensine 5 termos essenciais com pronúncia.'
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flex: 1,
      minHeight: 0,
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Header Compacto e Responsivo */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.45rem',
        flexWrap: 'wrap',
        gap: '0.4rem',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
            TUTOR 🕊️
          </h1>
          <span className="badge badge-gold" style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem' }}>
            Grace Online
          </span>
        </div>

        <button 
          onClick={onOpenSettings}
          className="btn btn-outline"
          style={{ fontSize: '0.76rem', padding: '0.3rem 0.65rem', minHeight: '32px' }}
        >
          <Settings size={13} />
          Chave IA
        </button>
      </div>

      {/* Starter Prompts Horizontal Scroll */}
      <div style={{
        display: 'flex',
        gap: '0.4rem',
        overflowX: 'auto',
        paddingBottom: '0.35rem',
        marginBottom: '0.45rem',
        scrollbarWidth: 'none',
        flexShrink: 0
      }}>
        {starterChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.prompt)}
            disabled={isLoading}
            className="btn btn-outline"
            style={{ 
              flexShrink: 0, 
              fontSize: '0.75rem', 
              padding: '0.3rem 0.65rem', 
              minHeight: '32px',
              borderRadius: 'var(--border-radius-full)',
              background: 'var(--bg-surface)'
            }}
          >
            {chip.icon}
            {chip.label}
          </button>
        ))}
      </div>

      {/* VOCÊ SABIA? • Política Brasileira, Poderes, Economia & Finanças (Compacto e Expansível) */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--border-radius-md)',
        padding: '0.45rem 0.75rem',
        marginBottom: '0.45rem',
        boxShadow: 'var(--shadow-sm)',
        flexShrink: 0,
        transition: 'all 0.2s ease'
      }}>
        <div 
          onClick={() => setIsFactOpen(!isFactOpen)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0, overflow: 'hidden' }}>
            <span style={{
              background: 'rgba(217, 119, 6, 0.15)',
              color: 'var(--color-gold)',
              padding: '0.25rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Lightbulb size={14} />
            </span>
            <span style={{
              fontWeight: 700,
              fontSize: '0.8rem',
              color: 'var(--color-text-main)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Você Sabia? • {activeFact.title}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
            <button
              onClick={handleNextFact}
              className="btn btn-outline"
              style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', minHeight: '26px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              title="Sortear outro fato"
            >
              <Shuffle size={11} />
              Outro
            </button>
            <span style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
              {isFactOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </span>
          </div>
        </div>

        {isFactOpen && (
          <div style={{ marginTop: '0.55rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.35rem', marginBottom: '0.45rem' }}>
              {[
                { id: 'all', label: 'Todos' },
                { id: 'politica', label: '🏛️ Política' },
                { id: 'poderes', label: '⚖️ Três Poderes' },
                { id: 'economia', label: '📈 Economia' },
                { id: 'financas', label: '💰 Finanças' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={(e) => { e.stopPropagation(); setFactFilter(cat.id); setFactIndex(0); }}
                  style={{
                    flexShrink: 0,
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--border-radius-full)',
                    border: factFilter === cat.id ? '1px solid var(--color-gold)' : '1px solid var(--border-color)',
                    background: factFilter === cat.id ? 'var(--color-gold)' : 'var(--bg-app)',
                    color: factFilter === cat.id ? '#ffffff' : 'var(--color-text-muted)',
                    fontSize: '0.72rem',
                    fontWeight: factFilter === cat.id ? 700 : 500,
                    cursor: 'pointer'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Current Fact Card */}
            <div style={{
              background: 'var(--bg-app)',
              borderRadius: 'var(--border-radius-md)',
              padding: '0.65rem',
              borderLeft: `3px solid ${activeFact.color}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem', flexWrap: 'wrap', gap: '0.3rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: activeFact.color }}>
                  {activeFact.categoryIcon} {activeFact.categoryLabel}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                  Fato {(factIndex % filteredFacts.length) + 1} de {filteredFacts.length}
                </span>
              </div>

              <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--color-text-main)', marginBottom: '0.3rem' }}>
                {activeFact.title}
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-main)', lineHeight: 1.45, marginBottom: '0.5rem' }}>
                {activeFact.textPt}
              </p>

              {/* Bilingual Learning Box */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.4rem',
                background: 'var(--bg-surface)',
                padding: '0.4rem 0.55rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--border-color)',
                marginBottom: '0.45rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-gold)' }}>
                    🇺🇸 Termo em Inglês:
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--color-text-main)' }}>
                    {activeFact.englishTerm}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                    {activeFact.ipa}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                    • {activeFact.termMeaning}
                  </span>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); handleSpeak(activeFact.englishTerm, 'fact-term'); }}
                  className="btn btn-outline"
                  style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', minHeight: '26px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  title="Ouvir pronúncia em inglês"
                >
                  <Volume2 size={12} className={speakingMsgId === 'fact-term' ? 'speaking-pulse' : ''} />
                  Ouvir
                </button>
              </div>

              {/* Action: Ask Grace about this fact */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleSend(activeFact.prompt); }}
                  disabled={isLoading}
                  className="btn btn-gold"
                  style={{ fontSize: '0.74rem', padding: '0.25rem 0.65rem', minHeight: '30px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Sparkles size={12} />
                  Conversar com Grace sobre isso →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages Container: Expande e ocupa todo o espaço restante */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--border-radius-xl)',
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        boxShadow: 'var(--shadow-sm)',
        WebkitOverflowScrolling: 'touch'
      }}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                gap: '0.6rem'
              }}
            >
              {!isUser && (
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #b45309 0%, #f59e0b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0
                }}>
                  <Bot size={18} />
                </div>
              )}

              <div style={{
                maxWidth: '80%',
                background: isUser ? 'linear-gradient(135deg, #312e81 0%, #4338ca 100%)' : 'var(--bg-app)',
                color: isUser ? '#ffffff' : 'var(--color-text-main)',
                padding: '0.95rem 1.2rem',
                borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                border: isUser ? 'none' : '1px solid var(--border-color)',
                fontSize: '0.94rem',
                lineHeight: '1.6',
                position: 'relative',
                whiteSpace: 'pre-wrap'
              }}>
                <div>{msg.text}</div>

                {!isUser && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.4rem' }}>
                    <button
                      onClick={() => handleSpeak(msg.text, msg.id)}
                      className="btn-ghost"
                      style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem' }}
                      title="Ouvir em inglês"
                    >
                      <Volume2 size={14} className={speakingMsgId === msg.id ? 'speaking-pulse' : ''} />
                      {speakingMsgId === msg.id ? 'Parar Áudio' : 'Ouvir Pronúncia'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #b45309 0%, #f59e0b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Bot size={18} />
            </div>
            <div style={{
              background: 'var(--bg-app)',
              padding: '0.75rem 1.25rem',
              borderRadius: '18px',
              fontSize: '0.88rem',
              color: 'var(--color-text-muted)'
            }}>
              Grace está pensando na melhor explicação para vocês... ✨
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{
          display: 'flex',
          gap: '0.45rem',
          marginTop: '0.45rem',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <input
          type="text"
          placeholder="Faça uma pergunta sobre a Bíblia, envie uma frase para corrigir ou pratique..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '0.72rem 1.1rem',
            borderRadius: 'var(--border-radius-full)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-surface)',
            color: 'var(--color-text-main)',
            fontSize: '16px',
            outline: 'none',
            boxShadow: 'var(--shadow-sm)'
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="btn btn-gold"
          style={{
            padding: '0.72rem 1.25rem',
            minHeight: '44px',
            borderRadius: 'var(--border-radius-full)',
            boxShadow: 'var(--shadow-gold)'
          }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
