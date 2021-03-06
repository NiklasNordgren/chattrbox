let socket;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

function registerOpenHandler(handlerFunction) {
  console.log('registerOpenHandler');

  socket.onopen = () => {
    console.log('connected');
    handlerFunction();
  };
}

//Silver Challenge: Closed Connection Alert
function registerCloseHandler(handlerFunction) {
  console.log('registerCloseHandler');

  socket.onclose = () => {
    console.log('disconnected');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  console.log('registerMessageHandler');

  socket.onmessage = (e) => {

    console.log('onmessage');

    console.log('message', e.data);
    let data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

export default {
  init,
  registerOpenHandler,
  registerCloseHandler,
  registerMessageHandler,
  sendMessage,
}
