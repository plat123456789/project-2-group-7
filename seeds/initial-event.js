exports.seed = function(knex, Promise) {
    return knex('event').del()
      .then(function () {
        return knex('event').insert({
          title: 'title',
          detail: 'detail',
          status: 'status',
        });
      })
      .catch((err) => {
        console.log(err);
      })
  };