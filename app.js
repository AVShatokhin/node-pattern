var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// ========== Pattern +++++++++
var patternRouter = require("./routes/pattern/");
var renders = require("./libs/pattern/renders-middle")(require("./etc/config"));
var mysql = require("./libs/pattern/mysql-middle")(require("./etc/config"));
var mail = require("./libs/pattern/mail-middle")(require("./etc/config"));
var session = require("./libs/pattern/session-middle")();
var config = require("./libs/pattern/config-middle")(require("./etc/config"));
// ========== Pattern ---------

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ========== Pattern +++++++++
app.use(config);
app.use(renders);
app.use(mysql);
app.use(mail);
app.use(session);
app.use("/", patternRouter);
// ========== Pattern ---------

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
