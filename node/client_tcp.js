const { TIMEOUT } = require('dns');
var net = require('net');
//net이라는 내장모듈을 사용할 거임
function getConnection(connName){
  var client = net.connect({port: 8107, host:'172.24.37.25'}, function() {
    console.log(connName)
    this.setTimeout(500);//5초동안 쉼 
    this.setEncoding('utf8');//인코딩 형식 정해줬음, base64도 많이 쓰임
    this.on('data', function(data) { //data라는 게 오면 on 이벤트가 발생
        console.log(data)
        this.end();
    });
    this.on('end', function() {//this=end 가 오면 어떤 기능이 생성될지
    });
    this.on('error', function(err) {
        console.log(err)
    });
//     this.on('error', (err) => { //화살표 함수!
//         console.log(err)
//     });
    this.on('timeout', function() {
    });
    this.on('close', function() {
    });
  });
  return client;
}

function writeData(socket, data){
  var success = !socket.write(data);
  if (!success){
    (function(socket, data){
      socket.once('drain', function(){
        writeData(socket, data);
      });
    })(socket, data);
  }
}
var Alice = getConnection("Alice's Connection");
var Bob = getConnection("Bob's Connection");
writeData(Alice, "Alice|Hi, Server");
writeData(Bob, "Bob|Hello, Server");
