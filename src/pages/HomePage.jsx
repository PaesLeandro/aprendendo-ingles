import React from 'react';

export default function HomePage({ onActivityStart }) {
  const activities = [
    { id: 'colors', title: '🎨 Cores', desc: 'Aprender cores em inglês' },
    { id: 'animals', title: '🐕 Animais', desc: 'Animais da fazenda' },
    { id: 'numbers', title: '🔢 Números', desc: 'Contar de 1 a 10' },
    { id: 'word-puzzle', title: '🧩 Palavras', desc: 'Quebra-cabeça de palavras' },
    { id: 'memory-game', title: '🧠 Memória', desc: 'Jogo da memória' },
    { id: 'spelling-bee', title: '🐝 Soletração', desc: 'Concurso de soletração' }
  ];

  // Função de teste direta
  // Função para iniciar atividade (mantém alerta de teste e chama onActivityStart)
  const startActivity = (activityId) => {
    // aviso de debug leve (não usa console.log para evitar linter)
    console.warn && console.warn('startActivity:', activityId);
    alert('Botão funcionando! Atividade: ' + activityId);
    if (onActivityStart) {
      onActivityStart(activityId);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Little English Explorer
      </h1>
      
      <div className="grid grid-cols-2 gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">{activity.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{activity.desc}</p>
            <button 
              className="w-full bg-purple-500 text-white py-2 rounded font-bold hover:bg-purple-600"
              onClick={() => startActivity(activity.id)}
              type="button"
            >
              JOGAR
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

