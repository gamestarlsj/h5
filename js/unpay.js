/**
 * Created by shijie on 2016/12/9.
 */
$(document).ready(function () {

    var data = {};
    data.order_id = GetQueryString("orderId");

    ajax(1020,getDetail,data);

})

function getDetail(data){
    var orderdetail = data.data;

    console.log(orderdetail)
    if(orderdetail.address != null){
        $(".address").text(orderdetail.address.province + " " + orderdetail.address.city + " " + orderdetail.address.district  + " " + orderdetail.address.address)
        $(".namemobile").text(orderdetail.address.name + " " + orderdetail.address.mobile);
        $(".mobile").text(orderdetail.address.mobile)
    }

    $(".itemimg").attr("src",orderdetail.img)

    $(".mall_name").text(orderdetail.mall_name);
    $(".name").text(orderdetail.name);
    $(".amount").text(convert(orderdetail.amount));
    $(".desc").html(orderdetail.desc);
    $(".sn").text(orderdetail.sn);
    $(".pay_time").text(orderdetail.pay_time);
    $(".buy_num").text(orderdetail.buy_num);
    $(".mall_phone").text(orderdetail.mall_phone);
    $(".mall_tel").text(orderdetail.mall_tel);
    $(".mallimg").attr("src",orderdetail.img);

    $('.goodslink').attr("href","detail.html?id=" + orderdetail.goods_id)


    $(".bottompaybutton").on("click", function () {
        var is_group = GetQueryString("is_group")
        location.href = "gmdetail.html?flag=unpay&goods_id=" + orderdetail.goods_id + "&buy_num=" + orderdetail.buy_num + "&is_group=" + is_group + "&group_order_id=" + GetQueryString("group_order_id") + "&order_id=" + GetQueryString("orderId")
    })

}