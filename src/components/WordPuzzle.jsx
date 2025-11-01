import React, { useState, useEffect } from 'react';
import { RotateCcw, Star, Timer, Trophy, Volume2, Lightbulb } from 'lucide-react';
import '../App.css';

const WordPuzzle = ({ onComplete, onBack }) => {
    const puzzleWords = [
        { word: 'CAT', portuguese: 'Gato', hint: 'Animal doméstico que faz "miau"', emoji: '🐱' },
        { word: 'DOG', portuguese: 'Cão', hint: 'O melhor amigo do homem', emoji: '🐶' },
        { word: 'BIRD', portuguese: 'Pássaro', hint: 'Animal que voa e canta', emoji: '🐦' },
        { word: 'FISH', portuguese: 'Peixe', hint: 'Animal que vive na água', emoji: '🐠' },
        { word: 'HOUSE', portuguese: 'Casa', hint: 'Lugar onde você mora', emoji: '🏠' },
        { word: 'TREE', portuguese: 'Árvore', hint: 'Planta grande com folhas', emoji: '🌳' },
        { word: 'FLOWER', portuguese: 'Flor', hint: 'Planta colorida e perfumada', emoji: '🌸' },
        { word: 'BOOK', portuguese: 'Livro', hint: 'Tem páginas para ler', emoji: '📚' },
        { word: 'CAR', portuguese: 'Carro', hint: 'Veículo com quatro rodas', emoji: '🚗' },
        { word: 'SUN', portuguese: 'Sol', hint: 'Estrela que ilumina o dia', emoji: '☀️' },
        { word: 'MOON', portuguese: 'Lua', hint: 'Astro que brilha à noite', emoji: '🌙' },
        { word: 'STAR', portuguese: 'Estrela', hint: 'Brilha no céu à noite', emoji: '⭐' },
        { word: 'CLOUD', portuguese: 'Nuvem', hint: 'Flutua no céu e traz chuva', emoji: '☁️' },
        { word: 'RAIN', portuguese: 'Chuva', hint: 'Água que cai do céu', emoji: '🌧️' },
        { word: 'SNOW', portuguese: 'Neve', hint: 'Cristais de gelo que caem do céu', emoji: '❄️' },
        { word: 'WIND', portuguese: 'Vento', hint: 'Ar em movimento', emoji: '💨' },
        { word: 'RAINBOW', portuguese: 'Arco-íris', hint: 'Fenômeno óptico com várias cores', emoji: '🌈' },
        { word: 'LIGHTNING', portuguese: 'Relâmpago', hint: 'Descarga elétrica durante tempestades', emoji: '⚡' },
        { word: 'THUNDER', portuguese: 'Trovão', hint: 'Som alto durante tempestades', emoji: '🌩️' }
    ];

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [scrambledLetters, setScrambledLetters] = useState([]);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [completedWords, setCompletedWords] = useState([]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [mistakes, setMistakes] = useState(0);

    // Evita erro se puzzleWords estiver vazio
    const currentWord = puzzleWords[currentWordIndex]; 

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

    // Embaralhar letras da palavra atual
    const scrambleWord = (word) => {
        if (!word) return []; // Proteção caso a palavra não exista
        const letters = word.split('');
        // Adicionar algumas letras extras aleatórias
        const extraLetters = ['A', 'E', 'I', 'O', 'U', 'B', 'C', 'D', 'F', 'G'];
        const numExtras = Math.min(3, Math.floor(word.length / 2));

        for (let i = 0; i < numExtras; i++) {
            const randomLetter = extraLetters[Math.floor(Math.random() * extraLetters.length)];
            if (!letters.includes(randomLetter)) {
                letters.push(randomLetter);
            }
        }

        return letters.sort(() => Math.random() - 0.5);
    };

    // Inicializar palavra atual
    const initializeCurrentWord = () => {
        if (!currentWord) return; // Proteção para não travar no fim
        const scrambled = scrambleWord(currentWord.word);
        setScrambledLetters(scrambled);
        setSelectedLetters([]);
        setShowHint(false);
    };

    // Inicializar jogo
    const initializeGame = () => {
        setCurrentWordIndex(0);
        setCompletedWords([]);
        setTimeElapsed(0);
        setGameStarted(false);
        setGameCompleted(false);
        setMistakes(0);
        // O useEffect de currentWordIndex vai chamar o initializeCurrentWord
    };

    useEffect(() => {
        // Inicializa o jogo apenas na primeira vez que o componente é montado
        initializeGame();
    }, []); // A array de dependências vazia [] garante que isso rode só uma vez

    useEffect(() => {
        // Isso roda quando o jogo começa E toda vez que o index da palavra muda
        if (currentWordIndex < puzzleWords.length) {
            initializeCurrentWord();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWordIndex]); // Depende do índice da palavra

    // Adicionar letra selecionada
    const addLetter = (letter, index) => {
        if (!gameStarted) {
            setGameStarted(true);
        }
        setSelectedLetters(prev => [...prev, { letter, originalIndex: index }]);
        setScrambledLetters(prev => prev.filter((_, i) => i !== index));
    };

    // Remover letra selecionada
    const removeLetter = (index) => {
        const letterData = selectedLetters[index];
        if (!letterData) return; // Proteção contra cliques rápidos
        setSelectedLetters(prev => prev.filter((_, i) => i !== index));
        // Adiciona a letra de volta ao array de letras disponíveis
        setScrambledLetters(prev => [...prev, letterData.letter]);
    };

    // Verificar palavra
    const checkWord = () => {
        const formedWord = selectedLetters.map(l => l.letter).join('');

        if (formedWord === currentWord.word) {
            // Palavra correta!
            const newCompletedWords = [...completedWords, currentWord];
            setCompletedWords(newCompletedWords);

            // Falar a palavra
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(currentWord.word);
                utterance.lang = 'en-US';
                utterance.rate = 0.8;
                speechSynthesis.speak(utterance);
            }

            // Verificar se o jogo terminou
            if (currentWordIndex === puzzleWords.length - 1) {
                setGameCompleted(true);
            } else {
                setTimeout(() => {
                    setCurrentWordIndex(prev => prev + 1);
                }, 1500);
            }
        } else {
            // Palavra incorreta
            setMistakes(prev => prev + 1);
            // Resetar seleção após um tempo
            setTimeout(() => {
                initializeCurrentWord(); // Reseta para a palavra atual
            }, 1000);
        }
    };

    // Usar dica
    const useHint = () => {
        setShowHint(true);
    };

    // Calcular pontuação
    const calculateScore = () => {
        const baseScore = completedWords.length * 20;
        const timeBonus = Math.max(0, 120 - timeElapsed);
        const mistakePenalty = mistakes * 5;
        const hintPenalty = showHint ? 10 : 0;
        return Math.max(0, baseScore + timeBonus - mistakePenalty - hintPenalty);
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
        return (
            <div className="content-wrapper p-6 text-center">
                <div className="activity-card max-w-md mx-auto">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-title mb-4">Parabéns!</h2>
                    <p className="text-subtitle mb-4">Você completou todas as palavras!</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="activity-card text-center">
                            <Timer className="icon-medium text-blue-500 mx-auto mb-2" />
                            <div className="text-subtitle">{formatTime(timeElapsed)}</div>
                            <div className="text-body text-gray-600">Tempo</div>
                        </div>
                        <div className="activity-card text-center">
                            <Trophy className="icon-medium text-red-500 mx-auto mb-2" />
                            <div className="text-subtitle">{mistakes}</div>
                            <div className="text-body text-gray-600">Erros</div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center mb-6">
                        {[...Array(Math.min(3, Math.floor(score / 30)))].map((_, i) => (
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
    
    // Proteção caso currentWord ainda não esteja carregado
    if (!currentWord) {
        return <div>Carregando jogo...</div>;
    }

    return (
        <div className="content-wrapper p-6">
            {/* Header do Jogo */}
            <div className="flex items-center justify-between mb-6">
                <button className="big-button secondary-button" onClick={onBack}>
                    ← Voltar
                </button>
                <div className="text-center">
                    <h2 className="text-subtitle">Quebra-cabeça de Palavras</h2>
                    <p className="text-body">Palavra {currentWordIndex + 1} de {puzzleWords.length}</p>
                </div>
                <button className="big-button star-button" onClick={initializeGame}>
                    <RotateCcw className="icon-medium" />
                </button>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="activity-card text-center">
                    <Timer className="icon-medium text-blue-500 mx-auto mb-2" />
                    <div className="text-subtitle">{formatTime(timeElapsed)}</div>
                    <div className="text-body text-gray-600">Tempo</div>
                </div>
                <div className="activity-card text-center">
                    <Star className="icon-medium text-green-500 mx-auto mb-2" />
                    <div className="text-subtitle">{completedWords.length}/{puzzleWords.length}</div>
                    <div className="text-body text-gray-600">Palavras</div>
                </div>
                <div className="activity-card text-center">
                    <Trophy className="icon-medium text-red-500 mx-auto mb-2" />
                    <div className="text-subtitle">{mistakes}</div>
                    <div className="text-body text-gray-600">Erros</div>
                </div>
            </div>

            {/* Área Principal do Jogo */}
            <div className="activity-card max-w-4xl mx-auto">
                {/* Palavra Atual */}
                <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{currentWord.emoji}</div>
                    <p className="text-title mb-2">{currentWord.portuguese}</p>

                    {showHint && (
                        <p className="text-body text-gray-600 mb-4">💡 {currentWord.hint}</p>
                    )}

                    <button
                        className="big-button star-button flex items-center gap-2 mx-auto mb-4"
                        onClick={() => {
                            if ('speechSynthesis' in window) {
                                const utterance = new SpeechSynthesisUtterance(currentWord.word);
                                utterance.lang = 'en-US';
                                utterance.rate = 0.8;
                                speechSynthesis.speak(utterance);
                            }
                        }}
                    >
                        <Volume2 className="icon-medium" />
                        Ouvir
                    </button>
                </div>

                {/* Área de Resposta */}
                <div className="mb-6">
                    <h3 className="text-subtitle text-center mb-4">Monte a palavra em inglês:</h3>
                    <div className="flex justify-center mb-4">
                        <div className="flex gap-2 min-h-16 items-center justify-center flex-wrap">
                            {selectedLetters.length === 0 && (
                                <div className="text-gray-400 text-center py-4">Clique nas letras abaixo para formar a palavra</div>
                            )}
                            {selectedLetters.map((letterData, index) => (
                                <button
                                    key={index}
                                    className="w-12 h-12 bg-blue-500 text-white text-xl font-bold rounded-lg hover:bg-blue-600 transition-all"
                                    onClick={() => removeLetter(index)}
                                >
                                    {letterData.letter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            className="big-button primary-button"
                            onClick={checkWord}
                            disabled={selectedLetters.length === 0}
                        >
                            ✓ Verificar
                        </button>

                        {/* --- ✅ BUG CORRIGIDO --- */}
                        <button
                            className="big-button secondary-button"
                            onClick={() => {
                                // 1. Embaralha APENAS as letras que sobraram
                                setScrambledLetters(prevLetters => 
                                    [...prevLetters].sort(() => Math.random() - 0.5)
                                );
                                // 2. NÃO mexe mais nas letras selecionadas
                            }}
                        >
                            <RotateCcw className="icon-medium" />
                            Embaralhar
                        </button>
                        {/* --- FIM DA CORREÇÃO --- */}

                        {!showHint && (
                            <button className="big-button star-button" onClick={useHint}>
                                <Lightbulb className="icon-medium" />
                                Dica
                            </button>
                        )}
                    </div>
                </div>

                {/* Letras Disponíveis */}
                <div>
                    <h3 className="text-subtitle text-center mb-4">Letras disponíveis:</h3>
                    <div className="flex justify-center flex-wrap gap-3">
                        {scrambledLetters.map((letter, index) => (
                            <button
                                key={index}
                                className="w-12 h-12 bg-gray-200 text-gray-800 text-xl font-bold rounded-lg hover:bg-gray-300 transition-all transform hover:scale-110"
                                onClick={() => addLetter(letter, index)}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Progresso */}
                <div className="mt-6">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((currentWordIndex + 1) / puzzleWords.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WordPuzzle;