/**
 * Created by shijie on 2016/12/10.
 */
$(function(){
    var dataurl = GetQueryString("obj");
    var data = JSON.parse(decodeURI(dataurl));
    renderResult(data);
})

function renderResult(data){

    console.log(data)
    var searchData = data.data;
    var searchHtml = '';



    $(searchData).each(function(i,e){
        searchHtml += '\n'
        +    '<div class="items">'
        +    '<img src="'+ e.img +'" alt="" class="itemspic">'
        +    '<p class="titlefont2 mg02">'+ e.name +'</p>'
        +    '<p class="flex between">'
        +    '<span class="flex">'
        +    '<span><img class="tuangoupic" src="img/tuangou.png" alt=""></span>'
        +    '<span style="margin-left: -0.1rem" class="describefont mg01 grey">'+ e.customer_num +'人团</span>'
        +    '<span style="font-size: 0.5rem" class="describefont mg01 titlefont2 mg01 orange">￥'+ convert(e.group_price) +'</span>'
        +    '<span style="text-decoration:line-through" class="describefont mg01 grey">单买价￥'+ convert(e.price) +'</span>'
        +    '</span>'
        +    '<a href="detail.html?id='+ e.id +'">'
        +    '<span class="orangeButton_big tuangoumes mg01">立即参团</span>'
        +    '</a>'
        +    '</p>'
        +    '</div>'
    })
    $(".goods").empty().append(searchHtml);

}