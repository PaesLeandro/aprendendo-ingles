import React, { useState } from 'react';
import { Trophy, Star, Medal, Award, Calendar, Target } from 'lucide-react';
import '../App.css';

const AchievementsPage = () => {
    const achievements = [
        {
            id: 'first-activity',
            title: 'Primeiro Passo',
            description: 'Complete sua primeira atividade',
            icon: '🎯',
            category: 'Iniciante',
            isUnlocked: true,
            unlockedDate: '2025-08-05',
            points: 50,
            rarity: 'common'
        },
        {
            id: 'color-master',
            title: 'Mestre das Cores',
            description: 'Acerte todas as cores na atividade',
            icon: '🎨',
            category: 'Atividades',
            isUnlocked: true,
            unlockedDate: '2025-08-06',
            points: 100,
            rarity: 'uncommon'
        },
        {
            id: 'animal-expert',
            title: 'Especialista em Animais',
            description: 'Complete a atividade de animais sem erros',
            icon: '🐄',
            category: 'Atividades',
            isUnlocked: false,
            points: 150,
            rarity: 'rare'
        },
        {
            id: 'streak-week',
            title: 'Semana Dedicada',
            description: 'Estude por 7 dias consecutivos',
            icon: '🔥',
            category: 'Consistência',
            isUnlocked: true,
            unlockedDate: '2025-08-08',
            points: 200,
            rarity: 'uncommon'
        },
        {
            id: 'numbers-ninja',
            title: 'Ninja dos Números',
            description: 'Domine todos os números de 1 a 10',
            icon: '🔢',
            category: 'Atividades',
            isUnlocked: false,
            points: 120,
            rarity: 'uncommon'
        },
        {
            id: 'song-star',
            title: 'Estrela da Música',
            description: 'Cante 3 músicas completas',
            icon: '🎵',
            category: 'Músicas',
            isUnlocked: false,
            points: 100,
            rarity: 'common'
        },
        {
            id: 'game-champion',
            title: 'Campeão dos Jogos',
            description: 'Vença 5 jogos diferentes',
            icon: '🏆',
            category: 'Jogos',
            isUnlocked: false,
            points: 250,
            rarity: 'rare'
        },
        {
            id: 'perfect-score',
            title: 'Pontuação Perfeita',
            description: 'Obtenha 100% em qualquer atividade',
            icon: '⭐',
            category: 'Excelência',
            isUnlocked: true,
            unlockedDate: '2025-08-07',
            points: 300,
            rarity: 'epic'
        },
        {
            id: 'early-bird',
            title: 'Madrugador',
            description: 'Estude antes das 8h da manhã',
            icon: '🐦',
            category: 'Especial',
            isUnlocked: false,
            points: 75,
            rarity: 'common'
        },
        {
            id: 'vocabulary-master',
            title: 'Mestre do Vocabulário',
            description: 'Aprenda 50 palavras em inglês',
            icon: '📚',
            category: 'Vocabulário',
            isUnlocked: false,
            points: 500,
            rarity: 'legendary'
        }
    ];

    const [selectedCategory, setSelectedCategory] = useState('Todas');

    const categories = ['Todas', 'Iniciante', 'Atividades', 'Consistência', 'Músicas', 'Jogos', 'Excelência', 'Especial', 'Vocabulário'];

    const filteredAchievements = selectedCategory === 'Todas'
        ? achievements
        : achievements.filter(achievement => achievement.category === selectedCategory);

    const unlockedAchievements = achievements.filter(a => a.isUnlocked);
    const totalPoints = unlockedAchievements.reduce((total, a) => total + a.points, 0);

    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'common': return 'text-gray-600 bg-gray-100';
            case 'uncommon': return 'text-green-600 bg-green-100';
            case 'rare': return 'text-blue-600 bg-blue-100';
            case 'epic': return 'text-purple-600 bg-purple-100';
            case 'legendary': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getRarityName = (rarity) => {
        switch (rarity) {
            case 'common': return 'Comum';
            case 'uncommon': return 'Incomum';
            case 'rare': return 'Raro';
            case 'epic': return 'Épico';
            case 'legendary': return 'Lendário';
            default: return 'Comum';
        }
    };

    return (
        <div className="content-wrapper p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <Trophy className="icon-large text-yellow-600" />
                    <div>
                        <h2 className="text-title">Suas Conquistas</h2>
                        <p className="text-body text-gray-600">
                            Veja todas as suas conquistas e progresso no aprendizado
                        </p>
                    </div>
                </div>
            </div>

            {/* Estatísticas Gerais */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-subtitle">{unlockedAchievements.length}</div>
                    <div className="text-body text-gray-600">Conquistadas</div>
                </div>

                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="text-subtitle">{achievements.length}</div>
                    <div className="text-body text-gray-600">Total disponível</div>
                </div>

                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-subtitle">{totalPoints}</div>
                    <div className="text-body text-gray-600">Pontos ganhos</div>
                </div>

                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">📈</div>
                    <div className="text-subtitle">{Math.round((unlockedAchievements.length / achievements.length) * 100)}%</div>
                    <div className="text-body text-gray-600">Progresso</div>
                </div>
            </div>

            {/* Progresso Geral */}
            <div className="activity-card mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-subtitle">Progresso das Conquistas</h3>
                    <span className="text-body">{unlockedAchievements.length} de {achievements.length}</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Conquista Recente */}
            {unlockedAchievements.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-subtitle mb-4">Conquista Mais Recente</h3>
                    <div className="activity-card">
                        <div className="flex items-center gap-6">
                            <div className="text-6xl">{unlockedAchievements[unlockedAchievements.length - 1].icon}</div>
                            <div className="flex-1">
                                <h4 className="text-subtitle mb-2">{unlockedAchievements[unlockedAchievements.length - 1].title}</h4>
                                <p className="text-body text-gray-600 mb-3">{unlockedAchievements[unlockedAchievements.length - 1].description}</p>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRarityColor(unlockedAchievements[unlockedAchievements.length - 1].rarity)}`}>
                                        {getRarityName(unlockedAchievements[unlockedAchievements.length - 1].rarity)}
                                    </span>
                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {unlockedAchievements[unlockedAchievements.length - 1].unlockedDate}
                                    </span>
                                    <span className="text-sm font-semibold text-yellow-600 flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-current" />
                                        {unlockedAchievements[unlockedAchievements.length - 1].points} pontos
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <Award className="icon-large text-yellow-500 mx-auto mb-2" />
                                <p className="text-sm font-semibold text-yellow-600">Desbloqueada!</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filtros de Categoria */}
            <div className="mb-8">
                <h3 className="text-subtitle mb-4">Filtrar por Categoria</h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedCategory === category
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Lista de Conquistas */}
            <div className="mb-8">
                <h3 className="text-subtitle mb-4">
                    {selectedCategory === 'Todas' ? 'Todas as Conquistas' : `Conquistas de ${selectedCategory}`}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                    {filteredAchievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`activity-card relative ${!achievement.isUnlocked ? 'opacity-60' : ''}`}
                        >
                            {/* Badge de Raridade */}
                            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getRarityColor(achievement.rarity)}`}>
                                {getRarityName(achievement.rarity)}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className={`text-4xl ${!achievement.isUnlocked ? 'grayscale' : ''}`}>
                                    {achievement.isUnlocked ? achievement.icon : '🔒'}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-subtitle mb-1">{achievement.title}</h4>
                                    <p className="text-body text-gray-600 text-sm mb-2">{achievement.description}</p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">{achievement.category}</span>
                                        <span className="text-sm font-semibold text-yellow-600 flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-current" />
                                            {achievement.points} pontos
                                        </span>
                                    </div>

                                    {achievement.isUnlocked && achievement.unlockedDate && (
                                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            Desbloqueada em {achievement.unlockedDate}
                                        </p>
                                    )}
                                </div>

                                {achievement.isUnlocked && (
                                    <Medal className="icon-medium text-yellow-500" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Próximas Conquistas */}
            <div className="activity-card">
                <h3 className="text-subtitle mb-4">Próximas Conquistas</h3>
                <div className="space-y-3">
                    {achievements.filter(a => !a.isUnlocked).slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl opacity-50">{achievement.icon}</div>
                            <div className="flex-1">
                                <h5 className="text-body font-semibold">{achievement.title}</h5>
                                <p className="text-sm text-gray-600">{achievement.description}</p>
                            </div>
                            <div className="text-center">
                                <Target className="icon-medium text-gray-400 mx-auto mb-1" />
                                <p className="text-xs text-gray-500">Em breve</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AchievementsPage;
