var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/register", async function (req, res, next) {
  let extended = req.body?.extended;
  await req.mysqlConnection.query(
    req.mysqlConnection.SQL_BASE.Register,
    [req.body.email, req.body.password, JSON.stringify(extended)],
    async (err, result) => {
      if (err) {
        res.error("SQL", err);
      } else {
        let __newToken = req.session.newToken();
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
