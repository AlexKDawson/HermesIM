var mongoose       = require('mongoose');
var Schema         = mongoose.Schema;

var messageSchema = new Schema({
  name: String,
  message: String
}, 
{
  timestamps: true
});

var msg = mongoose.model('msg', messageSchema);

module.exports = msg;
