@echo off
echo 🔍 Little English Explorer - Diagnóstico de Rede
echo ================================================
echo.

echo 📶 Verificando configuração de rede...
echo.

echo 🖥️ IP do Computador:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| find "IPv4"') do echo    %%a
echo.

echo 🌐 Testando servidor local...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8080/main.html' -TimeoutSec 5; Write-Host '✅ Servidor local funcionando!' -ForegroundColor Green } catch { Write-Host '❌ Servidor local não responde' -ForegroundColor Red }"
echo.

echo 📡 Testando acesso externo...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://192.168.10.10:8080/main.html' -TimeoutSec 5; Write-Host '✅ Acesso externo funcionando!' -ForegroundColor Green } catch { Write-Host '❌ Acesso externo bloqueado' -ForegroundColor Red }"
echo.

echo 🔥 Verificando Firewall...
netsh advfirewall firewall show rule name="LittleEnglishExplorer" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Regra de firewall configurada
) else (
    echo ❌ Regra de firewall não encontrada
    echo 💡 Execute: netsh advfirewall firewall add rule name="LittleEnglishExplorer" dir=in action=allow protocol=TCP localport=8080
)
echo.

echo 📱 URLs para dispositivos móveis:
echo    http://localhost:8080/main.html (computador)
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| find "IPv4"') do echo    http://%%a:8080/main.html (celular/tablet)
echo.

echo 🎯 Para usar no celular:
echo 1. Conecte o celular na mesma rede WiFi
echo 2. Abra o navegador no celular
echo 3. Digite um dos URLs acima
echo 4. Aproveite o Little English Explorer!
echo.

pause
