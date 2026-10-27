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
  Newspaper
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
    { id: 'news', label: 'Notícias', icon: <Newspaper size={17} /> },
    { id: 'flashcards', label: 'Memorização', icon: <Layers size={17} /> },
    { id: 'ai-tutor', label: 'Tutor', icon: <Bot size={17} /> },
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
        <div className="header-inner">
          {/* Brand Logo */}
          <div 
            onClick={() => onSelectTab('devotionals')}
            className="header-brand"
          >
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #312e81 0%, #b45309 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: 'var(--shadow-gold)',
              flexShrink: 0
            }}>
              <Sparkles size={17} />
            </div>
            <div>
              <div className="brand-title">
                Adam's & Fluency
              </div>
              <div className="brand-subtitle">
                INGLÊS & FÉ EM CASAL
              </div>
            </div>
          </div>

          {/* Right Header Controls: Streak, Profile Switcher & Actions */}
          <div className="header-controls">
            {/* Streak indicator */}
            <div className="streak-pill" title="Ofensiva de dias consecutivos">
              <Flame size={14} fill="currentColor" />
              <span>{currentProfileData?.streak || 1}d</span>
            </div>

            {/* Quick Toggle Profile */}
            <button
              onClick={handleToggleProfile}
              className="profile-switch-btn"
              title={`Trocar para perfil de ${spouseProfileName}`}
            >
              <span style={{ fontSize: '1.1rem' }}>{currentProfileEmoji}</span>
              <span className="profile-switch-name">
                {currentProfileName}
              </span>
              <Repeat size={11} color="var(--color-gold)" />
            </button>

            {/* Theme Toggle (Desktop) */}
            <button
              onClick={handleToggleTheme}
              className="btn btn-outline desktop-only-btn"
              style={{ padding: '0.45rem', borderRadius: '50%', minHeight: '34px', width: '34px' }}
              title="Alternar tema claro/noturno"
            >
              {settings.themeMode === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="btn btn-outline"
              style={{ padding: '0.45rem', borderRadius: '50%', minHeight: '34px', width: '34px' }}
              title="Configurações da conta e IA"
            >
              <Settings size={15} />
            </button>

            {/* Logout / Switch Accounts Screen (Desktop) */}
            <button
              onClick={logout}
              className="btn btn-outline desktop-only-btn"
              style={{ padding: '0.45rem', borderRadius: '50%', minHeight: '34px', width: '34px' }}
              title="Trocar de Conta / Tela de Usuários"
            >
              <LogOut size={15} color="var(--color-rose)" />
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
