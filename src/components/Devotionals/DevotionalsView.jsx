import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Volume2, 
  CheckCircle, 
  Lightbulb, 
  ChevronRight, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DEVOTIONALS_DATA } from '../../data/devotionalsData';
import { InteractiveVerse } from './InteractiveVerse';
import { WordDetailModal } from './WordDetailModal';
import { CouplePrayerSection } from './CouplePrayerSection';
import { DevotionalQuiz } from './DevotionalQuiz';
import { speechService } from '../../services/speechService';
import { useUser } from '../../context/UserContext';

export const DevotionalsView = () => {
  const { currentProfileData, completeDevotional, currentProfileName } = useUser();
  const [selectedDayId, setSelectedDayId] = useState(DEVOTIONALS_DATA[0]?.id || 'phil-4-6-7');
  const [selectedWord, setSelectedWord] = useState(null);
  const [isReadingDevotional, setIsReadingDevotional] = useState(false);
  const [showDevotionalPt, setShowDevotionalPt] = useState(true);

  const activeDevotional = DEVOTIONALS_DATA.find(d => d.id === selectedDayId) || DEVOTIONALS_DATA[0];
  const completedList = currentProfileData?.completed_devotionals || currentProfileData?.completedDevotionals || [];
  const isCompleted = completedList.includes(activeDevotional.id);

  const [isReadingPt, setIsReadingPt] = useState(false);

  const handleReadDevotional = () => {
    if (isReadingDevotional) {
      speechService.stop();
      setIsReadingDevotional(false);
      return;
    }
    speechService.stop();
    setIsReadingPt(false);
    setIsReadingDevotional(true);
    speechService.speak(activeDevotional.devotionalEn, {
      lang: 'en-US',
      rate: 0.85,
      onEnd: () => setIsReadingDevotional(false),
      onError: () => setIsReadingDevotional(false)
    });
  };

  const handleReadDevotionalPt = () => {
    if (isReadingPt) {
      speechService.stop();
      setIsReadingPt(false);
      return;
    }
    speechService.stop();
    setIsReadingDevotional(false);
    setIsReadingPt(true);
    speechService.speak(activeDevotional.devotionalPt, {
      lang: 'pt-BR',
      rate: 0.95,
      onEnd: () => setIsReadingPt(false),
      onError: () => setIsReadingPt(false)
    });
  };

  const handleComplete = () => {
    completeDevotional(activeDevotional.id, activeDevotional.verseRef);
  };

  return (
    <div>
      {/* View Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-gold">
            <BookOpen size={13} />
            Faith & Scripture
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Estudo Bíblico Bilíngue
          </span>
        </div>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          Devocionais & Bíblia Interativa
        </h1>
        <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)' }}>
          Toque em qualquer palavra em destaque para ouvir a pronúncia em inglês nativo, ver o significado e salvar em seus flashcards.
        </p>
      </div>

      {/* Devotionals Carousel / Day Selector */}
      <div style={{
        display: 'flex',
        gap: '0.65rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        marginBottom: '1.5rem',
        scrollbarWidth: 'thin'
      }}>
        {DEVOTIONALS_DATA.map((item) => {
          const isCurrent = item.id === activeDevotional.id;
          const isDone = completedList.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedDayId(item.id);
                speechService.stop();
                setIsReadingDevotional(false);
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
                minWidth: '180px',
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
                  Dia {item.day}
                </span>
                {isDone && (
                  <CheckCircle size={14} color="var(--color-emerald)" />
                )}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-text-main)', marginBottom: '0.2rem' }}>
                {item.verseRef}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
                {item.theme}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Devotional Title Card */}
      <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '5px solid var(--color-gold)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-gold">{activeDevotional.theme}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                Dia {activeDevotional.day} do Plano do Casal
              </span>
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>
              {activeDevotional.title}
            </h2>
            <div style={{ fontSize: '1.02rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
              {activeDevotional.titlePt}
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
                style={{ fontSize: '0.86rem', padding: '0.5rem 1rem' }}
              >
                <Sparkles size={15} /> Marcar como Lido (+50 pts)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Verse */}
      <InteractiveVerse
        verseEn={activeDevotional.verseEn}
        versePt={activeDevotional.versePt}
        verseRef={activeDevotional.verseRef}
        keywords={activeDevotional.keywords}
        onSelectWord={(word) => setSelectedWord(word)}
      />

      {/* Devotional Reflection Reading */}
      <div className="card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              background: 'var(--color-primary-light)', 
              color: 'var(--color-primary)', 
              padding: '0.4rem', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen size={17} />
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              Devotional Reflection (Reflexão do Dia)
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleReadDevotional}
              className="btn btn-outline"
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
            >
              <Volume2 size={15} className={isReadingDevotional ? 'speaking-pulse' : ''} />
              {isReadingDevotional ? 'Parar Leitura EN' : '🇺🇸 Ouvir em Inglês'}
            </button>
            <button 
              onClick={handleReadDevotionalPt}
              className="btn btn-outline"
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem', borderColor: 'var(--color-gold)' }}
            >
              <Volume2 size={15} color="var(--color-gold)" className={isReadingPt ? 'speaking-pulse' : ''} />
              {isReadingPt ? 'Parar Leitura PT' : '🇧🇷 Ouvir em Português'}
            </button>
            <button 
              onClick={() => setShowDevotionalPt(!showDevotionalPt)}
              className="btn btn-outline"
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
            >
              {showDevotionalPt ? 'Ocultar PT' : 'Ver PT'}
            </button>
          </div>
        </div>

        {/* English Text */}
        <div style={{ 
          background: 'var(--bg-app)', 
          padding: '1.25rem', 
          borderRadius: 'var(--border-radius-md)', 
          border: '1px solid var(--border-color)',
          marginBottom: showDevotionalPt ? '1rem' : '0',
          lineHeight: '1.75',
          fontSize: '1.02rem',
          color: 'var(--color-text-main)'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.4rem' }}>
            English Reading:
          </div>
          {activeDevotional.devotionalEn}
        </div>

        {/* Portuguese Translation */}
        {showDevotionalPt && (
          <div style={{ 
            padding: '1rem', 
            borderRadius: 'var(--border-radius-md)', 
            background: 'var(--bg-surface-elevated)',
            borderLeft: '4px solid var(--color-gold)',
            lineHeight: '1.7',
            fontSize: '0.96rem',
            color: 'var(--color-text-muted)'
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.3rem' }}>
              Tradução em Português:
            </div>
            {activeDevotional.devotionalPt}
          </div>
        )}
      </div>

      {/* Grammar Gems Box */}
      {activeDevotional.grammarGem && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(49, 46, 129, 0.05) 0%, rgba(99, 102, 241, 0.08) 100%)',
          border: '1px solid rgba(79, 70, 229, 0.2)',
          borderRadius: 'var(--border-radius-lg)',
          padding: '1.35rem',
          marginBottom: '1.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Lightbulb size={18} color="var(--color-primary)" />
            <span style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--color-primary)' }}>
              {activeDevotional.grammarGem.title}
            </span>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: '1.6', marginBottom: '0.65rem' }}>
            {activeDevotional.grammarGem.explanation}
          </p>
          <div style={{ 
            background: 'var(--bg-surface)', 
            padding: '0.65rem 0.85rem', 
            borderRadius: 'var(--border-radius-sm)',
            border: '1px dashed var(--border-color)',
            fontSize: '0.86rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)'
          }}>
            💡 {activeDevotional.grammarGem.example}
          </div>
        </div>
      )}

      {/* Couple Prayer Section */}
      <CouplePrayerSection 
        prayerEn={activeDevotional.couplePrayerEn}
        prayerPt={activeDevotional.couplePrayerPt}
        dayId={activeDevotional.id}
      />

      {/* Comprehension & Vocabulary Quiz */}
      <DevotionalQuiz 
        quizList={activeDevotional.quiz}
        devotionalId={activeDevotional.id}
      />

      {/* Bottom CTA to next devotional */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: 'var(--bg-surface)', 
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '1.25rem 1.5rem',
        marginTop: '1.5rem'
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-main)' }}>
            Gostou do estudo de hoje?
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
            Pratique no baralho de flashcards ou teste a compreensão na aba de Músicas!
          </div>
        </div>
        <button 
          onClick={handleComplete}
          className="btn btn-gold"
          style={{ fontSize: '0.9rem' }}
        >
          <Sparkles size={16} /> Concluir e Celebrar (+50 pts)
        </button>
      </div>

      {/* Interactive Word Modal */}
      <WordDetailModal
        wordData={selectedWord}
        isOpen={Boolean(selectedWord)}
        onClose={() => setSelectedWord(null)}
      />
    </div>
  );
};
