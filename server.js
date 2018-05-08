const http = require('http');
const Static = require('node-static');
const WebSocketServer = new require('ws');
const mysql = require('mysql');

// connected clients
const clients = {};

// connected mysql
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "chat"
});

let values = [];

// WebSocket-server on port 8081
const webSocketServer = new WebSocketServer.Server({port: 8081});
webSocketServer.on('connection', function(ws) {

  let id = Math.random();
  clients[id] = ws;
  console.log("new connection " + id);

  ws.on('message', function(message) {
    values.push([message]);

    if (values.length == 20) {
      // con.connect(function(err) {
      //   if (err) throw err;
      //   console.log('Connected!');
      //   var sql = "INSERT INTO messages (message) VALUES ?";
      //   con.query(sql, [values], function (err, result) {
      //     if (err) throw err;
      //     console.log("Number of records inserted: " + result.affectedRows);
      //   });
      // });
      values.length = 0;
    }

    console.log('received a message ' + values);

    for(let key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', function() {
    console.log('connection closed ' + id);
    delete clients[id];
  });

});

// normal server (statics) on the port 8080
const fileServer = new Static.Server('.');
http.createServer(function (req, res) {

  fileServer.serve(req, res);

}).listen(8080);

console.log("The server is running on ports 8080 and 8081");

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM messages", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
