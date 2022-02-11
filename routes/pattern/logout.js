var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/logout", function (req, res, next) {
  if (req.session.isSession == false) {
    res.error("BAD_TOKEN");
    return;
  }

  req.mysqlConnection.query(
    req.mysqlConnection.SQL_BASE.deleteToken,
    [req.session.userData.token],
    (err, result) => {
      if (err) {
        res.error("SQL", err);
      } else {
        res.ok();
      }
    }
  );
});

module.exports = router;
