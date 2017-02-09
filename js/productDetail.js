$(function(){
    
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop:false,
        grabCursor: true,
        autoplay: 3000,
        observer:true,
    });
    
    $(".spread").on("click",function () {
        $(".numDetail").removeClass("wordtodot")
        $(".numpanel").height("auto");
        $(".spread").hide();
    })

})