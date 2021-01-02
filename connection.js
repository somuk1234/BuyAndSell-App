var mysql=require('mysql');
var conect=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9*******@',
    database: 'mydb'
});
conect.connect(function(err,res){
   if(err)console.log(err);
   console.log('Connected!');
});
module.exports=conect;
