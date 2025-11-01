@echo off
chcp 65001 >nul
color 0D
echo.
echo ╔══════════════════════════════════════════════╗
echo ║          🔥 CONFIGURAR HOTSPOT              ║
echo ║        Little English Explorer              ║
echo ╚══════════════════════════════════════════════╝
echo.

echo 📡 Configurando hotspot do computador...
echo.

REM Configura o hotspot
echo 🔧 Criando rede hospedada...
netsh wlan set hostednetwork mode=allow ssid="LittleEnglish" key="12345678"

if %errorlevel% equ 0 (
    echo ✅ Rede configurada: LittleEnglish
    echo 🔑 Senha: 12345678
    echo.
    
    echo 🚀 Iniciando hotspot...
    netsh wlan start hostednetwork
    
    if %errorlevel% equ 0 (
        echo ✅ Hotspot iniciado com sucesso!
        echo.
        
        echo 📱 INSTRUÇÕES PARA O CELULAR:
        echo ════════════════════════════════════════
        echo 1. Vá em Configurações → WiFi
        echo 2. Procure a rede: LittleEnglish
        echo 3. Digite a senha: 12345678
        echo 4. Conecte ao hotspot
        echo.
        
        echo 🌐 AGUARDE... Detectando IP do hotspot...
        timeout /t 5 /nobreak >nul
        
        REM Detecta o IP do hotspot
        for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "192.168.137"') do (
            set "hotspot_ip=%%a"
            setlocal enabledelayedexpansion
            set "hotspot_ip=!hotspot_ip: =!"
            echo 🎯 IP do Hotspot: !hotspot_ip!
            echo 📱 URL para acessar: http://!hotspot_ip!:8080/main.html
            endlocal
        )
        
        echo.
        echo 🚀 PRÓXIMOS PASSOS:
        echo ════════════════════════════════════════
        echo 1. Execute: iniciar_servidor_universal.bat
        echo 2. Escolha opção 2 (Modo Hotspot)
        echo 3. Use a URL mostrada acima no celular
        echo.
        
    ) else (
        echo ❌ Erro ao iniciar hotspot
        echo 💡 Verifique se o adaptador WiFi suporta hotspot
        echo 💡 Execute como ADMINISTRADOR
    )
    
) else (
    echo ❌ Erro ao configurar rede hospedada
    echo 💡 Execute como ADMINISTRADOR
    echo 💡 Verifique se o WiFi está habilitado
)

echo.
echo 🔍 STATUS DO HOTSPOT:
echo ════════════════════════════════════════
netsh wlan show hostednetwork
echo.

echo 💡 PARA PARAR O HOTSPOT:
echo ════════════════════════════════════════
echo Execute: netsh wlan stop hostednetwork
echo.

pause
