'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('../models/post');
const uploader = require('./../file-uploader');

router.get('/', function (req, res, next) {
  Post.find()
    .then((post) => {
      res.json({ post });
    })
    .catch((error) => next(error));
});

router.post('/', uploader.single('image'), (req, res, next) => {
  const { kind, material, description, userCreator, timestamps, updatedAt } = req.body;
  const image = req.file.path;
  const location = req.body.location.split(',');
  console.log('file is: ', req.file);

  Post.create({
    kind,
    material,
    location: { coordinates: [location[0], location[1]] },
    description,
    image,
    userCreator
  })
    .then((response) =>
      res.status(201).json({
        response
      })
    )
    .catch((error) => res.status(400).json({ message: error.message }));
});

module.exports = router;
