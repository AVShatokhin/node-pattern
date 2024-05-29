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
var getUsersRouter = require("./admin_get_users");
var addUserRouter = require("./admin_add_user");
var updateUserInfoRouter = require("./admin_update_user_info");
var deleteUserRouter = require("./admin_delete_user");
var updateUserPasswordRouter = require("./admin_update_user_password");
var confirmEmailRouter = require("./admin_confirm_email");
var requestConfirmationRouter = require("./admin_request_confirmation");
var blockUserRouter = require("./admin_block_user");
var unblockUserRouter = require("./admin_unblock_user");
var closeAllSEssionsRouter = require("./admin_close_all_sessions");
var useAcountRouter = require("./admin_use_account");
var applyNewRoleRouter = require("./admin_apply_new_roles");

var appRouter = require("../../app/routes/app_index");

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
  getUsersRouter,
  addUserRouter,
  updateUserInfoRouter,
  deleteUserRouter,
  updateUserPasswordRouter,
  confirmEmailRouter,
  requestConfirmationRouter,
  blockUserRouter,
  unblockUserRouter,
  closeAllSEssionsRouter,
  useAcountRouter,
  applyNewRoleRouter,
  appRouter,
];
