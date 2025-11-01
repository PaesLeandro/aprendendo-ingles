import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '@/hooks/useAudio'
import useGameStore from '@/store/gameStore'
import AnimatedButton from '@/components/ui/AnimatedButton'
import AnimatedProgress from '@/components/ui/AnimatedProgress'

const colors = [
  { name: 'red', color: '#ef4444', emoji: '❤️' },
  { name: 'blue', color: '#3b82f6', emoji: '💙' },
  { name: 'green', color: '#22c55e', emoji: '💚' },
  { name: 'yellow', color: '#eab308', emoji: '💛' },
  { name: 'purple', color: '#a855f7', emoji: '💜' },
  { name: 'orange', color: '#f97316', emoji: '🧡' }
]

export default function ColorActivity({ onComplete }) {
  const [currentColorIndex, setCurrentColorIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedColor, setSelectedColor] = useState(null)
  const [gamePhase, setGamePhase] = useState('learning') // learning, quiz, complete
  const [shuffledColors, setShuffledColors] = useState([])

  const { speak, playSound } = useAudio()
  const { updateProgress } = useGameStore()

  const currentColor = colors[currentColorIndex]

  useEffect(() => {
    // Shuffle colors for quiz
    setShuffledColors([...colors].sort(() => Math.random() - 0.5))
  }, [])

  // Speak the color name
  const speakColor = (colorName) => {
    speak(colorName)
  }

  // Handle learning phase
  const handleNext = () => {
    if (currentColorIndex < colors.length - 1) {
      setCurrentColorIndex(currentColorIndex + 1)
    } else {
      setGamePhase('quiz')
      setCurrentColorIndex(0)
    }
  }

  // Handle quiz answer
  const handleColorSelect = (selectedColorName) => {
    setSelectedColor(selectedColorName)
    setShowResult(true)

    const isCorrect = selectedColorName === currentColor.name
    
    if (isCorrect) {
      setScore(score + 1)
      playSound('success')
    } else {
      playSound('error')
    }

    setTimeout(() => {
      setShowResult(false)
      setSelectedColor(null)
      
      if (currentColorIndex < colors.length - 1) {
        setCurrentColorIndex(currentColorIndex + 1)
      } else {
        setGamePhase('complete')
        // Update progress in store
        updateProgress('colors')
        // Call completion callback
        setTimeout(() => onComplete?.(), 1000)
      }
    }, 2000)
  }

  if (gamePhase === 'complete') {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[400px] text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: 2 }}
        >
          🎉
        </motion.div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Parabéns!
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Você completou a atividade de cores!
        </p>
        <p className="text-md text-purple-600 font-medium">
          Pontuação: {score}/{colors.length}
        </p>
      </motion.div>
    )
  }

  if (gamePhase === 'learning') {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Aprendendo Cores
          </h2>
          <AnimatedProgress 
            value={currentColorIndex + 1} 
            max={colors.length} 
            showLabel
            label={`${currentColorIndex + 1} de ${colors.length}`}
          />
        </div>

        <motion.div
          key={currentColorIndex}
          className="text-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg cursor-pointer"
            style={{ backgroundColor: currentColor.color }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => speakColor(currentColor.name)}
          >
            <div className="flex items-center justify-center h-full text-4xl">
              {currentColor.emoji}
            </div>
          </motion.div>

          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            {currentColor.name.toUpperCase()}
          </h3>
          
          <AnimatedButton
            variant="primary"
            onClick={() => speakColor(currentColor.name)}
            className="mb-4"
          >
            🔊 Ouvir
          </AnimatedButton>
        </motion.div>

        <div className="flex justify-center">
          <AnimatedButton
            variant="gaming"
            onClick={handleNext}
            size="lg"
          >
            {currentColorIndex === colors.length - 1 ? 'Começar Quiz!' : 'Próxima Cor'}
          </AnimatedButton>
        </div>
      </div>
    )
  }

  // Quiz phase
  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Quiz de Cores
        </h2>
        <AnimatedProgress 
          value={currentColorIndex + 1} 
          max={colors.length} 
          showLabel
          label={`${currentColorIndex + 1} de ${colors.length}`}
        />
        <p className="text-sm text-gray-600 mt-2">
          Pontuação: {score}/{currentColorIndex}
        </p>
      </div>

      <motion.div
        key={`quiz-${currentColorIndex}`}
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg text-gray-700 mb-4">
          Qual cor é esta?
        </p>
        
        <motion.div
          className="w-24 h-24 rounded-full mx-auto mb-6 shadow-lg"
          style={{ backgroundColor: currentColor.color }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="flex items-center justify-center h-full text-3xl">
            {currentColor.emoji}
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {shuffledColors.slice(0, 4).map((color) => {
          const isSelected = selectedColor === color.name
          const isCorrect = color.name === currentColor.name
          const showFeedback = showResult && isSelected

          return (
            <motion.button
              key={color.name}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                showFeedback
                  ? isCorrect 
                    ? 'border-green-500 bg-green-100' 
                    : 'border-red-500 bg-red-100'
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
              }`}
              onClick={() => !showResult && handleColorSelect(color.name)}
              disabled={showResult}
              whileHover={!showResult ? { scale: 1.05 } : {}}
              whileTrap={!showResult ? { scale: 0.95 } : {}}
            >
              <div
                className="w-8 h-8 rounded-full mx-auto mb-2"
                style={{ backgroundColor: color.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {color.name}
              </span>
              
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    className="mt-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    {isCorrect ? '✅' : '❌'}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}