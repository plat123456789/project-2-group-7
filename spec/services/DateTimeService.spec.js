const DateTimeService = require('../../services/DateTimeService');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);

describe("dateTimeService ", () => {

    let dt;
    let dateTimeArray = [{
            dateTime: 'Jul 19 2019 18:35',
            event_id: '1'
        },
        {
            dateTime: 'Aug 20 2018 11:00',
            event_id: '1'
        }
    ];

    beforeEach((done) => {
        dt = new DateTimeService(knex);
        knex('dateOption').del().then(() => done());

    });

    it("should support list method", (done) => {
        dt.addDateTime(dateTimeArray)
            .then(() => dt.listDateTime())
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

    it("should support add method", (done) => {
        dt.addDateTime(dateTimeArray)
            .then(() => dt.listDateTime())
            .then((data) => {
                expect(data.length).toEqual(2);

                let date0 = new Date(data[0].date);

                expect(date0.toString()).toEqual('Fri Jul 19 2019 00:00:00 GMT+0800 (HKT)');
                expect(data[0].start_time).toEqual("18:35:00");
                expect(data[0].iso_string).toEqual("2019-07-19T10:35:00.000Z");
                expect(data[0].event_id).toEqual(1);

                let date1 = new Date(data[0].date);

                expect(date1.toString()).toEqual('Fri Jul 19 2019 00:00:00 GMT+0800 (HKT)');
                expect(data[1].start_time).toEqual("11:00:00");
                expect(data[1].iso_string).toEqual("2018-08-20T03:00:00.000Z");
                expect(data[1].event_id).toEqual(1);

                done();
            });
    });

    // it("should support delete method", (done) => {
    //     dt.addDateTime(dateTimeArray)
    //         .then(event_id => dt.searchDateTime(event_id[0]))
    //         .then(data => {dt.removeDateTime(data[0].id);return data})
    //         .then(data=> dt.searchDateTime(data[0].event_id))
    //         .then(data => console.log(data))
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

    it("should support search method",(done)=>{
        dt.addDateTime(dateTimeArray)
        .then(()=> dt.searchDateTime(1))
        .then((data)=>{
            expect(data.length).toEqual(2)

            let date0 = new Date(data[0].date);

            expect(date0.toString()).toEqual('Fri Jul 19 2019 00:00:00 GMT+0800 (HKT)');
            expect(data[0].start_time).toEqual("18:35:00");
            expect(data[0].iso_string).toEqual("2019-07-19T10:35:00.000Z");
            expect(data[0].event_id).toEqual(1);

            let date1 = new Date(data[0].date);

            expect(date1.toString()).toEqual('Fri Jul 19 2019 00:00:00 GMT+0800 (HKT)');
            expect(data[1].start_time).toEqual("11:00:00");
            expect(data[1].iso_string).toEqual("2018-08-20T03:00:00.000Z");
            expect(data[1].event_id).toEqual(1);

            done();
        })
    });

});