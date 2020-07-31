const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    mongoose.connect(
      "mongodb://localhost:27017/gif-chat",
      {
        useNewUrlParser: true,
      },
      (err) => {
        if (err) {
          console.log("몽고디비 연결 실패");
        } else {
          console.log("몽고디비 gif-chat 연결 성공");
        }
      }
    );
  };
  connect();

  mongoose.connection.on("error", (err) => {
    console.log("몽고디비 에러 발생", err);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("몽고디비 연결이 해제됨");
    connect();
  });

  require("./room");
  require("./chat");
};
