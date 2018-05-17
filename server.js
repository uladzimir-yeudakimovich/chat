const http            = require('http');
const Static          = require('node-static');
const fileServer      = new Static.Server('.');
const WebSocketServer = new require('ws');
const mysql           = require('mysql');
const express         = require("express");
const bodyParser      = require("body-parser");
const fs              = require("fs");
const app             = express();
const jsonParser      = bodyParser.json();
const clients         = {};
const connection      = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "0514918a",
  database : "chat"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("MySQL connected!");
});

// WebSocket-server on port 8081
const wsServer = new WebSocketServer.Server({port: 8081});
wsServer.on('connection', function(ws) {
  let id = Math.random();
  clients[id] = ws;
  console.log("New connection: " + id);

  ws.on('message', function(message) {
    let data = JSON.parse(message);

    if (data.message === "registration") {
      let values = [];
      values.push([data.user.username, data.user.password, data.user.email]);
      let sql = "INSERT INTO users (username, password, email) VALUES ?";
      connection.query(sql, [values], function (err, result) {
        console.log("User added to database");
      });
      console.log("Added a new user: " + data.user.username);
    }

    if (data.message === "message") {
      let values = [];
      values.push([data.user.value]);
      let sql = "INSERT INTO messages (message) VALUES ?";
      connection.query(sql, [values], function (err, result) {
        console.log("Message added to database");
      });
      console.log("Received a message: " + data.user.value);
    }

    for(let key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', function() {
    console.log("Connection closed: " + id);
    delete clients[id];
  });
});

// normal server (statics) on the port 8080
http.createServer((req, res) => fileServer.serve(req, res)).listen(8080);

console.log("The server is running on ports 8080 and 8081");
