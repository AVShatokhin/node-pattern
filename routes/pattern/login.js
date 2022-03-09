var express = require("express");
var loginRouter = express.Router();

loginRouter.post("/login", async function (req, res, next) {
  const sleep = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  sleep.then(() => {
    req.mysqlConnection.query(
      req.mysqlConnection.SQL_BASE.Login,
      [req.body.email, req.body.password],
      async (err, result) => {
        if (err) {
          res.error("SQL", err);
        } else {
          if (result[0] != undefined) {
            if (result[0].blocked) {
              res.error("USER_BLOCKED");
              return;
            }

            if (!result[0].confirmed) {
              res.error("EMAIL_NOT_CONFIRMED");
              return;
            }

            let newToken = req.session.newToken();

            let extended = JSON.parse(result[0].extended);

            if (extended?.ava_url) {
              extended.ava_url =
                req.config.base_url + "avatars/" + extended.ava_url;
            }

            res.result.userData = {
              roles: JSON.parse(result[0].roles),
              email: result[0].email,
              extended,
              token: newToken,
            };

            await req.mysqlConnection.query(
              req.mysqlConnection.SQL_BASE.AddToken,
              [result[0].uid, newToken],
              (err, result) => {
                if (err) {
                  res.error("SQL", err);
                }
              }
            );

            res.ok();
          } else {
            res.error("AUTH_ERROR");
          }
        }
      }
    );
  });
});

module.exports = loginRouter;
