const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler, bcrypt } = require('./utils');
const { User, Question, QuestionLike, Answer, AnswerLike } = require('../db/models');
const { check, validationResult } = require('express-validator');
const { loginUser, requireAuth } = require('../auth.js');
const e = require('express');



// require log-in to render the page to delete user's own answer
router.get("/answers/delete/:id(\\d+)", requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {
    const answerId = req.params.id;
    const answer = await Answer.findByPk(answerId, { include: User });
    res.render('delete-answer', { title: 'Delete your flo answer', answer, csrfToken: req.csrfToken() })

}));


// require log-in to delete user's own answer
router.post("/answers/delete/:id(\\d+)", requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {
    const answerId = req.params.id;
    const answer = await Answer.findByPk(answerId, { include: User });
    const questionId = answer.questionId;
    if (res.locals.user.id === answer.User.id) {
        await answer.destroy();
    }
    res.redirect(`/questions/${questionId}`);


}));


module.exports = router;