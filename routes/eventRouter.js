const express = require('express');

class EventRouter {
    constructor(eventService) {
        this.eventService = eventService;
    }

    router() {
        let router = express.Router();

        router.post('/', this.addEvent.bind(this));
        router.post('/add-invitee', this.inviteUser.bind(this)); 
        router.post('/confirm', this.confirmEvent.bind(this)); 
        router.get('/events', this.listAllEvent.bind(this));
        router.get('/invitee', this.listUser.bind(this));

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

    inviteUser(req, res) {
        return this.eventService.inviteUser(req.body.eventId, req.body.invitee)
        .then((event) => res.json(event))
        .catch((err) => res.status(500).json(err));
    }

    listUser(req, res) {
        return this.eventService.listUser()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));
    }

    confirmEvent(req, res) {
        console.log('confirming', req.params.id)
        return this.eventService.confirmEvent(req.params.id) 
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));
    }
}

module.exports = EventRouter;

