
var net = require('net');
var server = net.createServer(function(client) {
    //createServer를 쓸 줄 알면 됐음
    console.log("hello world")
    client.setTimeout(500);
    client.setEncoding('utf8');
    client.on('data', function(data) {
        username=data.split("|")[0]
        writeData(client, 'Sending : nice to meet you '+username);
  });
  client.on('end', function() {
    server.getConnections(function(err, count){
    });
  });
  client.on('error', function(err) {
  });
  client.on('timeout', function() {
  });
});

server.listen(8107, function() {
  server.on('close', function(){
  });
  server.on('error', function(err){
    console.log(err)
  });
});
function writeData(socket, data){ //어떤 소켓을 받아 데이터를 쓴다
  var success = !socket.write(data);
  if (!success){
    (function(socket, data){
      socket.once('drain', function(){
        writeData(socket, data);
      });
    })(socket, data);
  }
}
