import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colors = {
    primary: 'border-blue-500',
    secondary: 'border-purple-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    error: 'border-red-500'
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`
          ${sizes[size]} 
          ${colors[color]} 
          border-4 border-t-transparent 
          rounded-full
        `}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}

export default LoadingSpinner