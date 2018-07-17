$(document).ready(function(){
        

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
        },
    });

    $("#continue").click(function(){
        let result = $("#basicDate").val().split(',');

        let resultObj = {};

        for(let i = 0; i<result.length; i++){
            resultObj["dateTime"+i] = result[i];
          }
        
        $.ajax({
            url: "/date",
            type: "POST",
            data: resultObj,
        })
        .done(console.log(resultObj))
        .fail(function(err){
            console.log(err)
        })
    })
})
    