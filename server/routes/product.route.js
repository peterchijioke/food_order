const route = require("@forkjs/group-router");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const middleware = require("../middlwares/auth.middleware");
const { orderProduct } = require("../controllers/product.controller");
route.group(
  "/product/",
  () => {
    route.post("order", orderProduct);
  },
  middleware.verifyToken
);

module.exports = route.router;
