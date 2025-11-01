import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useGameStore from '@/store/gameStore'
import { useAudio } from '@/hooks/useAudio'
import { useGamification } from '@/hooks/useGamification'
import GameNavigation from '@/components/ui/GameNavigation'
import AnimatedCard from '@/components/ui/AnimatedCard'
import AnimatedButton from '@/components/ui/AnimatedButton'
import AnimatedProgress from '@/components/ui/AnimatedProgress'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import AchievementNotification from '@/components/ui/AchievementNotification'
import ColorActivityNew from '@/components/ColorActivityNew'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [showAchievement, setShowAchievement] = useState(false)
  
  const { 
    user, 
    currentLevel, 
    totalLevels, 
    activities, 
    updateProgress,
    initializeUser 
  } = useGameStore()
  
  const { playSound } = useAudio()
  const { checkAchievements, achievements } = useGamification()

  // Initialize app
  useEffect(() => {
    const initApp = async () => {
      try {
        await initializeUser()
        // Simulate loading time for better UX
        setTimeout(() => setIsLoading(false), 1500)
      } catch (error) {
        console.error('Failed to initialize app:', error)
        setIsLoading(false)
      }
    }
    
    initApp()
  }, [initializeUser])

  // Handle activity selection
  const handleActivitySelect = async (activity) => {
    if (activity.locked) return
    
    setSelectedActivity(activity)
    await playSound('click')
  }

  // Handle activity completion
  const handleActivityComplete = () => {
    if (!selectedActivity) return
    
    const newAchievements = checkAchievements({
      activitiesCompleted: user.stats.activitiesCompleted + 1,
      currentStreak: user.stats.currentStreak + 1,
      totalXP: user.profile.xp + selectedActivity.xpReward
    })
    
    if (newAchievements.length > 0) {
      setShowAchievement(newAchievements[0])
    }
    
    setSelectedActivity(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <LoadingSpinner size="lg" color="purple" />
          <motion.p
            className="mt-4 text-lg text-purple-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Preparando sua aventura...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Navigation */}
      <GameNavigation
        currentLevel={currentLevel}
        totalLevels={totalLevels}
        userXP={user.profile.xp}
        userLevel={user.profile.level}
        userName={user.profile.name}
        achievements={achievements}
        onMenuClick={() => {/* Menu clicked */}}
        onProfileClick={() => {/* Profile clicked */}}
        onSettingsClick={() => {/* Settings clicked */}}
      />

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 pt-24 pb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.section 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Little English Explorer
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Embarque em uma aventura mágica para aprender inglês! 
            Explore mundos coloridos, complete desafios divertidos e colete conquistas incríveis.
          </motion.p>

          <motion.div
            className="mt-8 max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <AnimatedProgress
              value={user.profile.xp}
              max={user.profile.level * 100}
              variant="gaming"
              showLabel
              showPercentage
              label={`Nível ${user.profile.level} Progress`}
              glowEffect
              animate
            />
          </motion.div>
        </motion.section>

        {/* Activities Grid */}
        <motion.section
          className="mb-12"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Escolha sua Aventura
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                custom={index}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AnimatedCard
                  difficulty={activity.difficulty}
                  completed={activity.completed}
                  locked={activity.locked}
                  interactive
                  hoverEffect
                  glowEffect={activity.featured}
                  onClick={() => handleActivitySelect(activity)}
                  className="cursor-pointer h-full"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-3">{activity.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {activity.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-600 font-medium">
                          {activity.difficulty.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          +{activity.xpReward} XP
                        </span>
                      </div>
                      
                      {activity.featured && (
                        <motion.div
                          className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600 font-medium"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ⭐ NOVO
                        </motion.div>
                      )}
                    </div>

                    <AnimatedProgress
                      value={activity.progress}
                      max={100}
                      size="sm"
                      variant={
                        activity.difficulty === 'easy' ? 'success' :
                        activity.difficulty === 'medium' ? 'warning' : 'danger'
                      }
                      showPercentage
                      animate={false}
                    />

                    <div className="mt-4">
                      <AnimatedButton
                        variant={activity.completed ? 'success' : activity.locked ? 'ghost' : 'gaming'}
                        size="sm"
                        className="w-full"
                        disabled={activity.locked}
                        animate
                      >
                        {activity.completed ? '✓ Concluído' : 
                         activity.locked ? '🔒 Bloqueado' : 
                         'Começar Aventura'}
                      </AnimatedButton>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
          variants={itemVariants}
        >
          <h3 className="text-xl font-bold text-center mb-6 text-gray-800">
            Suas Conquistas
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {user.stats.activitiesCompleted}
              </div>
              <div className="text-sm text-gray-600">Atividades</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {user.stats.currentStreak}
              </div>
              <div className="text-sm text-gray-600">Sequência</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {user.profile.xp}
              </div>
              <div className="text-sm text-gray-600">XP Total</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">
                {achievements.length}
              </div>
              <div className="text-sm text-gray-600">Conquistas</div>
            </div>
          </div>
        </motion.section>
      </motion.div>

      {/* Activity Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedActivity.title}
              </h3>
              <AnimatedButton
                variant="ghost"
                size="sm"
                onClick={() => setSelectedActivity(null)}
              >
                ✕
              </AnimatedButton>
            </div>
            
            <div className="p-6">
              {selectedActivity.id === 'colors' && (
                <ColorActivityNew onComplete={handleActivityComplete} />
              )}
              {selectedActivity.id !== 'colors' && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">{selectedActivity.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {selectedActivity.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedActivity.description}
                  </p>
                  <p className="text-sm text-purple-600">
                    Esta atividade será implementada em breve!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Achievement Notification */}
      <AchievementNotification
        isVisible={showAchievement}
        achievement={showAchievement}
        onClose={() => setShowAchievement(false)}
      />

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </div>
  )
}

