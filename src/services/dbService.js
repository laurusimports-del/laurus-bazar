import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';
import { INITIAL_FLASHCARDS } from '../data/initialFlashcardsData';

// Local storage backup keys
const LOCAL_COUPLE_KEY = 'grace_fluency_active_couple_v1';
const LOCAL_CONFIG_KEY = 'grace_fluency_system_config_v1';
const LOCAL_ADMIN_KEY = 'grace_fluency_admin_session_v1';

// Starter flashcards with clean 0-progress state
const getCleanStarterFlashcards = () => {
  return INITIAL_FLASHCARDS.map(card => ({
    ...card,
    box: 1,
    lastReviewed: null,
    nextReviewDate: new Date().toISOString()
  }));
};

class DatabaseService {
  constructor() {
    this.isOnline = isSupabaseConfigured();
  }

  // 1. Obter configurações do sistema (Código Mestre, Aprovação & Credenciais Admin)
  async getSystemConfig() {
    if (this.isOnline && supabase) {
      try {
        const { data, error } = await supabase
          .from('system_config')
          .select('*')
          .eq('id', 'main')
          .single();

        if (!error && data) {
          localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify(data));
          return data;
        }
      } catch (e) {
        console.warn('Falha ao buscar config do Supabase, usando local:', e);
      }
    }

    try {
      const saved = localStorage.getItem(LOCAL_CONFIG_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return {
      master_invite_code: 'GRACE2026',
      require_admin_approval: true,
      admin_email: 'admin@gracefluency.com',
      admin_password: 'admin2026'
    };
  }

  // 2. Atualizar Código Mestre de Convite e Regras (Admin Only)
  async updateSystemConfig(configUpdates) {
    const current = await this.getSystemConfig();
    const newConfig = {
      id: 'main',
      master_invite_code: (configUpdates.masterInviteCode ?? current.master_invite_code).trim().toUpperCase(),
      require_admin_approval: Boolean(configUpdates.requireAdminApproval ?? current.require_admin_approval),
      admin_email: (configUpdates.adminEmail ?? current.admin_email).trim().toLowerCase(),
      admin_password: (configUpdates.adminPassword ?? current.admin_password).trim(),
      updated_at: new Date().toISOString()
    };

    localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify(newConfig));

    if (this.isOnline && supabase) {
      try {
        await supabase
          .from('system_config')
          .upsert(newConfig);
      } catch (e) {
        console.error('Erro ao atualizar config no Supabase:', e);
      }
    }

    return newConfig;
  }

  // 3. Cadastrar Novo Casal com EMAIL e SENHA (com progresso 100% ZERADO)
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
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanEmail || !cleanPassword) {
      return { success: false, message: 'Informe o email e uma senha de acesso.' };
    }

    const config = await this.getSystemConfig();

    // Verificar se já existe algum casal no banco para definir se é o primeiro (Admin Master)
    let isFirstCouple = false;
    let emailAlreadyExists = false;

    if (this.isOnline && supabase) {
      try {
        // Verificar se email já existe
        const { data: existingUser } = await supabase
          .from('couples')
          .select('id')
          .eq('email', cleanEmail)
          .maybeSingle();

        if (existingUser) {
          emailAlreadyExists = true;
        }

        // Verificar contagem geral
        const { count, error } = await supabase
          .from('couples')
          .select('id', { count: 'exact', head: true });

        if (!error && (count === 0 || count === null)) {
          isFirstCouple = true;
        }
      } catch (e) {
        console.warn('Erro ao checar Supabase na criação:', e);
      }
    } else {
      // Verificação Local
      const localCouples = JSON.parse(localStorage.getItem('grace_fluency_all_couples') || '[]');
      if (localCouples.length === 0) isFirstCouple = true;
      if (localCouples.some(c => c.email === cleanEmail)) {
        emailAlreadyExists = true;
      }
    }

    if (emailAlreadyExists) {
      return {
        success: false,
        message: 'Este email já está cadastrado. Alterne para a aba "Já Temos Conta" para entrar.'
      };
    }

    // Se NÃO for o primeiro casal, validar código de convite
    if (!isFirstCouple) {
      const expectedCode = (config.master_invite_code || 'GRACE2026').trim().toUpperCase();
      const providedCode = (inviteCode || '').trim().toUpperCase();

      if (providedCode !== expectedCode) {
        return {
          success: false,
          message: 'Código de Convite inválido! Solicite o código de acesso ao administrador.'
        };
      }
    }

    // Primeiro casal é aprovado e admin automático; outros casais dependem da aprovação
    const isAdmin = isFirstCouple;
    const initialStatus = isFirstCouple ? 'approved' : (config.require_admin_approval ? 'pending' : 'approved');

    const coupleId = `couple_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const coupleRecord = {
      id: coupleId,
      email: cleanEmail,
      password: cleanPassword,
      couple_pin: cleanPassword, // compatibilidade
      husband_name: husbandName.trim(),
      husband_emoji: husbandEmoji.trim() || '👨‍💻',
      husband_level: husbandLevel,
      wife_name: wifeName.trim(),
      wife_emoji: wifeEmoji.trim() || '👩‍💼',
      wife_level: wifeLevel,
      is_admin: isAdmin,
      status: initialStatus,
      couple_goal: {
        title: 'Estudo em Casal: 7 Dias de Fé & Fluência',
        targetDays: 7,
        loveNote: '“Juntos somos mais fortes e mais sábios na Palavra.” ❤️'
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // PROGRESSÃO TOTALMENTE ZERADA
    const husbandProgress = {
      id: `${coupleId}_husband`,
      couple_id: coupleId,
      role: 'husband',
      streak: 0,
      last_study_date: null,
      points: 0,
      completed_devotionals: [],
      memorized_verses: [],
      flashcards: getCleanStarterFlashcards(),
      completed_quizzes: [],
      favorite_songs: [],
      study_history: [],
      weekly_goal: { targetDevotionals: 5, targetFlashcards: 25 },
      updated_at: new Date().toISOString()
    };

    const wifeProgress = {
      id: `${coupleId}_wife`,
      couple_id: coupleId,
      role: 'wife',
      streak: 0,
      last_study_date: null,
      points: 0,
      completed_devotionals: [],
      memorized_verses: [],
      flashcards: getCleanStarterFlashcards(),
      completed_quizzes: [],
      favorite_songs: [],
      study_history: [],
      weekly_goal: { targetDevotionals: 5, targetFlashcards: 25 },
      updated_at: new Date().toISOString()
    };

    // Salvar no Supabase
    if (this.isOnline && supabase) {
      try {
        const { error: cErr } = await supabase.from('couples').insert(coupleRecord);
        if (cErr) throw cErr;

        const { error: pErr } = await supabase.from('profiles_progress').insert([husbandProgress, wifeProgress]);
        if (pErr) throw pErr;
      } catch (err) {
        console.error('Erro ao salvar casal no Supabase:', err);
      }
    }

    // Salvar no LocalStorage
    const fullSession = {
      couple: coupleRecord,
      profiles: {
        husband: husbandProgress,
        wife: wifeProgress
      }
    };

    // Armazenar na lista de casais locais também
    try {
      const allCouples = JSON.parse(localStorage.getItem('grace_fluency_all_couples') || '[]');
      allCouples.push(coupleRecord);
      localStorage.setItem('grace_fluency_all_couples', JSON.stringify(allCouples));
    } catch (e) {}

    if (initialStatus === 'approved') {
      localStorage.setItem(LOCAL_COUPLE_KEY, JSON.stringify(fullSession));
    }

    return {
      success: true,
      data: fullSession,
      status: initialStatus,
      isAdmin,
      message: initialStatus === 'pending'
        ? 'Cadastro realizado com sucesso! Sua conta está aguardando liberação do administrador para proteger o banco de dados.'
        : 'Cadastro realizado com sucesso! Bem-vindos à plataforma!'
    };
  }

  // 4. Login do Casal por EMAIL e SENHA
  async loginCouple(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanEmail || !cleanPassword) {
      return { success: false, message: 'Digite o email e a senha do casal.' };
    }

    // Tentar Supabase primeiro
    if (this.isOnline && supabase) {
      try {
        const { data: couple, error } = await supabase
          .from('couples')
          .select('*')
          .eq('email', cleanEmail)
          .maybeSingle();

        if (!error && couple) {
          if (couple.password !== cleanPassword && couple.couple_pin !== cleanPassword) {
            return { success: false, message: 'Senha incorreta. Verifique e tente novamente.' };
          }

          // Verificar status de aprovação
          if (couple.status === 'blocked') {
            return { success: false, message: 'Esta conta foi bloqueada pelo administrador.' };
          }
          if (couple.status === 'pending' && !couple.is_admin) {
            return { 
              success: false, 
              isPending: true,
              message: 'Sua conta ainda está aguardando liberação do administrador. Solicite o acesso a ele!' 
            };
          }

          // Buscar progresso dos 2 perfis
          const { data: progressRows } = await supabase
            .from('profiles_progress')
            .select('*')
            .eq('couple_id', couple.id);

          const husbandProg = progressRows?.find(r => r.role === 'husband') || {
            streak: 0, points: 0, completed_devotionals: [], memorized_verses: [], flashcards: getCleanStarterFlashcards()
          };
          const wifeProg = progressRows?.find(r => r.role === 'wife') || {
            streak: 0, points: 0, completed_devotionals: [], memorized_verses: [], flashcards: getCleanStarterFlashcards()
          };

          const session = {
            couple,
            profiles: {
              husband: husbandProg,
              wife: wifeProg
            }
          };

          localStorage.setItem(LOCAL_COUPLE_KEY, JSON.stringify(session));
          return { success: true, data: session };
        }
      } catch (e) {
        console.warn('Erro ao consultar Supabase no login, tentando fallback local:', e);
      }
    }

    // Fallback local se estiver offline
    try {
      const allCouples = JSON.parse(localStorage.getItem('grace_fluency_all_couples') || '[]');
      const couple = allCouples.find(c => c.email === cleanEmail);
      if (couple) {
        if (couple.password !== cleanPassword && couple.couple_pin !== cleanPassword) {
          return { success: false, message: 'Senha incorreta.' };
        }
        if (couple.status === 'blocked') {
          return { success: false, message: 'Esta conta foi desativada.' };
        }
        if (couple.status === 'pending' && !couple.is_admin) {
          return { success: false, isPending: true, message: 'Aguardando liberação do administrador.' };
        }

        const savedSession = localStorage.getItem(LOCAL_COUPLE_KEY);
        const parsed = savedSession ? JSON.parse(savedSession) : null;
        const session = {
          couple,
          profiles: parsed?.profiles || {
            husband: { streak: 0, points: 0, completed_devotionals: [], memorized_verses: [], flashcards: getCleanStarterFlashcards() },
            wife: { streak: 0, points: 0, completed_devotionals: [], memorized_verses: [], flashcards: getCleanStarterFlashcards() }
          }
        };

        localStorage.setItem(LOCAL_COUPLE_KEY, JSON.stringify(session));
        return { success: true, data: session };
      }
    } catch (e) {}

    return { success: false, message: 'Email não encontrado. Verifique os dados ou crie uma nova conta.' };
  }

  // 5. Login Dedicado do Administrador
  async loginAdmin(emailOrUser, password) {
    const cleanUser = (emailOrUser || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const config = await this.getSystemConfig();

    const expectedAdminEmail = (config.admin_email || 'admin@gracefluency.com').toLowerCase();
    const expectedAdminPass = (config.admin_password || 'admin2026');

    // Verificar se confere com credencial mestre do admin
    if ((cleanUser === expectedAdminEmail || cleanUser === 'admin') && cleanPass === expectedAdminPass) {
      const adminSession = {
        isAdmin: true,
        email: expectedAdminEmail,
        isMasterAdmin: true
      };
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminSession));
      return { success: true, adminSession };
    }

    // Verificar se é uma conta de casal com is_admin = true
    const coupleLogin = await this.loginCouple(cleanUser, cleanPass);
    if (coupleLogin.success && coupleLogin.data?.couple?.is_admin) {
      const adminSession = {
        isAdmin: true,
        email: cleanUser,
        coupleData: coupleLogin.data
      };
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminSession));
      return { success: true, adminSession };
    }

    return { success: false, message: 'Credenciais de administrador inválidas.' };
  }

  // 6. Salvar Progresso de um Perfil (Sincronizado diretamente no Supabase)
  async saveProfileProgress(coupleId, role, profileData) {
    const progressId = `${coupleId}_${role}`;
    const payload = {
      id: progressId,
      couple_id: coupleId,
      role,
      streak: profileData.streak || 0,
      last_study_date: profileData.last_study_date || profileData.lastStudyDate || null,
      points: profileData.points || 0,
      completed_devotionals: profileData.completed_devotionals || profileData.completedDevotionals || [],
      memorized_verses: profileData.memorized_verses || profileData.memorizedVerses || [],
      flashcards: profileData.flashcards || [],
      completed_quizzes: profileData.completed_quizzes || profileData.completedQuizzes || [],
      favorite_songs: profileData.favorite_songs || profileData.favoriteSongs || [],
      study_history: profileData.study_history || profileData.studyHistory || [],
      weekly_goal: profileData.weekly_goal || profileData.weeklyGoal || { targetDevotionals: 5, targetFlashcards: 25 },
      updated_at: new Date().toISOString()
    };

    if (this.isOnline && supabase) {
      try {
        await supabase
          .from('profiles_progress')
          .upsert(payload);
      } catch (e) {
        console.warn('Erro ao salvar progresso no Supabase:', e);
      }
    }
  }

  // 7. Salvar Dados do Casal (Metas, Recadinho, Nomes)
  async saveCoupleData(coupleId, coupleUpdates) {
    if (this.isOnline && supabase) {
      try {
        await supabase
          .from('couples')
          .update({
            ...coupleUpdates,
            updated_at: new Date().toISOString()
          })
          .eq('id', coupleId);
      } catch (e) {
        console.warn('Erro ao salvar dados do casal no Supabase:', e);
      }
    }
  }

  // 8. Listar todos os casais cadastrados (Painel Admin)
  async getAllCouples() {
    if (this.isOnline && supabase) {
      try {
        const { data, error } = await supabase
          .from('couples')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data;
        }
      } catch (e) {
        console.warn('Erro ao buscar casais no Supabase:', e);
      }
    }

    // Fallback local
    try {
      const allCouples = JSON.parse(localStorage.getItem('grace_fluency_all_couples') || '[]');
      if (allCouples.length > 0) return allCouples;

      const active = localStorage.getItem(LOCAL_COUPLE_KEY);
      if (active) {
        const parsed = JSON.parse(active);
        return [parsed.couple];
      }
    } catch (e) {}

    return [];
  }

  // 9. Aprovar ou Bloquear um Casal (Admin)
  async updateCoupleStatus(coupleId, newStatus) {
    if (this.isOnline && supabase) {
      try {
        const { error } = await supabase
          .from('couples')
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq('id', coupleId);

        if (!error) return { success: true };
      } catch (e) {
        console.error('Erro ao atualizar status do casal no Supabase:', e);
      }
    }

    // Atualizar no local storage também
    try {
      const allCouples = JSON.parse(localStorage.getItem('grace_fluency_all_couples') || '[]');
      const updated = allCouples.map(c => c.id === coupleId ? { ...c, status: newStatus } : c);
      localStorage.setItem('grace_fluency_all_couples', JSON.stringify(updated));
    } catch (e) {}

    return { success: true };
  }

  // Obter sessões salvas no navegador
  getLocalSession() {
    try {
      const saved = localStorage.getItem(LOCAL_COUPLE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  }

  getAdminSession() {
    try {
      const saved = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  }

  clearAdminSession() {
    localStorage.removeItem(LOCAL_ADMIN_KEY);
  }

  clearLocalSession() {
    localStorage.removeItem(LOCAL_COUPLE_KEY);
    localStorage.removeItem(LOCAL_ADMIN_KEY);
  }
}

export const dbService = new DatabaseService();
