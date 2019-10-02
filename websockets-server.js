var WebSocket = require('ws');



var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
//Silver Challenge: Speakeasy
var authUsers = new Set();
var cmds = ['/help', '-users', '-randomfacts', '-coolanimals'];

var chatbot = require('./chatbot')(ws);
chatbot.connectToServer();
authUsers.add(chatbot.connection);

console.log('websockets server started');

ws.on('connection', function(socket) {
  console.log('client connection established');

  socket.on('message', function(data) {
    console.log('message received: ' + data);

    if (data === 'Swordfish' && !authUsers.has(socket)) {
      authUsers.add(socket);

      messages.forEach(function(msg) {
        socket.send(msg);
      });

      chatbot.greetNewUser(socket);

    }

    if (authUsers.has(socket)) {

      if (!cmds.includes(data)) {
        messages.push(data);

        ws.clients.forEach(function(clientSocket) {

          //Bronze Challenge: Am I Repeating Myself?
          /*
          for (let i = 0; i < messages.length; i++) {
            clientSocket.send(data);
          }
          */
          if (authUsers.has(clientSocket)) {
            clientSocket.send(data);
          }

        });
      }

      if (data === '/help') {
        chatbot.listCommands(socket);
      }
      if (data === '-users') {
        chatbot.listUsers(socket);
      }
      if (data === '-randomfacts') {
        chatbot.listRandomFacts(socket);
      }
      if (data === '-coolanimals') {
        chatbot.listCoolAnimals(socket);
      }

    }

  });

});
