$(document).ready(function () {

    $("#customNum").on("click",function () {
        $(".custompanel").animate({
            opacity:"1",
            top:"0.1rem"
        },200,'ease-in-out');
        $("#customInput").focus();
    })

    $("#submit").on("click",function () {
        $(".custompanel").animate({
            opacity:"0",
            top:"1rem"
        },200,'ease-in-out');
        $("#customInput").focus();
    })
})

