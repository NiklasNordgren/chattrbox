var WebSocket = require('ws');

module.exports = function(webServer) {

  const connection = new WebSocket('http://localhost:' + webServer.options.port);

  this.connectToServer = () => {

    connection.onopen = () => {
      connection.send('chatbot connected to the server');
    };

    connection.onclose = () => {
      console.log('chatbot disconnected from the server');
    };

  }

  this.greetNewUser = (client) => {
    client.send('Greetings, type /help for available bot commands');
  }

  this.listCommands = (client) => {
    client.send('-users [display a list of connected users]');
    client.send('-randomfacts [display a list of random facts]');
    client.send('-coolanimals [display a list of cool animals]');
  }

  this.listUsers = (client) => {
    //Currently not working :(
    client.send(JSON.stringify(webServer.clients));
  }

  this.listRandomFacts = (client) => {
    client.send('The sky is really purple, not blue');
  }

  this.listCoolAnimals = (client) => {
    client.send('Zebra, Panter & Swordfish');
  }

  return this;

}
