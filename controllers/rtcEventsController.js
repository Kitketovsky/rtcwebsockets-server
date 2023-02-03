const { ACTIONS } = require("../const/actions");

const rtcEventsController = (io, socket) => {
  socket.on(ACTIONS.RTC_OFFER, async ({ idFrom, idTo, offer }) => {
    io.to(idTo).emit(ACTIONS.RTC_OFFER, { idFrom, offer });
  });

  socket.on(ACTIONS.RTC_ANSWER, ({ idFrom, idTo, answer }) => {
    io.to(idTo).emit(ACTIONS.RTC_ANSWER, { idFrom, answer });
  });

  socket.on(ACTIONS.RTC_ICE, ({ idFrom, ice, idTo }) => {
    io.to(idTo).emit(ACTIONS.RTC_ICE, { idFrom, ice });
  });
};

module.exports = { rtcEventsController };
