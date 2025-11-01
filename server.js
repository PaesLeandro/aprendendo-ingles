const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '';

    if (req.url === '/') {
        filePath = path.join(__dirname, 'public', 'index.html');
    } else if (req.url === '/game.html') {
        filePath = path.join(__dirname, 'game.html');
    } else {
        filePath = path.join(__dirname, 'public', req.url);
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Se arquivo não encontrado, servir index.html
                fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, indexContent) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Erro interno do servidor');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(indexContent, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('Erro interno do servidor: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3001;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor rodando em:`);
    console.log(`   Local:   http://localhost:${PORT}/`);
    console.log(`   Rede:    http://192.168.10.10:${PORT}/`);
    console.log(`\n🎯 Little English Explorer está pronto!`);
});

server.on('error', (err) => {
    console.error('Erro no servidor:', err);
});
