import React, { useState } from 'react';
import { Volume2, Bookmark, Check, X, Sparkles, BookOpen } from 'lucide-react';
import { speechService } from '../../services/speechService';
import { useUser } from '../../context/UserContext';

export const WordDetailModal = ({ wordData, isOpen, onClose }) => {
  const { addFlashcard, currentProfileData } = useUser();
  const [playingKey, setPlayingKey] = useState(null);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !wordData) return null;

  const isAlreadyInDeck = currentProfileData?.flashcards?.some(
    c => c.word.toLowerCase() === wordData.word.toLowerCase()
  );

  const handleSpeakEn = (speed = 0.85) => {
    setPlayingKey('en-word');
    speechService.speak(wordData.word, {
      lang: 'en-US',
      rate: speed,
      onEnd: () => setPlayingKey(null),
      onError: () => setPlayingKey(null)
    });
  };

  const handleSpeakPt = () => {
    setPlayingKey('pt-meaning');
    speechService.speak(wordData.meaningPt, {
      lang: 'pt-BR',
      rate: 0.95,
      onEnd: () => setPlayingKey(null),
      onError: () => setPlayingKey(null)
    });
  };

  const handleSpeakExampleEn = () => {
    if (wordData.exampleEn) {
      setPlayingKey('en-example');
      speechService.speak(wordData.exampleEn, { 
        lang: 'en-US', 
        rate: 0.85,
        onEnd: () => setPlayingKey(null),
        onError: () => setPlayingKey(null)
      });
    }
  };

  const handleSpeakExamplePt = () => {
    if (wordData.examplePt) {
      setPlayingKey('pt-example');
      speechService.speak(wordData.examplePt, { 
        lang: 'pt-BR', 
        rate: 0.95,
        onEnd: () => setPlayingKey(null),
        onError: () => setPlayingKey(null)
      });
    }
  };

  const handleSaveToDeck = () => {
    addFlashcard({
      word: wordData.word,
      ipa: wordData.ipa,
      category: 'Bible Study',
      meaningPt: wordData.meaningPt,
      exampleEn: wordData.exampleEn,
      examplePt: wordData.examplePt
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-gold">Vocabulário Bíblico</span>
              {wordData.pos && (
                <span className="badge badge-indigo" style={{ textTransform: 'lowercase' }}>
                  {wordData.pos}
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {wordData.word}
              {wordData.ipa && (
                <span style={{ fontSize: '1.05rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>
                  {wordData.ipa}
                </span>
              )}
            </h2>
          </div>
          <button 
            className="btn-ghost" 
            onClick={onClose} 
            aria-label="Fechar"
            style={{ padding: '0.4rem', borderRadius: '50%' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Audio buttons (English Word) */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => handleSpeakEn(0.85)}
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem' }}
          >
            <Volume2 size={16} className={playingKey === 'en-word' ? 'speaking-pulse' : ''} />
            🇺🇸 Ouvir em Inglês
          </button>
          <button 
            className="btn btn-outline" 
            onClick={() => handleSpeakEn(0.65)}
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
          >
            <Sparkles size={14} />
            Mais Lento (0.65x)
          </button>
          <button 
            className="btn btn-outline" 
            onClick={handleSpeakPt}
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', borderColor: 'var(--color-gold)' }}
          >
            <Volume2 size={16} color="var(--color-gold)" className={playingKey === 'pt-meaning' ? 'speaking-pulse' : ''} />
            🇧🇷 Ouvir Tradução (PT)
          </button>
        </div>

        {/* Meaning in Portuguese */}
        <div style={{ 
          background: 'var(--bg-surface-elevated)', 
          padding: '1rem', 
          borderRadius: 'var(--border-radius-md)',
          borderLeft: '4px solid var(--color-gold)',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-gold)' }}>
              Tradução e Significado
            </span>
            <button 
              onClick={handleSpeakPt}
              style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
            >
              <Volume2 size={13} /> Ouvir em Português
            </button>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
            {wordData.meaningPt}
          </div>
          {wordData.contextNote && (
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              {wordData.contextNote}
            </div>
          )}
        </div>

        {/* Example in Context */}
        {wordData.exampleEn && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                EXEMPLO DE USO:
              </span>
            </div>
            <div style={{ 
              background: 'var(--bg-app)', 
              padding: '0.85rem', 
              borderRadius: 'var(--border-radius-md)', 
              border: '1px solid var(--border-color)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <p style={{ fontWeight: 600, fontSize: '0.96rem', color: 'var(--color-text-main)' }}>
                  “{wordData.exampleEn}”
                </p>
                <button 
                  onClick={handleSpeakExampleEn} 
                  style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, marginLeft: '0.5rem', cursor: 'pointer' }}
                  title="Ouvir frase em inglês"
                >
                  <Volume2 size={14} className={playingKey === 'en-example' ? 'speaking-pulse' : ''} /> 🇺🇸 EN
                </button>
              </div>

              {wordData.examplePt && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--border-color)', paddingTop: '0.4rem', marginTop: '0.4rem' }}>
                  <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                    “{wordData.examplePt}”
                  </p>
                  <button 
                    onClick={handleSpeakExamplePt} 
                    style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, marginLeft: '0.5rem', cursor: 'pointer' }}
                    title="Ouvir tradução em português"
                  >
                    <Volume2 size={14} className={playingKey === 'pt-example' ? 'speaking-pulse' : ''} /> 🇧🇷 PT
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button: Add to Flashcards */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <button className="btn btn-outline" onClick={onClose}>
            Fechar
          </button>
          <button 
            className={`btn ${isAlreadyInDeck || justAdded ? 'btn-outline' : 'btn-gold'}`}
            onClick={handleSaveToDeck}
            disabled={isAlreadyInDeck || justAdded}
          >
            {isAlreadyInDeck || justAdded ? (
              <>
                <Check size={16} color="var(--color-emerald)" />
                Salvo no Baralho
              </>
            ) : (
              <>
                <Bookmark size={16} />
                Salvar nos Flashcards (+10 pts)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
