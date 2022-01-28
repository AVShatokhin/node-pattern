var express = require("express");
var router = express.Router();

router.get("/confirm/:token", async function (req, res, next) {
  let token = req.params["token"];
  await req.mysqlConnection.query(
    req.mysqlConnection.SQL_BASE.Confirm,
    [token],
    async (err, result) => {
      if (err) {
        res.error("SQL", err);
      } else {
        if (result?.affectedRows === 1) {
          await deleteToken(token);

          res.redirect(req.config.front_end_url);
        } else {
          next();
        }
      }
    }
  );

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
