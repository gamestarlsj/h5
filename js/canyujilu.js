$(document).ready(function () {

    $(".linechange").on("click",function(){
        if($(this).index() == 0){
            $(".thoughline").animate({marginLeft:"0.7rem"},200,'ease-in-out');
        }else if($(this).index() == 1){
            $(".thoughline").animate({marginLeft:"4.0rem"},200,'ease-in-out');
        }else if($(this).index() == 2){
            $(".thoughline").animate({marginLeft:"7.5rem"},200,'ease-in-out');
        }
    })

})