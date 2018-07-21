//X list all events
// filter by status
//X add new event
// invite participant
// update event info
// confirm event
// cancel event

class eventService {
    constructor(knex) {
        this.knex = knex;
    }
    // list on homepage 
    listAllEvent(userId) { // req.user.id
        let eventObj = {}

        let query = this.knex.select('event.title', 'event.status')
            .from('event')
            .innerJoin('EvtUser', 'event.id', 'EvtUser.event_id')
            .where('EvtUser.user_id', userId)
            .orderBy('event.created_at');

        let count = this.knex.count('EvtUser.email')
            .from('EvtUser')
            .where('EvtUser.user_id', userId);

        return query.then(rows => {
            return rows.map(row => ({
                    title: row.title,
                    status: row.status
                    // noOfinvitee: count[0],
                    // date: row.date,
                    // place: row.place
                })
            )
        })
    }

    // filterEvent(event) {
    //     let query = this.knex('event').select()
    //         .innerJoin() ?
    //         .where('event.status', 'pending')
    // }

    addEvent(title, detail, userId, email) { // req.body.title, req.body.detail
        return this.knex('event').insert({
                title: title,
                detail: detail,
                status: 'Pending'
            }).returning('id')
            
         .then((eventId) => {
             return this.knex('EvtUser').insert({
                    event_id: eventId[0],
                    user_id: userId,
                    email: email,
                    isCreator: true
                })
        }).catch((err) => {
            console.log(err)
        })
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
        // insert invitee email in EvtUser
        // check if already exist in user, else insert user_id to EvtUser.user_id
       
        return this.knex('EvtUser')
            .insert({
                event_id: eventId,
                email: inviteeEmail,
                isCreator: false
            })            
        .then(() => {
            return this.knex('user')
                .select()
                .innerJoin("EvtUser","EvtUser.email","user.email")
                .where('user.email', 'EvtUser.email');
        })
        
        return query.then((rows) => {
            if(rows.length === 1) {
                return this.knex('EvtUser').insert({
                    user_id: rows[0].id
                })
            } else {
                throw new Error('invitee not signed up');
            }
        })
    }

    // list invitee
    listUser(eventId) {
        return this.knex('EvtUser')
                    .select('email')
                    .where('EvtUser.event_id', eventId)
                    .andWhere('isCreator', false);                   
    }
    
    
}

module.exports = eventService;

