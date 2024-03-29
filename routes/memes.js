const express = require("express");
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Meme = require('../models/Meme');

router.get('/test', (req, res) => {
  res.json({ msg: 'Meme route work' })
});

// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter });

const validateMemesInput = require('../validation/meme');
router.post('/post', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateMemesInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newMeme = new Meme({
    caption: req.body.caption,
    mediaLink: req.body.mediaLink,
    user: req.user.id,
    username: req.user.username,
    name: req.user.name,
    avatar: req.user.avatar
  });

  newMeme.save().then(meme => res.json(meme));
  User.findOne({ username: req.user.username }).then(user => {
    if (!user) {
      console.log('No user found');
      console.log(newMeme.user);
    }
    user.memes.unshift({ meme: newMeme.id });
    user.save();
  }).catch(err => console.log(err));
});

router.get('/all', (req, res) => {
  Meme.find().sort({ date: -1 })
    .then(memes => {
      const response = {
        count: memes.length,
        memes
      };
      res.json({ response })
    })
    .catch(error => res.status(404).json({ noMemesFound: 'no Meme found' }));
});

router.get('/findmeme/:id', (req, res) => {
  Meme.findById(req.params.id)
    .then(meme => {
      res.json(meme)
    })
    .catch(error => res.status(404).json({ noMemeFound: 'no Meme found with given ID' }));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findById(req.user.id).then(user => {
    Meme.findById(req.params.id)
      .then(meme => {
        const removeIndex = user.memes
          .map(item => item.meme.toString())
          .indexOf(req.params.id);
        meme.remove().then(() => res.json({ success: true }))
          .catch(error => res.json(error));
        user.memes.splice(removeIndex, 1);
        user.save();
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;