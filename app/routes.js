// app/routes.js

var send = require('./controllers/send.js');
var retrieve = require('./controllers/retrieve.js');

module.exports = function(app, passport){

  app.get('/', function(req, res){
    retrieve.output(function(data){
      res.render(__dirname + '/views/home.ejs', {msgs: data});
    });
  });

  app.post('/', function(req, res){
    send.msg(req, res);
    res.redirect('/'); //use a callback
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
};
