const Post = require("../models/postModel");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `post-${Date.now()}.${ext}`);
  },
});

var upload = multer({ storage: multerStorage });

const uploadPostImage = upload.single("image");


const postPage = async (req, res, next) => {
    try {
      if (req.session.login) {
        res.redirect("/users/home");
      } else {
        res.render("post");
      }
    } catch (error) {
      console.log(error);
      errorMsg = { error: "Something went wrong" };
      res.status(500).json(errorMsg);
    }
  };

const createPost = async (req, res) => {
  try {
    if (!req.file.mimetype.startsWith("image")) {
      res.status(400).json({
        status: "fail",
        message: "Not an image! Please upload only images",
      });
    } else {
      req.body.image = req.file.filename;
      const post = await Post.create(req.body);
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const getAllPost = async (req, res) => {
  try {
    const post = await Post.findAll();
    res.status(200).json({
      status: "success",
      results: post.length,
      data: {
        post: post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.errors[0].message,
    });
  }
};



module.exports = {
  createPost,
  getAllPost,
  uploadPostImage,
  postPage
};
