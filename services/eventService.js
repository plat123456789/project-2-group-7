// list all events
// filter by status
// add new event
// invite participant
// update event info
// confirm event
// cancel event

class eventService {
    constructor(knex) {
        this.knex = knex;
    }
    // list on homepage and event page ??
    // listEvent(event) { // req.user.id
    //     let query = this.knex('event').select()
    //         .innerJoin('evtuser')
    //         .innerJoin('dateoption')
    //         .innerJoin('placeoption')
    //         .innerJoin('datevote')
    //         .innerJoin('placevote')
    //         .innerJoin('user')
    //         .innerJoin('comment')
    //         .where()
    // }

    // filterEvent(event) {
    //     let query = this.knex('event').select()
    //         .innerJoin()
    //         .where('event.status', 'pending')
    // }

    addEvent(title, detail) { // req.body.title, req.body, detail
        return this.knex('event').insert({
            title: title,
            detail: detail,
            status: 'Pending'
        })
        .returning('id')
    }

    updateEvent(eventId, title, detail) { // req.params.id, req.body.title, req.body, detail
        return this.knex('event').update({
            title: title,
            detail: detail
        }).where('event.id', eventId)
        .returning('id')
    }
    
    confirmEvent(eventId) { // req.params.id
        return this.knex('event').update({
            status: 'Confirmed'
        }).where('event.id', eventId)
        .returning('id')
    }

    cancelEvent(eventId) { // req.params.id
        return this.knex('event').update({
            status: 'Cancelled'
        }).where('event.id', eventId)
        .returning('id')
    }
    
    inviteUser(id, email, eventId, inviteeEmail) { // req.user.id, req.user.email, req.params.id, req.body.email
        // insert creator (only creator can invite)
        // insert invitee email in evtuser
        // check if already exist in user, else insert user_id to evtuser.user_id
       this.knex('evtuser')
            .insert({
                user_id: id,
                event_id: eventId,
                email: email,
                isCreator: true
            });

        this.knex('evtuser')
            .insert({
                event_id: eventId,
                email: inviteeEmail,
                isCreator: false
            })            
        .then(() => {
            this.knex('user')
                .select()
                .innerJoin("evtuser","evtuser.email","user.email")
                .where('user.email', 'evtuser.email');
        })
        
        return query.then((rows) => {
            if(rows.length === 1) {
                return this.knex('evtuser').insert({
                    user_id: rows[0].id
                })
            } else {
                throw new Error('invitee not signed up');
            }
        })
    }
  
}

module.exports = eventService;

