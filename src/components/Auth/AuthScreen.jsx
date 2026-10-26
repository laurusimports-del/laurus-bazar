import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  UserCheck, 
  Edit3, 
  Check, 
  Heart, 
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const AuthScreen = () => {
  const { accounts, login, updateAccount, triggerCelebration } = useUser();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isEditingModal, setIsEditingModal] = useState(false);
  const [editTarget, setEditTarget] = useState('husband');

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editEmoji, setEditEmoji] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPin, setEditPin] = useState('');
  const [editLevel, setEditLevel] = useState('Iniciante');

  const handleSelectAccount = (profileKey) => {
    setSelectedProfile(profileKey);
    setErrorMsg('');
    setPinInput('');

    // If no PIN is configured, login immediately!
    const account = accounts[profileKey];
    if (!account.pin) {
      const res = login(profileKey, '');
      if (!res.success) {
        setErrorMsg(res.message);
      }
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (!selectedProfile) return;
    const res = login(selectedProfile, pinInput);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const openEditAccount = (profileKey, e) => {
    e.stopPropagation();
    const acc = accounts[profileKey];
    setEditTarget(profileKey);
    setEditName(acc.name);
    setEditEmoji(acc.emoji);
    setEditEmail(acc.email || '');
    setEditPin(acc.pin || '');
    setEditLevel(acc.level || 'Iniciante');
    setIsEditingModal(true);
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    updateAccount(editTarget, {
      name: editName.trim(),
      emoji: editEmoji.trim() || '👤',
      email: editEmail.trim(),
      pin: editPin.trim(),
      level: editLevel
    });
    setIsEditingModal(false);
    triggerCelebration();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1.5rem 1rem',
      background: 'radial-gradient(circle at 50% 20%, rgba(180, 83, 9, 0.08) 0%, var(--bg-app) 70%)'
    }}>
      <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>
        {/* Logo and Welcome Header */}
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #312e81 0%, #b45309 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          margin: '0 auto 1rem',
          boxShadow: 'var(--shadow-gold)'
        }}>
          <Sparkles size={28} />
        </div>

        <h1 style={{ 
          fontSize: '2.2rem', 
          fontWeight: 800, 
          letterSpacing: '-0.02em', 
          marginBottom: '0.35rem',
          fontFamily: 'var(--font-heading)'
        }}>
          Grace & Fluency
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Plataforma de Inglês & Fé do Casal. Quem está estudando agora?
        </p>

        {/* Profile Choice Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {['husband', 'wife'].map((key) => {
            const acc = accounts[key];
            const isSelected = selectedProfile === key;

            return (
              <div
                key={key}
                onClick={() => handleSelectAccount(key)}
                style={{
                  background: 'var(--bg-surface)',
                  border: isSelected ? '2px solid var(--color-gold)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-xl)',
                  padding: '1.75rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: isSelected ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s',
                  userSelect: 'none'
                }}
              >
                {/* Edit Button */}
                <button
                  onClick={(e) => openEditAccount(key, e)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'var(--bg-app)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '50%',
                    padding: '0.35rem',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer'
                  }}
                  title="Editar perfil"
                >
                  <Edit3 size={13} />
                </button>

                {/* Avatar Emoji */}
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: key === 'husband' ? 'var(--color-primary-light)' : 'var(--color-rose-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.2rem',
                  marginBottom: '0.85rem'
                }}>
                  {acc.emoji}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.2rem' }}>
                  {acc.name}
                </h3>
                <span className="badge badge-indigo" style={{ fontSize: '0.72rem', marginBottom: '0.5rem' }}>
                  {acc.role}
                </span>

                <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                  Nível: {acc.level}
                </div>

                {acc.pin && (
                  <div style={{ marginTop: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', color: 'var(--color-gold)' }}>
                    <Lock size={12} /> Protegido com PIN
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* PIN Entry Prompt if selected account has PIN */}
        {selectedProfile && accounts[selectedProfile]?.pin && (
          <form 
            onSubmit={handlePinSubmit}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              animation: 'slideUp 0.2s ease-out'
            }}
          >
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Digite o PIN de 4 dígitos para {accounts[selectedProfile].name}:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <input
                type="password"
                maxLength={6}
                autoFocus
                placeholder="PIN"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                style={{
                  width: '140px',
                  padding: '0.65rem',
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  letterSpacing: '0.3em',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-app)',
                  color: 'var(--color-text-main)'
                }}
              />
              <button type="submit" className="btn btn-gold">
                Entrar <ArrowRight size={16} />
              </button>
            </div>
            {errorMsg && (
              <div style={{ color: 'var(--color-rose)', fontSize: '0.82rem', marginTop: '0.5rem', fontWeight: 600 }}>
                {errorMsg}
              </div>
            )}
          </form>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
          <Heart size={14} color="var(--color-rose)" fill="currentColor" />
          <span>Contas sincronizadas para o crescimento do casal</span>
        </div>
      </div>

      {/* Edit Account Modal */}
      {isEditingModal && (
        <div className="modal-overlay" onClick={() => setIsEditingModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              Editar Perfil ({editTarget === 'husband' ? 'Esposo' : 'Esposa'})
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
              Ajuste seu nome, emoji e nível de inglês.
            </p>

            <form onSubmit={handleSaveAccount} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Nome de Exibição
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                    Emoji
                  </label>
                  <input
                    type="text"
                    value={editEmoji}
                    onChange={e => setEditEmoji(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      textAlign: 'center',
                      fontSize: '1.2rem',
                      borderRadius: 'var(--border-radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--color-text-main)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                    Nível de Inglês
                  </label>
                  <select
                    value={editLevel}
                    onChange={e => setEditLevel(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      borderRadius: 'var(--border-radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--color-text-main)'
                    }}
                  >
                    <option value="Iniciante / Básico">Iniciante / Básico</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado / Fluente">Avançado / Fluente</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  PIN de Acesso (Opcional - deixe vazio para entrar sem senha)
                </label>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="Ex: 1234"
                  value={editPin}
                  onChange={e => setEditPin(e.target.value)}
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.75rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsEditingModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-gold">
                  Salvar Perfil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
