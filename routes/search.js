const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection, bcrypt } = require('./utils');
const { Question } = require('../db/models')
const { Op } = require('sequelize');


router.post('/', asyncHandler(async (req, res) => {
    // console.log(req.body.search_str);
    const results = await Question.findAll({
        where: {
            content: {
                [Op.iLike]: `%${req.body.search_str}%`
            }
        }
    });

    console.log(results.length)

    res.render('results', { results, Title: "Results!" })
}));

module.exports = router;
