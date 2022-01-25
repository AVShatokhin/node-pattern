module.exports = (config) => {
  const mysql = require("mysql");

  var mysqlConnection = mysql.createConnection({
    host: config.db_host,
    user: config.db_user,
    database: config.db_name,
    password: config.db_password,
  });

  mysqlConnection.connect((err) => {
    if (err) {
      console.log(err);
      throw err;
    }

    mysqlConnection.query("SET time_zone='+3:00';", function (err, result) {
      if (err) {
        throw err;
      } else {
        mysqlConnection.SQL_BASE = require("./SQL_BASE")(config);
        console.log("mysql connected");
      }
    });
  });

  return function (req, res, next) {
    req.mysqlConnection = mysqlConnection;
    next();
  };
};
