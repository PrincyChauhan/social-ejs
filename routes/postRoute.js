const express = require("express");
const { validate } = require("express-validation");
const postController = require("../controllers/postController");
const postvalidation = require("../validation/postValidation");
const postRouter = express.Router();

postRouter
  .route("/")
  .post(postController.uploadPostImage, postController.createPost);

module.exports = postRouter;
