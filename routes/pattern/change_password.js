var express = require("express");
var router = express.Router();

router.post("/change_password", function (req, res, next) {
  if (req?.session?.isSession == true) {
    let oldPassword = req.body?.oldPassword;
    let newPassword = req.body?.newPassword;
    if (!newPassword || newPassword === "") {
      res.error("EMPTY_PASSWORD");
      console.log("Empty password");
      return;
    }

    req.mysqlConnection.query(
      req.mysqlConnection.SQL_BASE.changePassword,
      [newPassword, oldPassword, req.session.userData.uid],
      (err, result) => {
        if (err) {
          res.error("SQL", err);
        } else {
          if (result?.changedRows == 0) {
            res.error("AUTH_ERROR");
          } else {
            res.ok();
          }
        }
      }
    );
  } else {
    res.error("BAD_TOKEN");
  }
});

module.exports = router;
