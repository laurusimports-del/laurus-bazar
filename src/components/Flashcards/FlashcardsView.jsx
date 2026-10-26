import React, { useState } from 'react';
import { 
  Bookmark, 
  RotateCw, 
  Volume2, 
  Plus, 
  Search, 
  CheckCircle, 
  Sparkles, 
  BookOpen, 
  Heart,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { speechService } from '../../services/speechService';

export const FlashcardsView = () => {
  const { currentProfileData, reviewFlashcard, addFlashcard, currentProfileName } = useUser();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Card Form State
  const [newWord, setNewWord] = useState('');
  const [newIpa, setNewIpa] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newCategory, setNewCategory] = useState('Daily Couple Life');
  const [newExampleEn, setNewExampleEn] = useState('');
  const [newExamplePt, setNewExamplePt] = useState('');

  const flashcards = currentProfileData?.flashcards || [];

  const filteredCards = flashcards.filter(c => {
    const matchesCategory = activeCategory === 'ALL' || c.category === activeCategory;
    const matchesSearch = c.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.meaningPt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCard = filteredCards[currentCardIndex] || filteredCards[0];

  const handleSpeakEn = (text) => {
    speechService.speak(text, { lang: 'en-US', rate: 0.85 });
  };

  const handleSpeakPt = (text) => {
    speechService.speak(text, { lang: 'pt-BR', rate: 0.95 });
  };

  const handleRating = (rating) => {
    if (!activeCard) return;
    reviewFlashcard(activeCard.id, rating);
    setIsFlipped(false);
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev + 1) % (filteredCards.length || 1));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev - 1 + filteredCards.length) % (filteredCards.length || 1));
  };

  const handleCreateCard = (e) => {
    e.preventDefault();
    if (!newWord || !newMeaning) return;

    addFlashcard({
      word: newWord,
      ipa: newIpa,
      meaningPt: newMeaning,
      category: newCategory,
      exampleEn: newExampleEn,
      examplePt: newExamplePt
    });

    setNewWord('');
    setNewIpa('');
    setNewMeaning('');
    setNewExampleEn('');
    setNewExamplePt('');
    setIsAddModalOpen(false);
  };

  const categories = ['ALL', 'Faith & Bible', 'Couple Daily Life', 'Feelings & Mind', 'Bible Study'];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-indigo">
              <Layers size={13} />
              Spaced Repetition System
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Baralho de {currentProfileName}
            </span>
          </div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            Memorização & Flashcards
          </h1>
          <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)' }}>
            Revise com áudio nativo em inglês e português para fixar pronúncia e significado.
          </p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-gold"
          style={{ padding: '0.65rem 1.25rem' }}
        >
          <Plus size={17} /> Criar Novo Cartão
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ 
          position: 'relative', 
          flex: '1', 
          minWidth: '220px', 
          background: 'var(--bg-surface)', 
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 0.75rem'
        }}>
          <Search size={16} color="var(--color-text-light)" />
          <input
            type="text"
            placeholder="Buscar palavra ou tradução..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentCardIndex(0);
            }}
            style={{
              border: 'none',
              background: 'transparent',
              padding: '0.65rem 0.5rem',
              width: '100%',
              outline: 'none',
              color: 'var(--color-text-main)'
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className={`badge ${activeCategory === cat ? 'badge-gold' : 'btn-outline'}`}
              style={{ cursor: 'pointer', padding: '0.45rem 0.85rem' }}
            >
              {cat === 'ALL' ? 'Todos os Decks' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Card Viewer */}
      {filteredCards.length > 0 && activeCard ? (
        <div style={{ maxWidth: '640px', margin: '0 auto 2.5rem' }}>
          {/* Progress counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', padding: '0 0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
              Cartão {currentCardIndex + 1} de {filteredCards.length}
            </span>
            <span className="badge badge-gold">
              Nível {activeCard.box || 1} / 5
            </span>
          </div>

          {/* Flashcard Box */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--border-radius-xl)',
              minHeight: '340px',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            {/* Top Category Badge & Audio */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span className="badge badge-indigo">
                {activeCard.category || 'Geral'}
              </span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeakEn(activeCard.word);
                  }}
                  className="btn btn-outline"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                  title="Ouvir palavra em inglês"
                >
                  <Volume2 size={15} /> 🇺🇸 EN
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeakPt(activeCard.meaningPt);
                  }}
                  className="btn btn-outline"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', borderColor: 'var(--color-gold)' }}
                  title="Ouvir tradução em português"
                >
                  <Volume2 size={15} color="var(--color-gold)" /> 🇧🇷 PT
                </button>
              </div>
            </div>

            {/* Front vs Back Content */}
            {!isFlipped ? (
              <div style={{ padding: '2rem 0' }}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 800, 
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-text-main)',
                  marginBottom: '0.5rem'
                }}>
                  {activeCard.word}
                </h2>
                {activeCard.ipa && (
                  <p style={{ fontSize: '1.15rem', color: 'var(--color-gold)', fontWeight: 500 }}>
                    {activeCard.ipa}
                  </p>
                )}
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: '1.5rem' }}>
                  (Toque no cartão para virar e ver a tradução com áudio)
                </p>
              </div>
            ) : (
              <div style={{ padding: '0.75rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                    Significado em Português:
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeakPt(activeCard.meaningPt);
                    }}
                    style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem', cursor: 'pointer' }}
                  >
                    <Volume2 size={13} /> Ouvir PT
                  </button>
                </div>
                <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>
                  {activeCard.meaningPt}
                </h3>

                {activeCard.exampleEn && (
                  <div style={{ 
                    background: 'var(--bg-app)', 
                    padding: '1rem', 
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    textAlign: 'left',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-primary)' }}>EXEMPLO EM INGLÊS:</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeakEn(activeCard.exampleEn);
                        }}
                        style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', fontWeight: 700 }}
                      >
                        <Volume2 size={13} /> 🇺🇸 EN
                      </button>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.94rem', color: 'var(--color-text-main)', marginBottom: '0.2rem' }}>
                      “{activeCard.exampleEn}”
                    </div>
                    {activeCard.examplePt && (
                      <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '0.4rem', marginTop: '0.4rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                            “{activeCard.examplePt}”
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeakPt(activeCard.examplePt);
                            }}
                            style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0, marginLeft: '0.4rem' }}
                          >
                            <Volume2 size={12} /> 🇧🇷 PT
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Flip hint footer */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
              <RotateCw size={13} />
              {isFlipped ? 'Toque para ver a palavra em inglês' : 'Toque para ver a tradução'}
            </div>
          </div>

          {/* Rating Buttons (Spaced Repetition Feedback) */}
          {isFlipped ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
              <button 
                onClick={() => handleRating('again')}
                className="btn btn-outline"
                style={{ background: 'var(--color-rose-light)', borderColor: 'var(--color-rose)', color: 'var(--color-rose)', flexDirection: 'column', padding: '0.75rem 0.5rem' }}
              >
                <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>Errei</span>
                <span style={{ fontSize: '0.72rem' }}>Rever hoje</span>
              </button>

              <button 
                onClick={() => handleRating('hard')}
                className="btn btn-outline"
                style={{ flexDirection: 'column', padding: '0.75rem 0.5rem' }}
              >
                <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>Difícil</span>
                <span style={{ fontSize: '0.72rem' }}>1 dia</span>
              </button>

              <button 
                onClick={() => handleRating('good')}
                className="btn btn-primary"
                style={{ flexDirection: 'column', padding: '0.75rem 0.5rem' }}
              >
                <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>Bom</span>
                <span style={{ fontSize: '0.72rem' }}>3 dias</span>
              </button>

              <button 
                onClick={() => handleRating('easy')}
                className="btn btn-gold"
                style={{ flexDirection: 'column', padding: '0.75rem 0.5rem' }}
              >
                <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>Fácil</span>
                <span style={{ fontSize: '0.72rem' }}>7 dias</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <button onClick={handlePrevCard} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                <ChevronLeft size={16} /> Anterior
              </button>
              <button onClick={() => setIsFlipped(true)} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                <RotateCw size={15} /> Virar Cartão
              </button>
              <button onClick={handleNextCard} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                Próximo <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Nenhum cartão encontrado neste filtro.
          </p>
          <button onClick={() => setIsAddModalOpen(true)} className="btn btn-gold">
            <Plus size={16} /> Criar Novo Cartão
          </button>
        </div>
      )}

      {/* Full Deck Table */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
          Todas as Palavras Salvas ({flashcards.length})
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Palavra (EN)</th>
                <th style={{ padding: '0.75rem' }}>Categoria</th>
                <th style={{ padding: '0.75rem' }}>Tradução (PT)</th>
                <th style={{ padding: '0.75rem', textAlign: 'center' }}>Nível SRS</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Áudio EN / PT</th>
              </tr>
            </thead>
            <tbody>
              {flashcards.map((card) => (
                <tr key={card.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    {card.word}
                    {card.ipa && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginLeft: '0.4rem', fontWeight: 400 }}>
                        {card.ipa}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
                      {card.category || 'Geral'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {card.meaningPt}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                      {card.box || 1} / 5
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.3rem' }}>
                      <button 
                        onClick={() => handleSpeakEn(card.word)}
                        className="btn-ghost" 
                        title="Ouvir em inglês"
                        style={{ padding: '0.3rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.15rem' }}
                      >
                        <Volume2 size={15} /> EN
                      </button>
                      <button 
                        onClick={() => handleSpeakPt(card.meaningPt)}
                        className="btn-ghost" 
                        title="Ouvir tradução em português"
                        style={{ padding: '0.3rem', fontSize: '0.75rem', color: 'var(--color-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.15rem' }}
                      >
                        <Volume2 size={15} /> PT
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Card Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              Adicionar Nova Palavra ao Baralho
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
              Salve termos bíblicos, expressões em inglês ou frases que vocês querem memorizar.
            </p>

            <form onSubmit={handleCreateCard} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Palavra em Inglês *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Steadfast, Covenant, Sweetheart..."
                  value={newWord}
                  onChange={e => setNewWord(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-app)',
                    color: 'var(--color-text-main)'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Pronúncia / IPA (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: /ˈsted.fæst/"
                    value={newIpa}
                    onChange={e => setNewIpa(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--border-radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--color-text-main)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Categoria
                  </label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--border-radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--color-text-main)'
                    }}
                  >
                    <option value="Faith & Bible">Faith & Bible</option>
                    <option value="Couple Daily Life">Couple Daily Life</option>
                    <option value="Feelings & Mind">Feelings & Mind</option>
                    <option value="Travel & Everyday">Travel & Everyday</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Tradução em Português *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fiel, constante, inabalável..."
                  value={newMeaning}
                  onChange={e => setNewMeaning(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-app)',
                    color: 'var(--color-text-main)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Frase de Exemplo (Inglês)
                </label>
                <input
                  type="text"
                  placeholder="Ex: God's steadfast love never ceases."
                  value={newExampleEn}
                  onChange={e => setNewExampleEn(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-app)',
                    color: 'var(--color-text-main)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Tradução do Exemplo (Português)
                </label>
                <input
                  type="text"
                  placeholder="Ex: O amor inabalável de Deus nunca cessa."
                  value={newExamplePt}
                  onChange={e => setNewExamplePt(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-app)',
                    color: 'var(--color-text-main)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-gold">
                  Salvar Cartão (+10 pts)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
