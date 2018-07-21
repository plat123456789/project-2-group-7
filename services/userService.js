// update user info
// list user info
// remove account

const bcrypt = require('../utils/bcrypt.js');

class userService {
    constructor(knex) {
        this.knex = knex;
    }

    updateUser(id, name, email, password) {
        let updatePromises = [];

        if (name) {
            let updateName = this.knex('user').where('id', id).update('name', name);
            updatePromises.push(updateName)
        }

        if (password) {
            let updatePw = bcrypt.hashPassword(password)
                .then((hash) => {
                    return this.knex('user').where('id', id).update('pw', hash);
                })
            updatePromises.push(updatePw)
        }

        if (email) {
            let select = this.knex('user').column(["email"]).where('email', email)
                .then((result) => {
                    if (result == 0) {
                        return this.knex('user').where('id', id).update('email', email)
                    } else {
                        return Promise.reject();
                    }
                })
            updatePromises.push(select)
        }

        return Promise.all(updatePromises)
            .then(() => {
                console.log(updatePromises)
            })
            .catch((err) => console.log(err))
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

    //for testing purpose
    listUserTable() {
        return this.knex('user').select('id', 'name', 'email', 'pw');
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
            if (rows.length !== 1) {
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
}

module.exports = userService;