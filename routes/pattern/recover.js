var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/recover", function (req, res, next) {
  res.render("index", { title: "Node-Pattern" });
});

module.exports = router;
