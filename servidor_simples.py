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
MOBILE_HOTSPOT_PORT = 8081

# Classe customizada para servidor HTTP


class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header(
            'Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def log_message(self, format_str, *args):
        client_ip = self.client_address[0]
        message = f"📱 {client_ip} - {format_str % args}"
        print(message)


def get_local_ips():
    """Obtém todos os IPs locais disponíveis"""
    local_ips = []
    try:
        # Conecta a um endereço externo para descobrir o IP local
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            local_ips.append(s.getsockname()[0])

        # Também adiciona outros IPs das interfaces
        hostname = socket.gethostname()
        for info in socket.getaddrinfo(hostname, None):
            ip = info[4][0]
            if ip not in local_ips and not ip.startswith('127.') and ':' not in ip:
                local_ips.append(ip)

    except Exception:
        local_ips = ['192.168.1.100']  # IP padrão como fallback

    return local_ips


def verificar_arquivo_principal():
    """Verifica se o main.html existe"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    MAIN_FILE = 'main-standalone.html'
    if not os.path.exists(MAIN_FILE):
        print(f"❌ Erro: {MAIN_FILE} não encontrado!")
        print(f"📁 Diretório: {script_dir}")
        return False
    print(f"✅ {MAIN_FILE} encontrado em: {script_dir}")
    return True


def start_server(port, name):
    """Inicia um servidor HTTP na porta especificada"""
    try:
        handler = CustomHTTPRequestHandler
        httpd = socketserver.TCPServer((HOST, port), handler)
        httpd.allow_reuse_address = True

        print(f"✅ {name} rodando na porta {port}")
        httpd.serve_forever()

    except OSError as e:
        if e.errno == 10048:  # Porta já em uso
            print(f"⚠️ Porta {port} já está em uso")
        else:
            print(f"❌ Erro ao iniciar {name}: {e}")
    except Exception as e:
        print(f"❌ Erro inesperado em {name}: {e}")


def main():
    """Função principal"""
    print("🚀 Little English Explorer - Servidor Móvel Universal")
    print("=" * 60)

    # Verifica arquivo principal
    if not verificar_arquivo_principal():
        input("Pressione Enter para sair...")
        return

    # Obtém IPs locais
    local_ips = get_local_ips()

    print("🌐 IPs disponíveis:")
    for ip in local_ips:
        print(f"   📱 http://{ip}:{PORT}/main-standalone.html")
        print(f"   🔥 http://{ip}:{MOBILE_HOTSPOT_PORT}/main-standalone.html")
    print()

    print("🎯 INSTRUÇÕES DE USO:")
    print("=" * 40)
    print("📶 WiFi: Conecte o celular na mesma rede WiFi")
    print("🔥 Hotspot: Ative o hotspot do celular e conecte o PC")
    print("💻 PC Hotspot: Configure o PC como hotspot")
    print()

    print("🚀 Iniciando servidores...")
    print("=" * 40)

    # Inicia servidores em threads separadas
    threads = []

    # Servidor principal (porta 8080)
    thread1 = Thread(target=start_server, args=(
        PORT, "Principal"), daemon=True)
    thread1.start()
    threads.append(thread1)

    # Servidor hotspot (porta 8081)
    thread2 = Thread(target=start_server, args=(
        MOBILE_HOTSPOT_PORT, "Hotspot"), daemon=True)
    thread2.start()
    threads.append(thread2)

    # Aguarda um momento para os servidores iniciarem
    time.sleep(2)

    print()
    print("🎉 SERVIDORES ATIVOS!")
    print("=" * 40)
    print("💻 Acesso Local:")
    print(f"   http://localhost:{PORT}/main-standalone.html")
    print()
    print("📱 Acesso Móvel:")
    for ip in local_ips:
        print(f"   http://{ip}:{PORT}/main-standalone.html")
        print(
            f"   http://{ip}:{MOBILE_HOTSPOT_PORT}/main-standalone.html (hotspot)")
    print()
    print("🔄 Pressione Ctrl+C para parar os servidores")
    print("=" * 60)

    try:
        # Mantém o programa rodando
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Parando servidores...")
        print("✅ Servidores parados!")


if __name__ == "__main__":
    main()
