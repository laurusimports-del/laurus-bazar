import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  Heart, 
  ShieldCheck, 
  UserPlus, 
  LogIn, 
  KeyRound,
  CheckCircle2,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const AuthScreen = () => {
  const { registerCouple, loginCouple, loginAdmin } = useUser();
  const [mode, setMode] = useState('register'); // 'register' | 'login' | 'admin'

  // Register Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [husbandName, setHusbandName] = useState('');
  const [husbandEmoji, setHusbandEmoji] = useState('👨‍💻');
  const [husbandLevel, setHusbandLevel] = useState('Iniciante');
  const [wifeName, setWifeName] = useState('');
  const [wifeEmoji, setWifeEmoji] = useState('👩‍💼');
  const [wifeLevel, setWifeLevel] = useState('Iniciante');
  const [inviteCode, setInviteCode] = useState('');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Admin Login State
  const [adminUser, setAdminUser] = useState('admin@gracefluency.com');
  const [adminPassword, setAdminPassword] = useState('admin2026');

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingSuccessMsg, setPendingSuccessMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setPendingSuccessMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Por favor, informe o email e senha do casal.');
      return;
    }

    if (!husbandName.trim() || !wifeName.trim()) {
      setErrorMsg('Por favor, preencha o nome do esposo e da esposa.');
      return;
    }

    setLoading(true);
    try {
      const res = await registerCouple({
        email: email.trim(),
        password: password.trim(),
        husbandName,
        husbandEmoji,
        husbandLevel,
        wifeName,
        wifeEmoji,
        wifeLevel,
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

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMsg('Digite o email e a senha do casal.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginCouple(loginEmail, loginPassword);
      if (!res.success) {
        setErrorMsg(res.message);
      }
    } catch (err) {
      setErrorMsg('Erro ao conectar. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setPendingSuccessMsg('');

    if (!adminUser.trim() || !adminPassword.trim()) {
      setErrorMsg('Digite o usuário e senha de administrador.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdmin(adminUser, adminPassword);
      if (!res.success) {
        setErrorMsg(res.message);
      }
    } catch (err) {
      setErrorMsg('Erro ao conectar como administrador.');
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

        {/* Card Container */}
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
            border: '1px solid var(--border-color)',
            gap: '0.2rem'
          }}>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '0.65rem 0.4rem',
                borderRadius: 'var(--border-radius-full)',
                fontWeight: 700,
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                background: mode === 'register' ? 'var(--color-primary)' : 'transparent',
                color: mode === 'register' ? '#ffffff' : 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <UserPlus size={15} />
              Criar Conta
            </button>
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '0.65rem 0.4rem',
                borderRadius: 'var(--border-radius-full)',
                fontWeight: 700,
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                background: mode === 'login' ? 'var(--color-primary)' : 'transparent',
                color: mode === 'login' ? '#ffffff' : 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <LogIn size={15} />
              Já Temos Conta
            </button>
            <button
              type="button"
              onClick={() => { setMode('admin'); setErrorMsg(''); }}
              style={{
                padding: '0.65rem 0.65rem',
                borderRadius: 'var(--border-radius-full)',
                fontWeight: 700,
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                background: mode === 'admin' ? 'var(--color-gold)' : 'transparent',
                color: mode === 'admin' ? '#ffffff' : 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Acesso exclusivo do Administrador para autorizar usuários"
            >
              <ShieldCheck size={15} />
              Admin
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
                  O administrador da plataforma precisa autorizar sua conta no painel para proteger os recursos do banco de dados. Assim que for liberada, vocês poderão acessar com o email e senha cadastrados!
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
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* MODE 1: REGISTER FORM (EMAIL + SENHA + 2 USUÁRIOS) */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Account Credentials (Email & Password) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                    Email do Casal *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      required
                      placeholder="casal@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem 0.65rem 2rem',
                        borderRadius: 'var(--border-radius-md)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-app)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.88rem'
                      }}
                    />
                    <Mail size={15} color="var(--color-text-light)" style={{ position: 'absolute', left: '8px', top: '10px' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                    Senha do Casal *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="password"
                      required
                      placeholder="Senha do casal"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem 0.65rem 2rem',
                        borderRadius: 'var(--border-radius-md)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-app)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.88rem'
                      }}
                    />
                    <Lock size={15} color="var(--color-text-light)" style={{ position: 'absolute', left: '8px', top: '10px' }} />
                  </div>
                </div>
              </div>

              {/* Husband Details */}
              <div style={{ 
                background: 'var(--bg-app)', 
                padding: '0.85rem 1rem', 
                borderRadius: 'var(--border-radius-md)', 
                border: '1px solid var(--border-color)' 
              }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.4rem' }}>
                  👨 Perfil 1: Esposo (Ele)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Nome *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Adam"
                      value={husbandName}
                      onChange={e => setHusbandName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.86rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Emoji</label>
                    <input
                      type="text"
                      value={husbandEmoji}
                      onChange={e => setHusbandEmoji(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        color: 'var(--color-text-main)',
                        textAlign: 'center',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Nível</label>
                    <select
                      value={husbandLevel}
                      onChange={e => setHusbandLevel(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.8rem'
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
                padding: '0.85rem 1rem', 
                borderRadius: 'var(--border-radius-md)', 
                border: '1px solid var(--border-color)' 
              }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-rose)', marginBottom: '0.4rem' }}>
                  👩 Perfil 2: Esposa (Ela)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Nome *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Minha Esposa"
                      value={wifeName}
                      onChange={e => setWifeName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.86rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Emoji</label>
                    <input
                      type="text"
                      value={wifeEmoji}
                      onChange={e => setWifeEmoji(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        color: 'var(--color-text-main)',
                        textAlign: 'center',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Nível</label>
                    <select
                      value={wifeLevel}
                      onChange={e => setWifeLevel(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.8rem'
                      }}
                    >
                      <option value="Iniciante">Iniciante</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Invite Code (Proteção do Banco) */}
              <div style={{
                background: 'rgba(180, 83, 9, 0.05)',
                border: '1px dashed var(--color-gold)',
                borderRadius: 'var(--border-radius-md)',
                padding: '0.75rem 1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
                  <ShieldCheck size={15} color="var(--color-gold)" />
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                    Código de Convite do Casal
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="EX: GRACE2026 (opcional para o 1º casal admin)"
                  value={inviteCode}
                  onChange={e => setInviteCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.8rem',
                    borderRadius: 'var(--border-radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-surface)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.86rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginTop: '0.25rem' }}>
                  * Protege o banco de dados contra acessos não autorizados. Se você for o primeiro casal (Admin), pode deixar vazio.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-gold"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
              >
                {loading ? 'Criando Conta...' : 'Começar Estudos com Progresso Zerado ✨'}
              </button>
            </form>
          )}

          {/* MODE 2: LOGIN FORM (EMAIL + SENHA) */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Email do Casal
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    autoFocus
                    placeholder="Digite o email cadastrado"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem 0.8rem 2.2rem',
                      borderRadius: 'var(--border-radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.94rem'
                    }}
                  />
                  <Mail size={16} color="var(--color-text-light)" style={{ position: 'absolute', left: '10px', top: '13px' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Senha de Acesso
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    placeholder="Digite sua senha"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem 0.8rem 2.2rem',
                      borderRadius: 'var(--border-radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.94rem'
                    }}
                  />
                  <KeyRound size={16} color="var(--color-text-light)" style={{ position: 'absolute', left: '10px', top: '13px' }} />
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

          {/* MODE 3: LOGIN DEDICADO DO ADMINISTRADOR */}
          {mode === 'admin' && (
            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                background: 'rgba(180, 83, 9, 0.08)',
                border: '1px solid var(--color-gold)',
                borderRadius: 'var(--border-radius-md)',
                padding: '0.75rem',
                fontSize: '0.82rem',
                color: 'var(--color-text-main)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <ShieldCheck size={20} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span>
                  Área de acesso restrito ao <strong>Administrador Mestre</strong> para autorizar casais pendentes, bloquear acessos e alterar o código de convite.
                </span>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Usuário ou Email do Administrador
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="admin@gracefluency.com"
                    value={adminUser}
                    onChange={e => setAdminUser(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem 0.8rem 2.2rem',
                      borderRadius: 'var(--border-radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.94rem'
                    }}
                  />
                  <Mail size={16} color="var(--color-text-light)" style={{ position: 'absolute', left: '10px', top: '13px' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Senha do Administrador
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    placeholder="admin2026"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem 0.8rem 2.2rem',
                      borderRadius: 'var(--border-radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-app)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.94rem'
                    }}
                  />
                  <Lock size={16} color="var(--color-text-light)" style={{ position: 'absolute', left: '10px', top: '13px' }} />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-gold"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
              >
                {loading ? 'Autenticando Admin...' : 'Acessar Painel de Controle de Usuários 🛡️'}
              </button>
            </form>
          )}
        </div>

        {/* Footer Note */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', fontSize: '0.82rem', marginTop: '1.5rem' }}>
          <Heart size={14} color="var(--color-rose)" fill="currentColor" />
          <span>Sincronização profissional em nuvem com Supabase</span>
        </div>
      </div>
    </div>
  );
};
