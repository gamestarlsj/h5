$(document).ready(function () {

    var type = GetQueryString("type");
    var data = {};
    if(type != ''){
        data.type = type;
    }
    ajax(1018,orderrender,data)

})

function orderrender(data){
    var orderData = data.data;
    var appendHtml = '';
    console.log(orderData)
    console.log(orderData.length)

    if(orderData.length){
        $(orderData).each(function(i,e){

            var type = e.status;
            var waitpayHtml = '';
            var waitpin = '';
            var waitdelivery = '';
            var waituse = '';
            var complete = ''
            //待付款
            if(type == 0){
                waitpayHtml += '\n'
                    +    '<div class="card mgtop">'
                    +    '<div class="flex between">'
                    +    '<div class="flex">'
                    +    '<img class="middleimg" src="'+ e.goods.img+'" alt="">'
                    +    '<div>'
                    +    '<a href="">'
                    +    '<p class="titlefont2 wordtodot" style="width: 4rem;margin-top: 0">'+ e.goods.name+'</p>'
                    +    '</a>'
                    +    '<p class="describefont grey" style="">总价：￥'+ convert(e.amount) +'</p>'
                    +    '</div>'
                    +    '</div>'
                    +    '<p class="grey describefont" style="text-align: right;margin-top: -0.5rem;">待支付</p>'
                    +    '</div>'
                    +    '<hr style="margin-top: 0.3rem;margin-bottom:0.1rem">'
                    +    '<div class="flex" style="justify-content: flex-end">'
                    +    '<p orderid="'+ e.id +'" class="cancelOrder titlefont orangeButton" style="margin: 0.1rem;background: white;border-color: grey;color: grey">取消订单</p>'

                //虚拟物品
                if(e.goods.goods_type == "0"){
                    waitpayHtml   +=    '<a href="odetail-card-unpay.html?orderId='+ e.id + '&goods_type='+ e.goods.goods_type + '&goods_id='+ e.goods_id +'&is_group='+ e.is_group +'&group_order_id='+ e.group_order_id+'">'
                }else if(e.goods.goods_type == "1"){
                    waitpayHtml   +=    '<a href="odetail-pin-unpay.html?orderId='+ e.id +'&goods_type='+ e.goods.goods_type + '&goods_id='+ e.goods_id +'&is_group='+ e.is_group +'&group_order_id='+e.group_order_id+'">'
                }
                waitpayHtml   +=    '<p class="titlefont orangeButton" style="margin: 0.1rem">立即支付</p>'
                    +    '</a>'
                    +    '</div>'
                    +    '</div>'

                appendHtml += waitpayHtml
                //待成团
            }else if(type == 1){
                waitpin += '\n'
                    +  '<div class="card mgtop">'
                    +  '<div class="flex between">'
                    +  '<div class="flex">'
                    +  '<img class="middleimg" src="'+ e.goods.img+'" alt="">'
                    +  '<div>'
                    +  '<p class="titlefont2 wordtodot" style="width: 4rem;margin-top: 0">'+ e.goods.name +'</p>'
                    +  '<p class="describefont grey" style="">总价：￥'+ convert(e.amount) +'</p>'
                    +  '</div>'
                    +  '</div>'
                    +  '<p class="grey describefont" style="text-align: right;margin-top: -0.7rem;margin-left: 0;">拼团中，差<span style="font-weight: bold" class="orange">'+ e.group.wait_join_num+'</span>人</p>'
                    +  '</div>'
                    +  '<hr style="margin-top: 0.3rem;margin-bottom:0.1rem">'
                    +  '<div class="flex" style="justify-content: flex-end;color: grey">'
                    +  '<a href="ptdetail.html?orderId='+ e.id +'">'
                    +  '<p class="titlefont orangeButton" style="margin: 0.1rem;width: 2.5rem;">邀请好友拼团</p>'
                    +  '</a>'
                    +  '</div>'
                    +  '</div>'
                appendHtml += waitpin

                //待收货 暂无此分类
            }else if(type == 2){

                //待发货
            }else if(type == 3){
                waitdelivery += '\n'
                    +    '<div class="card mgtop">'
                    +    '<div class="flex between">'
                    +    '<div class="flex">'
                    +    '<img class="middleimg" src="'+ e.goods.img+'" alt="">'
                    +    '<div>'
                    +    '<div class="flex">'
                    +    '<p class="titlefont2 wordtodot" style="width: 4rem;margin-top: 0">'+ e.goods.name +'</p>'
                    +    '<p class="grey describefont" style="text-align: right;margin-left: 1.5rem;">待收货</p>'
                    +    '</div>'
                    +    '<p class="describefont grey" style="">总价：￥'+ convert(e.amount) +'</p>'
                    +    '</div>'
                    +    '</div>'
                    +    '</div>'
                    +    '<hr class="hrline">'
                    +    '<div class="flex" style="justify-content: flex-end;color: grey">'
                    +    '<a href="Logistical.html">'
                    +    '<p class="describefont greyButton" style="margin: 0.1rem;">查看物流</p>'
                    +    '</a>'
                    +    '<p class="describefont orangeButton confirmdelivery" style="margin: 0.1rem;">确认收货</p>'
                    +    '</div>'
                    +    '</div>'

                appendHtml += waitdelivery
            }
            //待使用
            else if(type == 4){
                waituse += '\n'
                    +    '<div class="card mgtop flex between">'
                    +    '<div class="flex">'
                    +    '<img class="middleimg" src="'+ e.goods.img+'" alt="">'
                    +    '<div>'
                    +    '<p class="titlefont2 wordtodot" style="width: 4rem;margin-top: 0">'+ e.goods.name +'</p>'
                    +    '<p class="describefont grey" style="margin-top: 0">有效期至'+ e.coupon_end_time +'</p>'
                    +    '<p class="describefont grey" style="margin-bottom: 0">总价：￥'+ convert(e.amount) +'</p>'
                    +    '</div>'
                    +    '</div>'
                    +    '<div>'
                    +    '<p class="grey describefont" style="text-align: right">待使用</p>'
                    +    '<a href="odetail-card-paid.html?orderId='+ e.id +'&goods_id='+ e.goods_id+'">'
                    +    '<p class="titlefont orangeButton">查看券码</p>'
                    +    '</a>'
                    +    '</div>'
                    +    '</div>'

                appendHtml += waituse
            }
            //已完成
            else if(type == 5){
                complete += '\n'
                    +    '<div class="card mgtop">'
                    +    '<div class="flex between">'
                    +    '<div class="flex">'
                    +    '<img class="middleimg" src="'+ e.goods.img+'" alt="">'
                    +    '<div>'
                    +    '<a href="">'
                    +    '<p class="titlefont2 wordtodot" style="width: 4rem;margin-top: 0">'+ e.goods.name+'</p>'
                    +    '</a>'
                    +    '<p class="describefont grey" style="">总价：￥'+ convert(e.amount) +'</p>'
                    +    '</div>'
                    +    '</div>'
                    +    '<p class="grey describefont" style="text-align: right;margin-top: -0.5rem;">已完成</p>'
                    +    '</div>'
                    +    '<hr style="margin-top: 0.3rem;margin-bottom:0.1rem">'
                    +    '<div class="flex" style="justify-content: flex-end">'

                if(e.goods.goods_type == "0"){
                    complete +=  '<a href="odetail-pin-paid.html?orderId='+ e.id +'">';
                    complete +=  '<p class="titlefont orangeButton" style="margin: 0.1rem">查看订单</p>'
                }else if(e.goods.goods_type == "1"){
                    complete +=  '<a href="odetail-card-paid.html?orderId='+ e.id +'">';
                    complete    +=     '<p class="titlefont orangeButton" style="margin: 0.1rem">查看券码</p>'
                }
                complete    +=    '</a>'
                    +    '</div>'
                    +    '</div>'
                appendHtml += complete
            }

            //已完成
            else if(type == 6){
                complete += '\n'
                    +    '<div class="card mgtop">'
                    +    '<div class="flex between">'
                    +    '<div class="flex">'
                    +    '<img class="middleimg" src="'+ e.goods.img+'" alt="">'
                    +    '<div>'
                    +    '<a href="">'
                    +    '<p class="titlefont2 wordtodot" style="width: 4rem;margin-top: 0">'+ e.goods.name+'</p>'
                    +    '</a>'
                    +    '<p class="describefont grey" style="">总价：￥'+ convert(e.amount) +'</p>'
                    +    '</div>'
                    +    '</div>'
                    +    '<p class="grey describefont" style="text-align: right;margin-top: -0.5rem;">交易已关闭</p>'
                    +    '</div>'
                    +    '<div class="flex" style="justify-content: flex-end">'
                    +    '</a>'
                    +    '</div>'
                    +    '</div>'
                appendHtml += complete
            }
        })
    }else{
        $(".orderAll").html("<img style='width: 5rem;margin: 1rem 2.5rem;' src='img/nodetail.png' />")
        $(".footer,.uparrow").hide();
    }

    $(".orderAll").append(appendHtml);

    $(".confirmdelivery").on("click",function(){
        Dialog.showTime("确认收货后，资金打入商家账户中");
        Dialog.Dialogconfirm = function(){
            toast.showTime("确认成功");
            Dialog.Dialogcancel();
        }
    })

    $(".cancelOrder").on("click",function(){
        var orderid = $(this).attr("orderid")

        Dialog.showTime("确定要取消订单吗？");
        Dialog.Dialogconfirm = function(){
            ajax(1027,function(data){
                if(data.status == "1"){
                    toast.showTime("订单已取消");
                    Dialog.Dialogcancel();
                    window.location.reload();
                }
            },{id:orderid})
        }
    })

}