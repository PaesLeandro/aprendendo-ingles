import React from 'react';

function SimpleApp() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif',
            color: 'white',
            textAlign: 'center',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '40px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
                <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</h1>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
                    Little English Explorer
                </h2>
                <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
                    Aplicativo funcionando perfeitamente!
                </p>

                <div style={{ marginBottom: '30px' }}>
                    <div style={{
                        display: 'inline-flex',
                        gap: '20px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        {['🎨', '🐸', '🔢', '👨‍👩‍👧‍👦', '🎮', '🎵', '🏆'].map((emoji, index) => (
                            <div key={index} style={{
                                fontSize: '3rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                padding: '15px',
                                borderRadius: '15px',
                                transition: 'transform 0.3s ease',
                                cursor: 'pointer'
                            }}>
                                {emoji}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '20px',
                    borderRadius: '15px',
                    marginTop: '20px'
                }}>
                    <h3 style={{ marginBottom: '15px' }}>📱 Acesso Móvel</h3>
                    <p><strong>Computador:</strong> http://localhost:3001/</p>
                    <p><strong>Celular:</strong> http://192.168.10.10:3001/</p>
                </div>

                <div style={{
                    marginTop: '20px',
                    fontSize: '1.2rem',
                    opacity: 0.9
                }}>
                    ✅ React carregado | ✅ Servidor ativo | ✅ Rede exposta
                </div>
            </div>
        </div>
    );
}

export default SimpleApp;
