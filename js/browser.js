if (!window.WebSocket) {
	document.body.innerHTML = 'WebSocket this browser does not support.';
}

// Get the modal
const modal1 = document.getElementById('id01');
const modal2 = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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

document.forms.registration.onsubmit = function() {
  let login = this.login.value;
  let password = this.password.value;
  let data = {
      message: "login",
      user: {
          username: login,
          password: password
          }
  };
  ws.send(JSON.stringify(data));
  return false;
};
