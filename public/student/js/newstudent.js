function Student(){
    function bindEvent(){
        $(".themhs").click(function (e) { 
            var params = {
                TenHocSinh: $("input[name='tenhocsinh']").val(),
                GioiTinh: $("input[name='gioitinh']").val(),
                NgaySinh: $("input[name='ngaysinh']").val(),
                DiaChi: $("input[name='diachi']").val(),
                Sdt: $("input[name='sohocsinh']").val(),
                SdtPhuHuynh: $("input[name='sophuhuynh']").val(),
                Malop: $("input[name='malop']").val(),
                GhiChu: $("input[name='ghichu']").val()
            }
            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
            $.ajax({
                type: "POST",
                url: "/newstudent",
                data: params,
                dataType: "json",
                success: function (res) {
                    if(res && res.status_code == 200){
                    alert("Thêm học sinh: " + params.TenHocSinh + " thành công");
                    location.reload();
                    }
                }
            }); 
        });
        $("input[name='timhs']").keyup(function (e) { 
            var findWords = $("input[name='timhs']").val();
            
            var getMaLop = $("input[name='getMalop']").val();
            
            console.log(getMaLop);
            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
            $.ajax({
                type: "PUT",
                url: base_url + "/student/" + getMaLop,
                data: {findWords:findWords},
                dataType: "html",
                success: function (response) {
                    $("tbody.allStudent").replaceWith(response);                     }
            });
        });   
      
    }

    bindEvent();
};
$(document).ready(function () {
    new Student();
    var getMaLop = $("input[name='getMalop']").val();
    $("span.malop").text(getMaLop);
});