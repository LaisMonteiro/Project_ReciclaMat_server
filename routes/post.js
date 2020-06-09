'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('../models/post');

router.get('/', function (req, res, next) {
  res.json({ message: 'POST API' });
});

router.post('/', function (req, res) {
  const {
    kind,
    material,
    location,
    description,
    image,
    userCreator
  } = req.body;
  
  Post.create({
    kind,
    material,
    location,
    description,
    image,
    userCreator
  })
    .then((response) =>
      res.status(201).json({
        response: response,
        kind: kind,
        material: material,
        location: location,
        description: description,
        image: image,
        userCreator: userCreator
      })
    )
    .catch((error) => res.status(400).json({ message: error.message }));
});

module.exports = router;
