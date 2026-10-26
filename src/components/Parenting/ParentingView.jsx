import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Volume2, 
  CheckCircle, 
  Lightbulb, 
  ChevronRight, 
  Calendar,
  Layers,
  ArrowRight,
  BookOpen,
  Heart,
  Shield,
  Filter
} from 'lucide-react';
import { PARENTING_TOPICS, PARENTING_CATEGORIES } from '../../data/parentingData';
import { InteractiveVerse } from '../Devotionals/InteractiveVerse';
import { WordDetailModal } from '../Devotionals/WordDetailModal';
import { DevotionalQuiz } from '../Devotionals/DevotionalQuiz';
import { speechService } from '../../services/speechService';
import { useUser } from '../../context/UserContext';

export const ParentingView = () => {
  const { currentProfileData, completeDevotional, currentProfileName, spouseProfileName } = useUser();
  const [selectedTopicId, setSelectedTopicId] = useState(PARENTING_TOPICS[0]?.id || 'topic-rebellion');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWord, setSelectedWord] = useState(null);
  const [isReadingEn, setIsReadingEn] = useState(false);
  const [isReadingPt, setIsReadingPt] = useState(false);
  const [isReadingPrayer, setIsReadingPrayer] = useState(false);
  const [showPtText, setShowPtText] = useState(true);

  // Filter topics by category
  const filteredTopics = selectedCategory === 'all'
    ? PARENTING_TOPICS
    : PARENTING_TOPICS.filter(t => t.category === selectedCategory);

  const activeTopic = PARENTING_TOPICS.find(t => t.id === selectedTopicId) || filteredTopics[0] || PARENTING_TOPICS[0];
  const completedList = currentProfileData?.completed_devotionals || currentProfileData?.completedDevotionals || [];
  const isCompleted = completedList.includes(activeTopic.id);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    const inCat = catId === 'all' ? PARENTING_TOPICS : PARENTING_TOPICS.filter(t => t.category === catId);
    if (inCat.length > 0 && !inCat.some(t => t.id === selectedTopicId)) {
      setSelectedTopicId(inCat[0].id);
      speechService.stop();
      setIsReadingEn(false);
      setIsReadingPt(false);
      setIsReadingPrayer(false);
    }
  };

  const handleReadEn = () => {
    if (isReadingEn) {
      speechService.stop();
      setIsReadingEn(false);
      return;
    }
    speechService.stop();
    setIsReadingPt(false);
    setIsReadingPrayer(false);
    setIsReadingEn(true);
    speechService.speak(activeTopic.devotionalEn, {
      lang: 'en-US',
      rate: 0.85,
      onEnd: () => setIsReadingEn(false),
      onError: () => setIsReadingEn(false)
    });
  };

  const handleReadPt = () => {
    if (isReadingPt) {
      speechService.stop();
      setIsReadingPt(false);
      return;
    }
    speechService.stop();
    setIsReadingEn(false);
    setIsReadingPrayer(false);
    setIsReadingPt(true);
    speechService.speak(activeTopic.devotionalPt, {
      lang: 'pt-BR',
      rate: 0.95,
      onEnd: () => setIsReadingPt(false),
      onError: () => setIsReadingPt(false)
    });
  };

  const handleReadPrayer = () => {
    if (isReadingPrayer) {
      speechService.stop();
      setIsReadingPrayer(false);
      return;
    }
    speechService.stop();
    setIsReadingEn(false);
    setIsReadingPt(false);
    setIsReadingPrayer(true);
    speechService.speak(activeTopic.parentPrayerEn, {
      lang: 'en-US',
      rate: 0.85,
      onEnd: () => setIsReadingPrayer(false),
      onError: () => setIsReadingPrayer(false)
    });
  };

  const handleComplete = () => {
    completeDevotional(activeTopic.id, `${activeTopic.weekLabel}: ${activeTopic.topicTitle}`);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
          <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Users size={13} />
            Educação de Filhos • Princípios Bíblicos e Práticos
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Estudos Semanais para Casais • Inglês & Fé
          </span>
        </div>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.35rem', wordBreak: 'break-word' }}>
          Formação de Filhos & Desafios Familiares
        </h1>
        <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)', maxWidth: '820px' }}>
          Tópicos semanais em inglês e português para casais vencerem desafios reais da criação com sabedoria bíblica: rebeldia e desobediência, birras e domínio próprio, o coração da criança, tempo de sofá, bênção paterna, conflitos entre irmãos e moderação com telas.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div style={{
        display: 'flex',
        gap: '0.45rem',
        overflowX: 'auto',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        WebkitOverflowScrolling: 'touch',
        paddingBottom: '0.65rem',
        marginBottom: '1rem',
        scrollbarWidth: 'none'
      }}>
        {PARENTING_CATEGORIES.map((cat) => {
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
                border: isActive ? '1px solid var(--color-gold)' : '1px solid var(--border-color)',
                background: isActive ? 'var(--color-gold)' : 'var(--bg-surface)',
                color: isActive ? '#ffffff' : 'var(--color-text-main)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.8rem',
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

      {/* Topics Carousel / Selector */}
      <div style={{
        display: 'flex',
        gap: '0.65rem',
        overflowX: 'auto',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        WebkitOverflowScrolling: 'touch',
        paddingBottom: '0.75rem',
        marginBottom: '1.5rem',
        scrollbarWidth: 'thin'
      }}>
        {filteredTopics.map((item) => {
          const isCurrent = item.id === activeTopic.id;
          const isDone = completedList.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedTopicId(item.id);
                speechService.stop();
                setIsReadingEn(false);
                setIsReadingPt(false);
                setIsReadingPrayer(false);
              }}
              style={{
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-lg)',
                border: isCurrent 
                  ? '2px solid var(--color-gold)' 
                  : '1px solid var(--border-color)',
                background: isCurrent 
                  ? 'var(--bg-surface)' 
                  : 'var(--bg-card)',
                boxShadow: isCurrent ? 'var(--shadow-md)' : 'none',
                minWidth: '210px',
                textAlign: 'left',
                position: 'relative',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ 
                  fontSize: '0.72rem', 
                  fontWeight: 800, 
                  textTransform: 'uppercase',
                  color: isCurrent ? 'var(--color-gold)' : 'var(--color-text-muted)' 
                }}>
                  {item.icon} {item.weekLabel} • TÓPICO {item.topicNumber}
                </span>
                {isDone && (
                  <CheckCircle size={14} color="var(--color-emerald)" />
                )}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-text-main)', marginBottom: '0.2rem' }}>
                {item.topicTitle}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '190px' }}>
                {item.topicTitleEn}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Title Banner */}
      <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '5px solid var(--color-gold)', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
              <span className="badge badge-gold">
                {activeTopic.icon} {activeTopic.weekLabel} • {activeTopic.categoryLabel}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                {activeTopic.topicTitle}
              </span>
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.25rem', wordBreak: 'break-word' }}>
              {activeTopic.title}
            </h2>
            <div style={{ fontSize: '1.02rem', color: 'var(--color-text-muted)', fontStyle: 'italic', wordBreak: 'break-word' }}>
              {activeTopic.titlePt}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isCompleted ? (
              <span className="badge badge-emerald" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}>
                <CheckCircle size={15} /> Concluído por {currentProfileName}
              </span>
            ) : (
              <button 
                onClick={handleComplete}
                className="btn btn-gold"
                style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
              >
                <CheckCircle size={15} /> Marcar como Concluído (+25 pts)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scripture Section with Audio & Interactive Highlights */}
      <div style={{ marginBottom: '1.5rem' }}>
        <InteractiveVerse 
          verseRef={activeTopic.verseRef}
          verseEn={activeTopic.verseEn}
          versePt={activeTopic.versePt}
          keywords={activeTopic.keywords}
          audioSnippet={activeTopic.audioSnippet}
          onSelectWord={(wordData) => setSelectedWord(wordData)}
        />
      </div>

      {/* Core Keywords Highlight Grid */}
      <div className="card" style={{ marginBottom: '1.5rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          <Sparkles size={17} color="var(--color-gold)" />
          Vocabulário Essencial do Tópico (Toque para ouvir a pronúncia e salvar)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {activeTopic.keywords.map((kw, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedWord(kw)}
              style={{
                background: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-md)',
                padding: '0.85rem 1rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-gold)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-primary)' }}>
                  {kw.word}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speechService.speak(kw.word, { lang: 'en-US' });
                  }}
                  className="btn-ghost"
                  style={{ padding: '0.25rem' }}
                  title="Ouvir pronúncia nativa"
                >
                  <Volume2 size={15} color="var(--color-gold)" />
                </button>
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
                {kw.ipa} • <span style={{ fontStyle: 'italic' }}>{kw.pos}</span>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.3rem' }}>
                {kw.meaningPt}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                {kw.contextNote}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Devotional Reflection for Parents */}
      <div className="card" style={{ marginBottom: '1.5rem', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <BookOpen size={18} color="var(--color-gold)" />
            Reflexão Prática para o Casal: {activeTopic.topicTitle}
          </h3>

          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleReadEn}
              className={`btn ${isReadingEn ? 'btn-gold' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
            >
              <Volume2 size={14} />
              {isReadingEn ? 'Pausar Áudio EN' : '🔊 Ouvir em Inglês'}
            </button>
            <button
              onClick={handleReadPt}
              className={`btn ${isReadingPt ? 'btn-gold' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
            >
              <Volume2 size={14} />
              {isReadingPt ? 'Pausar Áudio PT' : '🔊 Ouvir em Português'}
            </button>
            <button
              onClick={() => setShowPtText(!showPtText)}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
            >
              {showPtText ? 'Ocultar Tradução' : 'Mostrar Tradução'}
            </button>
          </div>
        </div>

        {/* English Text */}
        <div style={{ 
          background: 'var(--bg-app)', 
          padding: '1.25rem', 
          borderRadius: 'var(--border-radius-md)', 
          border: '1px solid var(--border-color)',
          fontSize: '1rem',
          lineHeight: '1.7',
          color: 'var(--color-text-main)',
          marginBottom: showPtText ? '1rem' : '0'
        }}>
          {activeTopic.devotionalEn}
        </div>

        {/* Portuguese Translation */}
        {showPtText && (
          <div style={{ 
            background: 'var(--bg-surface-elevated)', 
            padding: '1.25rem', 
            borderRadius: 'var(--border-radius-md)', 
            borderLeft: '4px solid var(--color-gold)',
            fontSize: '0.94rem',
            lineHeight: '1.65',
            color: 'var(--color-text-muted)'
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
              Tradução e Aplicação Prática para os Pais:
            </div>
            {activeTopic.devotionalPt}
          </div>
        )}
      </div>

      {/* Grammar & Communication Gem */}
      {activeTopic.grammarGem && (
        <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)', border: '1px solid rgba(245, 158, 11, 0.25)', width: '100%', boxSizing: 'border-box' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Lightbulb size={18} />
            {activeTopic.grammarGem.title}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', marginBottom: '0.75rem', lineHeight: 1.55 }}>
            {activeTopic.grammarGem.explanation}
          </p>
          <div style={{
            background: 'var(--bg-surface)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--border-color)',
            fontFamily: 'monospace',
            fontSize: '0.86rem',
            color: 'var(--color-primary)',
            whiteSpace: 'pre-wrap'
          }}>
            {activeTopic.grammarGem.example}
          </div>
        </div>
      )}

      {/* Parents' Prayer for Children */}
      <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-emerald)', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Heart size={17} color="var(--color-rose)" />
            Oração a Dois pelos Filhos (Adam & Marcela)
          </h3>
          <button
            onClick={handleReadPrayer}
            className={`btn ${isReadingPrayer ? 'btn-gold' : 'btn-outline'}`}
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
          >
            <Volume2 size={14} />
            {isReadingPrayer ? 'Pausar' : '🔊 Ouvir Oração em Inglês'}
          </button>
        </div>

        <div style={{ background: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--border-radius-md)', marginBottom: '0.75rem', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
          "{activeTopic.parentPrayerEn}"
        </div>
        <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
          <strong>Em Português:</strong> "{activeTopic.parentPrayerPt}"
        </div>
      </div>

      {/* Topic Quiz */}
      <div style={{ marginBottom: '2rem' }}>
        <DevotionalQuiz 
          quizList={activeTopic.quiz} 
          devotionalId={activeTopic.id} 
        />
      </div>

      {/* Word Detail Modal */}
      {selectedWord && (
        <WordDetailModal 
          wordData={selectedWord} 
          onClose={() => setSelectedWord(null)} 
        />
      )}
    </div>
  );
};
