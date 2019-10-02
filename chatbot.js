var WebSocket = require('ws');

module.exports = function(webServer) {

  const connection = new WebSocket('http://localhost:' + webServer.options.port);
  //const connection = new WebSocket(webServer['address'] + '/' + webServer['port']);

  this.connectToServer = () => {

    connection.onopen = () => {
      connection.send('chatbot connected to the server');
    };

    connection.onclose = () => {
      console.log('chatbot disconnected from the server');
    };

  }

  this.addToAuthUsers = () => {
    webServer.send
  }

  this.respondToGreeting = () => {
    webServer.clients.forEach(function(clientSocket) {

      clientSocket.send('bot greeting');


    });
  }

  return this;

}
