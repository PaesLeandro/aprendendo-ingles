const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`📨 Request: ${req.method} ${req.url}`);

    // Remove query parameters and decode URL
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/working.html';

    // Remove leading slash
    let filePath = urlPath.substring(1);

    // Add .html extension if no extension
    if (!path.extname(filePath)) {
        filePath += '.html';
    }

    console.log(`📂 Looking for file: ${filePath}`);

    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.log(`❌ File not found: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                <head><title>404 - File Not Found</title></head>
                <body style="font-family: Arial; text-align: center; padding: 50px;">
                    <h1>🔍 File Not Found</h1>
                    <p>The file <strong>${filePath}</strong> does not exist.</p>
                    <p>Available files:</p>
                    <ul style="display: inline-block; text-align: left;">
                        ${fs.readdirSync('.').filter(f => f.endsWith('.html')).map(f => `<li><a href="/${f}">${f}</a></li>`).join('')}
                    </ul>
                </body>
                </html>
            `);
            return;
        }

        // Read and serve file
        const content = fs.readFileSync(filePath);
        const ext = path.extname(filePath);

        const mimeTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml'
        };

        const contentType = mimeTypes[ext] || 'text/plain';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache'
        });

        res.end(content);
        console.log(`✅ Served: ${filePath} (${contentType})`);

    } catch (error) {
        console.log(`💥 Error serving ${filePath}:`, error.message);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>500 - Internal Server Error</h1><p>${error.message}</p>`);
    }
});

const PORT = 8080;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`🚀 Little English Explorer Server running:`);
    console.log(`   💻 Local:   http://localhost:${PORT}/`);
    console.log(`   📱 Network: http://192.168.10.10:${PORT}/`);
    console.log(`   📂 Serving files from: ${process.cwd()}`);
    console.log(`   🎯 Default file: working.html`);
});

server.on('error', (err) => {
    console.error('❌ Server error:', err);
});

process.on('SIGINT', () => {
    console.log('\n👋 Server shutting down...');
    server.close();
    process.exit(0);
});
