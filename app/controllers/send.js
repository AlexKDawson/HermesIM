var Message = require('../models/message');

exports.msg = function(req, res){
  var mess = new Message({
    name: req.body.name,
    message: req.body.message
  });

  mess.save( function(err){
    if(err){
        res.json(err);
    }
});

};
