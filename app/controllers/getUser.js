// app/controllers/getUser.js

var User = require('../models/user');
var userArray = "";

exports.output = function(req, res){
  var arraySize = 0;
  var userArray = [];
  var callsCompleted = 0;

  while(JSON.stringify(req.body["freqs[]"][arraySize]) != undefined){
    arraySize++;
  }

  for(var j = 0, k = arraySize; j < k; j++){
    User.findOne({ 'email' :  req.body["freqs[]"][j] }, function(err, user) {
      if(user){
        userArray.push(JSON.parse(JSON.stringify(user.username)));
        console.log(arraySize + " " + userArray);
        callsCompleted = maybeSend(arraySize, callsCompleted, res, userArray);
        console.log("calls completed: " + callsCompleted);
      }
      else{
        j = k;
      }
    });
  }
}

function maybeSend(size, calls, res, array){
  calls++;
  if(calls == size){
    res.send(array);
    console.log("Array sent: " + array);
    return -1;
  }
  else{
    return calls;
  }
}
