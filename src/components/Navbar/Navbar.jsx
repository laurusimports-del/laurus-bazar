import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Music, 
  Bot, 
  Heart, 
  Settings, 
  Flame, 
  Moon, 
  Sun,
  Sparkles,
  Users
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const Navbar = ({ activeTab, onSelectTab, onOpenSettings }) => {
  const { 
    currentProfileKey, 
    currentProfileName, 
    currentProfileEmoji, 
    spouseProfileName, 
    spouseProfileEmoji,
    spouseProfileKey,
    switchProfile, 
    currentProfileData,
    settings,
    updateSettings,
    triggerCelebration
  } = useUser();

  const handleToggleProfile = () => {
    switchProfile(spouseProfileKey);
    triggerCelebration();
  };

  const handleToggleTheme = () => {
    updateSettings({
      themeMode: settings.themeMode === 'dark' ? 'light' : 'dark'
    });
  };

  const navItems = [
    { id: 'devotionals', label: 'Devocionais', icon: <BookOpen size={16} /> },
    { id: 'flashcards', label: 'Memorização', icon: <Layers size={16} /> },
    { id: 'worship', label: 'Louvores', icon: <Music size={16} /> },
    { id: 'ai-tutor', label: 'Tutor IA', icon: <Bot size={16} /> },
    { id: 'couple-hub', label: 'Hub do Casal', icon: <Heart size={16} /> },
  ];

  return (
    <header style={{
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top Brand & Profile Bar */}
      <div style={{
        maxWidth: '1140px',
        margin: '0 auto',
        padding: '0.75rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectTab('devotionals')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #312e81 0%, #b45309 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: 'var(--shadow-gold)'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800, 
              fontSize: '1.25rem', 
              letterSpacing: '-0.02em',
              color: 'var(--color-text-main)',
              lineHeight: 1.1
            }}>
              Grace & Fluency
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-gold)', fontWeight: 600, letterSpacing: '0.04em' }}>
              INGLÊS & FÉ EM CASAL
            </div>
          </div>
        </div>

        {/* Right side controls: Profile Switcher & Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          {/* Streak indicator */}
          <div className="streak-pill" title="Dias seguidos de estudo do perfil ativo">
            <Flame size={15} fill="currentColor" />
            <span>{currentProfileData?.streak || 1} dias</span>
          </div>

          {/* Couple Profile Switcher */}
          <button
            onClick={handleToggleProfile}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--border-radius-full)',
              background: 'var(--bg-app)',
              border: '1.5px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title={`Clique para alternar e estudar como ${spouseProfileName}`}
          >
            <span style={{ fontSize: '1.15rem' }}>{currentProfileEmoji}</span>
            <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                {currentProfileName}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                Trocar para {spouseProfileName} ⇄
              </div>
            </div>
          </button>

          {/* Theme Mode Toggle */}
          <button
            onClick={handleToggleTheme}
            className="btn btn-outline"
            style={{ padding: '0.45rem', borderRadius: '50%' }}
            title={settings.themeMode === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            {settings.themeMode === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            className="btn btn-outline"
            style={{ padding: '0.45rem', borderRadius: '50%' }}
            title="Configurações da plataforma"
          >
            <Settings size={17} />
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div style={{
        maxWidth: '1140px',
        margin: '0 auto',
        padding: '0 1rem 0.5rem',
        display: 'flex',
        gap: '0.35rem',
        overflowX: 'auto',
        scrollbarWidth: 'none'
      }}>
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
