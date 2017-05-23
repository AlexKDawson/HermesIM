// app/routes.js

var send = require('./controllers/send.js');
var retrieve = require('./controllers/retrieve.js');
var addFriend = require('./controllers/addFriend.js');
var getUser = require('./controllers/getUser.js');
var getProfile = require('./controllers/getProfile.js');
var frndReqs = require('./controllers/frndReqs.js');

module.exports = function(app, passport){

  app.get('/', function(req, res){
    retrieve.output(function(data){
      res.render(__dirname + '/views/home.ejs', { signupMessage: req.flash('signupMessage'), loginMessage: req.flash('loginMessage')  });
    });
  });

  app.get('/messaging', isLoggedIn, function(req, res){
    retrieve.output(function(data){
      res.render(__dirname + '/views/messaging.ejs', {
        msgs: data,
        user: req.user,
        freqMessage: req.flash('freqMessage')
      });
    });

  });

  app.post('/messaging', isLoggedIn, function(req, res){
    send.msg(req, res);
    res.redirect('/messaging'); //use a callback
  });

  app.post('/acceptFrndReq', isLoggedIn, function(req, res){
    frndReqs.acceptFrndReq(req, res);
  });

  app.post('/rejectFrndReq', isLoggedIn, function(req, res){
    frndReqs.rejectFrndReq(req, res);
  });

  app.post('/freq', isLoggedIn, function(req, res){
    addFriend.add(req, res);
  });

  app.post('/freqProfiles', isLoggedIn, function(req, res){
    getUser.output(req,res);
  });

  app.get('/debug', isLoggedIn, function(req, res){

    console.log("DEBUG SCREEN");
    getProfile.output(req, res, function(usr){
      console.log(usr);
      res.render(__dirname + '/views/debug.ejs', {
        userFrndReqs: req.user.frReqs,
        userFrnds: req.user.friends,
        userName: req.user.username,
        userPic: req.user.image
      });
    });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/debug', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/debug', // redirect to the secure profile section
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
