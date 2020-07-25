"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get("/", (req, res, next) => {
    res.send("hello typescript express!");
});
exports.default = app;
