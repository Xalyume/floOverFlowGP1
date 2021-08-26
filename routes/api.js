const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler, bcrypt } = require('./utils');
const { User, Question, QuestionLike, Answer, AnswerLike } = require('../db/models');
const { check, validationResult } = require('express-validator');
const { loginUser, requireAuth } = require('../auth.js');
const e = require('express');

// require log-in to dynamically edit user's own question - JSON
const questionValidators = [
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for your flo question.')
]

router.put("/questions/:id(\\d+)", requireAuth, questionValidators, asyncHandler(async (req, res, next) => {
    const questionId = req.params.id;
    const question = await Question.findByPk(questionId, { include: User });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        if (res.locals.user.id === question.User.id && question) {
            await question.update({ ...req.body })

            res.json({ question })

        } else {
            // usually the question should exist. Thus label it as No authorization.
            const err = new Error(`You have no authorization to edit the question`);
            // include err message in an array, in order to be used by dynamically used in pug file
            err.status = 401;
            const errors = [err.message];
            res.json({ question, errors, err })

            //Another way in practice project
            // err.errors = errors;
            // err.title = 'No authorization';
            // err.status = 401;
            //return next(err);
        }
    } else {
        //in order to be used by dynamically used in pug file

        const errors = validatorErrors.array().map((error) => error.msg);
        const err = Error("Bad request.");
        err.status = 400;

        res.json({ question, errors, err })

        // Another way in practice project - if the input is empty/null, create an err and next(err), that will be received by front-end fetch. e.g edit-question.js
        // const err = Error("Bad request.");
        // err.errors = errors;
        // err.status = 400;
        // err.title = "Bad request.";
        //return next(err);
    }


}));


const answerValidators = [
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for your flo answer.')
]
// require log-in to dynamically edit user's own answer - JSON

router.put("/answers/:id(\\d+)", requireAuth, answerValidators, asyncHandler(async (req, res, next) => {
    const answerId = req.params.id;
    const answer = await Answer.findByPk(answerId, { include: User });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        if (res.locals.user.id === answer.User.id && answer) {
            await answer.update({ ...req.body })

            res.json({ answer })

        } else {
            // usually the answer should exist. Thus label it as No authorization.
            const err = new Error(`You have no authorization to edit the answer`);
            // include err message in an array, in order to be used by dynamically used in pug file
            err.status = 401;
            const errors = [err.message];
            res.json({ answer, errors })

            //Another way in practice project
            // err.errors = errors;
            // err.title = 'No authorization';
            // err.status = 401;
            //return next(err);
        }
    } else {
        //in order to be used by dynamically used in pug file

        const errors = validatorErrors.array().map((error) => error.msg);
        const err = Error("Bad request.");
        err.status = 400;
        //console.log(errors)

        res.json({ answer, errors })

        // Another way in practice project - if the input is empty/null, create an err and next(err), that will be received by front-end fetch. e.g edit-answer.js
        // const err = Error("Bad request.");
        // err.errors = errors;
        // err.status = 400;
        // err.title = "Bad request.";
        //return next(err);
    }


}));


// require login to create answer
router.post("/answers", requireAuth, answerValidators, asyncHandler(async (req, res, next) => {
    const{content,questionId} = req.body;
    const userId = res.locals.user.id;
    const existingAnswer = await Answer.findOne({ where: {questionId,userId}});

    const answer = await Answer.build({ content, questionId: parseInt(questionId, 10), userId });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        if(!existingAnswer){
            answer.save()
            
            res.json({ answer })
        }
        // already post answer to the question
        else{
            console.log('there already')
            const err = new Error(`You have already post your answer to the question. Please edit your answer instead!`);
            // include err message in an array, in order to be used by dynamically used in pug file
            const errors = [err.message];
            res.json({ answer, errors })
        
        }
        
       
    } else {
        //in order to be used by dynamically used in pug file

        const errors = validatorErrors.array().map((error) => error.msg);
        const err = Error("Bad request.");
        err.status = 400;
        //console.log(errors)

        res.json({ answer, errors })

        // Another way in practice project - if the input is empty/null, create an err and next(err), that will be received by front-end fetch. e.g edit-answer.js
        // const err = Error("Bad request.");
        // err.errors = errors;
        // err.status = 400;
        // err.title = "Bad request.";
        //return next(err);
    }

}))


module.exports = router;