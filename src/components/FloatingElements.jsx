import React from 'react';

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Nuvens Flutuantes */}
      <div className="absolute text-4xl opacity-30 animate-bounce" style={{ top: '10%', left: '10%', animationDelay: '0s' }}>☁️</div>
      <div className="absolute text-4xl opacity-30 animate-bounce" style={{ top: '20%', right: '15%', animationDelay: '2s' }}>☁️</div>
      <div className="absolute text-4xl opacity-30 animate-bounce" style={{ top: '60%', left: '5%', animationDelay: '4s' }}>☁️</div>
      
      {/* Estrelas Cintilantes */}
      <div className="absolute text-2xl opacity-40 animate-pulse" style={{ top: '15%', left: '20%', animationDelay: '0s' }}>⭐</div>
      <div className="absolute text-2xl opacity-40 animate-pulse" style={{ top: '25%', right: '25%', animationDelay: '1s' }}>⭐</div>
      <div className="absolute text-2xl opacity-40 animate-pulse" style={{ top: '45%', left: '80%', animationDelay: '2s' }}>⭐</div>
      <div className="absolute text-2xl opacity-40 animate-pulse" style={{ top: '65%', right: '30%', animationDelay: '0.5s' }}>⭐</div>
      <div className="absolute text-2xl opacity-40 animate-pulse" style={{ top: '80%', left: '15%', animationDelay: '1.5s' }}>⭐</div>
    </div>
  );
};

export default FloatingElements;

