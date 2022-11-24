const express = require("express");
const commentController = require("../controllers/commentController");
const commentRouter = express.Router();

commentRouter
  .route("/:postId").post(commentController.createComment)
 
  commentRouter
  .route("/:id")
  .get(commentController.getCommentById)
  .delete(commentController.deleteComment)
  .patch(commentController.updateComment);

module.exports = commentRouter;
