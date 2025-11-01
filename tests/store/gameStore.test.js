import { renderHook, act } from '@testing-library/react'
import { useGameStore } from '../src/store/gameStore'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

describe('GameStore', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  test('should initialize with default user data', () => {
    const { result } = renderHook(() => useGameStore())
    
    expect(result.current.user).toEqual({
      profile: {
        id: 'guest',
        name: 'Little Explorer',
        avatar: '🧒',
        level: 1,
        xp: 0,
        createdAt: expect.any(String),
        lastActive: expect.any(String)
      },
      stats: {
        activitiesCompleted: 0,
        totalPlayTime: 0,
        currentStreak: 0,
        longestStreak: 0,
        perfectScores: 0,
        wordsLearned: 0,
        achievementsUnlocked: 0
      },
      settings: {
        soundEnabled: true,
        musicEnabled: true,
        difficulty: 'normal',
        language: 'pt-BR',
        notifications: true,
        parentalControls: false
      },
      progress: {
        completedActivities: [],
        unlockedActivities: ['colors', 'animals'],
        currentActivity: null,
        achievements: []
      }
    })
  })

  test('should calculate current level correctly', () => {
    const { result } = renderHook(() => useGameStore())
    
    // Level 1: 0-99 XP
    expect(result.current.currentLevel).toBe(1)
    
    act(() => {
      result.current.updateProfile({ xp: 150 })
    })
    
    // Level 2: 100-199 XP
    expect(result.current.currentLevel).toBe(2)
  })

  test('should update progress correctly', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.updateProgress('colors')
    })
    
    expect(result.current.user.progress.completedActivities).toContain('colors')
    expect(result.current.user.stats.activitiesCompleted).toBe(1)
    expect(result.current.user.profile.xp).toBeGreaterThan(0)
  })

  test('should unlock new activities when progress is made', () => {
    const { result } = renderHook(() => useGameStore())
    
    // Complete first activity
    act(() => {
      result.current.updateProgress('colors')
    })
    
    // Check if new activities are unlocked
    expect(result.current.activities.some(activity => 
      activity.id === 'numbers' && !activity.locked
    )).toBe(true)
  })

  test('should persist data to localStorage', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.updateProfile({ name: 'Test User' })
    })
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'little-english-explorer-game-data',
      expect.stringContaining('Test User')
    )
  })

  test('should load data from localStorage', () => {
    const savedData = {
      profile: {
        id: 'saved-user',
        name: 'Saved User',
        level: 3,
        xp: 250
      }
    }
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedData))
    
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.initializeUser()
    })
    
    expect(result.current.user.profile.name).toBe('Saved User')
    expect(result.current.user.profile.level).toBe(3)
  })

  test('should handle achievements correctly', () => {
    const { result } = renderHook(() => useGameStore())
    
    const achievement = {
      id: 'first-activity',
      title: 'First Steps',
      description: 'Complete your first activity',
      icon: '🎯',
      rarity: 'common',
      xpReward: 50
    }
    
    act(() => {
      result.current.unlockAchievement(achievement)
    })
    
    expect(result.current.user.progress.achievements).toContainEqual(
      expect.objectContaining({
        id: 'first-activity',
        unlockedAt: expect.any(String)
      })
    )
    expect(result.current.user.stats.achievementsUnlocked).toBe(1)
  })

  test('should calculate XP requirements correctly', () => {
    const { result } = renderHook(() => useGameStore())
    
    expect(result.current.getXPForLevel(1)).toBe(100)
    expect(result.current.getXPForLevel(2)).toBe(200)
    expect(result.current.getXPForLevel(5)).toBe(500)
  })

  test('should reset progress correctly', () => {
    const { result } = renderHook(() => useGameStore())
    
    // Make some progress first
    act(() => {
      result.current.updateProgress('colors')
      result.current.updateProfile({ name: 'Test User' })
    })
    
    // Reset progress
    act(() => {
      result.current.resetProgress()
    })
    
    expect(result.current.user.stats.activitiesCompleted).toBe(0)
    expect(result.current.user.progress.completedActivities).toEqual([])
    expect(result.current.user.profile.xp).toBe(0)
    expect(result.current.user.profile.level).toBe(1)
  })
})