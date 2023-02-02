import { ACTIONS } from "../const/actions";

export const registerRTCHandlers = (io, socket) => {
  socket.on(ACTIONS.OFFER, async ({ idFrom, idTo, offer }) => {
    // Хост отправил свой оффер, мы отправляем клиенту
    io.to(idTo).emit(ACTIONS.OFFER, { idFrom, offer });
  });

  socket.on(ACTIONS.ANSWER, ({ idFrom, idTo, answer }) => {
    // Клиент создал ответ, мы отправляем хосту
    io.to(idTo).emit(ACTIONS.ANSWER, { idFrom, answer });
  });

  socket.on(ACTIONS.ICE, (data) => {
    // { idFrom, idTo, ice }
  });
};
