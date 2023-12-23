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
const registerRoutes = require("./routes/index");
const methodOverride = require("method-override");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const indexRoutes = require("./routes/index");

// USERS module
const getAllUsers = require("./routes/users/users-get-all");
const getUserById = require("./routes/users/users-get-by-id");
const getUserByUsername = require("./routes/users/users-get-by-username");
const createUser = require("./routes/users/users-post");
const updateUser = require("./routes/users/users-update");
const deleteUser = require("./routes/users/users-delete");

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
app.use("/register", registerRoutes);

// USERS module
app.use("/users", getAllUsers);
app.use("/users", getUserById);
app.use("/users", getUserByUsername);
app.use("/users", createUser);
app.use("/users", updateUser);
app.use("/users", deleteUser);

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
