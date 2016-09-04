// app/controllers/getUser.js

var User = require('../models/user');

exports.output = function(callback){
  User.find({}, function(err, items) {
    callback(items);
  });
};
