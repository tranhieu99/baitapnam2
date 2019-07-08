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

const renderClasses = () =>{
  return new Promise((resolve, reject)=>{
        connection.query("SELECT * FROM classes",(err,result)=>{
            if(err) {
                reject(err);
            }
            else resolve(result);
        })
    });
}
const renderClassesById = (id) =>{
    return new Promise((resolve, reject)=>{
          connection.query("SELECT * FROM classes WHERE malop = ?",id,(err,result)=>{
              if(err) {
                  reject(err);
              }
              else resolve(result);
          })
      });
  }
const getClass = (lop) =>{
    return new Promise((resolve,reject)=>{
        connection.query("INSERT INTO classes SET ?", lop, (err,result)=>{
            if(err) {
                reject(err);
            }
            else resolve(result);
        });
    });
}
const deleteClass = (malop) =>{
    return new Promise((resolve,reject)=>{
        connection.query("DELETE FROM classes WHERE ?", malop,(err,result)=>{
            if(err){
                reject(err);
            }
            else resolve(result);
        })
    })
}
const editClass = (param) =>{
    return new Promise((resolve,reject)=>{
        connection.query("UPDATE classes SET TenLop = ?, LichHoc = ? WHERE malop = ?", [param.TenLop, param.LichHoc,param.malop],(err,result)=>{
            if(err) {
                reject(err);
            }
            else resolve(result);
        });
    })
}
const getTotalStudent = () =>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT COUNT (*) AS countStudent from hocsinh",(err,result)=>{
            if(err) {
                reject(err);
            }
            else resolve(result);
        });
    })
}
module.exports = {
    renderClasses : renderClasses,
    getClass :getClass,
    deleteClass: deleteClass,
    editClass: editClass,
    renderClassesById:renderClassesById,
    getTotalStudent:getTotalStudent
}