import React from 'react';
// Importa os ícones que vamos usar
import { 
  FaHome, 
  FaBook, 
  FaMusic, 
  FaGamepad, 
  FaTrophy, 
  FaCog 
} from 'react-icons/fa'; // Biblioteca 'react-icons/fa' (Font Awesome)
import '../App.css';

// Mapeia os IDs das abas para os componentes de ícone
const navIcons = {
  'home': FaHome,
  'lessons': FaBook,
  'songs': FaMusic,
  'games': FaGamepad,
  'achievements': FaTrophy,
  'settings': FaCog
};

const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Início' },
    { id: 'lessons', label: 'Lições' },
    { id: 'songs', label: 'Músicas' },
    { id: 'games', label: 'Jogos' },
    { id: 'achievements', label: 'Conquistas' },
    { id: 'settings', label: 'Config.' },
  ];

  return (
    // Esta classe 'footer-nav' já está no seu App.css e override.css
    <div className="footer-nav">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          // Pega o ícone correspondente
          const IconComponent = navIcons[tab.id]; 
          
          return (
            <div
              key={tab.id}
              // A classe 'active' já está no seu App.css
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {/* Renderiza o ícone profissional */}
              {IconComponent && <IconComponent className="icon-medium" />} 
              
              <span className="text-xs font-semibold">{tab.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;