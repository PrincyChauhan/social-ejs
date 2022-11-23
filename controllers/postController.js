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
  const post = await Post.create(req.body);
  console.log(req)
  res.render("home");
};

module.exports = {
  createPost,
  uploadPostImage,
  postPage,
};
