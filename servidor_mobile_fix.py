#!/usr/bin/env python3
import http.server
import socketserver
import socket
import os

# Configuração
PORT = 8080
HOST = '0.0.0.0'

class MobileHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Headers para compatibilidade móvel
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Log customizado com IP do cliente
        client_ip = self.client_address[0]
        print(f"📱 {client_ip} - {format % args}")

def get_local_ips():
    """Obtém IPs locais para acesso móvel"""
    ips = []
    try:
        # Método 1: Conectar para descobrir IP principal
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            ips.append(s.getsockname()[0])
        
        # Método 2: Obter todos os IPs das interfaces
        hostname = socket.gethostname()
        for info in socket.getaddrinfo(hostname, None):
            ip = info[4][0]
            if ip not in ips and not ip.startswith('127.') and ':' not in ip:
                ips.append(ip)
    except:
        ips = ['192.168.1.100']  # Fallback
    
    return ips

def main():
    # Muda para o diretório do script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    # Verifica se main.html existe
    if not os.path.exists('main.html'):
        print("❌ Erro: main.html não encontrado!")
        print(f"📁 Diretório: {script_dir}")
        input("Pressione Enter para sair...")
        return
    
    print("🚀 Little English Explorer - Servidor Móvel")
    print("=" * 50)
    print(f"✅ main.html encontrado em: {script_dir}")
    print()
    
    # Obtém IPs locais
    local_ips = get_local_ips()
    
    print("🌐 URLs PARA ACESSO MÓVEL:")
    print("-" * 30)
    print("💻 Acesso Local (PC):")
    print(f"   http://localhost:{PORT}/main.html")
    print()
    print("📱 Acesso Celular (mesma WiFi):")
    for ip in local_ips:
        print(f"   http://{ip}:{PORT}/main.html")
    print()
    
    print("📋 INSTRUÇÕES:")
    print("-" * 30)
    print("1. Certifique-se que PC e celular estão na MESMA rede WiFi")
    print("2. No celular, acesse uma das URLs acima")
    print("3. Se não funcionar, execute configurar_firewall.bat como Admin")
    print()
    
    print(f"🚀 Iniciando servidor na porta {PORT}...")
    print("🔄 Pressione Ctrl+C para parar")
    print("=" * 50)
    
    try:
        with socketserver.TCPServer((HOST, PORT), MobileHTTPRequestHandler) as httpd:
            httpd.allow_reuse_address = True
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado!")
    except Exception as e:
        print(f"❌ Erro: {e}")
        input("Pressione Enter para sair...")

if __name__ == "__main__":
    main()
