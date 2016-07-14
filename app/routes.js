// app/routes.js

var send = require('./controllers/send.js');
var retrieve = require('./controllers/retrieve.js');

module.exports = function(app, passport){

  app.get('/', function(req, res){
    retrieve.output(function(data){
      res.render(__dirname + '/views/home.ejs');
    });
  });

  app.get('/messaging', isLoggedIn, function(req, res){
    retrieve.output(function(data){
      res.render(__dirname + '/views/messaging.ejs', {
        msgs: data,
        user: req.user
      });
    });
  });

  app.post('/messaging', function(req, res){
    send.msg(req, res);
    res.redirect('/messaging'); //use a callback
  });

  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render(__dirname + '/views/signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render(__dirname + '/views/login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/messaging', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
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
