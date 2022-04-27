var express = require("express");
const { rethrow } = require("jade/lib/runtime");
var router = express.Router();

/* GET home page. */
router.post("/admin_request_confirmation", async function (req, res, next) {
  if (
    !(
      req.session.isSession == true &&
      req.session.userData.roles.includes("admin") == true
    )
  ) {
    res.error("ROLE_ERROR");
    return;
  }

  let email = undefined;

  await await req.mysqlConnection
    .asyncQuery(req.mysqlConnection.SQL_BASE.getEmailByUID, [req.body?.uid])
    .then(
      (result) => {
        email = result[0].email;
      },
      (err) => {
        res.error("SQL", err);
        console.log(err);
        return;
      }
    );

  await req.mysqlConnection
    .asyncQuery(req.mysqlConnection.SQL_BASE.adminResetConfirmEmail, [
      req.body?.uid,
    ])
    .then(
      async (result) => {
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

        if (!(email == undefined)) {
          let __newToken = req.session.newToken();
          await addToken(req.body?.uid, __newToken);
          await req.sendMail.confirm(email, __newToken);
        }
        res.ok();
      },
      (err) => {
        res.error("SQL", err);
        console.log(err);
      }
    );
});

module.exports = router;
