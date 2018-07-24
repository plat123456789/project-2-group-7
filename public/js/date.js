$(document).ready(function(){

    let url = window.location.pathname;

    let eventId = url.match(/\/event\/(\d+)\/date/)[1];

    $("#basicDate").flatpickr({
        enableTime: true,
        dateFormat: "M d Y H:i",
        inline: true,
        mode: "multiple",
        minDate: "today",
        shorthandCurrentMonth: true,
        onReady: function(dateObj, dateStr, instance) {
            var $cal = $(instance.calendarContainer);
            if ($cal.find('.flatpickr-clear').length < 1) {
                $cal.append('<div class="flatpickr-clear">Clear</div>');
                $cal.find('.flatpickr-clear').on('click', function() {
                    instance.clear();
                    instance.close();
                });
            }
        },
        onChange: function(){
            if($('#basicDate').val()!=""){
                $("#continue").prop('disabled', false);
            }else{
                $("#continue").prop('disabled', true);
            };

            let dateArry = [];

            if($('#basicDate').val()!=""){
                dateArry = $('#basicDate').val().split(",");
            }

            let selected = "";

            for (let i = 0; i < dateArry.length; i++) {

                let dateTime = dateArry[i];
    
                selected += "<li class='list-group-item'>"+dateTime+"</li>"
            }

            $(".selected-list").html(selected);

        },
    });

    $("#continue").click(function(){
        let result = $("#basicDate").val().split(',');

        let temp = {};

        let resultArry = [];

        for(let i = 0; i<result.length; i++){
            temp.dateTime = result[i];
            temp.event_id = eventId;
            resultArry.push(temp);
            temp = {};
          }
        
        $.ajax({
            url: "/api/date",
            type: "POST",
            data: {"dateTime": JSON.stringify(resultArry)}
        })
        .done(data=> document.location=('http://localhost:3000/event/' + data[0] +'/place'))
        .fail(function(err){
            console.log(err)
        })
    })
})
    