const { Server } = require("socket.io");
const { rtcEventsController } = require("./controllers/rtcEventsController");
const { roomEventsController } = require("./controllers/roomEventsController");
const { ACTIONS } = require("./const/actions");

const PORT = process.env.PORT || 8000;

const io = new Server(PORT, {
  cors: "*",
});

const onConnection = (socket) => {
  rtcEventsController(io, socket);
  roomEventsController(io, socket);
};

io.on("connection", onConnection);
