const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

module.exports = (cp) =>
  new Promise((resolve, reject) => {
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log("Database connected!");
        cp();

        resolve("success");
      })
      .catch((err) => {
        console.log("Database connection fail");
        console.log(err);
        reject(err);
      });
  });
