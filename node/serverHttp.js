var bodyParser = require("body-parser");
var express = require("express"),
  http = require("http");
app = express();

var server = http.createServer(app);
server.listen(80);

app.use(express.static(__dirname + "/web"));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  console.log("Server GET : /");
  res.send("Hi Client This is SERVER");
});

app.post("/", (req, res) => {
  console.log("Server POST : " + JSON.stringify(req.body));
  res.send("post value is : " + req.body.Client + "");
});

var io = require("socket.io")(server);
var roomName;
io.on("connection", function (socket) {
  console.log("connect");
  var instanceId = socket.id;
  socket.on("joinRoom", function (data) {
    console.log(data);
    socket.join(data.roomName);
    roomName = data.roomName;
  });
  socket.on("reqMsg", function (data) {
    console.log(data);
    io.sockets
      .in(roomName)
      .emit("recMsg", { comment: instanceId + " : " + data.comment + "\n" });
  });
});
