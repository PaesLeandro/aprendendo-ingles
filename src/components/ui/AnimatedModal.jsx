import { forwardRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const AnimatedModal = forwardRef(({ 
  className, 
  children,
  isOpen = false,
  onClose,
  size = 'default',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  animate = true,
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: 'max-w-md',
    default: 'max-w-lg',
    lg: 'max-w-2xl', 
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  }

  const modalClasses = cn(
    'relative bg-background rounded-xl shadow-2xl border max-h-[90vh] overflow-hidden',
    sizeClasses[size],
    className
  )

  const backdropVariants = animate ? {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  } : {}

  const modalVariants = animate ? {
    initial: { 
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    animate: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.3, 
        ease: 'easeOut',
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { 
        duration: 0.2, 
        ease: 'easeIn'
      }
    }
  } : {}

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeOnEscape, isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose?.()
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            ref={ref}
            className={modalClasses}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {/* Close Button */}
            {showCloseButton && (
              <motion.button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            )}

            {/* Content */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

const ModalHeader = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2 p-6 pb-2', className)}
    {...props}
  >
    {children}
  </div>
))

const ModalTitle = forwardRef(({ className, children, ...props }, ref) => (
  <motion.h2
    ref={ref}
    className={cn('text-xl font-semibold leading-none tracking-tight', className)}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.h2>
))

const ModalDescription = forwardRef(({ className, children, ...props }, ref) => (
  <motion.p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4, duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.p>
))

const ModalContent = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 overflow-y-auto max-h-[60vh]', className)}
    {...props}
  />
))

const ModalFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-2', className)}
    {...props}
  />
))

AnimatedModal.displayName = 'AnimatedModal'
ModalHeader.displayName = 'ModalHeader'
ModalTitle.displayName = 'ModalTitle'
ModalDescription.displayName = 'ModalDescription'
ModalContent.displayName = 'ModalContent'
ModalFooter.displayName = 'ModalFooter'

export {
  AnimatedModal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
}

export default AnimatedModal