'use strict';
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const app = express();

require('./configs/passport');

//CORS config
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);

//conect to mongo
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

//Middleware setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Session settings
app.use(
  session({
    secret: 's3cr3t3',
    resave: true,
    saveUninitialized: true
  })
);

//passport initialize
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'public')));

const commentRouter = require('./routes/comment');
const postRouter = require('./routes/post');
const usersRouter = require('./routes/users');
const authenticationRouter = require('./routes/authentication');

app.use('/api/comment', commentRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', usersRouter);
app.use('/api/authentication', authenticationRouter);
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.json('error');
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
