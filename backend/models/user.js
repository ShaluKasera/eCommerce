const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone:{
    type:String,
    required:true,
    unique:true,
  },
  address:{
    type:String,
    required:true,
  },
  answer:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user",
  }
},{timestamps:true});
const User = mongoose.model("users", userSchema);
module.exports = User;
