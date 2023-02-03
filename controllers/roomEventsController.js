const { ACTIONS } = require("../const/actions");
const { createRoomId } = require("../utils/createRoomId");
const { getRoomsWithoutSockets } = require("../utils/getRoomsWithoutSockets");
const roomEventsController = (io, socket) => {
  const getUpdatedRoomsWithoutSockets = () => {
    const roomsMap = io.of("/").adapter.rooms;
    return getRoomsWithoutSockets(roomsMap);
  };

  // При подключение нового клиента, только ему отправить список комнат
  socket.on(ACTIONS.ROOM_LIST, () => {
    const rooms = getUpdatedRoomsWithoutSockets();
    socket.emit(ACTIONS.ROOM_LIST, rooms);
  });

  socket.on(ACTIONS.ROOM_JOIN, (roomId) => {
    socket.join(roomId);
    console.log(io.of("/").adapter.rooms);
  });

  socket.on(ACTIONS.ROOM_CREATE, (roomName) => {
    // e.g., room:my_private_room
    const roomId = createRoomId(roomName);
    socket.join(roomId);

    const rooms = getUpdatedRoomsWithoutSockets();

    // При создании комнаты всем клиентам отправить обновленный список
    io.of("/").emit(ACTIONS.ROOM_LIST, rooms);
  });
};

module.exports = { roomEventsController };
