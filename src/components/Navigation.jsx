import React from 'react';
import { Home, BookOpen, Music, Gamepad2, Trophy, Settings } from 'lucide-react';
import '../App.css';

const Navigation = ({ activeTab = 'home', onTabChange }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'lessons', icon: BookOpen, label: 'Lições' },
    { id: 'songs', icon: Music, label: 'Músicas' },
    { id: 'games', icon: Gamepad2, label: 'Jogos' },
    { id: 'achievements', icon: Trophy, label: 'Conquistas' },
    { id: 'settings', icon: Settings, label: 'Config.' }
  ];

  return (
    <div className="footer-nav">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <IconComponent className="icon-large" />
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;

