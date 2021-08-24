const express = require('express');
const { logoutUser } = require('../auth');
const router = express.Router();

router.post('/', (req, res) => {
    
    logoutUser(req, res);
    req.session.save(()=>res.redirect(`/`));
})

module.exports = router;
