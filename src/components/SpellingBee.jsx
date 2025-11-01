import React, { useState, useEffect } from 'react';
import { RotateCcw, Star, Timer, Trophy, Volume2, Mic, MicOff } from 'lucide-react';
import '../App.css';

const SpellingBee = ({ onComplete, onBack }) => {
    const spellingWords = [
        { word: 'APPLE', portuguese: 'Maçã', difficulty: 1, category: 'Frutas', emoji: '🍎' },
        { word: 'BANANA', portuguese: 'Banana', difficulty: 1, category: 'Frutas', emoji: '🍌' },
        { word: 'ORANGE', portuguese: 'Laranja', difficulty: 2, category: 'Frutas', emoji: '🍊' },
        { word: 'ELEPHANT', portuguese: 'Elefante', difficulty: 3, category: 'Animais', emoji: '🐘' },
        { word: 'BUTTERFLY', portuguese: 'Borboleta', difficulty: 3, category: 'Animais', emoji: '🦋' },
        { word: 'RAINBOW', portuguese: 'Arco-íris', difficulty: 2, category: 'Natureza', emoji: '🌈' },
        { word: 'MOUNTAIN', portuguese: 'Montanha', difficulty: 3, category: 'Natureza', emoji: '⛰️' },
        { word: 'COMPUTER', portuguese: 'Computador', difficulty: 3, category: 'Tecnologia', emoji: '💻' },
        { word: 'PENCIL', portuguese: 'Lápis', difficulty: 2, category: 'Escola', emoji: '✏️' },
        { word: 'BACKPACK', portuguese: 'Mochila', difficulty: 3, category: 'Escola', emoji: '🎒' }
    ];

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [correctWords, setCorrectWords] = useState([]);
    const [wrongAttempts, setWrongAttempts] = useState([]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [currentAttempt, setCurrentAttempt] = useState(1);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [speechRecognition, setSpeechRecognition] = useState(null);

    const currentWord = spellingWords[currentWordIndex];
    const maxAttempts = 3;

    // Configurar reconhecimento de voz
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toUpperCase().trim();
                setUserInput(transcript);
                setIsListening(false);
            };

            recognition.onerror = () => {
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            setSpeechRecognition(recognition);
        }
    }, []);

    // Timer effect
    useEffect(() => {
        let interval;
        if (gameStarted && !gameCompleted) {
            interval = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameStarted, gameCompleted]);

    // Inicializar jogo
    const initializeGame = () => {
        setCurrentWordIndex(0);
        setUserInput('');
        setCorrectWords([]);
        setWrongAttempts([]);
        setTimeElapsed(0);
        setGameStarted(false);
        setGameCompleted(false);
        setCurrentAttempt(1);
        setShowFeedback(false);
        setIsCorrect(false);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    // Falar a palavra
    const speakWord = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(currentWord.word);
            utterance.lang = 'en-US';
            utterance.rate = 0.7;
            utterance.pitch = 1.2;
            speechSynthesis.speak(utterance);
        }
    };

    // Soletrar a palavra
    const spellWord = () => {
        if ('speechSynthesis' in window) {
            const letters = currentWord.word.split('').join(' ');
            const utterance = new SpeechSynthesisUtterance(letters);
            utterance.lang = 'en-US';
            utterance.rate = 0.5;
            speechSynthesis.speak(utterance);
        }
    };

    // Iniciar reconhecimento de voz
    const startListening = () => {
        if (speechRecognition && !isListening) {
            setIsListening(true);
            speechRecognition.start();
        }
    };

    // Verificar resposta
    const checkSpelling = () => {
        if (!gameStarted) {
            setGameStarted(true);
        }

        const userAnswer = userInput.toUpperCase().trim();
        const correctAnswer = currentWord.word;

        if (userAnswer === correctAnswer) {
            // Resposta correta!
            setIsCorrect(true);
            setShowFeedback(true);
            const newCorrectWords = [...correctWords, { ...currentWord, attempts: currentAttempt }];
            setCorrectWords(newCorrectWords);

            setTimeout(() => {
                if (currentWordIndex === spellingWords.length - 1) {
                    setGameCompleted(true);
                } else {
                    nextWord();
                }
            }, 2000);
        } else {
            // Resposta incorreta
            setIsCorrect(false);
            setShowFeedback(true);

            if (currentAttempt >= maxAttempts) {
                // Máximo de tentativas atingido
                setWrongAttempts(prev => [...prev, currentWord]);
                setTimeout(() => {
                    if (currentWordIndex === spellingWords.length - 1) {
                        setGameCompleted(true);
                    } else {
                        nextWord();
                    }
                }, 2000);
            } else {
                // Tentar novamente
                setTimeout(() => {
                    setCurrentAttempt(prev => prev + 1);
                    setShowFeedback(false);
                    setUserInput('');
                }, 1500);
            }
        }
    };

    // Próxima palavra
    const nextWord = () => {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
        setCurrentAttempt(1);
        setShowFeedback(false);
        setIsCorrect(false);
    };

    // Pular palavra
    const skipWord = () => {
        setWrongAttempts(prev => [...prev, currentWord]);
        if (currentWordIndex === spellingWords.length - 1) {
            setGameCompleted(true);
        } else {
            nextWord();
        }
    };

    // Calcular pontuação
    const calculateScore = () => {
        let totalScore = 0;

        correctWords.forEach(word => {
            const baseScore = word.difficulty * 10;
            const attemptBonus = Math.max(0, (maxAttempts - word.attempts + 1) * 5);
            totalScore += baseScore + attemptBonus;
        });

        const timeBonus = Math.max(0, 300 - timeElapsed); // Bonus por tempo
        return totalScore + timeBonus;
    };

    // Formatar tempo
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Tela de conclusão
    if (gameCompleted) {
        const score = calculateScore();
        const accuracy = Math.round((correctWords.length / spellingWords.length) * 100);

        return (
            <div className="content-wrapper p-6 text-center">
                <div className="activity-card max-w-md mx-auto">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-title mb-4">Concurso Finalizado!</h2>
                    <p className="text-subtitle mb-4">
                        Você acertou {correctWords.length} de {spellingWords.length} palavras
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="activity-card text-center">
                            <Timer className="icon-medium text-blue-500 mx-auto mb-2" />
                            <div className="text-subtitle">{formatTime(timeElapsed)}</div>
                            <div className="text-body text-gray-600">Tempo</div>
                        </div>
                        <div className="activity-card text-center">
                            <Trophy className="icon-medium text-green-500 mx-auto mb-2" />
                            <div className="text-subtitle">{accuracy}%</div>
                            <div className="text-body text-gray-600">Precisão</div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center mb-6">
                        {[...Array(Math.min(3, Math.floor(score / 50)))].map((_, i) => (
                            <Star key={i} className="icon-large text-yellow-500 fill-current" />
                        ))}
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            className="big-button secondary-button flex items-center gap-2"
                            onClick={initializeGame}
                        >
                            <RotateCcw className="icon-medium" />
                            Jogar Novamente
                        </button>
                        <button
                            className="big-button primary-button"
                            onClick={() => onComplete && onComplete(score)}
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="content-wrapper p-6">
            {/* Header do Jogo */}
            <div className="flex items-center justify-between mb-6">
                <button
                    className="big-button secondary-button"
                    onClick={onBack}
                >
                    ← Voltar
                </button>
                <div className="text-center">
                    <h2 className="text-subtitle">Concurso de Soletração</h2>
                    <p className="text-body">Palavra {currentWordIndex + 1} de {spellingWords.length}</p>
                </div>
                <button
                    className="big-button star-button"
                    onClick={initializeGame}
                >
                    <RotateCcw className="icon-medium" />
                </button>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="activity-card text-center">
                    <Timer className="icon-medium text-blue-500 mx-auto mb-2" />
                    <div className="text-subtitle">{formatTime(timeElapsed)}</div>
                    <div className="text-body text-gray-600">Tempo</div>
                </div>
                <div className="activity-card text-center">
                    <Star className="icon-medium text-green-500 mx-auto mb-2" />
                    <div className="text-subtitle">{correctWords.length}</div>
                    <div className="text-body text-gray-600">Corretas</div>
                </div>
                <div className="activity-card text-center">
                    <Trophy className="icon-medium text-red-500 mx-auto mb-2" />
                    <div className="text-subtitle">{wrongAttempts.length}</div>
                    <div className="text-body text-gray-600">Incorretas</div>
                </div>
                <div className="activity-card text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-subtitle">{currentAttempt}/{maxAttempts}</div>
                    <div className="text-body text-gray-600">Tentativa</div>
                </div>
            </div>

            {/* Área Principal do Jogo */}
            <div className="activity-card max-w-4xl mx-auto">
                {/* Palavra Atual */}
                <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{currentWord.emoji}</div>
                    <p className="text-title mb-2">{currentWord.portuguese}</p>
                    <p className="text-body text-gray-600 mb-4">
                        Categoria: {currentWord.category} | Dificuldade: {currentWord.difficulty}/3
                    </p>

                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            className="big-button primary-button flex items-center gap-2"
                            onClick={speakWord}
                        >
                            <Volume2 className="icon-medium" />
                            Ouvir Palavra
                        </button>
                        <button
                            className="big-button secondary-button flex items-center gap-2"
                            onClick={spellWord}
                        >
                            <Volume2 className="icon-medium" />
                            Soletrar
                        </button>
                    </div>
                </div>

                {/* Área de Input */}
                <div className="mb-6">
                    <h3 className="text-subtitle text-center mb-4">Digite a palavra em inglês:</h3>

                    <div className="flex justify-center mb-4">
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                                className="text-center text-2xl font-bold p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                placeholder="DIGITE AQUI"
                                onKeyPress={(e) => e.key === 'Enter' && checkSpelling()}
                                disabled={showFeedback}
                            />
                            {speechRecognition && (
                                <button
                                    className={`big-button ${isListening ? 'primary-button' : 'star-button'} flex items-center gap-2`}
                                    onClick={startListening}
                                    disabled={isListening || showFeedback}
                                >
                                    {isListening ? (
                                        <>
                                            <MicOff className="icon-medium" />
                                            Ouvindo...
                                        </>
                                    ) : (
                                        <>
                                            <Mic className="icon-medium" />
                                            Falar
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            className="big-button primary-button"
                            onClick={checkSpelling}
                            disabled={userInput.trim() === '' || showFeedback}
                        >
                            ✓ Verificar
                        </button>
                        <button
                            className="big-button secondary-button"
                            onClick={() => setUserInput('')}
                            disabled={showFeedback}
                        >
                            🗑️ Limpar
                        </button>
                        <button
                            className="big-button star-button"
                            onClick={skipWord}
                            disabled={showFeedback}
                        >
                            ⏭️ Pular
                        </button>
                    </div>
                </div>

                {/* Feedback */}
                {showFeedback && (
                    <div className={`p-4 rounded-lg text-center mb-6 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            {isCorrect ? (
                                <div className="text-4xl">🎉</div>
                            ) : (
                                <div className="text-4xl">😔</div>
                            )}
                        </div>
                        <p className="text-subtitle">
                            {isCorrect
                                ? `Muito bem! "${currentWord.word}" está correto!`
                                : currentAttempt >= maxAttempts
                                    ? `A resposta correta é "${currentWord.word}"`
                                    : `Tente novamente! Tentativa ${currentAttempt}/${maxAttempts}`
                            }
                        </p>
                    </div>
                )}

                {/* Progresso */}
                <div className="mt-6">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((currentWordIndex + 1) / spellingWords.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpellingBee;
