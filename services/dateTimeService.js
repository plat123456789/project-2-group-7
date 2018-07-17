
//TODO: add the event_id with date
class dateTimeService {
    constructor(knex) {
        this.knex = knex;
    }
    
    addDateTime(dateString) { 
        let tempDateTime = new Date(dateString);

        return this.knex("dateOption").insert({
            date:       tempDateTime.toDateString(), 
            start_time: tempDateTime.toTimeString().replace("GMT+0800",""),
            iso_string: tempDateTime.toISOString(),
        })
    }

    listDateTime(event_id) {
        return this.knex('dateOption') 
            .select('date', 'start_time', "iso_string")           
            .where('event_id', event_id);
    }

    updateDateTime(dateOption_id, dateString) {

        let temp = new Date(dateString);

        return this.knex('dateOption')
            .update({
                date: temp.toDateString(),
                start_time: temp.toTimeString().replace("GMT+0800",""),
                iso_string: temp.toISOString(),
            })
            .where('id', dateOption_id);
    }

    removeDateTime(dateOption_id) {
        return this.knex('dateOption')            
            .where('id', dateOption_id)
            .del();
    }
}


module.exports = dateTimeService;
