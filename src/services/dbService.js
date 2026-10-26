import { supabase } from '../utils/supabaseClient';
import { INITIAL_FLASHCARDS } from '../data/initialFlashcardsData';

// Cache local apenas para abrir o app instantaneamente; a fonte da verdade é o Supabase.
const CACHE_KEY = 'grace_fluency_cache_v2';

const PROGRESS_FIELDS = [
  'streak',
  'last_study_date',
  'points',
  'completed_devotionals',
  'memorized_verses',
  'flashcards',
  'completed_quizzes',
  'favorite_songs',
  'study_history',
  'weekly_goal'
];

const COUPLE_EDITABLE_FIELDS = [
  'husband_name',
  'husband_emoji',
  'husband_level',
  'wife_name',
  'wife_emoji',
  'wife_level',
  'couple_goal',
  'preferences'
];

const getStarterFlashcards = () =>
  INITIAL_FLASHCARDS.map(card => ({
    ...card,
    box: 1,
    lastReviewed: null,
    nextReviewDate: new Date().toISOString()
  }));

const emptyProgress = (role) => ({
  role,
  streak: 0,
  last_study_date: null,
  points: 0,
  completed_devotionals: [],
  memorized_verses: [],
  flashcards: [],
  completed_quizzes: [],
  favorite_songs: [],
  study_history: [],
  weekly_goal: { targetDevotionals: 5, targetFlashcards: 25 }
});

const isBrandNewProfile = (p) =>
  !(p.flashcards?.length) && !(p.points) && !(p.study_history?.length) && !(p.completed_devotionals?.length);

const friendlyError = (error) => {
  const msg = (error?.message || '').toLowerCase();
  if (msg.includes('invalid login credentials')) return 'Email ou senha incorretos.';
  if (msg.includes('email not confirmed')) return 'Seu email ainda não foi confirmado. Abra o link que enviamos para sua caixa de entrada (veja também o spam).';
  if (msg.includes('already registered') || msg.includes('already been registered')) return 'Este email já está cadastrado. Use a aba "Já Temos Conta".';
  if (msg.includes('password should be at least') || msg.includes('password is too short')) return 'A senha precisa ter pelo menos 6 caracteres.';
  if (msg.includes('rate limit') || msg.includes('too many')) return 'Muitas tentativas seguidas. Aguarde alguns minutos e tente novamente.';
  if (msg.includes('database error saving new user')) return 'O banco recusou o cadastro (código de convite inválido ou banco ainda não configurado).';
  if (msg.includes('unable to validate email') || msg.includes('invalid email')) return 'Email inválido.';
  if (msg.includes('failed to fetch') || msg.includes('network')) return 'Sem conexão com o servidor. Verifique sua internet.';
  return error?.message || 'Erro inesperado. Tente novamente.';
};

class DatabaseService {
  constructor() {
    this.saveQueues = {};
    this.pendingSaves = 0;
  }

  ensureClient() {
    if (!supabase) {
      throw new Error('Supabase não configurado (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY ausentes).');
    }
  }

  hasPendingSaves() {
    return this.pendingSaves > 0;
  }

  // Executa gravações do mesmo registro em fila, para uma gravação antiga nunca sobrescrever uma nova.
  enqueue(key, task) {
    this.pendingSaves += 1;
    const run = (this.saveQueues[key] || Promise.resolve())
      .catch(() => {})
      .then(task)
      .finally(() => {
        this.pendingSaves -= 1;
      });
    this.saveQueues[key] = run;
    return run;
  }

  // ---------------------------------------------------------------------------
  // CADASTRO / LOGIN
  // ---------------------------------------------------------------------------

  async registerCouple({
    email,
    password,
    husbandName,
    husbandEmoji = '👨‍💻',
    husbandLevel = 'Iniciante',
    wifeName,
    wifeEmoji = '👩‍💼',
    wifeLevel = 'Iniciante',
    inviteCode = ''
  }) {
    try {
      this.ensureClient();
      const cleanEmail = (email || '').trim().toLowerCase();

      // 1. Valida o convite no banco (resposta limpa antes de criar o login)
      const { data: inviteOk, error: inviteErr } = await supabase.rpc('check_invite_code', { code: inviteCode || '' });
      if (inviteErr) {
        return {
          success: false,
          message: 'Não foi possível validar o convite. Verifique se o script supabase_schema.sql já foi executado no Supabase.'
        };
      }
      if (!inviteOk) {
        return { success: false, message: 'Código de convite inválido! Peça o código ao administrador da plataforma.' };
      }

      // 2. Cria o login no Supabase Auth; o gatilho do banco cria o casal + 2 perfis zerados
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
          data: {
            husband_name: husbandName.trim(),
            husband_emoji: husbandEmoji.trim(),
            husband_level: husbandLevel,
            wife_name: wifeName.trim(),
            wife_emoji: wifeEmoji.trim(),
            wife_level: wifeLevel,
            invite_code: (inviteCode || '').trim()
          }
        }
      });

      if (error) return { success: false, message: friendlyError(error) };

      // Supabase devolve identities vazio quando o email já existe (com confirmação ativa)
      if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        return { success: false, message: 'Este email já está cadastrado. Use a aba "Já Temos Conta".' };
      }

      // Confirmação de email ativada no Supabase: ainda não há sessão
      if (!data?.session) {
        return {
          success: true,
          needsEmailConfirmation: true,
          message: `Conta criada! Enviamos um link de confirmação para ${cleanEmail}. Confirme o email e depois entre pela aba "Já Temos Conta".`
        };
      }

      return await this.loadCurrentSession();
    } catch (e) {
      return { success: false, message: friendlyError(e) };
    }
  }

  async loginCouple(email, password) {
    try {
      this.ensureClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: (email || '').trim().toLowerCase(),
        password
      });
      if (error) return { success: false, message: friendlyError(error) };
      return await this.loadCurrentSession();
    } catch (e) {
      return { success: false, message: friendlyError(e) };
    }
  }

  async hasAuthSession() {
    if (!supabase) return false;
    const { data } = await supabase.auth.getSession();
    return Boolean(data?.session);
  }

  // Carrega casal + 2 perfis do usuário logado e aplica as regras de acesso.
  async loadCurrentSession() {
    try {
      this.ensureClient();
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      const user = userData?.user;
      if (userErr || !user) return { success: false, message: 'Sessão expirada. Entre novamente.' };

      const { data: couple, error: coupleErr } = await supabase
        .from('couples')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (coupleErr) {
        return { success: false, message: `Erro ao ler o banco: ${coupleErr.message}` };
      }
      if (!couple) {
        await supabase.auth.signOut();
        return { success: false, message: 'Login sem cadastro de casal no banco. Crie a conta novamente ou fale com o administrador.' };
      }
      if (couple.status === 'blocked') {
        await supabase.auth.signOut();
        return { success: false, message: 'Esta conta foi bloqueada pelo administrador.' };
      }
      if (couple.status === 'pending' && !couple.is_admin) {
        await supabase.auth.signOut();
        return {
          success: false,
          isPending: true,
          message: 'Cadastro recebido! Sua conta está aguardando a liberação do administrador.'
        };
      }

      const { data: rows, error: progErr } = await supabase
        .from('profiles_progress')
        .select('*')
        .eq('couple_id', user.id);

      if (progErr) {
        return { success: false, message: `Erro ao carregar o progresso: ${progErr.message}` };
      }

      const profiles = {};
      for (const role of ['husband', 'wife']) {
        const row = rows?.find(r => r.role === role);
        profiles[role] = { ...emptyProgress(role), ...(row || {}) };

        // Primeiro acesso: entrega o baralho inicial de palavras (progresso continua zerado)
        if (isBrandNewProfile(profiles[role])) {
          profiles[role].flashcards = getStarterFlashcards();
          this.saveProfileProgress(user.id, role, profiles[role]);
        }
      }

      const session = { couple, profiles };
      this.cacheSession(session);
      return { success: true, data: session };
    } catch (e) {
      return { success: false, message: friendlyError(e) };
    }
  }

  async logout() {
    this.clearCache();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Erro ao sair:', e);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // GRAVAÇÕES
  // ---------------------------------------------------------------------------

  saveProfileProgress(coupleId, role, profileData) {
    const payload = { updated_at: new Date().toISOString() };
    PROGRESS_FIELDS.forEach(field => {
      if (profileData[field] !== undefined) payload[field] = profileData[field];
    });

    return this.enqueue(`progress:${coupleId}:${role}`, async () => {
      try {
        this.ensureClient();
        const { data, error } = await supabase
          .from('profiles_progress')
          .update(payload)
          .eq('couple_id', coupleId)
          .eq('role', role)
          .select('couple_id');

        if (error) throw error;
        if (!data || data.length === 0) throw new Error('Nenhuma linha atualizada (sem permissão ou conta não aprovada).');
        return { success: true };
      } catch (e) {
        console.error('Falha ao salvar progresso no Supabase:', e);
        return { success: false, message: friendlyError(e) };
      }
    });
  }

  saveCoupleData(coupleId, updates) {
    const payload = {};
    COUPLE_EDITABLE_FIELDS.forEach(field => {
      if (updates[field] !== undefined) payload[field] = updates[field];
    });

    return this.enqueue(`couple:${coupleId}`, async () => {
      try {
        this.ensureClient();
        const { data, error } = await supabase
          .from('couples')
          .update(payload)
          .eq('id', coupleId)
          .select('id');

        if (error) throw error;
        if (!data || data.length === 0) throw new Error('Nenhuma linha atualizada (sem permissão).');
        return { success: true };
      } catch (e) {
        console.error('Falha ao salvar dados do casal no Supabase:', e);
        return { success: false, message: friendlyError(e) };
      }
    });
  }

  // ---------------------------------------------------------------------------
  // ADMIN (protegido por RLS: só funciona para contas com is_admin = true)
  // ---------------------------------------------------------------------------

  async getSystemConfig() {
    this.ensureClient();
    const { data, error } = await supabase
      .from('system_config')
      .select('master_invite_code, require_admin_approval')
      .eq('id', 'main')
      .maybeSingle();
    if (error) throw error;
    return data || { master_invite_code: '', require_admin_approval: true };
  }

  async updateSystemConfig({ masterInviteCode, requireAdminApproval }) {
    this.ensureClient();
    const code = (masterInviteCode || '').trim().toUpperCase();
    if (code.length < 4) return { success: false, message: 'O código de convite precisa ter pelo menos 4 caracteres.' };

    const { data, error } = await supabase
      .from('system_config')
      .update({
        master_invite_code: code,
        require_admin_approval: Boolean(requireAdminApproval),
        updated_at: new Date().toISOString()
      })
      .eq('id', 'main')
      .select('id');

    if (error) return { success: false, message: friendlyError(error) };
    if (!data || data.length === 0) return { success: false, message: 'Sem permissão de administrador.' };
    return { success: true };
  }

  async getAllCouples() {
    this.ensureClient();
    const { data, error } = await supabase
      .from('couples')
      .select('id, email, husband_name, husband_emoji, husband_level, wife_name, wife_emoji, wife_level, is_admin, status, created_at')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async updateCoupleStatus(coupleId, newStatus) {
    this.ensureClient();
    const { data, error } = await supabase
      .from('couples')
      .update({ status: newStatus })
      .eq('id', coupleId)
      .select('id, status');

    if (error) return { success: false, message: friendlyError(error) };
    if (!data || data.length === 0 || data[0].status !== newStatus) {
      return { success: false, message: 'O banco não aceitou a alteração (sem permissão de administrador).' };
    }
    return { success: true };
  }

  // ---------------------------------------------------------------------------
  // CACHE LOCAL
  // ---------------------------------------------------------------------------

  getCachedSession() {
    try {
      const saved = localStorage.getItem(CACHE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  }

  cacheSession(session) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(session));
    } catch (e) {}
  }

  clearCache() {
    try {
      localStorage.removeItem(CACHE_KEY);
      // Limpa resíduos das versões antigas (que guardavam senhas no navegador)
      ['grace_fluency_active_couple_v1', 'grace_fluency_system_config_v1', 'grace_fluency_admin_session_v1', 'grace_fluency_all_couples']
        .forEach(k => localStorage.removeItem(k));
    } catch (e) {}
  }
}

export const dbService = new DatabaseService();
