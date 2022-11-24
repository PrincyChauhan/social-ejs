const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.ObjectId,
  },
  reciver_id: {
    type: mongoose.Schema.ObjectId,
  },
  status: {
    type: String,
    enum: ["pending", "rejected", "approved"],
    default: "pending",
  },
});

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;
