/**
 * Created by shijie on 2016/12/5.
 */
$(document).ready(function () {

  var data= {};
  data.type = "4"
  ajax(1006,appendGoods,data);
  page = 1;
  checkbottom();

})

function checkbottom(){
  $(window).scroll(function(){
    totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
    if(($(document).height()) <= totalheight) {
      showmore()
    }
  });
}

function showmore(){
  var data = {};
  data.page = page;
  data.type = "4"
  ajax(1006,appendGoods,data);
  $(".nomore").show();
  $(".showmore").show();
}

function appendGoods(data){
  var goodsData = data.data;
  var goodHtml = '';
  $(goodsData).each(function(index,ele){
    goodHtml += '<div class="items" style="margin: 0">'
      + '<img src="'+ ele.img +'" alt="" class="itemspic">'
      + '<p class="titlefont2 mg02">'+ele.name+'</p>'
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

  $(".xianshibox").append(goodHtml);
  page++;
}
