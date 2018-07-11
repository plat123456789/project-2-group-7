const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hb = require('express-handlebars');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');



app.use(bodyParser.urlencoded({
    extended: false
}));

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

app.use(expressSession({secret: 'itsverysecret'}));


app.use(passport.initialize());

app.use(passport.session());

//error handle
app.use(function(err,req,res,next){
    //Log the exception
    res.status(500).send("Something failded."+ err);
});

passport.use('local-login', new LocalStrategy(
    async (email, password, done) => {
        try {
            let users = await knex('User').where({
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
    done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
    let users = await knex('User').where({
        user_id: user_id
    });
    if (users.length == 0) {
        return done(new Error(`Wrong user id ${user_id}`));
    }
    let user = users[0];
    return done(null, user);
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/error'
}));



app.post('/sign-up', function (req, res) {

    knex("User").insert({
        name: req.body.name,
        pw: req.body.password,
        email: req.body.email,
    })
    .then(res.redirect('/'));
})


app.listen(3000);