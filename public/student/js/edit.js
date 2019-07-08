function edit() {
    function bindEvent(){
        $(".editButton").click(function (e) { 
            var param = {
                malop: $("input[name='suamalop']").val(),
                TenLop: $("input[name='suatenlop']").val(),
                LichHoc: $("input[name='sualichhoc']").val()
            }
            var baseUrl = location.protocol + "//" + document.domain + ":" + location.port;
            $.ajax({
                type: "PUT",
                url: baseUrl + "/class/edit",
                data: param,
                dataType: "json",
                success: function (res) {
                    if(res && res.status_code == 200){
                        location.reload();
                    }
                }
            });
        });

    }
    bindEvent();
}
$(document).ready(function () {
    new edit();
    
});