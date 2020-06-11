'use strict';

const { Router } = require('express');
const router = new Router();
const Comment = require('../models/comment');
const Post = require('../models/post');

router.get('/', function (req, res, next) {
  res.json({ message: 'COMMENT API' });
});

router.post('/', function (req, res) {
  const { userCreator, message, post } = req.body;
  Comment.create({
    userCreator,
    message
  })

    .then((comment) => {
      console.log(req.body);
      return Post.findByIdAndUpdate({ _id: post }, { $push: { comment: comment._id } });
    })
    .then((response) =>
      res.status(200).json({
        response: response,
        userCreator: userCreator,
        message: message,
        post: post
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error._message });
    });
});

module.exports = router;
