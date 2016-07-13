// app/controllers/retrieve.js

var Message = require('../models/message');

exports.output = function(callback){
  Message.find({}, function(err, items) {
    callback(items);
  });
};
