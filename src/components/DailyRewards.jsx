import React, { useState, useEffect } from 'react';
import { Gift, Calendar, Star, Clock, Trophy, CheckCircle } from 'lucide-react';
import '../App.css';

const DailyRewards = ({ onClaimReward, onClose }) => {
    const [currentDay, setCurrentDay] = useState(1);
    const [claimedDays, setClaimedDays] = useState([]);
    const [canClaim, setCanClaim] = useState(true);
    const [showRewardAnimation, setShowRewardAnimation] = useState(false);
    const [claimedReward, setClaimedReward] = useState(null);

    const dailyRewards = [
        { day: 1, type: 'stars', amount: 5, icon: '⭐', title: '5 Estrelas' },
        { day: 2, type: 'badge', item: 'Primeiro Dia', icon: '🎯', title: 'Badge Iniciante' },
        { day: 3, type: 'stars', amount: 10, icon: '⭐', title: '10 Estrelas' },
        { day: 4, type: 'unlock', item: 'Tema Especial', icon: '🎨', title: 'Tema Arco-íris' },
        { day: 5, type: 'stars', amount: 15, icon: '⭐', title: '15 Estrelas' },
        { day: 6, type: 'badge', item: 'Persistente', icon: '🔥', title: 'Badge Persistente' },
        { day: 7, type: 'mega', item: 'Recompensa Especial', icon: '🏆', title: '50 Estrelas + Badge Lendário' }
    ];

    useEffect(() => {
        // Simular dados salvos
        const savedProgress = localStorage.getItem('dailyRewardsProgress');
        if (savedProgress) {
            const data = JSON.parse(savedProgress);
            setCurrentDay(data.currentDay || 1);
            setClaimedDays(data.claimedDays || []);
        }

        // Verificar se pode resgatar hoje
        const lastClaim = localStorage.getItem('lastRewardClaim');
        const today = new Date().toDateString();
        setCanClaim(lastClaim !== today);
    }, []);

    const claimReward = (day) => {
        if (!canClaim || claimedDays.includes(day)) return;

        const reward = dailyRewards.find(r => r.day === day);
        setClaimedReward(reward);
        setShowRewardAnimation(true);

        // Adicionar ao histórico de dias resgatados
        const newClaimedDays = [...claimedDays, day];
        setClaimedDays(newClaimedDays);

        // Avançar para o próximo dia se for o dia atual
        if (day === currentDay && currentDay < 7) {
            setCurrentDay(prev => prev + 1);
        } else if (day === 7) {
            // Reset semanal
            setCurrentDay(1);
            setClaimedDays([]);
        }

        // Salvar progresso
        const progressData = {
            currentDay: day === 7 ? 1 : (day === currentDay ? currentDay + 1 : currentDay),
            claimedDays: day === 7 ? [] : newClaimedDays
        };
        localStorage.setItem('dailyRewardsProgress', JSON.stringify(progressData));
        localStorage.setItem('lastRewardClaim', new Date().toDateString());

        setCanClaim(false);

        // Callback para atualizar estado principal
        if (onClaimReward) {
            onClaimReward(reward);
        }

        // Esconder animação após 3 segundos
        setTimeout(() => {
            setShowRewardAnimation(false);
        }, 3000);
    };

    const getRewardStatus = (day) => {
        if (claimedDays.includes(day)) return 'claimed';
        if (day === currentDay && canClaim) return 'available';
        if (day < currentDay) return 'missed';
        return 'locked';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'claimed': return 'bg-green-100 border-green-500 text-green-700';
            case 'available': return 'bg-yellow-100 border-yellow-500 text-yellow-700 animate-pulse';
            case 'missed': return 'bg-red-100 border-red-500 text-red-700';
            case 'locked': return 'bg-gray-100 border-gray-300 text-gray-500';
            default: return 'bg-gray-100 border-gray-300 text-gray-500';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Gift className="icon-large" />
                            <div>
                                <h2 className="text-title">Recompensas Diárias</h2>
                                <p className="text-body opacity-90">
                                    Entre todos os dias para ganhar prêmios incríveis!
                                </p>
                            </div>
                        </div>
                        <button
                            className="big-button secondary-button"
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Streak Info */}
                <div className="p-6 bg-blue-50">
                    <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                            <Calendar className="icon-large text-blue-600 mx-auto mb-2" />
                            <div className="text-subtitle">Dia {currentDay}</div>
                            <div className="text-body text-gray-600">Sequência Atual</div>
                        </div>
                        <div className="text-center">
                            <Clock className="icon-large text-green-600 mx-auto mb-2" />
                            <div className="text-subtitle">{canClaim ? 'Disponível' : 'Resgatado'}</div>
                            <div className="text-body text-gray-600">Status de Hoje</div>
                        </div>
                        <div className="text-center">
                            <Trophy className="icon-large text-yellow-600 mx-auto mb-2" />
                            <div className="text-subtitle">{claimedDays.length}/7</div>
                            <div className="text-body text-gray-600">Esta Semana</div>
                        </div>
                    </div>
                </div>

                {/* Rewards Grid */}
                <div className="p-6">
                    <h3 className="text-subtitle mb-6 text-center">Recompensas da Semana</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {dailyRewards.map((reward) => {
                            const status = getRewardStatus(reward.day);
                            const isAvailable = status === 'available';
                            const isClaimed = status === 'claimed';

                            return (
                                <div
                                    key={reward.day}
                                    className={`relative activity-card text-center cursor-pointer transition-all transform hover:scale-105 ${getStatusColor(status)
                                        } ${isAvailable ? 'ring-2 ring-yellow-400' : ''}`}
                                    onClick={() => isAvailable && claimReward(reward.day)}
                                >
                                    {/* Dia */}
                                    <div className="text-sm font-bold mb-2">Dia {reward.day}</div>

                                    {/* Ícone */}
                                    <div className="text-4xl mb-2">{reward.icon}</div>

                                    {/* Título */}
                                    <div className="text-sm font-semibold mb-1">{reward.title}</div>

                                    {/* Status */}
                                    <div className="text-xs">
                                        {isClaimed && <CheckCircle className="icon-small mx-auto text-green-600" />}
                                        {isAvailable && <span className="font-bold">CLICAR!</span>}
                                        {status === 'missed' && <span>Perdido</span>}
                                        {status === 'locked' && <span>Bloqueado</span>}
                                    </div>

                                    {/* Badge especial para dia 7 */}
                                    {reward.day === 7 && (
                                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            MEGA
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="px-6 pb-6">
                    <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-500"
                            style={{ width: `${(claimedDays.length / 7) * 100}%` }}
                        ></div>
                    </div>
                    <div className="text-center mt-2 text-body text-gray-600">
                        Progresso da Semana: {claimedDays.length}/7 recompensas
                    </div>
                </div>

                {/* Regras */}
                <div className="px-6 pb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="text-body font-bold mb-2">📋 Como Funciona:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Entre no app todos os dias para resgatar sua recompensa</li>
                            <li>• Perca um dia e sua sequência será reiniciada</li>
                            <li>• Complete 7 dias seguidos para ganhar a recompensa MEGA</li>
                            <li>• As recompensas são creditadas automaticamente na sua conta</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Animação de Recompensa */}
            {showRewardAnimation && claimedReward && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
                    <div className="bg-white rounded-2xl p-8 text-center max-w-md animate-bounce">
                        <div className="text-8xl mb-4">{claimedReward.icon}</div>
                        <h3 className="text-title mb-2 text-green-600">Recompensa Recebida!</h3>
                        <p className="text-subtitle mb-4">{claimedReward.title}</p>
                        <div className="flex justify-center gap-2">
                            {[...Array(3)].map((_, i) => (
                                <Star key={i} className="icon-large text-yellow-500 fill-current animate-spin" />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailyRewards;
