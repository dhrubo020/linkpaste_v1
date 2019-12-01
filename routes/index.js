
exports.first = function (req, res) {

    if (req.session.userID != null) {
        var set = new Set();

        var key = req.session.userID;
        console.log("first " + key);

        var sql = "SELECT * FROM `message` Where `ToUserId` = '" + key + "' or `FromUserId` = '" + key + "' ";

        db.query(sql, function (err, results_login) {
            if (err) {
                res.render('login.ejs', { message: "Login Error" });
            } else {
                var userList = [];
                
                for (var i = 0; i < results_login.length; i++) {
                    var from = results_login[i].FromUserId;
                    var to = results_login[i].ToUserId;
                    set.add(from);
                    set.add(to);
                }
                set.delete(key);
                
                for (let value of set) {
                    userList.push(value);
                }
                var sql = "SELECT Id,PublicKey FROM `userlist` Where `Id` IN (?) ";

                db.query(sql, [userList],  function (err, list) {
                    if (err) {
                        console.log("Error in finding name");
                    } else {
                        console.log(list);
                        res.render('home2.ejs', { data: list });
                    }
                });
            }
        });
    } else {
        res.render('login.ejs', { message: "You must login first" });
    }
};