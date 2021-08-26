const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler, bcrypt } = require('./utils');
const { User, Question, QuestionLike, Answer, AnswerLike } = require('../db/models');
const { check, validationResult } = require('express-validator');
const { loginUser, requireAuth } = require('../auth.js');
const e = require('express');

// require log-in to votes
router.post(/\/\d+\/votes/i, requireAuth, asyncHandler(async (req, res, next) => {
    const questionId = req.url.split('/')[1];
    const userId = res.locals.user.id; // type is number
    

    let vote= parseInt(Object.values(req.body)[0],10) // 1 for upVote, 0 for downVote
    if(vote===1) vote = true;
    if(vote===0) vote = false;
    let question = await Question.findByPk(questionId, {
        include: [User, QuestionLike, { model: Answer, include: [User, AnswerLike] }]
    });
    const usersVotedArr = question.QuestionLikes.map(v => v.userId);

    if (!usersVotedArr.includes(userId)) {
        const newVoteRecord = await QuestionLike.create({ questionId, vote, userId })
    }else{
        console.log('hit here?')
        const existingVote = await QuestionLike.findOne({
            where:{userId,questionId,vote}
        });

        if(existingVote){
            await existingVote.destroy();

        }else{
            const oppositeVoteRecord = await QuestionLike.create({ questionId, vote: !vote, userId })
            await oppositeVoteRecord.destroy();
            await QuestionLike.create({ questionId, vote, userId })
            

        }
        

    }
    
    res.redirect(`/questions/${questionId}`);

}));

module.exports = router;