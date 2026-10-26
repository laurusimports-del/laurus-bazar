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
import { Heart } from 'lucide-react';
import './styles/theme.css';
import './styles/app.css';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('devotionals');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { isAuthenticated, isAdmin, currentProfileName, spouseProfileName } = useUser();

  // If user is logged out, show the couple authentication & profile selection screen
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

      {/* Footer (Subtle on mobile, desktop friendly) */}
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
