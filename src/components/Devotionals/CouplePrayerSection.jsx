import React, { useState } from 'react';
import { Heart, Volume2, CheckCircle2, Sparkles } from 'lucide-react';
import { speechService } from '../../services/speechService';
import { useUser } from '../../context/UserContext';

export const CouplePrayerSection = ({ prayerEn, prayerPt, dayId }) => {
  const { currentProfileName, spouseProfileName, triggerCelebration } = useUser();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPrayedTogether, setHasPrayedTogether] = useState(false);

  const handleSpeakPrayer = () => {
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    speechService.speak(prayerEn, {
      rate: 0.8,
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  const handleTogglePrayed = () => {
    if (!hasPrayedTogether) {
      triggerCelebration();
      setHasPrayedTogether(true);
    } else {
      setHasPrayedTogether(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.4) 0%, rgba(255, 228, 230, 0.4) 100%)',
      border: '1px solid rgba(245, 158, 11, 0.25)',
      borderRadius: 'var(--border-radius-xl)',
      padding: '1.5rem',
      marginBottom: '1.75rem',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ 
            background: 'var(--color-rose-light)', 
            color: 'var(--color-rose)', 
            padding: '0.4rem', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Heart size={18} fill="currentColor" />
          </span>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Couple's Guided Prayer (Oração do Casal)
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              {currentProfileName} & {spouseProfileName} — Orem em voz alta repetindo as frases em inglês
            </p>
          </div>
        </div>

        <button 
          onClick={handleSpeakPrayer}
          className="btn btn-outline"
          style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
        >
          <Volume2 size={15} className={isPlaying ? 'speaking-pulse' : ''} />
          {isPlaying ? 'Parar Áudio' : 'Ouvir Oração em Inglês'}
        </button>
      </div>

      {/* English prayer */}
      <div style={{ 
        background: 'var(--bg-surface)', 
        padding: '1.1rem', 
        borderRadius: 'var(--border-radius-md)', 
        border: '1px solid var(--border-color)',
        marginBottom: '0.85rem'
      }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          English Prayer:
        </div>
        <p style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '1.08rem', 
          fontStyle: 'italic', 
          lineHeight: '1.6', 
          color: 'var(--color-text-main)' 
        }}>
          “{prayerEn}”
        </p>
      </div>

      {/* Portuguese translation */}
      <div style={{ 
        padding: '0.5rem 0.75rem', 
        marginBottom: '1rem',
        fontSize: '0.88rem',
        color: 'var(--color-text-muted)'
      }}>
        <strong>Em Português:</strong> “{prayerPt}”
      </div>

      {/* Action Checkbox */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        borderTop: '1px dashed rgba(245, 158, 11, 0.3)',
        paddingTop: '0.85rem'
      }}>
        <label 
          onClick={handleTogglePrayed}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem', 
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.92rem',
            color: hasPrayedTogether ? 'var(--color-emerald)' : 'var(--color-text-main)'
          }}
        >
          <div style={{
            width: '22px',
            height: '22px',
            borderRadius: '6px',
            border: hasPrayedTogether ? '2px solid var(--color-emerald)' : '2px solid var(--border-color)',
            background: hasPrayedTogether ? 'var(--color-emerald)' : 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            transition: 'all 0.2s'
          }}>
            {hasPrayedTogether && <CheckCircle2 size={16} />}
          </div>
          <span>Oramos juntos hoje e repetimos em inglês! ❤️</span>
        </label>

        {hasPrayedTogether && (
          <span className="badge badge-emerald" style={{ animation: 'fadeIn 0.3s ease' }}>
            <Sparkles size={13} /> +30 pontos de união
          </span>
        )}
      </div>
    </div>
  );
};
