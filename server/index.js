const express = require("express");
const colors = require("colors");
const cors = require("cors");
const errorHandle = require("./middlwares/error.middleware");

const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/product.route");
const database = require("./config/db");
const app = express();
app.use(cors());
database.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use("/api/", authRoute);
app.use("/api/", productRoute);
const port = 5001;
app.use(errorHandle.errorHandler);
app.listen(port, () => {
  console.log(`app running on port ${port}`.underline.red);
});
