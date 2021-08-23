const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("This is our sign-up page.")
})


module.exports = router;
