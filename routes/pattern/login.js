var express = require("express");
var loginRouter = express.Router();

/* GET home page. */
loginRouter.get("/login", function (req, res, next) {
  console.log(req.mysqlConnection);
  res.render("index", { title: "Node-Pattern" });
});

module.exports = loginRouter;
