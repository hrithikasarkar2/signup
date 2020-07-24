var express       = require('express');
var bodyParser    = require('body-parser');
const mysql_conn   =  require('./db_connection/db_connection');
const bcrypt		=require('bcrypt');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
app.use("/public", express.static('public')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//console.log('log file ')
app.get('/',function(req,resp){

	resp.render('index')


});
//RUN INSERT NEW FIELD PAS
app.post('/',function(req,resp){

    var pno =req.body.PNo
    var eno =req.body.ENo
    var email =req.body.email
    var name =req.body.Name
    var contact =req.body.mobile
    var dept =req.body.dept
    var password1=bcrypt.hashSync(req.body.password,10);
    console.log(pno+eno+email+name+contact+dept)
	console.log(req.body)
	var insert_data ={
		USER_ID:pno,
		EMP_ID:eno,
		EMAIL_ID:email,
		NAME:name,
		MOBILE_NO:contact,
		DEPARTMENT:dept,
		PASSWORD:password1
	
}
	var query = "insert into signup_table set ?"
	mysql_conn.query(query,insert_data,function(err){
		if(!err){
			console.log('data inserted')
		}else{
             console.log(err);
		}
	})
	resp.render('success',{title:'Home Page',status:'Successfully registered'})

   
})

// now you check this password by decreption method ok sir

// bcrypt.compareSync(password,getPassword)  this is code for decription
//sir i will check this from the login page ?yes ok sir


// wait i will show you how it work connect to my
app.get('/getdata',function(req,resp){

	var query = "SELECT * FROM signup_table WHERE 1";
	mysql_conn.query(query,function(err,data){
		if(!err){
			console.log(data);
			resp.render('display_data',{title:'Home Page',status:'Successfully registered',data:data})


		}else{
			console.log(err)
		}
	})
})
app.listen('98',()=>console.log('Server running at port 98'));