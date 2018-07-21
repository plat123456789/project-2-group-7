const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hb = require('express-handlebars');
const logger = require('morgan');;
const passportSetup = require('./utils/strategies/local-strategy.js');
const expressSession = require('express-session');
// const flash = require('connect-flash');
// const expressValidator = require('express-validator');

// Validation
// app.use(flash());
// app.use(expressValidator());

// Database
const NODE_ENV = process.env.NODE_ENV || 'development';
const knexFile = require('./knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);

const port = process.env.PORT || 3000;

// Check logged in
const isLoggedIn = require('./utils/guard').isLoggedIn;

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
const ViewRouter = require('./viewRouter.js');
const SettingsRouter = require('./routes/settingsRouter');
const EventRouter = require('./routes/eventRouter');
const PlaceRouter = require('./routes/placeServiceRouter');

// Services
const UserService = require('./services/userService');
const PlaceService = require('./services/placeService');
const EventService = require('./services/eventService');

let userService = new UserService(knex);
let placeService = new PlaceService(knex);
let eventService = new EventService(knex);

app.use('/',new ViewRouter().router());
app.use('/settings', (new SettingsRouter(userService)).router());
app.use('/api/places',new PlaceRouter(placeService).router());
app.use('/api', isLoggedIn, (new EventRouter(eventService)).router());
app.use('/addevent', isLoggedIn, (new EventRouter(eventService)).router());
// app.use('/api/add-invitee', (new EventRouter(eventService)).router()); // 


app.listen(port, function () {
    console.log("listening on " + port);
});