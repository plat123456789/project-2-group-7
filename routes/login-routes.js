const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res) {
    res.render('login');
});

router.post('/', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;
