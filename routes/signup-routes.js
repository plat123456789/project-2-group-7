const express = require('express');
const router = express.Router();
const passport = require('passport');

const NODE_ENV = process.env.NODE_ENV || 'development';
const knexFile = require('../knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);


router.post('/', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup-error' // should disable create btn
}));

router.get('/signup-error', function (req, res) {
    res.render('registered-email');
})

module.exports = router;