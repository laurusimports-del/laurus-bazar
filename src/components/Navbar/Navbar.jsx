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
  BarChart3,
  LogOut,
  Repeat,
  ShieldCheck,
  Users
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const Navbar = ({ activeTab, onSelectTab, onOpenSettings }) => {
  const { 
    isAdmin,
    currentProfileName, 
    currentProfileEmoji, 
    spouseProfileName, 
    spouseRole,
    switchProfile, 
    currentProfileData,
    settings,
    updateSettings,
    logout,
    triggerCelebration
  } = useUser();

  const handleToggleProfile = () => {
    switchProfile(spouseRole);
    triggerCelebration();
  };

  const handleToggleTheme = () => {
    updateSettings({
      themeMode: settings.themeMode === 'dark' ? 'light' : 'dark'
    });
  };

  const navItems = [
    { id: 'bible', label: 'Bíblia', icon: <BookOpen size={17} /> },
    { id: 'devotionals', label: 'Devocionais', icon: <Heart size={17} /> },
    { id: 'parenting', label: 'Educação de Filhos', icon: <Users size={17} /> },
    { id: 'flashcards', label: 'Memorização', icon: <Layers size={17} /> },
    { id: 'ai-tutor', label: 'Tutor IA', icon: <Bot size={17} /> },
    { id: 'worship', label: 'Louvores', icon: <Music size={17} /> },
    { id: 'progress', label: 'Progresso', icon: <BarChart3 size={17} /> },
    { id: 'couple-hub', label: 'Hub Casal', icon: <Sparkles size={17} /> }
  ];

  return (
    <>
      {/* Top Header */}
      <header style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          maxWidth: '1140px',
          margin: '0 auto',
          padding: '0.65rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          {/* Brand Logo */}
          <div 
            onClick={() => onSelectTab('devotionals')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer' }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #312e81 0%, #b45309 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: 'var(--shadow-gold)',
              flexShrink: 0
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 800, 
                fontSize: '1.18rem', 
                letterSpacing: '-0.02em',
                color: 'var(--color-text-main)',
                lineHeight: 1.1
              }}>
                Adam's & Fluency
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--color-gold)', fontWeight: 700, letterSpacing: '0.04em' }}>
                INGLÊS & FÉ EM CASAL
              </div>
            </div>
          </div>

          {/* Right Header Controls: Streak, Profile Switcher & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            {/* Streak indicator */}
            <div className="streak-pill" title="Ofensiva de dias consecutivos">
              <Flame size={14} fill="currentColor" />
              <span>{currentProfileData?.streak || 1}d</span>
            </div>

            {/* Quick Toggle Profile */}
            <button
              onClick={handleToggleProfile}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--border-radius-full)',
                background: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
              title={`Trocar para perfil de ${spouseProfileName}`}
            >
              <span style={{ fontSize: '1.15rem' }}>{currentProfileEmoji}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-main)', maxWidth: '75px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentProfileName}
              </span>
              <Repeat size={12} color="var(--color-gold)" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={handleToggleTheme}
              className="btn btn-outline"
              style={{ padding: '0.45rem', borderRadius: '50%', minHeight: '36px', width: '36px' }}
              title="Alternar tema claro/noturno"
            >
              {settings.themeMode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="btn btn-outline"
              style={{ padding: '0.45rem', borderRadius: '50%', minHeight: '36px', width: '36px' }}
              title="Configurações da conta e IA"
            >
              <Settings size={16} />
            </button>

            {/* Logout / Switch Accounts Screen */}
            <button
              onClick={logout}
              className="btn btn-outline"
              style={{ padding: '0.45rem', borderRadius: '50%', minHeight: '36px', width: '36px' }}
              title="Trocar de Conta / Tela de Usuários"
            >
              <LogOut size={16} color="var(--color-rose)" />
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <div className="desktop-nav-tabs" style={{
          maxWidth: '1140px',
          margin: '0 auto',
          padding: '0 1rem 0.45rem',
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

      {/* Mobile Native Bottom Navigation Bar (Visible only on phone screens) */}
      <nav className="mobile-bottom-nav">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
