import socket from './ws-client';
import {
  UserStore,
  MessageStore,
  ServerStore
} from './storage';
import {
  ChatForm,
  ChatList,
  promptForUsername,
  promptForServername,
  setHeaderToServername
} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

let userStore = new UserStore('x-chattrbox/u');
let username = userStore.get();
if (!username) {
  username = promptForUsername();
  userStore.set(username);
}

let messageStore = new MessageStore('x-chattrbox/m');

let serverStore = new ServerStore('x-chattrbox/s');
let servername = serverStore.get();
if (!servername) {
  servername = promptForServername();
  serverStore.set(servername);
}
setHeaderToServername(servername);

class ChatApp {
  constructor() {
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username, servername);

    if (messageStore.get()) {
      messageStore.get().forEach(msg => {
        this.chatList.drawMessage(msg);
      });
    }

    socket.init('ws://localhost:3001');
    socket.registerOpenHandler(() => {
      this.chatForm.init((data) => {
        let message = new ChatMessage({
          message: data,
          server: servername
        });
        socket.sendMessage(message.serialize());
      });
      this.chatList.init();
    });
    socket.registerMessageHandler((data) => {
      console.log(data);
      let message = new ChatMessage(data);
      messageStore.set(message.serialize());
      this.chatList.drawMessage(message.serialize());
    });
    socket.registerCloseHandler((data) => {
      console.log(data);
    });
  }
}

class ChatMessage {

  constructor({
    message: m,
    user: u = username,
    timestamp: t = (new Date()).getTime(),
    server: s
  }) {
    this.message = m;
    this.user = u;
    this.timestamp = t;
    this.server = s;
  }

  serialize() {
    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp,
      server: this.server
    };
  }

}

export default ChatApp;
