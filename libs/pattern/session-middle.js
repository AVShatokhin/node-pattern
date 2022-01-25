module.exports = () => {
  var crypto = require("crypto");

  return function (req, res, next) {
    req.newToken = () => {
      return crypto
        .createHash("md5")
        .update(Math.random().toString(36).substr(2))
        .digest("hex");
    };

    next();
  };
};
