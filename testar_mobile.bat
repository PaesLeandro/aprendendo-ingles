@echo off
chcp 65001 >nul
color 0E
echo.
echo ╔══════════════════════════════════════════════╗
echo ║           � TESTE DE CONECTIVIDADE         ║
echo ║        Little English Explorer              ║
echo ╚══════════════════════════════════════════════╝
echo.

echo 🌐 Detectando configuração de rede...
echo.

REM Mostra todas as conexões de rede
echo 📡 INTERFACES DE REDE ATIVAS:
echo ════════════════════════════════════════
ipconfig | findstr /R "Adaptador.*:" /A:0C
ipconfig | findstr "IPv4" /A:0A
echo.

REM Testa se as portas estão abertas
echo 🔌 TESTANDO PORTAS:
echo ════════════════════════════════════════
netstat -an | findstr ":8080"
netstat -an | findstr ":8081"
echo.

REM Mostra configuração do hotspot
echo 📱 CONFIGURAÇÃO HOTSPOT:
echo ════════════════════════════════════════
netsh wlan show hostednetwork
echo.

REM Testa conectividade local
echo 🧪 TESTE DE CONECTIVIDADE:
echo ════════════════════════════════════════
ping -n 1 127.0.0.1 >nul
if %errorlevel% equ 0 (
    echo ✅ Localhost funcionando
) else (
    echo ❌ Problema no localhost
)

REM Testa cada IP disponível
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    set "ip=%%a"
    setlocal enabledelayedexpansion
    set "ip=!ip: =!"
    echo 🌍 Testando IP: !ip!
    ping -n 1 !ip! >nul
    if !errorlevel! equ 0 (
        echo   ✅ !ip! - Acessível
    echo   📱 URL: http://!ip!:8080/main-standalone.html
    ) else (
        echo   ❌ !ip! - Não acessível
    )
    endlocal
    echo.
)

echo.
echo � SUGESTÕES DE URL PARA TESTE:
echo ════════════════════════════════════════
echo 🏠 WiFi Local:    http://192.168.1.100:8080/main-standalone.html
echo 📡 Ethernet:      http://192.168.56.1:8080/main-standalone.html  
echo 🔥 Hotspot:       http://192.168.137.1:8080/main-standalone.html
echo ⚡ Alternativa:   http://localhost:8080/main-standalone.html
echo.

echo 💡 DICAS DE SOLUÇÃO:
echo ════════════════════════════════════════
echo 1. Execute configurar_firewall.bat como Admin
echo 2. Verifique se o servidor está rodando
echo 3. Teste no navegador do PC primeiro
echo 4. Use o IP mostrado acima para acessar do celular
echo.

pause
