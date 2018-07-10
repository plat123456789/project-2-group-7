const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const hb = require('express-handlebars');
const morgan = require('morgan')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({extended: false}))

app.use(passport.initialize());
app.use(passport.session());

passport.use('local-login', new LocalStrategy(
    async (email, password, done) => {
        try{
            let users = await knex('users').where({email:email});
            if (users.length == 0) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }
            let user = users[0];
            if (user.password === password) {
                return done(null, user);
            }else{
                return done(null, false, { message: 'Incorrect credentials.' });
            }
        }catch(err){
            return done(err);
        }
    }
));

app.get('/login', function(req, res){
    res.render('login');
});



app.listen(3000)
