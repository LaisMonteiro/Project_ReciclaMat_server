'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('../models/post');

router.get('/', function (req, res, next) {
  Post.find()
    .then((post) => {
      res.json({ post });
    })
    .catch((error) => next(error));
});

router.post('/create', function (req, res) {
  const {
    kind,
    material,
    location,
    description,
    image,
    userCreator,
    timestamps,
    comment
  } = req.body;
  Post.create({
    kind,
    material,
    location,
    description,
    image,
    userCreator,
    timestamps,
    comment
  })
    .then((response) =>
      res.status(200).json({
        response: response,
        kind: kind,
        material: material,
        location: location,
        description: description,
        image: image,
        userCreator: userCreator,
        timestamps: timestamps,
        comment: comment
      })
    )
    .catch((error) => res.status(400).json({ message: error.message }));
});

module.exports = router;
