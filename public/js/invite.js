
$(()=>{
    // event/invitee
    $('#add').submit((e) => {
        e.preventDefault();
        let val = $('input[name=email]').val();
        if (val === '') {
            return;
        }
        $('input[name=email]').val('');
        $.post('/api/add-invitee/', {
            invitee : val
        })
        .then((res) => {
            console.log(res)
            $('#email-list').append(Invitees(res.invitee));
        });
    })

    const Invitees = (invitee) =>{
        return `
            <div class="info-container">
               <p>${invitee}</p>
            </div>`
    };
})