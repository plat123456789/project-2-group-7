const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('../bcrypt.js');

module.exports = (app, knex) => {
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
                let result = await bcrypt.checkPassword(password, user.pw);
                if(result) {
                    console.log('User logged in')
                    return done(null, user);
                } else {
                    console.log('Login failed! Incorrect credentials')
                    return done(null, false, { message: 'Incorrect credentials'});
                }
            } catch(err) {
                return done(err);
            }
        }
    ));

    passport.use('local-signup', new LocalStrategy({
        passReqToCallback : true //  allow req to be passed as the first argument to the verify callback.
    },

        async (req, email, password, done) => {
            try {
                let users = await knex('user').where({email:email});
                // already registered
                if (users.length > 0) {
                    return done(null, false, { message: 'Email already taken' });
                }
                // otherwise create user
                else { 
                    let hash = await bcrypt.hashPassword(password).catch(err=> {console.log(err)})
                    const newUser = {
                        name: req.body.name,
                        email: email,
                        pw: hash
                    };
                    let userId = await knex('user').insert(newUser).returning("id").catch(err=> {console.log(err)});
                    newUser.id = userId;
                    
                    console.log('User signup successful')
                    done(null, newUser);
                    
                    // if new user's email has been invited, insert user id into EvtUser
                    let invitation = await knex.select('email').from('EvtUser').where('email', email);

                    if (invitation.length !== 0) {
                        console.log('User invited!!')
                        return knex('EvtUser')
                            .update({ user_id: Number(newUser.id) })
                            .where('email', email)
                    } 
                }
                
            } catch(err) {
                console.log(err);
                done(err);
            }
    
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        let users = await knex('user').where({
            id: Number(id)
        });
        if (users.length == 0) {
            return done(new Error(`Wrong user id ${id}`));
        }
        let user = users[0];
        return done(null, user);
    });
}