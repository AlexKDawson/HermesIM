// app/models/message.js

var mongoose       = require('mongoose');
var bcrypt         = require('bcrypt-nodejs');
var Schema         = mongoose.Schema;

var dbconf         = require('../../config/authdb');

//connect to db
var authdb = mongoose.createConnection(dbconf.url);

var userSchema = new Schema({
  email: String,
  password: String
});

//hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var user = authdb.model('user', userSchema);

module.exports = user;
