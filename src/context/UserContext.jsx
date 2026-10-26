import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_FLASHCARDS } from '../data/initialFlashcardsData';

const UserContext = createContext();

const STORAGE_KEY = 'grace_fluency_couple_data_v2';

// Helper to generate initial past study history
const generateInitialHistory = (daysBack = 14) => {
  const history = [];
  const today = new Date();
  for (let i = daysBack; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    // Past days study simulation for streak
    if (i <= 3 || i === 5 || i === 7 || i === 8 || i === 11) {
      history.push({
        date: dateStr,
        minutes: 15 + (i % 3) * 5,
        activities: ['devotional', 'flashcards'],
        points: 40 + (i % 2) * 20
      });
    }
  }
  return history;
};

const DEFAULT_STATE = {
  isAuthenticated: true, // auto login to last active profile
  currentProfile: 'husband', // 'husband' | 'wife'
  accounts: {
    husband: {
      id: 'husband',
      name: 'Adam',
      emoji: '👨‍💻',
      email: 'adam@casal.com',
      pin: '', // optional 4-digit PIN
      level: 'Intermediário',
      role: 'Esposo'
    },
    wife: {
      id: 'wife',
      name: 'Minha Esposa',
      emoji: '👩‍💼',
      email: 'esposa@casal.com',
      pin: '',
      level: 'Iniciante / Básico',
      role: 'Esposa'
    }
  },
  settings: {
    geminiApiKey: '',
    speechRate: 0.85,
    themeMode: 'light',
  },
  coupleGoal: {
    title: 'Estudo em Casal: 7 Dias de Fé & Fluência',
    targetDays: 7,
    loveNote: '“Juntos somos mais fortes e mais sábios na Palavra.” ❤️'
  },
  profiles: {
    husband: {
      streak: 4,
      lastStudyDate: new Date().toISOString(),
      completedDevotionals: ['phil-4-6-7', 'jer-29-11'],
      memorizedVerses: ['Philippians 4:6-7', 'Jeremiah 29:11'],
      points: 185,
      flashcards: [...INITIAL_FLASHCARDS],
      completedQuizzes: ['phil-4-6-7', 'jer-29-11'],
      favoriteSongs: ['goodness-of-god'],
      studyHistory: generateInitialHistory(14),
      weeklyGoal: { targetDevotionals: 5, targetFlashcards: 25 }
    },
    wife: {
      streak: 4,
      lastStudyDate: new Date().toISOString(),
      completedDevotionals: ['phil-4-6-7'],
      memorizedVerses: ['Philippians 4:6-7'],
      points: 140,
      flashcards: [...INITIAL_FLASHCARDS],
      completedQuizzes: ['phil-4-6-7'],
      favoriteSongs: ['way-maker'],
      studyHistory: generateInitialHistory(14),
      weeklyGoal: { targetDevotionals: 5, targetFlashcards: 25 }
    }
  }
};

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STATE,
          ...parsed,
          accounts: {
            husband: { ...DEFAULT_STATE.accounts.husband, ...parsed?.accounts?.husband },
            wife: { ...DEFAULT_STATE.accounts.wife, ...parsed?.accounts?.wife }
          },
          settings: { ...DEFAULT_STATE.settings, ...parsed?.settings },
          coupleGoal: { ...DEFAULT_STATE.coupleGoal, ...parsed?.coupleGoal },
          profiles: {
            husband: { ...DEFAULT_STATE.profiles.husband, ...parsed?.profiles?.husband },
            wife: { ...DEFAULT_STATE.profiles.wife, ...parsed?.profiles?.wife }
          }
        };
      }
    } catch (e) {
      console.error('Failed to load user data from storage:', e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to storage:', e);
    }
  }, [data]);

  // Apply dark mode class to document if active
  useEffect(() => {
    if (data.settings.themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [data.settings.themeMode]);

  const currentProfileKey = data.currentProfile;
  const currentProfileData = data.profiles[currentProfileKey] || data.profiles.husband;
  const currentAccount = data.accounts[currentProfileKey] || data.accounts.husband;

  const spouseProfileKey = currentProfileKey === 'husband' ? 'wife' : 'husband';
  const spouseProfileData = data.profiles[spouseProfileKey] || data.profiles.wife;
  const spouseAccount = data.accounts[spouseProfileKey] || data.accounts.wife;

  const currentProfileName = currentAccount.name;
  const currentProfileEmoji = currentAccount.emoji;
  const spouseProfileName = spouseAccount.name;
  const spouseProfileEmoji = spouseAccount.emoji;

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

  const login = (profileKey, enteredPin = '') => {
    const targetAccount = data.accounts[profileKey];
    if (targetAccount?.pin && targetAccount.pin !== enteredPin) {
      return { success: false, message: 'PIN incorreto. Tente novamente.' };
    }

    setData(prev => ({
      ...prev,
      isAuthenticated: true,
      currentProfile: profileKey
    }));
    triggerCelebration();
    return { success: true };
  };

  const logout = () => {
    setData(prev => ({
      ...prev,
      isAuthenticated: false
    }));
  };

  const switchProfile = (targetProfile) => {
    setData(prev => ({
      ...prev,
      currentProfile: targetProfile
    }));
  };

  const updateAccount = (profileKey, newAccountData) => {
    setData(prev => ({
      ...prev,
      accounts: {
        ...prev.accounts,
        [profileKey]: {
          ...prev.accounts[profileKey],
          ...newAccountData
        }
      }
    }));
  };

  const recordStudyActivity = (activityType, points = 10, minutes = 5) => {
    const todayStr = new Date().toISOString().split('T')[0];

    setData(prev => {
      const profile = prev.profiles[prev.currentProfile];
      const history = [...(profile.studyHistory || [])];
      const existingEntryIndex = history.findIndex(h => h.date === todayStr);

      if (existingEntryIndex >= 0) {
        const entry = history[existingEntryIndex];
        const activities = entry.activities.includes(activityType) 
          ? entry.activities 
          : [...entry.activities, activityType];
        
        history[existingEntryIndex] = {
          ...entry,
          minutes: entry.minutes + minutes,
          activities,
          points: entry.points + points
        };
      } else {
        history.push({
          date: todayStr,
          minutes,
          activities: [activityType],
          points
        });
      }

      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [prev.currentProfile]: {
            ...profile,
            studyHistory: history
          }
        }
      };
    });
  };

  const completeDevotional = (devotionalId, verseRef = '') => {
    triggerCelebration();

    setData(prev => {
      const profile = prev.profiles[prev.currentProfile];
      const isAlreadyCompleted = profile.completedDevotionals.includes(devotionalId);
      
      const updatedDevotionals = isAlreadyCompleted 
        ? profile.completedDevotionals 
        : [...profile.completedDevotionals, devotionalId];

      const updatedVerses = verseRef && !profile.memorizedVerses.includes(verseRef)
        ? [...profile.memorizedVerses, verseRef]
        : profile.memorizedVerses;

      // Update study streak
      const today = new Date().toDateString();
      const lastStudy = new Date(profile.lastStudyDate).toDateString();
      let newStreak = profile.streak;

      if (today !== lastStudy) {
        newStreak += 1;
      }

      const pointsEarned = isAlreadyCompleted ? 15 : 50;

      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [prev.currentProfile]: {
            ...profile,
            streak: newStreak,
            lastStudyDate: new Date().toISOString(),
            points: profile.points + pointsEarned,
            completedDevotionals: updatedDevotionals,
            memorizedVerses: updatedVerses
          }
        }
      };
    });

    recordStudyActivity('devotional', 50, 15);
  };

  const addFlashcard = (cardData) => {
    setData(prev => {
      const profile = prev.profiles[prev.currentProfile];
      const exists = profile.flashcards.some(c => c.word.toLowerCase() === cardData.word.toLowerCase());
      if (exists) return prev; // Avoid duplicates

      const newCard = {
        id: `fc-custom-${Date.now()}`,
        word: cardData.word,
        ipa: cardData.ipa || '',
        category: cardData.category || 'Biblical Study',
        meaningPt: cardData.meaningPt,
        exampleEn: cardData.exampleEn || '',
        examplePt: cardData.examplePt || '',
        box: 1,
        lastReviewed: null,
        nextReviewDate: new Date().toISOString()
      };

      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [prev.currentProfile]: {
            ...profile,
            points: profile.points + 10,
            flashcards: [newCard, ...profile.flashcards]
          }
        }
      };
    });

    recordStudyActivity('flashcards', 10, 3);
  };

  const reviewFlashcard = (cardId, rating) => {
    setData(prev => {
      const profile = prev.profiles[prev.currentProfile];
      const updatedCards = profile.flashcards.map(card => {
        if (card.id !== cardId) return card;

        let newBox = card.box || 1;
        let daysToAdd = 1;

        if (rating === 'again') {
          newBox = 1;
          daysToAdd = 0; // Review soon
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
        ...prev,
        profiles: {
          ...prev.profiles,
          [prev.currentProfile]: {
            ...profile,
            points: profile.points + 5,
            flashcards: updatedCards
          }
        }
      };
    });

    recordStudyActivity('flashcards', 5, 2);
  };

  const toggleFavoriteSong = (songId) => {
    setData(prev => {
      const profile = prev.profiles[prev.currentProfile];
      const isFav = profile.favoriteSongs.includes(songId);
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [prev.currentProfile]: {
            ...profile,
            favoriteSongs: isFav 
              ? profile.favoriteSongs.filter(id => id !== songId)
              : [...profile.favoriteSongs, songId]
          }
        }
      };
    });
  };

  const updateSettings = (newSettings) => {
    setData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings
      }
    }));
  };

  const updateLoveNote = (note) => {
    setData(prev => ({
      ...prev,
      coupleGoal: {
        ...prev.coupleGoal,
        loveNote: note
      }
    }));
  };

  return (
    <UserContext.Provider
      value={{
        data,
        isAuthenticated: data.isAuthenticated,
        accounts: data.accounts,
        currentAccount,
        spouseAccount,
        currentProfileKey,
        currentProfileData,
        currentProfileName,
        currentProfileEmoji,
        spouseProfileKey,
        spouseProfileData,
        spouseProfileName,
        spouseProfileEmoji,
        settings: data.settings,
        coupleGoal: data.coupleGoal,
        login,
        logout,
        switchProfile,
        updateAccount,
        completeDevotional,
        addFlashcard,
        reviewFlashcard,
        toggleFavoriteSong,
        updateSettings,
        updateLoveNote,
        recordStudyActivity,
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
