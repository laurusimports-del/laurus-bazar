import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { dbService } from '../services/dbService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(() => dbService.getLocalSession());
  const [adminSession, setAdminSession] = useState(() => dbService.getAdminSession());
  const [activeRole, setActiveRole] = useState('husband'); // 'husband' | 'wife'
  const [settings, setSettings] = useState(() => {
    try {
      const s = localStorage.getItem('grace_fluency_settings_v1');
      if (s) return JSON.parse(s);
    } catch (e) {}
    return {
      geminiApiKey: '',
      speechRate: 0.85,
      themeMode: 'light'
    };
  });

  // Apply dark mode theme class
  useEffect(() => {
    if (settings.themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('grace_fluency_settings_v1', JSON.stringify(settings));
  }, [settings]);

  // Derived properties from active session
  const isAuthenticated = Boolean(session && session.couple && session.couple.id);
  const currentCouple = session?.couple || null;
  const isAdmin = Boolean(currentCouple?.is_admin || adminSession?.isAdmin);
  const isMasterAdminOnly = Boolean(!isAuthenticated && adminSession?.isAdmin);

  const currentRole = activeRole;
  const spouseRole = currentRole === 'husband' ? 'wife' : 'husband';

  // Get active profile progress (with guaranteed default zero values)
  const currentProfileData = session?.profiles?.[currentRole] || {
    streak: 0,
    points: 0,
    completed_devotionals: [],
    memorized_verses: [],
    flashcards: [],
    completed_quizzes: [],
    favorite_songs: [],
    study_history: [],
    weekly_goal: { targetDevotionals: 5, targetFlashcards: 25 }
  };

  const spouseProfileData = session?.profiles?.[spouseRole] || {
    streak: 0,
    points: 0,
    completed_devotionals: [],
    memorized_verses: [],
    flashcards: [],
    completed_quizzes: [],
    favorite_songs: [],
    study_history: [],
    weekly_goal: { targetDevotionals: 5, targetFlashcards: 25 }
  };

  const currentProfileName = currentRole === 'husband' 
    ? (currentCouple?.husband_name || 'Esposo') 
    : (currentCouple?.wife_name || 'Esposa');

  const currentProfileEmoji = currentRole === 'husband' 
    ? (currentCouple?.husband_emoji || '👨‍💻') 
    : (currentCouple?.wife_emoji || '👩‍💼');

  const spouseProfileName = currentRole === 'husband' 
    ? (currentCouple?.wife_name || 'Esposa') 
    : (currentCouple?.husband_name || 'Esposo');

  const spouseProfileEmoji = currentRole === 'husband' 
    ? (currentCouple?.wife_emoji || '👩‍💼') 
    : (currentCouple?.husband_emoji || '👨‍💻');

  const coupleGoal = currentCouple?.couple_goal || {
    title: 'Estudo em Casal: 7 Dias de Fé & Fluência',
    targetDays: 7,
    loveNote: '“Juntos somos mais fortes e mais sábios na Palavra.” ❤️'
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#6366F1', '#10B981', '#F43F5E']
      });
    } catch (e) {}
  };

  const registerCouple = async (formPayload) => {
    const res = await dbService.registerCouple(formPayload);
    if (res.success && res.data) {
      if (res.status === 'approved') {
        setSession(res.data);
        triggerCelebration();
      }
    }
    return res;
  };

  const loginCouple = async (email, password) => {
    const res = await dbService.loginCouple(email, password);
    if (res.success && res.data) {
      setSession(res.data);
      triggerCelebration();
    }
    return res;
  };

  const loginAdmin = async (emailOrUser, password) => {
    const res = await dbService.loginAdmin(emailOrUser, password);
    if (res.success && res.adminSession) {
      setAdminSession(res.adminSession);
      if (res.adminSession.coupleData) {
        setSession(res.adminSession.coupleData);
      }
      triggerCelebration();
    }
    return res;
  };

  const logout = () => {
    dbService.clearLocalSession();
    setSession(null);
    setAdminSession(null);
  };

  const switchProfile = (targetRole) => {
    setActiveRole(targetRole);
  };

  // Internal helper to update profile progress and sync to Supabase
  const updateProfileProgress = (updaterFn) => {
    setSession(prev => {
      if (!prev) return prev;
      const currentProgress = prev.profiles[currentRole];
      const updatedProgress = updaterFn(currentProgress);

      const updatedSession = {
        ...prev,
        profiles: {
          ...prev.profiles,
          [currentRole]: updatedProgress
        }
      };

      // Persist locally
      localStorage.setItem('grace_fluency_active_couple_v1', JSON.stringify(updatedSession));

      // Sync to Supabase in background
      if (prev.couple?.id) {
        dbService.saveProfileProgress(prev.couple.id, currentRole, updatedProgress);
      }

      return updatedSession;
    });
  };

  // Complete Devotional
  const completeDevotional = (devotionalId, verseRef = '') => {
    triggerCelebration();

    updateProfileProgress(profile => {
      const completedList = profile.completed_devotionals || [];
      const isAlreadyCompleted = completedList.includes(devotionalId);
      const updatedDevotionals = isAlreadyCompleted ? completedList : [...completedList, devotionalId];

      const verseList = profile.memorized_verses || [];
      const updatedVerses = (verseRef && !verseList.includes(verseRef))
        ? [...verseList, verseRef]
        : verseList;

      // Update study streak
      const today = new Date().toDateString();
      const lastStudy = profile.last_study_date ? new Date(profile.last_study_date).toDateString() : null;
      let newStreak = profile.streak || 0;

      if (today !== lastStudy) {
        newStreak += 1;
      }

      const pointsEarned = isAlreadyCompleted ? 15 : 50;

      // Record study history entry
      const todayStr = new Date().toISOString().split('T')[0];
      const history = [...(profile.study_history || [])];
      const existingIdx = history.findIndex(h => h.date === todayStr);

      if (existingIdx >= 0) {
        history[existingIdx] = {
          ...history[existingIdx],
          minutes: (history[existingIdx].minutes || 0) + 15,
          points: (history[existingIdx].points || 0) + pointsEarned
        };
      } else {
        history.push({
          date: todayStr,
          minutes: 15,
          points: pointsEarned,
          activities: ['devotional']
        });
      }

      return {
        ...profile,
        streak: newStreak,
        last_study_date: new Date().toISOString(),
        points: (profile.points || 0) + pointsEarned,
        completed_devotionals: updatedDevotionals,
        memorized_verses: updatedVerses,
        study_history: history
      };
    });
  };

  // Add Flashcard
  const addFlashcard = (cardData) => {
    updateProfileProgress(profile => {
      const cards = profile.flashcards || [];
      const exists = cards.some(c => c.word.toLowerCase() === cardData.word.toLowerCase());
      if (exists) return profile;

      const newCard = {
        id: `fc-${Date.now()}`,
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

      return {
        ...profile,
        points: (profile.points || 0) + 10,
        flashcards: [newCard, ...cards]
      };
    });
  };

  // Review Flashcard (SRS)
  const reviewFlashcard = (cardId, rating) => {
    updateProfileProgress(profile => {
      const cards = (profile.flashcards || []).map(card => {
        if (card.id !== cardId) return card;

        let newBox = card.box || 1;
        let daysToAdd = 1;

        if (rating === 'again') {
          newBox = 1;
          daysToAdd = 0;
        } else if (rating === 'hard') {
          newBox = Math.max(1, newBox);
          daysToAdd = 1;
        } else if (rating === 'good') {
          newBox = Math.min(5, newBox + 1);
          daysToAdd = newBox * 2;
        } else if (rating === 'easy') {
          newBox = Math.min(5, newBox + 2);
          daysToAdd = newBox * 4;
        }

        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + daysToAdd);

        return {
          ...card,
          box: newBox,
          lastReviewed: new Date().toISOString(),
          nextReviewDate: nextDate.toISOString()
        };
      });

      return {
        ...profile,
        points: (profile.points || 0) + 5,
        flashcards: cards
      };
    });
  };

  // Toggle Favorite Song
  const toggleFavoriteSong = (songId) => {
    updateProfileProgress(profile => {
      const favs = profile.favorite_songs || [];
      const isFav = favs.includes(songId);
      return {
        ...profile,
        favorite_songs: isFav ? favs.filter(id => id !== songId) : [...favs, songId]
      };
    });
  };

  // Update Settings
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Update Love Note
  const updateLoveNote = (newNote) => {
    if (!currentCouple?.id) return;
    const updatedGoal = {
      ...coupleGoal,
      loveNote: newNote
    };

    setSession(prev => {
      if (!prev) return prev;
      const updatedSession = {
        ...prev,
        couple: {
          ...prev.couple,
          couple_goal: updatedGoal
        }
      };
      localStorage.setItem('grace_fluency_active_couple_v1', JSON.stringify(updatedSession));
      dbService.saveCoupleData(prev.couple.id, { couple_goal: updatedGoal });
      return updatedSession;
    });
  };

  // Update Couple Names
  const updateCoupleNames = (husbandName, wifeName) => {
    if (!currentCouple?.id) return;
    setSession(prev => {
      if (!prev) return prev;
      const updatedCouple = {
        ...prev.couple,
        husband_name: husbandName.trim(),
        wife_name: wifeName.trim()
      };
      const updatedSession = {
        ...prev,
        couple: updatedCouple
      };
      localStorage.setItem('grace_fluency_active_couple_v1', JSON.stringify(updatedSession));
      dbService.saveCoupleData(prev.couple.id, {
        husband_name: husbandName.trim(),
        wife_name: wifeName.trim()
      });
      return updatedSession;
    });
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        currentCouple,
        isAdmin,
        isMasterAdminOnly,
        adminSession,
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
        addFlashcard,
        reviewFlashcard,
        toggleFavoriteSong,
        updateSettings,
        updateLoveNote,
        updateCoupleNames,
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
