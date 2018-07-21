const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hb = require('express-handlebars');
const logger = require('morgan');;
const passportSetup = require('./passport.js');
const expressSession = require('express-session');
// const flash = require('connect-flash');
// app.use(flash());
// const expressValidator = require('express-validator');
// app.use(expressValidator());
   
// Database
const NODE_ENV = process.env.NODE_ENV || 'development';
const knexFile = require('./knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);

// Check logged in
const isLoggedIn = require('./utils/guard').isLoggedIn;

const port = process.env.PORT || 3000;

// Bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));

// static file
app.use(express.static("public"));

// View engine
app.set('view engine', 'handlebars');
app.engine('handlebars', hb({
    defaultLayout: 'main'
}));

// Morgan
app.use(logger('tiny'));

// Express session
app.use(expressSession({
    secret: 'itsverysecret'
}));

// Passport
passportSetup(app, knex);

// Routes
const loginRoute = require('./routes/login-routes');
const signupRoute = require('./routes/signup-routes');
const settingsRoute = require('./routes/settings-routes');
const logoutRoute = require('./routes/logout-routes');
const eventRouter = require('./routes/eventRouter');
const PlaceRouter = require('./routes/placeServiceRouter');

// Services
const UserService = require('./services/userService');
const PlaceService = require('./services/placeService');
const EventService = require('./services/eventService');

let userService = new UserService(knex);
let placeService = new PlaceService(knex);
let eventService = new EventService(knex);

//error handle
app.use(function (err, req, res, next) {
    res.status(500).send("Something failded." + err);
});

//login routes inside the router file
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/logout', logoutRoute);
app.use('/settings', (new settingsRoute(userService)).router());
app.use('/api/places',new PlaceRouter(placeService).router());
app.use('/api', isLoggedIn, (new eventRouter(eventService)).router());
app.use('/addevent', isLoggedIn, (new eventRouter(eventService)).router());
// app.use('/api/add-invitee', (new settingsRoute(eventService)).router());  WORKING


// ViewRouter
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

app.get('/placeData', function (req, res) {
    res.send(result);
});

app.get('/settings', isLoggedIn, function (req, res) {
    res.render('settings')
})

// Create event
app.get('/create-event', isLoggedIn, function (req, res) {
    res.render('create')
})

// app.get('/invite', function (req, res) {  WORKING
//     res.render('invite')
// })



app.listen(port, function () {
    console.log("listening on " + port);
});