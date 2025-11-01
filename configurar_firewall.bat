@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════╗
echo ║          � CONFIGURAR FIREWALL             ║
echo ║        Little English Explorer              ║
echo ╚══════════════════════════════════════════════╝
echo.

echo 📡 Configurando regras do firewall...
echo.

REM Adiciona regras para Python
netsh advfirewall firewall add rule name="Little English Explorer - Python HTTP" dir=in action=allow protocol=TCP localport=8080 program="%WINDIR%\System32\python.exe" enable=yes
netsh advfirewall firewall add rule name="Little English Explorer - Python HTTP 8081" dir=in action=allow protocol=TCP localport=8081 program="%WINDIR%\System32\python.exe" enable=yes

REM Adiciona regras genéricas para as portas
netsh advfirewall firewall add rule name="Little English Explorer - Porta 8080" dir=in action=allow protocol=TCP localport=8080
netsh advfirewall firewall add rule name="Little English Explorer - Porta 8081" dir=in action=allow protocol=TCP localport=8081

REM Adiciona regras para Python em diferentes localizações
netsh advfirewall firewall add rule name="Little English Explorer - Python Apps" dir=in action=allow program="python.exe" enable=yes
netsh advfirewall firewall add rule name="Little English Explorer - Python3" dir=in action=allow program="python3.exe" enable=yes

echo.
echo ✅ Regras do firewall configuradas!
echo.
echo 🌐 Testando conectividade...
ipconfig | findstr "IPv4"
echo.
echo 🎯 O servidor agora pode ser acessado de dispositivos móveis!
echo.
pause
