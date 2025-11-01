import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

const AchievementNotification = ({ achievement, isVisible, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isVisible && achievement?.rarity === 'legendary') {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, achievement])

  const getRarityColors = (rarity) => {
    const colors = {
      common: 'from-gray-400 to-gray-600',
      uncommon: 'from-green-400 to-green-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-orange-500'
    }
    return colors[rarity] || colors.common
  }

  return (
    <AnimatePresence>
      {isVisible && achievement && (
        <>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={200}
              gravity={0.3}
            />
          )}
          
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -50 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20
              }
            }}
            exit={{ 
              scale: 0, 
              opacity: 0, 
              y: -50,
              transition: { duration: 0.2 }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Achievement Card */}
            <motion.div
              className={`
                relative bg-gradient-to-br ${getRarityColors(achievement.rarity)}
                p-8 rounded-2xl shadow-2xl text-white text-center
                max-w-sm w-full mx-4
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Sparkle Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255,255,255,0.3)',
                    '0 0 40px rgba(255,255,255,0.6)',
                    '0 0 20px rgba(255,255,255,0.3)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Achievement Icon */}
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                {achievement.icon}
              </motion.div>

              {/* Achievement Title */}
              <motion.h3
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Achievement Unlocked!
              </motion.h3>

              <motion.h4
                className="text-xl font-semibold mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {achievement.title}
              </motion.h4>

              <motion.p
                className="text-sm opacity-90 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {achievement.description}
              </motion.p>

              <motion.div
                className="flex items-center justify-center gap-2 text-yellow-200"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <span className="text-xl">⭐</span>
                <span className="font-bold">+{achievement.xp} XP</span>
              </motion.div>

              {/* Rarity Badge */}
              <motion.div
                className="absolute -top-3 -right-3 bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-bold capitalize shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                {achievement.rarity}
              </motion.div>

              {/* Close Button */}
              <motion.button
                className="absolute -top-2 -left-2 w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AchievementNotification