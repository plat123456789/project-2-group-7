

const userService = require('../../services/userService');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);

describe("userService", () => {

    let user;
    let userName = "max";
    let userEmail = "abc@abc.com";
    let userPassword = "123"

    beforeEach((done) => {
        user = new userService(knex);
        knex('user').del().then(() => done());
    });

    // it("should support addUser method", (done) => {
    //     user.addUser(userName, userEmail, userPassword)
    //         .then(() => user.listUserTable())
    //         .then((data) => {
    //             expect(data.length).toEqual(1);
    //             expect(data[0].name.toString()).toEqual(userName);
    //             expect(data[0].email).toEqual(userEmail);
    //             expect(data[0].pw).toEqual(userPassword);
    //             done();
    //         });
    // });

    //method updated, 

    // it("should return error if email already registered", (done) => {

    //     let emailError = new Error('Email already registered')

    //     user.addUser(userName, userEmail, userPassword)
    //         .then(() => user.addUser(userName, userEmail, userPassword))
    //         .catch((err)=>{
    //             expect(err.message).toBe(emailError.message);
    //             done()});
    // });

    // it("should support removeUser method", (done) => {

    //     user.addUser(userName, userEmail, userPassword)
    //         .then(() => user.listUserTable())
    //         .then((data) => user.removeUser(data[0].id))
    //         .then(() => user.listUserTable())
    //         .then((data) => {
    //             expect(data.length).toEqual(0);
    //             done();
    //         });
    // });

    // it("should support getUserInfo method", (done) => {
    //     user.addUser(userName, userEmail, userPassword)
    //         .then(() => user.listUserTable())
    //         .then((data) => user.getUserInfo(data[0].id))
    //         .then(() => user.listUserTable())
    //         .then((data) => {
    //             expect(data.length).toEqual(1);
    //             expect(data[0].name.toString()).toEqual(userName);
    //             expect(data[0].email).toEqual(userEmail);
    //             expect(data[0].pw).toEqual(userPassword);
    //             done();
    //         })
    // })

    
    //TODO: updateUser method updated, change this test case later

    // it("should support updateUser method", (done) => {

    //         let newName = "tom";
    //         let newEmail = "tom@tom.com"
    //         let newPassword = "456"

    //     user.addUser(userName, userEmail, userPassword)
    //         .then(() => user.listUserTable())
    //         .then((data) => {
    //             user.updateUser(data[0].id, newName, newEmail, newPassword)
    //         })
    //         .then(() => user.listUserTable())
    //         .then((data) => {
    //             expect(data.length).toEqual(1);
    //             expect(data[0].name.toString()).toEqual(newName);
    //             expect(data[0].email).toEqual(newEmail);
    //             expect(data[0].pw).toEqual(newPassword);
    //             done()
    //         })

    // });
});