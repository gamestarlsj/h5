/**
 * Created by shijie on 2016/11/23.
 */

$(function(){
    showControl()
    var orderId = GetQueryString("orderId");
    ajax(1025,getptDetail,{id:orderId});
    ajax(1024,wxshare,{url:location.href.split('#')[0]});


    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop:false,
        grabCursor: true,
        autoplay: 3000,
        observer:true,
    });

})

function showControl(){

    $(".showmore").on("click",function(){
        var is_subscribed = $("#is_subscribed").val();
        var this_group = $("#this_group").val();

        if(this_group == "1"){
            //$(".toshow").show();
        }
    })
    $(".toshow2,.arrow2").on("click",function(){
        $(".toshow").hide();
    })
}

function getptDetail(data){
    console.log(data)
    var ptData = data.data;

    var groupUser = ptData.groupUser;
    var groupUserHtml = '';
	var bannerData = [];
    var descirbeUrl = [];
	var swiperHtml = '',describeHtml = '',generalMallHtml = '';
	
    $(".ptname").text(ptData.name);
    $("#desc").val(ptData.desc);
    var discount = '';
    discount = ptData.is_discount == 1 ? '折' : discount;
    $(".group_price").text(convert(ptData.group_price) + discount);
    $(".price").text(convert(ptData.price) + discount);
    $("#orderOwnerimg").attr("src", ptData.orderOwner.avatar);
    $(".orderOwner").text(ptData.orderOwner.nickname)
    $(".wait_join_num").text(ptData.groupOrder.wait_join_num);
    var endTime = ptData.groupOrder.def_time;
    var hh = parseInt(endTime / 60 / 60 % 24);
    var mm = parseInt(endTime / 60 % 60);
    var ss = parseInt(endTime % 60);
    hh = hh < 10 ? ("0" + hh) : hh;   //时
    mm = mm < 10 ? ("0" + mm) : mm;   //分
    ss = ss < 10 ? ("0" + ss) : ss;   //秒
    $(".endtime").text(hh+':'+mm+':'+ss);

    //$(groupUser).each(function(i,e){
    //    groupUserHtml += '<img class="smallimg" style="border-radius: 25px;" src="'+ e[i+1].avatar +'" alt="">'
    //})

    for(var i in groupUser) {
        groupUserHtml += '<img class="smallimg" style="border-radius: 25px;" src="'+ groupUser[i].avatar +'" alt="">'
        console.log(groupUser[i])
    }

    for(i=0;i<ptData.groupOrder.wait_join_num;i++){
        groupUserHtml += '<img class="smallimg" style="border-radius: 25px;" src="img/nounuser.png" alt="">'
    }

    $(".ptmes").empty().append(groupUserHtml);

    $("#is_subscribed").val(ptData.is_subscribed);

    if_this_group = ptData.this_group;

    if(ptData.group_status == "1"){
        $("#changestatus").html('<div style="color: white"><img style="width: 1rem" class="" src="img/wait_group.png" alt=""><p style="margin-top: -0.2rem">拼团已成功</p></div>')
    }else{
        if(if_this_group){
            $(".wait_to_join").text(ptData.groupOrder.wait_join_num);
            $("#this_group").val(1);
            if(ptData.group_status == "0") {
                //$(".toshow").show();
            }
        }else{
            $("#changestatus").html('<a style="color:white" href="gmdetail.html?orderId='+ GetQueryString("orderId") +'&goods_type='+ ptData.goods_type + '&goods_id='+ ptData.goods_id+'&is_group=1&group_order_id='+ ptData.groupOrder.id+'"><img style="width: 1rem" class="" src="img/wait_group.png" alt=""><p style="margin-top: -0.2rem">我要参团</p></a>')
            $("#this_group").val(0)
        }
    }
	$('#goodsdesc').html(ptData.desc);
	var mall = ptData.mall;
	var mallHtml = '';
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
	//商品详情
    $("#mall").empty().append(mallHtml);
	//连锁店通用商家
    if(ptData.is_general == '1') {
        var generalMall = ptData.general_mall;
        $('.searchother .fendiannum').html(generalMall.length-1);
        $('.searchother').show();
        $.each(generalMall, function (key, val) {
            if(val.id == ptData.mall_id)return true;
            generalMallHtml += '<div class="panel flex" style="justify-content: space-between;margin-top: 0"><div><p class="grey describefont mg0">' + val.address
                    + '</p><p class="grey describefont mg0" style="margin-top: 0.3rem">' + val.phone
                    + '</p></div><div><a href="http://api.map.baidu.com/marker?location='+ val.lng +','+ val.lat +'&amp;title=' + val.name
                    + '&amp;content=' + val.address + '&amp;output=html&amp;src=weiba|weiweb"><img class="busiadressicon" src="img/address2.png" alt=""></a><a href="tel:' + val.phone + '">'
                    + '<img class="busiadressicon" src="img/tel.png" alt=""></a></div></div>'
        });
        generalMallHtml += '<div class="panel flex center orange clickup">点击收起↑</div>';
        $('.fendianlist').append(generalMallHtml);
    }
	
	$.each(ptData.gallery, function (key, val) {
            if(val.type == "1"){
               bannerData.push(val.url)
            }else if(val.type == "2"){
               descirbeUrl.push(val.url)
            }
        });
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
	$(".busishow").empty().append(describeHtml);
}

function wxshare(data){
    wxdata = data.data;
    wx.config({
        debug: false,
        appId: wxdata.appId,
        timestamp: wxdata.timestamp,
        nonceStr:wxdata.nonceStr,
        signature: wxdata.signature,
        jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage"
        ]
    });

    wx.ready(function(){

        var orderId = GetQueryString("orderId");
        console.log(orderId)

        wx.onMenuShareTimeline({
            title: "我买了" + $(".ptname").text() + '超值', // 分享标题
            link: location.origin + location.pathname + "?orderId=" + orderId,
            imgUrl: $(".banner").attr("src"), // 分享图标
            desc: '你的好友已抢到超值' + $(".ptname").text() + '，你还等什么？赶紧行动吧！',
            success: function () {
                toast.showTime("分享成功")
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                toast.showTime("分享失败")
            }
        });

        wx.onMenuShareAppMessage({
            title: "我买了" + $(".ptname").text() + '超值',
            link: location.origin + location.pathname + "?orderId=" + orderId,
            imgUrl: $(".banner").attr("src"), // 分享图标
            desc:'你的好友已抢到超值' + $(".ptname").text() + '，你还等什么？赶紧行动吧！',
            success: function () {
                toast.showTime("分享成功")
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                toast.showTime("分享失败")
            }
        });
    });

$(".searchother").on("click",function () {
        $(this).hide();
        $(".fendianlist").show();
    })

    $(".fendianlist").on("click", '.clickup',function () {
        $(".fendianlist").hide();
        $(".searchother").show();
    })


}
