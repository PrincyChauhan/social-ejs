const Comment = require("../models/commentModel");

const createComment = async (req, res) => {
  req.body.post = req.params.postId;
  const comment = await Comment.create(req.body);
  res.redirect("back");
};

const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

module.exports = {
  createComment,
  getCommentById,
  deleteComment,
  updateComment,
};
