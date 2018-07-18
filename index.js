const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hb = require('express-handlebars');
const logger = require('morgan');
const passport = require('passport');
const passportSetup = require('./passport.js');
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

const placeService = require('./services/placeService')


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

passportSetup(app, knex);

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


app.get('/date', function (req, res) {
    res.render('date');
});

app.post('/date', function (req, res) {
    console.log(req.body)
})

app.get('/place', function (req, res) {
    res.render('place');
});

app.get('/placeDate', function (req, res) {
    res.send(result);
});


let a = new placeService(knex);

let result;

a.list12RandomPlace()
.then((data)=>{result = data})
.catch((err)=>{console.log(err)})


app.listen(port, function () {
    console.log("listening on " + port);
});