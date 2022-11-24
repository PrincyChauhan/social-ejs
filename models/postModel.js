const mongoose = require("mongoose");

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
  user_id: {
    type: mongoose.Schema.ObjectId,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
