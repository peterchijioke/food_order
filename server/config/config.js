const dotenv = require("dotenv").config();

const { JWT_SECRET, MONGO_URI } = process.env;

module.exports = {
  secret: JWT_SECRET,
  uri: MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
  },
};
