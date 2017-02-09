var Dialog = {
    drawElement:function(){
        var Dialog = document.createElement("div");
        Dialog.style.background = "#fff";
        Dialog.className = "Dialog";
        Dialog.innerHTML = "<div id='dialogmes'>对话内容</div><div class='flex'><div onclick='Dialog.Dialogcancel()' class='touchchange' id='cancel'>取消</div><div onclick='Dialog.Dialogconfirm()' class='touchchange' id='confirm'>确认</div></div>";
        var mask = document.createElement("div");
        mask.className = "mask"

        document.body.appendChild(Dialog);
        document.body.appendChild(mask);
    },
    init:function() {
        return this.drawElement();
    },
    showTime:function(parameter){
        var Dialog = document.querySelector(".Dialog");
        var mask = document.querySelector(".mask");
        var dialogmes = document.querySelector("#dialogmes");
        dialogmes.innerText = parameter;
        Dialog.style.display = "block";
        Dialog.style.position = "fixed";
        mask.style.display = "block"
    },
    Dialogcancel: function(callback){
        var Dialog = document.querySelector(".Dialog");
        var mask = document.querySelector(".mask");
        Dialog.style.display = "none";
        mask.style.display = "none"
    },
    Dialogconfirm: function(callback){
        console.log("confirm")
    }

};

Dialog.init();