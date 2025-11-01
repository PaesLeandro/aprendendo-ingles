import { useState, useCallback } from 'react'

// Simple Audio Hook
export const useAudio = () => {
  const [isLoading, setIsLoading] = useState(false)

  // Play sound effect
  const playSound = useCallback(async (soundType) => {
    try {
      // Use Web Audio API for sound effects if available
      if (window.AudioContext || window.webkitAudioContext) {
        // Simple beep sounds for different actions
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        // Different frequencies for different sounds
        const frequencies = {
          click: 800,
          success: 1000,
          error: 400,
          celebration: 1200
        }

        oscillator.frequency.value = frequencies[soundType] || 600
        oscillator.type = 'sine'
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.2)
      }
    } catch (error) {
      console.warn('Sound effect failed:', error)
    }
  }, [])

  // Speak text using Speech Synthesis
  const speak = useCallback((text, lang = 'en-US') => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel() // Cancel any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.8
      utterance.volume = 0.8
      utterance.pitch = 1.1

      // Get available voices
      const voices = speechSynthesis.getVoices()
      const preferredVoice = voices.find(voice => 
        voice.lang === lang && voice.localService
      ) || voices.find(voice => 
        voice.lang.startsWith(lang.split('-')[0])
      )
      
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      speechSynthesis.speak(utterance)
    }
  }, [])

  // Stop all audio
  const stopAllAudio = useCallback(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
    }
  }, [])

  return {
    playSound,
    speak,
    stopAllAudio,
    isLoading
  }
}

// Audio URLs for professional pronunciation
export const AUDIO_URLS = {
  colors: {
    red: '/audio/colors/red.mp3',
    blue: '/audio/colors/blue.mp3',
    green: '/audio/colors/green.mp3',
    yellow: '/audio/colors/yellow.mp3',
    purple: '/audio/colors/purple.mp3',
    orange: '/audio/colors/orange.mp3'
  },
  animals: {
    cat: '/audio/animals/cat.mp3',
    dog: '/audio/animals/dog.mp3',
    bird: '/audio/animals/bird.mp3',
    fish: '/audio/animals/fish.mp3',
    rabbit: '/audio/animals/rabbit.mp3',
    horse: '/audio/animals/horse.mp3'
  },
  numbers: {
    one: '/audio/numbers/one.mp3',
    two: '/audio/numbers/two.mp3',
    three: '/audio/numbers/three.mp3',
    four: '/audio/numbers/four.mp3',
    five: '/audio/numbers/five.mp3',
    six: '/audio/numbers/six.mp3',
    seven: '/audio/numbers/seven.mp3',
    eight: '/audio/numbers/eight.mp3',
    nine: '/audio/numbers/nine.mp3',
    ten: '/audio/numbers/ten.mp3'
  },
  family: {
    mother: '/audio/family/mother.mp3',
    father: '/audio/family/father.mp3',
    sister: '/audio/family/sister.mp3',
    brother: '/audio/family/brother.mp3',
    grandmother: '/audio/family/grandmother.mp3',
    grandfather: '/audio/family/grandfather.mp3'
  },
  food: {
    apple: '/audio/food/apple.mp3',
    banana: '/audio/food/banana.mp3',
    orange: '/audio/food/orange.mp3',
    bread: '/audio/food/bread.mp3',
    milk: '/audio/food/milk.mp3',
    water: '/audio/food/water.mp3'
  },
  weather: {
    sunny: '/audio/weather/sunny.mp3',
    rainy: '/audio/weather/rainy.mp3',
    cloudy: '/audio/weather/cloudy.mp3',
    windy: '/audio/weather/windy.mp3',
    snowy: '/audio/weather/snowy.mp3',
    hot: '/audio/weather/hot.mp3',
    cold: '/audio/weather/cold.mp3'
  },
  sounds: {
    success: '/audio/sounds/success.mp3',
    error: '/audio/sounds/error.mp3',
    click: '/audio/sounds/click.mp3',
    celebration: '/audio/sounds/celebration.mp3',
    levelup: '/audio/sounds/levelup.mp3'
  }
}

// Hook for speech recognition (pronunciation feedback)
export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)

  const startListening = useCallback((_expectedWord) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript('')
      setConfidence(0)
    }

    recognition.onresult = (event) => {
      const result = event.results[0][0]
      setTranscript(result.transcript.toLowerCase().trim())
      setConfidence(result.confidence)
    }

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()

    // Auto-stop after 5 seconds
    setTimeout(() => {
      if (recognition) {
        recognition.stop()
      }
    }, 5000)

    return recognition
  }, [])

  const checkPronunciation = useCallback((spoken, expected) => {
    const normalizeWord = (word) => word.toLowerCase().trim().replace(/[^a-z]/g, '')
    const spokenNorm = normalizeWord(spoken)
    const expectedNorm = normalizeWord(expected)

    // Exact match
    if (spokenNorm === expectedNorm) {
      return { accuracy: 100, feedback: 'Perfect!' }
    }

    // Partial match using Levenshtein distance
    const distance = levenshteinDistance(spokenNorm, expectedNorm)
    const accuracy = Math.max(0, 100 - (distance / expectedNorm.length) * 100)

    let feedback = 'Try again'
    if (accuracy >= 80) feedback = 'Very good!'
    else if (accuracy >= 60) feedback = 'Good try!'
    else if (accuracy >= 40) feedback = 'Keep practicing!'

    return { accuracy: Math.round(accuracy), feedback }
  }, [])

  return {
    isListening,
    transcript,
    confidence,
    startListening,
    checkPronunciation
  }
}

// Helper function for string similarity
function levenshteinDistance(str1, str2) {
  const matrix = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[str2.length][str1.length]
}