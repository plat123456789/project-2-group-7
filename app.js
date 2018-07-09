const express = require('expres')
const bodyParser = require('body-parser')
const app = express();

const user = [
    {
        id: 0,
        email: "tom@tom.com",
        password: "tom"
    },{
        id: 1,
        email: "peter@peter.com",
        password: "peter"
    },{
        id: 2,
        email: "sam@sam.com",
        password: "Sam"
    }
];

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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

app.use(bodyParser.urlencoded({extended: false}))

app.listen(3000)
