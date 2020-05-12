const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const Meme = require("../models/Meme");

router.get("/test", (req, res) => {
  res.json({ msg: "Feed route work" });
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var users = [];
    var memes = [];
    PromiseArr = [];
    User.findById(req.user.id).then((user) => {
      while (user.feed.length > 0) {
        user.feed.pop();
      }
      followings = user.followings;
      followings.forEach((element) => {
        users.push(element.following);
      });
      for (var j = 0; j < users.length; j++) {
        PromiseArr.push(
          Meme.find({ user: users[j] })
            .then((me) => {
              for (var i = 0; i < me.length; i++) {
                memes.push(me);
              }
            })
            .catch((err) => console.log(err))
        );
      }
      return res.json(Promise.all(PromiseArr));
    });
  }
);

router.get(
  "/dummy",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById("5ea4889cc9c66000242467c5").then((user) => {
      return res.json(user.memes);
    });
  }
);

router.get("search", function (req, res, next) {
  var q = req.query.q;
  User.find(
    {
      username: {
        $regex: new RegExp(q),
      },
    },
    {
      _id: 0,
      _v: 0,
    },
    function (err, data) {
      res.json(data);
    }
  ).limit(10);
});

module.exports = router;
