var express = require("express");
var router = express.Router();
var student_md = require("../modals/student")
var authMiddleware = require("../middlewares/auth.middleware")
router.get("/", authMiddleware.requireAuth, (req,res)=>{
    res.render("../views/nhaphs.ejs");
})
router.post("/", (req,res)=>{
    var param = req.body;
    var data = student_md.addNewStudent(param);
    if(!data){
        res.json({status_code:500});
    }
    else{
        data.then((result)=>{
            res.json({status_code:200});
        }).catch((err)=>{
            res.json({status_code:500});
        })
    }
})
module.exports = router