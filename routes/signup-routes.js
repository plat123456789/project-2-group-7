const express = require('express');
const router = express.Router();

const NODE_ENV = process.env.NODE_ENV || 'development';
const knexFile = require('../knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);

router.post('/', function (req, res) {

    let select = knex('user').column(["email"]).where('email', req.body.username);

    select.then((result) => {
        if (result == 0) {
            knex("user").insert({
                name: req.body.name,
                pw: req.body.password,
                email: req.body.username,
            })
            .then(res.redirect(307, '/login'))
        } else {
            res.redirect('/signup/signup-error')
        }
    }).catch((error) => {
        console.log(error);
    });
})

router.get('/signup-error', function (req, res) {
    res.render('registered-email');
})

module.exports = router;