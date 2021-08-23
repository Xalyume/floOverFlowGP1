const express = require('express');
const router = express.Router();
const { loginUser } = require('../auth');
const { asyncHandler, csrfProtection, bcrypt } = require('./utils');
const { User } = require('../db/models');

const loginValidator = [
    
]

router.get('/', csrfProtection, (req, res) => {
    res.render('login', { title: "Log In", csrfToken: req.csrfToken(), })
})

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    const { email, password } = req.body;

}))


module.exports = router;
