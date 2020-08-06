import * as socketIo from 'socket.io';

export default (server: any, app: any) => {
  const io = socketIo(server, { path: '/socket.io' });

  app.set('io', io);

  io.on('connection', (socket: socketIo.Socket) => {
    const req = socket.request;
    const {
      headers: { referer },
    } = req;
    const roomId = referer.split('/')[referer.split('/').length - 1];
    socket.join(roomId);
    socket.on('disconnect', () => {
      console.log('소켓 연결해제');
      socket.leave(roomId);
    });
  });
};
