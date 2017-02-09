/**
 * Created by shijie on 2016/12/1.
 */
var toast = {
    text : "无内容",
    drawElement:function(){
        var toast = document.createElement("div");
        toast.style.background = "#000";
        toast.className = "toast";
        toast.innerHTML = "<span style='color: white'>" + this.text +"</span>";
        document.body.appendChild(toast);
    },
    init:function() {
        return this.drawElement();
    },
    showTime:function(parameter){
        var toast = document.querySelector(".toast");
        toast.style.display = "flex";
        toast.style.position = "fixed";
        toast.childNodes[0].innerText = parameter;
        setTimeout(function(){
            toast.style.display = "none";
        },2000)
    }
};

toast.init();