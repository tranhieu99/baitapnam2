const mysql = require("mysql");
var config = require('config');
var connection = mysql.createConnection({
  host     : config.get("mysql.host"),
  user     : config.get("mysql.user"),
  password : config.get("mysql.password"),
  database : config.get("mysql.database")
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

const insertReason = (param) =>{
    return new Promise((resolve,reject)=>{
        connection.query("INSERT INTO nghiphep SET ? ", param, (err,result)=>{
            if(err){
                reject(err);
            }
            else resolve(result);
        })
    })
}
const renderReason = () =>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM hocsinh INNER JOIN nghiphep ON hocsinh.MaHocSinh = nghiphep.mahocsinh",(err,result)=>{
            if(err){
                reject(err);
            }
            else resolve(result);
        })
    })
}
module.exports = {
    insertReason : insertReason,
    renderReason: renderReason
}