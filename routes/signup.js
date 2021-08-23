const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const { User } = require('../db/models')


router.get('/', asyncHandler(async (req, res) => {
    const user = await User.build();
    res.render("signup", { user, title: "Sign Up" })
}));


module.exports = router;
