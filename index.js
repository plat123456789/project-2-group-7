const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hb = require('express-handlebars');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const NODE_ENV = process.env.NODE_ENV || 'development'
const knexFile = require('./knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)



app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));

app.engine('handlebars', hb({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(logger('tiny'));

app.use(expressSession({secret: 'itsverysecret'}));


app.use(passport.initialize());

app.use(passport.session());


passport.use('local-login', new LocalStrategy(
    async (email, password, done) => {
        try {
            let users = await knex('user').where({
                email: email
            });
            if (users.length == 0) {
                return done(null, false, {
                    message: 'Incorrect credentials.'
                });
            }
            let user = users[0];
            if (user.pw === password) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Incorrect credentials.'
                });
            }
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let users = await knex('user').where({
        id:id
    });
    if (users.length == 0) {
        return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
});

//error handle
app.use(function (err, req, res, next) {
    res.status(500).send("Something failded." + err);
});




app.get('/', function(req, res) {
    res.render('index');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.post('/signup', function (req, res) {

    let select = knex('user').column(["email"]).where('email', req.body.email);

    select.then((result) => {
        if (result == 0) {
            knex("user").insert({
                name: req.body.name,
                pw: req.body.password,
                email: req.body.email,
            }).then(res.redirect('/'))
        } else {
            res.redirect('/login/signup-error')
        }
    }).catch((error) => {
        console.log(error);
    });
})

app.get('/login/signup-error', function (req, res) {
    res.render('registered-email');
})

app.listen(3000);