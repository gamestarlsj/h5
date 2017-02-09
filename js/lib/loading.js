var loading = {
    drawElement:function(){
        var loading = document.createElement("div");
        loading.style.background = "#000";
        loading.className = "loading";
        loading.innerHTML = "<img style='width:1.5rem' src='img/showmore.gif' />";
        document.body.appendChild(loading);
    },
    init:function() {
        return this.drawElement();
    },
    showTime:function(parameter){
        var loading = document.querySelector(".loading");
        loading.style.position = "fixed";
        loading.style.display = "flex";
    },
    hideTime:function(){
        var loading = document.querySelector(".loading");
        loading.style.display = "none";
    }

};

loading.init();