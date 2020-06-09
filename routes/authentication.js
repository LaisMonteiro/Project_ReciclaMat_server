'use strict';
const { Router } = require('express');
const router = new Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/sign-in', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      throw new Error('Invalid email and/or password');
    }

    const passwordCompare = await bcrypt.compare(
      password,
      user.passwordHash
    );
    if (!passwordCompare) {
      throw new Error('Invalid email and/or password');
    }
    //req.session.user = user._id;
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;