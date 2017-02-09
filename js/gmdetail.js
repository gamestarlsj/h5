var price ='';

$(document).ready(function() {

    var data = {};
    data.id = GetQueryString("goods_id");
    ajax(1008,afterGet,data);
    count();

})




function count(){
    $(".paybutton").on("click", function () {
        var data = {};
        //参团中id判断
        var group_order_id = GetQueryString("group_order_id");
        var order_id = GetQueryString("order_id");
        data.goods_id = GetQueryString("goods_id");
        data.goods_num = $(".countinput").val();
        data.is_group = GetQueryString("is_group");
        data.address_id = $("#address_Id").val() ? $("#address_Id").val() : 0;
        data.group_order_id = group_order_id ? group_order_id : 0;
        data.order_id = order_id ? order_id : 0;

        ajax(1017, function (e) {
            if(e.status == "1"){
                var n = e.data.jsapi;
                //调用微信JS api 支付
                function jsApiCall(){
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {appId: n.appId, timeStamp: n.timeStamp.toString(), nonceStr: n.nonceStr, package: n.package, signType: n.signType, paySign: n.paySign},function (res) {
                            if("object" == typeof res && res.err_msg == "get_brand_wcpay_request:ok"){//支付成功
                                window.location.href = "ptdetail.html?orderId=" + e.data.id;
                            } else {
                                alert('支付未完成');
                            }
                        });};
                var c = function (){
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                        }
                    } else {
                        jsApiCall();
                    }};c();
            }else{
                toast.showTime(e.errorMsg)
            }


        }, data);
    })
    $(".plus").on("click",function() {
        var count = $(".countinput").val();
        var temp = parseInt(count) + 1;
        $(".countinput").val(temp);
        $(".price").text((price * temp).toFixed(2))
    })
    $(".minute").on("click",function() {
        var count = $(".countinput").val();
        if(parseInt(count) > 1){
            var temp = parseInt(count) - 1;
            $(".countinput").val(temp);
            $(".price").text((price * temp).toFixed(2))
        }
    })

    $(".countinput").on('input',function(e){
        if($(".countinput").val() != ''){
            $(".price").text((price * $(".countinput").val()).toFixed(2))
        }
    });
}

function afterGet(retdata){

    console.log(retdata);
    var data = retdata.data;
    var addressData = data.address;
    var mallData = data.mall;
    var type = GetQueryString("type");
    var is_group = GetQueryString("is_group");
    var enterFlag = GetQueryString("flag");
    var buy_num = GetQueryString("buy_num");
    var is_group = GetQueryString("is_group");

    if(addressData == null){
        $("#nickname").html("暂无地址");
        $("#address").html("");
    }else{
        $("#nickname").html(addressData.name + "&nbsp;&nbsp;&nbsp;&nbsp;" + addressData.mobile);
        $("#address").html(addressData.province+"&nbsp;&nbsp;" + addressData.city + "&nbsp;&nbsp;"+addressData.district + addressData.address)
        $("#address_Id").val(addressData.id)
    }


    $("#mallname").text(mallData.name);
    $("#goodname").text(data.name);

    $(".itemimg").attr("src",data.img);



    if(is_group == "1"){
        price = convert(data.fee);
        if(buy_num == '')buy_num = 1;
        $(".price").text(buy_num * convert(data.fee))
    }else if(is_group == "0" ){
        price = convert(data.fee);
        if(buy_num == '')buy_num = 1;
        $(".price").text(buy_num * convert(data.fee))
    }

    if(enterFlag == "unpay" && enterFlag != ''){
        $(".countinput").val(buy_num);
    }else{
        $(".countinput").val(1);
    }

}
