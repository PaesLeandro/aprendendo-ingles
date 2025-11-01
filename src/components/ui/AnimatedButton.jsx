import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { buttonVariants, sizeVariants } from './button-variants'

const AnimatedButton = forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  children,
  disabled = false,
  loading = false,
  icon,
  rightIcon,
  animate = true,
  soundEffect = 'click',
  glowEffect = false,
  pulseEffect = false,
  bounceOnClick = true,
  ...props 
}, ref) => {
  const Comp = motion.button

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
    buttonVariants[variant],
    sizeVariants[size],
    {
      'cursor-not-allowed': disabled || loading,
      'shadow-lg shadow-current/25': glowEffect,
      'animate-pulse': pulseEffect && !loading,
    },
    className
  )

  const motionVariants = animate ? {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: bounceOnClick ? { 
      scale: 0.98,
      transition: { duration: 0.1, ease: 'easeInOut' }
    } : { scale: 1 },
    disabled: { scale: 1, opacity: 0.5 }
  } : {}

  const handleClick = (e) => {
    // Sound effect simulation (can be connected to audio system)
    if (soundEffect && !disabled && !loading) {
      // This would connect to the useAudio hook in a real implementation
      // Audio feedback would be handled here
    }
    
    if (props.onClick && !disabled && !loading) {
      props.onClick(e)
    }
  }

  return (
    <Comp
      className={baseClasses}
      ref={ref}
      disabled={disabled || loading}
      variants={motionVariants}
      initial="initial"
      whileHover={!disabled && !loading ? "hover" : "initial"}
      whileTap={!disabled && !loading ? "tap" : "initial"}
      animate={disabled ? "disabled" : "initial"}
      onClick={handleClick}
      {...props}
    >
      {/* Background glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-md opacity-75 blur-sm -z-10"
          style={{
            background: 'linear-gradient(45deg, currentColor, transparent, currentColor)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      )}

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Left icon */}
      {icon && !loading && (
        <motion.span
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {icon}
        </motion.span>
      )}

      {/* Button content */}
      <motion.span
        className={cn(
          'flex-1 text-center',
          loading && 'opacity-70'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.span>

      {/* Right icon */}
      {rightIcon && !loading && (
        <motion.span
          className="flex-shrink-0"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {rightIcon}
        </motion.span>
      )}

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-md pointer-events-none"
        initial={{ background: 'radial-gradient(circle, transparent 0%, transparent 100%)' }}
        whileTap={{
          background: [
            'radial-gradient(circle, transparent 0%, transparent 100%)',
            'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            'radial-gradient(circle, transparent 0%, transparent 100%)'
          ]
        }}
        transition={{ duration: 0.6 }}
      />
    </Comp>
  )
})

AnimatedButton.displayName = 'AnimatedButton'

export default AnimatedButton