const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

const userLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // 1) Check if email and password are exist
  if (!email && !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email: email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email or password"), 401);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2h",
  });

  res.status(200).json({
    status: "success",
    token: token,
    data: {
      user: user,
    },
  });
});

const userLogout = catchAsync(async (req, res) => {
  connect();
  res.status(200).json({
    status: "success",
    data: null,
  });
});

const registerPage = async (req, res, next) => {
  try {
    console.log("asdasds");
    if (req.session.login) {
      res.redirect("/users/home");
    } else {
      res.render("register");
    }
  } catch (error) {
    console.log(error);
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};

const loginPage = async (req, res, next) => {
  try {
    if (req.session.login) {
      res.redirect("/users/home");
    } else {
      res.render("login");
    }
  } catch (error) {
    console.log(error);
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};

const homePage = async (req, res, next) => {
  try {
    if (req.session.login) {
      res.redirect("/users/home");
    } else {
      res.render("login");
    }
  } catch (error) {
    console.log(error);
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};

module.exports = {
  userSignup,
  userLogin,
  protect,
  userLogout,
  registerPage,
  loginPage,
  homePage,
};
