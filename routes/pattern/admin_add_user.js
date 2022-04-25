var express = require("express");
const { rethrow } = require("jade/lib/runtime");
var router = express.Router();

/* GET home page. */
router.post("/admin_add_user", async function (req, res, next) {
  if (
    !(
      req.session.isSession == true &&
      req.session.userData.roles.includes("admin") == true
    )
  ) {
    res.error("ROLE_ERROR");
    return;
  }

  let extended = req.body?.extended;

  await req.mysqlConnection
    .asyncQuery(req.mysqlConnection.SQL_BASE.adminAddUser, [
      req.body.email,
      req.body.password,
      JSON.stringify(extended),
    ])
    .then(
      (result) => {
        res.ok();
      },
      (err) => {
        res.error("SQL", err);
        console.log(err);
      }
    );
});

module.exports = router;
