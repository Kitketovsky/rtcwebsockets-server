const { Server } = require("socket.io");
const {
  registerClientStatusHandlers,
} = require("./controllers/registerClientStatusHandlers");
const { registerRTCHandlers } = require("./controllers/registerRTCHandlers");

const PORT = process.env.port || 8000;

const io = new Server(PORT, {
  cors: "*",
});

const onConnection = (socket) => {
  registerClientStatusHandlers(io, socket);
  registerRTCHandlers(io, socket);
};

io.on("connection", onConnection);
