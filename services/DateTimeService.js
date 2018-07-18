const dateTimes = require("./tables").dateTimes;


//TODO: add the event_id with date
class DateTimeService {
    constructor(knex) {
        this.knex = knex;
    }

    listDateTime(limit=100,offset=0){
        return this.knex.select("*")
                    .from(dateTimes)
                    .limit(limit).offset(offset);
    }
    
    addDateTime(dateString) { 
        let tempDateTime = new Date(dateString);

        return this.knex(dateTimes).insert({
            date:       tempDateTime.toDateString(), 
            start_time: tempDateTime.toTimeString().replace("GMT+0800",""),
            iso_string: tempDateTime.toISOString(),
        }).returning("id");
    }

    searchDateTime(event_id) {
        return this.knex(dateTimes) 
            .select('date', 'start_time', "iso_string")           
            .where('event_id', event_id);
    }

    updateDateTime(dateOption_id, dateString) {

        let temp = new Date(dateString);

        return this.knex(dateTimes)
            .update({
                date: temp.toDateString(),
                start_time: temp.toTimeString().replace("GMT+0800",""),
                iso_string: temp.toISOString(),
            })
            .where('id', dateOption_id);
    }

    removeDateTime(dateOption_id) {
        return this.knex(dateTimes)            
            .where('id', dateOption_id)
            .del();
    }  
}


module.exports = DateTimeService;
