// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {
  // serialize the user
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // SIGNUP
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, override with email
    usernameField : 'email',
    passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {

    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

      // find a user whose email is the same as the forms email
      User.findOne({ 'email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
          return done(err);

        // check to see if theres already a user with that email
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

          // if there is no user with that email
          // create the user
          var newUser            = new User();

          // set the user's local credentials
          newUser.email    = email;
          newUser.password = newUser.generateHash(password);
          newUser.username = req.body.username;
          newUser.image = "http://imgur.com/a/hoBED";

          // save the user
          newUser.save(function(err) {
            if (err)
              throw err;
              return done(null, newUser);
            });
          }
      });
    });
  }));


  //LOGIN
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    User.findOne({ 'email' :  email }, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err)
        return done(err);
      // if no user is found, return the message
      if (!user)
        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
      // if the user is found but the password is wrong
      if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
      // all is well, return successful user
        return done(null, user);
    });
  }));
};
