$(document).ready(function () {

    var pwArray = [];

    $('input').bind('input propertychange', function(e) {
        //进行相关操作
        if(this.value != "" && this.value != undefined){
            pwArray = this.value.split('');
        }else{
            pwArray = [];
        }

        console.log(pwArray)

        var currlength = pwArray.length;

        if(currlength){
            $(".pwDiv").eq(currlength - 1).text("●")
            $(".pwDiv").eq(currlength).text("")
        }else{
            $(".pwDiv").eq(currlength).text("")
        }


    });


})
