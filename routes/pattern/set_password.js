var express = require("express");
var router = express.Router();

router.post("/set_password", async function (req, res, next) {
  if (req?.session?.isSession == true) {
    let newPassword = req.body?.password;
    if (!newPassword || newPassword === "") {
      res.error("EMPTY_PASSWORD");
      console.log("Empty password");
      return;
    }

    await req.mysqlConnection.query(
      req.mysqlConnection.SQL_BASE.setPassword,
      [newPassword, req.session.sessionData.uid],
      async (err, result) => {
        if (err) {
          res.error("SQL", err);
        } else {
          await deleteToken(req.session.sessionData.token);
          res.ok();
        }
      }
    );
  } else {
    res.error("BAD_TOKEN");
  }

  let deleteToken = (token) => {
    return req.mysqlConnection.query(
      req.mysqlConnection.SQL_BASE.deleteToken,
      [token],
      (err, result) => {
        if (err) {
          res.error("SQL", err);
        }
      }
    );
  };
});

module.exports = router;
