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
  Users
} from 'lucide-react';
import { askAITutor } from '../../services/geminiService';
import { speechService } from '../../services/speechService';
import { useUser } from '../../context/UserContext';

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
  const messagesEndRef = useRef(null);

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
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100dvh - 200px)', minHeight: '420px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span className="badge badge-gold">
              <Bot size={13} />
              AI Faith & Language Companion
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-emerald)', fontWeight: 600 }}>
              🟢 Grace IA Online (Google Gemini Ativo)
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>
            Tutor IA: Grace 🕊️
          </h1>
        </div>

        <button 
          onClick={onOpenSettings}
          className="btn btn-outline"
          style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
        >
          <Settings size={15} />
          Configurar Chave IA
        </button>
      </div>

      {/* Starter Prompts Horizontal Scroll */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '0.85rem' }}>
        {starterChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.prompt)}
            disabled={isLoading}
            className="btn btn-outline"
            style={{ 
              flexShrink: 0, 
              fontSize: '0.82rem', 
              padding: '0.4rem 0.85rem', 
              borderRadius: 'var(--border-radius-full)',
              background: 'var(--bg-surface)'
            }}
          >
            {chip.icon}
            {chip.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div style={{
        flex: 1,
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--border-radius-xl)',
        padding: '1.25rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
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
          gap: '0.5rem',
          marginTop: '0.85rem',
          alignItems: 'center'
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
            padding: '0.85rem 1.2rem',
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
            padding: '0.85rem 1.4rem',
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
