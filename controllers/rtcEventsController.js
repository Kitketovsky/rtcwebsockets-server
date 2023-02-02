const { ACTIONS } = require("../const/actions");

const rtcEventsController = (io, socket) => {
  socket.on(ACTIONS.OFFER, async ({ idFrom, idTo, offer }) => {
    io.to(idTo).emit(ACTIONS.OFFER, { idFrom, offer });
  });

  socket.on(ACTIONS.ANSWER, ({ idFrom, idTo, answer }) => {
    io.to(idTo).emit(ACTIONS.ANSWER, { idFrom, answer });
  });

  socket.on(ACTIONS.ICE, ({ idFrom, ice, idTo }) => {
    io.to(idTo).emit(ACTIONS.ICE, { idFrom, ice });
  });
};

module.exports = { rtcEventsController };
