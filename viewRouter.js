const express = require("express");
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;

module.exports = class ViewRouter{
    
    router() {
        let router = express.Router();

        //error handle
        router.use(function (err, req, res, next) {
            res.status(500).send("Something failded." + err);
        });

        // Hompage
        router.get('/', isLoggedIn, function (req, res) {
            res.render('home');
            console.log(req.user) // test
            // res.render('index', { message: req.flash('login', 'You have logged in') });
        });

        // Login
        router.get('/login', function (req, res) {
            res.render('login');
        });

        router.post('/login', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

        // Signup
        router.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/signup-error' 
        }));

        // Logout
        router.get('/logout', isLoggedIn, function (req, res) {
            req.logout();
            res.redirect('/login');
        })

        // Signup error
        router.get('/signup-error', function (req, res) {
            res.render('registered-email');
        })

        // Date 
        // router.get('/date', function (req, res) {
        router.get('/date', function (req, res) {
            res.render('date');
        });

        router.post('/date', function (req, res) {
            console.log(req.body)
        })

        // Place
        router.get('/place', function (req, res) {
            res.render('place');
        });

        router.get('/placeData', function (req, res) {
            res.send(result);
        });

        // User account setting
        router.get('/settings', isLoggedIn, function (req, res) {
            res.render('settings', {
                name: req.user.name,
                email: req.user.email
            })
        })

        // Create event
        router.get('/create-event', isLoggedIn, function (req, res) {
            res.render('create')
        })

        // Add invitee
        router.get('/invite', function (req, res) {
            res.render('invite')
        })


        return router;
    }
}


