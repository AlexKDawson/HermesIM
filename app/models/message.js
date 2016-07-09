var mongoose       = require('mongoose');
var Schema         = mongoose.Schema;

var messageSchema = new Schema({
  name: String,
  message: String
});

var msg = mongoose.model('msg', messageSchema);

module.exports = msg;
