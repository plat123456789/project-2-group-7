
const placeData = require('../database/restaurants');

exports.seed = function (knex, Promise) {
  return knex('place').del()
    .then(() => {
      let placePromises = [];
      placeData.forEach((place) => {
        placePromises.push(createPlace(knex, place));
      });
      return Promise.all(placePromises);
    })
    .catch((err) => {
      console.log(err);
    })
};

const createPlace = (knex, place) => {
  return knex('place').insert({
    name: place.name,
    district_id: place.district_id,
    address: place.address,
    phone: place.telephone,
    category: place.category,
    image: place.img_url,
    latitude: place.latitude,
    longitude: place.longitude,
    price_range: place.price_range    
  });
};
