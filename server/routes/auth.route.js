const route = require("@forkjs/group-router");
const { registerUser, loginUser } = require("../controllers/auth.controller");

route.group("/auth/", () => {
  route.post("register", registerUser);
  route.post("login", loginUser);
});

module.exports = route.router;
