const express = require("express");
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Meme = require('../models/Meme');

router.get('/test', (req, res) => {
    res.json({ msg: 'battles route work' })
});

module.exports = router;