import React, { useState, useEffect } from 'react';
import { 
  X, 
  Settings, 
  Key, 
  Volume2, 
  Moon, 
  Sun, 
  User, 
  Check, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { speechService } from '../../services/speechService';

export const SettingsModal = ({ isOpen, onClose }) => {
  const { settings, updateSettings, triggerCelebration } = useUser();

  const [husbandName, setHusbandName] = useState(settings.husbandName);
  const [wifeName, setWifeName] = useState(settings.wifeName);
  const [speechRate, setSpeechRate] = useState(settings.speechRate || 0.85);
  const [themeMode, setThemeMode] = useState(settings.themeMode || 'light');
  const [geminiApiKey, setGeminiApiKey] = useState(settings.geminiApiKey || '');
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHusbandName(settings.husbandName);
      setWifeName(settings.wifeName);
      setSpeechRate(settings.speechRate || 0.85);
      setThemeMode(settings.themeMode || 'light');
      setGeminiApiKey(settings.geminiApiKey || '');

      const availableVoices = speechService.getVoices();
      setVoices(availableVoices);
      if (speechService.selectedVoice) {
        setSelectedVoiceURI(speechService.selectedVoice.voiceURI);
      }
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const handleTestSpeechEn = () => {
    speechService.setRate(speechRate);
    if (selectedVoiceURI) {
      speechService.setEnVoice(selectedVoiceURI);
    }
    speechService.speak('The steadfast love of the Lord never ceases. May God bless your home!', {
      lang: 'en-US',
      rate: speechRate
    });
  };

  const handleTestSpeechPt = () => {
    speechService.setRate(speechRate);
    speechService.speak('A paz de Deus que excede todo o entendimento guardará vocês!', {
      lang: 'pt-BR',
      rate: 0.95
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    speechService.setRate(speechRate);
    if (selectedVoiceURI) {
      speechService.setVoice(selectedVoiceURI);
    }

    updateSettings({
      husbandName,
      wifeName,
      speechRate,
      themeMode,
      geminiApiKey: geminiApiKey.trim()
    });

    setSavedSuccess(true);
    triggerCelebration();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              background: 'var(--color-primary-light)', 
              color: 'var(--color-primary)', 
              padding: '0.4rem', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Settings size={18} />
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Configurações da Plataforma</h2>
          </div>
          <button className="btn-ghost" onClick={onClose} style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Couple Names */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              Nomes do Casal
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Esposo (Ele):
                </span>
                <input
                  type="text"
                  required
                  value={husbandName}
                  onChange={e => setHusbandName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-app)',
                    color: 'var(--color-text-main)'
                  }}
                />
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Esposa (Ela):
                </span>
                <input
                  type="text"
                  required
                  value={wifeName}
                  onChange={e => setWifeName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-app)',
                    color: 'var(--color-text-main)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Theme Mode Toggle */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              Aparência do Aplicativo
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setThemeMode('light')}
                className={`btn ${themeMode === 'light' ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, padding: '0.6rem' }}
              >
                <Sun size={16} /> Tema Claro (Parchment)
              </button>
              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                className={`btn ${themeMode === 'dark' ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, padding: '0.6rem' }}
              >
                <Moon size={16} /> Tema Noturno (Midnight)
              </button>
            </div>
          </div>

          {/* Audio Speech Controls */}
          <div style={{ 
            background: 'var(--bg-app)', 
            padding: '1rem', 
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                Velocidade da Pronúncia: {speechRate}x
              </span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button 
                  type="button"
                  onClick={handleTestSpeechEn}
                  className="btn btn-outline"
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                >
                  <Volume2 size={13} /> 🇺🇸 Testar EN
                </button>
                <button 
                  type="button"
                  onClick={handleTestSpeechPt}
                  className="btn btn-outline"
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', borderColor: 'var(--color-gold)' }}
                >
                  <Volume2 size={13} color="var(--color-gold)" /> 🇧🇷 Testar PT
                </button>
              </div>
            </div>

            <input
              type="range"
              min="0.65"
              max="1.15"
              step="0.05"
              value={speechRate}
              onChange={e => setSpeechRate(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-gold)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
              <span>Lento (0.65x)</span>
              <span>Recomendado (0.85x)</span>
              <span>Nativo (1.15x)</span>
            </div>

            {voices.length > 0 && (
              <div style={{ marginTop: '0.75rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Voz do Navegador (Inglês):
                </label>
                <select
                  value={selectedVoiceURI}
                  onChange={e => setSelectedVoiceURI(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: 'var(--border-radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-surface)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.82rem'
                  }}
                >
                  {voices.map(v => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Gemini AI API Key */}
          <div style={{ 
            background: 'var(--bg-app)', 
            padding: '1rem', 
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Key size={15} color="var(--color-gold)" />
                Chave da Google Gemini API (Opcional)
              </label>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                style={{ fontSize: '0.75rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}
              >
                Obter Grátis <ExternalLink size={12} />
              </a>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              Com sua chave gratuita do Google AI Studio, o Tutor Grace responde qualquer dúvida de inglês sem limites. Se deixar em branco, o sistema funciona com respostas inteligentes locais prontas!
            </p>

            <input
              type="password"
              placeholder="Cole sua chave AIzaSy... aqui"
              value={geminiApiKey}
              onChange={e => setGeminiApiKey(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-surface)',
                color: 'var(--color-text-main)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Fechar
            </button>
            <button type="submit" className="btn btn-gold">
              {savedSuccess ? (
                <>
                  <Check size={16} /> Salvo com Sucesso!
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Salvar Preferências
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
