const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  reciver_id: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  status:{
    type: String,
    enum: ['pending', 'rejected','approved']
  }
});

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;
