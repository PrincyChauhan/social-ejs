const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

require("dotenv").config();

const AppError = require("./utils/appError");

// Import Models
const UserModel = require("./models/userModel");

// Import Database connection
const Database = require("./db");

const app = express();

//Parse Body Content Coming From Every Requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "my_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Import routes
const AuthRouter = require("./routes/authRoute");
const PostRouter = require("./routes/postRoute");
const viewRouter = require("./routes/viewRoute");

// Routes for app
app.use("/users", AuthRouter);
app.use("/posts", PostRouter);
app.use("/view", viewRouter);

// app.all("*", (req, res, next) => {
//   next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
// });
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('uploads')); 
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
  console.log("Port is listing on 3000");
});
