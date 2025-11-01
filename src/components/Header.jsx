import React from 'react';

const Header = ({ userName = "Pequeno Explorador", stars = 15, level = 3 }) => {
  return (
    <div className="bg-white shadow-lg p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-2xl">🧸</div>
          <div>
            <h1 className="text-xl font-bold">Little English Explorer</h1>
            <p className="text-sm text-gray-600">Olá, {userName}! Vamos aprender?</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500">⭐</span>
            <span className="font-bold">{stars}</span>
          </div>
          <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Nível {level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

