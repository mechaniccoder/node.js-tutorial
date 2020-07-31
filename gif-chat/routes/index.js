const express = require("express");
const router = express.Router({strict: true});

const Room = require("../schemas/room");

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
      password: req.body.password,
      owner: "test",
    });
    const newRoom = await room.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
