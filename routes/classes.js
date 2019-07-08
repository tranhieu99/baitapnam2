const express = require("express");
const router = express.Router();
const class_md = require("../modals/class");
const authMiddleware = require('../middlewares/auth.middleware')
router.get("/", authMiddleware.requireAuth ,(req,res)=>{
    const data =class_md.renderClasses();
    data.then((classes)=>{
        if(classes){
            let data = {
                print : classes
            }
            res.render("../views/dslop.ejs", {"data" : data})
        }
    }).catch((err)=>{
        res.render("../views/dslop.ejs", {"data" : {"err" : "Cant get class"}})
    })
})
router.put("/edit",(req,res)=>{
    var param = req.body;
    console.log(param.malop);
    var data = class_md.editClass(param);
   if(!data){
       res.json({status_code:500});
   }
   else{
       data.then((result)=>{
           res.json({status_code:200});
       }).catch((err)=>{
           res.json({status_code:500})
       })
   }
  })
router.post("/",(req,res)=>{
    const formData = req.body;
    const now = new Date();
    const lop = {
        malop: formData.malop,
        TenLop: formData.tenlop,
        LichHoc: formData.lichhoc,
        NgayTao: now
    }
    const data = class_md.getClass(lop);
    if(data){
        data.then((result)=>{
            if(result){
                res.redirect("class");
            }
            else  res.render("../views/dslop.ejs", {"data" : {"err" : "Cant get class"}});
        }).catch((err)=>{
            res.render("../views/dslop.ejs", {"data" : {"err" : "Cant get class"}});
        })
    }
});
router.get("/delete/:malop", (req,res)=>{
    const maLop = req.params;
    const data = class_md.deleteClass( maLop);
    data.then((result)=>{
        if(result) {
            res.redirect("/class")
        }
    })
})

module.exports = router;