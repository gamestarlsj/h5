$(document).ready(function () {

    ajax(1019,getmyfav)

})
var firstflag = true;
function getmyfav(data){

    console.log(data)
    var favdata = data.data;
    var favHtml = '';
    $(favdata).each(function(i,e){
        favHtml += '\n'
        +    '<div class="card mgtop">'
        +    '<div class="flex between">'
        +    '<div class="flex">'
        +    '<img class="middleimg" src="'+ e.img +'" alt="">'
        +    '<div>'
        +    '<p class="titlefont2" style="margin-top: 0">' + e.mall_name+ '</p>'
        +    '<p class="describefont grey wordtodot" style="">' + e.name + '</p>'
        +    '</div>'
        +    '</div>'
        +    '</div>'
        +    '<hr class="hrline">'
        +    '<div class="flex" style="justify-content: flex-end">'
        +    '<p cancelid="'+ e.goods_id +'" class="titlefont orangeButton cancelfav" style="margin: 0.1rem;background: white;border-color: grey;color: grey">取消收藏</p>'
        +    '<a href="detail.html?id='+ e.goods_id +'">'
        +    '<p class="titlefont orangeButton" style="margin: 0.1rem">一键开团</p>'
        +    '</a>'
        +    '</div>'
        +    '</div>'
    })
    if(firstflag){
        $(".favbox").append(favHtml);
    }else{
        $(".favbox").empty().append(favHtml);
    }
    $(".cancelfav").on("click",function(){

        var favid = $(this).attr("cancelid");
        Dialog.showTime("确定要取消收藏吗？")
        Dialog.Dialogconfirm = function(){
            ajax(1016,function(data){
                if(data.status = "1"){
                    toast.showTime("已取消收藏");
                    firstflag = false;
                    favid = $(this).attr("cancelid");
                    ajax(1019,getmyfav,{id:favid});
                    Dialog.Dialogcancel();
                }else{
                    toast.showTime("取消收藏失败，请稍后再试")
                }
            },{id:favid})
        }

    })

}