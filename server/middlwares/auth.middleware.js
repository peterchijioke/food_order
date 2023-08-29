const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const verifyToken = asyncHandler(async (req, res, next) => {
  let access_token = null;
  if (
    req?.headers?.authorization &&
    req?.headers?.authorization?.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      access_token = req.headers.authorization.split(" ")[1];

      //verify token and get user info from payload
      const decoded = jwt.verify(access_token, config.secret);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error.message);
      res?.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!access_token) {
    res?.status(401);
    throw new Error("Not authorized, no access token passed");
  }
});

const authMiddleware = {
  verifyToken,
};
module.exports = authMiddleware;
