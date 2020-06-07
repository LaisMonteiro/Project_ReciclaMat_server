'use strict';
const { Router } = require('express');
const router = new Router();
const User = require('../models/user');

router.get('/', function (req, res, next) {
  res.json({ message: 'WORKIN! USER API' });
});

router.post('/create', function (req, res) {
  const { name, email, passwordHash, avatar } = req.body;
  User.create({
    name,
    email,
    passwordHash,
    avatar
  })
    .then((response) =>
      res.status(200).json({
        response: response,
        name: name,
        email: email,
        passwordHash: passwordHash,
        avatar: avatar
      })
    )
    .catch((error) => res.status(400).json({ message: error._message }));
});

module.exports = router;