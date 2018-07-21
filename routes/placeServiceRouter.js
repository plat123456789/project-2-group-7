const express = require("express");


class PlaceRouter {

    constructor(placeService) {
        this.placeService = placeService;
    }

    router() {
        let router = express.Router();

        router.get("/initialPlaceData", this.getInitial.bind(this));

        return router;
    }

    getInitial(req, res) {
        //Validation Logic
        return this.placeService.list27RandomPlace()
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = PlaceRouter;