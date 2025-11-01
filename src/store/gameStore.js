import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useGameStore = create(
  persist(
    (set, get) => ({
      // User Profile
      user: {
        profile: {
          name: 'Ana',
          avatar: '👧',
          level: 1,
          xp: 0,
        },
        stats: {
          activitiesCompleted: 0,
          currentStreak: 0,
          totalWords: 0,
          correctAnswers: 0,
          totalGames: 0,
          timeSpent: 0,
        }
      },

      // Activities data
      activities: [
        {
          id: 'colors',
          title: 'Cores',
          description: 'Aprenda as cores em inglês',
          icon: '🎨',
          difficulty: 'easy',
          xpReward: 50,
          progress: 0,
          completed: false,
          locked: false,
          featured: true
        },
        {
          id: 'numbers',
          title: 'Números',
          description: 'Conte de 1 a 10 em inglês',
          icon: '🔢',
          difficulty: 'easy',
          xpReward: 40,
          progress: 0,
          completed: false,
          locked: false,
          featured: false
        },
        {
          id: 'animals',
          title: 'Animais',
          description: 'Conheça os animais em inglês',
          icon: '🐶',
          difficulty: 'medium',
          xpReward: 60,
          progress: 0,
          completed: false,
          locked: false,
          featured: false
        },
        {
          id: 'family',
          title: 'Família',
          description: 'Membros da família em inglês',
          icon: '👨‍👩‍👧‍👦',
          difficulty: 'medium',
          xpReward: 55,
          progress: 0,
          completed: false,
          locked: false,
          featured: false
        },
        {
          id: 'food',
          title: 'Comida',
          description: 'Alimentos e bebidas',
          icon: '🍎',
          difficulty: 'hard',
          xpReward: 70,
          progress: 0,
          completed: false,
          locked: true,
          featured: false
        },
        {
          id: 'weather',
          title: 'Tempo',
          description: 'Como está o tempo hoje?',
          icon: '☀️',
          difficulty: 'hard',
          xpReward: 65,
          progress: 0,
          completed: false,
          locked: true,
          featured: false
        }
      ],

      // Levels
      currentLevel: 1,
      totalLevels: 10,

      // Settings
      settings: {
        soundEnabled: true,
        voiceSpeed: 1,
        voiceLanguage: 'en-US',
        theme: 'light',
        difficulty: 'easy',
        notifications: true
      },

      // Current Game State
      currentGame: {
        category: null,
        score: 0,
        lives: 3,
        streak: 0,
        timeLeft: 0,
        isPlaying: false
      },

      // Initialize user function
      initializeUser: () => {
        const state = get()
        if (!state.user.profile.name) {
          set(state => ({
            user: {
              ...state.user,
              profile: {
                ...state.user.profile,
                name: 'Ana'
              }
            }
          }))
        }
        return Promise.resolve()
      },

      // Update progress function
      updateProgress: (activityId) => {
        const state = get()
        const activity = state.activities.find(a => a.id === activityId)
        if (!activity) return

        set(state => {
          const updatedActivities = state.activities.map(a => 
            a.id === activityId 
              ? { ...a, progress: 100, completed: true }
              : a
          )

          // Unlock next activities
          const completedCount = updatedActivities.filter(a => a.completed).length
          const unlockedActivities = updatedActivities.map(a => ({
            ...a,
            locked: a.difficulty === 'hard' && completedCount < 2
          }))

          return {
            activities: unlockedActivities,
            user: {
              ...state.user,
              profile: {
                ...state.user.profile,
                xp: state.user.profile.xp + activity.xpReward,
                level: Math.floor((state.user.profile.xp + activity.xpReward) / 100) + 1
              },
              stats: {
                ...state.user.stats,
                activitiesCompleted: state.user.stats.activitiesCompleted + 1,
                currentStreak: state.user.stats.currentStreak + 1
              }
            }
          }
        })
      },

      updateStats: (category, score, correct) =>
        set((state) => ({
          stats: {
            ...state.stats,
            totalWords: state.stats.totalWords + 1,
            correctAnswers: state.stats.correctAnswers + (correct ? 1 : 0),
            totalGames: state.stats.totalGames + 1,
            categories: {
              ...state.stats.categories,
              [category]: {
                ...state.stats.categories[category],
                score: Math.max(state.stats.categories[category].score, score),
                attempts: state.stats.categories[category].attempts + 1,
                completed: score >= 5
              }
            }
          }
        })),

      addAchievement: (achievement) =>
        set((state) => {
          if (state.stats.achievements.find(a => a.id === achievement.id)) {
            return state
          }
          return {
            stats: {
              ...state.stats,
              achievements: [...state.stats.achievements, achievement]
            }
          }
        }),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),

      startGame: (category) =>
        set(() => ({
          currentGame: {
            category,
            score: 0,
            lives: 3,
            streak: 0,
            timeLeft: 60,
            isPlaying: true
          }
        })),

      endGame: () =>
        set((state) => ({
          currentGame: {
            ...state.currentGame,
            isPlaying: false
          }
        })),

      updateGameScore: (points) =>
        set((state) => ({
          currentGame: {
            ...state.currentGame,
            score: state.currentGame.score + points,
            streak: state.currentGame.streak + 1
          }
        })),

      loseLife: () =>
        set((state) => ({
          currentGame: {
            ...state.currentGame,
            lives: Math.max(0, state.currentGame.lives - 1),
            streak: 0
          }
        })),

      resetGame: () =>
        set(() => ({
          currentGame: {
            category: null,
            score: 0,
            lives: 3,
            streak: 0,
            timeLeft: 0,
            isPlaying: false
          }
        })),

      resetAllProgress: () =>
        set(() => ({
          user: {
            name: 'Ana',
            avatar: '👧',
            level: 1,
            xp: 0,
            streak: 0,
            lastActivity: null
          },
          stats: {
            totalWords: 0,
            correctAnswers: 0,
            totalGames: 0,
            timeSpent: 0,
            achievements: [],
            categories: {
              colors: { completed: false, score: 0, attempts: 0 },
              animals: { completed: false, score: 0, attempts: 0 },
              numbers: { completed: false, score: 0, attempts: 0 },
              family: { completed: false, score: 0, attempts: 0 },
              food: { completed: false, score: 0, attempts: 0 },
              weather: { completed: false, score: 0, attempts: 0 }
            }
          }
        }))
    }),
    {
      name: 'little-english-explorer-storage',
      version: 1
    }
  )
)

export default useGameStore