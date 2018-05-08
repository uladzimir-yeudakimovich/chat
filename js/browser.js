if (!window.WebSocket) {
	document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.';
}

// create a connection
const socket = new WebSocket("ws://localhost:8081");

// send a message from the form publish
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// handler of inbound messages
socket.onmessage = function(event) {
  let incomingMessage = event.data;
  showMessage(incomingMessage);
};

// show the message in div#subscribe
function showMessage(message) {
  let messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById('subscribe').appendChild(messageElem);
}
