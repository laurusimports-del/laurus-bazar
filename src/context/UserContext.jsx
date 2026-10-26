import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { dbService } from '../services/dbService';
import { supabase } from '../utils/supabaseClient';

const UserContext = createContext();

const SETTINGS_KEY = 'grace_fluency_settings_v1';
const DEFAULT_SETTINGS = { geminiApiKey: '', speechRate: 0.85, themeMode: 'light' };

const EMPTY_PROFILE = {
  streak: 0,
  points: 0,
  last_study_date: null,
  completed_devotionals: [],
  memorized_verses: [],
  flashcards: [],
  completed_quizzes: [],
  favorite_songs: [],
  study_history: [],
  weekly_goal: { targetDevotionals: 5, targetFlashcards: 25 }
};

const DEFAULT_GOAL = {
  title: 'Estudo em Casal: 7 Dias de Fé & Fluência',
  targetDays: 7,
  loveNote: '“Juntos somos mais fortes e mais sábios na Palavra.” ❤️'
};

const localDateKey = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

// Registra um dia de estudo: atualiza ofensiva (zera se pulou dias), histórico e pontos.
const recordStudy = (profile, { points = 0, minutes = 0, activity }) => {
  const now = new Date();
  const todayKey = localDateKey(now);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const yesterdayKey = localDateKey(yesterday);
  const lastKey = profile.last_study_date ? localDateKey(new Date(profile.last_study_date)) : null;

  let streak = profile.streak || 0;
  if (lastKey === todayKey) {
    streak = Math.max(streak, 1);
  } else if (lastKey === yesterdayKey) {
    streak += 1;
  } else {
    streak = 1;
  }

  const history = [...(profile.study_history || [])];
  const idx = history.findIndex(h => h.date === todayKey);
  if (idx >= 0) {
    const entry = history[idx];
    const activities = entry.activities || [];
    history[idx] = {
      ...entry,
      minutes: (entry.minutes || 0) + minutes,
      points: (entry.points || 0) + points,
      activities: activities.includes(activity) ? activities : [...activities, activity]
    };
  } else {
    history.push({ date: todayKey, minutes, points, activities: [activity] });
  }

  // Mantém só ~1 ano de histórico para o banco nunca crescer sem limite
  const trimmedHistory = history.slice(-370);

  return {
    ...profile,
    streak,
    last_study_date: now.toISOString(),
    points: (profile.points || 0) + points,
    study_history: trimmedHistory
  };
};

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(() => dbService.getCachedSession());
  const [authChecking, setAuthChecking] = useState(true);
  const [authNotice, setAuthNotice] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  const [activeRole, setActiveRole] = useState('husband');
  const [syncStatus, setSyncStatus] = useState('idle'); // idle | saving | saved | error
  const [syncError, setSyncError] = useState('');
  const [settings, setSettings] = useState(() => {
    try {
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) return { ...DEFAULT_SETTINGS, ...JSON.parse(s) };
    } catch (e) {}
    return DEFAULT_SETTINGS;
  });

  const sessionRef = useRef(session);
  const inFlight = useRef(0);

  const applySession = useCallback((next) => {
    sessionRef.current = next;
    setSession(next);
    if (next) {
      dbService.cacheSession(next);
      if (next.couple?.preferences && Object.keys(next.couple.preferences).length > 0) {
        setSettings(prev => ({ ...prev, ...next.couple.preferences }));
      }
    }
  }, []);

  const clearSession = useCallback(() => {
    sessionRef.current = null;
    setSession(null);
    setAdminMode(false);
    dbService.clearCache();
  }, []);

  // Revalida a sessão no Supabase ao abrir o app
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const hasAuth = await dbService.hasAuthSession();
        if (!hasAuth) {
          if (!cancelled) clearSession();
          return;
        }
        const res = await dbService.loadCurrentSession();
        if (cancelled) return;
        if (res.success) {
          applySession(res.data);
        } else {
          clearSession();
          setAuthNotice(res.message);
        }
      } finally {
        if (!cancelled) setAuthChecking(false);
      }
    })();

    const sub = supabase?.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') clearSession();
    });

    return () => {
      cancelled = true;
      sub?.data?.subscription?.unsubscribe();
    };
  }, [applySession, clearSession]);

  // Ao voltar para o app (ex: outro celular salvou algo), busca os dados mais recentes
  useEffect(() => {
    const onVisible = async () => {
      if (document.visibilityState !== 'visible') return;
      if (!sessionRef.current || dbService.hasPendingSaves()) return;
      const res = await dbService.loadCurrentSession();
      if (res.success && !dbService.hasPendingSaves()) {
        applySession(res.data);
      } else if (!res.success) {
        clearSession();
        setAuthNotice(res.message);
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [applySession, clearSession]);

  // Tema + preferências locais
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.themeMode === 'dark');
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const trackSave = useCallback(async (savePromise) => {
    inFlight.current += 1;
    setSyncStatus('saving');
    const res = await savePromise;
    inFlight.current -= 1;
    if (!res?.success) {
      setSyncStatus('error');
      setSyncError(res?.message || 'Falha ao salvar.');
    } else if (inFlight.current === 0) {
      setSyncStatus('saved');
      setSyncError('');
    }
    return res;
  }, []);

  // Derivados
  const isAuthenticated = Boolean(session?.couple?.id);
  const currentCouple = session?.couple || null;
  const isAdmin = Boolean(currentCouple?.is_admin);

  const currentRole = activeRole;
  const spouseRole = currentRole === 'husband' ? 'wife' : 'husband';

  const currentProfileData = session?.profiles?.[currentRole] || EMPTY_PROFILE;
  const spouseProfileData = session?.profiles?.[spouseRole] || EMPTY_PROFILE;

  const nameOf = (role) => (role === 'husband' ? currentCouple?.husband_name || 'Esposo' : currentCouple?.wife_name || 'Esposa');
  const emojiOf = (role) => (role === 'husband' ? currentCouple?.husband_emoji || '👨‍💻' : currentCouple?.wife_emoji || '👩‍💼');

  const currentProfileName = nameOf(currentRole);
  const currentProfileEmoji = emojiOf(currentRole);
  const spouseProfileName = nameOf(spouseRole);
  const spouseProfileEmoji = emojiOf(spouseRole);

  const coupleGoal = currentCouple?.couple_goal || DEFAULT_GOAL;

  const triggerCelebration = () => {
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#D4AF37', '#6366F1', '#10B981', '#F43F5E'] });
    } catch (e) {}
  };

  // ---------------------------------------------------------------------------
  // AUTENTICAÇÃO
  // ---------------------------------------------------------------------------

  const registerCouple = async (formPayload) => {
    const res = await dbService.registerCouple(formPayload);
    if (res.success && res.data) {
      applySession(res.data);
      triggerCelebration();
    }
    return res;
  };

  const loginCouple = async (email, password) => {
    setAuthNotice('');
    const res = await dbService.loginCouple(email, password);
    if (res.success && res.data) {
      setAdminMode(false);
      applySession(res.data);
      triggerCelebration();
    }
    return res;
  };

  const loginAdmin = async (email, password) => {
    setAuthNotice('');
    const res = await dbService.loginCouple(email, password);
    if (!res.success) return res;
    if (!res.data?.couple?.is_admin) {
      await dbService.logout();
      return { success: false, message: 'Esta conta não tem permissão de administrador.' };
    }
    applySession(res.data);
    setAdminMode(true);
    return res;
  };

  const logout = async () => {
    await dbService.logout();
    clearSession();
  };

  const switchProfile = (targetRole) => setActiveRole(targetRole);

  // ---------------------------------------------------------------------------
  // PROGRESSO (cada ação grava no Supabase)
  // ---------------------------------------------------------------------------

  const updateProfileProgress = (updaterFn, targetRole = null) => {
    const prev = sessionRef.current;
    if (!prev?.couple?.id) return;
    const role = targetRole || currentRole;
    const before = prev.profiles?.[role] || EMPTY_PROFILE;
    const after = updaterFn(before);
    if (after === before) return;

    applySession({ ...prev, profiles: { ...prev.profiles, [role]: after } });
    trackSave(dbService.saveProfileProgress(prev.couple.id, role, after));
  };

  const resetProfileProgress = (targetRole = null) => {
    const role = targetRole || currentRole;
    updateProfileProgress(profile => {
      const cleanCards = (profile.flashcards || []).map(c => ({
        ...c,
        box: 1,
        lastReviewed: null,
        nextReviewDate: new Date().toISOString()
      }));
      return {
        ...profile,
        streak: 0,
        points: 0,
        last_study_date: null,
        completed_devotionals: [],
        completedDevotionals: [],
        memorized_verses: [],
        completed_quizzes: [],
        completedQuizzes: [],
        favorite_songs: [],
        study_history: [],
        flashcards: cleanCards
      };
    }, role);
  };

  const updateCouple = (changes) => {
    const prev = sessionRef.current;
    if (!prev?.couple?.id) return;
    applySession({ ...prev, couple: { ...prev.couple, ...changes } });
    trackSave(dbService.saveCoupleData(prev.couple.id, changes));
  };

  const completeDevotional = (devotionalId, verseRef = '') => {
    let wasFirstTime = false;
    updateProfileProgress(profile => {
      const completed = profile.completed_devotionals || profile.completedDevotionals || [];
      const already = completed.includes(devotionalId);
      if (already) {
        // Já lido anteriormente: não duplica pontos
        return profile;
      }
      wasFirstTime = true;
      const verses = profile.memorized_verses || profile.memorizedVerses || [];
      const updated = recordStudy(profile, { points: 50, minutes: 15, activity: 'devotional' });
      return {
        ...updated,
        completed_devotionals: [...completed, devotionalId],
        completedDevotionals: [...completed, devotionalId],
        memorized_verses: verseRef && !verses.includes(verseRef) ? [...verses, verseRef] : verses
      };
    });
    if (wasFirstTime) {
      triggerCelebration();
    }
  };

  const completeQuiz = (devotionalId, correctCount, total) => {
    let wasFirstTime = false;
    updateProfileProgress(profile => {
      const quizzes = profile.completed_quizzes || profile.completedQuizzes || [];
      const already = quizzes.some(q => (typeof q === 'string' ? q : q.id) === devotionalId);
      const entry = { id: devotionalId, correct: correctCount, total, date: new Date().toISOString() };
      if (already) {
        return {
          ...profile,
          completed_quizzes: quizzes.map(q => ((typeof q === 'string' ? q : q.id) === devotionalId ? entry : q)),
          completedQuizzes: quizzes.map(q => ((typeof q === 'string' ? q : q.id) === devotionalId ? entry : q))
        };
      }
      wasFirstTime = true;
      const updated = recordStudy(profile, { points: 25, minutes: 5, activity: 'quiz' });
      return {
        ...updated,
        completed_quizzes: [...quizzes, entry],
        completedQuizzes: [...quizzes, entry]
      };
    });
    if (wasFirstTime) {
      triggerCelebration();
    }
  };

  const addFlashcard = (cardData) => {
    updateProfileProgress(profile => {
      const cards = profile.flashcards || [];
      if (cards.some(c => c.word.toLowerCase() === cardData.word.toLowerCase())) return profile;
      if (cards.length >= 2000) return profile; // trava anti-abuso

      const newCard = {
        id: `fc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        word: cardData.word,
        ipa: cardData.ipa || '',
        category: cardData.category || 'Bible Study',
        meaningPt: cardData.meaningPt,
        exampleEn: cardData.exampleEn || '',
        examplePt: cardData.examplePt || '',
        box: 1,
        lastReviewed: null,
        nextReviewDate: new Date().toISOString()
      };

      return { ...profile, points: (profile.points || 0) + 10, flashcards: [newCard, ...cards] };
    });
  };

  const reviewFlashcard = (cardId, rating) => {
    updateProfileProgress(profile => {
      const cards = (profile.flashcards || []).map(card => {
        if (card.id !== cardId) return card;
        let box = card.box || 1;
        let days = 1;
        if (rating === 'again') { box = 1; days = 0; }
        else if (rating === 'hard') { days = 1; }
        else if (rating === 'good') { box = Math.min(5, box + 1); days = box * 2; }
        else if (rating === 'easy') { box = Math.min(5, box + 2); days = box * 4; }

        const next = new Date();
        next.setDate(next.getDate() + days);
        return { ...card, box, lastReviewed: new Date().toISOString(), nextReviewDate: next.toISOString() };
      });

      const updated = recordStudy(profile, { points: 5, minutes: 1, activity: 'flashcards' });
      return { ...updated, flashcards: cards };
    });
  };

  const toggleFavoriteSong = (songId) => {
    updateProfileProgress(profile => {
      const favs = profile.favorite_songs || [];
      return {
        ...profile,
        favorite_songs: favs.includes(songId) ? favs.filter(id => id !== songId) : [...favs, songId]
      };
    });
  };

  const updateLoveNote = (newNote) => {
    updateCouple({ couple_goal: { ...coupleGoal, loveNote: (newNote || '').slice(0, 500) } });
  };

  const updateCoupleNames = (husbandName, wifeName) => {
    updateCouple({ husband_name: husbandName.trim().slice(0, 60), wife_name: wifeName.trim().slice(0, 60) });
  };

  // Preferências: salvas no aparelho e também na conta do casal
  const updateSettings = (newSettings) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);

    const prevSession = sessionRef.current;
    if (prevSession?.couple?.id) {
      const preferences = {
        themeMode: merged.themeMode,
        speechRate: merged.speechRate,
        geminiApiKey: merged.geminiApiKey
      };
      sessionRef.current = { ...prevSession, couple: { ...prevSession.couple, preferences } };
      setSession(sessionRef.current);
      dbService.cacheSession(sessionRef.current);
      trackSave(dbService.saveCoupleData(prevSession.couple.id, { preferences }));
    }
  };

  return (
    <UserContext.Provider
      value={{
        authChecking,
        authNotice,
        isAuthenticated,
        currentCouple,
        isAdmin,
        adminMode,
        setAdminMode,
        syncStatus,
        syncError,
        currentRole,
        spouseRole,
        currentProfileData,
        spouseProfileData,
        currentProfileName,
        currentProfileEmoji,
        spouseProfileName,
        spouseProfileEmoji,
        coupleGoal,
        settings,
        registerCouple,
        loginCouple,
        loginAdmin,
        logout,
        switchProfile,
        completeDevotional,
        completeQuiz,
        addFlashcard,
        reviewFlashcard,
        toggleFavoriteSong,
        updateSettings,
        updateLoveNote,
        updateCoupleNames,
        resetProfileProgress,
        triggerCelebration
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
