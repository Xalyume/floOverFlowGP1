var express = require('express');
const { Question, User } = require('../db/models');
var router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');

/* GET home page. */
router.get('/', asyncHandler(async(req, res, next) => {
  if (req.session.auth) {
    userId = req.session.auth.userId;
    const questions = await Question.findAll({
      where: {
        userId
      }
    })
    res.render('userhome', { questions, title: 'Welcome Back!' })
  } else {
    res.render('index', { title: 'Welcome to flo Overflow!' });
  }
}));

module.exports = router;
