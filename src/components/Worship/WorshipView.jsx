import React, { useState } from 'react';
import { 
  Music, 
  Play, 
  Volume2, 
  Heart, 
  Bookmark, 
  Sparkles, 
  CheckCircle, 
  Eye, 
  EyeOff,
  Video
} from 'lucide-react';
import { WORSHIP_SONGS_DATA } from '../../data/worshipSongsData';
import { useUser } from '../../context/UserContext';
import { speechService } from '../../services/speechService';

export const WorshipView = () => {
  const { currentProfileData, toggleFavoriteSong, addFlashcard, triggerCelebration } = useUser();
  const [selectedSongId, setSelectedSongId] = useState('goodness-of-god');
  const [showPtLyrics, setShowPtLyrics] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [playingLyricIdx, setPlayingLyricIdx] = useState(null);
  const [playingLyricPtIdx, setPlayingLyricPtIdx] = useState(null);

  const activeSong = WORSHIP_SONGS_DATA.find(s => s.id === selectedSongId) || WORSHIP_SONGS_DATA[0];
  const isFavorite = currentProfileData?.favoriteSongs?.includes(activeSong.id);

  const handleSpeakLyrics = (text, idx) => {
    if (playingLyricIdx === idx) {
      speechService.stop();
      setPlayingLyricIdx(null);
      return;
    }
    speechService.stop();
    setPlayingLyricPtIdx(null);
    setPlayingLyricIdx(idx);
    speechService.speak(text, {
      lang: 'en-US',
      rate: 0.8,
      onEnd: () => setPlayingLyricIdx(null),
      onError: () => setPlayingLyricIdx(null)
    });
  };

  const handleSpeakLyricsPt = (text, idx) => {
    if (playingLyricPtIdx === idx) {
      speechService.stop();
      setPlayingLyricPtIdx(null);
      return;
    }
    speechService.stop();
    setPlayingLyricIdx(null);
    setPlayingLyricPtIdx(idx);
    speechService.speak(text, {
      lang: 'pt-BR',
      rate: 0.95,
      onEnd: () => setPlayingLyricPtIdx(null),
      onError: () => setPlayingLyricPtIdx(null)
    });
  };

  const handleQuizAnswer = (qIndex, selectedWord) => {
    if (quizAnswers[qIndex] !== undefined) return;
    const isCorrect = selectedWord === activeSong.fillInTheBlank[qIndex].correctWord;
    const newAnswers = { ...quizAnswers, [qIndex]: selectedWord };
    setQuizAnswers(newAnswers);

    if (isCorrect && Object.keys(newAnswers).length === activeSong.fillInTheBlank.length) {
      triggerCelebration();
    }
  };

  const handleSaveWord = (vocab) => {
    addFlashcard({
      word: vocab.word,
      ipa: vocab.ipa,
      category: 'Worship Songs',
      meaningPt: vocab.meaningPt,
      exampleEn: vocab.exampleEn
    });
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-rose">
            <Music size={13} />
            Worship & Praise
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Aprenda Inglês com Louvores
          </span>
        </div>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          Músicas & Louvores em Inglês
        </h1>
        <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)' }}>
          Cante, estude as letras poéticas bíblicas e complete as lacunas das músicas cristãs mais amadas do mundo.
        </p>
      </div>

      {/* Song selector tabs */}
      <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        {WORSHIP_SONGS_DATA.map(song => {
          const isCurrent = song.id === activeSong.id;
          return (
            <button
              key={song.id}
              onClick={() => {
                setSelectedSongId(song.id);
                setQuizAnswers({});
                speechService.stop();
                setPlayingLyricIdx(null);
              }}
              style={{
                flexShrink: 0,
                padding: '0.75rem 1.1rem',
                borderRadius: 'var(--border-radius-lg)',
                border: isCurrent ? '2px solid var(--color-gold)' : '1px solid var(--border-color)',
                background: isCurrent ? 'var(--bg-surface)' : 'var(--bg-card)',
                boxShadow: isCurrent ? 'var(--shadow-md)' : 'none',
                textAlign: 'left',
                minWidth: '190px'
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-text-main)', marginBottom: '0.2rem' }}>
                {song.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                {song.artist}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Song Hero Card */}
      <div className="card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-gold">{activeSong.theme}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Artista: {activeSong.artist}
              </span>
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              {activeSong.title}
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
              {activeSong.introPt}
            </p>
          </div>

          <button 
            onClick={() => toggleFavoriteSong(activeSong.id)}
            className={`btn ${isFavorite ? 'btn-gold' : 'btn-outline'}`}
            style={{ fontSize: '0.85rem' }}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
            {isFavorite ? 'Favorita do Casal' : 'Marcar Favorita'}
          </button>
        </div>

        {/* Video Embed */}
        {activeSong.youtubeId && (
          <div style={{ 
            position: 'relative', 
            paddingBottom: '56.25%', 
            height: 0, 
            overflow: 'hidden', 
            borderRadius: 'var(--border-radius-md)',
            marginBottom: '1.5rem',
            background: '#000'
          }}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeSong.youtubeId}`}
              title={activeSong.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Lyrics Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
            Letra Bilíngue & Pronúncia (Lyrics)
          </h3>
          <button 
            onClick={() => setShowPtLyrics(!showPtLyrics)}
            className="btn btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            {showPtLyrics ? <EyeOff size={14} /> : <Eye size={14} />}
            {showPtLyrics ? 'Ocultar Tradução' : 'Mostrar Tradução'}
          </button>
        </div>

        {/* Lyrics Stanzas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {activeSong.lyrics.map((section, idx) => (
            <div 
              key={idx}
              style={{
                background: 'var(--bg-app)',
                borderRadius: 'var(--border-radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
                  {section.section}
                </span>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button 
                    onClick={() => handleSpeakLyrics(section.en, idx)}
                    className="btn-ghost"
                    style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem' }}
                    title="Ouvir estrofe em inglês"
                  >
                    <Volume2 size={14} className={playingLyricIdx === idx ? 'speaking-pulse' : ''} />
                    🇺🇸 EN
                  </button>
                  {showPtLyrics && (
                    <button 
                      onClick={() => handleSpeakLyricsPt(section.pt, idx)}
                      className="btn-ghost"
                      style={{ fontSize: '0.78rem', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem' }}
                      title="Ouvir tradução em português"
                    >
                      <Volume2 size={14} className={playingLyricPtIdx === idx ? 'speaking-pulse' : ''} />
                      🇧🇷 PT
                    </button>
                  )}
                </div>
              </div>

              {/* English Lines */}
              <div style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem', 
                fontWeight: 600, 
                color: 'var(--color-text-main)', 
                whiteSpace: 'pre-line',
                lineHeight: '1.7',
                marginBottom: showPtLyrics ? '0.75rem' : '0'
              }}>
                {section.en}
              </div>

              {/* Portuguese Lines */}
              {showPtLyrics && (
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--color-text-muted)', 
                  whiteSpace: 'pre-line',
                  lineHeight: '1.6',
                  borderTop: '1px dashed var(--border-color)',
                  paddingTop: '0.5rem'
                }}>
                  {section.pt}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key Song Vocabulary */}
      <div className="card" style={{ marginBottom: '1.75rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Vocabulário Chave da Música
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
          Termos e phrasal verbs importantes para o seu dia a dia e louvor:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {activeSong.vocabulary.map((vocab, vIdx) => {
            const isSaved = currentProfileData?.flashcards?.some(
              c => c.word.toLowerCase() === vocab.word.toLowerCase()
            );

            return (
              <div 
                key={vIdx}
                style={{
                  background: 'var(--bg-app)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '1rem',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                      {vocab.word}
                    </span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button 
                        onClick={() => speechService.speak(vocab.word, { lang: 'en-US', rate: 0.85 })}
                        className="btn-ghost"
                        style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem' }}
                        title="Ouvir em inglês"
                      >
                        <Volume2 size={14} /> EN
                      </button>
                      <button 
                        onClick={() => speechService.speak(vocab.meaningPt, { lang: 'pt-BR', rate: 0.95 })}
                        className="btn-ghost"
                        style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem', color: 'var(--color-gold)' }}
                        title="Ouvir tradução em português"
                      >
                        <Volume2 size={14} /> PT
                      </button>
                    </div>
                  </div>
                  {vocab.ipa && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-gold)', marginBottom: '0.4rem', fontWeight: 500 }}>
                      {vocab.ipa}
                    </div>
                  )}
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
                    {vocab.meaningPt}
                  </div>
                  {vocab.exampleEn && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                      “{vocab.exampleEn}”
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleSaveWord(vocab)}
                  disabled={isSaved}
                  className={`btn ${isSaved ? 'btn-outline' : 'btn-gold'}`}
                  style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem', marginTop: '0.5rem' }}
                >
                  {isSaved ? (
                    <>
                      <CheckCircle size={14} color="var(--color-emerald)" />
                      Salvo nos Flashcards
                    </>
                  ) : (
                    <>
                      <Bookmark size={14} />
                      Salvar Cartão (+10 pts)
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fill in the Blanks Song Quiz Game */}
      {activeSong.fillInTheBlank && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
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
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                Desafio: Fill in the Blanks (Complete a Letra)
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                Ouça ou lembre da música e selecione a palavra correta para cada estrofe
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {activeSong.fillInTheBlank.map((item, idx) => {
              const selectedWord = quizAnswers[idx];
              const isAnswered = selectedWord !== undefined;

              return (
                <div 
                  key={idx}
                  style={{
                    background: 'var(--bg-app)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: '1.1rem',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    {item.linePrompt}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.85rem' }}>
                    Significado: {item.linePt}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {item.options.map((option, optIdx) => {
                      let btnStyle = 'btn-outline';

                      if (isAnswered) {
                        if (option === item.correctWord) {
                          btnStyle = 'badge-emerald';
                        } else if (selectedWord === option) {
                          btnStyle = 'badge-rose';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleQuizAnswer(idx, option)}
                          className={`btn ${btnStyle}`}
                          style={{ fontSize: '0.88rem', padding: '0.45rem 1rem' }}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
