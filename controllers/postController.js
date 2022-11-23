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
      res.render("post");
    } else {
      res.render("login");
    }
  } catch (error) {
    console.log(error);
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};

const createPost = async (req, res) => {
  console.log(req.body);
  const post = await Post.create(req.body);
  res.redirect("/users/home");
};

module.exports = {
  createPost,
  uploadPostImage,
  postPage,
};
