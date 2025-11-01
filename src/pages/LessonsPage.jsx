import React, { useState } from 'react';
import { BookOpen, Play, Star, CheckCircle, Lock } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import '../App.css';

const LessonsPage = () => {
    const lessons = [
        {
            id: 'basic-greetings',
            title: 'Cumprimentos Básicos',
            description: 'Aprenda a cumprimentar em inglês: Hello, Good morning, Goodbye',
            icon: '👋',
            difficulty: 1,
            progress: 0,
            isCompleted: false,
            isLocked: false,
            lessons: ['Hello', 'Good morning', 'Good afternoon', 'Good evening', 'Goodbye']
        },
        {
            id: 'basic-words',
            title: 'Primeiras Palavras',
            description: 'Palavras essenciais: Yes, No, Please, Thank you',
            icon: '💬',
            difficulty: 1,
            progress: 0,
            isCompleted: false,
            isLocked: false,
            lessons: ['Yes', 'No', 'Please', 'Thank you', 'Sorry']
        },
        {
            id: 'daily-activities',
            title: 'Atividades Diárias',
            description: 'Ações do dia a dia: Eat, Sleep, Play, Study',
            icon: '🏃',
            difficulty: 2,
            progress: 0,
            isCompleted: false,
            isLocked: true,
            lessons: ['Eat', 'Sleep', 'Play', 'Study', 'Work']
        },
        {
            id: 'feelings',
            title: 'Sentimentos',
            description: 'Como expressar emoções: Happy, Sad, Angry, Excited',
            icon: '😊',
            difficulty: 2,
            progress: 0,
            isCompleted: false,
            isLocked: true,
            lessons: ['Happy', 'Sad', 'Angry', 'Excited', 'Tired']
        }
    ];

    const [selectedLesson, setSelectedLesson] = useState(null);

    const handleLessonClick = (lessonId) => {
        const lesson = lessons.find(l => l.id === lessonId);
        if (!lesson.isLocked) {
            setSelectedLesson(lesson);
        }
    };

    const handleBackToLessons = () => {
        setSelectedLesson(null);
    };

    const playWord = (word) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };

    if (selectedLesson) {
        return (
            <div className="content-wrapper p-6">
                {/* Header da Lição */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        className="big-button secondary-button"
                        onClick={handleBackToLessons}
                    >
                        ← Voltar
                    </button>
                    <div className="text-center">
                        <h2 className="text-subtitle">{selectedLesson.title}</h2>
                        <p className="text-body">{selectedLesson.description}</p>
                    </div>
                    <div className="text-4xl">{selectedLesson.icon}</div>
                </div>

                {/* Conteúdo da Lição */}
                <div className="activity-card max-w-4xl mx-auto">
                    <h3 className="text-title mb-6 text-center">Aprenda as palavras:</h3>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {selectedLesson.lessons.map((word, index) => (
                            <div key={index} className="activity-card text-center">
                                <div className="text-3xl mb-4">{selectedLesson.icon}</div>
                                <h4 className="text-subtitle mb-2">{word}</h4>
                                <button
                                    className="big-button star-button flex items-center gap-2 mx-auto"
                                    onClick={() => playWord(word)}
                                >
                                    <Play className="icon-medium" />
                                    Ouvir
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button className="big-button primary-button">
                            📝 Fazer Quiz desta Lição
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="content-wrapper p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <BookOpen className="icon-large text-blue-600" />
                    <div>
                        <h2 className="text-title">Lições de Inglês</h2>
                        <p className="text-body text-gray-600">
                            Aprenda inglês passo a passo com lições estruturadas
                        </p>
                    </div>
                </div>
            </div>

            {/* Progresso Geral */}
            <div className="activity-card mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-subtitle">Seu Progresso</h3>
                    <span className="text-body">1 de 4 lições completadas</span>
                </div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '25%' }}></div>
                </div>
            </div>

            {/* Lista de Lições */}
            <div className="mb-8">
                <h3 className="text-subtitle mb-4">Lições Disponíveis</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    {lessons.map((lesson) => (
                        <ActivityCard
                            key={lesson.id}
                            {...lesson}
                            onClick={() => handleLessonClick(lesson.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">📖</div>
                    <div className="text-subtitle">4</div>
                    <div className="text-body text-gray-600">Lições disponíveis</div>
                </div>

                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-subtitle">1</div>
                    <div className="text-body text-gray-600">Completadas</div>
                </div>

                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">⏱️</div>
                    <div className="text-subtitle">15min</div>
                    <div className="text-body text-gray-600">Tempo médio</div>
                </div>

                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="text-subtitle">85%</div>
                    <div className="text-body text-gray-600">Taxa de acerto</div>
                </div>
            </div>
        </div>
    );
};

export default LessonsPage;
