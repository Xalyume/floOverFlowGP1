const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler, bcrypt } = require('./utils');
const { User, Question, QuestionLike, Answer, AnswerLike } = require('../db/models');
const { check, validationResult } = require('express-validator');
const { loginUser, requireAuth } = require('../auth.js');
const e = require('express');

// require log-in to votes
router.post(/\/\d+\/votes/i, requireAuth, asyncHandler(async (req, res, next) => {
    const answerId = req.url.split('/')[1];
    const userId = res.locals.user.id; // type is number


    let vote = parseInt(Object.values(req.body)[0], 10) // 1 for upVote, 0 for downVote
    if (vote === 1) vote = true;
    if (vote === 0) vote = false;
    let answer = await Answer.findByPk(answerId, {
        include: [User, AnswerLike]
    });
    const usersVotedArr = answer.AnswerLikes.map(v => v.userId);

    let aUpVoteColor = '';


    if (!usersVotedArr.includes(userId)) {
        const newVoteRecord = await AnswerLike.create({ answerId, vote, userId })
        if (vote === 1) {
            aUpVoteColor = 'red'

        }
    } else {

        const existingVote = await AnswerLike.findOne({
            where: { userId, answerId, vote }
        });

        if (existingVote) {
            await existingVote.destroy();

        } else {
            const oppositeVoteRecord = await AnswerLike.create({ answerId, vote: !vote, userId })
            await oppositeVoteRecord.destroy();
            await AnswerLike.create({ answerId, vote, userId })


        }


    }

    const questionId = answer.questionId;
    res.redirect(`/questions/${questionId}`);

}));

module.exports = router;