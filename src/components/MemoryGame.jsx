import React, { useState, useEffect } from 'react';
import { RotateCcw, Star, Timer, Trophy } from 'lucide-react';
import '../App.css';

const MemoryGame = ({ onComplete, onBack }) => {
    const gameCards = [
        { id: 1, english: 'Red', portuguese: 'Vermelho', color: '#FF0000' },
        { id: 2, english: 'Blue', portuguese: 'Azul', color: '#0000FF' },
        { id: 3, english: 'Green', portuguese: 'Verde', color: '#00FF00' },
        { id: 4, english: 'Yellow', portuguese: 'Amarelo', color: '#FFFF00' },
        { id: 5, english: 'Orange', portuguese: 'Laranja', color: '#FFA500' },
        { id: 6, english: 'Purple', portuguese: 'Roxo', color: '#800080' },
        { id: 7, english: 'Black', portuguese: 'Preto', color: '#000000' },
        { id: 8, english: 'White', portuguese: 'Branco', color: '#FFFFFF' },
        { id: 9, english: 'Pink', portuguese: 'Rosa', color: '#FFC0CB' },
        { id: 10, english: 'Brown', portuguese: 'Marrom', color: '#A52A2A' }

    ];

    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [moves, setMoves] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    // Criar pares de cartas (inglês + português)
    const createCards = () => {
        const pairs = [];
        gameCards.forEach(card => {
            pairs.push({ ...card, type: 'english', value: card.english, pairId: card.id });
            pairs.push({ ...card, type: 'portuguese', value: card.portuguese, pairId: card.id });
        });
        return pairs.sort(() => Math.random() - 0.5);
    };

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
        setCards(createCards());
        setFlippedCards([]);
        setMatchedPairs([]);
        setMoves(0);
        setTimeElapsed(0);
        setGameStarted(false);
        setGameCompleted(false);
        setIsChecking(false);
    };

    useEffect(() => {
        initializeGame();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Verificar se o jogo está completo
    useEffect(() => {
        if (matchedPairs.length === gameCards.length && gameStarted) {
            setGameCompleted(true);
        }
    }, [matchedPairs.length, gameStarted]); // eslint-disable-line react-hooks/exhaustive-deps

    // Lidar com clique na carta
    const handleCardClick = (index) => {
        if (!gameStarted) {
            setGameStarted(true);
        }

        if (
            isChecking ||
            flippedCards.includes(index) ||
            matchedPairs.some(pair => pair.includes(index))
        ) {
            return;
        }

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setIsChecking(true);
            setMoves(prev => prev + 1);

            const [first, second] = newFlippedCards;
            const firstCard = cards[first];
            const secondCard = cards[second];

            setTimeout(() => {
                if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
                    // Par encontrado!
                    setMatchedPairs(prev => [...prev, newFlippedCards]);

                    // Falar as palavras do par
                    if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance(firstCard.english);
                        utterance.lang = 'en-US';
                        utterance.rate = 0.8;
                        speechSynthesis.speak(utterance);
                    }
                }
                setFlippedCards([]);
                setIsChecking(false);
            }, 1000);
        }
    };

    // Calcular pontuação
    const calculateScore = () => {
        const baseScore = matchedPairs.length * 10;
        const timeBonus = Math.max(0, 60 - timeElapsed); // Bonus por tempo
        const movesPenalty = Math.max(0, moves - 12) * 2; // Penalidade por muitos movimentos
        return Math.max(0, baseScore + timeBonus - movesPenalty);
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
                    <p className="text-subtitle mb-4">
                        Você completou o jogo da memória!
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="activity-card text-center">
                            <Timer className="icon-medium text-blue-500 mx-auto mb-2" />
                            <div className="text-subtitle">{formatTime(timeElapsed)}</div>
                            <div className="text-body text-gray-600">Tempo</div>
                        </div>
                        <div className="activity-card text-center">
                            <Trophy className="icon-medium text-green-500 mx-auto mb-2" />
                            <div className="text-subtitle">{moves}</div>
                            <div className="text-body text-gray-600">Movimentos</div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center mb-6">
                        {[...Array(Math.min(3, Math.floor(score / 20)))].map((_, i) => (
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
                    <h2 className="text-subtitle">Jogo da Memória - Cores</h2>
                    <p className="text-body">Encontre os pares em inglês e português</p>
                </div>
                <button
                    className="big-button star-button"
                    onClick={initializeGame}
                >
                    <RotateCcw className="icon-medium" />
                </button>
            </div>

            {/* Estatísticas do Jogo */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="activity-card text-center">
                    <Timer className="icon-medium text-blue-500 mx-auto mb-2" />
                    <div className="text-subtitle">{formatTime(timeElapsed)}</div>
                    <div className="text-body text-gray-600">Tempo</div>
                </div>
                <div className="activity-card text-center">
                    <Trophy className="icon-medium text-green-500 mx-auto mb-2" />
                    <div className="text-subtitle">{moves}</div>
                    <div className="text-body text-gray-600">Movimentos</div>
                </div>
                <div className="activity-card text-center">
                    <Star className="icon-medium text-yellow-500 mx-auto mb-2" />
                    <div className="text-subtitle">{matchedPairs.length}/{gameCards.length}</div>
                    <div className="text-body text-gray-600">Pares</div>
                </div>
            </div>

            {/* Tabuleiro do Jogo */}
            <div className="activity-card max-w-4xl mx-auto">
                <div className="grid grid-cols-4 gap-4">
                    {cards.map((card, index) => {
                        const isFlipped = flippedCards.includes(index);
                        const isMatched = matchedPairs.some(pair => pair.includes(index));
                        const showCard = isFlipped || isMatched;

                        return (
                            <div
                                key={index}
                                className={`
                                    aspect-square rounded-lg border-2 cursor-pointer
                                    transition-all duration-300 transform
                                    ${showCard
                                        ? (isMatched ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-blue-50')
                                        : 'border-gray-300 bg-gray-100 hover:bg-gray-200 hover:scale-105'
                                    }
                                    ${isChecking ? 'pointer-events-none' : ''}
                                `}
                                onClick={() => handleCardClick(index)}
                            >
                                <div className="h-full flex flex-col items-center justify-center p-2">
                                    {showCard ? (
                                        <>
                                            {card.type === 'english' && (
                                                <div
                                                    className="w-8 h-8 rounded-full mb-2"
                                                    style={{ backgroundColor: card.color }}
                                                ></div>
                                            )}
                                            <div className={`text-center ${card.type === 'english' ? 'text-lg font-bold' : 'text-base'}`}>
                                                {card.value}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {card.type === 'english' ? 'EN' : 'PT'}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-4xl">❓</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Instruções */}
                <div className="mt-6 text-center">
                    <p className="text-body text-gray-600">
                        Clique nas cartas para encontrar os pares de cores em inglês e português
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MemoryGame;
