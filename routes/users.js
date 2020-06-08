'use strict';
const { Router } = require('express');
const router = new Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const uploader = require('./../file-uploader');


router.get('/', function (req, res, next) {
  res.json({ message: 'WORKIN! USER API' });
});

router.post('', uploader.single('avatar'), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const avatar = req.file.url;
    const passwordHash = await bcrypt.hash(password, 10);

    const alredyExists = await User.find({email});
    if(alredyExists) {
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
