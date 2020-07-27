var express = require("express");
var User = require("../schemas/user");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const user = new User({
      name: req.body.name,
      age: req.body.age,
      married: req.body.married,
    });
    const promise = await user.save(); // 유저 데이터 저장
    res.json(promise);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
