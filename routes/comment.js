'use strict';

const { Router } = require('express');
const router = new Router();
const Comment = require('../models/comment');

router.get('/', function (req, res, next) {
  res.json({ message: 'COMMENT API' });
});

router.post('/create', function (req, res) {
  const { userCreator, message, post, timestamps } = req.body;
  Comment.create({
    userCreator,
    message,
    post,
    timestamps
  })
    .then((response) =>
      res.status(200).json({
        response: response,
        userCreator: userCreator,
        message: message,
        post: post,
        timestamps: timestamps
      })
    )
    .catch((error) => res.status(400).json({ message: error._message }));
});

module.exports = router;
