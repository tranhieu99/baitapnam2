const mysql = require("mysql");
const db = require("../common/db");
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

const compareUserName = (username) =>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM admin WHERE username = ? ", [username],(err,results)=>{
            if(err){
                reject(err);
            }
            else {
                resolve(results);
            }
        })
    })
    return false;    
}
module.exports = {
    compareUserName : compareUserName
}