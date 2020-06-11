'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('../models/post');
const User = require('../models/user');
const uploader = require('./../file-uploader');

router.get('/', function (req, res, next) {
  const kind = req.query.kind;
  const userCreator = req.query.userCreator;

  Post.find(kind ? { kind } : {})
    .sort({ 'timestamps.updatedAt': -1 })
    .populate('userCreator')
    .populate('comment')
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => next(error));

  //   Post.find({ _id: userCreator })
  //   .then((response)=> {
  //     res.json(message: 'POST USER API')
  //   })
  //   .catch((error) => {
  //     console.log(error);
});

router.post('/', uploader.single('image'), (req, res, next) => {
  const { kind, material, description, userCreator } = req.body;
  const location = req.body.location.split(',');

  Post.create({
    kind,
    material,
    location: { coordinates: [location[0], location[1]] },
    description,
    image: req.file ? req.file.path : undefined,
    userCreator
  })
    .then((response) => res.status(201).json(response))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
