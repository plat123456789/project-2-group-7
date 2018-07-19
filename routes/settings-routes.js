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
    
     let updatePromises = [];

    if (req.body.name) {
        let updateName = knex('user').where('id', req.user.id).update('name', req.body.name);
        updatePromises.push(updateName)
    }
        
    if (req.body.password) {
        let updatePw = bcrypt.hashPassword(req.body.password)
        .then((hash) => {
            return knex('user').where('id', req.user.id).update('pw', hash);
        })
        updatePromises.push(updatePw)
    }

    if (req.body.email) {
        
        let select = knex('user').column(["email"]).where('email', req.body.email)
        .then((result) => {
            if (result == 0) {
                return knex('user').where('id', req.user.id).update('email', req.body.email)
            } else {
                return Promise.reject();
            }
        })
        updatePromises.push(select)

    }
    console.log(updatePromises);

    Promise.all(updatePromises)
    .then(() => {
        res.redirect('/');
        console.log('updated user')
    })
    .catch((err) => {
        res.redirect('/update-error')
        console.log(err);
    })
    
})

module.exports = router;