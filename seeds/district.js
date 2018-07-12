
const districtData = require('../database/districtData');

exports.seed = function (knex, Promise) {
  return knex('district').del()
    .then(() => {
      let districtPromises = [];
      districtData.forEach((district) => {
        districtPromises.push(createDist(knex, district));
      });
      return Promise.all(districtPromises);
    })
    .catch((err) => {
      console.log(err);
    })
};

const createDist = (knex, district) => {
  return knex('district').insert({
    id: district.id, 
    name: district.name,
  });
};
