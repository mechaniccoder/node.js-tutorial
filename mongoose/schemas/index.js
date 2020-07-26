const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      "mongodb://mechaniccoder:tmdghks9409151!@localhost:27017/admin",
      {
        dbName: "nodejs",
      },
      (error) => {
        if (error) {
          console.log("몽고디비 연결에 에러가 발생했습니다.", error);
        } else {
          console.log("몽고디비 연결에 성공했습니다.");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", (error) => {
    console.error("몽고디비 연결 에러", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("몽고디비 연결이 끊겼습니다. 다시 연결하세요.");
    connect();
  });
  require("./user");
  require("./comment");
};
