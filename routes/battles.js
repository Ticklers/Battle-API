const express = require("express");
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Meme = require('../models/Meme');
const Battle = require('../models/Battle');
var _ = require('lodash');
const host = 'http://localhost:5000/'

router.get('/test', (req, res) => {
    res.json({ msg: 'battles route work' })
});

router.post('/create', (req, res) => {
    if(_.isEmpty(req.body.name)) {
        return res.json({EmptyField: "please enter the name of battle"});
    }
    const newBattle = new Battle({
        name: req.body.name
    })
    newBattle.save().then(battle => res.json(battle)).catch(err => console.log(err));
})

router.post('/getinvitation/:id', (req, res) => {
    Battle.findById(req.params.id).then(battle => {
        if(battle) {
        battle.invitationLink = host + 'api/battles/' + battle.id;
        battle.save().then(battle => {res.json({invitationLink: battle.invitationLink})})
                    .catch(err => {console.log(err)});
        }
        else {
            return res.status(400).json({notFound: "battle not found with given id"});
        }
    })
})

router.get('/find/:id', (req, res) => {
    Battle.findById(req.params.id)
        .then(battle => {
            if(battle) {
            res.status(200).json(battle);
            }
            else{
                return res.status(400).json({notFound: "battle not found with given id"});
            }
        })
})

router.get('/all', (req, res) => {
    Battle.find()
      .exec()
      .then(battles => {
        const response = {
          count: battles.length,
          battles
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;