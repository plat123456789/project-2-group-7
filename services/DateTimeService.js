const dateTimes = require("./tables").dateTimes;


//TODO: add the event_id with date
class DateTimeService {
    constructor(knex) {
        this.knex = knex;
    }

    listDateTime(limit = 100, offset = 0) {
        return this.knex.select("*")
            .from(dateTimes)
            .limit(limit).offset(offset);
    }

    addDateTime(dateArray) {

        let insertArry = [];

        let tempObj = {};

        for (let i = 0; i < dateArray.length; i++) {
            let date = new Date(dateArray[i].dateTime)

            tempObj.event_id = dateArray[i].event_id;
            tempObj.date = date.toDateString();
            tempObj.start_time = date.toTimeString().replace(/GMT\+\d\d\d\d/, "");
            tempObj.iso_string = date.toISOString();
            insertArry.push(tempObj);
            tempObj = {};
        }

        return this.knex(dateTimes).insert(insertArry).returning("event_id")
        .catch(err=>console.log(err));
    }

    searchDateTime(event_id) {
        return this.knex(dateTimes)
            .select('date', 'start_time', "iso_string", 'id', 'event_id')
            .where('event_id', event_id);
    }

    updateDateTime(dateOption_id, dateString) {

        let temp = new Date(dateString);

        return this.knex(dateTimes)
            .update({
                date: temp.toDateString(),
                start_time: temp.toTimeString().replace(/GMT\+\d\d\d\d/, ""),
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