var connection=require('./connection');
var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var lib=require('./login');
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
/////////////////
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/login.html'));
});
app.post('/auth',function(req,res){
    var user=req.body.username;
    var pass=req.body.password;
    if(user&&pass){
    	var sql="SELECT * FROM user where Email= ? AND Password= ?";
         connection.query(sql,[user,pass],function(err,result){
           if(result.length>0){
           	res.redirect('/home.html');
           }
           else{
           	res.redirect('/regis.html');
           }
         });
    }
    else{
    	res.redirect('/');
    }
});
app.post('/register',function(req,res){
      var user1=req.body.username;
      var pass1=req.body.password;
      if(user1&&pass1){
      	var sql="INSERT INTO user (Email,Password) VALUES ?";
      	var value=[[user1,pass1]];
      	connection.query(sql,[value],function(err,result){
            if(err)console.log(err);
            res.redirect('/home.html');
      	});
      }
      else{
      	res.redirect('/register');
      }
});
/////////////////////
app.listen(8000);