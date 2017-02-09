/**
 * Created by shijie on 2016/11/22.
 */

var requestlink = "http://m.pinzaihy.com";
var commonPath = "/api";

importJs("js/lib/toast.js");
importJs("js/lib/dialog.js");
importJs("js/lib/loading.js")
importTj();

$(document).ready(function(){
    var wxpath = '/api';
    var wxdata = {'code':getQuery('code')};
    $.ajax({
        type: 'POST',
        url: commonPath,
        headers: packageHeader(1002),
        data: wxdata,
        dataType: 'json',
        async:false,
        success: function (data) {
            console.log(data)
            if (data.status != 1) {
                routerController(data, 1002);
            }

        },
        error: function () {
            console.log("ajax error")
        }
    });
});

function importJs(ScriptPath){
    var script = document.createElement("script")
    script.type = "text/javascript";
    script.src = ScriptPath;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function importTj() {
//    $.getScript('[js containing the initialize function]', function () {
//        $.getScript('https://s95.cnzz.com/z_stat.php?id=1261109173&web_id=1261109173');
//    });
}

function routerController(data){

    console.log(data)

    var wxlink = "https://open.weixin.qq.com/connect/oauth2/authorize?";
//    var delink = encodeURI(window.location.href)
//    var redirectotArr = ["appid","redirect_uri","response_type","scope"];
//    var redirectotValue = ["wxadafe550b1325041",delink,"code","snsapi_userinfo"]
//    $(redirectotArr).each(function(index,ele){
//        wxlink += ele + "=" + redirectotValue[index] + "&";
//    })
    wxlink += "appid=wxadafe550b1325041&redirect_uri=" + encodeURI(location.href.split('code')[0]) + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    window.location.href = wxlink;
}

function getQuery(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    return r != null ? unescape(r[2]) : null;
}

//获取url中参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}

//单位换算
function convert(value){
    return parseFloat(value)/100;
}

//请求公共方法
function ajax(command,callback,data){
    $.ajax({
        type: 'POST',
        url: commonPath,
        headers:packageHeader(command),
        data: data,
        dataType: 'json',
        success: function (data) {
            console.log(data)

            if(command == 1002){
                if(data.status != 1){
                    callback(data,command);
                }
            }else{
                callback(data,command);
            }

        },
        error: function(){
            console.log("ajax error")
        }
    });
}

//头部分装
function packageHeader(command){
    var HeaderObj = {};
    HeaderObj.Command = command;
    return HeaderObj;
}

//自适应布局
function rootREM() {
    var W = document.documentElement.clientWidth;
    //W = (W <= 640) ? W : 640;
    document.documentElement.style.fontSize = W / 10 + 'px';
    document.body.style.fontSize = W / 20 + 'px';
}

window.onresize = function () {
    rootREM();
};

$(".touchchange").on("touchstart",function(){
    $(this).css("background-color" ,"#d9d9d9")
})

$(".touchchange").on("touchend",function(){
    $(this).css("background-color" ,"")
})

$("#return").on("click",function(){
    window.history.go(-1);
})