import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_FLASHCARDS } from '../data/initialFlashcardsData';

const UserContext = createContext();

const STORAGE_KEY = 'grace_fluency_couple_data_v1';

const DEFAULT_STATE = {
  currentProfile: 'husband', // 'husband' | 'wife'
  settings: {
    husbandName: 'Adam',
    husbandEmoji: '👨‍💻',
    wifeName: 'Minha Esposa',
    wifeEmoji: '👩‍💼',
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
      streak: 3,
      lastStudyDate: new Date().toISOString(),
      completedDevotionals: ['phil-4-6-7'],
      memorizedVerses: ['Philippians 4:6-7'],
      points: 120,
      flashcards: [...INITIAL_FLASHCARDS],
      completedQuizzes: ['phil-4-6-7'],
      favoriteSongs: ['goodness-of-god']
    },
    wife: {
      streak: 3,
      lastStudyDate: new Date().toISOString(),
      completedDevotionals: ['phil-4-6-7'],
      memorizedVerses: ['Philippians 4:6-7'],
      points: 110,
      flashcards: [...INITIAL_FLASHCARDS],
      completedQuizzes: ['phil-4-6-7'],
      favoriteSongs: ['way-maker']
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
          settings: { ...DEFAULT_STATE.settings, ...parsed.settings },
          coupleGoal: { ...DEFAULT_STATE.coupleGoal, ...parsed.coupleGoal },
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
  const currentProfileData = data.profiles[currentProfileKey];
  const spouseProfileKey = currentProfileKey === 'husband' ? 'wife' : 'husband';
  const spouseProfileData = data.profiles[spouseProfileKey];

  const currentProfileName = currentProfileKey === 'husband' 
    ? data.settings.husbandName 
    : data.settings.wifeName;

  const currentProfileEmoji = currentProfileKey === 'husband' 
    ? data.settings.husbandEmoji 
    : data.settings.wifeEmoji;

  const spouseProfileName = currentProfileKey === 'husband' 
    ? data.settings.wifeName 
    : data.settings.husbandName;

  const spouseProfileEmoji = currentProfileKey === 'husband' 
    ? data.settings.wifeEmoji 
    : data.settings.husbandEmoji;

  const switchProfile = (targetProfile) => {
    setData(prev => ({
      ...prev,
      currentProfile: targetProfile
    }));
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

      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [prev.currentProfile]: {
            ...profile,
            streak: newStreak,
            lastStudyDate: new Date().toISOString(),
            points: profile.points + (isAlreadyCompleted ? 15 : 50),
            completedDevotionals: updatedDevotionals,
            memorizedVerses: updatedVerses
          }
        }
      };
    });
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
        switchProfile,
        completeDevotional,
        addFlashcard,
        reviewFlashcard,
        toggleFavoriteSong,
        updateSettings,
        updateLoveNote,
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
