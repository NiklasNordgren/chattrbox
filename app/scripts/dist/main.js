(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wsClient = require('./ws-client');

var _wsClient2 = _interopRequireDefault(_wsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatApp = function ChatApp() {
  _classCallCheck(this, ChatApp);

  _wsClient2.default.init('ws://localhost:3001');
  _wsClient2.default.registerOpenHandler(function () {
    var message = new ChatMessage({ message: 'pow!' });
    _wsClient2.default.sendMessage(message.serialize());
  });
  _wsClient2.default.registerMessageHandler(function (data) {
    console.log(data);
  });
};

var ChatMessage = function () {
  function ChatMessage(_ref) {
    var m = _ref.message,
        _ref$user = _ref.user,
        u = _ref$user === undefined ? 'batman' : _ref$user,
        _ref$timestamp = _ref.timestamp,
        t = _ref$timestamp === undefined ? new Date().getTime() : _ref$timestamp;

    _classCallCheck(this, ChatMessage);

    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  _createClass(ChatMessage, [{
    key: 'serialize',
    value: function serialize() {
      return {
        user: this.user,
        message: this.message,
        timestamp: this.timestamp
      };
    }
  }]);

  return ChatMessage;
}();

exports.default = ChatApp;

},{"./ws-client":3}],2:[function(require,module,exports){
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _app2.default(); /*
                     Bronze Challenge: Default Import Name
                     The name of the variable is arbitrary so it makes no difference.
                     However this opposes the namning convention of importing modules.
                     */

},{"./app":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var socket = void 0;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

function registerOpenHandler(handlerFunction) {
  console.log('registerOpenHandler');

  socket.onopen = function () {
    console.log('connected');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  console.log('registerMessageHandler');

  socket.onmessage = function (e) {

    console.log('onmessage');

    console.log('message', e.data);
    var data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

exports.default = {
  init: init,
  registerOpenHandler: registerOpenHandler,
  registerMessageHandler: registerMessageHandler,
  sendMessage: sendMessage
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7SUFFTSxPLEdBQ0osbUJBQWM7QUFBQTs7QUFDWixxQkFBTyxJQUFQLENBQVkscUJBQVo7QUFDQSxxQkFBTyxtQkFBUCxDQUEyQixZQUFNO0FBQy9CLFFBQUksVUFBVSxJQUFJLFdBQUosQ0FBZ0IsRUFBQyxTQUFTLE1BQVYsRUFBaEIsQ0FBZDtBQUNBLHVCQUFPLFdBQVAsQ0FBbUIsUUFBUSxTQUFSLEVBQW5CO0FBQ0QsR0FIRDtBQUlBLHFCQUFPLHNCQUFQLENBQThCLFVBQUMsSUFBRCxFQUFVO0FBQ3RDLFlBQVEsR0FBUixDQUFZLElBQVo7QUFDRCxHQUZEO0FBR0QsQzs7SUFHRyxXO0FBRUosNkJBSUc7QUFBQSxRQUhRLENBR1IsUUFIRCxPQUdDO0FBQUEseUJBRkQsSUFFQztBQUFBLFFBRkssQ0FFTCw2QkFGUyxRQUVUO0FBQUEsOEJBREQsU0FDQztBQUFBLFFBRFUsQ0FDVixrQ0FEZSxJQUFJLElBQUosRUFBRCxDQUFhLE9BQWIsRUFDZDs7QUFBQTs7QUFDRCxTQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0EsU0FBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNEOzs7O2dDQUVXO0FBQ1YsYUFBTztBQUNMLGNBQU0sS0FBSyxJQUROO0FBRUwsaUJBQVMsS0FBSyxPQUZUO0FBR0wsbUJBQVcsS0FBSztBQUhYLE9BQVA7QUFLRDs7Ozs7O2tCQUlZLE87Ozs7O0FDaENmOzs7Ozs7QUFDQSxJQUFJLGFBQUosRyxDQU5BOzs7Ozs7Ozs7Ozs7QUNBQSxJQUFJLGVBQUo7O0FBRUEsU0FBUyxJQUFULENBQWMsR0FBZCxFQUFtQjtBQUNqQixXQUFTLElBQUksU0FBSixDQUFjLEdBQWQsQ0FBVDtBQUNBLFVBQVEsR0FBUixDQUFZLGVBQVo7QUFDRDs7QUFFRCxTQUFTLG1CQUFULENBQTZCLGVBQTdCLEVBQThDO0FBQzVDLFVBQVEsR0FBUixDQUFZLHFCQUFaOztBQUVBLFNBQU8sTUFBUCxHQUFnQixZQUFNO0FBQ3BCLFlBQVEsR0FBUixDQUFZLFdBQVo7QUFDQTtBQUNELEdBSEQ7QUFJRDs7QUFFRCxTQUFTLHNCQUFULENBQWdDLGVBQWhDLEVBQWlEO0FBQy9DLFVBQVEsR0FBUixDQUFZLHdCQUFaOztBQUVBLFNBQU8sU0FBUCxHQUFtQixVQUFDLENBQUQsRUFBTzs7QUFFeEIsWUFBUSxHQUFSLENBQVksV0FBWjs7QUFFQSxZQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEVBQUUsSUFBekI7QUFDQSxRQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsRUFBRSxJQUFiLENBQVg7QUFDQSxvQkFBZ0IsSUFBaEI7QUFDRCxHQVBEO0FBUUQ7O0FBRUQsU0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCO0FBQzVCLFNBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNEOztrQkFFYztBQUNiLFlBRGE7QUFFYiwwQ0FGYTtBQUdiLGdEQUhhO0FBSWI7QUFKYSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHNvY2tldCBmcm9tICcuL3dzLWNsaWVudCc7XHJcblxyXG5jbGFzcyBDaGF0QXBwIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHNvY2tldC5pbml0KCd3czovL2xvY2FsaG9zdDozMDAxJyk7XHJcbiAgICBzb2NrZXQucmVnaXN0ZXJPcGVuSGFuZGxlcigoKSA9PiB7XHJcbiAgICAgIGxldCBtZXNzYWdlID0gbmV3IENoYXRNZXNzYWdlKHttZXNzYWdlOiAncG93IScgfSk7XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZShtZXNzYWdlLnNlcmlhbGl6ZSgpKTtcclxuICAgIH0pO1xyXG4gICAgc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoKGRhdGEpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIENoYXRNZXNzYWdlIHtcclxuXHJcbiAgY29uc3RydWN0b3Ioe1xyXG4gICAgbWVzc2FnZTogbSxcclxuICAgIHVzZXI6IHUgPSAnYmF0bWFuJyxcclxuICAgIHRpbWVzdGFtcDogdCA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKClcclxuICB9KSB7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBtO1xyXG4gICAgdGhpcy51c2VyID0gdTtcclxuICAgIHRoaXMudGltZXN0YW1wID0gdDtcclxuICB9XHJcblxyXG4gIHNlcmlhbGl6ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHVzZXI6IHRoaXMudXNlcixcclxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxyXG4gICAgICB0aW1lc3RhbXA6IHRoaXMudGltZXN0YW1wXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoYXRBcHA7XHJcbiIsIi8qXHJcbkJyb256ZSBDaGFsbGVuZ2U6IERlZmF1bHQgSW1wb3J0IE5hbWVcclxuVGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIGlzIGFyYml0cmFyeSBzbyBpdCBtYWtlcyBubyBkaWZmZXJlbmNlLlxyXG5Ib3dldmVyIHRoaXMgb3Bwb3NlcyB0aGUgbmFtbmluZyBjb252ZW50aW9uIG9mIGltcG9ydGluZyBtb2R1bGVzLlxyXG4qL1xyXG5pbXBvcnQgQXBwbGljYXRpb25Gb3JDaGF0dGluZyBmcm9tICcuL2FwcCc7XHJcbm5ldyBBcHBsaWNhdGlvbkZvckNoYXR0aW5nKCk7XHJcbiIsImxldCBzb2NrZXQ7XHJcblxyXG5mdW5jdGlvbiBpbml0KHVybCkge1xyXG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uLicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIGNvbnNvbGUubG9nKCdyZWdpc3Rlck9wZW5IYW5kbGVyJyk7XHJcblxyXG4gIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnY29ubmVjdGVkJyk7XHJcbiAgICBoYW5kbGVyRnVuY3Rpb24oKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIGNvbnNvbGUubG9nKCdyZWdpc3Rlck1lc3NhZ2VIYW5kbGVyJyk7XHJcblxyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCdvbm1lc3NhZ2UnKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZygnbWVzc2FnZScsIGUuZGF0YSk7XHJcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuICAgIGhhbmRsZXJGdW5jdGlvbihkYXRhKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShwYXlsb2FkKSB7XHJcbiAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5pdCxcclxuICByZWdpc3Rlck9wZW5IYW5kbGVyLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIsXHJcbiAgc2VuZE1lc3NhZ2UsXHJcbn1cclxuIl19
