// app/models/message.js

var mongoose       = require('mongoose');
var Schema         = mongoose.Schema;

var dbconf         = require('./../../config/messagedb');

//connect to db
var msgdb = mongoose.createConnection(dbconf.url);

var messageSchema = new Schema({
  name: String,
  message: String
},
{
  timestamps: true
});

var msg = msgdb.model('msg', messageSchema);

module.exports = msg;
