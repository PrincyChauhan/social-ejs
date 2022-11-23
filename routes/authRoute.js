const express = require("express");
const authController = require("../controllers/authController");

const AuthRouter = express.Router();

AuthRouter.route("/login").post(authController.userLogin);
AuthRouter.route("/logout").post(authController.userLogout);
AuthRouter.route("/signup").post(authController.userSignup);



module.exports = AuthRouter;
