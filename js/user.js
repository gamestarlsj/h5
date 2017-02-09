/**
 * Created by shijie on 2016/12/5.
 */

ajax(1003,afterGet);

function afterGet(data){
    console.log(data.data);
    var userData = data.data;
    var order_count = userData.order_count;
    var orderArr = [];
    $("#avatar").attr("src",userData.avatar);
    $("#nickname").text(userData.nickname);

    for(var k in order_count) {
        //遍历对象，k即为key，obj[k]为当前k对应的值
        console.log(order_count[k]);
        console.log(k);
        if(order_count[k] != "0"){
            $("." + k).text(order_count[k]);
            $("." + k).show();
        }else{
            $("." + k).hide();
        }
    }
    $(".unpaid").text(order_count.unpaid);
    $(".grouping").text(order_count.grouping);
    $(".unreceived").text(order_count.unreceived);
    $(".unused").text(order_count.unused);
}
