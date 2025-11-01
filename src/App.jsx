import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FloatingElements from './components/FloatingElements';
import HomePage from './pages/HomePage';
import ColorActivity from './components/ColorActivity';
import AnimalActivity from './components/AnimalActivity';
import NumberActivity from './components/NumberActivity';
import FamilyActivity from './components/FamilyActivity';
import MemoryGame from './components/MemoryGame';
import WordPuzzle from './components/WordPuzzle';
import SpellingBee from './components/SpellingBee';
import LessonsPage from './pages/LessonsPage';
import SongsPage from './pages/SongsPage';
import GamesPage from './pages/GamesPage';
import AchievementsPage from './pages/AchievementsPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userName] = useState('Ana');
  const [currentActivity, setCurrentActivity] = useState(null);
  const [userStats, setUserStats] = useState({
    stars: 15,
    level: 3,
    completedActivities: ['animals'],
    achievements: 5,
    totalWords: 25,
    studyStreak: 7,
    totalPlayTime: 45
  });

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentActivity(null);
  };

  const handleActivityStart = (activityId) => {
    setCurrentActivity(activityId);
  };

  const handleActivityComplete = (score) => {
    // Atualizar estatísticas do usuário
    setUserStats(prev => ({
      ...prev,
      stars: prev.stars + score,
      completedActivities: [...prev.completedActivities, currentActivity],
      totalWords: prev.totalWords + Math.floor(score / 2), // Aproximadamente 1 palavra para cada 2 pontos
      achievements: prev.achievements + (score === 6 ? 1 : 0) // Bonus achievement para pontuação perfeita
    }));
    setCurrentActivity(null);
  };

  const handleActivityBack = () => {
    setCurrentActivity(null);
  };

  const renderContent = () => {
    // Se há uma atividade ativa, renderizar a atividade
    if (currentActivity) {
      switch (currentActivity) {
        case 'colors':
          return (
            <ColorActivity
              onComplete={handleActivityComplete}
              onBack={handleActivityBack}
            />
          );
        case 'animals':
          return (
            <AnimalActivity
              onComplete={handleActivityComplete}
              onBack={handleActivityBack}
            />
          );
        case 'numbers':
          return (
            <NumberActivity
              onComplete={handleActivityComplete}
              onBack={handleActivityBack}
            />
          );
        case 'family':
          return (
            <FamilyActivity
              onComplete={handleActivityComplete}
              onBack={handleActivityBack}
            />
          );
        case 'memory-colors':
          return (
            <MemoryGame
              onComplete={handleActivityComplete}
              onBack={handleActivityBack}
            />
          );
        case 'word-puzzle':
          return (
            <WordPuzzle
              onComplete={handleActivityComplete}
              onBack={handleActivityBack}
            />
          );
        case 'spelling-bee':
          return (
            <SpellingBee
              onComplete={handleActivityComplete}
              onBack={handleActivityBack}
            />
          );
        default:
          return <HomePage onActivityStart={handleActivityStart} userStats={userStats} />;
      }
    }

    // Caso contrário, renderizar o conteúdo da aba ativa
    switch (activeTab) {
      case 'home':
        return <HomePage onActivityStart={handleActivityStart} userStats={userStats} />;
      case 'lessons':
        return <LessonsPage />;
      case 'songs':
        return <SongsPage />;
      case 'games':
        return <GamesPage onActivityStart={handleActivityStart} />;
      case 'achievements':
        return <AchievementsPage />;
      case 'settings':
        return <SettingsPage userStats={userStats} onUpdateSettings={(settings) => console.log('Settings updated:', settings)} />;
      default:
        return <HomePage onActivityStart={handleActivityStart} userStats={userStats} />;
    }
  };

  return (
    <div className="app-container">
      <FloatingElements />

      <div className="min-h-screen flex flex-col">
        <Header
          userName={userName}
          stars={userStats.stars}
          level={userStats.level}
          onUpdateStats={setUserStats}
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
