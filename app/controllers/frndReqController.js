var User = require('../models/user');

/*Accepts a friend request. First confirming that a request was sent
**Then removing the users from each others friend request list and placing each
**other on eaches friend list*/
exports.acceptFrndReq = function(req, res){
  //First find the currently logged in user in our db
  User.findOne({ 'email' : req.user.email }, function(err, user) {
    var found = false;
    //Check their friend requests to see if the other user had sent them a req
    for(i = 0; i < user.frReqs.length; i++){
      if(user.frReqs[i] == req.body.frndEmail){
          found = true;

          //remove requesting user from accepting users friend requests
          User.update({'email':req.user.email},
            {$pull: {frReqs: req.body.frndEmail } }, function(err) {
            if(err){
              console.log(err);
            }

            //remove accepting user from requesting users friend requests
            User.update({'email':req.body.frndEmail},
              {$pull: {frReqs: req.user.email } }, function(err) {
                if(err){
                  console.log(err);
                }
                //Check whether accepting user is on requesting users friend list
                onAccptUsrFrndList = false;
                User.findOne({'email' : req.body.frndEmail}), function(err, user) {
                  for(k = 0; k < user.frReqs.length; k++){
                    if(user.friends[j] == req.user.email){
                      onAccptUsrFrndList = true;
                      break;
                    }
                  }
                }
                if(!onAccptUsrFrndList){
                  //add accepting user to requesting users friends list
                  User.update({'email':req.body.frndEmail},
                    {$push: { friends: req.user.email } }, function(err) {
                      if(err){
                        console.log(err);
                      }
                      //Check whether requesting user is on accepting users friend list
                      onCurrUsrFrndList = false;
                      for(j = 0; j < user.frReqs.length; j++){
                        if(user.friends[j] == req.body.frndEmail){
                          onCurrUsrFrndList = true;
                          break;
                        }
                      }
                      if(!onCurrUsrFrndList){
                        //add requesting user to accepting users friends list
                        User.update({'email':req.user.email},
                          {$push: { friends: req.body.frndEmail } }, function(err) {
                            if(err){
                              console.log(err);
                            }
                            if(!found){
                              res.send("User not found");
                            }
                            else{
                              User.findOne({ 'email' : req.user.email }, function(err, user) {
                                res.status(200).send({user: user, friend: req.body.frndEmail});
                              });
                            }
                        });
                      }
                  });
                }
            });
        });
      }
    }
  });
}

/*Rejects a friend request. Finds the request in the users list of friend
**requests and then removes it */
exports.rejectFrndReq = function(req, res){
  // //remove requesting user from accepting users friend requests
  User.update({'email':req.user.email},
    {$pull: {frReqs: req.body.frndEmail } }, function(err) {
      if(err){
        console.log(err);
      }
      //User User.findOne to ensure user is in database
      User.findOne({ 'email' : req.user.email }, function(err, user) {
        res.status(200).send({'user': user, friend: req.body.frndEmail});
      });
  });
}

/*Sends a friend request. Checks to make sure the user being requested exists
**and is not the current user, a friend of the current user, or has already has
**recieved a request from the current user*/
exports.sendFrndReq = function(req, res){
  User.findOne({ 'email' :  req.body.reqEmail }, function(err, user) {
    // if there are any errors, return the error
    console.log(req.body.reqEmail + "!!!!!!!!!" + user);
    if (err)
      res.send('Error');

    else if (!user)
      res.send('No user found');

    else if (req.body.reqEmail == req.user.email)
      res.send('You cannot friend yourself');

    else {
      var fin = false;
      for(var i = 0; i < user.friends.length; i++){
        if(user.friends[i] == req.user.email){
          res.send('You are already friends with this person');
          fin = true;
        }
      }

      if(!fin){
        for(var i = 0; i < user.frReqs.length; i++){
          console.log(user.frReqs.findOne);
          if(user.frReqs[i] == req.user.email){
            res.send('You already sent a request to this person');
            fin = true;
            break;
          }
        }
      }

      if(!fin){
        User.update({'email':req.body.reqEmail},
          {$push: { frReqs: req.user.email } }, function(err) {
        });
        res.send("Request Sent!");
      }
    }
  });
};

/*Removes a friend from current users friend list and the current user from
**their friends list*/
exports.removeFrnd = function(req, res){
//remove requesting user from accepting users friend requests
  User.update({'email':req.user.email},
    {$pull: {friends: req.body.frndEmail } }, function(err) {
      if(err){
        console.log(err);
      }
      User.update({'email':req.body.frndEmail},
        {$pull: {friends: req.user.email } }, function(err) {
          if(err){
            console.log(err);
          }
          //User User.findOne to ensure user is in database
          User.findOne({ 'email' : req.user.email }, function(err, user) {
            res.status(200).send({'user': user, friend: req.body.frndEmail});
          });
      });
  });
}
