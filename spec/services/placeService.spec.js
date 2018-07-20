const PlaceService = require('../../services/placeService');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);

describe("dateTimeService ", () => {

    beforeEach(() => {
        place= new PlaceService(knex);
    });

    it("should support searchPlace method", (done) => {
        let searchString = "Ajisen Ramen"

        place.searchPlace(searchString)
            .then((data)=>{
                console.log(data);
                expect(data[0].name).toContain(searchString);
            })
            .catch((err)=>console.log(err));
            done();
    })
})