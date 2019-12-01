
exports.call_sendmsg = function(req,res){
    var message="call_sendmsg";
    console.log(message);
    
    var to, from, text;
    if(req.session.userID!=null){
        var data = req.body; from = data.User_id; to = req.body.Frnd_id; text = req.body.Text;
        console.log(from+" "+to+" "+text);

        if(req.method == "POST"){
            console.log(from+" "+to+" "+text);
            var bdTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Dhaka"});
            var date = new Date(bdTime);
            console.log('BD time: '+date.toLocaleString())
      
            var sql = "INSERT INTO `message` (`Text`,`FromUserId`,`ToUserId`,`DateTime`) VALUES ('" + text + "','" + from + "','" + to + "', '" + date.toLocaleString()+ "')";
            var query = db.query(sql, function(err, result) {
                if(err){
                    message = "Something went wrong!!";
                    res.render('home2.ejs',{message: message});
                }else{
                    console.log("send success");
                    message = "Succesfully! Your account has been created. Now you can login.";
                   // res.redirect('/loadmsg');
                   res.json({MSG:text});
                }
            });
            
        }
         else{
            
         }
    }
};

exports.call_loadmsg = function(req, res){
    var message = "call_loadmsg";
   console.log(message);
    var chat_name;
    var from;
    var my;

    if(req.session.userID != null){

        var id = req.query.id;
        
       var userid = req.session.userID;
       console.log(id+" "+userid);

       var sql1 = " SELECT PublicKey from userlist where Id='"+id+"' ";
       db.query(sql1, function(err, results){     
        if(err){
            throw err;
        }
        else{
           console.log(results[0].PublicKey);
            chat_name = results[0].PublicKey;
            //res.json(chat_name);
        }
     });
     
       // var sql =" SELECT message.Text FROM `message` INNER JOIN `userlist` on  (message.FromUserId='"+userid+"' or message.ToUserId='"+userid+"') and (message.FromUserId='"+id+"' or message.ToUserId='"+id+"') and userlist.Id='"+id+"' ";
       
       var sql =" SELECT FromUserId,message.Text FROM `message` where (message.FromUserId='"+id+"' and message.ToUserId='"+userid+"') or (message.FromUserId='"+userid+"' and message.ToUserId='"+id+"') ";

       db.query(sql, function(err, results){     
          if(err){
              throw err;
          }
          else{
             from=results;

             console.log(from);
             res.json({name:chat_name, From:from, ssUser: userid});
          }
       });

    }
    else {
        message = 'Wrong Key';
        res.render('login.ejs',{message: message});
       }
 };


//  app.get('/loadmsg', function(req, res){

//     var val = req.query.contact_id;
//     console.log(val);
   
//    });