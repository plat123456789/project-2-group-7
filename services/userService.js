// create new user
// update user info
// list user info
// remove account

class userService {
    constructor(knex) {
        this.knex = knex;
    }
    
    addUser(name, email, password) {
    // check if email exist
    // if yes, prompt user already exists, redirect to login
    // if no, add to user table
        let query = this.knex
                .select('email')
                .from('user')
                .where('user.email', email);

        return query.then((rows) => {
            if(rows.length !== 1) {
                return this.knex('user')
                    .insert({
                        name: name,
                        email: email,
                        pw: password
                    })
            } else {
                throw new Error('Email already registered');
            }
        })        
    }

    updateUser(userId, name, email, password) {
        return this.knex('user')
            .update({
                name: name,
                email: email,
                pw: password
            })
            .where('id', userId);
    }

    getUserInfo(userId) {
        return this.knex('user') 
            .select('name', 'email')           
            .where('id', userId);
    }

    removeUser(userId) {
        return this.knex('user')            
            .where('id', userId)
            .del();
    }
    
}

module.exports = userService;
