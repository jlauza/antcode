require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var multer = require("multer");

// GENERAL ROUTES
const connectDB = require("./routes/connection");
const methodOverride = require("method-override");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const indexRoutes = require("./routes/index");

// modules
const users = require("./routes/users");
const auth = require("./routes/auth");

var app = express();
connectDB();

// Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());

const upload = multer({ dest: "public/images/avatars" });
app.use(upload.single("avatar"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(cors());

// Define your routes here
app.use("/", indexRoutes);

// module routes
app.use("/users", users);
app.use("/auth", auth);

app.use("/dashboard", function (err, req, res, next) {
  console.log(err);
  //User should be authenticated! Redirect him to log in.
  res.redirect("/");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
