const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
// const multer = require("multer");

router.get('/test', (req, res) => {
  res.json({ msg: 'updateUser route working' })
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png'|| file.mimetype === 'image/jpeg') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({ storage: storage, limits: { fileSize: 2* 1024 * 1024 }, fileFilter: fileFilter });

router.patch("/update/:userId", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const id = req.params.userId;
  User.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User Data Updated",
        request: {
          type: "GET",
          url: "http://localhost:5000/api/users/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// router.patch("/avatar/:userId", passport.authenticate('jwt', { session: false }), upload.single('avatar'), (req, res, next) => {
//   const id = req.params.userId;
//   console.log('1');
//   const updateOps = {
//     avatar: req.file.path
//   };
//   console.log('2');
//   console.log(req.file);
//   User.update({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "User avatar updated",
//         request: {
//           type: "GET",
//           url: "http://localhost:5000/api/users/" + id
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

router.delete('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => {
      res.json({ success: true })
        .catch((error) => {
          assert.isNotOk(error, 'Promise error');
          done();
        });
    });
  }
);

router.post('/follow/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findById(req.user.id).then(user => {
    User.findById(req.params.id).then(otherUser => {
      if (otherUser) {
        if (user.followings.filter(item => item.following.toString() === req.params.id).length > 0) {
          var removeIndex = user.followings
            .map(item => item.following.toString())
            .indexOf(req.params.id);
          user.followings.splice(removeIndex, 1);

          removeIndex = otherUser.followers
            .map(item => item.follower.toString())
            .indexOf(req.user.id);
          otherUser.followers.splice(removeIndex, 1);

          user.save();
          otherUser.save();

          return res.status(200).json({
            message: user.username + " has unfollowed " + otherUser.username,
            user: user,
            otherUser: otherUser
          });
        }

        user.followings.unshift({ following: req.params.id });
        otherUser.followers.unshift({ follower: req.user.id });
        user.save();
        otherUser.save();

        return res.status(200).json({
          message: user.username + " is now following " + otherUser.username,
          user: user,
          otherUser: otherUser
        });
      }

      else {
        return res.status(404).json({ NotFound: "user not found" });
      }
    })
  })
})

module.exports = router;