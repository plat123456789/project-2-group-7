const express = require("express");
const isLoggedIn = require('../utils/guard').isLoggedIn;

class settingsRoute{
    constructor(userService){
        this.userService = userService;
    }

    router(){
        let router = express.Router();
        
        router.post('/', isLoggedIn, (req, res) => {
            this.userService.updateUser(req.user.id, req.body.name, req.body.email, req.body.password)
            .then(() => res.redirect('/'))
            .catch((err) => res.redirect('/update-error'))
            
        })
        
        // router.get('/',(req,res)=> {
        //     this.userService.getUserInfo(req.user.id)
        //         .then((data) => res.json(data))
        //         .catch((err) => res.status(500).json(err));
        // });

        router.delete('/',(req,res)=> {
            this.userService.removeUser(req.user.id)
                .then((data) => res.json(data))
                .catch((err) => res.status(500).json(err));
        });

        return router;
    }
}

module.exports = settingsRoute

