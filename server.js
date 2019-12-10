var http = require("http");
var sockjs = require("sockjs");

const initMessage = {
  tbCounterValues: {
    "1": 2,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": 0,
    "11": 0,
    "12": 0,
    "13": 1,
    "14": 0
  }
};

const lowActivityMessage = { lowActivityTbType: 0 };

const eventMessage = {
  userFullName: "Декань Дмитрий Владимирович",
  userTbType: 1
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
    lowActivityMessage.lowActivityTbType = getRandomInt(1, 14);
    conn.write(JSON.stringify(lowActivityMessage));
  }, 500);

  setTimeout(
    () =>
      setInterval(() => {
        eventMessage.userTbType = getRandomInt(1, 14);
        conn.write(JSON.stringify(eventMessage));
      }, 4000),
    1000
  );

  conn.on("close", () => {
    console.log("SockJS connection closed");
  });
});

var server = http.createServer();
echo.installHandlers(server, { prefix: "/echo" });
server.listen(9999, "0.0.0.0");
