var express = require('express');
const { Question, User, QuestionLike, Answer } = require('../db/models');
var router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');

/* GET home page. */
router.get('/', asyncHandler(async(req, res, next) => {
  if (req.session.auth) {
    userId = req.session.auth.userId;
    const questions = await Question.findAll({
      where: {
        userId,
        
      },
      order: [["createdAt", "DESC"]],
      include: [User, QuestionLike, Answer],
    })

    //const questionCreated = questions[0].createdAt.toLocaleDateString()

    //add votes to each question
    questions.forEach(q => {
      let votes = 0;
      q.QuestionLikes.forEach(v => {
        if (v.vote) {
          votes++;
        } else {
          votes--;
        }
      })
      q.votes = votes;
    })

    const user = await User.findByPk(userId)

    res.render('userhome', { user, questions, title: 'Welcome Back!' })
  } else {
    res.render('index', { title: 'Welcome to flo Overflow!' });
  }
}));

module.exports = router;
