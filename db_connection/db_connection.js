const mysql = require('mysql');

var conn=mysql.createPool({  
  connectionLimit:10, 
     //createConnection createPool
    host: "localhost",
    user: "root",
  password: "",
  database:'signup_db'
 
});

  
conn.getConnection(function(err,conn2){
   if(!err){
     console.log("Connected")
    //module.exports = conn;
    }else{
     console.log(err)
   }
 })
 
 //console.log(connection)
//console.log(conn)
module.exports = conn;
