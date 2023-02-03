const { ROOM_PREFIX } = require("../const/roomPrefix");
const getRoomsWithoutSockets = (rooms) => {
  return Array.from(rooms.keys()).filter((room) =>
    room.startsWith(ROOM_PREFIX)
  );
};

module.exports = { getRoomsWithoutSockets };
