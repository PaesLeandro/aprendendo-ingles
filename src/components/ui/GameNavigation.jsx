import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import AnimatedButton from './AnimatedButton'

const GameNavigation = forwardRef(({ 
  className,
  currentLevel = 1,
  totalLevels = 10,
  userXP = 0,
  userLevel = 1,
  userName = 'Player',
  achievements = [],
  onMenuClick,
  onProfileClick,
  onSettingsClick,
  showProgress = true,
  animate = true,
  ...props 
}, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navVariants = animate ? {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: 'easeOut',
        delay: 0.1
      }
    }
  } : {}

  const menuVariants = animate ? {
    initial: { opacity: 0, scale: 0.95, y: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { 
        duration: 0.15,
        ease: 'easeIn'
      }
    }
  } : {}

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <motion.nav
      ref={ref}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-lg',
        className
      )}
      variants={navVariants}
      initial="initial"
      animate="animate"
      {...props}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">LE</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Little English Explorer</h1>
              {showProgress && (
                <p className="text-sm text-muted-foreground">
                  Level {currentLevel} of {totalLevels}
                </p>
              )}
            </div>
          </motion.div>

          {/* Center Progress (Desktop) */}
          {showProgress && (
            <motion.div 
              className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">
                    {Math.round((currentLevel / totalLevels) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentLevel / totalLevels) * 100}%` }}
                    transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* User Info and Menu */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {/* XP and Level (Desktop) */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{userName}</div>
                <div className="text-xs text-muted-foreground">
                  Level {userLevel} • {userXP} XP
                </div>
              </div>
              
              {/* Achievement Badge */}
              {achievements.length > 0 && (
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{achievements.length}</span>
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </div>

            {/* Menu Button */}
            <div className="relative">
              <AnimatedButton
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="relative"
                animate={animate}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.div>
              </AnimatedButton>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-64 bg-background border border-border rounded-xl shadow-lg overflow-hidden"
                    variants={menuVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {/* User Info (Mobile) */}
                    <div className="sm:hidden p-4 border-b border-border bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{userName[0]}</span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{userName}</div>
                          <div className="text-sm text-muted-foreground">
                            Level {userLevel} • {userXP} XP
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <motion.button
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                        onClick={() => { onProfileClick?.(); setIsMenuOpen(false) }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.1 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Profile</span>
                      </motion.button>

                      <motion.button
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                        onClick={() => { onSettingsClick?.(); setIsMenuOpen(false) }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.1 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Settings</span>
                      </motion.button>

                      <motion.button
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                        onClick={() => { onMenuClick?.(); setIsMenuOpen(false) }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.1 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>Menu</span>
                      </motion.button>
                    </div>

                    {/* Progress (Mobile) */}
                    {showProgress && (
                      <div className="sm:hidden p-4 border-t border-border bg-muted/50">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground font-medium">
                            Level {currentLevel}/{totalLevels}
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentLevel / totalLevels) * 100}%` }}
                            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sparkle Effects */}
      {animate && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full pointer-events-none"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: 'easeInOut'
              }}
            />
          ))}
        </>
      )}
    </motion.nav>
  )
})

GameNavigation.displayName = 'GameNavigation'

export default GameNavigation