const mongoose = require("mongoose");

const config = require("./config");
const connect = () => {
  mongoose
    .connect(config.uri, config.options)
    .then(() => {
      console.log("Successfully connected to database".cyan.underline);
    })
    .catch((error) => {
      console.log(
        "database connection failed. exiting now...".cyan.red.underline
      );
      console.error(error);
      process.exit(1);
    });
};

const database = { connect };
module.exports = database;
