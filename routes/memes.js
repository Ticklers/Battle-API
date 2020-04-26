const express = require("express");
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Meme = require('../models/Meme');

router.get('/test', (req, res) => {
    res.json({ msg: 'Meme route work' })
});

const validateMemesInput = require('../validation/meme');
router.post('/post', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateMemesInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newMeme = new Meme({
        caption: req.body.caption,
        media: req.body.media,
        user: req.user.id
    });

    newMeme.save().then(meme => res.json(meme));
    User.findOne({ username: req.user.username }).then(user => {
        if (!user) {
            console.log('no user found');
            console.log(newMeme.user);
        }
        console.log(user.memes);
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
        .then(meme => res.json(meme))
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