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

const addNewStudent = (param) =>{
    return new Promise((resolve,reject)=>{
        connection.query("INSERT INTO hocsinh SET ?",param,(err,result)=>{
            if(err){
                reject(err);
            }
            else resolve(result);
        });
    });
};
const insertAvatar = (param) =>{
    return new Promise((resolve,reject)=>{
        connection.query("UPDATE hocsinh SET Avatar = ? WHERE MaHocSinh = ?",[param.Avatar,param.MaHocSinh],(err,result)=>{
            if(err) {
                reject(err)
            }
            else resolve(result)
        })
    })
}
const renderStudent = (param) => {
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM hocsinh WHERE MaLop = ?", [param],(err,result)=>{
            if(err){
                reject(err);
            }
            else resolve(result);
        })
    })
} 
const findStudent = (search,id) =>{
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT * FROM hocsinh WHERE lower(TenHocSinh) LIKE lower('%${search}%') AND MaLop = ${id}`,(err,result)=>{
            if(err) {
                reject(err);
            }
            else resolve(result);
        })
    })
    
}
const deleteStudent = (id) =>{
    return new Promise((resolve,reject)=>{
        connection.query(`DELETE FROM hocsinh WHERE MaHocSinh = ${id}`,(err,result)=>{
            if(err){
                reject(err)
            }
            else resolve(result)
        });
    });
}
const getMaLop = (id) =>{
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT MaLop FROM hocsinh WHERE MaHocSinh = ${id}`,(err,result)=>{
            if(err){
                reject(err);
            }
            else resolve(result);
        })
    })
}
const renderStudentById = (param) => {
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM hocsinh WHERE MaHocSinh = ?", [param],(err,result)=>{
            if(err){
                reject(err);
            }
            else resolve(result);
        })
    })
} 
const editStudent = (param) =>{
    return new Promise((resolve,reject)=>{
        connection.query("UPDATE hocsinh SET TenHocSinh = ?, GioiTinh = ?, DiaChi = ?, Sdt = ? , SdtPhuHuynh = ?, MaLop = ?, GhiChu = ?  WHERE MaHocSinh = ? ",[param.TenHocSinh, param.GioiTinh, param.DiaChi, param.Sdt, param.SdtPhuHuynh,param.MaLop,param.GhiChu,param.MaHocSinh],(err,result)=>{
            if(err) {
                reject(err);
            }
            else resolve(result);
        })
    })
}
module.exports = {
    addNewStudent: addNewStudent,
    renderStudent: renderStudent,
    findStudent: findStudent,
    deleteStudent: deleteStudent,
    getMaLop: getMaLop,
    renderStudentById:renderStudentById,
    editStudent: editStudent,
    insertAvatar: insertAvatar
}