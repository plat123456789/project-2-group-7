
$(()=>{
    // event/event id/invitee
    let url = window.location.pathname;
    let eventId = url.match(/\/event\/(\d+)\/invite/)[1];

    const Invitees = (invitee) =>{
        return `
            <div class="info-container">
               <p>${invitee}</p>
            </div>`
    };

    function showEmail(email) {
        $('#email-list').append(Invitees(email));
    }

    $('#invite').click((e) => {
        e.preventDefault();
        let val = $('input[name=email]').val();
        if (val === '') {
            return;
        }
        $('input[name=email]').val('');

        $.post('/api/event/add-invitee', {
            eventId: eventId,
            invitee : val
        })
        .then((data) => {
            console.log(data)
            data.forEach((e) => {
                showEmail(e.invitee);
            })
        });

    })

    
    
})