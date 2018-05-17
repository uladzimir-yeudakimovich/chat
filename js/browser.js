if (!window.WebSocket) {
	document.body.innerHTML = 'WebSocket this browser does not support.';
}

// create a connection
const socket = new WebSocket("ws://localhost:8081");
const uid = 0;

document.forms.registration.onsubmit = function() {
  document.getElementById('id01').style.display = 'none';
  document.getElementById('messageField').className = '';

  let username = this.username.value;
  let password = this.psw.value;
  let email    = this.email.value;
  let data     = {
    message: "registration",
    user   : {
      username: username,
      password: password,
      email   : email
    }
  };
  socket.send(JSON.stringify(data));
  return false;
};

document.forms.login.onsubmit = function() {
  document.getElementById('id02').style.display = 'none';
  document.getElementById('messageField').className = '';

  let username = this.login.value;
  let password = this.password.value;
  let data = {
    message: "login",
    user   : {
      username: username,
      password: password
    }
  };
  socket.send(JSON.stringify(data));
  return false;
};

// send a message from the form publish
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;
  let data = {
    message: "message",
    user   : {
      uid  : uid,
      value: outgoingMessage
    }
  };
  socket.send(JSON.stringify(data));
  return false;
};

// handler of inbound messages
socket.onmessage = function(event) {
  let incomingMessage = JSON.parse(event.data);
  // if(incomingMessage.message === "registration") {}
  // if(incomingMessage.message === "login") {}
  if(incomingMessage.message === "message") {
    showMessage(incomingMessage.user.value);
  }
};

// show the message in div#subscribe
function showMessage(message) {
  let messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById('subscribe').appendChild(messageElem);
}
