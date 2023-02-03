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

io.of("/").adapter.on("join-room", (roomId, id) => {
  io.to(roomId).emit(ACTIONS.ROOM_NEW_CLIENT_NOTIFICATION, id);
});

io.of("/").adapter.on("leave-room", (roomId, id) => {
  io.to(roomId).emit(ACTIONS.ROOM_CLIENT_LEAVE_NOTIFICATION, id);
});
