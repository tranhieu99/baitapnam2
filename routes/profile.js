const express = require("express");
const router = express.Router();
const multer = require("multer")
const student_md = require("../modals/student")
var upload = multer({ dest: 'public/student/uploads/' })

router.post("/", upload.single('avatar'),(req,res)=>{
    console.log(req.body.mahs)
    console.log(req.file.path.split("/").slice(2).join("/") )
    var params = {
        MaHocSinh: req.body.mahs,
        Avatar:  req.file.path.split("/").slice(2).join("/") 
    }
    console.log(params)
    var data = student_md.insertAvatar(params);
    data.then((result)=>{
        if(result){
            res.redirect("/class");
        }
    })
})

module.exports = router;