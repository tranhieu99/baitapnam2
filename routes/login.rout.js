var express = require('express');
var router = express.Router();
var login_md = require("../modals/login")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("../views/login.ejs", {data: ""});
});
router.post("/", (req,res)=>{
    var password = req.body.password;
    var username  = req.body.username;
    
    var data = login_md.compareUserName(username);
    if(data){
    data.then((user)=>{
        var user = user[0];
     
        if(user.password && user.password == password){
            res.cookie('userId', user.username)
            res.redirect("/")
        }
        else  res.render("../views/login.ejs", {data: {error:"Bạn đã nhập sai password"}})


    }).catch((err)=>{
        res.render("../views/login.ejs", {data: {error:"Bạn đã nhập sai username"}})
    })
}
});
module.exports = router;
