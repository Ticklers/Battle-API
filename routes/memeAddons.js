const express = require("express");
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Meme = require('../models/Meme');

router.get('/test', (req, res) => {
    res.json({ msg: 'addons route work' })
});

router.post('/like/:id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findById(req.user.id).then(user => {
            Meme.findById(req.params.id)
                .then(meme => {
                    if (
                        meme.likes.filter(like => like.userId.toString() === req.user.id)
                            .length > 0
                    ) {
                        return res
                            .status(400)
                            .json({ alreadyLiked: 'User already liked this post' });
                    }
                    meme.likes.unshift({ userId: req.user.id, date: Date.now() });
                    user.likes.unshift({ meme: req.params.id });
                    user.save();
                    meme.save().then(meme => res.json(meme));
                })
                .catch(err => res.status(404).json({ MemeNotound: 'No meme found' }));
        });
    }
);

router.post('/unlike/:id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findById(req.user.id).then(user => {
            Meme.findById(req.params.id)
                .then(meme => {
                    if (
                        meme.likes.filter(like => like.userId.toString() === req.user.id)
                            .length === 0
                    ) {
                        return res.status(400)
                            .json({ notliked: 'You have not yet liked this post' });
                    }

                    const removeIndex = meme.likes
                        .map(item => item.userId.toString())
                        .indexOf(req.user.id);

                    meme.likes.splice(removeIndex, 1);

                    const removeMemeIndex = user.likes
                        .map(item => item.meme.toString())
                        .indexOf(req.params.id);

                    user.likes.splice(removeMemeIndex, 1);
                    user.save();
                    meme.save().then(meme => res.json(meme));
                })
                .catch(err => res.status(404).json({ tweetnotfound: 'No tweet found' }));
        });
    }
);

module.exports = router;