@echo off
echo 🚀 Iniciando Little English Explorer...
echo.
echo 💻 Para testar no PC, abra o navegador e acesse:
echo    http://localhost:8080/main.html
echo.
echo 📱 Para testar no celular:
echo    1. Conecte o celular na mesma rede WiFi
echo    2. Acesse uma dessas URLs no celular:
echo       http://192.168.10.5:8080/main.html
echo       http://192.168.56.1:8080/main.html
echo.
echo 🔧 Se não funcionar:
echo    1. Execute configurar_firewall.bat como Administrador
echo    2. Verifique se estão na mesma rede WiFi
echo.
echo ⚡ Iniciando servidor na porta 8080...
python -m http.server 8080 --bind 0.0.0.0
