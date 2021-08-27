const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler, bcrypt } = require('./utils');
const { User,Question,QuestionLike,Answer,AnswerLike } = require('../db/models');
const { check, validationResult } = require('express-validator');
const { loginUser, requireAuth } = require('../auth.js');
const e = require('express');

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
        order: [["createdAt", "DESC"]],
    });

    // add votes to each question
    questions.forEach(q=>{
        let votes = 0;
        q.QuestionLikes.forEach(v=>{
            if(v.vote){
                votes++;
            }else{
                votes--;
            }
        })
        q.votes = votes;
    })
 
    //space for /questions votes and user, time, try to prevent merge conflict

    //res.json(questions[0])
    res.render('questions-list', { questions})
    

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


router.get("/:id(\\d+)",  asyncHandler(async (req, res, next) => {
    const questionId = req.params.id;
    const question = await Question.findByPk(questionId, { 
        include: [User, QuestionLike,{model:Answer,include:[User,AnswerLike]}]
    });
    // count votes for questions
    let qUpVote =0;
    let qDownVote=0;
    if (question){
        question.QuestionLikes.forEach(v => {
            if (v.vote) {
                qUpVote++;
            } else {
                qDownVote++;
            }
        })

    }
    
    //res.json(question);

    // color the voted button for question
    let qUpVoteColor='';
    let qDownVoteColor='';
    if (req.session.auth){

        const userId = res.locals.user.id;
        if (userId){
            const voteRecord = await QuestionLike.findOne({
                where: {
                    questionId,
                    userId
                }
            });
    
            if (voteRecord){
                if(voteRecord.vote){
                    qUpVoteColor='red';
    
                }else{
                    qDownVoteColor='blue';
                }
            }
    
        }
    }

    let qVotes = qUpVote - qDownVote;

  // To Do: answer votes => especially associate with each answer 
   let answers;
  if(question){

  
     answers = question.Answers

    // add votes to each answers
    answers.forEach(a => {
        let votes = 0;
        a.AnswerLikes.forEach(v => {
            if (v.vote) {
                votes++;
            } else {
                votes--;
            }
        })
        a.votes = votes;
    })

    // ???????color the voted button for each answer need to work on color!
    
    answers.forEach(a => {
        if (req.session.auth) {
            const userId = res.locals.user.id;
            if (userId) {
                const voteRecordforAnswer =  AnswerLike.findOne({
                    where: {
                        answerId:a.id,
                        userId
                    }
                }).then(voteRecordforAnswer=>{
                    //console.log('hi!!!', voteRecordforAnswer)
                    if (voteRecordforAnswer) {
                        if (voteRecordforAnswer.vote) {
                            a.aUpVoteColor = 'red';

                        } else {
                            a.aDownVoteColor = 'blue';
                        }
                    }

                })
               
    
            }
        }
    })

 
  }

  
      res.render('question', {
          question, qVotes, qUpVote, qDownVote, qUpVoteColor, qDownVoteColor,
          answers
      })

  
    
   
}))


// require log-in to render the page to delete user's own question
router.get("/delete/:id(\\d+)", requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {
    const questionId = req.params.id;
    const question = await Question.findByPk(questionId, { include: User });

    res.render('delete-question', { title: 'Delete your flo question', question, csrfToken: req.csrfToken() })
  
}));


// require log-in to delete user's own question
router.post("/delete/:id(\\d+)", requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {
    const questionId = req.params.id;
    const question = await Question.findByPk(questionId, { include: User });
    if(res.locals.user.id === question.User.id){
        await question.destroy();
    }
    res.redirect('/');


}));






module.exports = router;
