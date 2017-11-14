// app/controllers/getUser.js

var User = require('../models/user');
var groupController = require('./groupController.js')
var userArray = "";

exports.getUserName = function(req, res){
  User.findOne({ 'email' : req.user.email}, function(err, user){
    res.send(user.username);
  });
}

exports.getGroups = function(req, res){
  User.findOne({ 'email' : req.user.email}, function(err, user){
    if(err){
      res.json(err);
    }
    else{
      var ret = [];
      groupController.getGroups(user.groups, function(err, grp){
        if(err){
          res.json(err);
        }
        else{
          console.log(grp);
          res.send(grp);
        }
      });
    }
  });
}

exports.getFriendReqs = function(req, res){
  User.findOne({ 'email' : req.user.email}, function(err, user){
    if(err){
      res.json(err);
    }
    else
      res.send(user.frReqs);
  });
}

exports.getFriends = function(req, res){
  User.findOne({ 'email' : req.user.email}, function(err, user){
    if(err){
      res.json(err);
    }
    else
      res.send(user.friends);
  });
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
