//server.js

//modules
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var morgan         = require('morgan');
var path           = require ('path');
var session        = require('express-session'); //needed for passport later
var cookieParser   = require('cookie-parser'); //needed for passport later
var mongoose       = require('mongoose');
var passport       = require('passport');
var flash          = require('connect-flash');
var port           = 80;

//set ejs as view engine
app.set('view engine', 'ejs');

//configure passport
require('./config/passport')(passport);

//log requests
app.use(morgan("combined"));

//parse requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport
app.use(session({ secret: 'root', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());//(cookieParser and flash may be needed)
app.use(flash());

//access public directory
app.use(express.static(__dirname + '/public'));

//routes
require('./app/routes')(app, passport);

//listen
app.listen(port);
console.log('Listening on port: ' + port);

module.exports = app;
