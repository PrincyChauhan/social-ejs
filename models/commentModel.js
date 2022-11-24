const mongoose = require("mongoose");
const Post = require("./postModel");

const commentSchema = new mongoose.Schema({
  title: {
    type:String,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: Post,
    required: [true, 'Post must belonging to a user']
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
