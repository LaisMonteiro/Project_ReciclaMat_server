'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('../models/post');
const uploader = require('./../file-uploader');

router.get('/', function (req, res, next) {
  res.json({ message: 'POST API' });
});

router.post('/', uploader.single('avatar'), function (req, res) {
  console.log(req.body);
  const { kind, material, description, userCreator } = req.body;
  const image = req.file.path;
  const location = req.body.location.split(',');


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
        response: response,
        kind: kind,
        material: material,
        location: location,
        description: description,
        image: image,
        userCreator: userCreator
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
