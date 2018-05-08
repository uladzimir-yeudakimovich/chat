const http = require('http');
const Static = require('node-static');
const WebSocketServer = new require('ws');

// подключенные клиенты
let clients = {};

// WebSocket-сервер на порту 8081
const webSocketServer = new WebSocketServer.Server({port: 8081});
webSocketServer.on('connection', function(ws) {

  let id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);

    for(let key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});

// обычный сервер (статика) на порту 8080
const fileServer = new Static.Server('.');
http.createServer(function (req, res) {

  fileServer.serve(req, res);

}).listen(8080);

console.log("Сервер запущен на портах 8080, 8081");

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "chat"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query("SELECT * FROM users", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});
