const DateTimeRouter = require('../../routes/DateTimeRouter');

describe('DateTimeRouter ',()=>{
    let dateTimeRouter;
    let dateTimeService;
    let req;
    let res;
    let resultDatetimes =
        {
            date0: "Sep 20 2018 12:00",
            date1: "Feb 27 2019 01:55"
        }

    beforeEach(()=>{
        dateTimeService = jasmine.createSpyObj("dateTimeService",{
            listDateTime: Promise.resolve(resultDatetimes),
            addDateTime: Promise.resolve([1]),
            updateDateTime: Promise.resolve([1]),
            removeDateTime: Promise.resolve([1])
        });
        dateTimeRouter = new DateTimeRouter(dateTimeService);
        dateTimeRouter.router();
        req = jasmine.createSpyObj('req',['params','query','body']);
        res = jasmine.createSpyObj('res',['json']); 
        
    });

    it(" should run router method successfully",()=>{
        dateTimeRouter.router();
    });

    it(" should support get method",(done)=>{
        dateTimeRouter.get(req,res).then(()=>{
            expect(res.json).toHaveBeenCalledWith(resultDatetimes);
            done();
        })
    });

    // it(" should support post method",(done)=>{
    //     dateTimeRouter.post(req,res).then(()=>{
    //         expect(res.json).toHaveBeenCalledWith([1])
    //         done();
    //     });
    // });

    it(" should support put method",(done)=>{
        dateTimeRouter.put(req,res).then(()=>{
            expect(res.json).toHaveBeenCalledWith([1])
            done();
        });
    });

    it(" should support delete method",(done)=>{
        dateTimeRouter.delete(req,res).then(()=>{
            expect(res.json).toHaveBeenCalledWith([1])
            done();
        });
    });
})