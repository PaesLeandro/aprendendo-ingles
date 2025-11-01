import React, { useState } from 'react';
import { Volume2, Star, RotateCcw, CheckCircle } from 'lucide-react';
import '../App.css';

const NumberActivity = ({ onComplete, onBack }) => {
    const numbers = [
        { value: 1, name: 'One', portuguese: 'Um', emoji: '1️⃣' },
        { value: 2, name: 'Two', portuguese: 'Dois', emoji: '2️⃣' },
        { value: 3, name: 'Three', portuguese: 'Três', emoji: '3️⃣' },
        { value: 4, name: 'Four', portuguese: 'Quatro', emoji: '4️⃣' },
        { value: 5, name: 'Five', portuguese: 'Cinco', emoji: '5️⃣' },
        { value: 6, name: 'Six', portuguese: 'Seis', emoji: '6️⃣' },
        { value: 7, name: 'Seven', portuguese: 'Sete', emoji: '7️⃣' },
        { value: 8, name: 'Eight', portuguese: 'Oito', emoji: '8️⃣' },
        { value: 9, name: 'Nine', portuguese: 'Nove', emoji: '9️⃣' },
        { value: 10, name: 'Ten', portuguese: 'Dez', emoji: '🔟' }
    ];

    const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

    const currentNumber = numbers[currentNumberIndex];
    const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5).slice(0, 4);

    // Garantir que a resposta correta esteja sempre nas opções
    if (!shuffledNumbers.find(n => n.name === currentNumber.name)) {
        shuffledNumbers[Math.floor(Math.random() * 4)] = currentNumber;
    }

    const playNumberSound = () => {
        // Usando Web Speech API para falar o número
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(currentNumber.name);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };

    const generateDots = (count) => {
        return Array(count).fill(0).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-blue-500 rounded-full"></div>
        ));
    };

    const handleNumberSelect = (selectedNumberName) => {
        setSelectedNumber(selectedNumberName);
        const correct = selectedNumberName === currentNumber.name;
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setScore(score + 1);
        }

        setTimeout(() => {
            setShowFeedback(false);
            setSelectedNumber(null);

            if (currentNumberIndex < numbers.length - 1) {
                setCurrentNumberIndex(currentNumberIndex + 1);
            } else {
                setGameCompleted(true);
            }
        }, 2000);
    };

    const resetGame = () => {
        setCurrentNumberIndex(0);
        setSelectedNumber(null);
        setScore(0);
        setShowFeedback(false);
        setIsCorrect(false);
        setGameCompleted(false);
    };

    const handleComplete = () => {
        onComplete && onComplete(score);
    };

    if (gameCompleted) {
        return (
            <div className="content-wrapper p-6 text-center">
                <div className="activity-card max-w-md mx-auto">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-title mb-4">Parabéns!</h2>
                    <p className="text-subtitle mb-4">
                        Você acertou {score} de {numbers.length} números!
                    </p>

                    <div className="flex gap-4 justify-center mb-6">
                        {[...Array(score)].map((_, i) => (
                            <Star key={i} className="icon-large text-yellow-500 fill-current" />
                        ))}
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            className="big-button secondary-button flex items-center gap-2"
                            onClick={resetGame}
                        >
                            <RotateCcw className="icon-medium" />
                            Jogar Novamente
                        </button>
                        <button
                            className="big-button primary-button"
                            onClick={handleComplete}
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
            {/* Header da Atividade */}
            <div className="flex items-center justify-between mb-6">
                <button
                    className="big-button secondary-button"
                    onClick={onBack}
                >
                    ← Voltar
                </button>
                <div className="text-center">
                    <h2 className="text-subtitle">Números 1-10</h2>
                    <p className="text-body">
                        {currentNumberIndex + 1} de {numbers.length}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Star className="icon-medium text-yellow-500 fill-current" />
                    <span className="text-subtitle">{score}</span>
                </div>
            </div>

            {/* Barra de Progresso */}
            <div className="progress-bar mb-8">
                <div
                    className="progress-fill"
                    style={{ width: `${((currentNumberIndex + 1) / numbers.length) * 100}%` }}
                ></div>
            </div>

            {/* Área Principal da Atividade */}
            <div className="activity-card max-w-2xl mx-auto text-center">
                <h3 className="text-title mb-4">Qual é este número em inglês?</h3>

                {/* Número a ser identificado */}
                <div className="mb-6">
                    <div className="text-8xl mb-4 font-bold text-blue-600">{currentNumber.value}</div>
                    <div className="text-6xl mb-4">{currentNumber.emoji}</div>

                    {/* Representação visual com pontos */}
                    <div className="mb-4">
                        <p className="text-body text-gray-600 mb-2">Conte os pontos:</p>
                        <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
                            {generateDots(currentNumber.value)}
                        </div>
                    </div>

                    <p className="text-subtitle text-gray-600 mb-4">
                        {currentNumber.portuguese}
                    </p>

                    <button
                        className="big-button star-button mt-2 flex items-center gap-2 mx-auto"
                        onClick={playNumberSound}
                    >
                        <Volume2 className="icon-medium" />
                        Ouvir
                    </button>
                </div>

                {/* Opções de Resposta */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {shuffledNumbers.map((number) => (
                        <button
                            key={number.name}
                            className={`activity-card p-4 text-center transition-all ${selectedNumber === number.name
                                    ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                                    : 'hover:border-blue-500'
                                }`}
                            onClick={() => handleNumberSelect(number.name)}
                            disabled={showFeedback}
                        >
                            <div className="text-3xl font-bold text-blue-600 mb-2">{number.value}</div>
                            <div className="text-3xl mb-2">{number.emoji}</div>
                            <p className="text-body font-semibold">{number.name}</p>
                        </button>
                    ))}
                </div>

                {/* Feedback */}
                {showFeedback && (
                    <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            {isCorrect ? (
                                <CheckCircle className="icon-large text-green-600" />
                            ) : (
                                <div className="text-4xl">😔</div>
                            )}
                        </div>
                        <p className="text-subtitle">
                            {isCorrect
                                ? `Muito bem! "${currentNumber.name}" está correto!`
                                : `Ops! A resposta correta é "${currentNumber.name}"`
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NumberActivity;
