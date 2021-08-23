const express = require('express');
const router = express.Router();
const { loginUser } = require('../auth');
const { asyncHandler, csrfProtection, bcrypt } = require('./utils');
const { User } = require('../db/models');
const { check, validationResult } = require('express-validator')

const loginValidator = [
    check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
]

router.get('/', csrfProtection, (req, res) => {
    res.render('login', { title: "Login", csrfToken: req.csrfToken(), })
})

router.post('/', csrfProtection, loginValidator, asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const user = await User.findOne({ where: { email } });
        if (user !== null) {
            const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
            if (passwordMatch) {
                loginUser(req, res, user);
                return res.redirect('/');
            }
        }
        errors.push('Login failed for the provided email address and password');
    } else {
        errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('login', {
      title: 'Login',
      email,
      errors,
      csrfToken: req.csrfToken(),
    });

}))


module.exports = router;
