const http = require("http");

http
  .createServer((req, res) => {
    res.write("<h1>Hello, http server!</h1>");
    res.end();
  })
  .listen(8080, () => {
    console.log("8080");
  });
