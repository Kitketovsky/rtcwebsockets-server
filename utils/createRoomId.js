const { ROOM_PREFIX } = require("../const/roomPrefix");
const createRoomId = (id) => {
  return `${ROOM_PREFIX}${id}`;
};

module.exports = { createRoomId };
