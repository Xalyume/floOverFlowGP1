var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');

/* GET home page. */
router.get('/', asyncHandler(async(req, res, next) => {
  if (req.session.auth) {
    // console.log(req.session.auth.userId);
    res.render('userhome', { title: 'Welcome Back!' })
  } else {
    res.render('index', { title: 'Welcome to flo Overflow!' });
  }
}));

module.exports = router;
