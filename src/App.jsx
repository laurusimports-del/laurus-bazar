import React, { useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { Navbar } from './components/Navbar/Navbar';
import { DevotionalsView } from './components/Devotionals/DevotionalsView';
import { FlashcardsView } from './components/Flashcards/FlashcardsView';
import { WorshipView } from './components/Worship/WorshipView';
import { AITutorView } from './components/AITutor/AITutorView';
import { CoupleDashboard } from './components/CoupleHub/CoupleDashboard';
import { SettingsModal } from './components/Settings/SettingsModal';
import { Heart, BookOpen, Sparkles } from 'lucide-react';
import './styles/theme.css';
import './styles/app.css';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('devotionals');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { currentProfileName, spouseProfileName } = useUser();

  return (
    <div className="app-container">
      {/* Sticky Header with Navigation & Profile Switcher */}
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Dynamic View Content */}
      <main className="main-content">
        {activeTab === 'devotionals' && <DevotionalsView />}
        {activeTab === 'flashcards' && <FlashcardsView />}
        {activeTab === 'worship' && <WorshipView />}
        {activeTab === 'ai-tutor' && <AITutorView onOpenSettings={() => setIsSettingsOpen(true)} />}
        {activeTab === 'couple-hub' && <CoupleDashboard />}
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
