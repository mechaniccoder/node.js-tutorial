const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // cpu 개수만큼 워커를 만듭시다.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}가 종료됐습니다.`);
    cluster.fork();
  });
} else {
  http
    .createServer((req, res) => {
      res.write("<h1>hello node.js</h1>");
      res.end("<p>hello! cluster</p>");
      setTimeout(() => {
        process.exit();
      }, 1000);
    })
    .listen(8080);

  console.log(`${process.pid}번 워커 실행`);
}
