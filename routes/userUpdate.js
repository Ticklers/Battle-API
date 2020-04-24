const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const multer = require("multer");

router.get('/test', (req, res) => {
    res.json({ msg: 'updateUser route working' })
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png'|| file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, limits: { fileSize: 2* 1024 * 1024 }, fileFilter: fileFilter });

router.patch("/update/:userId", (req, res, next) => {
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

  router.patch("/avatar/:userId", upload.single('avatar'), (req, res, next) => {
    const id = req.params.userId;
    console.log('1');
    const updateOps = {
      avatar: req.file.path
    };
    console.log('2');
    console.log(req.file);
    User.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User avatar updated",
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
  
  module.exports = router;