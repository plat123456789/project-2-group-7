const EventService = require('../../services/eventService');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);

describe("dateTimeService ", () => {

    let event;


    beforeEach((done) => {
        event = new EventService(knex);
        knex('event').del().then(() => done());
    });

    it("should support listAllEvent method", (done) => {

        addEvent()
        .then(event.listAllEvent(user_id))
            .then(() => event.listDateTime())
            .then((data) => {

                let date0 = new Date(data[0].date);

                expect(date0.toString()).toEqual('Fri Jul 19 2019 00:00:00 GMT+0800 (HKT)');
                expect(data[0].start_time).toEqual("18:35:00");
                expect(data[0].iso_string).toEqual("2019-07-19T10:35:00.000Z");
                expect(data[0].event_id).toEqual(1);

                let date1 = new Date(data[1].date);

                expect(date1.toString()).toEqual('Mon Aug 20 2018 00:00:00 GMT+0800 (HKT)');
                expect(data[1].start_time).toEqual("11:00:00");
                expect(data[1].iso_string).toEqual("2018-08-20T03:00:00.000Z");
                expect(data[1].event_id).toEqual(1);

                done();
            })
    });
})