$(document).ready(function() {

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop:false,
        grabCursor: true,
        autoplay: 3000,
    });

    var goods_id = GetQueryString("id");

    $(".buyitem").on("click",function() {
        window.location.href = "gmdetail.html?flag=detail&goods_id=" + goods_id + "&is_group=" + $(this).attr("is_group")+ "&group_order_id=0";
    })

    var data = {};
    data.id = getData("id")
    ajax(1007,afterGet,data)

    $(".myfavbutton").on("click",function() {
        var is_favorite = $("#is_favorite").val();
        if(!parseInt(is_favorite)){
            ajax(1015,function(data){
                if(data.status = "1"){
                    toast.showTime("收藏成功")
                    $(".myfavimg").attr("src","img/myfav2.png")
                    $(".myfavstatus").text("取消收藏");
                    $("#is_favorite").val(1)
                }else{
                    toast.showTime("收藏失败，请稍后再试")
                }
            },{id:GetQueryString("id")})
        }else{
            ajax(1016,function(data){
                if(data.status = "1"){
                    toast.showTime("已取消收藏")
                    $(".myfavimg").attr("src","img/myfav.png")
                    $(".myfavstatus").text("收藏");
                    $("#is_favorite").val(0)
                }else{
                    toast.showTime("取消收藏失败，请稍后再试")
                }
            },{id:GetQueryString("id")})
        }
    })

    $(".searchother").on("click",function () {
        $(this).hide();
        $(".fendianlist").show();
    })

    $(".fendianlist").on("click", '.clickup',function () {
        $(".fendianlist").hide();
        $(".searchother").show();
    })



})

function getData(para){
    return GetQueryString(para);
}

function afterGet(data){
    console.log(data);
    var detailData = data.data;
    var swiperHtml = '',describeHtml = '';

    var gallery = detailData.gallery;
    var bannerData = [];
    var descirbeUrl = [];
    var grouping = detailData.grouping;
    var mall = detailData.mall;
    var groupHtml = '',mallHtml = '',generalMallHtml = '';

    $(gallery).each(function(index,ele){
        if(ele.type == "1"){
            bannerData.push(ele.url)
        }else if(ele.type == "2"){
            descirbeUrl.push(ele.url)
        }
    })

    $(grouping).each(function(index,ele){
        var endTime = ele.def_time;
        var hh = parseInt(endTime / 60 / 60 % 24);
        var mm = parseInt(endTime / 60 % 60);
        var ss = parseInt(endTime % 60);
        hh = hh<10?("0" + hh):hh;   //时
        mm = mm<10?("0" + mm):mm;   //分
        ss = ss<10?("0" + ss):ss;   //秒
        groupHtml
        += '<div class="panel flex between">'
        +  '    <div>'
        +  '    <img class="cantuanpic" src="'+ele.avatar+'" alt="">'
        +  '    </div>'
        +  '    <div style="width: 6rem">'
        +  '    <div class="flex between" style="align-items: flex-end">'
        +  '    <p style="font-size: 0.35rem">'+ele.nickname+'</p>'
        +  '    <p style="font-size: 0.35rem">还差<span style="font-size: 0.45rem;color: #f39800">'+ele.wait_join_num+'</span>人参团</p>'
        +  '    </div>'
        +  '    <div style="text-align: right" class="flex between">'
        +  '    <p class="describefont cantuanfont1 grey smalldesfont">'+ele.city+'</p>'
        +  '    <p class="describefont cantuanfont1 grey smalldesfont">剩余时间 '+hh+':'+mm+':'+ss+'</p>'
        +  '</div>'
        +  '</div>'
        +  '<div>'
        +  '<div group_order_id="'+ ele.id +'"  class="cantuanbutton">'
        +  '    立即<br>参团'
        +  '    </div>'
        +  '    </div>'
        +  '</div>'
    })

    $("#grouping").empty().append(groupHtml);

    $(".cantuanbutton").on("click",function() {
        window.location.href = "gmdetail.html?flag=detail&goods_id=" + GetQueryString("id") + "&is_group=1&group_order_id="+$(this).attr("group_order_id");
    })

    //banner
    var swiper = $(".swiper-slide");
    $(bannerData).each(function(index,ele){
        swiperHtml += '<div class="swiper-slide">'
            +   '<img class="banner" src="'+ ele +'" alt="">'
            +   '</div>';
    })
    $(".swiper-wrapper").empty().append(swiperHtml);

    //商品描述
    $(descirbeUrl).each(function(index,ele){
        describeHtml += '<img style="width: 100%" src="'+ ele +'" alt="">';
    })

    mallHtml +=  '<p class="titlefont mg0 mgtop01" style="margin-bottom:0.1rem;font-size: 0.5rem">'+ mall.name +'</p>'
                 +   '<hr class="hrline mg0">'
                 +   '<div class="flex" style="justify-content: space-between;margin-top: 0">'
                 +   '<div>'
                 +   '<p class="grey describefont mg0">'+ mall.address +'</p>'
                 +   '<p class="grey describefont mg0" style="margin-top: 0.3rem">'+ mall.phone +'</p>'
                 +   '</div>'
                 +   '<div>'
                 +   '<a href="http://api.map.baidu.com/marker?location='+ mall.lng +','+ mall.lat +'&amp;title='+ mall.name +'&amp;content='+ mall.address +'&amp;output=html&amp;src=weiba|weiweb">'
                 +   '<img class="busiadressicon"  src="img/address2.png" alt="">'
                 +   '</a>'
                 +   '<a href="tel:'+ mall.phone +'">'
                 +   '<img class="busiadressicon"  src="img/tel.png" alt="">'
                 +   '</a>'
                 +   '</div>'
                 +   '</div>';

    $("#is_favorite").val(detailData.is_favorite);

    if(detailData.is_favorite){
        $(".myfavimg").attr("src","img/myfav2.png")
        $(".myfavstatus").text("取消收藏");
    }

    //商品详情
    $(".busishow").empty().append(describeHtml);


    //临时
    //$(".busishow").empty().append('<img style="width: 100%" src="http://i1.piimg.com/581434/1874d447d558d239.jpg">');
    //$(".busishow").append('<img style="width: 100%" src="http://i1.piimg.com/581434/5c96e9dd1da6f15c.jpg">');


    //商品详情
    $("#mall").empty().append(mallHtml);
    var discount = '';
    discount = detailData.is_discount == 1 ? '折' : discount;
    $(".group_price").text(convert(detailData.group_price) + discount)
    $(".price").text(convert(detailData.price) + discount)

    //商品描述
    $("#desc").html(detailData.desc);
    //商品名称
    $("#title").text(detailData.name);
    
    //单买价
    $("#price").html("原价:<span style='text-decoration:line-through;'>￥" + convert(detailData.price) +discount+ '</span><br/>' + "拼团价:￥" + convert(detailData.group_price)+discount);
    //团购价

    $("#group_price").text("开团费：￥" + convert(detailData.fee));
    //已售数量
    $("#sales").text("已售" + detailData.sales);
    //需要人数
    $("#customer_num").text(detailData.customer_num + "人参团")
    //是否随时退
    detailData.quick_refund == "1" ? $("#is_reserve").text("需要预约") : $("#is_reserve").text("无需预约")
    //连锁店通用商家
    if(detailData.is_general == '1') {
        var generalMall = detailData.general_mall;
        $('.searchother .fendiannum').html(generalMall.length-1);
        $('.searchother').show();
        $.each(generalMall, function (key, val) {
            if(val.id == detailData.mall_id)return true;
            generalMallHtml += '<div class="panel flex" style="justify-content: space-between;margin-top: 0"><div><p class="grey describefont mg0">' + val.address
                    + '</p><p class="grey describefont mg0" style="margin-top: 0.3rem">' + val.phone
                    + '</p></div><div><a href="http://api.map.baidu.com/marker?location='+ val.lng +','+ val.lat +'&amp;title=' + val.name
                    + '&amp;content=' + val.address + '&amp;output=html&amp;src=weiba|weiweb"><img class="busiadressicon" src="img/address2.png" alt=""></a><a href="tel:' + val.phone + '">'
                    + '<img class="busiadressicon" src="img/tel.png" alt=""></a></div></div>'
        });
        generalMallHtml += '<div class="panel flex center orange clickup">点击收起↑</div>';
        $('.fendianlist').append(generalMallHtml);
    }
}