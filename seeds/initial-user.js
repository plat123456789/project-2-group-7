
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert({
        name: 'user1',
        email: 'user1@email.com',
        pw: 'pw1'
      });
    })
    .catch((err) => {
      console.log(err);
    })
};
