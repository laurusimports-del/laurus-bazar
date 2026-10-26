import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Bookmark, Check, X, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { speechService } from '../../services/speechService';
import { useUser } from '../../context/UserContext';

const translationCache = new Map();

export const WordSelectionPopup = () => {
  const { addFlashcard, currentProfileData, triggerCelebration } = useUser();
  const [selectedWord, setSelectedWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [contextSentence, setContextSentence] = useState('');
  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const [popupPos, setPopupPos] = useState(null); // { top, left, placeBelow }
  const [savedSuccess, setSavedSuccess] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleSelection = () => {
      // Pequeno timeout para o navegador finalizar a seleção do mouse/toque
      setTimeout(async () => {
        if (typeof window === 'undefined') return;
        const selection = window.getSelection();

        // Se não houver seleção ou se o clique foi dentro do próprio popup
        if (!selection || selection.isCollapsed) return;

        // Se a seleção foi dentro de um input ou textarea de digitação, não interfere
        const activeEl = document.activeElement;
        if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
          return;
        }

        const raw = selection.toString().trim();
        // Apenas palavras ou frases curtas (de 2 a 50 caracteres)
        if (!raw || raw.length < 2 || raw.length > 50) return;

        // Limpa pontuações nas bordas: "“take,”" -> "take"
        const clean = raw.replace(/^[“"‘'(\s]+|[”"’)?,.;:!\s]+$/g, '').trim();
        if (!clean || clean.length < 2) return;

        // Tenta capturar a frase de contexto ao redor da palavra
        let sentence = '';
        try {
          const anchor = selection.anchorNode;
          const text = anchor?.parentElement?.innerText || anchor?.textContent || '';
          if (text && text.length > clean.length && text.length < 250) {
            sentence = text.trim();
          }
        } catch (e) {}

        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          if (!rect || rect.width === 0) return;

          const placeBelow = rect.top < 130;
          const top = placeBelow 
            ? rect.bottom + window.scrollY + 10 
            : rect.top + window.scrollY - 10;
          const left = Math.max(160, Math.min(window.innerWidth - 160, rect.left + rect.width / 2));

          setSelectedWord(clean);
          setContextSentence(sentence);
          setSavedSuccess(false);
          setPopupPos({ top, left, placeBelow });

          // Traduz a palavra instantaneamente
          fetchTranslation(clean);
        } catch (e) {}
      }, 30);
    };

    const handleMouseDown = (e) => {
      if (popupRef.current && popupRef.current.contains(e.target)) {
        return; // Clique dentro do popup não fecha
      }
      // Clique fora fecha o popup
      setPopupPos(null);
      setSelectedWord('');
      setTranslation('');
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const fetchTranslation = async (wordToTranslate) => {
    const key = wordToTranslate.toLowerCase();
    if (translationCache.has(key)) {
      setTranslation(translationCache.get(key));
      return;
    }

    setLoadingTranslation(true);
    try {
      const encoded = encodeURIComponent(wordToTranslate);
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encoded}`);
      if (res.ok) {
        const data = await res.json();
        const translated = data[0]?.map(item => item[0]).join(' ') || '';
        if (translated) {
          translationCache.set(key, translated);
          setTranslation(translated);
          return;
        }
      }
    } catch (e) {
      console.warn('Falha na tradução automática:', e);
    } finally {
      setLoadingTranslation(false);
    }

    // Fallback: se falhar a rede, sugere o estudo da palavra
    setTranslation('Significado no estudo');
  };

  const isAlreadyInFlashcards = currentProfileData?.flashcards?.some(
    c => c.word.toLowerCase() === selectedWord.toLowerCase()
  );

  const handleSpeak = (e) => {
    e.stopPropagation();
    speechService.speak(selectedWord, { lang: 'en-US', rate: 0.85 });
  };

  const handleSaveToDeck = (e) => {
    e.stopPropagation();
    if (!selectedWord) return;

    addFlashcard({
      word: selectedWord,
      meaningPt: translation || 'Palavra selecionada',
      exampleEn: contextSentence || selectedWord,
      examplePt: '',
      category: 'Estudo Pessoal'
    });

    setSavedSuccess(true);
    triggerCelebration();

    setTimeout(() => {
      setPopupPos(null);
      setSelectedWord('');
      setTranslation('');
    }, 1800);
  };

  if (!popupPos || !selectedWord) return null;

  return (
    <div
      ref={popupRef}
      style={{
        position: 'absolute',
        top: `${popupPos.top}px`,
        left: `${popupPos.left}px`,
        transform: popupPos.placeBelow ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
        zIndex: 999999,
        background: 'var(--bg-surface)',
        border: '1.5px solid var(--color-gold)',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4), 0 0 15px rgba(180, 83, 9, 0.25)',
        padding: '0.85rem 1rem',
        minWidth: '240px',
        maxWidth: '320px',
        animation: 'fadeIn 0.18s ease-out'
      }}
    >
      {/* Top row: Word + Audio + Close */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-text-main)' }}>
            {selectedWord}
          </span>
          <button
            onClick={handleSpeak}
            style={{
              border: 'none',
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Ouvir pronúncia nativa"
          >
            <Volume2 size={14} />
          </button>
        </div>

        <button
          onClick={() => setPopupPos(null)}
          style={{
            border: 'none',
            background: 'transparent',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '2px',
            borderRadius: '4px'
          }}
          title="Fechar"
        >
          <X size={15} />
        </button>
      </div>

      {/* Translation in Portuguese */}
      <div style={{ marginBottom: '0.65rem' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
          Tradução
        </div>
        <div style={{ fontSize: '0.94rem', color: 'var(--color-gold)', fontWeight: 700 }}>
          {loadingTranslation ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Traduzindo...
            </span>
          ) : (
            translation || 'Carregando tradução...'
          )}
        </div>
      </div>

      {/* Action Button: Enviar para Flashcards */}
      {savedSuccess ? (
        <div style={{
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid var(--color-emerald)',
          color: 'var(--color-emerald)',
          borderRadius: 'var(--border-radius-md)',
          padding: '0.45rem 0.65rem',
          fontSize: '0.8rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.35rem'
        }}>
          <Check size={14} /> Salvo nos seus Flashcards! ✨
        </div>
      ) : isAlreadyInFlashcards ? (
        <div style={{
          background: 'var(--bg-app)',
          color: 'var(--color-text-muted)',
          borderRadius: 'var(--border-radius-md)',
          padding: '0.45rem 0.65rem',
          fontSize: '0.76rem',
          fontWeight: 600,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.35rem'
        }}>
          <Check size={13} color="var(--color-emerald)" /> Já está no seu baralho
        </div>
      ) : (
        <button
          onClick={handleSaveToDeck}
          className="btn btn-gold"
          style={{
            width: '100%',
            padding: '0.45rem 0.75rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem'
          }}
        >
          <Bookmark size={13} />
          Enviar para Flashcards
        </button>
      )}
    </div>
  );
};
