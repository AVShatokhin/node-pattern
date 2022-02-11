const { rejects } = require("assert");

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

    await req.mysqlConnection
      .asyncQuery(req.mysqlConnection.SQL_BASE.sessionGetUserByToken, [token])
      .then(
        (result) => {
          if (result.length == 0) {
            console.log("Bad token for session-middle");
          } else {
            req.session.isSession = true;
            req.session.userData = result[0];
          }
        },
        (err) => {
          res.error("SQL", err);
        }
      );

    next();
  };
};
