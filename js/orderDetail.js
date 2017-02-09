/**
 * Created by shijie on 2016/12/8.
 */
$(document).ready(function () {

    var data= {};
    data.order_id = GetQueryString("orderId");
    ajax(1020,getDetail,data)

})

function getDetail(data){
    var orderDetaildata = data.data;
    var goodid = GetQueryString("goods_id");
    $(".detaillink").attr("href","detail.html?id=" + orderDetaildata.goods_id)

    $(".orderimg").attr("src",orderDetaildata.img);
    $(".ordername").text(orderDetaildata.mall_name);
    $(".orderdes").text(orderDetaildata.name);
    $(".amount").text(convert(orderDetaildata.amount));
    $(".coupon_sn").text(orderDetaildata.coupon_sn);
    $(".overtime").text("自购买之日起一个月内有效");
    $(".gooddetail").html(orderDetaildata.desc);
    $(".orderNum").text(orderDetaildata.sn);
    if(orderDetaildata.address){
        $(".mobile").text(orderDetaildata.address.mobile);
        $(".paytime").text(orderDetaildata.address.pay_time);
    }
    $(".paytime").text(orderDetaildata.pay_time);

    $(".goodsNum").text(orderDetaildata.buy_num);
    $(".price").text(convert(orderDetaildata.amount));

    $(".mall_phone").text(orderDetaildata.mall_phone);
    $(".mall_tel").text(orderDetaildata.mall_tel);

    $(".mall_tel").text(orderDetaildata.mall_tel);
    $(".selled").text(orderDetaildata.sales);

    $(".mobile").parent().hide();
    if(orderDetaildata.is_leader == 1) {
        $(".couponinfo").prepend('<span class="orange">团长</span>');
    }



    $('.QRCode').qrcode({
        width:150,
        height:150,
        text:orderDetaildata.coupon_sn
    });


}