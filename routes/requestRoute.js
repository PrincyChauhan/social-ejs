const express = require("express");
const requestController = require("../controllers/requestController");
const requestRouter = express.Router();

requestRouter.route("/:reciverId").post(requestController.addRequest);
requestRouter.route("/status/:id").post(requestController.updateRequestStatus);

requestRouter
  .route("/:id")
  .delete(requestController.deleteRequest)


module.exports = requestRouter;
