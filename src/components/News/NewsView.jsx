import React, { useState, useRef } from 'react';
import { 
  Newspaper, 
  Sparkles, 
  Volume2, 
  Square, 
  Search, 
  Bookmark, 
  Check, 
  Share2, 
  ExternalLink, 
  Bot, 
  Layers, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Eye, 
  EyeOff, 
  CheckCircle,
  HelpCircle,
  RefreshCw,
  Zap,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NEWS_ARTICLES, NEWS_CATEGORIES } from '../../data/newsData';
import { WordDetailModal } from '../Devotionals/WordDetailModal';
import { speechService } from '../../services/speechService';
import { useUser } from '../../context/UserContext';
import { askAITutor } from '../../services/geminiService';

export const NewsView = () => {
  const { currentProfileData, addFlashcard, triggerCelebration, settings } = useUser();
  const [articles, setArticles] = useState(NEWS_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState(NEWS_ARTICLES[0].id);
  const [showPtTranslation, setShowPtTranslation] = useState(true);
  const [playingLang, setPlayingLang] = useState(null); // 'en' | 'pt' | null
  const [selectedWord, setSelectedWord] = useState(null);
  const [savedKeyword, setSavedKeyword] = useState(null);
  
  // Horizontal scroll refs
  const categoryScrollRef = useRef(null);
  const articlesScrollRef = useRef(null);

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth'
      });
    }
  };

  const scrollArticles = (direction) => {
    if (articlesScrollRef.current) {
      articlesScrollRef.current.scrollBy({
        left: direction === 'left' ? -260 : 260,
        behavior: 'smooth'
      });
    }
  };

  // AI Generator state
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTopicInput, setAiTopicInput] = useState('');
  const [aiCategoryInput, setAiCategoryInput] = useState('economy');
  const [showAiModal, setShowAiModal] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState({});

  // Filter articles
  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      art.headlineEn.toLowerCase().includes(query) ||
      art.headlinePt.toLowerCase().includes(query) ||
      art.contentEn.toLowerCase().includes(query) ||
      art.contentPt.toLowerCase().includes(query) ||
      art.keywords.some(k => k.word.toLowerCase().includes(query) || k.meaningPt.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const activeArticle = articles.find(a => a.id === selectedArticleId) || filteredArticles[0] || articles[0];

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    const inCat = catId === 'all' ? articles : articles.filter(a => a.category === catId);
    if (inCat.length > 0 && !inCat.some(a => a.id === selectedArticleId)) {
      setSelectedArticleId(inCat[0].id);
      speechService.stop();
      setPlayingLang(null);
    }
  };

  const handleSpeakEn = () => {
    if (playingLang === 'en') {
      speechService.stop();
      setPlayingLang(null);
      return;
    }
    speechService.stop();
    setPlayingLang('en');
    speechService.speak(activeArticle.audioText || activeArticle.contentEn, {
      lang: 'en-US',
      rate: settings.speechRate || 0.85,
      onEnd: () => setPlayingLang(null),
      onError: () => setPlayingLang(null)
    });
  };

  const handleSpeakPt = () => {
    if (playingLang === 'pt') {
      speechService.stop();
      setPlayingLang(null);
      return;
    }
    speechService.stop();
    setPlayingLang('pt');
    speechService.speak(activeArticle.contentPt, {
      lang: 'pt-BR',
      rate: 0.95,
      onEnd: () => setPlayingLang(null),
      onError: () => setPlayingLang(null)
    });
  };

  const handleSaveKeywordDirectly = (kw, e) => {
    e.stopPropagation();
    addFlashcard({
      word: kw.word,
      ipa: kw.ipa,
      category: `News: ${activeArticle.categoryLabel}`,
      meaningPt: kw.meaningPt,
      exampleEn: kw.exampleEn,
      examplePt: kw.examplePt
    });
    setSavedKeyword(kw.word);
    setTimeout(() => setSavedKeyword(null), 2200);
  };

  const handleQuizSelect = (qIdx, optIdx) => {
    if (quizSubmitted[activeArticle.id]) return;
    setQuizAnswers(prev => ({
      ...prev,
      [`${activeArticle.id}-${qIdx}`]: optIdx
    }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(prev => ({
      ...prev,
      [activeArticle.id]: true
    }));
    triggerCelebration();
  };

  // Generate dynamic news with Grace AI
  const handleGenerateAINews = async (e) => {
    e.preventDefault();
    const topic = aiTopicInput.trim() || 'Tendências Globais de Inteligência Artificial e Mercados';
    setIsGenerating(true);

    const prompt = `Atue como jornalista sênior de negócios internacionais e redator bilíngue (inglês e português).
Gere uma notícia/artigo de análise profissional de alto nível sobre o tema: "${topic}" na categoria: "${aiCategoryInput}".
Você DEVE responder APENAS com um objeto JSON VÁLIDO (sem crases adicionais de markdown, sem introdução, sem explicações), seguindo estritamente esta estrutura:
{
  "headlineEn": "Manchete forte e profissional em inglês",
  "headlinePt": "Tradução da manchete para o português",
  "leadSummaryEn": "Resumo de 1-2 frases em inglês",
  "leadSummaryPt": "Resumo de 1-2 frases em português",
  "contentEn": "Texto do artigo completo em inglês com 2 parágrafos e vocabulário rico e autêntico",
  "contentPt": "Tradução completa do artigo para o português",
  "source": "Fonte do artigo (ex: Bloomberg News, TechCrunch Intelligence, Financial Times)",
  "keywords": [
    {
      "word": "termo-chave em inglês",
      "ipa": "/fonética/",
      "pos": "classe gramatical",
      "meaningPt": "significado em português",
      "contextNote": "dica prática de uso",
      "exampleEn": "frase de exemplo em inglês",
      "examplePt": "tradução da frase de exemplo"
    },
    {
      "word": "termo-2",
      "ipa": "/fonética/",
      "pos": "classe gramatical",
      "meaningPt": "significado",
      "contextNote": "dica de uso",
      "exampleEn": "exemplo",
      "examplePt": "tradução"
    },
    {
      "word": "termo-3",
      "ipa": "/fonética/",
      "pos": "classe gramatical",
      "meaningPt": "significado",
      "contextNote": "dica de uso",
      "exampleEn": "exemplo",
      "examplePt": "tradução"
    }
  ],
  "takeaways": [
    { "en": "Takeaway 1 in English", "pt": "Ponto principal 1 em português" },
    { "en": "Takeaway 2 in English", "pt": "Ponto principal 2 em português" }
  ],
  "quiz": [
    {
      "question": "Pergunta de interpretação em português?",
      "questionEn": "Question in English?",
      "options": ["Opção correta", "Opção errada 1", "Opção errada 2", "Opção errada 3"],
      "correctIndex": 0,
      "explanation": "Explicação pedagógica da resposta correta."
    }
  ]
}`;

    try {
      const response = await askAITutor({
        message: prompt,
        apiKey: settings.geminiApiKey
      });

      // Parse JSON from model response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const catObj = NEWS_CATEGORIES.find(c => c.id === aiCategoryInput) || NEWS_CATEGORIES[1];
        const newArt = {
          id: `ai-news-${Date.now()}`,
          category: aiCategoryInput,
          categoryLabel: catObj.label,
          categoryIcon: catObj.icon,
          categoryColor: catObj.color,
          source: parsed.source || 'Grace AI • Live Intelligence',
          readTime: '3 min read',
          publishedAt: 'Gerado Agora • Exclusivo',
          headlineEn: parsed.headlineEn,
          headlinePt: parsed.headlinePt,
          leadSummaryEn: parsed.leadSummaryEn,
          leadSummaryPt: parsed.leadSummaryPt,
          contentEn: parsed.contentEn,
          contentPt: parsed.contentPt,
          audioText: `${parsed.headlineEn}. ${parsed.contentEn}`,
          keywords: parsed.keywords || [],
          takeaways: parsed.takeaways || [],
          quiz: parsed.quiz || []
        };

        setArticles([newArt, ...articles]);
        setSelectedArticleId(newArt.id);
        setShowAiModal(false);
        setAiTopicInput('');
        triggerCelebration();
      } else {
        alert('A IA gerou a resposta, mas o formato JSON precisava de ajuste. Tente novamente em instantes.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao gerar notícia com IA. Verifique sua conexão ou tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      {/* Top Banner Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
          <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Newspaper size={13} />
            Bilingual Daily News • Notícias Internacionais
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Tecnologia • Cibersegurança • Política • Economia • Bolsa • Desenvolvimento Pessoal
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.35rem', wordBreak: 'break-word' }}>
              Notícias Globais & Mercado em Inglês
            </h1>
            <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)', maxWidth: '820px' }}>
              Pratique inglês instrumental com artigos do mundo dos negócios e geopolítica. Ouça a pronúncia nativa, salve termos técnicos direto nos flashcards e acompanhe o pulso do mundo.
            </p>
          </div>

          <button
            onClick={() => setShowAiModal(true)}
            className="btn btn-gold"
            style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.88rem', padding: '0.55rem 1rem' }}
          >
            <Sparkles size={16} />
            Gerar Notícia com Grace IA
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <div style={{
          position: 'absolute',
          left: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--color-text-muted)',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none'
        }}>
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pesquisar notícias, termos técnicos ou temas em inglês/português..."
          style={{
            width: '100%',
            padding: '0.85rem 2.5rem 0.85rem 2.6rem',
            borderRadius: 'var(--border-radius-lg)',
            border: '2px solid var(--border-color)',
            background: 'var(--bg-surface)',
            color: 'var(--color-text-main)',
            fontSize: '16px',
            boxShadow: 'var(--shadow-sm)',
            transition: 'border-color 0.2s ease',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 700
            }}
          >
            Limpar ✕
          </button>
        )}
      </div>

      {/* Category Filter Chips with Horizontal Scroll Arrows */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
        <button
          onClick={() => scrollCategories('left')}
          aria-label="Rolar categorias para esquerda"
          style={{
            position: 'absolute',
            left: '-6px',
            zIndex: 3,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            color: 'var(--color-text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            opacity: 0.95,
            transition: 'all 0.15s ease'
          }}
          title="Ver categorias anteriores"
        >
          <ChevronLeft size={18} />
        </button>

        <div 
          ref={categoryScrollRef}
          style={{
            display: 'flex',
            gap: '0.45rem',
            overflowX: 'auto',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            WebkitOverflowScrolling: 'touch',
            padding: '0.2rem 2.2rem 0.65rem 2.2rem',
            scrollbarWidth: 'none'
          }}
        >
          {NEWS_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.42rem 0.85rem',
                  borderRadius: 'var(--border-radius-full)',
                  border: isActive ? `1.5px solid ${cat.color}` : '1px solid var(--border-color)',
                  background: isActive ? cat.color : 'var(--bg-surface)',
                  color: isActive ? '#ffffff' : 'var(--color-text-main)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollCategories('right')}
          aria-label="Rolar categorias para direita"
          style={{
            position: 'absolute',
            right: '-6px',
            zIndex: 3,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            color: 'var(--color-text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            opacity: 0.95,
            transition: 'all 0.15s ease'
          }}
          title="Ver mais categorias"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Articles Carousel Selector with Horizontal Scroll Arrows */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button
          onClick={() => scrollArticles('left')}
          aria-label="Rolar artigos para esquerda"
          style={{
            position: 'absolute',
            left: '-6px',
            zIndex: 3,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            color: 'var(--color-text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            opacity: 0.95,
            transition: 'all 0.15s ease'
          }}
          title="Ver artigos anteriores"
        >
          <ChevronLeft size={19} />
        </button>

        <div 
          ref={articlesScrollRef}
          style={{
            display: 'flex',
            gap: '0.65rem',
            overflowX: 'auto',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            WebkitOverflowScrolling: 'touch',
            padding: '0.2rem 2.2rem 0.75rem 2.2rem',
            scrollbarWidth: 'thin'
          }}
        >
          {filteredArticles.map((art) => {
            const isSelected = art.id === activeArticle.id;
            return (
              <button
                key={art.id}
                onClick={() => {
                  setSelectedArticleId(art.id);
                  speechService.stop();
                  setPlayingLang(null);
                }}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--border-radius-lg)',
                  border: isSelected 
                    ? `2px solid ${art.categoryColor || 'var(--color-gold)'}` 
                    : '1px solid var(--border-color)',
                  background: isSelected 
                    ? 'var(--bg-surface)' 
                    : 'var(--bg-card)',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                  minWidth: '240px',
                  maxWidth: '280px',
                  textAlign: 'left',
                  position: 'relative',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 800, 
                    textTransform: 'uppercase',
                    color: art.categoryColor || 'var(--color-primary)'
                  }}>
                    {art.categoryIcon} {art.categoryLabel}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                    {art.readTime}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--color-text-main)', marginBottom: '0.25rem', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {art.headlineEn}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '240px' }}>
                  {art.source}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollArticles('right')}
          aria-label="Rolar artigos para direita"
          style={{
            position: 'absolute',
            right: '-6px',
            zIndex: 3,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            color: 'var(--color-text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            opacity: 0.95,
            transition: 'all 0.15s ease'
          }}
          title="Ver mais artigos"
        >
          <ChevronRight size={19} />
        </button>
      </div>

      {/* Main Active Article Container */}
      <div className="card" style={{ 
        marginBottom: '1.75rem', 
        borderLeft: `5px solid ${activeArticle.categoryColor || 'var(--color-gold)'}`,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Article Meta Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge" style={{ background: `${activeArticle.categoryColor}20`, color: activeArticle.categoryColor, fontWeight: 700 }}>
              {activeArticle.categoryIcon} {activeArticle.categoryLabel}
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              {activeArticle.source}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              • {activeArticle.publishedAt} • {activeArticle.readTime}
            </span>
          </div>

          {/* Audio Controls */}
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleSpeakEn}
              className={`btn ${playingLang === 'en' ? 'btn-gold' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
            >
              {playingLang === 'en' ? <Square size={14} /> : <Volume2 size={14} />}
              {playingLang === 'en' ? 'Pausar EN' : '🔊 Ouvir em Inglês'}
            </button>
            <button
              onClick={handleSpeakPt}
              className={`btn ${playingLang === 'pt' ? 'btn-gold' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
            >
              {playingLang === 'pt' ? <Square size={14} /> : <Volume2 size={14} />}
              {playingLang === 'pt' ? 'Pausar PT' : '🔊 Ouvir em Português'}
            </button>
            <button
              onClick={() => setShowPtTranslation(!showPtTranslation)}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
            >
              {showPtTranslation ? <EyeOff size={14} /> : <Eye size={14} />}
              {showPtTranslation ? 'Ocultar Tradução' : 'Mostrar Tradução'}
            </button>
          </div>
        </div>

        {/* Headlines */}
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', lineHeight: 1.25, marginBottom: '0.35rem', wordBreak: 'break-word' }}>
          {activeArticle.headlineEn}
        </h2>
        <div style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginBottom: '1.25rem', lineHeight: 1.4, wordBreak: 'break-word' }}>
          {activeArticle.headlinePt}
        </div>

        {/* Executive Lead Summary */}
        <div style={{ 
          background: 'var(--bg-app)', 
          padding: '0.9rem 1.15rem', 
          borderRadius: 'var(--border-radius-md)', 
          border: '1px solid var(--border-color)',
          marginBottom: '1.25rem'
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', color: activeArticle.categoryColor || 'var(--color-gold)', marginBottom: '0.3rem' }}>
            Executive Briefing / Resumo Executivo:
          </div>
          <p style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.55, marginBottom: showPtTranslation ? '0.4rem' : '0' }}>
            "{activeArticle.leadSummaryEn}"
          </p>
          {showPtTranslation && (
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{activeArticle.leadSummaryPt}"
            </p>
          )}
        </div>

        {/* English Article Body */}
        <div style={{ marginBottom: showPtTranslation ? '1.5rem' : '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
            Full Article (English) — Toque nas palavras em destaque para estudar e salvar:
          </div>
          <div style={{ 
            fontSize: '1.05rem', 
            lineHeight: '1.75', 
            color: 'var(--color-text-main)', 
            whiteSpace: 'pre-line',
            background: 'var(--bg-app)',
            padding: '1.25rem',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            {activeArticle.contentEn}
          </div>
        </div>

        {/* Portuguese Translation Body */}
        {showPtTranslation && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>
              Tradução Completa (Português Brasileiro):
            </div>
            <div style={{ 
              fontSize: '0.98rem', 
              lineHeight: '1.7', 
              color: 'var(--color-text-muted)', 
              whiteSpace: 'pre-line',
              background: 'var(--bg-surface-elevated)',
              padding: '1.25rem',
              borderRadius: 'var(--border-radius-md)',
              borderLeft: `4px solid ${activeArticle.categoryColor || 'var(--color-gold)'}`
            }}>
              {activeArticle.contentPt}
            </div>
          </div>
        )}

        {/* Key Takeaways */}
        {activeArticle.takeaways && activeArticle.takeaways.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingUp size={16} /> Key Takeaways (Pontos Críticos para Negócios & Conversação):
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {activeArticle.takeaways.map((t, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <CheckCircle size={15} color="var(--color-emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-text-main)' }}>{t.en}</strong>
                    {showPtTranslation && (
                      <span style={{ display: 'block', fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
                        {t.pt}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Core Keywords Grid */}
      <div className="card" style={{ marginBottom: '1.75rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          <Sparkles size={18} color="var(--color-gold)" />
          Vocabulário Profissional em Destaque (Toque para ouvir ou salvar nos Flashcards)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
          {activeArticle.keywords.map((kw, idx) => {
            const isJustSaved = savedKeyword === kw.word;
            return (
              <div 
                key={idx}
                onClick={() => setSelectedWord(kw)}
                style={{
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '0.95rem 1rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = activeArticle.categoryColor || 'var(--color-gold)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.02rem', color: 'var(--color-primary)' }}>
                    {kw.word}
                  </span>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speechService.speak(kw.word, { lang: 'en-US' });
                      }}
                      className="btn-ghost"
                      style={{ padding: '0.25rem' }}
                      title="Ouvir pronúncia em inglês"
                    >
                      <Volume2 size={16} color="var(--color-gold)" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleSaveKeywordDirectly(kw, e)}
                      className="btn-ghost"
                      style={{ padding: '0.25rem', color: isJustSaved ? 'var(--color-emerald)' : 'var(--color-text-muted)' }}
                      title="Salvar nos Flashcards"
                    >
                      {isJustSaved ? <Check size={16} color="var(--color-emerald)" /> : <Bookmark size={16} />}
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
                  {kw.ipa} • <span style={{ fontStyle: 'italic' }}>{kw.pos}</span>
                </div>

                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.3rem' }}>
                  {kw.meaningPt}
                </div>

                <div style={{ fontSize: '0.77rem', color: 'var(--color-text-muted)', lineHeight: 1.4, marginBottom: '0.45rem' }}>
                  {kw.contextNote}
                </div>

                {kw.exampleEn && (
                  <div style={{ fontSize: '0.76rem', background: 'var(--bg-surface)', padding: '0.4rem 0.6rem', borderRadius: 'var(--border-radius-sm)', fontStyle: 'italic', color: 'var(--color-text-main)' }}>
                    "{kw.exampleEn}"
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Reading Comprehension Quiz */}
      {activeArticle.quiz && activeArticle.quiz.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem', width: '100%', boxSizing: 'border-box' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <HelpCircle size={18} color="var(--color-primary)" />
            Quiz de Compreensão & Vocabulário do Artigo
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
            Teste o entendimento do texto e ganhe pontos de fluência:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {activeArticle.quiz.map((q, qIdx) => {
              const selectedOpt = quizAnswers[`${activeArticle.id}-${qIdx}`];
              const isSubmitted = quizSubmitted[activeArticle.id];

              return (
                <div key={qIdx} style={{ background: 'var(--bg-app)', padding: '1rem 1.15rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
                    {qIdx + 1}. {q.question}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      const isCorrect = optIdx === q.correctIndex;
                      
                      let btnBg = 'var(--bg-surface)';
                      let btnBorder = '1px solid var(--border-color)';
                      let btnColor = 'var(--color-text-main)';

                      if (isSubmitted) {
                        if (isCorrect) {
                          btnBg = 'rgba(5, 150, 105, 0.15)';
                          btnBorder = '1.5px solid var(--color-emerald)';
                          btnColor = 'var(--color-emerald)';
                        } else if (isChosen && !isCorrect) {
                          btnBg = 'rgba(225, 29, 72, 0.12)';
                          btnBorder = '1.5px solid var(--color-rose)';
                          btnColor = 'var(--color-rose)';
                        }
                      } else if (isChosen) {
                        btnBorder = '1.5px solid var(--color-gold)';
                        btnBg = 'rgba(245, 158, 11, 0.1)';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleQuizSelect(qIdx, optIdx)}
                          style={{
                            padding: '0.65rem 0.85rem',
                            borderRadius: 'var(--border-radius-md)',
                            border: btnBorder,
                            background: btnBg,
                            color: btnColor,
                            textAlign: 'left',
                            fontSize: '0.86rem',
                            fontWeight: isChosen || (isSubmitted && isCorrect) ? 700 : 500,
                            cursor: isSubmitted ? 'default' : 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && q.explanation && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--color-text-muted)', borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.6rem' }}>
                      💡 <strong>Explicação:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
            {!quizSubmitted[activeArticle.id] ? (
              <button
                onClick={handleQuizSubmit}
                className="btn btn-gold"
                style={{ fontSize: '0.86rem', padding: '0.5rem 1.25rem' }}
              >
                Conferir Respostas (+20 pts)
              </button>
            ) : (
              <span className="badge badge-emerald" style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem' }}>
                <CheckCircle size={15} /> Quiz Concluído com Sucesso!
              </span>
            )}
          </div>
        </div>
      )}

      {/* AI News Generator Modal */}
      {showAiModal && (
        <div className="modal-overlay" onClick={() => setShowAiModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ 
                  background: 'var(--color-gold-light)', 
                  color: 'var(--color-gold)', 
                  padding: '0.4rem', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles size={18} />
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Gerar Notícia do Dia com Grace IA</h2>
              </div>
              <button className="btn-ghost" onClick={() => setShowAiModal(false)}>✕</button>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Escolha qualquer tema atual do mundo dos negócios, tecnologia ou desenvolvimento pessoal. Grace IA pesquisará e redigirá um artigo bilíngue com áudio e vocabulário instantaneamente!
            </p>

            <form onSubmit={handleGenerateAINews} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Categoria da Notícia:
                </label>
                <select
                  value={aiCategoryInput}
                  onChange={e => setAiCategoryInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-app)',
                    color: 'var(--color-text-main)',
                    fontSize: '16px'
                  }}
                >
                  <option value="economy">📈 Economia (Brasil & Exterior)</option>
                  <option value="politics">🏛️ Política (Brasil & Exterior)</option>
                  <option value="technology">💻 TI & Tecnologia Global</option>
                  <option value="philosophy-culture">🏛️ Filosofia & Tradição (Olavo, Nietzsche, BP)</option>
                  <option value="capitalism-liberty">💰 Capitalismo & Livre Mercado (Mises, Hayek)</option>
                  <option value="homeschooling-education">📚 Educação & Homeschooling (Trivium, Família)</option>
                  <option value="cybersecurity">🛡️ Cibersegurança & Crimes Digitais</option>
                  <option value="stocks">📊 Bolsa de Valores & Ações de Wall Street</option>
                  <option value="personal-development">🚀 Desenvolvimento Pessoal & Hábitos</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Tema Específico ou Autor (Ex: Agronegócio & Selic, Congresso Nacional, Olavo, Mises, IA Global):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Agronegócio e Taxa Selic, Soberania Nacional, Primazia da Realidade, Big Techs..."
                  value={aiTopicInput}
                  onChange={e => setAiTopicInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-app)',
                    color: 'var(--color-text-main)',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Quick Suggestions Chips */}
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                  Sugestões rápidas para gerar:
                </span>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    'Agronegócio Brasileiro & Taxa Selic',
                    'Congresso Nacional & Diplomacia Exterior',
                    'IA & Big Techs Globais',
                    'Olavo de Carvalho & Primazia da Realidade',
                    'Nietzsche & Crise do Niilismo',
                    'Capitalismo & Escola Austríaca',
                    'Homeschooling & O Trivium Clássico',
                    'Como Educar Seus Filhos (Brasil Paralelo)'
                  ].map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setAiTopicInput(sug)}
                      className="badge badge-indigo"
                      style={{ cursor: 'pointer', border: 'none', fontSize: '0.74rem' }}
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAiModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="btn btn-gold"
                  style={{ minWidth: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={15} className="speaking-pulse" />
                      Redigindo com IA...
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      Gerar Artigo Bilíngue
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Word Detail Modal */}
      {selectedWord && (
        <WordDetailModal
          wordData={selectedWord}
          isOpen={true}
          onClose={() => setSelectedWord(null)}
        />
      )}
    </div>
  );
};
