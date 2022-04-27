var express = require("express");
const { rethrow } = require("jade/lib/runtime");
var router = express.Router();

/* GET home page. */
router.post("/admin_close_all_sessions", async function (req, res, next) {
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
    .asyncQuery(req.mysqlConnection.SQL_BASE.adminCloseAllSessions, [
      req.body?.uid,
    ])
    .then(
      async (result) => {
        await req.mysqlConnection
          .asyncQuery(req.mysqlConnection.SQL_BASE.adminGetSessionsCountByUID, [
            req.body?.uid,
          ])
          .then(
            (result) => {
              res.result.sessionsCount = result[0].sessions;
              res.ok();
            },
            (err) => {
              res.error("SQL", err);
              console.log(err);
            }
          );
      },
      (err) => {
        res.error("SQL", err);
        console.log(err);
      }
    );
});

module.exports = router;
