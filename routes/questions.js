const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler, bcrypt } = require('./utils');
const { User,Question,QuestionLike,Answer,AnswerLike } = require('../db/models');
const { check, validationResult } = require('express-validator');
const { loginUser } = require('../auth.js')


router.get("/", asyncHandler(async (req, res) => {

    const questions = await Question.findAll({
        //include: [{ model: User,  attributes: ["username"] }],
        include: [{ model: [Answer, QuestionsLikes, User] }],
        order: [["updatedAt", "DESC"]],
    });
    

}));

router.get("/new", asyncHandler(async (req, res) => {
    res.render('new-question')


}));

router.post("/", tweetValidation, handleValidationErrors, asyncHandler(async (req, res, next) => {

    const tweet = await Tweet.create({ message: req.body.message, userId: req.user.id });
    res.status(201).json({ tweet });

}));

module.exports = router;
