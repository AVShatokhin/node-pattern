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
      checkRole: (req, res, roles) => {
        let roleConfirmed = false;

        if (req.session.isSession) {
          roles.forEach((e) => {
            if (req.session?.userData?.roles.includes(e)) roleConfirmed = true;
          });
        }

        if (!roleConfirmed) res.error("ROLE_ERROR");
        return roleConfirmed;
      },
    };

    let token = req.body?.token || req.query?.token;

    if (token == undefined) {
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

    next();
  };
};
