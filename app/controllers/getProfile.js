// app/controllers/getUser.js

var User = require('../models/user');
var userArray = "";

exports.output = function(req, res, callback){
  User.findOne({'email' : req.user.email}, function(err, user) {
    if(err){
      console.log("no user");
      res.send(err);
    }
    else{
      if(user){
      console.log("Found user");
      callback(user);
    }}
  });
}
