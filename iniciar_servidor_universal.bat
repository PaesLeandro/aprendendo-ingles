@echo off
chcp 65001 > nul
echo 🚀 Little English Explorer - Launcher Universal
echo ================================================
echo.

echo 📋 ESCOLHA SEU MODO DE ACESSO:
echo.
echo 1. 📶 WiFi - Celular na mesma rede WiFi
echo 2. 🔥 Hotspot - Usar dados móveis do celular  
echo 3. 💻 PC Hotspot - Compartilhar internet do PC
echo 4. 🌍 Universal - Todos os modos (Recomendado)
echo 5. ⚡ Rápido - Servidor simples padrão
echo.

set /p choice="Digite sua escolha (1-5): "

if "%choice%"=="1" goto wifi
if "%choice%"=="2" goto hotspot  
if "%choice%"=="3" goto pc_hotspot
if "%choice%"=="4" goto universal
if "%choice%"=="5" goto quick
goto universal

:wifi
echo.
echo 📶 INICIANDO MODO WIFI...
echo ✅ Para celular na mesma rede WiFi
python servidor_simples.py
goto end

:hotspot
echo.
echo 🔥 MODO HOTSPOT MÓVEL
echo.
echo 📱 INSTRUÇÕES:
echo 1. Ative o hotspot no seu celular
echo 2. Conecte o PC no hotspot do celular
echo 3. Execute novamente este script
echo 4. Use os novos IPs mostrados
echo.
pause
python servidor_simples.py
goto end

:pc_hotspot  
echo.
echo 💻 CONFIGURANDO HOTSPOT DO PC...
echo.
echo 🔧 Executando comandos de configuração:
netsh wlan set hostednetwork mode=allow ssid="LittleEnglish" key="12345678"
netsh wlan start hostednetwork
echo.
echo ✅ Hotspot configurado!
echo 📱 Conecte seu celular na rede "LittleEnglish" (senha: 12345678)
echo.
pause
python servidor_simples.py
goto end

:universal
echo.
echo 🌍 INICIANDO MODO UNIVERSAL...
echo ✅ Suporte para WiFi e Dados Móveis
python servidor_simples.py
goto end

:quick
echo.
echo ⚡ INICIANDO SERVIDOR RÁPIDO...
python -m http.server 8080 --bind 0.0.0.0
goto end

:end
echo.
echo 🛑 Servidor parado. Pressione qualquer tecla para sair.
pause > nul
