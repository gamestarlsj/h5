/**
 * Created by shijie on 2016/12/10.
 */
$(function(){

    $(".sbtn").on("click",function(){
        var kw = $(".sinput").val();
        if(kw == ""){
            toast.showTime("关键词不能为空")
            return false;
        }else{
            ajax(1023,search,{kw:kw})
        }
    })

    ajax(1022,function(data){
        var keyData = data.data;
        var keyHtml = ''
        $(keyData).each(function(i,e){
            keyHtml += '<div class="searchkey touchchange">'+ e.tag +'</div>'
        })
        $(".searchkeybox").empty().append(keyHtml);

        $(".searchkey").on("click",function(){
            var kw = $(this).text();
            ajax(1023,search,{kw:kw})
        })

    })

})

function search(data){
    console.log(data)
    var dataurl = JSON.stringify(data);

    window.location.href = "searchresult.html?obj="+ dataurl;

}