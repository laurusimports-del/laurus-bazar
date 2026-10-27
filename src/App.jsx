import React, { useState, useEffect } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { Navbar } from './components/Navbar/Navbar';
import { AuthScreen } from './components/Auth/AuthScreen';
import { BibleView } from './components/Bible/BibleView';
import { DevotionalsView } from './components/Devotionals/DevotionalsView';
import { NewsView } from './components/News/NewsView';
import { ParentingView } from './components/Parenting/ParentingView';
import { FlashcardsView } from './components/Flashcards/FlashcardsView';
import { ProgressView } from './components/Progress/ProgressView';
import { WorshipView } from './components/Worship/WorshipView';
import { AITutorView } from './components/AITutor/AITutorView';
import { CoupleDashboard } from './components/CoupleHub/CoupleDashboard';
import { AdminPanel } from './components/Admin/AdminPanel';
import { SettingsModal } from './components/Settings/SettingsModal';
import { WordSelectionPopup } from './components/Common/WordSelectionPopup';
import { Heart, LogOut, ShieldCheck, ArrowLeft } from 'lucide-react';
import './styles/theme.css';
import './styles/app.css';

const checkIsAdminPath = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.location.pathname === '/admin' ||
    window.location.pathname.startsWith('/admin/') ||
    window.location.hash === '#admin' ||
    window.location.search.includes('admin=true')
  );
};

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('bible');
  const [selectedDevotionalDayId, setSelectedDevotionalDayId] = useState(null);
  const [selectedBibleTarget, setSelectedBibleTarget] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminPath, setIsAdminPath] = useState(checkIsAdminPath);

  const handleOpenDevotional = (dayId) => {
    setSelectedDevotionalDayId(dayId);
    setActiveTab('devotionals');
  };

  const handleOpenBible = (bookId, chapter) => {
    setSelectedBibleTarget({ bookId, chapter });
    setActiveTab('bible');
  };

  const { 
    isAuthenticated, 
    isAdmin, 
    adminMode, 
    setAdminMode,
    logout, 
    currentProfileName, 
    spouseProfileName 
  } = useUser();

  // Monitora alterações na URL para abrir o painel admin via /admin ou #admin
  useEffect(() => {
    const handleUrlChange = () => {
      setIsAdminPath(checkIsAdminPath());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const goToCoupleApp = () => {
    setAdminMode(false);
    setIsAdminPath(false);
    try {
      if (window.location.pathname === '/admin') {
        window.history.pushState({}, '', '/');
      } else if (window.location.hash === '#admin') {
        window.location.hash = '';
      }
    } catch (e) {}
  };

  const isDedicatedAdminView = isAdminPath || (adminMode && isAdmin);

  // SE ESTÁ ACESSANDO A ROTA /admin
  if (isDedicatedAdminView) {
    // Se ainda não estiver autenticado na conta admin, exibe a tela de login de admin dedicada
    if (!isAuthenticated) {
      return <AuthScreen initialMode="admin" />;
    }

    // Se estiver logado mas não for admin
    if (!isAdmin) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: 'var(--bg-app)'
        }}>
          <div className="card" style={{ maxWidth: '420px', width: '100%' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-rose)' }}>
              Acesso Restrito
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Esta conta não possui privilégios de administrador. Para acessar o painel de controle, entre com a conta do Adam & Marcela.
            </p>
            <button onClick={goToCoupleApp} className="btn btn-gold" style={{ width: '100%' }}>
              Voltar para a Área do Casal
            </button>
          </div>
        </div>
      );
    }

    // Painel Admin Dedicado em /admin
    return (
      <div className="app-container">
        <header style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-color)',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={14} />
              Painel do Administrador Mestre (/admin)
            </span>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-text-main)' }}>
              Adam's & Fluency
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={goToCoupleApp} 
              className="btn btn-gold" 
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <ArrowLeft size={14} />
              Ir para o App do Casal
            </button>
            <button 
              onClick={logout} 
              className="btn btn-outline" 
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <LogOut size={14} color="var(--color-rose)" />
              Sair
            </button>
          </div>
        </header>
        <main className="main-content">
          <AdminPanel />
        </main>
      </div>
    );
  }

  // Se usuário não está autenticado, exibe a tela de login/cadastro pública (sem aba admin)
  if (!isAuthenticated) {
    return <AuthScreen initialMode="login" />;
  }

  // Aplicação Principal do Casal (Navbar 100% limpa)
  return (
    <div className="app-container">
      {/* Sticky Header with Navigation & Mobile Bottom Bar */}
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Dynamic View Content */}
      <main className={`main-content ${activeTab === 'ai-tutor' ? 'main-content-tutor' : ''}`}>
        {activeTab === 'bible' && (
          <BibleView 
            onOpenDevotional={handleOpenDevotional} 
            initialTarget={selectedBibleTarget} 
          />
        )}
        {activeTab === 'devotionals' && (
          <DevotionalsView 
            initialSelectedDayId={selectedDevotionalDayId} 
            onOpenBible={handleOpenBible} 
          />
        )}
        {activeTab === 'news' && <NewsView />}
        {activeTab === 'parenting' && <ParentingView />}
        {activeTab === 'flashcards' && <FlashcardsView />}
        {activeTab === 'ai-tutor' && <AITutorView onOpenSettings={() => setIsSettingsOpen(true)} />}
        {activeTab === 'worship' && <WorshipView />}
        {activeTab === 'progress' && <ProgressView />}
        {activeTab === 'couple-hub' && <CoupleDashboard />}
      </main>

      {/* Footer (Hidden on AI Tutor to maximize chat room) */}
      {activeTab !== 'ai-tutor' && (
        <footer style={{
          borderTop: '1px solid var(--border-color)',
          background: 'var(--bg-surface)',
          padding: '1.75rem 1rem',
          textAlign: 'center',
          marginTop: 'auto'
        }}>
          <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
              <span>Adam's & Fluency</span>
              <span style={{ color: 'var(--color-gold)' }}>•</span>
              <span>{currentProfileName} & {spouseProfileName}</span>
              <Heart size={14} color="var(--color-rose)" fill="currentColor" />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
              “Trust in the Lord with all your heart and lean not on your own understanding.” — Proverbs 3:5
            </p>
            <div style={{ fontSize: '0.74rem', color: 'var(--color-text-light)' }}>
              Plataforma Personalizada de Inglês, Devocionais & Louvores para Casais.
            </div>
          </div>
        </footer>
      )}

      {/* Global Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      {/* Floating Word Inspector: Select/Release over any word to see translation, audio & add to flashcards */}
      <WordSelectionPopup />
    </div>
  );
};

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}
