import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FloatingElements from './components/FloatingElements';
import HomePage from './pages/HomePage';

// --- NOSSAS NOVAS PÁGINAS ---
import LessonsPage from './pages/LessonsPage'; 
import MusicPage from './pages/MusicPage';   
// -----------------------------

import AnimalActivity from './components/AnimalActivity';
import NumberActivity from './components/NumberActivity';
import WordPuzzle from './components/WordPuzzle';
import MemoryGame from './components/MemoryGame';
import SpellingBee from './components/SpellingBee';
import './App.css';

// Componente de atividade de cores (seu código original)
const ColorActivity = ({ onBack, onComplete }) => {
  // ... (todo o seu código da ColorActivity aqui) ...
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { question: 'Qual é a cor RED em português?', answer: 'Vermelho', options: ['Vermelho', 'Azul', 'Verde'] },
    { question: 'Qual é a cor BLUE em português?', answer: 'Azul', options: ['Amarelo', 'Azul', 'Roxo'] },
    { question: 'Qual é a cor GREEN em português?', answer: 'Verde', options: ['Verde', 'Laranja', 'Vermelho'] },
    // ...etc
  ];

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleFinish = () => {
    onComplete(score);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-purple-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Parabéns!</h2>
          <p className="text-lg mb-4">Você acertou {score} de {questions.length} perguntas!</p>
          <div className="flex space-x-4">
            <button onClick={onBack} className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Voltar
            </button>
            <button onClick={handleFinish} className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-400 p-4">
       <div className="max-w-4xl mx-auto">
         <div className="bg-white rounded-lg p-6 mb-6">
           <div className="flex justify-between items-center mb-4">
             <button
               onClick={onBack}
               className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
             >
               ← Voltar
             </button>
             <div className="text-lg font-bold">
               Pergunta {currentQuestion + 1} de {questions.length}
             </div>
           </div>
           
           <h2 className="text-2xl font-bold mb-6 text-center">
             {questions[currentQuestion].question}
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {questions[currentQuestion].options.map((option, index) => (
               <button
                 key={index}
                 onClick={() => handleAnswer(option)}
                 className="bg-blue-500 text-white p-4 rounded-lg text-lg font-bold hover:bg-blue-600 transition-colors"
               >
                 {option}
               </button>
             ))}
           </div>
         </div>
       </div>
    </div>
  );
};


// Componente principal do App
function App() {
  const [currentView, setCurrentView] = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  const [userStats, setUserStats] = useState({
    stars: 15,
    level: 3,
    completedActivities: [],
    achievements: 5
  });

  const handleActivityStart = (activityId) => {
    setCurrentView(activityId);
  };

  const handleActivityComplete = (score) => {
    setUserStats(prev => ({
      ...prev,
      stars: prev.stars + score,
      completedActivities: [...prev.completedActivities, currentView]
    }));
    setCurrentView('home');
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentView('home');
  };

  // Renderizar atividade específica
  if (currentView === 'colors') {
    return <ColorActivity onBack={handleBack} onComplete={handleActivityComplete} />;
  }
  if (currentView === 'animals') {
    return <AnimalActivity onBack={handleBack} onComplete={handleActivityComplete} />;
  }
  if (currentView === 'numbers') {
    return <NumberActivity onBack={handleBack} onComplete={handleActivityComplete} />;
  }
  if (currentView === 'word-puzzle') {
    return <WordPuzzle onBack={handleBack} onComplete={handleActivityComplete} />;
  }
  if (currentView === 'memory-game') {
    return <MemoryGame onBack={handleBack} onComplete={handleActivityComplete} />;
  }
  if (currentView === 'spelling-bee') {
    return <SpellingBee onBack={handleBack} onComplete={handleActivityComplete} />;
  }

  // Renderizar páginas principais
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onActivityStart={handleActivityStart} userStats={userStats} />;
      
      // --- PÁGINAS HABILITADAS ---
      case 'lessons':
        return <LessonsPage />;
      case 'songs':
        return <MusicPage />;
      // -----------------------------

      case 'games':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Jogos Educativos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => handleActivityStart('word-puzzle')}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">🧩</div>
                    <h3 className="text-xl font-bold mb-2">Quebra-cabeça de Palavras</h3>
                    <p className="text-gray-600 mb-4">Monte palavras com letras embaralhadas!</p>
                    <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-purple-600 transition-colors">
                      Jogar
                    </button>
                  </div>
                </div>
                {/* ... (seus outros jogos) ... */}
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Conquistas</h2>
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600">Em breve! Suas conquistas e medalhas.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Configurações</h2>
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600">Em breve! Configurações do aplicativo.</p>
            </div>
          </div>
        );
      default:
        return <HomePage onActivityStart={handleActivityStart} userStats={userStats} />;
    }
  };

  // Tela principal
  return (
    <div className="app-container">
      <FloatingElements />
      
      <div className="min-h-screen flex flex-col bg-purple-400">
        <Header 
          userName="Ana" 
          stars={userStats.stars} 
          level={userStats.level} 
        />

        <main className="flex-1 overflow-y-auto pb-24">
          {renderContent()}
        </main>

        <div className="fixed bottom-0 left-0 right-0">
          <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      </div>
    </div>
  );
}

export default App;