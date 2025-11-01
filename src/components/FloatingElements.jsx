import React from 'react';
import '../App.css';

const FloatingElements = () => {
  const clouds = [
    { id: 1, top: '10%', left: '10%', delay: '0s' },
    { id: 2, top: '20%', right: '15%', delay: '2s' },
    { id: 3, top: '60%', left: '5%', delay: '4s' },
    { id: 4, top: '70%', right: '10%', delay: '1s' }
  ];

  const stars = [
    { id: 1, top: '15%', left: '20%', delay: '0s' },
    { id: 2, top: '25%', right: '25%', delay: '1s' },
    { id: 3, top: '45%', left: '80%', delay: '2s' },
    { id: 4, top: '65%', right: '30%', delay: '0.5s' },
    { id: 5, top: '80%', left: '15%', delay: '1.5s' }
  ];

  return (
    <div className="floating-elements">
      {/* Nuvens Flutuantes */}
      {clouds.map((cloud) => (
        <div
          key={`cloud-${cloud.id}`}
          className="floating-cloud"
          style={{
            top: cloud.top,
            left: cloud.left,
            right: cloud.right,
            animationDelay: cloud.delay,
            fontSize: '2rem'
          }}
        >
          ☁️
        </div>
      ))}

      {/* Estrelas Cintilantes */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="floating-star"
          style={{
            top: star.top,
            left: star.left,
            right: star.right,
            animationDelay: star.delay,
            fontSize: '1.5rem'
          }}
        >
          ⭐
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;

