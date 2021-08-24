var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.auth) {
    res.render('userhome', { title: 'Welcome Back!' })
  } else {
    res.render('index', { title: 'Welcome to flo Overflow!' });
  }
});

module.exports = router;
