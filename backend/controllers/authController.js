const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password, address, phone ,answer,role} = req.body;
    if (!name || !email || !password || !address || !phone || !answer) {
      return res.send("All fields are required");
    }
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
      role
    });

    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("error in signup : ", error);
    res.status(500).send({
      sucess: false,
      message: "error",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Destructure necessary fields
    const { _id, role, name, address, phone } = user;

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: _id,
        userRole: role,
        user: {
          name,
          email,
          address,
          phone,
          role,
          _id,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: {
        name,
        email,
        address,
        phone,
        role,
        _id,
      },
    });
  } catch (error) {
    console.log("error in login : ", error);
    res.status(500).send({
      sucess: false,
      message: "error",
      error,
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!answer) {
      return res.status(400).send({
        success: false,
        message: "Answer is required",
      });
    }
    if (!newPassword) {
      return res.status(400).send({
        success: false,
        message: "New password is required",
      });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found with this email",
      });
    }

    // Check if answer matches
    if (user.answer !== answer) {
      return res.status(401).send({
        success: false,
        message: "Security answer is incorrect",
      });
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });

    return res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};



module.exports = {
  signup,
  login,
  forgotPasswordController,
};
