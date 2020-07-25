"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http_1 = require("http");
const port = Number(process.env.PORT) || 3000;
const server = http_1.createServer(app_1.default);
server.listen(port, () => {
    console.log(`${port}포트 서버 대기 중!`);
});
exports.default = server;
