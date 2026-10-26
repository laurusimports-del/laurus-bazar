import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  UserPlus, 
  LogIn, 
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const AuthScreen = () => {
  const { registerCouple, loginCouple } = useUser();
  const [mode, setMode] = useState('register'); // 'register' | 'login'

  // Register Form State
  const [husbandName, setHusbandName] = useState('');
  const [husbandEmoji, setHusbandEmoji] = useState('👨‍💻');
  const [husbandLevel, setHusbandLevel] = useState('Iniciante');
  const [wifeName, setWifeName] = useState('');
  const [wifeEmoji, setWifeEmoji] = useState('👩‍💼');
  const [wifeLevel, setWifeLevel] = useState('Iniciante');
  const [couplePin, setCouplePin] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  // Login Form State
  const [loginPin, setLoginPin] = useState('');

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingSuccessMsg, setPendingSuccessMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setPendingSuccessMsg('');

    if (!husbandName.trim() || !wifeName.trim() || !couplePin.trim()) {
      setErrorMsg('Por favor, preencha o nome do esposo, da esposa e a senha do casal.');
      return;
    }

    setLoading(true);
    try {
      const res = await registerCouple({
        husbandName,
        husbandEmoji,
        husbandLevel,
        wifeName,
        wifeEmoji,
        wifeLevel,
        couplePin,
        inviteCode
      });

      if (!res.success) {
        setErrorMsg(res.message);
      } else if (res.status === 'pending') {
        setPendingSuccessMsg(res.message);
      }
    } catch (err) {
      setErrorMsg('Erro inesperado ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setPendingSuccessMsg('');

    if (!loginPin.trim()) {
      setErrorMsg('Digite a senha do casal.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginCouple(loginPin);
      if (!res.success) {
        setErrorMsg(res.message);
      }
    } catch (err) {
      setErrorMsg('Erro ao conectar. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem 1rem',
      background: 'radial-gradient(circle at 50% 15%, rgba(180, 83, 9, 0.08) 0%, var(--bg-app) 75%)'
    }}>
      <div style={{ maxWidth: '520px', width: '100%' }}>
        {/* Logo and Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #312e81 0%, #b45309 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            margin: '0 auto 0.85rem',
            boxShadow: 'var(--shadow-gold)'
          }}>
            <Sparkles size={28} />
          </div>
          <h1 style={{ 
            fontSize: '2.2rem', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-text-main)',
            marginBottom: '0.35rem'
          }}>
            Grace & Fluency
          </h1>
          <p style={{ fontSize: '0.94rem', color: 'var(--color-text-muted)' }}>
            Plataforma Personalizada de Inglês, Devocionais & Louvores para Casais
          </p>
        </div>

        {/* Card Switcher (Cadastrar vs Entrar) */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-xl)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {/* Mode Switcher Tabs */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-app)',
            padding: '0.35rem',
            borderRadius: 'var(--border-radius-full)',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-color)'
          }}>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '0.65rem 0.5rem',
                borderRadius: 'var(--border-radius-full)',
                fontWeight: 700,
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                background: mode === 'register' ? 'var(--color-primary)' : 'transparent',
                color: mode === 'register' ? '#ffffff' : 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <UserPlus size={16} />
              Criar Conta do Casal
            </button>
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '0.65rem 0.5rem',
                borderRadius: 'var(--border-radius-full)',
                fontWeight: 700,
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                background: mode === 'login' ? 'var(--color-primary)' : 'transparent',
                color: mode === 'login' ? '#ffffff' : 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <LogIn size={16} />
              Já Temos Conta
            </button>
          </div>

          {/* Pending Approval Notice */}
          {pendingSuccessMsg && (
            <div style={{
              background: 'var(--color-gold-light)',
              border: '1px solid var(--color-gold)',
              borderRadius: 'var(--border-radius-md)',
              padding: '1rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem'
            }}>
              <CheckCircle2 size={20} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: '1.5' }}>
                <strong>{pendingSuccessMsg}</strong>
                <p style={{ marginTop: '0.35rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  O administrador da plataforma precisa autorizar sua conta no painel para proteger os recursos do banco de dados. Volte em instantes!
                </p>
              </div>
            </div>
          )}

          {/* Error Notice */}
          {errorMsg && (
            <div style={{
              background: 'var(--color-rose-light)',
              border: '1px solid var(--color-rose)',
              borderRadius: 'var(--border-radius-md)',
              padding: '0.85rem 1rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-rose)',
              fontSize: '0.86rem',
              fontWeight: 600
            }}>
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* MODE 1: REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Husband Details */}
              <div style={{ 
                background: 'var(--bg-app)', 
                padding: '1rem', 
                borderRadius: 'var(--border-radius-md)', 
                border: '1px solid var(--border-color)' 
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  👨 Perfil do Esposo (Ele)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Nome *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Adam"
                      value={husbandName}
                      onChange={e => setHusbandName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Emoji</label>
                    <input
                      type="text"
                      value={husbandEmoji}
                      onChange={e => setHusbandEmoji(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        color: 'var(--color-text-main)',
                        textAlign: 'center',
                        fontSize: '1.1rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Nível</label>
                    <select
                      value={husbandLevel}
                      onChange={e => setHusbandLevel(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.82rem'
                      }}
                    >
                      <option value="Iniciante">Iniciante</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Wife Details */}
              <div style={{ 
                background: 'var(--bg-app)', 
                padding: '1rem', 
                borderRadius: 'var(--border-radius-md)', 
                border: '1px solid var(--border-color)' 
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-rose)', marginBottom: '0.5rem' }}>
                  👩 Perfil da Esposa (Ela)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Nome *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Minha Esposa"
                      value={wifeName}
                      onChange={e => setWifeName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Emoji</label>
                    <input
                      type="text"
                      value={wifeEmoji}
                      onChange={e => setWifeEmoji(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        color: 'var(--color-text-main)',
                        textAlign: 'center',
                        fontSize: '1.1rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Nível</label>
                    <select
                      value={wifeLevel}
                      onChange={e => setWifeLevel(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.82rem'
                      }}
                    >
                      <option value="Iniciante">Iniciante</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Password / PIN */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Senha de Acesso do Casal *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    placeholder="Crie uma senha ou PIN para entrarem juntos"
                    value={couplePin}
                    onChange={e => setCouplePin(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--border-radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.92rem'
                    }}
                  />
                  <Lock size={16} color="var(--color-text-light)" style={{ position: 'absolute', right: '12px', top: '13px' }} />
                </div>
              </div>

              {/* Invite Code (For access control) */}
              <div style={{
                background: 'rgba(180, 83, 9, 0.05)',
                border: '1px dashed var(--color-gold)',
                borderRadius: 'var(--border-radius-md)',
                padding: '0.85rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                  <ShieldCheck size={16} color="var(--color-gold)" />
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                    Código de Convite da Família
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Ex: GRACE2026 (opcional para o 1º casal admin)"
                  value={inviteCode}
                  onChange={e => setInviteCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--border-radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-surface)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.88rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginTop: '0.3rem' }}>
                  * Protege o banco de dados contra acessos não autorizados. Se você for o primeiro casal (Admin), pode deixar vazio.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-gold"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
              >
                {loading ? 'Criando Conta...' : 'Começar Estudos com Progresso Zerado ✨'}
              </button>
            </form>
          )}

          {/* MODE 2: LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Senha de Acesso do Casal
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    autoFocus
                    placeholder="Digite a senha ou PIN cadastrado"
                    value={loginPin}
                    onChange={e => setLoginPin(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--border-radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--color-text-main)',
                      fontSize: '1rem',
                      letterSpacing: '0.1em'
                    }}
                  />
                  <KeyRound size={18} color="var(--color-text-light)" style={{ position: 'absolute', right: '14px', top: '14px' }} />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-gold"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
              >
                {loading ? 'Entrando...' : 'Entrar na Plataforma do Casal'}
              </button>
            </form>
          )}
        </div>

        {/* Footer Note */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', fontSize: '0.82rem', marginTop: '1.5rem' }}>
          <Heart size={14} color="var(--color-rose)" fill="currentColor" />
          <span>Contas individuais e conjuntas sincronizadas no Supabase</span>
        </div>
      </div>
    </div>
  );
};
