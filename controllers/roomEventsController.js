const { ACTIONS } = require("../const/actions");
const { createRoomId } = require("../utils/createRoomId");
const { getRoomsWithoutSockets } = require("../utils/getRoomsWithoutSockets");
const roomEventsController = (io, socket) => {
  const getUpdatedRoomsWithoutSockets = () => {
    const roomsMap = io.of("/").adapter.rooms;
    return getRoomsWithoutSockets(roomsMap);
  };

  // Добавляем префикс "room:" к комнате, чтобы отличить ее от комнат сокетов
  socket.on(ACTIONS.ROOM_CREATE, (roomName) => {
    const roomId = createRoomId(roomName);
    socket.join(roomId);

    // Всем клиентам отправляем обновленный список комнат
    const rooms = getUpdatedRoomsWithoutSockets();
    io.of("/").emit(ACTIONS.ROOM_LIST, rooms);
  });

  // При присоединении в комнату оповещаем об этом других
  socket.on(ACTIONS.ROOM_JOIN, (roomId) => {
    socket.join(roomId);
    socket.broadcast.emit(ACTIONS.ROOM_NEW_CLIENT_NOTIFICATION, socket.id);
  });

  // Отправляем список всех комнат с "room:" префиксом
  socket.on(ACTIONS.ROOM_LIST, () => {
    const rooms = getUpdatedRoomsWithoutSockets();
    socket.emit(ACTIONS.ROOM_LIST, rooms);
  });

  // При отсутствии соединения или закрытии браузера
  // Используется "disconnecting", пока мы можем видеть комнаты до "disconnect"
  socket.on("disconnecting", () => {
    for (let room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit(ACTIONS.ROOM_CLIENT_LEAVE_NOTIFICATION, socket.id);
      }
    }
  });

  // Если клиент нажал на кнопку "Выйти"
  socket.on(ACTIONS.ROOM_LEAVE, (roomId) => {
    socket.leave(roomId);
    io.to(roomId).emit(ACTIONS.ROOM_CLIENT_LEAVE_NOTIFICATION, socket.id);
  });
};

module.exports = { roomEventsController };
