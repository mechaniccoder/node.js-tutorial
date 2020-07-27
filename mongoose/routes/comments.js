const express = require("express");
const Comment = require("../schemas/comment");
let router = express.Router();

router.get("/:id", (req, res, next) => {
  Comment.find({commenter: req.params.id})
    .populate("commenter")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post("/", (req, res, next) => {
  const comment = new Comment({
    commenter: req.body.id,
    comment: req.body.comment,
  });
  comment
    .save()
    .then((result) => {
      return Comment.populate(result, {path: "commenter"});
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.patch("/:id", async (req, res, next) => {
  try {
    const promise = await Comment.update(
      {_id: req.params.id},
      {comment: req.body.comment}
    );
    res.json(promise);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const promise = await Comment.remove({_id: req.params.id});
    res.json(promise);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
