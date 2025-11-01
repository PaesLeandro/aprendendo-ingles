import { useCallback } from 'react'
import useGameStore from '../store/gameStore'

// Achievement definitions
export const ACHIEVEMENTS = {
  firstWord: {
    id: 'firstWord',
    title: 'First Steps',
    description: 'Learn your first word',
    icon: '🌟',
    rarity: 'common',
    xp: 10
  },
  perfectScore: {
    id: 'perfectScore',
    title: 'Perfect!',
    description: 'Get a perfect score in any activity',
    icon: '🎯',
    rarity: 'rare',
    xp: 50
  },
  streakMaster: {
    id: 'streakMaster',
    title: 'Streak Master',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    rarity: 'epic',
    xp: 100
  },
  allColors: {
    id: 'allColors',
    title: 'Rainbow Master',
    description: 'Complete all color activities',
    icon: '🌈',
    rarity: 'rare',
    xp: 75
  },
  animalExpert: {
    id: 'animalExpert',
    title: 'Animal Expert',
    description: 'Master all animal words',
    icon: '🦁',
    rarity: 'rare',
    xp: 75
  },
  numberWizard: {
    id: 'numberWizard',
    title: 'Number Wizard',
    description: 'Count perfectly from 1 to 10',
    icon: '🧙‍♂️',
    rarity: 'epic',
    xp: 100
  },
  familyTree: {
    id: 'familyTree',
    title: 'Family Tree',
    description: 'Learn all family members',
    icon: '👨‍👩‍👧‍👦',
    rarity: 'rare',
    xp: 75
  },
  speakUp: {
    id: 'speakUp',
    title: 'Speak Up!',
    description: 'Use voice recognition 10 times',
    icon: '🎤',
    rarity: 'uncommon',
    xp: 30
  },
  quickLearner: {
    id: 'quickLearner',
    title: 'Quick Learner',
    description: 'Complete an activity in under 30 seconds',
    icon: '⚡',
    rarity: 'uncommon',
    xp: 40
  },
  completionist: {
    id: 'completionist',
    title: 'Completionist',
    description: 'Complete all available activities',
    icon: '👑',
    rarity: 'legendary',
    xp: 200
  }
}

// XP calculation based on performance
export const calculateXP = (category, score, timeBonus = 0, streakBonus = 0) => {
  const baseXP = {
    colors: 10,
    animals: 15,
    numbers: 20,
    family: 15,
    food: 12,
    weather: 12
  }

  const categoryXP = baseXP[category] || 10
  const scoreMultiplier = score / 6 // Assuming max score is 6
  const bonusXP = Math.floor((timeBonus + streakBonus) / 10)

  return Math.floor(categoryXP * scoreMultiplier) + bonusXP
}

// Hook for gamification system
export const useGamification = () => {
  const { 
    user, 
    stats, 
    addXP, 
    addAchievement, 
    updateStats,
    updateUser 
  } = useGameStore()

  // Check and award achievements
  const checkAchievements = useCallback(() => {
    const currentAchievements = stats.achievements.map(a => a.id)

    // First word achievement
    if (stats.totalWords >= 1 && !currentAchievements.includes('firstWord')) {
      addAchievement(ACHIEVEMENTS.firstWord)
      addXP(ACHIEVEMENTS.firstWord.xp)
    }

    // Perfect score achievement
    const hasPerfectScore = Object.values(stats.categories).some(cat => cat.score >= 6)
    if (hasPerfectScore && !currentAchievements.includes('perfectScore')) {
      addAchievement(ACHIEVEMENTS.perfectScore)
      addXP(ACHIEVEMENTS.perfectScore.xp)
    }

    // Category-specific achievements
    if (stats.categories.colors?.completed && !currentAchievements.includes('allColors')) {
      addAchievement(ACHIEVEMENTS.allColors)
      addXP(ACHIEVEMENTS.allColors.xp)
    }

    if (stats.categories.animals?.completed && !currentAchievements.includes('animalExpert')) {
      addAchievement(ACHIEVEMENTS.animalExpert)
      addXP(ACHIEVEMENTS.animalExpert.xp)
    }

    if (stats.categories.numbers?.completed && !currentAchievements.includes('numberWizard')) {
      addAchievement(ACHIEVEMENTS.numberWizard)
      addXP(ACHIEVEMENTS.numberWizard.xp)
    }

    if (stats.categories.family?.completed && !currentAchievements.includes('familyTree')) {
      addAchievement(ACHIEVEMENTS.familyTree)
      addXP(ACHIEVEMENTS.familyTree.xp)
    }

    // Completionist achievement
    const allCompleted = Object.values(stats.categories).every(cat => cat.completed)
    if (allCompleted && !currentAchievements.includes('completionist')) {
      addAchievement(ACHIEVEMENTS.completionist)
      addXP(ACHIEVEMENTS.completionist.xp)
    }

    // Streak achievements
    if (user.streak >= 7 && !currentAchievements.includes('streakMaster')) {
      addAchievement(ACHIEVEMENTS.streakMaster)
      addXP(ACHIEVEMENTS.streakMaster.xp)
    }
  }, [stats, user, addAchievement, addXP])

  // Complete activity with gamification rewards
  const completeActivity = useCallback((category, score, timeSpent = 0, _usedVoice = false) => {
    const isCorrect = score > 0
    const isPerfect = score >= 6
    
    // Calculate XP
    const timeBonus = Math.max(0, 60 - timeSpent) // Bonus for completing quickly
    const streakBonus = user.streak * 5 // Streak multiplier
    const earnedXP = calculateXP(category, score, timeBonus, streakBonus)

    // Update stats
    updateStats(category, score, isCorrect)
    addXP(earnedXP)

    // Update streak
    const today = new Date().toDateString()
    const lastActivity = user.lastActivity ? new Date(user.lastActivity).toDateString() : null
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()

    let newStreak = user.streak
    if (lastActivity === yesterday) {
      newStreak += 1
    } else if (lastActivity !== today) {
      newStreak = 1
    }

    updateUser({
      lastActivity: new Date().toISOString(),
      streak: newStreak
    })

    // Check for achievements
    setTimeout(checkAchievements, 100)

    // Return rewards info for UI feedback
    return {
      xp: earnedXP,
      streak: newStreak,
      perfect: isPerfect,
      timeBonus: timeBonus > 0,
      newLevel: Math.floor((user.xp + earnedXP) / 100) + 1 > user.level
    }
  }, [user, addXP, updateStats, updateUser, checkAchievements])

  // Get next level progress
  const getLevelProgress = useCallback(() => {
    const currentLevelXP = (user.level - 1) * 100
    const nextLevelXP = user.level * 100
    const progress = ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
    
    return {
      current: user.xp - currentLevelXP,
      needed: nextLevelXP - currentLevelXP,
      progress: Math.min(100, Math.max(0, progress))
    }
  }, [user.xp, user.level])

  // Get user rank based on total XP
  const getUserRank = useCallback(() => {
    const totalXP = user.xp
    
    if (totalXP < 100) return { title: 'Beginner', icon: '🌱', color: '#4ade80' }
    if (totalXP < 500) return { title: 'Explorer', icon: '🗺️', color: '#3b82f6' }
    if (totalXP < 1000) return { title: 'Scholar', icon: '📚', color: '#8b5cf6' }
    if (totalXP < 2000) return { title: 'Expert', icon: '🎓', color: '#f59e0b' }
    if (totalXP < 5000) return { title: 'Master', icon: '👑', color: '#ef4444' }
    
    return { title: 'Legend', icon: '⭐', color: '#fbbf24' }
  }, [user.xp])

  // Daily rewards system
  const getDailyReward = useCallback(() => {
    const today = new Date().toDateString()
    const lastReward = localStorage.getItem('lastDailyReward')
    
    if (lastReward !== today) {
      const baseReward = 20
      const streakBonus = user.streak * 5
      const totalReward = baseReward + streakBonus
      
      localStorage.setItem('lastDailyReward', today)
      addXP(totalReward)
      
      return {
        claimed: true,
        xp: totalReward,
        streak: user.streak
      }
    }
    
    return { claimed: false }
  }, [user.streak, addXP])

  return {
    completeActivity,
    checkAchievements,
    getLevelProgress,
    getUserRank,
    getDailyReward,
    achievements: ACHIEVEMENTS,
    userStats: stats,
    userProfile: user
  }
}