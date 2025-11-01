const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;
const host = '0.0.0.0';

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './working.html';
    }

    console.log(`Tentando servir: ${filePath}`);

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            console.log(`Erro ao ler arquivo: ${error.message}`);
            if (error.code === 'ENOENT') {
                // Arquivo não encontrado, tentar working.html
                fs.readFile('./working.html', (err, content) => {
                    if (err) {
                        res.writeHead(404);
                        res.end('404 - Arquivo não encontrado');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('500 - Erro interno do servidor');
            }
        } else {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, host, () => {
    console.log(`🚀 Servidor rodando em http://${host}:${port}/`);
    console.log(`📱 Acesse pelo celular: http://[SEU-IP]:${port}/`);
    console.log(`📂 Diretório: ${__dirname}`);
    console.log('📋 Arquivos disponíveis:');

    fs.readdir('.', (err, files) => {
        if (!err) {
            files.filter(f => f.endsWith('.html')).forEach(file => {
                console.log(`   • http://${host}:${port}/${file}`);
            });
        }
    });
});
