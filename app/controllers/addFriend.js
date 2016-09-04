var User = require('../models/user');
var db = require('../../config/authdb.js');

exports.add = function(req, res){
  User.findOne({ 'email' :  req.body.friendEmail }, function(err, user) {
    // if there are any errors, return the error
    console.log("!!!!!!!!!" + user);
    if (err)
      res.send('Error');

    else if (!user)
      res.send('No user found');

    else if (req.body.friendEmail == req.body.userEmail)
      res.send('You cannot friend yourself');

    else {
      var fin = false;
      for(var i = 0; i < user.friends.length; i++){
        if(user.friends[i] == req.body.userEmail){
          res.send('You are already friends with this person');
          fin = true;
        }
      }

      if(!fin){
        for(var i = 0; i < user.frReqs.length; i++){
          //console.log(user.frReqs[0]);
          //console.log(user.frReqs[i] +"XX" + JSON.stringify(req.body.userEmail));
          //console.log(user.frReqs[i][0] == req.body.userEmail);
          console.log(user.frReqs.findOne);
          if(user.frReqs[i] == req.body.userEmail){
            res.send('You already sent a request to this person');
            fin = true;
            break;
          }
        }
      }

      if(!fin){
        User.update({'email':req.body.friendEmail},
          {$push: { frReqs: req.body.userEmail } }, function(err) {
        });
        res.send("Request Sent!");
      }
    }
  });
};
