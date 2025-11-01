import React from 'react';
import { Play, Lock, CheckCircle } from 'lucide-react';
import '../App.css';

const ActivityCard = ({ 
  title, 
  description, 
  icon, 
  difficulty = 1, 
  isCompleted = false, 
  isLocked = false,
  progress = 0,
  onClick 
}) => {
  const getDifficultyColor = (level) => {
    switch(level) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (level) => {
    switch(level) {
      case 1: return 'Fácil';
      case 2: return 'Médio';
      case 3: return 'Difícil';
      default: return 'Básico';
    }
  };

  return (
    <div 
      className={`activity-card ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={!isLocked ? onClick : undefined}
    >
      {/* Cabeçalho do Card */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{icon}</div>
          <div>
            <h3 className="text-subtitle">{title}</h3>
            <p className="text-body text-gray-600">{description}</p>
          </div>
        </div>
        
        {/* Status do Card */}
        <div className="flex flex-col items-end gap-2">
          {isCompleted && (
            <CheckCircle className="icon-medium text-green-500 fill-current" />
          )}
          {isLocked && (
            <Lock className="icon-medium text-gray-400" />
          )}
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(difficulty)}`}>
            {getDifficultyText(difficulty)}
          </span>
        </div>
      </div>

      {/* Barra de Progresso */}
      {!isLocked && progress > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progresso</span>
            <span className="text-sm font-semibold">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {/* Botão de Ação */}
      {!isLocked && (
        <button className="big-button primary-button w-full flex items-center justify-center gap-2">
          <Play className="icon-medium" />
          {isCompleted ? 'Jogar Novamente' : 'Começar'}
        </button>
      )}

      {isLocked && (
        <div className="text-center py-4">
          <p className="text-body text-gray-500">Complete as atividades anteriores para desbloquear</p>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;

