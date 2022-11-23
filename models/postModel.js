const mongoose = require("mongoose");
const validator = require("validator");

const postSchema = new mongoose.Schema({
  title: {
    type:String,
  },
  description: {
    type:String,
  },
  image: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
