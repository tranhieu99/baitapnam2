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
                MaLop: $("input[name='malop']").val(),
                GhiChu: $("input[name='ghichu']").val(),
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
        $(".nghiphepbtn").click(function (e) { 
            var now = new Date();
            var day = now.getDay();
            var date = now.getDate();
            var month = now.getMonth();
            var year = now.getUTCFullYear();
            var dateToPost =  date + "-" + month + "-" + year;
            var thongTinNghiPhep = {
                MaHocSinh: $("input[name='mahsnghi']").val(),
                LyDoNghi: $("input[name='lydo']").val(),
                NgayTao: dateToPost
            }      
            $.ajax({
                type: "POST",
                url: "/nghiphep",
                data: thongTinNghiPhep,
                dataType: "json",
                success: function (res) {
                        if(res && res.status_code == 200){
                            console.log(res);
                            location.reload();
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