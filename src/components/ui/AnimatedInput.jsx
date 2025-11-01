import { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const AnimatedInput = forwardRef(({ 
  className, 
  type = 'text',
  label,
  placeholder,
  error,
  success,
  icon,
  rightIcon,
  size = 'default',
  variant = 'default',
  animate = true,
  soundEffect = false,
  glowEffect = false,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(props.value || props.defaultValue || false)

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    default: 'h-10 px-3',
    lg: 'h-12 px-4 text-lg'
  }

  const variantClasses = {
    default: 'border-input bg-background',
    outlined: 'border-2 border-input bg-transparent',
    filled: 'border-0 bg-muted',
    gaming: 'border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50'
  }

  const inputClasses = cn(
    'flex w-full rounded-md border text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
    sizeClasses[size],
    variantClasses[variant],
    {
      'border-red-500 focus-visible:ring-red-500': error,
      'border-green-500 focus-visible:ring-green-500': success,
      'shadow-lg shadow-current/10': glowEffect,
      'pl-10': icon,
      'pr-10': rightIcon,
    },
    className
  )

  const handleFocus = (e) => {
    setIsFocused(true)
    if (soundEffect) {
      // Audio feedback would be handled here
    }
    props.onFocus?.(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0)
    props.onChange?.(e)
  }

  const labelVariants = animate ? {
    floating: {
      y: -24,
      scale: 0.85,
      color: isFocused ? '#3b82f6' : '#6b7280',
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    default: {
      y: 0,
      scale: 1,
      color: '#6b7280',
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  } : {}

  const inputVariants = animate ? {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    blur: {
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  } : {}

  return (
    <div className="relative w-full space-y-2">
      {/* Label */}
      {label && (
        <motion.label
          className={cn(
            'absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none origin-left font-medium text-sm',
            {
              'text-red-500': error,
              'text-green-500': success,
            }
          )}
          variants={labelVariants}
          animate={isFocused || hasValue ? 'floating' : 'default'}
          htmlFor={props.id}
        >
          {label}
        </motion.label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {icon && (
          <motion.div
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {icon}
          </motion.div>
        )}

        {/* Input Field */}
        <motion.input
          ref={ref}
          type={type}
          className={inputClasses}
          placeholder={isFocused || !label ? placeholder : ''}
          variants={inputVariants}
          animate={isFocused ? 'focus' : 'blur'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && (
          <motion.div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {rightIcon}
          </motion.div>
        )}

        {/* Focus Ring Animation */}
        {animate && (
          <motion.div
            className="absolute inset-0 rounded-md pointer-events-none"
            initial={{ boxShadow: '0 0 0 0px rgba(59, 130, 246, 0)' }}
            animate={{
              boxShadow: isFocused 
                ? '0 0 0 2px rgba(59, 130, 246, 0.2)' 
                : '0 0 0 0px rgba(59, 130, 246, 0)'
            }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Glow Effect */}
        {glowEffect && isFocused && (
          <motion.div
            className="absolute inset-0 rounded-md opacity-20 blur-sm -z-10"
            style={{
              backgroundColor: error ? '#ef4444' : success ? '#10b981' : '#3b82f6',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      {/* Error/Success/Helper Text */}
      {(error || success) && (
        <motion.div
          className={cn(
            'flex items-center gap-2 text-sm',
            {
              'text-red-500': error,
              'text-green-500': success,
            }
          )}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {success && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span>{error || success}</span>
        </motion.div>
      )}

      {/* Character Animations for Gaming Variant */}
      {variant === 'gaming' && isFocused && (
        <motion.div
          className="absolute -top-8 right-0 pointer-events-none"
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="bg-purple-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
            Keep going! 🌟
          </div>
        </motion.div>
      )}
    </div>
  )
})

const TextArea = forwardRef(({ 
  className, 
  label,
  error,
  success,
  rows = 3,
  animate = true,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  const textareaClasses = cn(
    'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none',
    {
      'border-red-500 focus-visible:ring-red-500': error,
      'border-green-500 focus-visible:ring-green-500': success,
    },
    className
  )

  const textareaVariants = animate ? {
    focus: {
      scale: 1.01,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    blur: {
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  } : {}

  return (
    <div className="w-full space-y-2">
      {label && (
        <motion.label
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            {
              'text-red-500': error,
              'text-green-500': success,
            }
          )}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.label>
      )}

      <motion.textarea
        ref={ref}
        className={textareaClasses}
        rows={rows}
        variants={textareaVariants}
        animate={isFocused ? 'focus' : 'blur'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {(error || success) && (
        <motion.div
          className={cn(
            'flex items-center gap-2 text-sm',
            {
              'text-red-500': error,
              'text-green-500': success,
            }
          )}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {success && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span>{error || success}</span>
        </motion.div>
      )}
    </div>
  )
})

AnimatedInput.displayName = 'AnimatedInput'
TextArea.displayName = 'TextArea'

export { AnimatedInput, TextArea }
export default AnimatedInput