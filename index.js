const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hb = require('express-handlebars');
const logger = require('morgan');;
const passportSetup = require('./passport.js');
const expressSession = require('express-session');
const flash = require('connect-flash');
app.use(flash());
const expressValidator = require('express-validator');
app.use(expressValidator());
   
//db
const NODE_ENV = process.env.NODE_ENV || 'development';
const knexFile = require('./knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);

//check logged in
const isLoggedIn = require('./utils/guard').isLoggedIn;

//routes
const loginRoute = require('./routes/login-routes');
const signupRoute = require('./routes/signup-routes');
const settingsRoute = require('./routes/settings-routes');
const logoutRoute = require('./routes/logout-routes');

//onst placeService = require('./services/placeService')
const UserService = require('./services/userService');
// const EventService = require('./services/eventService');

let userService = new UserService(knex);
// let eventService = new EventService(knex);

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
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/settings', (new settingsRoute(userService)).router());
// app.use('/invite', (new settingsRoute(eventService)).router());
app.use('/logout', logoutRoute);

app.get('/', isLoggedIn, function (req, res) {
    res.render('home');
    console.log(req.user)
    // res.render('index', { message: req.flash('login', 'You have logged in') });
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
    //res.send(result);
});

app.get('/event', function (req, res) {
    res.render('event');
});

app.get('/settings', isLoggedIn, function (req, res) {
    res.render('settings')
})

app.get('/invite', function (req, res) {
    res.render('invite')
})

//testing placeServices

// let a = new placeService(knex);

// let result;

// a.list12RandomPlace()
// .then((data)=>{result = data})
// .catch((err)=>{console.log(err)})

// const DateTimeRouter = require('./routes/DateTimeRouter');

// const DateTimeService = require('./services/DateTimeService');

// let dt = new DateTimeService(knex);

// app.use('/api/dateTime', new DateTimeRouter(dt).router());


app.listen(port, function () {
    console.log("listening on " + port);
});