const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler, bcrypt } = require('./utils');
const { User } = require('../db/models');
const { check, validationResult } = require('express-validator');
const { loginUser } = require('../auth.js')

const signupValidators = [
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Username')
        .isLength({ max: 20 })
        .withMessage('Username must not be more than 20 characters')
        .custom((value) => {
            return User.findOne({ where: { username: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('The provided Username is already in use');
                    }
                });
        }),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for email')
        .isLength({ max: 50 })
        .withMessage('Email address must not be more than 50 characters')
        .custom((value) => {
            return User.findOne({ where: { email: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('The provided Email Address is already in use');
                    }
                });
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .isLength({ min: 6, max: 25 })
        .withMessage('Password must be more than 5 characters and less than 25 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        .isLength({ min: 6, max: 25 })
        .withMessage('Confirm Password must be more than 5 characters and less than 25 characters long')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm Password does not match Password');
            }
            return true;
        })
];

router.get('/', csrfProtection, asyncHandler(async (req, res) => {
    const user = await User.build();
    res.render("signup", { title: "Register", user, csrfToken: req.csrfToken() })
}));

router.post('/', csrfProtection, signupValidators, asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const user = await User.build({
        username,
        email,
    })

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.hashedPassword = hashedPassword;
        await user.save();
        loginUser(req, res, user);
        res.redirect('/');
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('signup', {
            title: 'Register',
            user,
            errors,
            csrfToken: req.csrfToken(),
        });
    }

}))


module.exports = router;
