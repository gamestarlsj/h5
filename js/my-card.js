$(function(){

    ajax(1021,getmycard)

})

function getmycard(data){

    console.log(data)

    var cardData = data.data;
    var html = '';

    $(cardData).each(function(i,e){

        html += '\n'
        +    '<a href="odetail-card-paid.html?orderId='+ e.id +'">'
        +    '<div class="card mgtop touchchange">'
        +    '<div class="flex between">'
        +    '<div class="flex">'
        +    '<img class="middleimg" src="'+ e.goods.img +'" alt="">'
        +    '<div>'
        +    '<p class="titlefont2" style="margin-top: 0">'+ e.goods.name +'</p>'
        +    '<p class="describefont grey" style="">总价：￥'+ convert(e.amount) +'</p>'
        +    '</div>'
        +    '</div>'
        +    '<img src="img/arrow.png" class="arrow" alt="">'
        +    '</div>'
        +    '<hr class="hrline">'
        +    '<div style="text-align: center">'
        +    '<div class="QRCode" code='+ e.coupon_sn+' alt=""></div>'
        +    '<p class="titlefont2">密码:<span class="orange">'+ e.coupon_sn +'</span></p>'
        +    '</div>'
        +    '</div>'
        +    '</a>'

    })

    $(".cardbox").append(html)

    $('.QRCode').each(function(i,e){
        $(this).qrcode({
            width:150,
            height:150,
            text: $(e).attr("code")
        });
    })

}