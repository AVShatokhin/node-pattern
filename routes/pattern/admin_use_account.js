var express = require("express");
const { rethrow } = require("jade/lib/runtime");
var router = express.Router();

/* GET home page. */
router.post("/admin_use_account", async function (req, res, next) {
  if (
    !(
      req.session.isSession == true &&
      req.session.userData.roles.includes("admin") == true
    )
  ) {
    res.error("ROLE_ERROR");
    return;
  }

  await req.mysqlConnection
    .asyncQuery(req.mysqlConnection.SQL_BASE.deleteToken, [
      req.session.userData.token,
    ])
    .then((r = {}), (err) => {
      res.error("SQL", err);
      console.log(err);
      return;
    });

  let changeToUID = req.body?.changeToUID;
  let newToken = req.session.newToken();

  await req.mysqlConnection
    .asyncQuery(req.mysqlConnection.SQL_BASE.AddToken, [changeToUID, newToken])
    .then(
      (result) => {
        res.result.token = newToken;
        res.ok();
      },
      (err) => {
        res.error("SQL", err);
        console.log(err);
      }
    );
});

module.exports = router;
