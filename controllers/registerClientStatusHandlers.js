import { ACTIONS } from "../const/actions";

export const registerClientStatusHandlers = (io, socket) => {
  socket.on(ACTIONS.JOIN, (userId) => {
    socket.broadcast.emit(ACTIONS.NEW_CLIENT, userId);
  });
};
