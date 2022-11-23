const express = require("express");
const { validate } = require("express-validation");
const postController = require("../controllers/postController");
const postvalidation = require("../validation/postValidation");
const postRouter = express.Router();

postRouter.route("/page/addPost").post(postController.createPost);

postRouter.route("/page/post").get(postController.postPage);

module.exports = postRouter;
