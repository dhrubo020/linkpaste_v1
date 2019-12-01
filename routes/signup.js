exports.signup_page = function(re,res){
    res.render('signup.ejs');
}
exports.validation = function(req,res){
    var email = req.params.q;
    console.log(email);
    var sql = "SELECT Email FROM `userlist` WHERE `Email`= '"+email+"' ";
    db.query(sql, function(err, results) {
        if(results.length>0){
            res.send("Email alread exist");
        }
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
    })
}