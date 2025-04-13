const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireSignin = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided, access denied.",
      });
    }

    // Verify token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach decoded user information to the request object
    req.user = decoded;
    
    next();  // Call the next middleware or route handler
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
      error,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    // Ensure that the decoded user has a valid userId (from token)
    if (!req.user || !req.user.userId) {
      return res.status(400).send({
        success: false,
        message: "User information missing in token",
      });
    }

    // Find user by ID in database using the userId from the decoded token
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Check if user has an "admin" role
    if (user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Unauthorized token, not an admin",
      });
    }

    // Proceed to the next middleware or route handler if admin
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

module.exports = { requireSignin, isAdmin };
