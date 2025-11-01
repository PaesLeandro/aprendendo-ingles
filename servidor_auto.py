#!/usr/bin/env python3
import sys
import os

# Adiciona o modo universal por padrão
sys.argv.append('--modo=4')

# Executa o servidor principal
if __name__ == "__main__":
    # Importa e executa o servidor móvel
    exec(open('servidor_mobile.py').read())
