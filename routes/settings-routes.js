const express = require('express');
const router = express.Router();
const bcrypt = require('../bcrypt.js');
const isLoggedIn = require('../utils/guard').isLoggedIn;

const NODE_ENV = process.env.NODE_ENV || 'development';
const knexFile = require('../knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);


router.get('/', isLoggedIn, function (req, res) {
    res.render('settings')
})

router.post('/', isLoggedIn, function (req, res) {

    if (req.body.name) {
        knex('user').where('id', req.user.id).update('name', req.body.name)
            .then(() => {
                res.redirect('/');
                console.log('update name')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (req.body.password) {
        return new Promise((resolve, reject) => {
            bcrypt.hashPassword(req.body.password)
            .then((hash) => {
                resolve(knex('user').where('id', req.user.id).update('pw', hash))
             })
            .then(() => {
                res.redirect('/');
                console.log('update password')
            })
            .catch((err) => {
                console.log(err);
                reject(err)
            })
        })
    }

    if (req.body.email) {

        let select = knex('user').column(["email"]).where('email', req.body.email);

        select.then((result) => {
            if (result == 0) {
                knex('user').where('id', req.user.id).update('email', req.body.email)
                    .then(() => {
                        res.redirect('/');
                        console.log('update email')
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                res.redirect('/update-error')
            }
        })
    }
})

module.exports = router;