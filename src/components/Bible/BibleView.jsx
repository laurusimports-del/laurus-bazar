import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Volume2, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Bookmark, 
  Heart,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';
import { BIBLE_VERSES, BIBLE_THEMES, BIBLE_BOOKS } from '../../data/bibleData';
import { speechService } from '../../services/speechService';
import { WordDetailModal } from '../Devotionals/WordDetailModal';
import { useUser } from '../../context/UserContext';

export const BibleView = () => {
  const { currentProfileName } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedBook, setSelectedBook] = useState('all');
  const [playingVerseId, setPlayingVerseId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);

  // Filter verses dynamically based on search, theme, and book
  const filteredVerses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return BIBLE_VERSES.filter((v) => {
      // Theme filter
      if (selectedTheme !== 'all' && v.themeId !== selectedTheme) {
        return false;
      }
      // Book filter
      if (selectedBook !== 'all' && v.bookId !== selectedBook) {
        return false;
      }
      // Query filter
      if (!query) return true;

      const inRef = v.reference.toLowerCase().includes(query) || v.referenceEn.toLowerCase().includes(query);
      const inEn = v.verseEn.toLowerCase().includes(query);
      const inPt = v.versePt.toLowerCase().includes(query);
      const inKeywords = v.keywords.some(k => k.word.toLowerCase().includes(query) || k.meaning.toLowerCase().includes(query));

      return inRef || inEn || inPt || inKeywords;
    });
  }, [searchQuery, selectedTheme, selectedBook]);

  const handlePlayAudio = (verse) => {
    if (playingVerseId === verse.id) {
      speechService.stop();
      setPlayingVerseId(null);
      return;
    }

    speechService.stop();
    setPlayingVerseId(verse.id);
    speechService.speak(verse.verseEn, {
      lang: 'en-US',
      rate: 0.85,
      onEnd: () => setPlayingVerseId(null),
      onError: () => setPlayingVerseId(null)
    });
  };

  const handleCopy = (verse) => {
    const textToCopy = `📖 ${verse.reference} (${verse.referenceEn})\n\n🇺🇸 "${verse.verseEn}"\n\n🇧🇷 "${verse.versePt}"\n\n— Estudado no Adam's & Fluency`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(verse.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Versículo do dia em destaque (primeiro da lista ou Salmo 23)
  const verseOfTheDay = BIBLE_VERSES[0];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <BookOpen size={13} />
            Bíblia Sagrada Bilíngue • Holy Bible
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            NIV (English) • NVI (Português)
          </span>
        </div>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          Palavra de Deus & Pesquisa Bíblica
        </h1>
        <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)', maxWidth: '780px' }}>
          Explore as Escrituras em inglês e português. Pesquise por temas, livros ou palavras-chave, ouça a pronúncia em inglês nativo e guarde promessas vivas no coração da sua família.
        </p>
      </div>

      {/* Search Input Bar */}
      <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
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
          placeholder="Pesquisar na Bíblia (ex: peace, love, coração, fé, grace)..."
          style={{
            width: '100%',
            padding: '0.85rem 2.5rem 0.85rem 2.6rem',
            borderRadius: 'var(--border-radius-lg)',
            border: '2px solid var(--border-color)',
            background: 'var(--bg-surface)',
            color: 'var(--color-text-main)',
            fontSize: '16px',
            boxShadow: 'var(--shadow-sm)',
            transition: 'border-color 0.2s ease'
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

      {/* Thematic Filter Chips */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.65rem',
        marginBottom: '1rem',
        scrollbarWidth: 'none'
      }}>
        {BIBLE_THEMES.map((theme) => {
          const isActive = selectedTheme === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--border-radius-full)',
                border: isActive ? '1px solid var(--color-gold)' : '1px solid var(--border-color)',
                background: isActive ? 'var(--color-gold)' : 'var(--bg-surface)',
                color: isActive ? '#ffffff' : 'var(--color-text-main)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{theme.icon}</span>
              <span>{theme.label}</span>
            </button>
          );
        })}
      </div>

      {/* Book Filter Chips */}
      <div style={{
        display: 'flex',
        gap: '0.45rem',
        overflowX: 'auto',
        paddingBottom: '0.65rem',
        marginBottom: '1.75rem',
        scrollbarWidth: 'none'
      }}>
        {BIBLE_BOOKS.map((book) => {
          const isActive = selectedBook === book.id;
          return (
            <button
              key={book.id}
              onClick={() => setSelectedBook(book.id)}
              style={{
                flexShrink: 0,
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--border-radius-md)',
                border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--border-color)',
                background: isActive ? 'var(--color-primary)' : 'var(--bg-app)',
                color: isActive ? '#ffffff' : 'var(--color-text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {book.name} ({book.nameEn})
            </button>
          );
        })}
      </div>

      {/* Verse of the Day Spotlight (When not searching) */}
      {!searchQuery && selectedTheme === 'all' && selectedBook === 'all' && (
        <div className="card" style={{
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(49, 46, 129, 0.08) 100%)',
          border: '1.5px solid var(--color-gold)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="badge badge-gold">
                <Sparkles size={13} />
                Versículo do Dia em Destaque
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-gold)' }}>
                {verseOfTheDay.reference}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                onClick={() => handlePlayAudio(verseOfTheDay)}
                className={`btn ${playingVerseId === verseOfTheDay.id ? 'btn-gold' : 'btn-outline'}`}
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              >
                <Volume2 size={14} />
                {playingVerseId === verseOfTheDay.id ? 'Pausar Áudio' : '🔊 Ouvir em Inglês'}
              </button>
              <button
                onClick={() => handleCopy(verseOfTheDay)}
                className="btn btn-outline"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                title="Copiar Versículo Formatado"
              >
                {copiedId === verseOfTheDay.id ? <Check size={14} color="var(--color-emerald)" /> : <Copy size={14} />}
                {copiedId === verseOfTheDay.id ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-main)', lineHeight: 1.6, marginBottom: '0.65rem' }}>
            "{verseOfTheDay.verseEn}"
          </div>
          <div style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.55, fontStyle: 'italic', marginBottom: '1rem' }}>
            "{verseOfTheDay.versePt}"
          </div>

          <div style={{
            background: 'var(--bg-surface)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--border-radius-md)',
            borderLeft: '3px solid var(--color-gold)',
            fontSize: '0.85rem',
            color: 'var(--color-text-main)'
          }}>
            <strong>Reflexão para o Casal:</strong> {verseOfTheDay.reflectionPt}
          </div>
        </div>
      )}

      {/* Verses Counter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
          {filteredVerses.length} {filteredVerses.length === 1 ? 'passagem bíblica encontrada' : 'passagens bíblicas encontradas'}
        </span>
      </div>

      {/* Verses List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredVerses.map((verse) => {
          const isPlaying = playingVerseId === verse.id;
          const isCopied = copiedId === verse.id;

          return (
            <div 
              key={verse.id} 
              className="card"
              style={{
                transition: 'all 0.2s ease',
                borderLeft: '4px solid var(--color-primary)'
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                      {verse.reference}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      • {verse.referenceEn}
                    </span>
                  </div>
                  <span className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                    {verse.bookNameEn} • {BIBLE_THEMES.find(t => t.id === verse.themeId)?.label}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                  <button
                    onClick={() => handlePlayAudio(verse)}
                    className={`btn ${isPlaying ? 'btn-gold' : 'btn-outline'}`}
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                    title="Ouvir pronúncia em inglês nativo"
                  >
                    <Volume2 size={14} />
                    {isPlaying ? 'Pausar' : '🔊 Ouvir'}
                  </button>
                  <button
                    onClick={() => handleCopy(verse)}
                    className="btn btn-outline"
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                    title="Copiar para compartilhar"
                  >
                    {isCopied ? <Check size={14} color="var(--color-emerald)" /> : <Copy size={14} />}
                    {isCopied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              {/* English Scripture */}
              <div style={{
                background: 'var(--bg-app)',
                padding: '1rem',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--border-color)',
                fontSize: '1.05rem',
                lineHeight: 1.65,
                fontWeight: 600,
                color: 'var(--color-text-main)',
                marginBottom: '0.75rem'
              }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--color-gold)', marginBottom: '0.25rem' }}>
                  🇺🇸 English (NIV):
                </div>
                "{verse.verseEn}"
              </div>

              {/* Portuguese Scripture */}
              <div style={{
                background: 'var(--bg-surface-elevated)',
                padding: '1rem',
                borderRadius: 'var(--border-radius-md)',
                fontSize: '0.96rem',
                lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                  🇧🇷 Português (NVI):
                </div>
                "{verse.versePt}"
              </div>

              {/* Keywords Highlight */}
              {verse.keywords && verse.keywords.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                    Vocabulário Chave:
                  </span>
                  {verse.keywords.map((kw, kIdx) => (
                    <button
                      key={kIdx}
                      onClick={() => setSelectedWord({
                        word: kw.word,
                        ipa: kw.ipa,
                        pos: 'bíblico',
                        meaningPt: kw.meaning,
                        exampleEn: verse.verseEn,
                        examplePt: verse.versePt
                      })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--border-radius-sm)',
                        background: 'var(--bg-app)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        color: 'var(--color-text-main)'
                      }}
                      title="Clique para ver detalhes e salvar no flashcard"
                    >
                      <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{kw.word}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>({kw.meaning})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredVerses.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <BookOpen size={36} color="var(--color-text-muted)" style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Nenhum versículo encontrado para "{searchQuery}"
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
              Tente pesquisar por termos mais gerais em inglês ou português, como "love", "peace", "faith", "coração" ou "graça".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTheme('all');
                setSelectedBook('all');
              }}
              className="btn btn-gold"
            >
              Ver Todas as Passagens Bíblicas
            </button>
          </div>
        )}
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
