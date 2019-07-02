var socket;
var gob;

window.onload = setup;

function setup(){
  socket = io.connect("http://127.0.0.1:8080");
  socket.on('broadcast', receive);
}

function send() {
  if(document.getElementById('text').value.trim() == '') {
    return;
  }
  var date = new Date();
  var minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
  var time = date.getHours() +':'+ minutes;
  document.getElementById('chat').innerHTML += '<div class="container">'+
                                                  '<img src="avatars/david.png" alt="Avatar" style="width:100%;">'+
                                                  '<p class="right">'+document.getElementById('text').value.trim()+'</p>'+
                                                  '<span class="time-right">'+time+'</span>'+'</div><br/>';
  var data = {};
  data.text = document.getElementById('text').value.trim();
  document.getElementById('text').value = '';
  socket.emit('text', data);
}

function receive(data) {
  var date = new Date();
  var minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
  var time = date.getHours() +':'+ minutes;
  document.getElementById('chat').innerHTML += '<div class="container darker">'+
                                                  '<img src="avatars/mike.png" alt="Avatar" style="width:100%;">'+
                                                  '<p class="right">'+data.text+'</p>'+
                                                  '<span class="time-right">'+time+'</span>'+'</div><br/>';
}
