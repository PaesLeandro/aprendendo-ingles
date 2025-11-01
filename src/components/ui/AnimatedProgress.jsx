import { forwardRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const AnimatedProgress = forwardRef(({ 
  className, 
  value = 0,
  max = 100,
  size = 'default',
  variant = 'default',
  showLabel = false,
  showPercentage = false,
  animate = true,
  glowEffect = false,
  striped = false,
  label,
  color,
  ...props 
}, ref) => {
  const [displayValue, setDisplayValue] = useState(0)

  const sizeClasses = {
    sm: 'h-2',
    default: 'h-3',
    lg: 'h-4',
    xl: 'h-6'
  }

  const variantClasses = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    gaming: 'bg-gradient-to-r from-purple-500 to-pink-500'
  }

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  // Animate value changes
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setDisplayValue(percentage)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayValue(percentage)
    }
  }, [percentage, animate])

  const progressClasses = cn(
    'relative w-full overflow-hidden rounded-full bg-secondary',
    sizeClasses[size],
    {
      'shadow-lg shadow-current/25': glowEffect,
    },
    className
  )

  const fillClasses = cn(
    'h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden',
    variantClasses[variant],
    {
      'bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer': striped,
    }
  )

  return (
    <div className="w-full space-y-2">
      {/* Label and Percentage */}
      {(showLabel || showPercentage) && (
        <div className="flex justify-between items-center text-sm">
          {showLabel && (
            <motion.span
              className="text-foreground font-medium"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>
          )}
          {showPercentage && (
            <motion.span
              className="text-muted-foreground"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {Math.round(displayValue)}%
            </motion.span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div
        ref={ref}
        className={progressClasses}
        {...props}
      >
        {/* Glow effect background */}
        {glowEffect && (
          <motion.div
            className="absolute inset-0 rounded-full opacity-30 blur-sm"
            style={{
              background: color || 'currentColor',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}

        {/* Progress Fill */}
        <motion.div
          className={fillClasses}
          style={{
            backgroundColor: color,
            backgroundImage: color ? undefined : undefined
          }}
          initial={{ width: 0 }}
          animate={{ width: `${displayValue}%` }}
          transition={{
            duration: animate ? 0.8 : 0,
            ease: 'easeOut',
            delay: animate ? 0.2 : 0
          }}
        >
          {/* Striped pattern */}
          {striped && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                backgroundSize: '20px 20px',
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.1) 5px, rgba(255,255,255,0.1) 10px)',
              }}
              animate={{
                x: ['-20px', '20px'],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          )}

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              width: '100px',
              transform: 'skewX(-20deg)',
            }}
            animate={{
              x: ['-100px', '300px'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          />
        </motion.div>

        {/* Progress indicators/milestones */}
        {[25, 50, 75].map((milestone) => (
          <motion.div
            key={milestone}
            className="absolute top-0 bottom-0 w-0.5 bg-white/20"
            style={{ left: `${milestone}%` }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: displayValue >= milestone ? 1 : 0.3 
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* XP/Level indicators for gaming variant */}
      {variant === 'gaming' && (
        <motion.div
          className="flex justify-between items-center text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <span className="text-purple-600 font-medium">
            {Math.round(value)} XP
          </span>
          <span className="text-pink-600 font-medium">
            {max} XP
          </span>
        </motion.div>
      )}
    </div>
  )
})

const CircularProgress = forwardRef(({ 
  className,
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showPercentage = true,
  animate = true,
  glowEffect = false,
  color,
  ...props
}, ref) => {
  const [displayValue, setDisplayValue] = useState(0)
  
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (displayValue / 100) * circumference

  const variantColors = {
    default: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#06b6d4',
    gaming: '#8b5cf6'
  }

  const strokeColor = color || variantColors[variant]

  // Animate value changes
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setDisplayValue(percentage)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayValue(percentage)
    }
  }, [percentage, animate])

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} {...props}>
      <svg
        ref={ref}
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted-foreground/20"
        />
        
        {/* Glow effect */}
        {glowEffect && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth + 2}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="opacity-30 blur-sm"
            strokeLinecap="round"
          />
        )}
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{
            duration: animate ? 1 : 0,
            ease: 'easeOut',
            delay: animate ? 0.2 : 0
          }}
        />
      </svg>

      {/* Center content */}
      {showPercentage && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <span className="text-lg font-bold" style={{ color: strokeColor }}>
            {Math.round(displayValue)}%
          </span>
        </motion.div>
      )}
    </div>
  )
})

AnimatedProgress.displayName = 'AnimatedProgress'
CircularProgress.displayName = 'CircularProgress'

export { AnimatedProgress, CircularProgress }
export default AnimatedProgress