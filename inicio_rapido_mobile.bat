@echo off
chcp 65001 >nul
color 0B
echo.
echo ╔══════════════════════════════════════════════╗
echo ║        📱 INÍCIO RÁPIDO - DADOS MÓVEIS      ║
echo ║        Little English Explorer              ║
echo ╚══════════════════════════════════════════════╝
echo.

echo 🎯 Configuração automática para acesso móvel...
echo.

REM Verifica se main.html existe
if not exist "main.html" (
    echo ❌ Arquivo main.html não encontrado!
    echo 💡 Execute este script na pasta do projeto
    pause
    exit /b 1
)

echo ✅ Arquivo main.html encontrado
echo.

echo 🔧 PASSO 1: Configurando firewall...
echo ════════════════════════════════════════

REM Configura firewall automaticamente
netsh advfirewall firewall add rule name="Little English Mobile - 8080" dir=in action=allow protocol=TCP localport=8080 >nul 2>&1
netsh advfirewall firewall add rule name="Little English Mobile - 8081" dir=in action=allow protocol=TCP localport=8081 >nul 2>&1

echo ✅ Firewall configurado
echo.

echo 🌐 PASSO 2: Detectando rede...
echo ════════════════════════════════════════

REM Detecta IPs disponíveis
echo 📡 IPs disponíveis:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    set "ip=%%a"
    setlocal enabledelayedexpansion
    set "ip=!ip: =!"
    echo   🌍 !ip!
    endlocal
)
echo.

echo 🚀 PASSO 3: Iniciando servidor...
echo ════════════════════════════════════════

REM Inicia servidor em background
start /min python servidor_mobile.py

echo ✅ Servidor iniciado em background
echo.

echo ⏳ Aguardando servidor inicializar...
timeout /t 3 /nobreak >nul

echo.
echo 🎉 CONFIGURAÇÃO COMPLETA!
echo ════════════════════════════════════════

echo.
echo 📱 OPÇÕES DE ACESSO:
echo.
echo 🏠 OPÇÃO 1: WiFi Local
echo    1. Certifique-se que PC e celular estão na mesma WiFi
echo    2. No celular, acesse uma das URLs:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    set "ip=%%a"
    setlocal enabledelayedexpansion
    set "ip=!ip: =!"
    echo       📱 http://!ip!:8080/main.html
    endlocal
)

echo.
echo 🔥 OPÇÃO 2: Hotspot do Celular
echo    1. No celular: Ativar Hotspot (nome: qualquer, senha: qualquer)
echo    2. No PC: Conectar no hotspot do celular
echo    3. Execute: iniciar_servidor_universal.bat (opção 2)
echo.

echo 💻 OPÇÃO 3: Hotspot do PC
echo    1. Execute: configurar_hotspot.bat (como Admin)
echo    2. No celular: Conectar na rede "LittleEnglish" (senha: 12345678)
echo    3. Acesse: http://192.168.137.1:8080/main.html
echo.

echo 🌍 OPÇÃO 4: Acesso Remoto (Qualquer lugar)
echo    1. Baixe ngrok: https://ngrok.com/download
echo    2. Execute: ngrok http 8080
echo    3. Use a URL https gerada para acessar de qualquer lugar
echo.

echo 🔍 VERIFICAR STATUS:
echo    Execute: testar_mobile.bat
echo.

echo 🎯 O Little English Explorer está pronto para uso móvel!
echo.
pause
