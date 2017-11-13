// app/controllers/messaging.js
var Group = require('../models/group');

exports.send = function(req, res){
  Group.update( {'groupID' : req.body.groupID}, {$push: { messages: {sender : req.user.email, message: req.body.message }}}, function (err){
    if(err){
      console.log(err);
    }
  });
};
