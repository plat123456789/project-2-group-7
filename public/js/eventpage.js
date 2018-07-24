let url = window.location.pathname;
let eventId = url.match(/\/event\/(\d+)/)[1];

$(() => {
    // event details
    $.get(`/api/event/events`).then((data) => {
            data.forEach(e => {
                if(e.id == eventId) {
                    $('#event-list').append(Event(
                        e.id,
                        e.title,
                        e.status,
                        e.detail
                    )) 
                }                   
            });
    })
      
        const Event = (id, title, status, detail)=>{
            return `            
            <div class="event-box">
                <h4 class="border-bottom">
                    ${title} <span class="badge badge-warning">${status}</span>
                </h4>

                <div class="buttons">
                    <button type="submit" id="confirm" class="btn btn-primary">Confirm</button>             
                    <a href="/event/${id}/invite"><button type="submit" id="invite" class="btn btn-outline-info">Invite</button></a>             
                    <button type="submit" id="cancel" class="btn btn-outline-danger">Cancel</button> 
                </div>
                <div class="media pt-3">         
                    <p class="media-body pb-3 lh-125 border-bottom">
                        <strong class="d-block">Details:</strong> 
                        ${detail}
                    </p>
                </div>
            </div>`
        }

        // date options
        $.get(`/api/date`).then((data) => {
                data.forEach(e => {
                    if(e.event_id == eventId) {
                        $('#date-list').append(Dates(
                            e.id,
                            e.date.replace(),
                            e.start_time
                        )) 
                    }                   
                });
        })
        const Dates = (id, date, start_time)=>{
            return `   
                <div id="${id}" class="options">
                    <ul>
                        <li>Date: ${date}</li>
                        <li>Time: ${start_time}</li>
                    </ul>                
                </div>`
        }         

        // place options
        $.get(`/api/places`).then((data) => {
            data.forEach(e => {
                if(e.eventId == eventId) {
                    $('#place-list').append(Places(
                        e.placeOptionId,
                        e.name,
                        e.district
                    )) 
                }                   
            });
        })
        const Places = (placeOptionId, name, district)=>{
            return `   
            <div id="${placeOptionId}" class="options">
                <ul>
                    <li>Name: ${name}</li>
                    <li>District: ${district}</li>
                </ul>                
            </div>`
        }       
        
        // invitee
        $.get(`/api/event/invitee`).then((data) => {
            data.forEach(e => {
                if(e.event_id == eventId) {
                    $('#invitee-list').append(Invitees(
                        e.email
                    )) 
                }                   
            });
        })
        const Invitees = (email)=>{
            return `   
                <div class="email">
                    <p>${email}</p>             
                </div>`
        }      

        // confirm event
        // $('#confirm').click(() => {
        //     $.post('/api/event/confirm', {
        //         eventId: eventId
        //     })
        //     .then((data) => {
        //         console.log(data)
        //     })
            
        // })

        // cancel event
})
