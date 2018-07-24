$(() => {
    $('#postBtn').click((e)=> {
        e.preventDefault();
// console.log(e.target.parent);
//         return;

        $.post('/event',{
            title: e.target.parentElement.title.value,
            detail: e.target.parentElement.detail.value
        }).then((response) => {
            // change for deploy
<<<<<<< HEAD
            document.location=(window.location.protocol + "//"+ window.location.hostname+ '/event/' + response[0] +'/date')
            //console.log(response)
=======
            document.location=('http://localhost:3000/event/' + response[0] +'/date')
             //console.log(response)
>>>>>>> b584a47b63d89552464f3d1d559489bb9482d97b
        })
    
    })
    
    
    // List all events
    //homepage
    $.get(`/api/events`).then((data) => {
        if(data.length !== 0) {
            data.forEach(e => {
                $('#event-list').append(ListAllEvent(
                    e.id,
                    e.title,
                    e.status
                ));
            });
        } else {
            $('#event-list').append(NoEvent);
        }
    })
        const NoEvent = `<p>Seems like you’re not in any events…</p>
                        <br>
                        <a href="/create-event">
                            <button type="button" class="btn btn-warning">Create Event</button>
                        </a>`;

        const ListAllEvent = (id, title, status)=>{
            return `
            <a href="/event/${id}">
                <div class="event-item ${status}" id="${id}">
                    <div class="event-text">
                        <h6>${title}</h6> 
                        <ul>
                            <li><i class="far fa-calendar"></i>   Date: </li>
                            <li><i class="fas fa-map-marker-alt"></i>  Place: </li>
                            <li><i class="fas fa-user"></i>   invitees</li> 
                        </ul>
                    </div>

                    <div class="event-status">
                        <span class="badge badge-warning">${status}</span>
                    </div>
                </div>
            </a>`
        }

        // disable create button if no title
        $('#postBtn').attr('disabled', true);

        $('.required').keyup(() => {
            if ($('.required').val().length !== 0) {
                $('#postBtn').prop('disabled', false);            
            }
            else {
                $('#postBtn').prop('disabled', true);   
            }
        })   

        // filter button WORKING
        $("input[name='status']").click(() => {
            let currentStatus =  $("input[name='status']:checked").val();

            if(currentStatus == 'Confirmed') {
                $('.Confirmed').show();
                $('.Pending').hide();
            } 
            if(currentStatus == 'Pending') {
                $('.Pending').show();
                $('.Confirmed').hide();
            } else if(currentStatus == 'All') {
                $('.event-item').show();
            }
            
        })
        

})
