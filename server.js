const { Server } = require('socket.io');

const PORT = 8000;

const ACTIONS = {
    CONNECTED: "connected",
    JOIN: 'join',
    NEW_CLIENT: "new_client",
    OFFER: "offer",
    ANSWER: "answer",
    ICE: "ice",
};

const io = new Server(PORT, {
    cors: "*"
});

io.on('connection', (socket) => {
    socket.on(ACTIONS.JOIN, userId => {
        socket.broadcast.emit(ACTIONS.NEW_CLIENT, userId);
    })

    socket.on(ACTIONS.OFFER, async({ idFrom, idTo, offer }) => {
        // Кто то отправил оффер - нам нужно его отправить
        // console.log('new offer', idFrom, idTo, offer);

        const client = socket.nsp.sockets.get(idTo);

        if (!client) return;

        client.emit(ACTIONS.OFFER, { idFrom, offer });
    })

    socket.on(ACTIONS.ANSWER, (data) => {
        // Клиент создал ответ, его нужно вернуть обратно
        const { idFrom, idTo, answer } = data;

        const client = socket.nsp.sockets.get(idTo);

        if (!client) return;

        client.emit(ACTIONS.ANSWER, { idFrom, answer });
    })

    socket.on(ACTIONS.ICE, (data) => {
        // { idFrom, idTo, ice }
    })
})