var http = require("http");
var sockjs = require("sockjs");

const initMessage = {
  count: 0
};

const eventMessage = {
  incrementCount: true
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var echo = sockjs.createServer();
echo.on("connection", conn => {
  conn.write(JSON.stringify(initMessage));

  setInterval(() => {
    conn.write(JSON.stringify(eventMessage));
  }, 1000);

  conn.on("close", () => {
    console.log("SockJS connection closed");
  });
});

var server = http.createServer();
echo.installHandlers(server);
server.listen(5000, "127.0.0.1");
