//const { rejects } = require("assert");

module.exports = () => {
  var crypto = require("crypto");

  return async function (req, res, next) {
    req.session = {
      isSession: false,
      newToken: () => {
        return crypto
          .createHash("md5")
          .update(Math.random().toString(36).substr(2))
          .digest("hex");
      },
    };

    let token = req.body?.token;
    if (token == null) {
      next();
      return;
    }

    console.log("s1");

    await req.mysqlConnection
      .asyncQuery(req.mysqlConnection.SQL_BASE.sessionGetUserByToken, [token])
      .then(
        (result) => {
          if (result.length == 0) {
            console.log("Bad token for session-middle");
          } else {
            req.session.isSession = true;
            req.session.userData = result[0];
            req.session.userData.extended = JSON.parse(result[0].extended);
            req.session.userData.roles = JSON.parse(req.session.userData.roles);
          }
        },
        (err) => {
          res.error("SQL", err);
          console.log("session !");
          console.log(err);
        }
      );
    console.log("s2");
    next();
  };
};
