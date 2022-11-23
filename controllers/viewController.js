const Post = require("../models/postModel");

const loginPage = async (req, res, next) => {
  try {
    if (req.session.login) {
      res.redirect("/view/home");
    } else {
      res.render("login");
    }
  } catch (error) {
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};

const homePage = async (req, res, next) => {
  try {
    // if (req.session.login) {
    const posts = await Post.find();
    console.log(posts);
    res.render("home", {
      posts: posts,
    });
    // } else {
    //   res.redirect("/view/login");
    // }
  } catch (error) {
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};
const registerPage = async (req, res, next) => {
  try {
    // if (req.session.login) {
    //   res.redirect("/view/home");
    // } else {
    res.render("register");
    // }
  } catch (error) {
    console.log(error);
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};

const postPage = async (req, res, next) => {
  try {
    //   if (req.session.login) {
    res.render("post");
    //   } else {
    // res.render("/view/login");
    //   }
  } catch (error) {
    console.log(error);
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};

module.exports = {
  registerPage,
  loginPage,
  homePage,
  postPage,
};
