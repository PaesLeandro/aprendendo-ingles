import React from 'react';
import { Play } from 'lucide-react';

// Página "Em Breve" para as Músicas
const MusicPage = () => {
    return (
        <div className="content-wrapper p-6">
            <div className="flex items-center gap-4 mb-8">
                <Play className="icon-large text-orange-500" />
                <div>
                    <h2 className="text-title">Músicas Infantis</h2>
                    <p className="text-body text-gray-600">
                        Aprenda inglês cantando e se divertindo!
                    </p>
                </div>
            </div>

            <div className="activity-card text-center p-8">
                <div className="text-6xl mb-4">🎵</div>
                <h3 className="text-title mb-2">Em Breve!</h3>
                <p className="text-body text-gray-600">
                    Estamos preparando uma seleção com as melhores músicas infantis em inglês!
                </p>
            </div>

            {/* Dica: Quando quiser adicionar uma, cole o código do YouTube aqui */}
            <div className="activity-card mt-6">
                <h3 className="text-subtitle mb-4">Exemplo de Música:</h3>
                <div style={{
                    position: 'relative',
                    paddingBottom: '56.25%', // Proporção 16:9
                    height: 0,
                    overflow: 'hidden',
                    borderRadius: '12px'
                }}>
                    <iframe 
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}
                        src="https://www.youtube.com/embed/g9-8K-w-p4I" // Ex: "Head, Shoulders, Knees & Toes"
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default MusicPage;