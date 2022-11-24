const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const loginPage = async (req, res, next) => {
  try {
    if (req.cookies.id) {
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
    if (req.cookies.id) {
      const posts = await Post.find();
      console.log(posts);
      res.render("home", {
        posts: posts,
      });
    } else {
      res.redirect("/view/login");
    }
  } catch (error) {
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};
const registerPage = async (req, res, next) => {
  try {
    if (req.cookies.id) {
      res.redirect("/view/home");
    } else {
      res.render("register");
    }
  } catch (error) {
    console.log(error);
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};

const postPage = async (req, res, next) => {
  try {
    if (req.cookies.id) {
      res.render("post");
    } else {
      res.render("/view/login");
    }
  } catch (error) {
    console.log(error);
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};

const postViewPage = async (req, res, next) => {
  try {
    if (req.cookies.id) {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({
        post: post._id,
      });
      res.render("postView", {
        comments: comments,
        post: post,
      });
    } else {
      res.render("/view/login");
    }
  } catch (error) {
    console.log(error);
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};

const logout = async (req, res) => {
  res.clearCookie("id");
  res.redirect("/view/login");
};

module.exports = {
  registerPage,
  loginPage,
  logout,
  homePage,
  postPage,
  postViewPage,
};
