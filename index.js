var http = require('http');

//Gold Challenge: Moving Error Handling to Its OwnModule
var readFile = require('./readfile')('app');

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');

  //Gold Challenge: Moving Error Handling to Its OwnModule
  readFile(req, res);

});
server.listen(3000);
