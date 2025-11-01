import React, { useState } from 'react';
import { Volume2, Star, RotateCcw, CheckCircle } from 'lucide-react';
import '../App.css';

const AnimalActivity = ({ onComplete, onBack }) => {
    const animals = [
        { name: 'Cow', portuguese: 'Vaca', emoji: '🐄', sound: 'Moo' },
        { name: 'Pig', portuguese: 'Porco', emoji: '🐷', sound: 'Oink' },
        { name: 'Sheep', portuguese: 'Ovelha', emoji: '🐑', sound: 'Baa' },
        { name: 'Horse', portuguese: 'Cavalo', emoji: '🐴', sound: 'Neigh' },
        { name: 'Chicken', portuguese: 'Galinha', emoji: '🐔', sound: 'Cluck' },
        { name: 'Duck', portuguese: 'Pato', emoji: '🦆', sound: 'Quack' }
    ];

    const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

    const currentAnimal = animals[currentAnimalIndex];
    const shuffledAnimals = [...animals].sort(() => Math.random() - 0.5);

    const playAnimalSound = () => {
        // Usando Web Speech API para falar o nome do animal
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(currentAnimal.name);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };

    const handleAnimalSelect = (selectedAnimalName) => {
        setSelectedAnimal(selectedAnimalName);
        const correct = selectedAnimalName === currentAnimal.name;
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setScore(score + 1);
        }

        setTimeout(() => {
            setShowFeedback(false);
            setSelectedAnimal(null);

            if (currentAnimalIndex < animals.length - 1) {
                setCurrentAnimalIndex(currentAnimalIndex + 1);
            } else {
                setGameCompleted(true);
            }
        }, 2000);
    };

    const resetGame = () => {
        setCurrentAnimalIndex(0);
        setSelectedAnimal(null);
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
                        Você acertou {score} de {animals.length} animais!
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
                    <h2 className="text-subtitle">Animais da Fazenda</h2>
                    <p className="text-body">
                        {currentAnimalIndex + 1} de {animals.length}
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
                    style={{ width: `${((currentAnimalIndex + 1) / animals.length) * 100}%` }}
                ></div>
            </div>

            {/* Área Principal da Atividade */}
            <div className="activity-card max-w-2xl mx-auto text-center">
                <h3 className="text-title mb-4">Qual é este animal em inglês?</h3>

                {/* Animal a ser identificado */}
                <div className="mb-6">
                    <div className="text-8xl mb-4">{currentAnimal.emoji}</div>
                    <p className="text-subtitle text-gray-600 mb-2">
                        {currentAnimal.portuguese}
                    </p>
                    <p className="text-body text-gray-500 mb-4">
                        Som: "{currentAnimal.sound}"
                    </p>
                    <button
                        className="big-button star-button mt-2 flex items-center gap-2 mx-auto"
                        onClick={playAnimalSound}
                    >
                        <Volume2 className="icon-medium" />
                        Ouvir
                    </button>
                </div>

                {/* Opções de Resposta */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {shuffledAnimals.map((animal) => (
                        <button
                            key={animal.name}
                            className={`activity-card p-4 text-center transition-all ${selectedAnimal === animal.name
                                    ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                                    : 'hover:border-blue-500'
                                }`}
                            onClick={() => handleAnimalSelect(animal.name)}
                            disabled={showFeedback}
                        >
                            <div className="text-4xl mb-2">{animal.emoji}</div>
                            <p className="text-body font-semibold">{animal.name}</p>
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
                                ? `Muito bem! "${currentAnimal.name}" está correto!`
                                : `Ops! A resposta correta é "${currentAnimal.name}"`
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimalActivity;
