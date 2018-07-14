const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hb = require('express-handlebars');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

//db
const NODE_ENV = process.env.NODE_ENV || 'development';
const knexFile = require('./knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);

//check logged in
const isLoggedIn = require('./utils/guard').isLoggedIn;

//routes
const login = require('./routes/login-routes');
const signup = require('./routes/signup-routes');
const settings = require('./routes/settings-routes');
const logout = require('./routes/logout-routes');

const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));

app.engine('handlebars', hb({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(logger('tiny'));

app.use(expressSession({
    secret: 'itsverysecret'
}));

app.use(passport.initialize());

app.use(passport.session());


//passport local login strategy
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
        id: id
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


//login routes inside the router file
app.use('/login', login);
app.use('/signup', signup);
app.use('/settings', settings);
app.use('/logout', logout);

app.get('/', isLoggedIn, function (req, res) {
    res.render('index');
});

app.listen(port,function(){
    console.log("listening on "+ port);
});