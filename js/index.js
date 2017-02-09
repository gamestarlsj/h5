$(document).ready(function () {

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop:false,
        grabCursor: true,
        autoplay: 3000,
        onTap : function(swiper,event){
            if(swiper.activeIndex == 0){
                window.location.href = "http://mp.weixin.qq.com/s/nWGskq1-CopEe4mcj7idng"
            }else if(swiper.activeIndex == 1){
                window.location.href = "http://mp.weixin.qq.com/s/nWGskq1-CopEe4mcj7idng"
            }else if(swiper.activeIndex == 2){
                window.location.href = "http://mp.weixin.qq.com/s/nWGskq1-CopEe4mcj7idng"
            }
        }
    });

    getIndex();
    checkbottom();

    $(".fujin").on("click",function(){
        window.location.href = "help.html"
    })

    $(".linechange").on("click",function(){
        if($(this).index() == 0){
            $(".thoughline").animate({marginLeft:"1.7rem"},200,'ease-in-out');
        }else{
            $(".thoughline").animate({marginLeft:"6.5rem"},200,'ease-in-out');
        }
    })

})
var page = 1;
function getIndex(){
    ajax(1004,afterGet);
}

function checkbottom(){
    $(window).scroll(function(){
        totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
        if(($(document).height()) <= totalheight) {
            showmore()
        }
    });
}

function afterGet(data,command){
    var bannerData = data.data.banners;
    var goodsData = data.data.goods;
    var swiperHtml = '';
    var goodHtml = '';
    var swiper = $(".swiper-slide");
    $(bannerData).each(function(index,ele){
        swiperHtml += '<div class="swiper-slide">'
            +   '<img class="banner" src="'+ ele.img +'" alt="">'
            +   '</div>';
    })
    $(".swiper-wrapper").empty().append(swiperHtml);

    $(goodsData).each(function(index,ele){
        var discount = '';
        discount = ele.is_discount == 1 ? '折' : discount;
        goodHtml += '<div class="items" style="margin: 0">'
        + '<img src="'+ ele.img +'" alt="" class="itemspic">'
            + '<p class="titlefont2 mg02">'+ele.name+' </p>'
        + '<p class="flex between ">'
        + '<span class="flex" style="align-items: flex-end">'
        + '<span><img class="tuangoupic" src="img/tuangou.png" alt=""></span>'
        + '<span style="margin-left: -0.1rem" class="describefont mg01 grey">'+ele.customer_num+'人团</span>'
        + '<span style="font-weight: bold" class="bigfont mg0 titlefont2 orange">￥'+convert(ele.group_price)+discount+'</span>'
        + '<span style="text-decoration:line-through" class="describefont mg01 grey">单买价￥'+convert(ele.price)+discount+'</span>'
        + '</span>'
        + '<a href="detail.html?id='+ele.id+'" >'
        + '<span class="orangeButton_big tuangoumes mg01">立即参团</span>'
        + '</a>'
        + '</p>'
        + '</div>'
        
    })
    if(command == 1005){
        $(".goods").append(goodHtml);
    }else{
        $(".goods").empty().append(goodHtml);
    }
    page++;
}

function showmore(){
    var data = {};
    data.page = page;
    ajax(1005,appendGoods,data);
    $(".showmore").show();
}

function appendGoods(data){
    var goodsData = data.data;
    var goodHtml = '';
    $(goodsData).each(function(index,ele){
        goodHtml += '<div class="items" style="margin: 0">'
            + '<img src="'+ ele.img +'" alt="" class="itemspic">'
            + '<p class="titlefont2 mg02">'+ele.name+' </p>'
            + '<p class="flex between ">'
            + '<span class="flex" style="align-items: flex-end">'
            + '<span><img class="tuangoupic" src="img/tuangou.png" alt=""></span>'
            + '<span style="margin-left: -0.1rem" class="describefont mg01 grey">'+ele.customer_num+'人团</span>'
            + '<span style="font-weight: bold" class="bigfont mg0 titlefont2 orange">'+convert(ele.group_price)+'</span>'
            + '<span style="text-decoration:line-through" class="describefont mg01 grey">单买价￥'+convert(ele.price)+'</span>'
            + '</span>'
            + '<a href="detail.html?id='+ele.id+'" >'
            + '<span class="orangeButton_big tuangoumes mg01">立即参团</span>'
            + '</a>'
            + '</p>'
            + '</div>'
    })

    if(goodsData.length < 20){
        $(".showmore").hide();
        $(".nomore").show();
    }

    $(".goods").append(goodHtml);
    page++;
}