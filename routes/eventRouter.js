const express = require('express');

class EventRouter {
    constructor(eventService) {
        this.eventService = eventService;
    }

    router() {
        let router = express.Router();

        router.post('/', this.addEvent.bind(this));

        router.get('/events', this.listAllEvent.bind(this));
        // router.get('/events', this.filterEvent.bind(this));
        // router.get('/events/:eventId/date', this.function.bind(this));

        return router;
    }

    addEvent(req, res) {
        return this.eventService.addEvent(req.body.title, req.body.detail, req.user.id, req.user.email)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }

    listAllEvent(req, res) {
        return this.eventService.listAllEvent(req.user.id)
            .then((event) => res.json(event))
            .catch((err) => res.status(500).json(err));
    }

    filterEvent(req, res) {
        return this.eventService.filterEvent(req.user.id, req.body.status)
            .then((event) => res.json(event))
            .catch((err) => res.status(500).json(err));
    }

}

module.exports = EventRouter;





// router.post('/', (req, res) => {
        //     return this.eventService.inviteUser(req.user.id, req.user.email, req.params.id, req.body.email)
        //         // .then(() => this.eventService.listUser(req.params.id))
        //         .then((invitees) => res.json(invitees))
        //         .catch((err) => res.status(500).json(err));
        // })

        // router.get('/add-invitee', (req, res) => {
        //     return this.eventService.inviteUser(req.user.id, req.user.email, req.params.id, req.body.email)
        //         // .then(() => this.eventService.listUser(req.params.id))
        //         .then((invitees) => res.json(invitees))
        //         .catch((err) => res.status(500).json(err));
        // })
