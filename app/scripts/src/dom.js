import $ from 'jquery';
import md5 from 'crypto-js/md5';
import moment from 'moment';

function createGravatarUrl(username) {
  let userhash = md5(username);
  return `http://www.gravatar.com/avatar/${userhash.toString()}`;
}

export function promptForUsername() {
  let username = prompt('Enter a username');
  return username.toLowerCase();
}

export function promptForServername() {
  let servername = prompt('Enter a servername');
  return servername.toLowerCase();
}

export function setHeaderToServername(servername) {
  let header = $('.chat-app-header')[0].firstElementChild.innerText = 'Chattrbox' + ' - Server: ' + servername;
}

export class ChatForm {
  constructor(formSel, inputSel) {
    this.$form = $(formSel);
    this.$input = $(inputSel);
  }

  init(submitCallback) {
    this.$form.submit((event) => {
      event.preventDefault();
      let val = this.$input.val();
      submitCallback(val);
      this.$input.val('');
    });
    this.$form.find('button').on('click', () => this.$form.submit());
  }

}

export class ChatList {
  constructor(listSel, username, servername) {
    this.$list = $(listSel);
    this.username = username;
    this.servername = servername;
  }

  drawMessage({
    user: u,
    timestamp: t,
    message: m,
    server: s
  }) {

    if(this.servername === s){

      let $messageRow = $('<li>', {
        'class': 'message-row'
      });
      if (this.username === u) {
        $messageRow.addClass('me');
      }
      let $message = $('<p>');
      $message.append($('<span>', {
        'class': 'message-username',
        text: u
      }));
      $message.append($('<span>', {
        'class': 'timestamp',
        'data-time': t,
        text: moment(t).fromNow()
      }));
      $message.append($('<span>', {
        'class': 'message-message',
        text: m
      }));

      let $img = $('<img>', {
        src: createGravatarUrl(u),
        title: u
      });

      $messageRow.append($img);
      $messageRow.append($message);
      $(this.$list).append($messageRow);
      //Bronze Challenge: Adding Visual Effects to Messages
      $messageRow.hide();
      $messageRow.fadeIn(1500);
      $messageRow.get(0).scrollIntoView();

    }

  }

  init() {
    this.timer = setInterval(() => {
      $('[data-time]').each((idx, element) => {
        let $element = $(element);
        let timestamp = new Date().setTime($element.attr('data-time'));
        let ago = moment(timestamp).fromNow();
        $element.html(ago);
      });
    }, 1000);
  }
}
