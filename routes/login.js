
exports.call_login = function(req, res){
    var message = "'call login'";
   console.log(message);

    if(req.method == "POST"){

       var user = req.body.privateKey;
       
       var sql="SELECT * FROM `userlist` WHERE PrivateKey ='"+user+"' "; 

       db.query(sql, function(err, results_login){     
          if(results_login.length>0){
             //console.log(results_login[0].Id);
             req.session.userID = results_login[0].Id;
             res.redirect("/");
          }else{
             message = 'Wrong Key';
             res.render('login.ejs',{message: message});
          }  
       });
    }
    else {
        message = 'Wrong Key';
        res.render('login.ejs',{message: message});
       }
 };