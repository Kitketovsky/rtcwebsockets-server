const WS = require('ws');
const express = require('express');

const PORT = process.env.PORT || 3000;
const INDEX = './index.html';

const app = express();

app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))

const httpServer = app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
const wss = new WS.WebSocketServer({ server: httpServer, host: process.env.HOST || 'localhost', port: 8080 });
wss.on('connection', function connection(ws) {
    console.log('SERVER:: A new client connected...');

    ws.send('FROM SERVER:: You are connected to the server...');

    ws.on('message', function message(data) {
        console.log('FROM CLIENT::', data);
    });
});