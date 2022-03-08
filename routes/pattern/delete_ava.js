var express = require("express");
var router = express.Router();

router.post("/delete_ava", function (req, res, next) {
  if (req?.session?.isSession == true) {
    let extended = req.session.userData.extended;
    delete extended["ava_url"];

    res.result.userData = req.session.userData;
    res.result.userData.extended = extended;

    req.mysqlConnection.query(
      req.mysqlConnection.SQL_BASE.saveProfile,
      [JSON.stringify(extended), req.session.userData.token],
      (err, result) => {
        if (err) {
          res.error("SQL", err);
        } else {
          res.ok();
        }
      }
    );
  } else {
    res.error("BAD_TOKEN");
  }
});

module.exports = router;
