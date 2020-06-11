'use strict';
const { Router } = require('express');
const router = new Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const uploader = require('./../file-uploader');

router.post('/signup', uploader.single('avatar'), (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const avatar = req.file.path;
  if (!email || !password) {
    res.status(400).json({ message: 'Provide a email and password' });
    return;
  }
  if (password.length < 4) {
    res.status(400).json({ message: 'Please make your password at least 4 characters long' });
    return;
  }
  User.findOne({ email }, (error, foundUser) => {
    if (error) {
      res.status(500).json({ message: 'Bad credentials' });
      return;
    }
    if (foundUser) {
      res.status(400).json({ message: 'Email already used' });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);
    const aNewUser = new User({ name, email, passwordHash: hashpassword, avatar });
    console.log(aNewUser);
    aNewUser.save((error) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: 'Save user went wrong' });
        return;
      }
      req.login(aNewUser, (__error) => {
        if (__error) {
          console.log(__error);
          res.status(500).json({ message: 'Login after signup went bad' });
          return;
        }
        res.status(200).json(aNewUser);
      });
    });
  });
});

router.post('/sign-in', async (req, res, next) => {
  passport.authenticate('local', (error, theUser, failerDetails) => {
    console.log(theUser);
    if (error) {
      res.status(500).json({ message: 'Something wrong authenticating User' });
      return;
    }
    if (!theUser) {
      res.status(401).json(failerDetails);
      console.log(failerDetails);
      return;
    }
    // save user in session
    req.login(theUser, (__error) => {
      if (__error) {
        res.status(500).json({ message: 'Session save went bad' });
        return;
      }
      res.status(200).json(theUser);
    });
  })(req, res, next);
  // try {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({ email });
  //   // console.log(user);
  //   if (!user) {
  //     throw new Error('Invalid email and/or password');
  //   }
  //   const passwordCompare = await bcrypt.compare(password, user.passwordHash);
  //   if (!passwordCompare) {
  //     throw new Error('Invalid email and/or password');
  //   }
  //   req.session.user = user._id;
  //   res.json({ user });
  // } catch (error) {
  //   console.log(error);
  //   res.status(401).json({ message: error.message });
  // }
});

router.post('/signout', (req, res) => {
  // req.session.destroy();
});

module.exports = router;
