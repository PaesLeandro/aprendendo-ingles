#!/usr/bin/env python3
import http.server
import socketserver
import socket
import sys
import os
import subprocess
import json
import time
from threading import Thread

# Configurações para rede móvel e WiFi
PORT = 8080
HOST = '0.0.0.0'
MOBILE_HOTSPOT_PORT = 8081  # Porta alternativa para hotspot

# Classe customizada para servidor HTTP
class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Adicionar headers para melhor compatibilidade móvel
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def log_message(self, format_str, *args):
        # Log customizado para mostrar conexões móveis
        client_ip = self.client_address[0]
        message = f"📱 {client_ip} - {format_str % args}"
        print(message)

def detect_network_type():
    """Detectar se está conectado via WiFi ou dados móveis"""
    try:
        # Executar comando para obter informações de rede
        result = subprocess.run(['netsh', 'wlan', 'show', 'profiles'], 
                              capture_output=True, text=True, shell=True)
        
        if result.returncode == 0 and result.stdout:
            # Verificar se há conexão WiFi ativa
            wifi_result = subprocess.run(['netsh', 'wlan', 'show', 'interfaces'], 
                                       capture_output=True, text=True, shell=True)
            
            if wifi_result.returncode == 0 and 'Estado' in wifi_result.stdout:
                if 'conectado' in wifi_result.stdout.lower() or 'connected' in wifi_result.stdout.lower():
                    return 'wifi'
            
        # Verificar se há conexão de dados móveis/hotspot
        adapter_result = subprocess.run(['ipconfig'], capture_output=True, text=True, shell=True)
        if 'Mobile' in adapter_result.stdout or 'Hotspot' in adapter_result.stdout:
            return 'mobile'
            
        return 'ethernet'
        
    except Exception as e:
        print(f"⚠️ Erro ao detectar tipo de rede: {e}")
        return 'unknown'

def get_all_network_interfaces():
    """Obter todas as interfaces de rede disponíveis"""
    interfaces = {}
    
    try:
        # Obter informações do ipconfig
        result = subprocess.run(['ipconfig', '/all'], capture_output=True, text=True, shell=True)
        
        current_adapter = None
        current_ip = None
        
        for line in result.stdout.split('\n'):
            line = line.strip()
            
            # Detectar novo adaptador
            if 'Adaptador' in line or 'Adapter' in line:
                if 'Wi-Fi' in line or 'WiFi' in line:
                    current_adapter = 'wifi'
                elif 'Ethernet' in line:
                    current_adapter = 'ethernet'
                elif 'Bluetooth' in line:
                    current_adapter = 'bluetooth'
                elif 'Mobile' in line or 'Hotspot' in line:
                    current_adapter = 'mobile'
                else:
                    current_adapter = 'other'
            
            # Capturar IPv4
            if 'IPv4' in line and '192.168.' in line:
                parts = line.split(':')
                if len(parts) > 1:
                    ip = parts[1].strip()
                    if current_adapter and ip:
                        interfaces[current_adapter] = ip
                        
    except Exception as e:
        print(f"⚠️ Erro ao obter interfaces: {e}")
    
    return interfaces


def get_local_ips():
    """Obter todos os IPs locais disponíveis"""
    ips = []
    hostname = socket.gethostname()

    # Obter IP principal
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            primary_ip = s.getsockname()[0]
            ips.append(primary_ip)
    except Exception:
        pass

    # Obter outros IPs
    try:
        host_ips = socket.gethostbyname_ex(hostname)[2]
        for ip in host_ips:
            if ip not in ips and not ip.startswith("127."):
                ips.append(ip)
    except Exception:
        pass

    return ips

def create_mobile_hotspot_instructions():
    """Criar instruções para usar hotspot móvel"""
    return """
🔥 MODO HOTSPOT MÓVEL - REDE SEM WIFI 🔥
=======================================

📱 OPÇÃO 1: USAR DADOS MÓVEIS DO CELULAR
1. Ative o Hotspot/Ponto de Acesso no celular
2. Conecte o computador no hotspot do celular
3. O servidor detectará automaticamente o novo IP
4. Use o IP mostrado para acessar

💻 OPÇÃO 2: USAR INTERNET DO COMPUTADOR PARA CELULAR
1. Configure o computador como hotspot:
   - Windows 10/11: Configurações → Rede → Hotspot Móvel
   - Ative "Compartilhar conexão com a Internet"
2. Conecte o celular no hotspot do computador
3. Use o IP do hotspot para acessar

🌐 OPÇÃO 3: ACESSO DIRETO VIA DADOS MÓVEIS
1. Configure um túnel ngrok ou similar
2. Use um serviço de DNS dinâmico
3. Acesse de qualquer lugar do mundo

⚡ CONFIGURAÇÃO RÁPIDA DE HOTSPOT:
netsh wlan set hostednetwork mode=allow ssid="LittleEnglish" key="12345678"
netsh wlan start hostednetwork
"""

def start_multiple_servers():
    """Iniciar servidores em múltiplas portas para diferentes cenários"""
    servers = []
    
    # Servidor principal (WiFi/Ethernet)
    try:
        server1 = socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler)
        server1.allow_reuse_address = True
        servers.append(('Principal', PORT, server1))
        print(f"✅ Servidor WiFi/Ethernet iniciado na porta {PORT}")
    except Exception as e:
        print(f"❌ Erro no servidor principal: {e}")
    
    # Servidor para hotspot móvel
    try:
        server2 = socketserver.TCPServer((HOST, MOBILE_HOTSPOT_PORT), CustomHTTPRequestHandler)
        server2.allow_reuse_address = True
        servers.append(('Hotspot', MOBILE_HOTSPOT_PORT, server2))
        print(f"✅ Servidor Hotspot iniciado na porta {MOBILE_HOTSPOT_PORT}")
    except Exception as e:
        print(f"❌ Erro no servidor hotspot: {e}")
    
    return servers


def main():
    # Verificar se estamos no diretório correto
    if not os.path.exists('main.html'):
        print("❌ Erro: main.html não encontrado no diretório atual!")
        print(f"📁 Diretório atual: {os.getcwd()}")
        sys.exit(1)

    print("🚀 Little English Explorer - Servidor Universal")
    print("=" * 60)
    
    # Detectar tipo de rede
    network_type = detect_network_type()
    interfaces = get_all_network_interfaces()
    local_ips = get_local_ips()
    
    print(f"🔍 Tipo de rede detectado: {network_type.upper()}")
    print()
    
    # Mostrar interfaces disponíveis
    if interfaces:
        print("🌐 Interfaces de rede encontradas:")
        for interface_type, ip in interfaces.items():
            print(f"   {interface_type.upper()}: {ip}")
        print()
    
    # Escolher modo de operação
    def main():
    """Função principal"""
    print("� Little English Explorer - Servidor Universal")
    print("=" * 60)
    
    # Detecta tipo de rede
    network_type = detect_network_type()
    print(f"🔍 Tipo de rede detectado: {network_type.upper()}")
    print()
    
    # Obtém todas as interfaces de rede
    interfaces = get_all_network_interfaces()
    local_ips = [ip for ip in interfaces.values() if ip and not ip.startswith('127.')]
    
    print("🌐 Interfaces de rede encontradas:")
    for interface_type, ip in interfaces.items():
        if ip and not ip.startswith('127.'):
            print(f"   {interface_type}: {ip}(Preferencial)")
    
    # Verifica se foi passado argumento para modo automático
    auto_mode = None
    if len(sys.argv) > 1:
        try:
            auto_mode = int(sys.argv[1])
        except ValueError:
            pass
    
    if auto_mode:
        choice = str(auto_mode)
        print(f"
🤖 Modo automático selecionado: {choice}")
    else:
        print("
�📋 MODOS DE OPERAÇÃO DISPONÍVEIS:")
        print("1. 📶 WiFi Local (mesma rede)")
        print("2. 🔥 Hotspot Móvel (dados do celular)")
        print("3. 💻 Compartilhamento PC (hotspot do PC)")
        print("4. 🌍 Todos os modos (recomendado)")
        print()
        choice = input("Escolha o modo (1-4) ou Enter para modo 4: ").strip()
    
    if not choice:
        choice = "4"
    
    print()
    if choice == "1":
        # Modo WiFi apenas
        start_wifi_server(local_ips)
    elif choice == "2":
        # Modo hotspot móvel
        start_mobile_server()
    elif choice == "3":
        # Modo compartilhamento PC
        start_pc_sharing_server()
    else:
        # Modo todos
        start_universal_server(local_ips, interfaces)
    print("1. 📶 WiFi Local (mesma rede)")
    print("2. 🔥 Hotspot Móvel (dados do celular)")
    print("3. 💻 Compartilhamento PC (hotspot do PC)")
    print("4. 🌍 Todos os modos (recomendado)")
    print()
    
    choice = input("Escolha o modo (1-4) ou Enter para modo 4: ").strip()
    if not choice:
        choice = "4"
    
    print("\n" + "=" * 60)
    
    if choice == "1":
        # Modo WiFi apenas
        start_wifi_server(local_ips)
    elif choice == "2":
        # Modo hotspot móvel
        start_mobile_server()
    elif choice == "3":
        # Modo compartilhamento PC
        start_pc_sharing_server()
    else:
        # Modo todos
        start_universal_server(local_ips, interfaces)

def start_wifi_server(local_ips):
    """Iniciar servidor apenas para WiFi"""
    try:
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            httpd.allow_reuse_address = True
            
            print("� MODO WIFI - Little English Explorer")
            print("=" * 45)
            
            print("💻 Acesso Local:")
            print(f"   http://localhost:{PORT}/main.html")
            print()
            
            print("📱 Acesso WiFi (celular na mesma rede):")
            for ip in local_ips:
                print(f"   http://{ip}:{PORT}/main.html")
            print()
            
            print("📋 Instruções:")
            print("1. Conecte o celular na mesma rede WiFi do computador")
            print("2. Use um dos URLs WiFi acima no celular")
            print("3. Aproveite o Little English Explorer!")
            print()
            print("🔄 Pressione Ctrl+C para parar")
            print("=" * 45)
            
            httpd.serve_forever()
            
    except Exception as e:
        print(f"❌ Erro no servidor WiFi: {e}")

def start_mobile_server():
    """Iniciar servidor para hotspot móvel"""
    print("🔥 MODO HOTSPOT MÓVEL")
    print("=" * 35)
    print(create_mobile_hotspot_instructions())
    
    try:
        with socketserver.TCPServer((HOST, MOBILE_HOTSPOT_PORT), CustomHTTPRequestHandler) as httpd:
            httpd.allow_reuse_address = True
            
            print(f"🔥 Servidor Hotspot ativo na porta {MOBILE_HOTSPOT_PORT}")
            print("⚡ Aguardando configuração de hotspot...")
            print()
            print("🔄 Pressione Ctrl+C para parar")
            
            httpd.serve_forever()
            
    except Exception as e:
        print(f"❌ Erro no servidor móvel: {e}")

def start_pc_sharing_server():
    """Iniciar servidor para compartilhamento do PC"""
    print("💻 MODO COMPARTILHAMENTO PC")
    print("=" * 40)
    print("""
💡 CONFIGURAR HOTSPOT DO WINDOWS:
1. Configurações → Rede e Internet → Hotspot Móvel
2. Ative "Compartilhar minha conexão com a Internet"
3. Configure nome e senha da rede
4. Conecte o celular no hotspot do PC
5. Use o IP que aparecer abaixo
""")
    
    start_wifi_server(get_local_ips())

def start_universal_server(local_ips, interfaces):
    """Iniciar servidor universal para todos os cenários"""
    print("🌍 MODO UNIVERSAL - Todos os Cenários")
    print("=" * 50)
    
    # Iniciar múltiplos servidores
    servers = start_multiple_servers()
    
    if not servers:
        print("❌ Nenhum servidor pôde ser iniciado!")
        return
    
    print()
    print("📱 URLS PARA CELULAR:")
    print()
    
    # URLs WiFi
    if local_ips:
        print("🏠 MODO WIFI (mesma rede):")
        for ip in local_ips:
            print(f"   http://{ip}:{PORT}/main.html")
        print()
    
    # URLs Hotspot
    print("🔥 MODO HOTSPOT (dados móveis):")
    print(f"   Porta {MOBILE_HOTSPOT_PORT} - Configure hotspot primeiro")
    for ip in local_ips:
        print(f"   http://{ip}:{MOBILE_HOTSPOT_PORT}/main.html")
    print()
    
    # Instruções gerais
    print("📋 INSTRUÇÕES GERAIS:")
    print("• Para WiFi: Conecte celular na mesma rede")
    print("• Para Hotspot: Ative hotspot no celular/PC")
    print("• URLs são atualizadas automaticamente")
    print()
    
    print(create_mobile_hotspot_instructions())
    
    print("� Pressione Ctrl+C para parar todos os servidores")
    print("=" * 50)
    
    try:
        # Manter todos os servidores rodando
        for name, port, server in servers:
            thread = Thread(target=server.serve_forever, daemon=True)
            thread.start()
            print(f"✅ {name} rodando na porta {port}")
        
        # Loop principal
        while True:
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("\n🛑 Parando todos os servidores...")
        for name, port, server in servers:
            server.shutdown()
            print(f"🛑 {name} (porta {port}) parado")
    except Exception as e:
        print(f"❌ Erro: {e}")

def verificar_arquivo_principal():
    """Verifica se o main.html existe"""
    # Muda para o diretório do script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    if not os.path.exists('main.html'):
        print("❌ Erro: main.html não encontrado no diretório do script!")
        print(f"📁 Diretório do script: {script_dir}")
        return False
    print(f"✅ main.html encontrado em: {script_dir}")
    return True

if __name__ == "__main__":
    # Verificar arquivo principal primeiro
    if not verificar_arquivo_principal():
        print("💡 Certifique-se de que o main.html está no mesmo diretório do servidor")
        input("Pressione Enter para sair...")
        sys.exit(1)
    
    main()
