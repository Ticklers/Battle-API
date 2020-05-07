const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateRegisterInput = require('../validation/register');
router.post('/register', (req, res) => {
    console.log(req.file);
    const { errors, isValid } = validateRegisterInput(req.body);
  
    if (!isValid) {
        const response = {
            success: false,
            errors: errors
        }
      return res.status(400).json(response);
    }
    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        errors.username = 'Username already exists';
        const response = {
            success: false,
            errors: errors
        }
        return res.status(400).json(response);
      }
    })
  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          age: req.body.age
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            //if (err) throw err;
            newUser.password = hash;
            const response = {
                success: true,
                user: newUser
            }
            newUser
              .save()
              .then(user => res.json(response))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

  const validateLoginInput = require('../validation/login');
  router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);
  
    if (!isValid) {
      console.log('something is wrong here');
      const response = {
        success: false,
        errors
      }
      return res.status(400).json(response);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = 'Email does not exist';
        const response = {
          success: false,
          errors
        }
        return res.status(404).json(response);
      }
  
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name, username: user.username, avatar: user.avatar };
  
          jwt.sign(
            payload,
            keys.secretOrKey,
            (err, token) => {
              res.json({
                success: true,
                userId: user.id,
                token: 'Bearer ' + token
              })
            }
          )
        } else {
          errors.password = 'Incorrect password';
          const response = {
            success: false,
            errors
          }
          return res.status(400).json(response);
        }
      });
    });
  });
  

  router.get('/all', (req, res) => {
    User.find()
      .exec()
      .then(users => {
        const response = {
          count: users.length,
          users: users
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

  router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
      .exec()
      .then(user => {
        if (user) {
          res.status(200).json({
            user: user,
            request: {
              type: "GET",
              url: "http://localhost:5000/users"
            }
          });
        } else {
          res
            .status(404)
            .json({ message: "No user found for provided id" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

module.exports = router;
