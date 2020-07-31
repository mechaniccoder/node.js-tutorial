const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    mongoose.connect(
      "'mongodb://localhost:27017/admin",
      {useNewUrlParser: true},
      (err) => {
        if (err) {
          console.log("몽고디비 연결에러");
        } else {
          console.log("몽고디비 연결성공");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", (err) => {
    console.log("몽고디비 연결 후 에러 발생");
  });
  mongoose.connection.on("disconnected", connect);
  require("./user");
  require("./comment");
};
