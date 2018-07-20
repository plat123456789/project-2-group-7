const PlaceService = require('../../services/placeService');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);

describe("placeService ", () => {

    beforeEach(() => {
        place= new PlaceService(knex);
    });

    it("should support searchPlace by name", (done) => {
        let searchInput = "Pizza Hut"

        place.searchPlace(searchInput)
            .then((data)=>{
                for(let i = 0; i<data.length;i++){
                    expect(data[i].name).toContain(searchInput);
                }
                
            })
            .catch((err)=>console.log(err));
            done();
    })

    it("should support searchPlace by address", (done) => {
        let searchInput = "San Po Kong"

        place.searchPlace(searchInput)
            .then((data)=>{
                for(let i = 0; i<data.length;i++){
                    expect(data[i].address).toContain(searchInput);
                }
                
            })
            .catch((err)=>console.log(err));
            done();
    })

    it("should support searchPlace by district id", (done) => {
        let searchInput = 2022

        place.searchPlace(searchInput)
            .then((data)=>{
                for(let i = 0; i<data.length;i++){
                    expect(data[i].district_id).toEqual(searchInput);
                }
                
            })
            .catch((err)=>console.log(err));
            done();
    })

    it("should support searchPlace by cuisine", (done) => {
        let searchInput = "Hong Kong Style"

        place.searchPlace(searchInput)
            .then((data)=>{
                for(let i = 0; i<data.length;i++){
                    expect(data[i].cuisine).toEqual(searchInput.trim());
                }
                
            })
            .catch((err)=>console.log(err));
            done();
    })

    it("should support searchPlace by price range", (done) => {
        let searchInput = "Below $50"

        place.searchPlace(searchInput)
            .then((data)=>{
                for(let i = 0; i<data.length;i++){
                    expect(data[i].price_range).toEqual(searchInput);
                }
                
            })
            .catch((err)=>console.log(err));
            done();
    })

})