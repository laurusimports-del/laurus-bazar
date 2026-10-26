import React, { useState } from 'react';
import { Volume2, Square, Eye, EyeOff, Sparkles, BookOpen } from 'lucide-react';
import { speechService } from '../../services/speechService';

export const InteractiveVerse = ({ 
  verseEn, 
  versePt, 
  verseRef, 
  keywords = [], 
  onSelectWord 
}) => {
  const [playingLang, setPlayingLang] = useState(null); // 'en' | 'pt' | null
  const [showPt, setShowPt] = useState(true);
  const [slowRate, setSlowRate] = useState(false);

  const handleSpeakEn = () => {
    if (playingLang === 'en') {
      speechService.stop();
      setPlayingLang(null);
      return;
    }

    setPlayingLang('en');
    speechService.speak(verseEn, {
      lang: 'en-US',
      rate: slowRate ? 0.7 : 0.85,
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

    setPlayingLang('pt');
    speechService.speak(versePt, {
      lang: 'pt-BR',
      rate: 0.95,
      onEnd: () => setPlayingLang(null),
      onError: () => setPlayingLang(null)
    });
  };

  // Helper to highlight keywords in the text
  const renderInteractiveEnglishText = () => {
    if (!keywords || keywords.length === 0) return verseEn;

    // Sort by length desc so longer phrases match first
    const sortedKeywords = [...keywords].sort((a, b) => b.word.length - a.word.length);
    const regexPattern = new RegExp(`\\b(${sortedKeywords.map(k => escapeRegExp(k.word)).join('|')})\\b`, 'gi');

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regexPattern.exec(verseEn)) !== null) {
      if (match.index > lastIndex) {
        parts.push(verseEn.substring(lastIndex, match.index));
      }

      const matchedWord = match[0];
      const matchedData = sortedKeywords.find(
        k => k.word.toLowerCase() === matchedWord.toLowerCase()
      );

      parts.push(
        <span
          key={`kw-${match.index}`}
          className="interactive-word"
          onClick={() => matchedData && onSelectWord(matchedData)}
          title={`Clique para ver pronúncia e significado de "${matchedWord}"`}
        >
          {matchedWord}
        </span>
      );

      lastIndex = regexPattern.lastIndex;
    }

    if (lastIndex < verseEn.length) {
      parts.push(verseEn.substring(lastIndex));
    }

    return parts;
  };

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--border-radius-xl)',
      padding: '1.75rem',
      position: 'relative',
      boxShadow: 'var(--shadow-md)',
      marginBottom: '1.75rem'
    }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className="badge badge-gold" style={{ fontSize: '0.85rem' }}>
            <BookOpen size={14} />
            {verseRef}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
            NIV (English) & NVI (Português)
          </span>
        </div>

        {/* Audio & Display controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSlowRate(!slowRate)}
            className={`btn btn-outline ${slowRate ? 'badge-gold' : ''}`}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
            title="Alternar velocidade de leitura"
          >
            <Sparkles size={13} />
            {slowRate ? '0.70x (Lento)' : 'Normal'}
          </button>

          <button
            onClick={handleSpeakEn}
            className={`btn ${playingLang === 'en' ? 'btn-gold' : 'btn-primary'}`}
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.84rem' }}
          >
            {playingLang === 'en' ? (
              <>
                <Square size={14} /> Parar EN
              </>
            ) : (
              <>
                <Volume2 size={16} /> 🇺🇸 Ouvir em Inglês
              </>
            )}
          </button>

          <button
            onClick={handleSpeakPt}
            className={`btn ${playingLang === 'pt' ? 'btn-gold' : 'btn-outline'}`}
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.84rem' }}
          >
            {playingLang === 'pt' ? (
              <>
                <Square size={14} /> Parar PT
              </>
            ) : (
              <>
                <Volume2 size={16} /> 🇧🇷 Ouvir em Português
              </>
            )}
          </button>

          <button
            onClick={() => setShowPt(!showPt)}
            className="btn btn-outline"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
            title={showPt ? "Ocultar tradução para desafio" : "Mostrar tradução em português"}
          >
            {showPt ? <EyeOff size={15} /> : <Eye size={15} />}
            {showPt ? 'Ocultar PT' : 'Ver PT'}
          </button>
        </div>
      </div>

      {/* English Verse with Interactive Words */}
      <div style={{ marginBottom: showPt ? '1.25rem' : '0' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
          Holy Scripture (English NIV) — Toque nas palavras em destaque para estudar:
        </div>
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.25rem',
          lineHeight: '1.75',
          color: 'var(--color-text-main)',
          fontWeight: 500
        }}>
          “{renderInteractiveEnglishText()}”
        </p>
      </div>

      {/* Portuguese translation parallel view */}
      {showPt && (
        <div style={{
          background: 'var(--bg-app)',
          padding: '1.1rem',
          borderRadius: 'var(--border-radius-md)',
          borderLeft: '4px solid var(--color-gold)',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-gold)' }}>
              Tradução em Português (NVI):
            </span>
            <button
              onClick={handleSpeakPt}
              style={{ fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
            >
              <Volume2 size={14} className={playingLang === 'pt' ? 'speaking-pulse' : ''} />
              {playingLang === 'pt' ? 'Parar Áudio' : 'Ouvir Versículo em Português'}
            </button>
          </div>
          <p style={{
            fontSize: '1.02rem',
            lineHeight: '1.6',
            color: 'var(--color-text-muted)'
          }}>
            “{versePt}”
          </p>
        </div>
      )}
    </div>
  );
};
