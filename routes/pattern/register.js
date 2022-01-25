var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/register", async function (req, res, next) {
  await req.mysqlConnection.query(
    req.mysqlConnection.SQL_BASE.Register,
    [req.body.email, req.body.password],
    async (err, result) => {
      if (err) {
        res.error("SQL", err);
      } else {
        let __newToken = req.newToken();
        await addToken(result?.insertId, __newToken);
        await req.sendMail.confirm(req.body.email, __newToken);
        res.ok();
      }
    }
  );

  let addToken = (uid, newToken) => {
    return req.mysqlConnection.query(
      req.mysqlConnection.SQL_BASE.AddToken,
      [uid, newToken],
      (err, result) => {
        if (err) {
          res.error("SQL", err);
        }
      }
    );
  };
});

module.exports = router;
