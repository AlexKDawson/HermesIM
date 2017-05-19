var User = require('../models/user');
var db = require('../../config/authdb.js');

exports.acceptFrndReq = function(req, res){
  User.findOne({ 'email' :  req.user.email }, function(err, user) {
    var found = false;
    for(i = 0; i < user.frReqs.length; i++){
      if(user.frReqs[i] == req.body.frndEmail){
          found = true;

          User.update({'email':req.body.frndEmail},
            {$push: { friends: req.user.email } }, function(err) {
              if(err)
                console.log(err);
          });

          User.update({'email':req.user.email},
            {$push: { friends: req.body.frndEmail } }, function(err) {
              if(err)
                console.log(err);
          });

          User.update({'email':req.user.email},
            {$pull: {frReqs: req.body.frndEmail } }, function(err) {
              if(err)
                console.log(err);
          });

          User.update({'email':req.body.frndEmail},
            {$pull: {frReqs: req.user.email } }, function(err) {
              if(err)
                console.log(err);
          });

          res.redirect('/debug');
      }
    }
    if(!found){
      res.send(404);
    }

  });
}
