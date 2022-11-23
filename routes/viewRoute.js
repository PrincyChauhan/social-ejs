const express = require("express");
const viewController = require("../controllers/viewController");
const viewRouter = express.Router();


viewRouter.route("/create-post").get(viewController.postPage);

viewRouter.route("/register").get(viewController.registerPage);
viewRouter.route("/login").get(viewController.loginPage);
viewRouter.route("/home").get(viewController.homePage);

module.exports = viewRouter;
