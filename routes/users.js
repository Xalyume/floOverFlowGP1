var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
