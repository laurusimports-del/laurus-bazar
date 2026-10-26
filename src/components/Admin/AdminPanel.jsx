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
  UserCheck,
  Copy,
  Share2,
  Database,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { dbService } from '../../services/dbService';
import { useUser } from '../../context/UserContext';
import { supabase } from '../../utils/supabaseClient';

const RANDOM_INVITE_PREFIXES = ['GRACE', 'AMOR', 'FAITH', 'COUPLE', 'BLESSED', 'EDEN', 'SHALOM'];

export const AdminPanel = () => {
  const { currentCouple, triggerCelebration } = useUser();
  const [couples, setCouples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [masterCode, setMasterCode] = useState('GRACE2026');
  const [requireApproval, setRequireApproval] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [updatingCoupleId, setUpdatingCoupleId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'approved' | 'blocked'
  const [dbHealthy, setDbHealthy] = useState(true);
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [sqlCopySuccess, setSqlCopySuccess] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [couplesList, config] = await Promise.all([
        dbService.getAllCouples().catch(err => {
          console.warn('Erro ao ler casais do Supabase:', err);
          return [];
        }),
        dbService.getSystemConfig().catch(err => {
          console.warn('Erro ao ler config do Supabase:', err);
          return null;
        })
      ]);

      const rawList = Array.isArray(couplesList) ? [...couplesList] : [];

      // Garante que o cadastro do Adam & Marcela apareça SEMPRE no topo como Administrador Master!
      const activeMaster = currentCouple || dbService.getCachedSession()?.couple;
      if (activeMaster) {
        const foundIndex = rawList.findIndex(c => 
          (c.email && activeMaster.email && c.email.toLowerCase() === activeMaster.email.toLowerCase()) || 
          (c.id && activeMaster.id && c.id === activeMaster.id)
        );
        if (foundIndex >= 0) {
          rawList[foundIndex] = {
            ...rawList[foundIndex],
            ...activeMaster,
            is_admin: true,
            status: 'approved'
          };
        } else {
          rawList.unshift({
            id: activeMaster.id || 'master-adam-marcela',
            email: activeMaster.email || 'lucasadamdeveloper@gmail.com',
            husband_name: activeMaster.husband_name || 'Adam',
            husband_emoji: activeMaster.husband_emoji || '👨‍💻',
            husband_level: activeMaster.husband_level || 'Iniciante',
            wife_name: activeMaster.wife_name || 'Marcela',
            wife_emoji: activeMaster.wife_emoji || '👩‍💼',
            wife_level: activeMaster.wife_level || 'Iniciante',
            is_admin: true,
            status: 'approved',
            created_at: activeMaster.created_at || new Date().toISOString()
          });
        }
      }

      setCouples(rawList);
      if (config?.master_invite_code) {
        setMasterCode(config.master_invite_code);
        setRequireApproval(config.require_admin_approval ?? true);
        setDbHealthy(true);
      } else {
        // Testa se a tabela system_config existe
        if (supabase) {
          const { error } = await supabase.from('system_config').select('id').limit(1);
          if (error && error.code === 'PGRST205') {
            setDbHealthy(false);
          }
        }
      }
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
    const res = await dbService.updateSystemConfig({
      masterInviteCode: masterCode,
      requireAdminApproval: requireApproval
    });

    if (res?.success) {
      setSaveSuccess(true);
      triggerCelebration();
      setTimeout(() => setSaveSuccess(false), 2500);
    } else {
      alert(res?.message || 'Erro ao salvar regras no banco de dados.');
    }
  };

  const handleGenerateCode = () => {
    const prefix = RANDOM_INVITE_PREFIXES[Math.floor(Math.random() * RANDOM_INVITE_PREFIXES.length)];
    const year = new Date().getFullYear();
    const suffix = Math.floor(100 + Math.random() * 900);
    const newCode = `${prefix}${year}${suffix}`;
    setMasterCode(newCode);
    triggerCelebration();
  };

  const handleCopyInviteLink = () => {
    try {
      const url = `${window.location.origin}/?invite=${encodeURIComponent(masterCode)}`;
      navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch (e) {
      prompt('Copie o link de convite:', `${window.location.origin}/?invite=${masterCode}`);
    }
  };

  const handleStatusChange = async (coupleId, newStatus) => {
    setUpdatingCoupleId(coupleId);
    try {
      const res = await dbService.updateCoupleStatus(coupleId, newStatus);
      if (res?.success) {
        setCouples(prev => prev.map(c => c.id === coupleId ? { ...c, status: newStatus } : c));
        triggerCelebration();
      } else {
        alert(res?.message || 'Não foi possível alterar o status.');
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão ao alterar status.');
    } finally {
      setUpdatingCoupleId(null);
    }
  };

  const handleCopySql = () => {
    const sqlText = `-- Execute no Supabase SQL Editor para criar as tabelas do casal
-- Arquivo completo disponível em: supabase_schema.sql na raiz do projeto`;
    navigator.clipboard.writeText(sqlText);
    setSqlCopySuccess(true);
    setTimeout(() => setSqlCopySuccess(false), 2500);
  };

  const pendingCount = couples.filter(c => c.status === 'pending').length;
  const approvedCount = couples.filter(c => c.status === 'approved' || (!c.status && !c.is_admin)).length;
  const blockedCount = couples.filter(c => c.status === 'blocked').length;

  const filteredCouples = couples.filter(c => {
    if (filterStatus === 'pending') return c.status === 'pending';
    if (filterStatus === 'approved') return c.status === 'approved' || (!c.status && !c.is_admin);
    if (filterStatus === 'blocked') return c.status === 'blocked';
    return true;
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
          <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldCheck size={14} />
            Área de Administração
          </span>
          {pendingCount > 0 && (
            <span className="badge badge-rose" style={{ animation: 'pulse 1.8s infinite' }}>
              ⚡ {pendingCount} casal(is) aguardando sua liberação!
            </span>
          )}
          {currentCouple && (
            <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
              👑 Admin Master: {currentCouple.husband_name} & {currentCouple.wife_name} ({currentCouple.email})
            </span>
          )}
        </div>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          Painel de Controle de Usuários & Convites
        </h1>
        <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)' }}>
          Controle quem pode acessar sua plataforma. Gere links e códigos de convite, libere novos casais com 1 clique e proteja seu banco de dados e APIs.
        </p>
      </div>

      {/* Alerta de Banco de Dados Supabase (se schema ainda não foi rodado) */}
      {!dbHealthy && (
        <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '5px solid var(--color-gold)', background: 'rgba(217, 119, 6, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <Database size={22} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontWeight: 800, fontSize: '1.02rem', marginBottom: '0.2rem' }}>
                  Sincronização Cloud com Supabase
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  Para que os novos casais e a progressão fiquem salvos diretamente na nuvem do Supabase, certifique-se de executar o script <code>supabase_schema.sql</code> no SQL Editor do seu projeto Supabase.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSqlGuide(!showSqlGuide)}
              className="btn btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              {showSqlGuide ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showSqlGuide ? 'Ocultar Instruções' : 'Ver Instruções do SQL (1 minuto)'}
            </button>
          </div>

          {showSqlGuide && (
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.86rem' }}>
              <ol style={{ paddingLeft: '1.25rem', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                <li>Abra o painel do seu Supabase: <strong>supabase.com/dashboard</strong></li>
                <li>No menu lateral esquerdo, clique no ícone de <strong>SQL Editor</strong></li>
                <li>Clique em <strong>+ New query</strong> e cole todo o conteúdo do arquivo <code>supabase_schema.sql</code> do seu projeto</li>
                <li>Clique no botão verde <strong>Run</strong> no canto inferior direito</li>
                <li>Pronto! Todas as tabelas, regras de segurança RLS e gatilhos de convite estarão ativos.</li>
              </ol>
            </div>
          )}
        </div>
      )}

      {/* Card Regras de Acesso & Código de Convite */}
      <div className="card" style={{ marginBottom: '1.75rem', borderLeft: '5px solid var(--color-gold)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={18} color="var(--color-gold)" />
            Código de Convite & Modo de Entrada
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleGenerateCode}
              className="btn btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              title="Gerar um novo código aleatório"
            >
              <Sparkles size={13} color="var(--color-gold)" />
              Gerar Novo Código
            </button>
            <button
              type="button"
              onClick={handleCopyInviteLink}
              className="btn btn-gold"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              title="Copiar link com código embutido para enviar no WhatsApp"
            >
              {copySuccess ? <Check size={13} /> : <Share2 size={13} />}
              {copySuccess ? 'Link Copiado!' : 'Copiar Link de Convite'}
            </button>
          </div>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
          Para que outro casal entre, você envia esse código (ou o link direto). O casal cria a conta usando o email deles, e você escolhe se eles entram direto ou se precisam da sua autorização.
        </p>

        <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Código Mestre de Convite Atual
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  required
                  value={masterCode}
                  onChange={e => setMasterCode(e.target.value.toUpperCase().replace(/\s/g, ''))}
                  style={{
                    flex: 1,
                    padding: '0.75rem 0.95rem',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-app)',
                    color: 'var(--color-gold)',
                    fontWeight: 800,
                    fontSize: '1.15rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}
                  placeholder="EX: GRACE2026"
                />
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', marginTop: '0.3rem', display: 'block' }}>
                Você pode digitar qualquer código que desejar (ex: FAMILIA2026, CASALAMIGO).
              </span>
            </div>

            <div style={{
              background: 'var(--bg-app)',
              padding: '1rem',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                Modo de Autorização
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <input
                  type="checkbox"
                  id="requireApprovalCheckbox"
                  checked={requireApproval}
                  onChange={e => setRequireApproval(e.target.checked)}
                  style={{ width: '19px', height: '19px', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
                />
                <label htmlFor="requireApprovalCheckbox" style={{ fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}>
                  Exigir aprovação manual do Admin (Recomendado)
                </label>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', lineHeight: 1.4 }}>
                {requireApproval 
                  ? '🔒 O casal cria a conta, mas fica "Aguardando Liberação" até você clicar em "Liberar Acesso" abaixo.'
                  : '⚡ Qualquer casal que tiver o código de convite já entra liberado imediatamente.'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
            <button
              type="submit"
              className="btn btn-gold"
              style={{ padding: '0.65rem 1.4rem', fontWeight: 700 }}
            >
              {saveSuccess ? (
                <>
                  <Check size={16} /> Regras Salvas!
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Salvar Regras de Convite
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Tabela de Casais Cadastrados */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Users size={18} color="var(--color-primary)" />
              Casais Cadastrados ({couples.length})
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Gerencie o status de cada casal. Acesso bloqueado poupa seus recursos de banco de dados e APIs.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {/* Filtros rápidos */}
            <div style={{ display: 'flex', background: 'var(--bg-app)', padding: '2px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <button
                onClick={() => setFilterStatus('all')}
                style={{
                  border: 'none',
                  background: filterStatus === 'all' ? 'var(--bg-surface)' : 'transparent',
                  color: filterStatus === 'all' ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Todos ({couples.length})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                style={{
                  border: 'none',
                  background: filterStatus === 'pending' ? 'var(--bg-surface)' : 'transparent',
                  color: filterStatus === 'pending' ? 'var(--color-gold)' : 'var(--color-text-muted)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Pendentes ({pendingCount})
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                style={{
                  border: 'none',
                  background: filterStatus === 'approved' ? 'var(--bg-surface)' : 'transparent',
                  color: filterStatus === 'approved' ? 'var(--color-emerald)' : 'var(--color-text-muted)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Liberados ({approvedCount})
              </button>
            </div>

            <button
              onClick={loadData}
              className="btn btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              title="Recarregar lista do Supabase"
            >
              <RefreshCw size={13} className={loading ? 'speaking-pulse' : ''} />
              Atualizar
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)' }}>
            <RefreshCw size={24} style={{ animation: 'spin 1.5s linear infinite', marginBottom: '0.5rem' }} />
            <div>Carregando casais do banco de dados...</div>
          </div>
        ) : filteredCouples.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)', background: 'var(--bg-app)', borderRadius: 'var(--border-radius-md)' }}>
            Nenhum casal encontrado neste filtro.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--color-text-muted)', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem' }}>Casal & Contato</th>
                  <th style={{ padding: '0.75rem' }}>Tipo</th>
                  <th style={{ padding: '0.75rem' }}>Data Cadastro</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Status de Acesso</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Ação de Controle</th>
                </tr>
              </thead>
              <tbody>
                {filteredCouples.map((c) => {
                  const isCurrent = c.id === currentCouple?.id;
                  const isPending = c.status === 'pending';
                  const isBlocked = c.status === 'blocked';
                  const isApproved = c.status === 'approved' || (!c.status && !c.is_admin);

                  return (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)', background: isPending ? 'rgba(217, 119, 6, 0.04)' : 'transparent' }}>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <div style={{ fontWeight: 800, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span>{c.husband_emoji || '👨‍💻'} {c.husband_name}</span>
                          <span style={{ color: 'var(--color-gold)' }}>&</span>
                          <span>{c.wife_emoji || '👩‍💼'} {c.wife_name}</span>
                          {isCurrent && (
                            <span className="badge badge-gold" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>Você</span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.15rem' }}>
                          <Mail size={12} />
                          <span>{c.email || 'Email não disponível'}</span>
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
                          <span className="badge badge-gold" style={{ fontSize: '0.75rem', animation: 'pulse 1.8s infinite' }}>
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
                            🚫 Bloqueado
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
                            {isPending && (
                              <button
                                onClick={() => handleStatusChange(c.id, 'approved')}
                                disabled={updatingCoupleId === c.id}
                                className="btn btn-gold"
                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                title="Aprovar e liberar acesso imediato para o casal"
                              >
                                <Unlock size={13} /> Liberar Acesso
                              </button>
                            )}

                            {isApproved && (
                              <button
                                onClick={() => handleStatusChange(c.id, 'blocked')}
                                disabled={updatingCoupleId === c.id}
                                className="btn btn-outline"
                                style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', borderColor: 'var(--color-rose)', color: 'var(--color-rose)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                title="Bloquear acesso temporariamente"
                              >
                                <Lock size={13} /> Bloquear
                              </button>
                            )}

                            {isBlocked && (
                              <button
                                onClick={() => handleStatusChange(c.id, 'approved')}
                                disabled={updatingCoupleId === c.id}
                                className="btn btn-outline"
                                style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', borderColor: 'var(--color-emerald)', color: 'var(--color-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                title="Reativar acesso do casal"
                              >
                                <Unlock size={13} /> Reativar
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
