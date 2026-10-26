import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Volume2, 
  Sparkles, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  ArrowRight,
  Filter,
  Bookmark,
  Bot
} from 'lucide-react';
import { BIBLE_BOOKS, BIBLE_VERSES } from '../../data/bibleData';
import { speechService } from '../../services/speechService';
import { WordDetailModal } from '../Devotionals/WordDetailModal';
import { useUser } from '../../context/UserContext';
import { askAITutor } from '../../services/geminiService';

export const BibleView = ({ onOpenDevotional, initialTarget }) => {
  const { currentProfileName, settings } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [testamentFilter, setTestamentFilter] = useState('all'); // 'all', 'OT', 'NT'
  const [selectedBookId, setSelectedBookId] = useState(initialTarget?.bookId || 'genesis');
  const [selectedChapter, setSelectedChapter] = useState(initialTarget?.chapter || 1);
  const [playingVerseId, setPlayingVerseId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [aiChapterContent, setAiChapterContent] = useState(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isReadingAiChapter, setIsReadingAiChapter] = useState(false);
  const [copiedAiChapter, setCopiedAiChapter] = useState(false);

  const booksScrollRef = useRef(null);
  const chaptersScrollRef = useRef(null);

  // Sync with initialTarget if passed
  useEffect(() => {
    if (initialTarget?.bookId) {
      setSelectedBookId(initialTarget.bookId);
      if (initialTarget.chapter) {
        setSelectedChapter(initialTarget.chapter);
      }
    }
  }, [initialTarget]);

  // Active book details
  const activeBook = useMemo(() => {
    return BIBLE_BOOKS.find(b => b.id === selectedBookId) || BIBLE_BOOKS[0];
  }, [selectedBookId]);

  // Filter books by Testament
  const filteredBooks = useMemo(() => {
    if (testamentFilter === 'all') return BIBLE_BOOKS;
    return BIBLE_BOOKS.filter(b => b.testament === testamentFilter);
  }, [testamentFilter]);

  // Scroll controls for books horizontal selector ("seta pra ir para o lado")
  const scrollBooks = (direction) => {
    if (booksScrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      booksScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Scroll controls for chapters horizontal selector
  const scrollChapters = (direction) => {
    if (chaptersScrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      chaptersScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Switch book
  const handleSelectBook = (bookId) => {
    setSelectedBookId(bookId);
    setSelectedChapter(1);
    setAiChapterContent(null);
    speechService.stop();
    setPlayingVerseId(null);
  };

  // Navigate Previous / Next Book
  const handlePrevBook = () => {
    const currentIndex = filteredBooks.findIndex(b => b.id === selectedBookId);
    if (currentIndex > 0) {
      handleSelectBook(filteredBooks[currentIndex - 1].id);
    }
  };

  const handleNextBook = () => {
    const currentIndex = filteredBooks.findIndex(b => b.id === selectedBookId);
    if (currentIndex < filteredBooks.length - 1) {
      handleSelectBook(filteredBooks[currentIndex + 1].id);
    }
  };

  // Navigate Previous / Next Chapter
  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(prev => prev - 1);
      setAiChapterContent(null);
    } else {
      handlePrevBook();
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < activeBook.chapters) {
      setSelectedChapter(prev => prev + 1);
      setAiChapterContent(null);
    } else {
      handleNextBook();
    }
  };

  // Verses for current book and chapter, or search query results
  const currentChapterVerses = useMemo(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      return BIBLE_VERSES.filter(v => {
        const inRef = v.reference.toLowerCase().includes(query) || v.referenceEn.toLowerCase().includes(query);
        const inEn = v.verseEn.toLowerCase().includes(query);
        const inPt = v.versePt.toLowerCase().includes(query);
        const inKeywords = v.keywords?.some(k => k.word.toLowerCase().includes(query) || k.meaning.toLowerCase().includes(query));
        return inRef || inEn || inPt || inKeywords;
      });
    }

    return BIBLE_VERSES.filter(v => v.bookId === selectedBookId && v.chapter === selectedChapter);
  }, [searchQuery, selectedBookId, selectedChapter]);

  // Audio speech player
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

  // Copy verse to clipboard
  const handleCopy = (verse) => {
    const textToCopy = `📖 ${verse.reference} (${verse.referenceEn})\n\n🇺🇸 "${verse.verseEn}"\n\n🇧🇷 "${verse.versePt}"\n\n— Estudo Bíblico no Adam's & Fluency`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(verse.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Request Grace IA for full chapter reading if not pre-seeded
  const handleFetchAiChapter = async () => {
    setIsLoadingAi(true);
    try {
      const prompt = `Por favor, atue como Grace, tutora cristã de inglês. Forneça os versículos mais emblemáticos de ${activeBook.name} (${activeBook.nameEn}) capítulo ${selectedChapter} em formato bilíngue (Inglês NIV e Português NVI), explicando 3 palavras-chave de vocabulário e a mensagem espiritual central para o casal e a família cristã.`;
      const reply = await askAITutor({
        message: prompt,
        history: [],
        apiKey: settings?.geminiApiKey
      });
      setAiChapterContent(reply);
    } catch (err) {
      setAiChapterContent("Desculpe, ocorreu uma instabilidade ao conectar com a IA. Tente novamente em alguns instantes.");
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
          <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <BookOpen size={13} />
            Bíblia Sagrada Bilíngue • 66 Livros
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Gênesis a Apocalipse (NIV / NVI)
          </span>
        </div>
        <h1 style={{ fontSize: '1.95rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          Leitor da Bíblia Sagrada
        </h1>
        <p style={{ fontSize: '0.94rem', color: 'var(--color-text-muted)', maxWidth: '780px' }}>
          Navegue livro a livro do Antigo ao Novo Testamento. Ouça a pronúncia em inglês nativo, explore vocabulário bíblico e acesse estudos dos Devocionais conectados.
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
          placeholder="Pesquisar em toda a Bíblia (ex: Salmo 23, love, peace, Rom 8, criação, aliança)..."
          style={{
            width: '100%',
            padding: '0.85rem 2.5rem 0.85rem 2.6rem',
            borderRadius: 'var(--border-radius-lg)',
            border: '2px solid var(--border-color)',
            background: 'var(--bg-surface)',
            color: 'var(--color-text-main)',
            fontSize: '16px',
            boxShadow: 'var(--shadow-sm)'
          }}
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

      {/* Testament Filter Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setTestamentFilter('all')}
          className={`btn ${testamentFilter === 'all' ? 'btn-gold' : 'btn-outline'}`}
          style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
        >
          📖 Todos os 66 Livros
        </button>
        <button
          onClick={() => setTestamentFilter('OT')}
          className={`btn ${testamentFilter === 'OT' ? 'btn-gold' : 'btn-outline'}`}
          style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
        >
          📜 Antigo Testamento (39)
        </button>
        <button
          onClick={() => setTestamentFilter('NT')}
          className={`btn ${testamentFilter === 'NT' ? 'btn-gold' : 'btn-outline'}`}
          style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
        >
          ✝️ Novo Testamento (27)
        </button>
      </div>

      {/* Book Selector with Visible Left & Right Scroll Arrows ("Seta pra ir para o lado") */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.4rem', 
        marginBottom: '1.25rem',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '0.4rem 0.5rem'
      }}>
        <button
          onClick={() => scrollBooks('left')}
          title="Rolar livros para a esquerda"
          style={{
            background: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            color: 'var(--color-text-main)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={booksScrollRef}
          style={{
            display: 'flex',
            gap: '0.45rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            flex: 1,
            padding: '0.2rem 0.1rem'
          }}
        >
          {filteredBooks.map((book) => {
            const isSelected = book.id === selectedBookId;
            return (
              <button
                key={book.id}
                onClick={() => handleSelectBook(book.id)}
                style={{
                  flexShrink: 0,
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--border-radius-md)',
                  border: isSelected ? '1px solid var(--color-gold)' : '1px solid var(--border-color)',
                  background: isSelected ? 'var(--color-gold)' : 'var(--bg-card)',
                  color: isSelected ? '#ffffff' : 'var(--color-text-main)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{book.name}</span>
                <span style={{ 
                  fontSize: '0.7rem', 
                  opacity: 0.8,
                  background: isSelected ? 'rgba(0,0,0,0.18)' : 'var(--bg-surface-elevated)',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '4px'
                }}>
                  {book.abbrev}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollBooks('right')}
          title="Rolar livros para a direita"
          style={{
            background: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            color: 'var(--color-text-main)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Active Book Info Bar */}
      {!searchQuery && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderLeft: '4px solid var(--color-gold)',
          borderRadius: 'var(--border-radius-lg)',
          padding: '1rem 1.25rem',
          marginBottom: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--color-gold)' }}>
              {activeBook.testament === 'OT' ? 'Antigo Testamento' : 'Novo Testamento'} • {activeBook.category}
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0.15rem 0', color: 'var(--color-text-main)' }}>
              {activeBook.name} <span style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>({activeBook.nameEn})</span>
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Total de {activeBook.chapters} capítulos • Lendo capítulo {selectedChapter}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handlePrevBook}
              className="btn btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              title="Livro anterior"
            >
              <ArrowLeft size={13} /> Livro Anterior
            </button>
            <button
              onClick={handleNextBook}
              className="btn btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              title="Próximo livro"
            >
              Próximo Livro <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Chapter Selector with Side Arrows ("Seta pra ir para o lado") */}
      {!searchQuery && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.4rem', 
          marginBottom: '1.75rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-md)',
          padding: '0.35rem 0.5rem'
        }}>
          <button
            onClick={() => scrollChapters('left')}
            title="Capítulos anteriores"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={chaptersScrollRef}
            style={{
              display: 'flex',
              gap: '0.35rem',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              flex: 1,
              padding: '0.1rem 0'
            }}
          >
            {Array.from({ length: activeBook.chapters }, (_, i) => i + 1).map((chapNum) => {
              const isSelected = chapNum === selectedChapter;
              return (
                <button
                  key={chapNum}
                  onClick={() => {
                    setSelectedChapter(chapNum);
                    setAiChapterContent(null);
                    speechService.stop();
                    setPlayingVerseId(null);
                  }}
                  style={{
                    flexShrink: 0,
                    minWidth: '36px',
                    height: '34px',
                    padding: '0 0.45rem',
                    borderRadius: 'var(--border-radius-sm)',
                    border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--border-color)',
                    background: isSelected ? 'var(--color-primary)' : 'var(--bg-app)',
                    color: isSelected ? '#ffffff' : 'var(--color-text-main)',
                    fontWeight: isSelected ? 800 : 500,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s'
                  }}
                >
                  {chapNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scrollChapters('right')}
            title="Mais capítulos"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Search results banner */}
      {searchQuery && (
        <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
            Encontrados <strong>{currentChapterVerses.length}</strong> versículos para "{searchQuery}"
          </span>
          <button onClick={() => setSearchQuery('')} className="btn-ghost" style={{ fontSize: '0.82rem' }}>
            Voltar para leitura normal
          </button>
        </div>
      )}

      {/* Verses Container */}
      {currentChapterVerses.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          {currentChapterVerses.map((verse) => (
            <div 
              key={verse.id} 
              className="card"
              style={{
                position: 'relative',
                borderLeft: verse.linkedDevotional ? '5px solid var(--color-gold)' : '1px solid var(--border-color)'
              }}
            >
              {/* Verse Reference & Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-gold" style={{ fontWeight: 800 }}>
                    {verse.reference}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    {verse.referenceEn}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    onClick={() => handlePlayAudio(verse)}
                    className="btn btn-outline"
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.7rem' }}
                    title="Ouvir em inglês nativo"
                  >
                    <Volume2 size={14} className={playingVerseId === verse.id ? 'speaking-pulse' : ''} />
                    {playingVerseId === verse.id ? 'Parar' : '🇺🇸 Ouvir'}
                  </button>
                  <button
                    onClick={() => handleCopy(verse)}
                    className="btn btn-outline"
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.7rem' }}
                    title="Copiar versículo com citação"
                  >
                    {copiedId === verse.id ? <Check size={14} color="var(--color-emerald)" /> : <Copy size={14} />}
                    {copiedId === verse.id ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              {/* English Scripture (NIV) */}
              <div style={{ 
                background: 'var(--bg-app)', 
                padding: '1.1rem 1.25rem', 
                borderRadius: 'var(--border-radius-md)', 
                border: '1px solid var(--border-color)',
                marginBottom: '0.85rem'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                  English (NIV):
                </div>
                <div style={{ fontSize: '1.08rem', lineHeight: '1.7', color: 'var(--color-text-main)', fontStyle: 'italic' }}>
                  "{verse.verseEn}"
                </div>
              </div>

              {/* Portuguese Scripture (NVI) */}
              <div style={{ 
                padding: '0.9rem 1.2rem', 
                borderRadius: 'var(--border-radius-md)', 
                background: 'var(--bg-surface-elevated)',
                lineHeight: '1.65',
                fontSize: '0.98rem',
                color: 'var(--color-text-main)',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.25rem' }}>
                  Português (NVI):
                </div>
                "{verse.versePt}"
              </div>

              {/* Highlighted Vocabulary Keywords */}
              {verse.keywords && verse.keywords.length > 0 && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
                    Vocabulário em Destaque (Toque para ouvir e salvar nos flashcards):
                  </div>
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                    {verse.keywords.map((kw, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedWord({
                          word: kw.word,
                          ipa: kw.ipa,
                          pos: 'Biblical Vocabulary',
                          meaningPt: kw.meaning,
                          exampleEn: verse.verseEn,
                          examplePt: verse.versePt
                        })}
                        style={{
                          background: 'var(--bg-app)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--border-radius-full)',
                          padding: '0.3rem 0.65rem',
                          fontSize: '0.78rem',
                          color: 'var(--color-primary)',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <span>{kw.word}</span>
                        {kw.ipa && <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{kw.ipa}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Spiritual Reflection */}
              {verse.reflectionEn && (
                <div style={{ 
                  fontSize: '0.86rem', 
                  color: 'var(--color-text-muted)', 
                  borderTop: '1px dashed var(--border-color)', 
                  paddingTop: '0.65rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.4rem'
                }}>
                  <Sparkles size={14} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <strong>Reflexão:</strong> {verse.reflectionPt || verse.reflectionEn}
                  </div>
                </div>
              )}

              {/* LINK COM DEVOCIONAL (Quando esta passagem está ligada ao devocional diário) */}
              {verse.linkedDevotional && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(180, 83, 9, 0.08) 100%)',
                  border: '1px solid var(--color-gold)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '0.9rem 1.15rem',
                  marginTop: '0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-gold)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <Sparkles size={13} /> Devocional Conectado • Dia {verse.linkedDevotional.day}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--color-text-main)', marginTop: '0.15rem' }}>
                      {verse.linkedDevotional.title}
                    </div>
                    {verse.linkedDevotional.titlePt && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                        {verse.linkedDevotional.titlePt}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => onOpenDevotional && onOpenDevotional(verse.linkedDevotional.id)}
                    className="btn btn-gold"
                    style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
                  >
                    <BookOpen size={14} /> Abrir no Devocional →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Empty State / AI Reading for Chapters not in Curated List */
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', marginBottom: '2rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <BookOpen size={26} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            {activeBook.name} {selectedChapter}
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', maxWidth: '540px', margin: '0 auto 1.25rem' }}>
            Você está navegando em {activeBook.name} ({activeBook.nameEn}), capítulo {selectedChapter}. Deseja que a tutora Grace IA gere a leitura bilíngue deste capítulo com foco em inglês e devocional?
          </p>

          <button
            onClick={handleFetchAiChapter}
            disabled={isLoadingAi}
            className="btn btn-gold"
            style={{ fontSize: '0.9rem', padding: '0.6rem 1.2rem', margin: '0 auto' }}
          >
            <Bot size={16} />
            {isLoadingAi ? 'Grace IA está carregando o capítulo...' : '✨ Gerar Leitura Bilíngue deste Capítulo com Grace IA'}
          </button>

          {aiChapterContent && (
            <div style={{ 
              marginTop: '1.75rem', 
              textAlign: 'left', 
              background: 'var(--bg-app)', 
              padding: '1.4rem 1.5rem', 
              borderRadius: 'var(--border-radius-lg)', 
              border: '1px solid var(--border-color)',
              borderLeft: '4px solid var(--color-gold)',
              lineHeight: '1.75',
              fontSize: '0.96rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Bot size={14} />
                  Estudo de {activeBook.name} {selectedChapter} • Grace IA
                </span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    onClick={() => {
                      if (isReadingAiChapter) {
                        speechService.stop();
                        setIsReadingAiChapter(false);
                      } else {
                        speechService.stop();
                        setIsReadingAiChapter(true);
                        speechService.speak(aiChapterContent, {
                          lang: 'pt-BR',
                          rate: 0.95,
                          onEnd: () => setIsReadingAiChapter(false),
                          onError: () => setIsReadingAiChapter(false)
                        });
                      }
                    }}
                    className="btn btn-outline"
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }}
                  >
                    <Volume2 size={13} className={isReadingAiChapter ? 'speaking-pulse' : ''} />
                    {isReadingAiChapter ? 'Parar Leitura' : 'Ouvir Explicação'}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(aiChapterContent);
                      setCopiedAiChapter(true);
                      setTimeout(() => setCopiedAiChapter(false), 2000);
                    }}
                    className="btn btn-outline"
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }}
                  >
                    {copiedAiChapter ? <Check size={13} color="var(--color-emerald)" /> : <Copy size={13} />}
                    {copiedAiChapter ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
              <div style={{ whiteSpace: 'pre-wrap', color: 'var(--color-text-main)' }}>
                {aiChapterContent}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chapter Pagination Navigation Buttons (Setas para ir para o lado) */}
      {!searchQuery && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-lg)',
          padding: '1rem 1.25rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <button
            onClick={handlePrevChapter}
            className="btn btn-outline"
            style={{ fontSize: '0.86rem', padding: '0.45rem 0.95rem' }}
          >
            <ChevronLeft size={16} /> Capítulo Anterior
          </button>

          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-gold)' }}>
            {activeBook.name} {selectedChapter} de {activeBook.chapters}
          </span>

          <button
            onClick={handleNextChapter}
            className="btn btn-outline"
            style={{ fontSize: '0.86rem', padding: '0.45rem 0.95rem' }}
          >
            Próximo Capítulo <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Word Detail Modal for Vocabulary */}
      <WordDetailModal
        wordData={selectedWord}
        isOpen={Boolean(selectedWord)}
        onClose={() => setSelectedWord(null)}
      />
    </div>
  );
};
