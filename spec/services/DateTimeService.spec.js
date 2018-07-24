const DateTimeService = require('../../services/DateTimeService');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);

describe("dateTimeService ", () => {

    let dt;
    let dateArray = [ { dateTime: 'Aug 08 2019 12:00', event_id: '57' },
    { dateTime: ' Aug 09 2018 12:00', event_id: '57' } ];
    
    beforeEach((done) => {
        dt = new DateTimeService(knex);
        knex('dateOption').del().then(() => done());
    });

    it("should support add method", (done) => {
        dt.addDateTime(dateArray).then(() => dt.listDateTime())
            .then((data) => {
                console.log(data)
                done();
            }).catch((err)=>{
                console.log(err);
            })
    })

    // it("should support add method", (done) => {
    //     dt.addDateTime(dateString)
    //         .then(() => dt.listDateTime())
    //         .then((data) => {
    //             expect(data.length).toEqual(1);
    //             expect(data[0].date.toString()).toEqual('Thu Jul 19 2018 00:00:00 GMT+0800 (HKT)');
    //             expect(data[0].start_time).toEqual("18:35:00");
    //             expect(data[0].iso_string).toEqual("2018-07-19T10:35:00.000Z");
    //             done();
    //         });
    // });

    // it("should support delete method", (done) => {
    //     dt.addDateTime(dateString)
    //         .then((ids) => dt.removeDateTime(ids[0]))
    //         .then(() => dt.listDateTime())
    //         .then((data) => {
    //             expect(data.length).toEqual(0);
    //             done();
    //         });
    // });

    // it("should support list method", (done) => {
    //     dt.addDateTime(dateString)
    //         .then(() => dt.listDateTime())
    //         .then((data) => {
    //             expect(data.length).toEqual(1);
    //             expect(data[0].date.toString()).toEqual('Thu Jul 19 2018 00:00:00 GMT+0800 (HKT)');
    //             expect(data[0].start_time).toEqual("18:35:00");
    //             expect(data[0].iso_string).toEqual("2018-07-19T10:35:00.000Z");
    //             done();
    //         })
    // });

    // it("should support update method", (done) => {

    //     let newDateString = 'Sep 20 2019 00:35'

    //     dt.addDateTime(dateString)
    //         .then((ids) => dt.updateDateTime(ids[0], newDateString))
    //         .then(() => dt.listDateTime())
    //         .then((data) => {
    //             expect(data.length).toEqual(1)
    //             expect(data[0].date.toString()).toEqual('Fri Sep 20 2019 00:00:00 GMT+0800 (HKT)');
    //             done();
    //         })
    // });

    //TODO: event_id

    // it("should support search method",(done)=>{
    //     dt.addDateTime(dateString)
    //     .then(()=> dt.searchDateTime({name:"dateTime1"}))
    //     .then((data)=>{
    //         expect(data.length).toEqual(1)
    //         expect(data[0].name).toEqual("dateTime1");
    //         done();
    //     })
    // });

});