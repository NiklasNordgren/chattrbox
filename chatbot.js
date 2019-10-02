var WebSocket = require('ws');

module.exports = function(webServer) {

  var connection = new WebSocket('http://localhost:' + webServer.options.port);
  this.cmds = ['/help', '-users', '-randomfacts', '-coolanimals'];

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

  this.resolveCmd = (client, data) => {

    switch (data) {
      case '/help':
        listCommands(client);
        break;
      case '-users':
        listUsers(client);
        break;
      case '-randomfacts':
        listRandomFacts(client);
        break;
      case '-coolanimals':
        listCoolAnimals(client);
        break;
      default:
        // default code block
    }

  }

  listUsers = (client) => {
    //Currently not working :(
    client.send(JSON.stringify(webServer.clients));
  }

  listRandomFacts = (client) => {
    client.send('The sky is purple, not blue');
  }

  listCoolAnimals = (client) => {
    client.send('Zebra, Panter & Swordfish');
  }

  return this;

}
