var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/recover", async function (req, res, next) {
  await req.mysqlConnection.query(
    req.mysqlConnection.SQL_BASE.Recover,
    [req.body.email],
    async (err, result) => {
      if (err) {
        res.error("SQL", err);
      } else {
        let uid = result[0]?.uid;
        if (uid != null) {
          let __newToken = req.session.newToken();
          await addToken(result[0]?.uid, __newToken);
          await req.sendMail.recover(req.body.email, __newToken);
        } else {
          console.log("Attempt to recover undefined user");
        }
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
