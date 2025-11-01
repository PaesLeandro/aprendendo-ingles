import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const AnimatedCard = forwardRef(({ 
  className, 
  children,
  animate = true,
  hoverEffect = true,
  glowEffect = false,
  gradient = false,
  difficulty = 'easy',
  completed = false,
  locked = false,
  interactive = true,
  ...props 
}, ref) => {
  const baseClasses = cn(
    'rounded-xl bg-card text-card-foreground shadow-lg transition-all duration-200 relative overflow-hidden',
    {
      'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200': difficulty === 'easy',
      'bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200': difficulty === 'medium',
      'bg-gradient-to-br from-red-50 to-rose-100 border-red-200': difficulty === 'hard',
      'bg-gradient-to-r from-purple-500 to-pink-500': gradient,
      'opacity-60 cursor-not-allowed': locked,
      'ring-2 ring-green-400 ring-opacity-50': completed,
      'shadow-lg shadow-current/25': glowEffect,
      'cursor-pointer': interactive && !locked,
    },
    className
  )

  const motionVariants = animate ? {
    initial: { 
      scale: 1,
      rotateY: 0
    },
    hover: hoverEffect && interactive && !locked ? { 
      scale: 1.02,
      rotateY: 2,
      transition: { 
        duration: 0.3, 
        ease: 'easeOut' 
      }
    } : {},
    tap: interactive && !locked ? { 
      scale: 0.98,
      transition: { 
        duration: 0.1, 
        ease: 'easeInOut' 
      }
    } : {},
    completed: {
      borderColor: '#10b981',
      boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  } : {}

  return (
    <motion.div
      className={baseClasses}
      ref={ref}
      variants={motionVariants}
      initial="initial"
      whileHover={!locked ? "hover" : "initial"}
      whileTap={!locked ? "tap" : "initial"}
      animate={completed ? "completed" : "initial"}
      style={{ perspective: '1000px' }}
      {...props}
    >
      {/* Background glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-30 blur-sm -z-10"
          style={{
            background: 'linear-gradient(45deg, currentColor, transparent, currentColor)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      )}

      {/* Completion overlay */}
      {completed && (
        <motion.div
          className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <motion.svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>
      )}

      {/* Lock overlay */}
      {locked && (
        <motion.div
          className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-full p-3 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.1
            }}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Sparkle effects for completed cards */}
      {completed && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
})

const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))

const CardTitle = forwardRef(({ className, children, ...props }, ref) => (
  <motion.h3
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2, duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.h3>
))

const CardDescription = forwardRef(({ className, children, ...props }, ref) => (
  <motion.p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.p>
))

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))

const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))

AnimatedCard.displayName = 'AnimatedCard'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export {
  AnimatedCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}

export default AnimatedCard