const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/social")
  .then(() => {
    console.log("Successfully connected ");
  })
  .catch((error) => {
    console.log(`can not connect to database, ${error}`);
  });

module.exports = {
  mongoose,
};
