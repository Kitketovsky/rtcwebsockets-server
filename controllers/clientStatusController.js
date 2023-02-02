const { ACTIONS } = require("../const/actions");

const clientStatusController = (io, socket) => {
  socket.on(ACTIONS.JOIN, ({ id }) => {
    socket.broadcast.emit(ACTIONS.NEW_CLIENT, { id });
  });
};

module.exports = { clientStatusController };
