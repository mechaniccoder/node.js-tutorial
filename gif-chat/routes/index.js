const express = require("express");
const router = express.Router({strict: true});
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Room = require("../schemas/room");
const Chat = require("../schemas/chat");

router.get("/", async (req, res) => {
  const rooms = await Room.find({});
  res.render("index", {rooms, title: "index"});
});

router.get("/room", (req, res) => {
  res.render("room", {title: "방 생성"});
});

router.post("/room", async (req, res, next) => {
  try {
    const room = new Room({
      title: req.body.title,
      max: req.body.max,
      owner: req.session.color,
      password: req.body.password,
    });
    const newRoom = await room.save();
    console.log(newRoom);
    const io = req.app.get("io");
    io.of("/room").emit("newRoom", newRoom);
    res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/room/:id", async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findOne({_id: roomId});
    const io = req.app.get("io");
    if (!room) {
      req.flash("roomError", "방이 존재하지 않습니다");
      return res.redirect("/");
    }
    if (room.password && room.password !== req.query.password) {
      req.flash("roomError", "비밀번호가 틀렸습니다");
      return res.redirect("/");
    }

    const {rooms} = io.of("/chat").adapter;
    if (
      rooms &&
      rooms[req.params.id] &&
      room.max <= rooms[req.params.id].length
    ) {
      req.flash("roomError", "허용인원 초과");
      return res.redirect("/");
    }

    const chats = await Chat.find({room: roomId}).sort("createdAt");
    res.render("chat", {
      room,
      title: room.title,
      chats,
      user: req.session.color,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/room/:id", async (req, res, next) => {
  try {
    const roomId = req.params.id;
    await Room.remove({_id: roomId});
    await Chat.remove({room: roomId});
    res.send("ok");
    const io = req.app.get("io");
    setTimeout(() => {
      io.of("/room").emit("removeRoom", roomId);
    }, 2000);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/room/:id/chat", async (req, res, next) => {
  try {
    const chat = new Chat({
      room: req.params.id,
      user: req.session.color,
      chat: req.body.chat,
    });
    await chat.save();
    req.app.get("io").of("/chat").to(req.params.id).emit("chat", chat);
    res.send("ok");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

fs.readdir("uploads", (error) => {
  if (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      );
    },
  }),
  limits: {fileSize: 5 * 1024 * 1024},
});

router.post("/room/:id/gif", upload.single("gif"), async (req, res, next) => {
  try {
    const chat = new Chat({
      room: req.params.id,
      user: req.session.color,
      gif: req.file.filename,
    });
    await chat.save();
    req.app.get("io").of("/chat").to(req.params.id).emit("chat", chat);
    res.send("ok");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
