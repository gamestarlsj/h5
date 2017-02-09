/**
 * Created by shijie on 2016/11/23.
 */
var editflag = false;

$(function($) {
    toshow();
    ajax(1009,setaddress);
    ajax(1011,selectArea);
    selectChange();
    saveaddress();

});

//保存地址
function saveaddress(){

    $(".saveaddress").on("click",function(){
        var editdata = {};

        if(editflag){
            editdata.id = $(".touched_id").val();
        }

        editdata.name = $("#panelName").val();
        editdata.mobile = $("#panelMobile").val();
        editdata.province_id = $(".m-addr-province > .m-addr-select").val();
        editdata.city_id = $(".m-addr-city > .m-addr-select").val();
        editdata.district_id = $(".m-addr-district > .m-addr-select").val();
        editdata.address = $("#address").val();

        if(editdata.name == ''){
            toast.showTime("姓名有误，请重填");
            return false;
        }

        if(!(/^1[34578]\d{9}$/.test(editdata.mobile))){
            toast.showTime("电话号码有误，请重填");
            return false;
        }

        console.log(editdata)

        if(editflag){
            ajax(1013,saveCallback,editdata)
        }else{
            ajax(1012,saveCallback,editdata)
        }

    })
}

function addnew(){

    $(".setaddresspanel").find("input").val("");
    $(".m-addr-select").val(0)
    editflag = false;

}

function reload(){
    loading.showTime();
    ajax(1009,setaddress);
}

function saveCallback(data){

    if(data.status == "1"){
        toast.showTime("保存成功");
        reload();
        loading.hideTime();
    }else{
        toast.showTime(data.errorMsg);
    }

}

function toshow(){
    $(".showmore,.addaddress").on("click",function(){
        $(".toshow").show();
    })
    $(".ms-addr-close-icon").on("click",function(){
        $(".toshow").hide();
    })

    $(".addaddress").on("click",function(){
        addnew();
    })

}

//select 关联
function selectChange(){

    $(".m-addr-province > .m-addr-select").change(function(){
        ajax(1011,selectArea,{id:$(this).val(),type:2})
    });

    $(".m-addr-city > .m-addr-select").change(function(){
        ajax(1011,selectArea,{id:$(this).val(),type:3})
    });

}

//填写地址信息
function setaddress(data){
    console.log(data)
    var addressData = data.data;
    var selectHtml = '';
    var addressHtml = ""
    $(addressData).each(function(i,e){
        addressHtml += ' <div id="'+ e.id+'" class="panel mgtop01">'
        +  '     <div class="adddetail flex between">'
        +  '     <div>'
        +  '     <p class="titlefont2 alladdress"><span class="province">'+ e.province + '</span>&nbsp;<span class="city">' + e.city + '</span>&nbsp;<span class="district">' + e.district + '</span>&nbsp;<span class="newaddress">' + e.address+'</span></p>'
        +  '     <p class="describefont"><span class="nickname">'+ e.name + '</span>&nbsp;&nbsp;<span class="mobile">' + e.mobile + '</span></p>'

        +  '<input type="hidden" class="currid" value="'+ e.id +'">'
        +  ' </div>'
        +  ' <div>'
        +  ' <img class="arrow" src="img/arrow.png" alt="">'
        +  '<input type="hidden" class="provice_id" value="'+ e.province_id+'" />'
        +  '<input type="hidden" class="city_id" value="'+ e.city_id+'" />'
        +  '<input type="hidden" class="district_id" value="'+ e.district_id+'" />'
        +  '     </div>'
        +  '     </div>'
        +  '     <hr class="hrline">'
        +  '     <div class="flex between">'
        +  '     <div class="describefont">'
        +  ' <span onclick="setdefault('+ e.id +')" class="isdefault_'+ e.is_default+'">○&nbsp;默认地址</span>'
        +  ' </div>'
        +  ' <div>'
        +  '  <span editId = "'+ e.id +'" class="describefont edit">编辑</span>'
        +  '     <span deleteId="'+ e.id +'" class="describefont delete">删除</span>'
        +  '     </div>'
        +  '     </div>'
        +  '     </div>'

    })
    $(".adbox").empty().append(addressHtml);

    $(".toshow").hide();
    $(".mask").hide();
    $(".loading").hide();
    $(".Dialog").hide();

    $(".edit").on("click",function(){
        var setdata = {};

        editflag = true;

        var addressdetail = $(this).parent().parent().siblings(".adddetail");
        setdata.nickname = addressdetail.find(".nickname").text();
        setdata.mobile = addressdetail.find(".mobile").text();
        setdata.detail = addressdetail.find(".newaddress").text();
        setdata.provice_id = addressdetail.find(".provice_id").val();
        setdata.city_id = addressdetail.find(".city_id").val();
        setdata.district_id = addressdetail.find(".district_id").val();

        $(".touched_id").val(addressdetail.find(".currid").val());

        editaddress(setdata);
    })

    $(".delete").on("click",function(){

        var deleteId = $(this).attr("deleteId");
        console.log(deleteId);

        Dialog.showTime("确认删除此地址吗？")
        Dialog.Dialogconfirm = function(){
            ajax(1014,function(data){
                console.log(data)
                reload();
            },{id:deleteId})
        }
    })

}

//设置默认地址
function setdefault(id){

    var data = {id:id}

    Dialog.showTime("设置此条地址为默认地址？");
    Dialog.Dialogconfirm = function(){
        ajax(1010,function(){
            $(".mask,.Dialog").hide();
            toast.showTime("保存成功");
            reload();
        },data)
    }

}

//编辑地址
function editaddress(setdata){
    $(".toshow").show();
    var setaddressinput = $(".toshow").find("input");
    setaddressinput.eq(0).val(setdata.nickname);
    setaddressinput.eq(1).val(setdata.mobile);
    setaddressinput.eq(2).val(setdata.detail);
    $(".m-addr-province > .m-addr-select").val(setdata.provice_id);

    //获取省份名并选择
    requestArea(setdata.provice_id,setdata.city_id,setdata.district_id, 2 );

}

//select内容服务器请求
function requestArea(provice_id,city_id,district_id,type){
    var data = {};
    if(type ==2){
        data.id = provice_id;
        data.type = type;
    }else if(type == 3){
        data.id = city_id
        data.type = type;
    }
    $.ajax({
        type: 'POST',
        url: commonPath,
        headers:packageHeader(1011),
        data: data,
        dataType: 'json',
        success: function (data) {
            setselect(data,provice_id,city_id,district_id,type);
        },
        error: function(){
            console.log("ajax error")
        }
    });
}

function setselect(data,province_id,city_id,district_id,type){
    var areaData = data.data;
    console.log(areaData);
    var areaHtml = '<option value="0">--</option>';
    if(type == 2){
        var areaHtml = '<option value="0">请选择城市</option>';
    }else if(type == 3){
        var areaHtml = '<option value="0">请选择区域</option>';
    }

    $(areaData).each(function(i,e){
        areaHtml += '<option value="'+ e.id+'">'+ e.name +'</option>';
    })

    if(type == 1){
        $(".m-addr-province > .m-addr-select").empty().append(areaHtml);
        $(".m-addr-province > .m-addr-select").val(province_id);

        requestArea(province_id,city_id,district_id,2);
    }else if(type ==2){
        $(".m-addr-city > .m-addr-select").empty().append(areaHtml);
        $(".m-addr-city > .m-addr-select").val(city_id);

        requestArea(province_id,city_id,district_id,3);
    }else if(type == 3){
        $(".m-addr-district > .m-addr-select").empty().append(areaHtml);
        $(".m-addr-district > .m-addr-select").val(district_id);
    }

}


function selectArea(areadata){
    areadata = areadata.data;
    var areatype = '';
    var areaHtml = '<option value="0">--</option>';
    $(areadata).each(function(i,e){
        areaHtml += '<option value="'+ e.id+'">'+ e.name +'</option>';
        areatype = e.type;
    })
    if(areatype == "1"){
        $(".m-addr-province > .m-addr-select").empty().append(areaHtml);
    }else if(areatype == "2"){
        $(".m-addr-city > .m-addr-select").empty().append(areaHtml);
    }else if(areatype == "3"){
        $(".m-addr-district > .m-addr-select").empty().append(areaHtml);
    }
}

