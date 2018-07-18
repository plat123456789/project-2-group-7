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
            .from('place')
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
            .from('place');

        return query.then((rows) => {

        })

    }

    list12RandomPlace(){
        return this.knex("place").select("*").where("id",">",(Math.floor(Math.random()*(10000-1)+1))).limit(12);
    }

}

module.exports = placeService;
