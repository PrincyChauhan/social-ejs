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


const createPost = async (req, res) => {
  if (req.file) req.body.image = req.file.filename;
  await Post.create(req.body);
  res.redirect("/view/home");
};

module.exports = {
  createPost,
  uploadPostImage,
};
