const express = require("express");


class DateTimeRouter{

    constructor(dateTimeService){
        this.dateTimeService = dateTimeService;
    }

    router(){
        let router = express.Router();
        router.get("/",this.get.bind(this));
        router.post("/",this.post.bind(this));
        router.put("/:id",this.put.bind(this));
        router.patch("/:id",this.put.bind(this));
        router.delete("/:id",this.delete.bind(this));
        return router;
    }

    get(req,res){
        //Validation Logic
        return this.dateTimeService.listDateTime()
            .then((data)=>res.json(data))
            .catch((err)=> res.status(500).json(err));
    }

    post(req,res){
        //Validation Logic
        return this.dateTimeService.addDateTime(req.body)
            .then((data)=>res.json(data))
            .catch((err)=> res.status(500).json(err));
    }

    put(req,res){
        //Validation Logic
        return this.dateTimeService.updateDateTime(req.params.id,req.body)
            .then((data)=>res.json(data))
            .catch((err)=>res.status(500).json(err));
    }

    delete(req,res){
        //Validation Logic
        return this.dateTimeService.removeDateTime(req.params.id)
            .then((data)=>res.json(data))
            .catch((err)=>res.status(500).json(err));
    }
}

module.exports = DateTimeRouter