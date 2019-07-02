var express = require("express");

var app = express();
var server = app.listen(8080);
app.use(express.static("public"));

var socket = require("socket.io");
var io = socket(server);
io.sockets.on("connection", newConection);

function newConection(socket) {
  socket.on("text", broadcastMessage);

  function broadcastMessage(data){
    socket.broadcast.emit("broadcast", data);
  }
}
