// app/routes.js

var friendReqController = require('./controllers/frndReqController.js');
var groups = require('./controllers/groupController.js');
var messaging = require('./controllers/messagingController.js');
var retrieve = require('./controllers/retrieve.js');
var user = require('./controllers/userController.js');

module.exports = function(app, passport){

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/home.html');
  });

  app.get('/messaging', isLoggedIn, function(req, res){
    res.sendFile(__dirname + '/views/messaging.html');
  });

  app.get('/getFriendReqs', isLoggedIn, function(req, res){
    user.getFriendReqs(req, res);
  });

  app.get('/getFriends', isLoggedIn, function(req, res){
    user.getFriends(req, res);
  });

  app.post('/messaging', isLoggedIn, function(req, res){
    messaging.send(req, res);
    res.redirect('/messaging'); //use a callback
  });

  app.post('/acceptFrndReq', isLoggedIn, function(req, res){
    friendReqController.acceptFrndReq(req, res);
  });

  app.post('/rejectFrndReq', isLoggedIn, function(req, res){
    friendReqController.rejectFrndReq(req, res);
  });

  app.post('/removeFrnd', isLoggedIn, function(req, res){
    friendReqController.removeFrnd(req, res);
  });

  app.post('/sendFrndReq', isLoggedIn, function(req, res){
    friendReqController.sendFrndReq(req, res);
  });

  app.post('/freqProfiles', isLoggedIn, function(req, res){
    getUser.output(req,res);
  });

  app.post('/createGroup', isLoggedIn, function(req, res){
    groups.createGroup(req, res);
  });

  // app.get('/debug', isLoggedIn, function(req, res){
  //
  //   console.log("DEBUG SCREEN");
  //   getProfile.output(req, res, function(usr){
  //     console.log(usr);
  //     res.render(__dirname + '/views/debug.ejs', {
  //       userfriendReqController: req.user.frReqs,
  //       userFrnds: req.user.friends,
  //       userName: req.user.username,
  //       userPic: req.user.image
  //     });
  //   });
  // });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/debug', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/messaging', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}
