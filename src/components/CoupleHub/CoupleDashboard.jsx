import React, { useState } from 'react';
import { 
  Heart, 
  Flame, 
  Award, 
  BookOpen, 
  Layers, 
  Music, 
  Sparkles, 
  Edit3, 
  Check, 
  Users 
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const CoupleDashboard = () => {
  const { 
    data, 
    currentProfileName, 
    spouseProfileName, 
    coupleGoal, 
    updateLoveNote, 
    triggerCelebration 
  } = useUser();

  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(coupleGoal.loveNote || '');

  const husband = data.profiles.husband;
  const wife = data.profiles.wife;

  const combinedStreak = Math.min(husband.streak, wife.streak);
  const totalVerses = new Set([...husband.memorizedVerses, ...wife.memorizedVerses]).size;
  const totalFlashcards = husband.flashcards.length + wife.flashcards.length;

  const handleSaveNote = () => {
    updateLoveNote(noteText);
    setIsEditingNote(false);
    triggerCelebration();
  };

  const achievements = [
    {
      id: 'first-devotional',
      title: 'Primeiro Devocional Juntos',
      desc: 'Completaram o primeiro estudo bíblico em inglês',
      icon: '📖',
      unlocked: husband.completedDevotionals.length > 0 && wife.completedDevotionals.length > 0
    },
    {
      id: 'streak-3',
      title: 'Chama Acesa (3 Dias)',
      desc: 'Três dias consecutivos de fidelidade no estudo',
      icon: '🔥',
      unlocked: combinedStreak >= 3
    },
    {
      id: 'worship-singers',
      title: 'Vozes em Harmonia',
      desc: 'Aprenderam e favoritaram louvores em inglês',
      icon: '🎵',
      unlocked: (husband.favoriteSongs?.length > 0) || (wife.favoriteSongs?.length > 0)
    },
    {
      id: 'vocab-builders',
      title: 'Mente Renovada',
      desc: 'Mais de 10 palavras bíblicas salvas no baralho',
      icon: '🧠',
      unlocked: totalFlashcards >= 10
    }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-rose">
            <Heart size={13} fill="currentColor" />
            Couple's Sanctuary
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Estatísticas & União
          </span>
        </div>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          Hub do Casal: {data.settings.husbandName} & {data.settings.wifeName}
        </h1>
        <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)' }}>
          Acompanhem o crescimento mútuo na fé e na fluência do inglês como uma só família.
        </p>
      </div>

      {/* Hero Streak & Love Note Card */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.4) 0%, rgba(238, 242, 255, 0.5) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        marginBottom: '1.75rem'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="streak-pill" style={{ fontSize: '0.95rem' }}>
                <Flame size={18} fill="currentColor" />
                Ofensiva do Casal: {combinedStreak} Dias Seguidos!
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
              {coupleGoal.title}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              Vocês estão construindo o hábito diário de orar, meditar e aprender inglês lado a lado.
            </p>
          </div>

          {/* Editable Love Note */}
          <div style={{ 
            background: 'var(--bg-surface)', 
            padding: '1.25rem', 
            borderRadius: 'var(--border-radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-rose)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Heart size={13} fill="currentColor" />
                Mensagem de Encorajamento
              </span>
              <button 
                onClick={() => setIsEditingNote(!isEditingNote)} 
                className="btn-ghost"
                style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem' }}
              >
                <Edit3 size={13} />
                {isEditingNote ? 'Cancelar' : 'Editar'}
              </button>
            </div>

            {isEditingNote ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: 'var(--border-radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-app)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.9rem'
                  }}
                />
                <button onClick={handleSaveNote} className="btn btn-gold" style={{ alignSelf: 'flex-end', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                  <Check size={14} /> Salvar Recadinho
                </button>
              </div>
            ) : (
              <p style={{ fontStyle: 'italic', fontSize: '1rem', color: 'var(--color-text-main)', lineHeight: '1.5' }}>
                {coupleGoal.loveNote}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Side-by-Side Couple Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Husband Card */}
        <div className="card" style={{ borderTop: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '2rem' }}>{data.settings.husbandEmoji}</span>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{data.settings.husbandName}</h3>
              <span className="badge badge-indigo">
                <Flame size={12} fill="currentColor" /> {husband.streak} dias de ofensiva
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
            <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--border-radius-md)' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-gold)' }}>{husband.points}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Pontos</div>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--border-radius-md)' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary)' }}>{husband.completedDevotionals.length}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Devocionais</div>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--border-radius-md)' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-emerald)' }}>{husband.flashcards.length}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Flashcards</div>
            </div>
          </div>
        </div>

        {/* Wife Card */}
        <div className="card" style={{ borderTop: '4px solid var(--color-rose)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '2rem' }}>{data.settings.wifeEmoji}</span>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{data.settings.wifeName}</h3>
              <span className="badge badge-rose">
                <Flame size={12} fill="currentColor" /> {wife.streak} dias de ofensiva
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
            <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--border-radius-md)' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-gold)' }}>{wife.points}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Pontos</div>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--border-radius-md)' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary)' }}>{wife.completedDevotionals.length}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Devocionais</div>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--border-radius-md)' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-emerald)' }}>{wife.flashcards.length}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Flashcards</div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem' }}>
          Conquistas do Casal (Couple Badges)
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
          Marcos comemorativos que vocês desbloqueiam estudando juntos:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
          {achievements.map(ach => (
            <div
              key={ach.id}
              style={{
                background: ach.unlocked ? 'var(--bg-surface)' : 'var(--bg-app)',
                border: ach.unlocked ? '2px solid var(--color-gold)' : '1px dashed var(--border-color)',
                borderRadius: 'var(--border-radius-md)',
                padding: '1.1rem',
                opacity: ach.unlocked ? 1 : 0.55,
                boxShadow: ach.unlocked ? 'var(--shadow-sm)' : 'none',
                position: 'relative'
              }}
            >
              <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>{ach.icon}</div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--color-text-main)', marginBottom: '0.2rem' }}>
                {ach.title}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                {ach.desc}
              </div>
              {ach.unlocked && (
                <span className="badge badge-gold" style={{ marginTop: '0.75rem', fontSize: '0.72rem' }}>
                  Desbloqueado ✨
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
