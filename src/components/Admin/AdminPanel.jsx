import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Key, 
  Check, 
  X, 
  Lock, 
  Unlock, 
  Sparkles, 
  RefreshCw,
  AlertTriangle,
  Mail,
  UserCheck
} from 'lucide-react';
import { dbService } from '../../services/dbService';
import { useUser } from '../../context/UserContext';

export const AdminPanel = () => {
  const { currentCouple, triggerCelebration } = useUser();
  const [couples, setCouples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [masterCode, setMasterCode] = useState('');
  const [requireApproval, setRequireApproval] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [updatingCoupleId, setUpdatingCoupleId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [couplesList, config] = await Promise.all([
        dbService.getAllCouples(),
        dbService.getSystemConfig()
      ]);
      setCouples(couplesList || []);
      setMasterCode(config?.master_invite_code || 'GRACE2026');
      setRequireApproval(config?.require_admin_approval ?? true);
      setAdminEmail(config?.admin_email || 'admin@gracefluency.com');
      setAdminPassword(config?.admin_password || 'admin2026');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    await dbService.updateSystemConfig({
      masterInviteCode: masterCode,
      requireAdminApproval: requireApproval,
      adminEmail,
      adminPassword
    });
    setSaveSuccess(true);
    triggerCelebration();
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleStatusChange = async (coupleId, newStatus) => {
    setUpdatingCoupleId(coupleId);
    try {
      await dbService.updateCoupleStatus(coupleId, newStatus);
      setCouples(prev => prev.map(c => c.id === coupleId ? { ...c, status: newStatus } : c));
      triggerCelebration();
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingCoupleId(null);
    }
  };

  const pendingCount = couples.filter(c => c.status === 'pending').length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-gold">
            <ShieldCheck size={14} />
            Área de Administração
          </span>
          {pendingCount > 0 && (
            <span className="badge badge-rose">
              {pendingCount} casal(is) aguardando sua autorização!
            </span>
          )}
        </div>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          Painel de Controle de Usuários
        </h1>
        <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)' }}>
          Autorize e libere o acesso de novos casais ou bloqueie contas indesejadas para manter seu banco de dados e APIs 100% protegidos.
        </p>
      </div>

      {/* Access Gate & Config */}
      <div className="card" style={{ marginBottom: '1.75rem', borderLeft: '5px solid var(--color-gold)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Key size={18} color="var(--color-gold)" />
          Regras de Acesso & Código de Convite da Família
        </h3>
        <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
          Novos casais só conseguem criar conta se digitarem esse código de convite. Você pode alterá-lo quando quiser.
        </p>

        <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Código Mestre de Convite
              </label>
              <input
                type="text"
                required
                value={masterCode}
                onChange={e => setMasterCode(e.target.value.toUpperCase())}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-app)',
                  color: 'var(--color-text-main)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Email de Login do Admin
              </label>
              <input
                type="text"
                required
                value={adminEmail}
                onChange={e => setAdminEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-app)',
                  color: 'var(--color-text-main)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Senha de Login do Admin
              </label>
              <input
                type="text"
                required
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-app)',
                  color: 'var(--color-text-main)',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <input
                type="checkbox"
                id="requireApprovalCheckbox"
                checked={requireApproval}
                onChange={e => setRequireApproval(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
              />
              <label htmlFor="requireApprovalCheckbox" style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                Exigir aprovação manual para novos cadastros (Recomendado)
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-gold"
              style={{ padding: '0.65rem 1.25rem' }}
            >
              {saveSuccess ? (
                <>
                  <Check size={16} /> Salvo!
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Salvar Configurações
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Couples Access Management Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              Casais Cadastrados ({couples.length})
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Libere o acesso dos casais aprovados clicando em "Liberar Acesso".
            </p>
          </div>

          <button
            onClick={loadData}
            className="btn btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            <RefreshCw size={14} className={loading ? 'speaking-pulse' : ''} />
            Atualizar Lista
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
            Carregando casais do banco de dados...
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--color-text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem' }}>Casal & Email</th>
                  <th style={{ padding: '0.75rem' }}>Tipo</th>
                  <th style={{ padding: '0.75rem' }}>Data Cadastro</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Status de Acesso</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Ação de Controle</th>
                </tr>
              </thead>
              <tbody>
                {couples.map((c) => {
                  const isCurrent = c.id === currentCouple?.id;
                  const isPending = c.status === 'pending';
                  const isBlocked = c.status === 'blocked';
                  const isApproved = c.status === 'approved' || !c.status;

                  return (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <div style={{ fontWeight: 800, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span>{c.husband_emoji || '👨‍💻'} {c.husband_name}</span>
                          <span style={{ color: 'var(--color-gold)' }}>&</span>
                          <span>{c.wife_emoji || '👩‍💼'} {c.wife_name}</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.15rem' }}>
                          <Mail size={12} />
                          <span>{c.email || 'Sem email (PIN clássico)'}</span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                          Níveis: {c.husband_level || 'Iniciante'} / {c.wife_level || 'Iniciante'}
                        </div>
                      </td>

                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        {c.is_admin ? (
                          <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                            👑 Administrador
                          </span>
                        ) : (
                          <span className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                            Membro
                          </span>
                        )}
                      </td>

                      <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                        {c.created_at ? new Date(c.created_at).toLocaleDateString('pt-BR') : 'Recente'}
                      </td>

                      <td style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}>
                        {isPending && (
                          <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                            ⏳ Aguardando Liberação
                          </span>
                        )}
                        {isApproved && (
                          <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                            ✅ Acesso Liberado
                          </span>
                        )}
                        {isBlocked && (
                          <span className="badge badge-rose" style={{ fontSize: '0.75rem' }}>
                            🚫 Acesso Bloqueado
                          </span>
                        )}
                      </td>

                      <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right' }}>
                        {c.is_admin ? (
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                            Conta Master
                          </span>
                        ) : (
                          <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                            {(!isApproved || isPending) && (
                              <button
                                onClick={() => handleStatusChange(c.id, 'approved')}
                                disabled={updatingCoupleId === c.id}
                                className="btn btn-outline"
                                style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', borderColor: 'var(--color-emerald)', color: 'var(--color-emerald)' }}
                                title="Liberar acesso ao casal"
                              >
                                <Unlock size={13} /> Liberar Acesso
                              </button>
                            )}

                            {isApproved && (
                              <button
                                onClick={() => handleStatusChange(c.id, 'blocked')}
                                disabled={updatingCoupleId === c.id}
                                className="btn btn-outline"
                                style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', borderColor: 'var(--color-rose)', color: 'var(--color-rose)' }}
                                title="Bloquear acesso para economizar banco de dados"
                              >
                                <Lock size={13} /> Bloquear
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
