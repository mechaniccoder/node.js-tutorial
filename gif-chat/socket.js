const SocketIO = require("socket.io");

module.exports = (server, app) => {
  const io = SocketIO(server, {path: "/socket.io"});
};
