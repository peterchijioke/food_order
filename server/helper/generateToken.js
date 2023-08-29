const config = require("../config/config");
const jwt = require("jsonwebtoken");
const generateToken = (id) =>
  jwt.sign({ id }, config.secret, {
    expiresIn: "30d",
  });

module.exports = generateToken;
