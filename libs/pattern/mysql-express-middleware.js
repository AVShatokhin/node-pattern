const mysql = require("mysql");
var mysqlConnection;

var mysqlMiddle = function (req, res, next) {
  req.mysqlConnection = mysqlConnection;
  next();
};

var mySqlInit = function (config) {
  mysqlConnection = mysql.createConnection({
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
        console.log("mysql connected");
      }
    });
  });
};

module.exports.init = mySqlInit;
module.exports.middle = mysqlMiddle;
