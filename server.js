const WS = require('ws');

const wss = new WS.WebSocketServer({ host: process.env.HOST || 'localhost', port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('SERVER:: A new client connected...');

    ws.send('FROM SERVER:: You are connected to the server...');

    ws.on('message', function message(data) {
        console.log('FROM CLIENT::', data);
    });
});