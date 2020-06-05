var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ message: 'It is working' });
});

module.exports = router;

//teste
