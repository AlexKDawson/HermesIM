// app/controllers/messaging.js

var Group = require('../models/group');

exports.createGroup = function(req, res){
  var group = new Group({
    groupID: (Math.round(Math.random() * Math.pow(10, 8))), //TODO MAKE AN ACTUAL groupID generator that does not have repeats
    name: req.body.groupName,
    members: [req.user.email],
		messages: []
	});
	group.save( function(err){
		if(err){
			res.json(err);
		}
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
