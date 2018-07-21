$(() => {
    // List all events
    $.get(`/api/events`).then((data) => {
        data.forEach(e => {
            $('#event-list').append(ListAllEvent(
                e.title,
                e.status
            ));
        });
    });

    const ListAllEvent = (title, status)=>{
        return `
            <div class="event-item">
                <div class="event-text">
                    <strong>${title}</strong>
                    <ul>
                        <li><i class="far fa-calendar"></i>   Date: </li>
                        <li><i class="fas fa-map-marker-alt"></i>  Place: </li>
                        <li><i class="fas fa-user"></i>   invitees</li> 
                    </ul>
                </div>

                <div class="event-status">
                    ${status}
                </div>
            </div>`
    }
})

