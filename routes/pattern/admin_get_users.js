var express = require("express");
const { rethrow } = require("jade/lib/runtime");
var router = express.Router();

/* GET home page. */
router.get("/admin_get_users", async function (req, res, next) {
  if (
    !(
      req.session.isSession == true &&
      req.session.userData.roles.includes("admin") == true
    )
  ) {
    res.error("ROLE_ERROR");
    return;
  }

  let data = {};

  await req.mysqlConnection
    .asyncQuery(req.mysqlConnection.SQL_BASE.getUsers, [])
    .then(
      async (result) => {
        result.forEach((element) => {
          if (element.confirmed == 1) {
            element.confirmed = true;
          } else {
            element.confirmed = false;
          }
          if (element.blocked == 1) {
            element.blocked = true;
          } else {
            element.blocked = false;
          }
          data[element.uid] = element;
          data[element.uid].extended = JSON.parse(element.extended);
          data[element.uid].roles = JSON.parse(element.roles);
        });

        await req.mysqlConnection
          .asyncQuery(req.mysqlConnection.SQL_BASE.adminGetSessions, [])
          .then(
            (result) => {
              result.forEach((element) => {
                data[element.uid].sessions = element.sessions;
              });
            },
            (error) => {
              console.log(error);
            }
          );

        res.result.data = data;
        res.ok();
      },
      (err) => {
        res.error("SQL", err);
        console.log(err);
      }
    );
});

module.exports = router;
