function Student(){
    function bindEvent(){
        // $(".themhs").click(function (e) { 
        //     var params = {
        //         TenHocSinh: $("input[name='tenhocsinh']").val(),
        //         GioiTinh: $("input[name='gioitinh']").val(),
        //         NgaySinh: $("input[name='ngaysinh']").val(),
        //         DiaChi: $("input[name='diachi']").val(),
        //         Sdt: $("input[name='sohocsinh']").val(),
        //         SdtPhuHuynh: $("input[name='sophuhuynh']").val(),
        //         Malop: $("input[name='malop']").val(),
        //         GhiChu: $("input[name='ghichu']").val()
        //     }
        //     var base_url = location.protocol + "//" + document.domain + ":" + location.port;
        //     $.ajax({
        //         type: "POST",
        //         url: "/newstudent",
        //         data: params,
        //         dataType: "json",
        //         success: function (res) {
        //             if(res && res.status_code == 200){
        //             alert("Thêm học sinh: " + params.TenHocSinh + " thành công");
        //             location.reload();
        //             }
        //         }
        //     }); 
        // });
        // $("input[name='timhs']").keyup(function (e) { 
        //     var findWords = $("input[name='timhs']").val();
            
        //     var getMaLop = $("input[name='getMalop']").val();
            
        //     console.log(getMaLop);
        //     var base_url = location.protocol + "//" + document.domain + ":" + location.port;
        //     $.ajax({
        //         type: "PUT",
        //         url: base_url + "/student/" + getMaLop,
        //         data: {findWords:findWords},
        //         dataType: "html",
        //         success: function (response) {
        //             $("tbody.allStudent").replaceWith(response);                    
        //          }
        //     });
        // });   
        $(".suahs").click(function () { 
            var base_url = location.protocol + "//" + document.domain + ":" + location.port;

            var dataHs =   {
                MaHocSinh: $("input[name='idhocsinh']").val(),
                TenHocSinh: $("input[name='tenhocsinh']").val(),
                GioiTinh: $("input[name='gioitinh']").val(),
                DiaChi: $("input[name='diachi']").val(),
                Sdt: $("input[name='sohocsinh']").val(),
                SdtPhuHuynh: $("input[name='sophuhuynh']").val(),
                MaLop: $("input[name='malop']").val(),
                GhiChu: $("input[name='ghichu']").val()
            }        
            $.ajax({
                type: "PUT",
                url: base_url + "/sua",
                data: dataHs,
                dataType: "json",
                success: function (response) {
                        if(response.status_code == 200){
                        window.location.href = base_url + "/student/" + dataHs.MaLop;
                        }
                }
            }); 
        });
    }

    bindEvent();
};
$(document).ready(function () {
    new Student();
});