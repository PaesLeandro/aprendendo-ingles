import React, { useState } from 'react';
import {
    User,
    Settings,
    Volume2,
    VolumeX,
    Moon,
    Sun,
    Globe,
    Award,
    BookOpen,
    Save,
    RotateCcw
} from 'lucide-react';
import '../App.css';

const SettingsPage = ({ userStats, onUpdateSettings }) => {
    const [settings, setSettings] = useState({
        sound: true,
        darkMode: false,
        language: 'pt-br',
        difficulty: 'medium',
        notifications: true,
        autoPlay: true,
        speechRate: 0.8,
        userName: 'Ana'
    });

    const [editingProfile, setEditingProfile] = useState(false);
    const [tempUserName, setTempUserName] = useState(settings.userName);

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const saveSettings = () => {
        if (onUpdateSettings) {
            onUpdateSettings(settings);
        }
        setEditingProfile(false);
        // Aqui você implementaria a persistência das configurações
        localStorage.setItem('littleEnglishExplorerSettings', JSON.stringify(settings));
    };

    const resetSettings = () => {
        setSettings({
            sound: true,
            darkMode: false,
            language: 'pt-br',
            difficulty: 'medium',
            notifications: true,
            autoPlay: true,
            speechRate: 0.8,
            userName: 'Ana'
        });
        setTempUserName('Ana');
    };

    const saveProfile = () => {
        setSettings(prev => ({
            ...prev,
            userName: tempUserName
        }));
        setEditingProfile(false);
    };

    return (
        <div className="content-wrapper p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <Settings className="icon-large text-gray-600" />
                    <div>
                        <h2 className="text-title">Configurações</h2>
                        <p className="text-body text-gray-600">
                            Personalize sua experiência de aprendizado
                        </p>
                    </div>
                </div>
            </div>

            {/* Perfil do Usuário */}
            <div className="activity-card mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <User className="icon-large text-blue-600" />
                    <div>
                        <h3 className="text-subtitle">Perfil do Usuário</h3>
                        <p className="text-body text-gray-600">Informações pessoais</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="text-body font-semibold mb-2 block">Nome:</label>
                        {editingProfile ? (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={tempUserName}
                                    onChange={(e) => setTempUserName(e.target.value)}
                                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                    placeholder="Digite seu nome"
                                />
                                <button
                                    className="big-button primary-button"
                                    onClick={saveProfile}
                                >
                                    ✓
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                                <span className="text-subtitle">{settings.userName}</span>
                                <button
                                    className="big-button star-button"
                                    onClick={() => setEditingProfile(true)}
                                >
                                    ✏️ Editar
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="text-body font-semibold mb-2 block">Progresso:</label>
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-body">Nível {userStats?.level || 3}</span>
                                <span className="text-body">{userStats?.stars || 15} ⭐</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Configurações de Áudio */}
            <div className="activity-card mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <Volume2 className="icon-large text-green-600" />
                    <div>
                        <h3 className="text-subtitle">Configurações de Áudio</h3>
                        <p className="text-body text-gray-600">Sons e pronunciação</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-body font-semibold">Sons do App</span>
                            <p className="text-sm text-gray-600">Ativar efeitos sonoros</p>
                        </div>
                        <button
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${settings.sound
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-300 text-gray-700'
                                }`}
                            onClick={() => handleSettingChange('sound', !settings.sound)}
                        >
                            {settings.sound ? <Volume2 className="icon-small" /> : <VolumeX className="icon-small" />}
                            {settings.sound ? 'Ligado' : 'Desligado'}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-body font-semibold">Reprodução Automática</span>
                            <p className="text-sm text-gray-600">Reproduzir áudio automaticamente</p>
                        </div>
                        <button
                            className={`px-4 py-2 rounded-lg transition-all ${settings.autoPlay
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-300 text-gray-700'
                                }`}
                            onClick={() => handleSettingChange('autoPlay', !settings.autoPlay)}
                        >
                            {settings.autoPlay ? 'Ativo' : 'Inativo'}
                        </button>
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-body font-semibold mb-2 block">
                            Velocidade da Fala: {settings.speechRate}x
                        </label>
                        <input
                            type="range"
                            min="0.5"
                            max="1.5"
                            step="0.1"
                            value={settings.speechRate}
                            onChange={(e) => handleSettingChange('speechRate', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                            <span>Lenta</span>
                            <span>Normal</span>
                            <span>Rápida</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Configurações de Aprendizado */}
            <div className="activity-card mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <BookOpen className="icon-large text-purple-600" />
                    <div>
                        <h3 className="text-subtitle">Configurações de Aprendizado</h3>
                        <p className="text-body text-gray-600">Personalizar dificuldade e idioma</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="text-body font-semibold mb-2 block">Nível de Dificuldade:</label>
                        <select
                            value={settings.difficulty}
                            onChange={(e) => handleSettingChange('difficulty', e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        >
                            <option value="easy">Fácil - Iniciante</option>
                            <option value="medium">Médio - Intermediário</option>
                            <option value="hard">Difícil - Avançado</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-body font-semibold mb-2 block">Idioma do App:</label>
                        <select
                            value={settings.language}
                            onChange={(e) => handleSettingChange('language', e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        >
                            <option value="pt-br">🇧🇷 Português (Brasil)</option>
                            <option value="en-us">🇺🇸 English (US)</option>
                            <option value="es-es">🇪🇸 Español</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Configurações de Interface */}
            <div className="activity-card mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <Globe className="icon-large text-orange-600" />
                    <div>
                        <h3 className="text-subtitle">Interface</h3>
                        <p className="text-body text-gray-600">Aparência e notificações</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-body font-semibold">Modo Escuro</span>
                            <p className="text-sm text-gray-600">Ativar tema escuro</p>
                        </div>
                        <button
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${settings.darkMode
                                    ? 'bg-gray-800 text-white'
                                    : 'bg-yellow-400 text-gray-800'
                                }`}
                            onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
                        >
                            {settings.darkMode ? <Moon className="icon-small" /> : <Sun className="icon-small" />}
                            {settings.darkMode ? 'Escuro' : 'Claro'}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-body font-semibold">Notificações</span>
                            <p className="text-sm text-gray-600">Lembretes de estudo</p>
                        </div>
                        <button
                            className={`px-4 py-2 rounded-lg transition-all ${settings.notifications
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-300 text-gray-700'
                                }`}
                            onClick={() => handleSettingChange('notifications', !settings.notifications)}
                        >
                            {settings.notifications ? 'Ativas' : 'Inativas'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Estatísticas de Progresso */}
            <div className="activity-card mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <Award className="icon-large text-yellow-600" />
                    <div>
                        <h3 className="text-subtitle">Suas Estatísticas</h3>
                        <p className="text-body text-gray-600">Progresso e conquistas</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-3xl mb-2">⭐</div>
                        <div className="text-subtitle">{userStats?.stars || 15}</div>
                        <div className="text-body text-gray-600">Estrelas</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl mb-2">🏆</div>
                        <div className="text-subtitle">{userStats?.achievements || 5}</div>
                        <div className="text-body text-gray-600">Conquistas</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl mb-2">📚</div>
                        <div className="text-subtitle">{userStats?.totalWords || 25}</div>
                        <div className="text-body text-gray-600">Palavras</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl mb-2">🔥</div>
                        <div className="text-subtitle">{userStats?.studyStreak || 7}</div>
                        <div className="text-body text-gray-600">Dias seguidos</div>
                    </div>
                </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-4 justify-center">
                <button
                    className="big-button primary-button flex items-center gap-2"
                    onClick={saveSettings}
                >
                    <Save className="icon-medium" />
                    Salvar Configurações
                </button>
                <button
                    className="big-button secondary-button flex items-center gap-2"
                    onClick={resetSettings}
                >
                    <RotateCcw className="icon-medium" />
                    Restaurar Padrão
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
