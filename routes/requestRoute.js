const express = require("express");
const requestController = require("../controllers/requestController");
const requestRouter = express.Router();

requestRouter.route("/:reciverId").post(requestController.addRequest);

requestRouter
  .route("/:id")
  .delete(requestController.deleteRequest)
  .patch(requestController.updateRequestStatus);

module.exports = requestRouter;
