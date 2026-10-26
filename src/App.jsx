import React, { useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { Navbar } from './components/Navbar/Navbar';
import { AuthScreen } from './components/Auth/AuthScreen';
import { DevotionalsView } from './components/Devotionals/DevotionalsView';
import { FlashcardsView } from './components/Flashcards/FlashcardsView';
import { ProgressView } from './components/Progress/ProgressView';
import { WorshipView } from './components/Worship/WorshipView';
import { AITutorView } from './components/AITutor/AITutorView';
import { CoupleDashboard } from './components/CoupleHub/CoupleDashboard';
import { AdminPanel } from './components/Admin/AdminPanel';
import { SettingsModal } from './components/Settings/SettingsModal';
import { Heart, LogOut, ShieldCheck } from 'lucide-react';
import './styles/theme.css';
import './styles/app.css';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('devotionals');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { 
    isAuthenticated, 
    isAdmin, 
    isMasterAdminOnly, 
    logout, 
    currentProfileName, 
    spouseProfileName 
  } = useUser();

  // Se logado no Modo Administrador Dedicado (sem casal ativo)
  if (isMasterAdminOnly) {
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
              Painel do Administrador Mestre
            </span>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-text-main)' }}>
              Grace & Fluency
            </span>
          </div>
          <button 
            onClick={logout} 
            className="btn btn-outline" 
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <LogOut size={14} color="var(--color-rose)" />
            Encerrar Sessão Admin
          </button>
        </header>
        <main className="main-content">
          <AdminPanel />
        </main>
      </div>
    );
  }

  // Se usuário não está autenticado, exibe a tela de login/cadastro
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <div className="app-container">
      {/* Sticky Header with Navigation & Mobile Bottom Bar */}
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Dynamic View Content */}
      <main className="main-content">
        {activeTab === 'devotionals' && <DevotionalsView />}
        {activeTab === 'flashcards' && <FlashcardsView />}
        {activeTab === 'progress' && <ProgressView />}
        {activeTab === 'worship' && <WorshipView />}
        {activeTab === 'ai-tutor' && <AITutorView onOpenSettings={() => setIsSettingsOpen(true)} />}
        {activeTab === 'couple-hub' && <CoupleDashboard />}
        {activeTab === 'admin' && isAdmin && <AdminPanel />}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-surface)',
        padding: '1.75rem 1rem',
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
            <span>Grace & Fluency</span>
            <span style={{ color: 'var(--color-gold)' }}>•</span>
            <span>{currentProfileName} & {spouseProfileName}</span>
            <Heart size={14} color="var(--color-rose)" fill="currentColor" />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
            “Trust in the Lord with all your heart and lean not on your own understanding.” — Proverbs 3:5
          </p>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-text-light)' }}>
            Plataforma Personalizada de Inglês, Devocionais & Louvores do Casal.
          </div>
        </div>
      </footer>

      {/* Global Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
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
