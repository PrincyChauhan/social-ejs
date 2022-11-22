const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please Provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Provide a vaild email"],
  },
  mobile: {
    type: Number,
    required: [true, "Please Provide Number"],
    maxlength: 10,
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: 6,
  },
  // passwordConfirm: {
  //   type: String,
  //   required: [true, "Please confirm your password"],
  //   validate: {
  //     // ONLY WORK ON SAVE and CREATE
  //     validator: function (el) {
  //       return el === this.password;
  //     },
  //     message: "Password are not the same",
  //   },
  // },
  shopName: {
    type: String,
    required: [true, "Please Provide your Shop Name"],
    unique: true,
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if the password was actually modified
  if (!this.isModified("password")) return next();

  //   Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
