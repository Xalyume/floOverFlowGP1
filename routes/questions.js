const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler, bcrypt } = require('./utils');
const { User,Question,QuestionLike,Answer,AnswerLike } = require('../db/models');
const { check, validationResult } = require('express-validator');
const { loginUser, requireAuth } = require('../auth.js')

const questionValidators = [
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for your flo question.')
]

// get /questions => Not require login
router.get("/", asyncHandler(async (req, res) => {

    const questions = await Question.findAll({
        //include: [{ model: User,  attributes: ["username"] }],
        include: [Answer, User,QuestionLike],
        order: [["updatedAt", "DESC"]],
    });
    // let upVote = 0;
    // let downVote = 0;
    // questions.forEach(q=>{
    //     q.QuestionLikes.forEach(vote=>{
    //         if(vote){
    //             upVote++;
    //         }else{
    //             downVote++;
    //         }
    //     })
    // })
 
    //res.json(questions[0])
    res.render('questions', { questions})
    

}));

// get /questions/new => Not require login, will show the form to create question, but will not show the button to submit queston. Instead it will have a link to login saying ' please login to ask a quesiton'
router.get("/new",  csrfProtection, asyncHandler(async (req, res) => {
    
    res.render('new-question', { title:'Ask a flo question!', csrfToken: req.csrfToken()})

}));

//post question require login
router.post("/", requireAuth, csrfProtection, questionValidators,asyncHandler(async (req, res, next) => {

    const {content}=req.body;
    const question= await Question.build({
        userId: res.locals.user.id,
       content
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await question.save();
        res.redirect(`/questions/${question.id}`);
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('new-question', {
            title: 'Ask a flo question!',
            question,
            errors,
            csrfToken: req.csrfToken(),
        });
    }

}));

///////// to do specific question page
router.get("/:id(\\d+)",  asyncHandler(async (req, res, next) => {
    res.send('You are at specific question page.')
    /// go back button to go back to all the /questions. 

}))

module.exports = router;
