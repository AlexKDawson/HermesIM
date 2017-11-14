// app/controllers/messaging.js

var Group = require('../models/group');
var User = require('../models/user');

exports.createGroup = function(req, res){
  var group = new Group({
    groupID: (Math.round(Math.random() * Math.pow(10, 8))), //TODO MAKE AN ACTUAL groupID generator that does not have repeats
    name: req.body.newGroupName,
    members: [req.user.email],
		messages: []
	});
	group.save( function(err){
		if(err){
			res.json(err);
		}
  });
  User.update({'email':req.user.email},
    {$push: { "groups" : group.groupID } }, function(err) {
      if(err){
        console.log(err);
      }
      else{
        res.send(200);
      }
    });
  }

  exports.sendMessage = function(req, res){
    console.log(req.body.groupID);
    Group.update({'groupID' : req.body.groupID}, {$push : { messages : { sender : req.user.email, message : req.body.message}}}, function(err){
      if(err){
        res.send(err);
      }else{
        res.send("OK");
      }
    });
  }

  exports.getGroups = function(g, callback){
    Group.find({ 'groupID': { $in: g }}, function(groups, err){
      callback(groups, err);
    });
  }

exports.getMembers = function(req, res){
  Group.findOne( {'groupID' : req.body.groupID}, function(group, err){
    if(err){
			res.json(err);
		}
    else
      res.send(group.members);
  });
}

//TODO edge cases and errors
exports.addUser = function(req, res){
  Group.update({'groupID' : req.body.groupID}, {$push : { members : req.body.user}});
  res.send("OK");
}

//TODO edge cases and errors
exports.removeUser = function(req, res){
  Group.update({'groupID' : req.body.groupID}, {$pull : { members : req.body.user}});
  res.send("OK");
}

exports.containsUser = function(req){
  Group.findOne({'groupId' : req.body.groupID}, function(group, err){
    if(group.members.contains(req.body.user)){
      return true;
    }
    return false;
  });
}
