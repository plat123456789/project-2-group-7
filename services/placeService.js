const PLACE = require("./tables").PLACE;

const PLACEOPTION = require("./tables").PLACEOPTION;

class placeService {
    constructor(knex) {
        this.knex = knex;
    }
    // add placeOption
    // remove placeOption
    // list placeOption

    addPlace(placeArry){

        let insertArry = [];

        let tempObj = {};

        for (let i = 0; i < placeArry.length; i++) {

            tempObj.event_id = placeArry[i].event_id;
            tempObj.place_id = placeArry[i].place_id;
            insertArry.push(tempObj)
            tempObj = {};
        }
        return this.knex(PLACEOPTION).insert(insertArry).returning("event_id")
        .catch(err=>console.log(err));
    }

    removePlace() {

    }

    // namecard
    listPlace() {
        return this.knex.select({
            placeOptionId: 'placeOption.id', 
            eventId: 'placeOption.event_id',
            placeId: 'placeOption.place_id', 
            name: 'place.name', 
            districtId: 'place.district_id', 
            district: 'district.name'
        })
        // return this.knex.select('*')
            .from(PLACEOPTION)
            .innerJoin(PLACE, 'place.id', 'placeOption.place_id')
            .innerJoin('district', 'district.id', 'place.district_id');
    }


    // details on click
    placeDetail(place) {
        let query = this.knex
            .select('*')
            .from(PLACE);

        return query.then((rows) => {

        })

    }

    searchPlace(input) {

        let numberTest = new RegExp(/^\d+$/);

        if (numberTest.test(input)) {

            this.searchInput = input;

            return this.knex(PLACE).where("district_id", Number(this.searchInput)).limit(120);
            
        } else {

            this.searchInput = "%" + input.toString().trim() + "%";

            return this.knex(PLACE)
                .where("name", "like", this.searchInput)
                .orWhere("address", "like", this.searchInput)
                .orWhere("price_range", "like", this.searchInput)
                .orWhere("cuisine", "like", this.searchInput)
                .limit(120);
        }
    }


    list27RandomPlace() {
        return this.knex(PLACE).select("*").where("id", ">", (Math.floor(Math.random() * (10000 - 1) + 1))).limit(27);
    }

}

module.exports = placeService;