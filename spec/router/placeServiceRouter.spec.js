const PlaceRouter = require('../../routes/placeServiceRouter');

describe('placeServiceRouter ', () => {
    let placeRouter;
    let placeService;
    let req;
    let res;
    let resultPlaces = [{
            "name": "King Bakery 蛋撻王",
            "telephone": "23527170",
            "address": "Shop 5, G/F, Winning Centre, 29 Tai Yau Street, San Po Kong",
            "latitude": "22.33709114",
            "longitude": "114.1980743",
            "img_url": "https://static8.orstatic.com/userphoto/doorphoto/F/C2A/02DSDBA819AB1C75A7797Clv.jpg",
            "cuisine": "Hong Kong Style",
            "category": "Bakery",
            "rating": "3.5",
            "score_smile": "7",
            "score_ok": "2",
            "score_sad": "0",
            "price_range": "Below $50",
            "district_id": "2022"
        },
        {
            "name": "譚仔雲南米線",
            "telephone": "27986698",
            "address": "Shop 8, LG/F, Mikiki, 638 Prince Edward Road East, San Po Kong",
            "latitude": "22.333687",
            "longitude": "114.196775",
            "img_url": "https://static5.orstatic.com/userphoto/doorphoto/H/DO7/02P8404D2CB25CBD85B00Clv.jpg",
            "cuisine": "Yunnan",
            "category": "Noodles/Rice Noodles",
            "rating": "3",
            "score_smile": "0",
            "score_ok": "2",
            "score_sad": "1",
            "price_range": "Below $50",
            "district_id": "2022"
        }
    ]

    beforeEach(()=>{
        placeService = jasmine.createSpyObj("placeService",{
            
            list27RandomPlace: Promise.resolve(resultPlaces),
        });
        placeRouter = new PlaceRouter(placeService);
        placeRouter.router();
        req = jasmine.createSpyObj('req',['params','query','body']);
        res = jasmine.createSpyObj('res',['json']); 
    });

    it(" should run router method successfully",()=>{
        placeRouter.router();
    });

    it(" should support search method",(done)=>{
        placeRouter.get(req,res).then(()=>{
            expect(res.json).toHaveBeenCalledWith(resultDatetimes);
            done();
        })
    });
})