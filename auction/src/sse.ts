const SSE = require('sse');

export default (server: any) => {
  const sse = new SSE(server);
  sse.on('connection', (client: any) => {
    setInterval(() => {
      client.send(new Date().valueOf().toString());
    }, 1000);
  });
};
