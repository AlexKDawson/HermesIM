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
var port           = 80;

var dbconf         = require('./config/messagedb');

//connect to db
mongoose.connect(dbconf.url);

//set ejs as view engine
app.set('view engine', 'ejs');

//log requests
app.use(morgan("combined"));

//parse requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//acess public directory
app.use(express.static(__dirname + '/public'));

//routes
require('./app/routes')(app);

//listen
app.listen(port);
console.log('Listening on port: ' + port);

module.exports = app;
