var express = require("express");
const { rethrow } = require("jade/lib/runtime");
var router = express.Router();

/* GET home page. */
router.post("/admin_delete_user", async function (req, res, next) {
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
    .asyncQuery(req.mysqlConnection.SQL_BASE.adminDeleteUser, [req.body?.uid])
    .then(
      async (result) => {
        await req.mysqlConnection
          .asyncQuery(req.mysqlConnection.SQL_BASE.adminCloseAllSessions, [
            req.body?.uid,
          ])
          .then(
            (result) => {
              res.ok();
            },
            (err) => {
              console.log(err);
              res.error("SQL", err);
            }
          );
      },
      (err) => {
        console.log(err);
        res.error("SQL", err);
      }
    );
});

module.exports = router;
