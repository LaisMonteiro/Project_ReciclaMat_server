const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (error, userDocument) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (username, password, next) => {
      User.findOne({ email: username }, (err, foundUser) => {
        if (err) {
          next(err);
          return;
        }
        if (!foundUser) {
          next(null, false, { message: 'Bad credentials' });
        }
        if (!bcrypt.compareSync(password, foundUser.password)) {
          next(null, false, { message: 'Bad credentials' });
          return;
        }
        next(null, foundUser);
      });
    }
  )
);
