const Request = require("../models/requestModel");

const addRequest = async (req, res) => {
  const reciver_id = req.params.reciverId;
  const sender_id = req.cookies.id;
  const request = await Request.create({
    reciver_id: reciver_id,
    sender_id: sender_id,
  });
  res.redirect("back");
};

const updateRequestStatus = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, {
      status: "approved",
    });
    res.redirect("back");
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

module.exports = {
  addRequest,
  deleteRequest,
  updateRequestStatus,
};
