const { ACTIONS } = require("../const/actions");

const clientStatusController = (io, socket) => {
  socket.on(ACTIONS.JOIN, ({ id }) => {
    socket.broadcast.emit(ACTIONS.CLIENT_NEW, { id });
  });

  socket.on("disconnect", () => {
    io.emit(ACTIONS.CLIENT_DISCONNECTED, { id: socket.id });
  });
};

module.exports = { clientStatusController };
