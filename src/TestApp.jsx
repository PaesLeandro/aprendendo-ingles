import React from 'react';

function TestApp() {
    return (
        <div style={{
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f8ff',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <h1 style={{
                color: '#ff6b6b',
                fontSize: '3rem',
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                🎉 Little English Explorer 🎉
            </h1>

            <p style={{
                fontSize: '1.5rem',
                color: '#4ecdc4',
                textAlign: 'center',
                marginBottom: '30px'
            }}>
                Aplicativo funcionando perfeitamente!
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                maxWidth: '800px',
                width: '100%'
            }}>
                <div style={{
                    backgroundColor: '#ffe66d',
                    padding: '20px',
                    borderRadius: '15px',
                    textAlign: 'center',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎨</div>
                    <h3 style={{ color: '#333', margin: '0' }}>Cores</h3>
                </div>

                <div style={{
                    backgroundColor: '#ff9f43',
                    padding: '20px',
                    borderRadius: '15px',
                    textAlign: 'center',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🐄</div>
                    <h3 style={{ color: '#333', margin: '0' }}>Animais</h3>
                </div>

                <div style={{
                    backgroundColor: '#6c5ce7',
                    padding: '20px',
                    borderRadius: '15px',
                    textAlign: 'center',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔢</div>
                    <h3 style={{ color: 'white', margin: '0' }}>Números</h3>
                </div>

                <div style={{
                    backgroundColor: '#fd79a8',
                    padding: '20px',
                    borderRadius: '15px',
                    textAlign: 'center',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎮</div>
                    <h3 style={{ color: 'white', margin: '0' }}>Jogos</h3>
                </div>
            </div>

            <div style={{
                marginTop: '40px',
                padding: '20px',
                backgroundColor: '#00b894',
                borderRadius: '10px',
                color: 'white',
                textAlign: 'center'
            }}>
                <h3>🚀 Status do Servidor</h3>
                <p>✅ Servidor Vite rodando</p>
                <p>✅ React carregado</p>
                <p>✅ Componentes funcionando</p>
                <p><strong>URL Local:</strong> http://localhost:3000/</p>
                <p><strong>URL Móvel:</strong> http://192.168.10.10:3000/</p>
            </div>

            <div style={{
                marginTop: '20px',
                padding: '10px',
                backgroundColor: '#dfe6e9',
                borderRadius: '10px',
                width: '100%',
                maxWidth: '600px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
                <h4 style={{ margin: '0', color: '#2d3436' }}>Instruções para Acesso Remoto</h4>
                <p style={{ margin: '5px 0', color: '#636e72' }}>Para acessar o servidor de desenvolvimento em outros dispositivos na mesma rede:</p>
                <code style={{
                    backgroundColor: '#b2bec3',
                    padding: '10px',
                    borderRadius: '5px',
                    display: 'block',
                    margin: '10px 0',
                    fontFamily: 'Courier, monospace'
                }}>
                    netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=3000
                </code>
                <p style={{ margin: '5px 0', color: '#636e72' }}>Depois de executar este comando, você poderá acessar o servidor usando a URL móvel fornecida acima.</p>
            </div>
        </div>
    );
}

export default TestApp;
