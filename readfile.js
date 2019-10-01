var fs = require('fs');
var extract = require('./extract');
var mime = require('mime');

module.exports = function(folderName){

  var readFile = function(req, res) {

    var filePath = extract(req.url, folderName);

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
  }

  var handleError = function(err, res) {
    var filePath = extract('/error.html', 'app');
    fs.readFile(filePath, function(err, data) {
      res.end(data);
    });
  };

  return readFile;

}





//module.exports = readFile;
