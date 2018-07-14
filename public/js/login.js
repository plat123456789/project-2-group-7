$(document).ready(function () {
    $('.message a').click(function () {
        $('form').animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow");
    });
    $('#signin').click(function () {
        $(".form h6").html("Login");
    });
    $('#create').click(function () {
        $(".form h6").html("Signup")
    });
});

