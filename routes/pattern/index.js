var express = require("express");
var indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  res.render("index", { title: "Node-Pattern" });
});

var loginRouter = require("./login");
var logoutRouter = require("./logout");
var recoverRouter = require("./recover");
var registerRouter = require("./register");
var confirmRouter = require("./confirm");

module.exports = [
  indexRouter,
  loginRouter,
  logoutRouter,
  recoverRouter,
  registerRouter,
  confirmRouter,
];
