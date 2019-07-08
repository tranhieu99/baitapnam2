var express = require('express');
var router = express.Router();
const class_md = require("../modals/class");
const student_md = require("../modals/student");
const authMiddleware = require("../middlewares/auth.middleware");
/* GET home page. */
router.get('/', authMiddleware.requireAuth ,function(req, res, next) {
  var data = class_md.getTotalStudent();
  data.then((total) =>{
    console.log(total[0].countStudent);
    res.render('index', { data: {"total": total[0].countStudent }});
  })
});
router.use("/users", require("./users.js") );
router.use("/login", require("./login.rout"));
router.use("/class", require("./classes"));
router.use("/newstudent", require("./newstudent") );
router.use("/student",require("./student"));
router.use("/nghiphep", require("./nghiphep"));
router.use("/profile",require("./profile"))
router.get("/newclass",  authMiddleware.requireAuth ,(req,res)=>{
  res.render("../views/class/themlop.ejs")
});
router.get("/editclass/:id",  authMiddleware.requireAuth ,(req,res)=>{
  var index = req.params.id;
  console.log(index);
  const data =class_md.renderClassesById(index);
  data.then((classes)=>{
      if(classes){
          let data = {
              print : classes
          }
          res.render("../views/class/sualop.ejs", {data})
      }
  }).catch((err)=>{
      res.render("../views/class/sualop.ejs", {"data" : {"err" : "Cant get class"}})
  })

})
router.put("/sua",(req,res)=>{
  let param = req.body;
  let data = student_md.editStudent(param);
  data.then((result)=>{
    if(result){
      res.json({status_code:200});
    }
  })
})
module.exports = router;
