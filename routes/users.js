'use strict';
const { Router } = require('express');
const router = new Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const uploader = require('./../file-uploader');

router.get('/', function (req, res, next) {
  User.find()
    .then((user) => {
      res.json({ user });
    })
    .catch((error) => next(error));
});

router.post('', uploader.single('avatar'), async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    console.log(req.file);
    const avatar = req.file.path;
    const passwordHash = await bcrypt.hash(password, 10);

    const alredyExists = await User.findOne({ email });
    if (alredyExists) {
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, passwordHash, avatar });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
