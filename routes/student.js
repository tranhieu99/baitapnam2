var express = require("express");
var router = express.Router();
var student_md = require("../modals/student")
router.get("/:id",(req,res)=>{
let malop = req.params.id;
console.log("Ma lop  " + malop);
let data = student_md.renderStudent(malop);
if(data){
    data.then((student)=>{
        var print = {
            student: student
        }
        res.render("../views/dshs.ejs",{data: print});
    })
}
});
router.put("/:id",(req,res)=>{
    var search = req.body.findWords;
    let malop = req.params.id;
    console.log(malop)
    let data = student_md.findStudent(search,malop);
    if(data){
    data.then((student)=>{
        var print = {
            student: student
        }
        res.render("../views/searchhs.ejs",{data:print})
    })
}
});
router.get("/delete/:mahs/:malop",(req,res)=>{
    var mahs = req.params.mahs;
    var malop = req.params.malop;
    console.log(mahs);
    console.log(malop);
    let data = student_md.deleteStudent(mahs);
    if(data){
        data.then((result)=>{
            if(result){
                res.redirect("/student/" + malop);
            }
        })
    }
 })
router.get("/edit/:mahs",(req,res)=>{
    let mahs = req.params.mahs;
    let data = student_md.renderStudentById(mahs);
    data.then((student)=>{    
        if(student){
        let data = {
            print : student
        }   
        res.render("../views/suahs.ejs", {data});
    }
       
    })
})
router.post("/",(req,res)=>{
    let maHs = req.body.maHocSinh;
    let data = student_md.renderStudentById(maHs);
    if(data){
        data.then((result)=>{
            let data = {
                result: result
            }
            res.render("../views/profile.ejs",{data});
        })
    }

})
module.exports = router