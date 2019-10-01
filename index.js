var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var mime = require('mime');

var handleError = function(err, res) {
  var filePath = extract('/error.html');
  fs.readFile(filePath, function(err, data) {
    res.end(data);
  });
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      //Silver Challenge: Providing a MIME Type Dynamically
      res.setHeader('Content-Type', mime.getType(filePath));
      res.end(data);
    }
  });
});
server.listen(3000);
