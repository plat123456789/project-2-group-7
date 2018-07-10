const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hb = require('express-handlebars');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("public"));

app.engine('handlebars', hb({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(logger('tiny'));

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "project-2-group-7",
        user: "max",
        password: "5361"
    }
});

app.use(passport.initialize());
app.use(passport.session());

passport.use('local-login', new LocalStrategy(
    async (email, password, done) => {
        try {
            let users = await knex('User').where({email: email});
            if (users.length == 0) {
                return done(null, false, {message: 'Incorrect credentials.'});
            }
            let user = users[0];
            if (user.password === pw) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Incorrect credentials.'});
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
    let users = await knex('User').where({
        id: id
    });
    if (users.length == 0) {
        return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', function (req, res) {
    console.log(req)
});

app.listen(3000);