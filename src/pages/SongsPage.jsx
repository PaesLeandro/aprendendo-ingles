import React, { useState } from 'react';
import { Music, Play, Pause, Star, Volume2 } from 'lucide-react';
import '../App.css';

const SongsPage = () => {
    const songs = [
        {
            id: 'abc-song',
            title: 'ABC Song',
            description: 'Aprenda o alfabeto cantando!',
            icon: '🔤',
            difficulty: 1,
            duration: '2:30',
            lyrics: [
                'A B C D E F G',
                'H I J K L M N O P',
                'Q R S T U V',
                'W X Y and Z',
                'Now I know my ABCs',
                'Next time won\'t you sing with me?'
            ]
        },
        {
            id: 'colors-song',
            title: 'Colors Song',
            description: 'Cantando as cores em inglês',
            icon: '🌈',
            difficulty: 1,
            duration: '2:15',
            lyrics: [
                'Red and blue and green and yellow',
                'Orange, purple, pink, hello!',
                'Black and white and brown so bright',
                'Colors make the world so right!'
            ]
        },
        {
            id: 'numbers-song',
            title: 'Numbers Song',
            description: 'Conte de 1 a 10 cantando',
            icon: '🔢',
            difficulty: 1,
            duration: '1:45',
            lyrics: [
                'One, two, three, four, five',
                'Six, seven, eight, nine, ten',
                'Let\'s count together once again',
                'Numbers are our very best friends!'
            ]
        },
        {
            id: 'animals-song',
            title: 'Old MacDonald',
            description: 'Aprenda animais e seus sons',
            icon: '🐄',
            difficulty: 2,
            duration: '3:00',
            lyrics: [
                'Old MacDonald had a farm, E-I-E-I-O',
                'And on his farm he had a cow, E-I-E-I-O',
                'With a moo moo here and a moo moo there',
                'Here a moo, there a moo, everywhere a moo moo',
                'Old MacDonald had a farm, E-I-E-I-O'
            ]
        }
    ];

    const [selectedSong, setSelectedSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleSongClick = (song) => {
        setSelectedSong(song);
        setIsPlaying(false);
    };

    const handleBackToSongs = () => {
        setSelectedSong(null);
        setIsPlaying(false);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        // Aqui você implementaria a lógica real de reprodução de áudio
    };

    const speakLyric = (lyric) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(lyric);
            utterance.lang = 'en-US';
            utterance.rate = 0.7;
            speechSynthesis.speak(utterance);
        }
    };

    if (selectedSong) {
        return (
            <div className="content-wrapper p-6">
                {/* Header da Música */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        className="big-button secondary-button"
                        onClick={handleBackToSongs}
                    >
                        ← Voltar
                    </button>
                    <div className="text-center">
                        <h2 className="text-subtitle">{selectedSong.title}</h2>
                        <p className="text-body">{selectedSong.description}</p>
                    </div>
                    <div className="text-4xl">{selectedSong.icon}</div>
                </div>

                {/* Player da Música */}
                <div className="activity-card max-w-2xl mx-auto mb-8">
                    <div className="text-center mb-6">
                        <div className="text-8xl mb-4">{selectedSong.icon}</div>
                        <h3 className="text-title mb-2">{selectedSong.title}</h3>
                        <p className="text-body text-gray-600 mb-4">{selectedSong.duration}</p>

                        <button
                            className={`big-button ${isPlaying ? 'secondary-button' : 'primary-button'} flex items-center gap-2 mx-auto`}
                            onClick={togglePlay}
                        >
                            {isPlaying ? (
                                <>
                                    <Pause className="icon-medium" />
                                    Pausar
                                </>
                            ) : (
                                <>
                                    <Play className="icon-medium" />
                                    Reproduzir
                                </>
                            )}
                        </button>
                    </div>

                    {/* Barra de Progresso Simulada */}
                    {isPlaying && (
                        <div className="mb-4">
                            <div className="progress-bar">
                                <div className="progress-fill animate-pulse" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Letra da Música */}
                <div className="activity-card max-w-4xl mx-auto">
                    <h3 className="text-title mb-6 text-center">Letra da Música</h3>

                    <div className="space-y-4">
                        {selectedSong.lyrics.map((lyric, index) => (
                            <div key={index} className="activity-card">
                                <div className="flex items-center justify-between">
                                    <p className="text-subtitle flex-1">{lyric}</p>
                                    <button
                                        className="big-button star-button flex items-center gap-2"
                                        onClick={() => speakLyric(lyric)}
                                    >
                                        <Volume2 className="icon-medium" />
                                        Ouvir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button className="big-button primary-button">
                            🎤 Modo Karaokê
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
                    <Music className="icon-large text-purple-600" />
                    <div>
                        <h2 className="text-title">Músicas em Inglês</h2>
                        <p className="text-body text-gray-600">
                            Aprenda inglês cantando suas músicas favoritas
                        </p>
                    </div>
                </div>
            </div>

            {/* Música em Destaque */}
            <div className="mb-8">
                <h3 className="text-subtitle mb-4">Música em Destaque</h3>
                <div
                    className="activity-card cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => handleSongClick(songs[0])}
                >
                    <div className="flex items-center gap-6">
                        <div className="text-6xl">{songs[0].icon}</div>
                        <div className="flex-1">
                            <h4 className="text-subtitle mb-2">{songs[0].title}</h4>
                            <p className="text-body text-gray-600 mb-2">{songs[0].description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>⏱️ {songs[0].duration}</span>
                                <span>📊 Dificuldade: {songs[0].difficulty === 1 ? 'Fácil' : 'Médio'}</span>
                            </div>
                        </div>
                        <button className="big-button primary-button flex items-center gap-2">
                            <Play className="icon-medium" />
                            Tocar
                        </button>
                    </div>
                </div>
            </div>

            {/* Lista de Músicas */}
            <div className="mb-8">
                <h3 className="text-subtitle mb-4">Todas as Músicas</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    {songs.map((song) => (
                        <div
                            key={song.id}
                            className="activity-card cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => handleSongClick(song)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-4xl">{song.icon}</div>
                                <div className="flex-1">
                                    <h4 className="text-subtitle mb-1">{song.title}</h4>
                                    <p className="text-body text-gray-600 text-sm mb-2">{song.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>⏱️ {song.duration}</span>
                                        <span>•</span>
                                        <span>📊 {song.difficulty === 1 ? 'Fácil' : 'Médio'}</span>
                                    </div>
                                </div>
                                <button className="big-button star-button">
                                    <Play className="icon-medium" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">🎵</div>
                    <div className="text-subtitle">{songs.length}</div>
                    <div className="text-body text-gray-600">Músicas disponíveis</div>
                </div>

                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-subtitle">3</div>
                    <div className="text-body text-gray-600">Favoritas</div>
                </div>

                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">🎤</div>
                    <div className="text-subtitle">12min</div>
                    <div className="text-body text-gray-600">Tempo cantando</div>
                </div>

                <div className="activity-card text-center">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-subtitle">2</div>
                    <div className="text-body text-gray-600">Conquistas</div>
                </div>
            </div>
        </div>
    );
};

export default SongsPage;
