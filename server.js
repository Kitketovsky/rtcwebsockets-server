const WS = require('ws');
const express = require('express');

const PORT = process.env.PORT || 3000;
const INDEX = './index.html';

const app = express();

app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))

const httpServer = app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
const wss = new WS.WebSocketServer({ server: httpServer, host: process.env.HOST || 'localhost' });

wss.on('connection', function connection(ws) {
    ws.send(JSON.stringify({ type: "notification", msg: 'FROM SERVER:: You are connected to the server...' }));

    ws.on('message', function message(data) {
        const body = JSON.parse(data);

        if (body.type === 'joined') {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WS.WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'joined', msg: `A new user ${body.userId} joined the channel...`, id: body.userId }));
                }
            })
        }

        if (body.type === 'offer') {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WS.WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'offer', offer: body.offer }));
                }
            })
        }

        if (body.type === 'answer') {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WS.WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'answer', answer: body.answer }));
                }
            })
        }

        if (body.type === 'ice') {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WS.WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'ice', ice: body.ice }));
                }
            })
        }
    });
});