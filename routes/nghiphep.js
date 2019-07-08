const express = require("express");
const router = express.Router();
const nghiphep_md = require("../modals/nghiphep")
const authMiddleware = require("../middlewares/auth.middleware")
router.get("/",authMiddleware.requireAuth,(req,res)=>{
    let data = nghiphep_md.renderReason()
    data.then((result)=>{
        let data = {
            result: result
        }
        res.render("../views/nghiphep.ejs",{data})
    })
})
router.post("/",(req,res)=>{
    let param = req.body;
    let data = {
        MaHocSinh: param.MaHocSinh,
        LyDoNghi: param.LyDoNghi,
        NgayTao: param.NgayTao
    }
    let promise = nghiphep_md.insertReason(data);
    if(!promise){
        res.json({status_code:500})
    }
    else{
    promise.then((result)=>{
        if(result){
        res.json({status_code:200});
        }
    })
}
})
module.exports = router;