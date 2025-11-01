import React, { useState } from 'react';
import { Gamepad2, Play, Star, Trophy, Clock } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import '../App.css';

const GamesPage = ({ onActivityStart }) => {
    const games = [
        {
            id: 'memory-colors',
            title: 'Jogo da Memória - Cores',
            description: 'Encontre os pares de cores em inglês',
            icon: '🎨',
            difficulty: 1,
            progress: 0,
            isCompleted: false,
            isLocked: false,
            category: 'Memória',
            players: '1 jogador',
            duration: '5-10 min'
        },
        {
            id: 'word-puzzle',
            title: 'Quebra-cabeça de Palavras',
            description: 'Monte palavras em inglês com as letras embaralhadas',
            icon: '🧩',
            difficulty: 2,
            progress: 30,
            isCompleted: false,
            isLocked: false,
            category: 'Puzzle',
            players: '1 jogador',
            duration: '10-15 min'
        },
        {
            id: 'animal-sounds',
            title: 'Adivinhe o Som do Animal',
            description: 'Ouça o som e descubra qual animal é',
            icon: '🔊',
            difficulty: 1,
            progress: 100,
            isCompleted: true,
            isLocked: false,
            category: 'Áudio',
            players: '1 jogador',
            duration: '5-8 min'
        },
        {
            id: 'spelling-bee',
            title: 'Concurso de Soletração',
            description: 'Soletre palavras em inglês corretamente',
            icon: '📝',
            difficulty: 3,
            progress: 0,
            isCompleted: false,
            isLocked: true,
            category: 'Soletração',
            players: '1 jogador',
            duration: '15-20 min'
        },
        {
            id: 'matching-game',
            title: 'Jogo de Correspondência',
            description: 'Conecte palavras em inglês com suas imagens',
            icon: '🔗',
            difficulty: 2,
            progress: 60,
            isCompleted: false,
            isLocked: false,
            category: 'Correspondência',
            players: '1 jogador',
            duration: '8-12 min'
        },
        {
            id: 'quiz-master',
            title: 'Quiz Master',
            description: 'Responda perguntas sobre tudo que aprendeu',
            icon: '🧠',
            difficulty: 3,
            progress: 0,
            isCompleted: false,
            isLocked: true,
            category: 'Quiz',
            players: '1-4 jogadores',
            duration: '20-30 min'
        }
    ];

    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const categories = ['Todos', 'Memória', 'Puzzle', 'Áudio', 'Soletração', 'Correspondência', 'Quiz'];

    const filteredGames = selectedCategory === 'Todos'
        ? games
        : games.filter(game => game.category === selectedCategory);

    const completedGames = games.filter(game => game.isCompleted).length;
    const totalPlayTime = games.reduce((total, game) => {
        const avgTime = parseInt(game.duration.split('-')[0]);
        return total + (game.isCompleted ? avgTime : 0);
    }, 0);

    const handleGameClick = (gameId) => {
        const game = games.find(g => g.id === gameId);
        if (!game.isLocked && onActivityStart) {
            onActivityStart(gameId);
        }
    };

    return (
        <div className="content-wrapper p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <Gamepad2 className="icon-large text-green-600" />
                    <div>
                        <h2 className="text-title">Jogos Educativos</h2>
                        <p className="text-body text-gray-600">
                            Aprenda inglês brincando com jogos divertidos e interativos
                        </p>
                    </div>
                </div>
            </div>

            {/* Estatísticas Rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">🎮</div>
                    <div className="text-subtitle">{games.length}</div>
                    <div className="text-body text-gray-600">Jogos disponíveis</div>
                </div>

                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-subtitle">{completedGames}</div>
                    <div className="text-body text-gray-600">Completados</div>
                </div>

                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">⏱️</div>
                    <div className="text-subtitle">{totalPlayTime}min</div>
                    <div className="text-body text-gray-600">Tempo jogando</div>
                </div>

                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-subtitle">8</div>
                    <div className="text-body text-gray-600">Troféus ganhos</div>
                </div>
            </div>

            {/* Jogo em Destaque */}
            <div className="mb-8">
                <h3 className="text-subtitle mb-4">Jogo Recomendado</h3>
                <div className="activity-card">
                    <div className="flex items-center gap-6">
                        <div className="text-6xl">{games[1].icon}</div>
                        <div className="flex-1">
                            <h4 className="text-subtitle mb-2">{games[1].title}</h4>
                            <p className="text-body text-gray-600 mb-3">{games[1].description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                <span className="flex items-center gap-1">
                                    <Trophy className="w-4 h-4" />
                                    {games[1].category}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {games[1].duration}
                                </span>
                                <span>👤 {games[1].players}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Progresso:</span>
                                <div className="progress-bar flex-1 max-w-xs">
                                    <div className="progress-fill" style={{ width: `${games[1].progress}%` }}></div>
                                </div>
                                <span className="text-sm font-semibold">{games[1].progress}%</span>
                            </div>
                        </div>
                        <button
                            className="big-button primary-button flex items-center gap-2"
                            onClick={() => handleGameClick(games[1].id)}
                        >
                            <Play className="icon-medium" />
                            Jogar
                        </button>
                    </div>
                </div>
            </div>

            {/* Filtros de Categoria */}
            <div className="mb-8">
                <h3 className="text-subtitle mb-4">Filtrar por Categoria</h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedCategory === category
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Lista de Jogos */}
            <div className="mb-8">
                <h3 className="text-subtitle mb-4">
                    {selectedCategory === 'Todos' ? 'Todos os Jogos' : `Jogos de ${selectedCategory}`}
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredGames.map((game) => (
                        <div key={game.id} className="relative">
                            <ActivityCard
                                {...game}
                                onClick={() => handleGameClick(game.id)}
                            />

                            {/* Badge de Categoria */}
                            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                {game.category}
                            </div>

                            {/* Informações Extras */}
                            <div className="absolute bottom-16 left-4 right-4 text-xs text-gray-500">
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {game.duration}
                                    </span>
                                    <span>{game.players}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Conquistas Recentes */}
            <div className="activity-card">
                <h3 className="text-subtitle mb-4">Conquistas Recentes</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                        <Star className="icon-medium text-yellow-500 fill-current" />
                        <div>
                            <p className="text-body font-semibold">Primeira Vitória!</p>
                            <p className="text-sm text-gray-600">Completou seu primeiro jogo</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Trophy className="icon-medium text-green-500" />
                        <div>
                            <p className="text-body font-semibold">Mestre dos Sons</p>
                            <p className="text-sm text-gray-600">100% no jogo de sons de animais</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamesPage;
