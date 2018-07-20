const PLACE = require("./tables").PLACE;

class placeService {
    constructor(knex) {
        this.knex = knex;
    }
    // add placeOption
    // remove placeOption
    // list placeOption
    
    addPlace(place, event) {
        let query = this.knex
            .select('name', 'district')
            .from(PLACE)
            .where('event.id', event);
        
        return query.then((rows) => {
            if(rows.length === 1) { // what is rows ?
                this.knex.insert({
                    place_id: place.id,
                    event_id: event.id
                }).into('placeOption');
            } else {
                throw new Error('Event does not exist');
            }
        })
    }

    removePlace() {

    }

    // namecard
    listPlace() {
        
    }

    // details on click
    placeDetail(place) {
        let query = this.knex
            .select('*')
            .from(PLACE);

        return query.then((rows) => {

        })

    }

    searchPlace(string){
        this.searchString = "%"+string.toString()+"%";

        return this.knex(PLACE).where("name", "like", this.searchString)
            //.orWhere("address", "like", this.searchString)
            .limit(100);
    }


    list27RandomPlace(){
        return this.knex(PLACE).select("*").where("id",">",(Math.floor(Math.random()*(10000-1)+1))).limit(27);
    }

}

module.exports = placeService;
