// app/controllers/getUser.js

var User = require('../models/user');
var userArray = "";

exports.output = function(req, res){
  var i = 1;
  var userArray = [];

  while(true){
    if(JSON.stringify(req.body["freqs[]"][i]) != undefined){
      i++;
    }
    else{
      break;
    }
  }

  for(var j = 0; j < i; j++){
    User.findOne({ 'email' :  req.body["freqs[]"][j] }, function(err, user) {
      userArray.push(JSON.parse(JSON.stringify(user.username)));
        console.log("***" + userArray);
    });
  }
  console.log("***" + userArray);

}
