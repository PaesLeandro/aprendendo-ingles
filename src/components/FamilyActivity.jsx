import React, { useState } from 'react';
import { Volume2, Star, RotateCcw, CheckCircle } from 'lucide-react';
import '../App.css';

const FamilyActivity = ({ onComplete, onBack }) => {
    const familyMembers = [
        { name: 'Father', portuguese: 'Pai', emoji: '👨', description: 'Papai' },
        { name: 'Mother', portuguese: 'Mãe', emoji: '👩', description: 'Mamãe' },
        { name: 'Son', portuguese: 'Filho', emoji: '👦', description: 'Menino da família' },
        { name: 'Daughter', portuguese: 'Filha', emoji: '👧', description: 'Menina da família' },
        { name: 'Grandfather', portuguese: 'Avô', emoji: '👴', description: 'Vovô' },
        { name: 'Grandmother', portuguese: 'Avó', emoji: '👵', description: 'Vovó' }
    ];

    const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
    const [selectedMember, setSelectedMember] = useState(null);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

    const currentMember = familyMembers[currentMemberIndex];
    const shuffledMembers = [...familyMembers].sort(() => Math.random() - 0.5).slice(0, 4);

    // Garantir que a resposta correta esteja sempre nas opções
    if (!shuffledMembers.find(m => m.name === currentMember.name)) {
        shuffledMembers[Math.floor(Math.random() * 4)] = currentMember;
    }

    const playMemberSound = () => {
        // Usando Web Speech API para falar o membro da família
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(currentMember.name);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };

    const handleMemberSelect = (selectedMemberName) => {
        setSelectedMember(selectedMemberName);
        const correct = selectedMemberName === currentMember.name;
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setScore(score + 1);
        }

        setTimeout(() => {
            setShowFeedback(false);
            setSelectedMember(null);

            if (currentMemberIndex < familyMembers.length - 1) {
                setCurrentMemberIndex(currentMemberIndex + 1);
            } else {
                setGameCompleted(true);
            }
        }, 2000);
    };

    const resetGame = () => {
        setCurrentMemberIndex(0);
        setSelectedMember(null);
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
                        Você acertou {score} de {familyMembers.length} membros da família!
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
                    <h2 className="text-subtitle">Família</h2>
                    <p className="text-body">
                        {currentMemberIndex + 1} de {familyMembers.length}
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
                    style={{ width: `${((currentMemberIndex + 1) / familyMembers.length) * 100}%` }}
                ></div>
            </div>

            {/* Área Principal da Atividade */}
            <div className="activity-card max-w-2xl mx-auto text-center">
                <h3 className="text-title mb-4">Quem é este membro da família em inglês?</h3>

                {/* Membro da família a ser identificado */}
                <div className="mb-6">
                    <div className="text-8xl mb-4">{currentMember.emoji}</div>
                    <p className="text-subtitle text-gray-600 mb-2">
                        {currentMember.portuguese}
                    </p>
                    <p className="text-body text-gray-500 mb-4">
                        "{currentMember.description}"
                    </p>
                    <button
                        className="big-button star-button mt-2 flex items-center gap-2 mx-auto"
                        onClick={playMemberSound}
                    >
                        <Volume2 className="icon-medium" />
                        Ouvir
                    </button>
                </div>

                {/* Opções de Resposta */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {shuffledMembers.map((member) => (
                        <button
                            key={member.name}
                            className={`activity-card p-4 text-center transition-all ${selectedMember === member.name
                                    ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                                    : 'hover:border-blue-500'
                                }`}
                            onClick={() => handleMemberSelect(member.name)}
                            disabled={showFeedback}
                        >
                            <div className="text-4xl mb-2">{member.emoji}</div>
                            <p className="text-body font-semibold">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.portuguese}</p>
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
                                ? `Muito bem! "${currentMember.name}" está correto!`
                                : `Ops! A resposta correta é "${currentMember.name}"`
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FamilyActivity;
