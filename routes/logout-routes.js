const express = require('express');
const router = express.Router();

const isLoggedIn = require('../utils/guard').isLoggedIn;

router.get('/', isLoggedIn, function (req, res) {
    req.logout();
    res.redirect('/login');
})

module.exports = router;