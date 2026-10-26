import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';
import { INITIAL_FLASHCARDS } from '../data/initialFlashcardsData';

// Local storage backup keys
const LOCAL_COUPLE_KEY = 'grace_fluency_active_couple_v1';
const LOCAL_CONFIG_KEY = 'grace_fluency_system_config_v1';

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

  // 1. Obter configurações do sistema (Código Mestre de Convite)
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
      require_admin_approval: true
    };
  }

  // 2. Atualizar Código Mestre de Convite e Regras (Admin Only)
  async updateSystemConfig({ masterInviteCode, requireAdminApproval }) {
    const newConfig = {
      id: 'main',
      master_invite_code: masterInviteCode.trim().toUpperCase(),
      require_admin_approval: Boolean(requireAdminApproval),
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

  // 3. Cadastrar Novo Casal (Com validação de código de convite & progresso ZERADO)
  async registerCouple({
    husbandName,
    husbandEmoji = '👨‍💻',
    husbandLevel = 'Iniciante',
    wifeName,
    wifeEmoji = '👩‍💼',
    wifeLevel = 'Iniciante',
    couplePin,
    inviteCode = ''
  }) {
    const config = await this.getSystemConfig();

    // Verificar se já existe algum casal no banco para definir se é o primeiro (Admin Master)
    let isFirstCouple = false;
    if (this.isOnline && supabase) {
      try {
        const { count, error } = await supabase
          .from('couples')
          .select('id', { count: 'exact', head: true });
        if (!error && count === 0) {
          isFirstCouple = true;
        }
      } catch (e) {
        isFirstCouple = true;
      }
    } else {
      // Offline fallback: primeiro cadastro vira admin
      const localCouples = JSON.parse(localStorage.getItem('grace_fluency_all_couples') || '[]');
      if (localCouples.length === 0) isFirstCouple = true;
    }

    // Se NÃO for o primeiro casal, validar código de convite obrigatório
    if (!isFirstCouple) {
      const expectedCode = (config.master_invite_code || 'GRACE2026').trim().toUpperCase();
      const providedCode = (inviteCode || '').trim().toUpperCase();

      if (providedCode !== expectedCode) {
        return {
          success: false,
          message: 'Código de Convite inválido! Solicite o código de acesso exclusivo ao administrador da plataforma.'
        };
      }
    }

    // Primeiro casal é aprovado e admin automático; outros casais dependem da aprovação
    const isAdmin = isFirstCouple;
    const initialStatus = isFirstCouple ? 'approved' : (config.require_admin_approval ? 'pending' : 'approved');

    const coupleId = `couple_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const coupleRecord = {
      id: coupleId,
      husband_name: husbandName.trim(),
      husband_emoji: husbandEmoji.trim() || '👨‍💻',
      husband_level: husbandLevel,
      wife_name: wifeName.trim(),
      wife_emoji: wifeEmoji.trim() || '👩‍💼',
      wife_level: wifeLevel,
      couple_pin: couplePin.trim(),
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

    localStorage.setItem(LOCAL_COUPLE_KEY, JSON.stringify(fullSession));

    return {
      success: true,
      data: fullSession,
      status: initialStatus,
      isAdmin,
      message: initialStatus === 'pending'
        ? 'Cadastro realizado! Seu acesso foi enviado para aprovação do administrador.'
        : 'Cadastro realizado com sucesso! Bem-vindos à plataforma!'
    };
  }

  // 4. Login do Casal por PIN ou Nome
  async loginCouple(enteredPin) {
    const cleanPin = (enteredPin || '').trim();
    if (!cleanPin) return { success: false, message: 'Digite a senha do casal.' };

    // Tentar Supabase primeiro
    if (this.isOnline && supabase) {
      try {
        const { data: couple, error } = await supabase
          .from('couples')
          .select('*')
          .eq('couple_pin', cleanPin)
          .single();

        if (!error && couple) {
          // Verificar status de aprovação
          if (couple.status === 'blocked') {
            return { success: false, message: 'Esta conta foi desativada pelo administrador.' };
          }
          if (couple.status === 'pending' && !couple.is_admin) {
            return { 
              success: false, 
              isPending: true,
              message: 'Seu acesso ainda está aguardando liberação do administrador.' 
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
      const saved = localStorage.getItem(LOCAL_COUPLE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.couple?.couple_pin === cleanPin) {
          if (parsed.couple?.status === 'blocked') {
            return { success: false, message: 'Esta conta foi desativada.' };
          }
          return { success: true, data: parsed };
        }
      }
    } catch (e) {}

    return { success: false, message: 'Senha do casal não encontrada. Verifique ou crie uma conta.' };
  }

  // 5. Salvar Progresso de um Perfil (Sincronizado)
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

  // 6. Salvar Metas / Recadinho do Casal / Nomes
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

  // 7. Listar todos os casais cadastrados (Painel Admin)
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
      const active = localStorage.getItem(LOCAL_COUPLE_KEY);
      if (active) {
        const parsed = JSON.parse(active);
        return [parsed.couple];
      }
    } catch (e) {}

    return [];
  }

  // 8. Aprovar ou Bloquear um Casal (Admin)
  async updateCoupleStatus(coupleId, newStatus) {
    if (this.isOnline && supabase) {
      try {
        const { error } = await supabase
          .from('couples')
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq('id', coupleId);

        if (!error) return { success: true };
      } catch (e) {
        console.error('Erro ao atualizar status do casal:', e);
      }
    }

    return { success: true };
  }

  // Obter sessão salva no navegador
  getLocalSession() {
    try {
      const saved = localStorage.getItem(LOCAL_COUPLE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  }

  clearLocalSession() {
    localStorage.removeItem(LOCAL_COUPLE_KEY);
  }
}

export const dbService = new DatabaseService();
