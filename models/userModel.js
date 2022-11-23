const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    // required: [true, "Please Provide your email"],
    unique: true,
    lowercase: true,
    // validate: [validator.isEmail, "Please Provide a vaild email"],
  },
  mobile: {
    type: Number,
    // required: [true, "Please Provide Number"],
    maxlength: 10,
  },
  password: {
    type: String,
    // required: [true, "Please Provide Password"],
    minlength: 6,
  },
});

const UserData = mongoose.model("UserData", userSchema);
module.exports = UserData;
