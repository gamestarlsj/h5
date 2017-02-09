
$(document).ready(function() {

    $("#reason").on("click",function () {

        Dialog.showTime("您有100元的租赁期未满，下个月可申请退租返现");
        Dialog.Dialogconfirm = function(){
            Dialog.Dialogcancel();
        }

    })



})
