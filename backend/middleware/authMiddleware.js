const jwt = require("jsonwebtoken");
const User = require("../models/user");
const requireSignin = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user=decode
    next();
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error",
      error,
    });
  }
};
const isAdmin = (req, res, next) => {
  try {
    const user = User.findById(req.user._id);
    if (user.role !== "admin") {
      return res.send({
        success: false,
        message: "Unauthorized token",
        error,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error",
      error,
    });
  }
};
module.exports = { requireSignin ,isAdmin};
