import React, { useState } from 'react';
import { Star, Settings, User, Gift } from 'lucide-react';
import buddyImage from '../assets/mascot_buddy.png';
import DailyRewards from './DailyRewards';
import '../App.css';

const Header = ({ userName = "Pequeno Explorador", stars = 15, level = 3, onUpdateStats }) => {
  const [showDailyRewards, setShowDailyRewards] = useState(false);

  const handleClaimReward = (reward) => {
    // Atualizar estatísticas baseado na recompensa
    if (reward.type === 'stars' && onUpdateStats) {
      onUpdateStats(prev => ({
        ...prev,
        stars: prev.stars + reward.amount
      }));
    }
  };
  return (
    <div className="header-section">
      <div className="flex items-center justify-between">
        {/* Logo e Mascote */}
        <div className="flex items-center gap-4">
          <img
            src={buddyImage}
            alt="Buddy - Mascote do Little English Explorer"
            className="mascot-buddy"
          />
          <div>
            <h1 className="text-title">Little English Explorer</h1>
            <p className="text-body">Olá, {userName}! 👋</p>
          </div>
        </div>

        {/* Progresso e Configurações */}
        <div className="flex items-center gap-6">
          {/* Recompensas Diárias */}
          <button
            className="nav-item relative"
            onClick={() => setShowDailyRewards(true)}
          >
            <Gift className="icon-medium text-red-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              !
            </span>
          </button>

          {/* Estrelas */}
          <div className="flex items-center gap-2">
            <Star className="icon-medium text-yellow-500 fill-current" />
            <span className="text-subtitle">{stars}</span>
          </div>

          {/* Nível */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-2 rounded-full">
              <span className="text-body font-bold">Nível {level}</span>
            </div>
          </div>

          {/* Configurações */}
          <button className="nav-item">
            <Settings className="icon-medium" />
          </button>

          {/* Perfil */}
          <button className="nav-item">
            <User className="icon-medium" />
          </button>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-body">Progresso do Nível {level}</span>
          <span className="text-body">75%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '75%' }}></div>
        </div>
      </div>

      {/* Modal de Recompensas Diárias */}
      {showDailyRewards && (
        <DailyRewards
          onClaimReward={handleClaimReward}
          onClose={() => setShowDailyRewards(false)}
        />
      )}
    </div>
  );
};

export default Header;

