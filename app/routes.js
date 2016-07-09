var send = require('./controllers/send.js');
var retrieve = require('./controllers/retrieve.js');

module.exports = function(app){

  app.get('/', function(req, res){
    retrieve.output(function(data){
      res.render(__dirname + '/views/signin', {msgs: data});
    });
  });

  app.post('/', function(req, res){
    send.msg(req, res);
    res.redirect('/'); //use a callback
  });
};
