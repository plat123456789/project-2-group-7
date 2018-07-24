//X list all events
//X add new event
//X invite participant
// update event info
// confirm event
// cancel event

class eventService {
    constructor(knex) {
        this.knex = knex;
    }
   
    // list on homepage 
    listAllEvent(userId) { // req.user.id
        return this.knex
                .column('event.id', 'event.title', 'event.status', 'event.detail')
                // .countDistinct({inviteeNo: 'EvtUser.email'})
                .countDistinct({dateNo: 'dateOption.id'})
                .countDistinct({placeNo: 'placeOption.id'})

                .from('event').where('EvtUser.user_id', userId)
                .innerJoin('EvtUser', 'event.id', 'EvtUser.event_id')
                .innerJoin('dateOption', 'dateOption.event_id', 'EvtUser.event_id')
                .innerJoin('placeOption', 'placeOption.event_id', 'EvtUser.event_id')
                
                .groupBy('event.id')
                .orderBy('event.created_at', 'desc')

    }

    addEvent(title, detail, userId, email) { // req.body.title, req.body.detail
        let id;
        return this.knex('event').insert({
                title: title,
                detail: detail,
                status: 'Pending'
            }).returning('id')
            

         .then((eventId) => {
             id = eventId;
             return this.knex('EvtUser').insert({
                    event_id: eventId[0],
                    user_id: userId,
                    email: email,
                    isCreator: true
                })
        }).then(() => {
            return id;
        })
        .catch((err) => {
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
    
    inviteUser(eventId, inviteeEmail) { // req.params.id, req.body.email
        // insert invitee email in EvtUser
        // check if already exist in user, else insert user id to EvtUser.user_id
       
        return this.knex('EvtUser')
            .insert({
                event_id: eventId,
                email: inviteeEmail,
                isCreator: false
            })            
        .then(() => {
            let query = this.knex('user')
                .select()
                .innerJoin("EvtUser","EvtUser.email","user.email")
                .where('user.email', 'EvtUser.email');
       
            return query.then((rows) => {
                if(rows.length === 1) {
                    return this.knex('EvtUser').insert({
                        user_id: rows[0].id
                    }).where('EvtUser.email', inviteeEmail);
                } 
            })
        }).catch((err)=> {
            console.log(err)
        })
        
    }

    // list invitee
    listUser(eventId) {
        return this.knex('EvtUser')
                    .select();
                                  
    }
}

module.exports = eventService;

