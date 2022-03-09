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
var setPasswordRouter = require("./set_password");
var checkTokenRouter = require("./check_token");
var saveProfileRouter = require("./save_profile");
var uploadAvaRouter = require("./upload_ava");
var deleteAvaRouter = require("./delete_ava");
var changePasswordRouter = require("./change_password");

module.exports = [
  indexRouter,
  loginRouter,
  logoutRouter,
  recoverRouter,
  registerRouter,
  confirmRouter,
  setPasswordRouter,
  checkTokenRouter,
  saveProfileRouter,
  uploadAvaRouter,
  deleteAvaRouter,
  changePasswordRouter,
];
