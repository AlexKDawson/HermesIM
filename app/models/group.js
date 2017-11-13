// app/models/group.js

var mongoose       = require('mongoose');
var Schema         = mongoose.Schema;
var dbconf         = require('./../../config/groupdb');

//connect to db
var msgdb = mongoose.createConnection(dbconf.url);

var groupSchema = new Schema({
  groupID: String,
  name: String,
  members: [
    String
  ],
  messages: [
    {
      sender: String,
      message: String
    },
    {
      timestamps: true
    }
  ]
});

var grp = msgdb.model('grp', groupSchema);

module.exports = grp;
