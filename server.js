const { Server } = require("socket.io");
const {
  clientStatusController,
} = require("./controllers/clientStatusController");
const { rtcEventsController } = require("./controllers/rtcEventsController");

const PORT = process.env.PORT || 8000;

const io = new Server(PORT, {
  cors: "*",
});

const onConnection = (socket) => {
  clientStatusController(io, socket);
  rtcEventsController(io, socket);
};

io.on("connection", onConnection);
