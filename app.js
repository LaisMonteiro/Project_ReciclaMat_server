'use strict';
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');
const cors = require('cors');
const commentRouter = require('./routes/comment');
const postRouter = require('./routes/post');
const usersRouter = require('./routes/users');
const authenticationRouter = require('./routes/authentication');
const cors = require('cors');

const app = express();

//CORS config
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/api/comment', commentRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', usersRouter);
app.use('/api/authentication', authenticationRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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

module.exports = app;
