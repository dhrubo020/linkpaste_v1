/**
* Module dependencies.
*/
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , login = require('./routes/login')
  , signup = require('./routes/signup')
  , http = require('http')
  , path = require('path');


var session = require('express-session');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'link2'
            });
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 2020);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//-----use--------
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 3600000*24*90 }
            }));

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  next();
});

app.get('/',routes.first);

app.post('/Trylogin', login.call_login);

app.get('/signup', signup.signup_page);

app.post('/signup:q', signup.validation);

app.get('/loadmsg' ,  user.call_loadmsg);
app.post('/sendmsg', user.call_sendmsg);

app.listen(2020);