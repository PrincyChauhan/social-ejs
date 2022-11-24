const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const FriendRequest = require("../models/requestModel");

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
      const friends = await FriendRequest.find({
        sender_id: req.cookies.id,
        status: "approved",
      });
      const data = [];
      friends.map((friend) => {
        data.push(friend.reciver_id);
      });

      console.log(data);
      const posts = await Post.find({
        user_id: { $in: data },
      });
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
  // try {
  //   if (req.cookies.id) {
  //     res.redirect("/view/home");
  //   } else {
  res.render("register");
  //   }
  // } catch (error) {
  //   console.log(error);
  //   errorMsg = { error: "Something went wrong" };
  //   res.status(500).json(errorMsg);
  // }
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

const friendListPage = async (req, res, next) => {
  try {
    if (req.cookies.id) {
      const users = await User.find({ _id: { $ne: req.cookies.id } });
      res.render("friend", {
        users: users,
      });
    } else {
      res.redirect("/view/login");
    }
  } catch (error) {
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};

const friendRequestList = async (req, res, next) => {
  try {
    if (req.cookies.id) {
      const users = await FriendRequest.find({
        reciver_id: req.cookies.id,
        status: "pending",
      });
      res.render("requestFriend", {
        users: users,
      });
    } else {
      res.redirect("/view/login");
    }
  } catch (error) {
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
  friendListPage,
  friendRequestList,
};
