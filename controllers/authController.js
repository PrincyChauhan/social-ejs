const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const path = require("path");
const connect = require("../db");

const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in ! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  //  promisify() function that converts callback-based functions to promise-based functions.
  // This lets you use promise chaining and async/await with callback-based APIs.
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  // 3) Check it user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next("The user belonging to this token does no longer exist.", 401);
  }

  // GRANT ACCESS TO PROTECTED ROUTES
  req.user = currentUser;
  req.session.login = true;

  next();
});

const userSignup = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  console.log(newUser)
  res.redirect("/view/login");
});

const userLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password are exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email: email, password: password });
  if (!user) {
    return next(new AppError("Incorrect email or password"), 401);
  }
  req.body.login = "asdasdas";
  console.log(req.session)
  res.redirect("/view/home");
});

const userLogout = catchAsync(async (req, res) => {
  connect();
  res.status(200).json({
    status: "success",
    data: null,
  });
});



module.exports = {
  userSignup,
  userLogin,
  protect,
  userLogout,
};
