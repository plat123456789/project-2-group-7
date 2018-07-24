const express = require("express");


class PlaceRouter {

    constructor(placeService) {
        this.placeService = placeService;
    }

    router() {
        let router = express.Router();

        router.post("/", this.post.bind(this));
        router.get("/initialPlaceData", this.getInitial.bind(this));
        router.post("/search", this.search.bind(this));


        return router;
    }

    post(req,res){
        //Validation Logig
        return this.placeService.addPlace(JSON.parse(req.body.placeData))
            .then((data)=>res.json(data))
            .catch((err)=> res.status(500).json(err));
    }

    getInitial(req, res) {
        //Validation Logic
        return this.placeService.list27RandomPlace()
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }

    search(req, res) {
        //Validation Logic
        return this.placeService.searchPlace(req.body.searchInput)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = PlaceRouter;